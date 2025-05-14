// frontend/src/components/Documents/DocumentGeneration.jsx
import React, { useState } from 'react';
import { FileText, ClipboardCheck, FileSpreadsheet, Mail, Eye, Download } from 'lucide-react';
import DocumentCard from './DocumentCard';

const DocumentGeneration = ({ companies, cahierDesCharges, selectionCriteria, attributionCriteria }) => {
  const [generatingDocuments, setGeneratingDocuments] = useState(false);
  const [documentsGenerated, setDocumentsGenerated] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState({
    projetMarche: true,
    reglementConsultation: true,
    grilleEvaluation: true,
    lettreConsultation: true
  });
  
  const handleDocumentSelect = (documentType, isSelected) => {
    setSelectedDocuments({
      ...selectedDocuments,
      [documentType]: isSelected
    });
  };
  
  const handleGenerateDocuments = () => {
    setGeneratingDocuments(true);
    
    // Simulate document generation process
    setTimeout(() => {
      setGeneratingDocuments(false);
      setDocumentsGenerated(true);
    }, 2500);
  };
  
  const handlePreviewAllDocuments = () => {
    console.log('Preview all documents');
    // Open a modal or navigate to preview page
  };
  
  const handleDownloadAllDocuments = () => {
    console.log('Download all documents');
    // Generate ZIP file with all documents
  };
  
  const documentTypes = [
    {
      id: 'projetMarche',
      title: 'Projet de marché',
      description: 'Document type incluant les clauses administratives et techniques',
      icon: <FileText size={24} />,
      color: '#4285F4'
    },
    {
      id: 'reglementConsultation',
      title: 'Règlement de consultation',
      description: 'Document définissant les règles de la consultation',
      icon: <ClipboardCheck size={24} />,
      color: '#5B7DFF'
    },
    {
      id: 'grilleEvaluation',
      title: 'Grille d\'évaluation',
      description: 'Grille pré-remplie avec vos critères d\'attribution',
      icon: <FileSpreadsheet size={24} />,
      color: '#34A853'
    },
    {
      id: 'lettreConsultation',
      title: 'Lettre de consultation',
      description: 'Lettre type pour inviter les entreprises à consulter',
      icon: <Mail size={24} />,
      color: '#4ECDE6'
    }
  ];
  
  return (
    <div className="document-generation">
      <div className="document-selection">
        <h3>Sélectionnez les documents à générer pour votre consultation :</h3>
        
        <div className="document-grid">
          {documentTypes.map(doc => (
            <DocumentCard 
              key={doc.id}
              title={doc.title}
              description={doc.description}
              icon={doc.icon}
              color={doc.color}
              selected={selectedDocuments[doc.id]}
              onSelect={(isSelected) => handleDocumentSelect(doc.id, isSelected)}
            />
          ))}
        </div>
      </div>
      
      {!documentsGenerated ? (
        <div className="generation-actions">
          <button 
            className="generate-documents-btn primary-button" 
            onClick={handleGenerateDocuments}
            disabled={generatingDocuments || Object.values(selectedDocuments).every(value => !value)}
          >
            {generatingDocuments ? (
              <>
                <span className="spinner"></span>
                Génération en cours...
              </>
            ) : (
              <>
                <FileText size={18} />
                Générer les documents
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="documents-ready">
          <div className="documents-ready-message">
            <h3>Documents générés avec succès !</h3>
            <p>Vous pouvez maintenant prévisualiser ou télécharger les documents générés.</p>
          </div>
          
          <div className="documents-actions">
            <button 
              className="preview-all-btn secondary-button" 
              onClick={handlePreviewAllDocuments}
            >
              <Eye size={18} />
              Prévisualiser tous les documents
            </button>
            
            <button 
              className="download-all-btn primary-button" 
              onClick={handleDownloadAllDocuments}
            >
              <Download size={18} />
              Télécharger tous les documents
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentGeneration;