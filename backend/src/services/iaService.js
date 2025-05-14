// backend/src/services/iaService.js
const axios = require('axios');
const config = require('../config/iaConfig');
const logger = require('../utils/logger');

/**
 * Service for interacting with the Mistral AI API
 */
class IaService {
  constructor() {
    this.apiKey = config.MISTRAL_API_KEY;
    this.modelId = config.MISTRAL_MODEL_ID;
    this.embeddingModel = config.MISTRAL_EMBEDDING_MODEL;
    this.client = axios.create({
      baseURL: 'https://api.mistral.ai/v1',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Analyze a document and extract keywords, selection criteria and attribution criteria
   * @param {String} documentText - The text content of the document to analyze
   * @returns {Promise<Object>} - Keywords, selection criteria and attribution criteria
   */
  async analyzeDocument(documentText) {
    try {
      logger.info('Analyzing document with Mistral AI');
      
      const prompt = `
      Vous êtes un assistant expert d'EDF qui aide à l'analyse de cahiers des charges. 
      Votre tâche est d'extraire les informations importantes du document fourni.
      
      Voici le cahier des charges :
      """
      ${documentText}
      """
      
      Veuillez extraire et fournir les informations suivantes au format JSON :
      1. Mots-clés : Identifiez 5 à 8 mots ou phrases clés qui caractérisent le projet.
      2. Critères de sélection : Proposez 4 à 6 critères pertinents pour sélectionner des entreprises (expérience, certifications requises, zone d'intervention, capacité de production, etc.)
      3. Critères d'attribution : Suggérez une répartition en pourcentage des critères d'attribution (qualité technique, coût, délais, sécurité, etc.). Le total doit être égal à 100%.
      
      Répondez uniquement avec un objet JSON valide ayant cette structure :
      {
        "keywords": ["mot-clé 1", "mot-clé 2", ...],
        "selectionCriteria": [
          {"name": "Nom du critère", "description": "Description détaillée", "selected": true},
          ...
        ],
        "attributionCriteria": [
          {"name": "Nom du critère", "weight": 40},
          ...
        ]
      }
      `;

      const response = await this.client.post('/chat/completions', {
        model: this.modelId,
        messages: [
          { role: 'system', content: 'Vous êtes un assistant d\'analyse de documents d\'appel d\'offres précis et concis qui répond uniquement au format JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 1000
      });

      const content = response.data.choices[0].message.content;
      
      // Parse JSON from the response
      try {
        const jsonStartIndex = content.indexOf('{');
        const jsonEndIndex = content.lastIndexOf('}') + 1;
        const jsonStr = content.substring(jsonStartIndex, jsonEndIndex);
        return JSON.parse(jsonStr);
      } catch (jsonError) {
        logger.error('Error parsing JSON from AI response', jsonError);
        throw new Error('Failed to parse AI analysis results');
      }
    } catch (error) {
      logger.error('Error analyzing document with Mistral AI', error);
      throw new Error('Failed to analyze document with AI');
    }
  }

  /**
   * Generate document based on template and data
   * @param {String} templateType - Type of document to generate (projetMarche, reglementConsultation, etc.)
   * @param {Object} data - Data to include in the document
   * @returns {Promise<String>} - Generated document content
   */
  async generateDocument(templateType, data) {
    try {
      logger.info(`Generating ${templateType} document with Mistral AI`);
      
      let templateDescription;
      switch (templateType) {
        case 'projetMarche':
          templateDescription = 'un projet de marché incluant les clauses administratives et techniques';
          break;
        case 'reglementConsultation':
          templateDescription = 'un règlement de consultation définissant les règles de la consultation';
          break;
        case 'grilleEvaluation':
          templateDescription = 'une grille d\'évaluation basée sur les critères d\'attribution spécifiés';
          break;
        case 'lettreConsultation':
          templateDescription = 'une lettre type pour inviter les entreprises à consulter';
          break;
        default:
          templateDescription = 'un document pour le projet';
      }
      
      const prompt = `
      Vous êtes un expert en rédaction de documents d'appel d'offres pour EDF. Veuillez générer ${templateDescription} 
      pour le projet décrit ci-dessous. Le document doit être professionnel, complet et conforme aux standards EDF.
      
      INFORMATIONS DU PROJET :
      - Cahier des charges : ${data.cahierDesCharges || 'Non spécifié'}
      - Entreprises sélectionnées : ${JSON.stringify(data.companies || [])}
      - Critères de sélection : ${JSON.stringify(data.selectionCriteria || [])}
      - Critères d'attribution : ${JSON.stringify(data.attributionCriteria || [])}
      
      Générez un document complet et structuré au format approprié.
      `;

      const response = await this.client.post('/chat/completions', {
        model: this.modelId,
        messages: [
          { role: 'system', content: 'Vous êtes un expert juridique spécialisé dans la rédaction de documents d\'appel d\'offres pour EDF.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      logger.error(`Error generating ${templateType} document with Mistral AI`, error);
      throw new Error(`Failed to generate ${templateType} document`);
    }
  }

  /**
   * Find best matching companies based on selection criteria
   * @param {Array} companies - List of all companies
   * @param {Array} criteria - Selection criteria
   * @returns {Promise<Array>} - List of best matching companies with scores
   */
  async findMatchingCompanies(companies, criteria) {
    try {
      logger.info('Finding matching companies with Mistral AI');
      
      const prompt = `
      Vous êtes un expert en sélection d'entreprises pour des projets EDF. 
      Votre tâche est d'identifier les entreprises qui correspondent le mieux aux critères de sélection donnés.
      
      CRITÈRES DE SÉLECTION :
      ${JSON.stringify(criteria)}
      
      LISTE DES ENTREPRISES :
      ${JSON.stringify(companies)}
      
      Veuillez évaluer chaque entreprise selon les critères, attribuer un score de correspondance (sur 100), 
      et renvoyer les 3 à 5 meilleures entreprises. Pour chaque entreprise, justifiez brièvement pourquoi 
      elle correspond aux critères.
      
      Répondez uniquement avec un objet JSON ayant cette structure :
      [
        {
          "id": "ID de l'entreprise",
          "name": "Nom de l'entreprise",
          "score": 95,
          "matchReasons": "Raisons concises de la correspondance"
        },
        ...
      ]
      `;

      const response = await this.client.post('/chat/completions', {
        model: this.modelId,
        messages: [
          { role: 'system', content: 'Vous êtes un assistant expert en sélection d\'entreprises qui répond uniquement au format JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1500
      });

      const content = response.data.choices[0].message.content;
      
      // Parse JSON from the response
      try {
        const jsonStartIndex = content.indexOf('[');
        const jsonEndIndex = content.lastIndexOf(']') + 1;
        const jsonStr = content.substring(jsonStartIndex, jsonEndIndex);
        return JSON.parse(jsonStr);
      } catch (jsonError) {
        logger.error('Error parsing JSON from AI response', jsonError);
        throw new Error('Failed to parse AI matching results');
      }
    } catch (error) {
      logger.error('Error finding matching companies with Mistral AI', error);
      throw new Error('Failed to find matching companies with AI');
    }
  }

  /**
   * Extract embeddings for a text
   * @param {String} text - Text to embed
   * @returns {Promise<Array>} - Embedding vector
   */
  async getEmbeddings(text) {
    try {
      logger.info('Getting embeddings from Mistral AI');
      
      const response = await this.client.post('/embeddings', {
        model: this.embeddingModel,
        input: text
      });

      return response.data.data[0].embedding;
    } catch (error) {
      logger.error('Error getting embeddings from Mistral AI', error);
      throw new Error('Failed to get embeddings');
    }
  }
}

module.exports = new IaService();