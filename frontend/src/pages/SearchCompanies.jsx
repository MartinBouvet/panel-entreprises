// frontend/src/pages/SearchCompanies.jsx
import React, { useState } from 'react';
import StepIndicator from '../components/common/StepIndicator';
import DocumentUploader from '../components/FileUpload/DocumentUploader';
import KeywordsDisplay from '../components/Criteria/KeywordsDisplay';
import SelectionCriteria from '../components/Criteria/SelectionCriteria';
import AttributionCriteria from '../components/Criteria/AttributionCriteria';
import CompanyResults from '../components/Results/CompanyResults';
import DocumentGeneration from '../components/Documents/DocumentGeneration';

const SearchCompanies = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cahierDesCharges, setCahierDesCharges] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [selectionCriteria, setSelectionCriteria] = useState([]);
  const [attributionCriteria, setAttributionCriteria] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  
  const steps = [
    { id: 1, name: 'Cahier des charges', description: 'Téléverser votre cahier des charges' },
    { id: 2, name: 'Critères', description: 'Définir les critères de sélection' },
    { id: 3, name: 'Liste courte', description: 'Sélectionner les entreprises' },
    { id: 4, name: 'Doc. consultation', description: 'Générer les documents' },
    { id: 5, name: 'Dauphin', description: 'Transférer dans Dauphin' },
    { id: 6, name: 'Intégration offres', description: 'Récupérer les offres' },
    { id: 7, name: 'Analyses', description: 'Analyser les résultats' },
    { id: 8, name: 'Fiche synthèse', description: 'Consulter la synthèse' }
  ];

  const handleFileUpload = (file) => {
    setCahierDesCharges(file);
    // Simulate AI analyzing the document
    setTimeout(() => {
      const extractedKeywords = ['Travaux mécaniques', 'Certification MASE', 'Île-de-France', 'Chantier neuf', 'Délai 6 mois'];
      setKeywords(extractedKeywords);
      
      const extractedSelectionCriteria = [
        { id: 1, name: 'Expérience dans projets similaires', description: 'Minimum 3 projets similaires réalisés dans les 5 dernières années', selected: true },
        { id: 2, name: 'Certification MASE ou équivalent', description: 'Certification obligatoire pour ce type de travaux', selected: true },
        { id: 3, name: 'Zone d\'intervention', description: 'Sélectionnez les départements concernés', selected: true, options: ['01 - Ain', '02 - Aisne', '03 - Allier'] },
        { id: 4, name: 'Capacité de production', description: 'Minimum 10 salariés pour assurer les délais', selected: true }
      ];
      setSelectionCriteria(extractedSelectionCriteria);
      
      const extractedAttributionCriteria = [
        { id: 1, name: 'Qualité technique de l\'offre', weight: 40 },
        { id: 2, name: 'Coût global de l\'offre', weight: 30 },
        { id: 3, name: 'Respect des délais', weight: 15 },
        { id: 4, name: 'Qualité de l\'organisation sécurité', weight: 10 },
        { id: 5, name: 'Intégration de la RSE', weight: 5 }
      ];
      setAttributionCriteria(extractedAttributionCriteria);
      
      setCurrentStep(2);
    }, 2000);
  };
  
  const handleCriteriaValidation = () => {
    // Simulate matching companies with criteria
    setTimeout(() => {
      const matchedCompanies = [
        { id: 'E1', name: 'ElectroTech Solutions', location: 'Paris (75)', experience: '5 projets similaires', certifications: ['MASE', 'ISO 9001'], ca: '12M€', score: 92 },
        { id: 'E2', name: 'PowerGrid France', location: 'Versailles (78)', experience: '4 projets similaires', certifications: ['MASE'], ca: '8M€', score: 85 },
        { id: 'E3', name: 'HT Electric', location: 'Nanterre (92)', experience: '6 projets similaires', certifications: ['MASE', 'ISO 14001'], ca: '15M€', score: 88 }
      ];
      setSelectedCompanies(matchedCompanies);
      setCurrentStep(3);
    }, 1500);
  };
  
  const handleSelectCompanies = () => {
    setCurrentStep(4);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>1. Téléverser votre cahier des charges</h2>
            <DocumentUploader onFileUpload={handleFileUpload} />
            {cahierDesCharges && (
              <div className="uploaded-file">
                <h3>Fichier téléversé :</h3>
                <p>{cahierDesCharges.name}</p>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="keywords-section">
              <h2>2. Mots-clés extraits par l'IA</h2>
              <KeywordsDisplay keywords={keywords} />
            </div>
            <div className="selection-criteria-section">
              <h2>3. Critères de sélection proposés</h2>
              <p>L'IA a suggéré les critères suivants basés sur votre cahier des charges. Vous pouvez les ajuster selon vos besoins.</p>
              <SelectionCriteria criteria={selectionCriteria} onChange={setSelectionCriteria} />
            </div>
            <div className="attribution-criteria-section">
              <h2>4. Critères d'attribution</h2>
              <AttributionCriteria criteria={attributionCriteria} onChange={setAttributionCriteria} />
            </div>
            <div className="button-container">
              <button className="primary-button" onClick={handleCriteriaValidation}>
                Valider les critères et continuer
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h2>4. Panel d'entreprises proposé</h2>
            <p>Voici les entreprises correspondant à vos critères de sélection :</p>
            <CompanyResults companies={selectedCompanies} />
            <div className="button-container">
              <button className="primary-button" onClick={handleSelectCompanies}>
                Générer les documents
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h2>5. Génération de documents</h2>
            <DocumentGeneration 
              companies={selectedCompanies} 
              cahierDesCharges={cahierDesCharges}
              selectionCriteria={selectionCriteria}
              attributionCriteria={attributionCriteria}
            />
          </div>
        );
      default:
        return <div>Étape non disponible</div>;
    }
  };
  
  return (
    <div className="search-companies-page">
      <h1>Recherche d'entreprises</h1>
      <StepIndicator steps={steps} currentStep={currentStep} />
      {renderStepContent()}
    </div>
  );
};

export default SearchCompanies;