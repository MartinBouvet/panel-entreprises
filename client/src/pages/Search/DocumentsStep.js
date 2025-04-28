import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import DocumentCard from '../../components/DocumentGeneration/DocumentCard';
import DocumentPreview from '../../components/DocumentGeneration/DocumentPreview';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';

const DocumentsStep = () => {
  const { 
    selectedDocuments,
    selectedCompanies,
    updateSelectedDocuments,
    prevStep,
    resetSearch
  } = useSearch();

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Liste des documents disponibles
  const availableDocuments = [
    {
      id: 'doc1',
      title: 'Projet de marché',
      description: 'Document type incluant les clauses administratives et techniques',
      icon: 'contract',
      type: 'docx'
    },
    {
      id: 'doc2',
      title: 'Règlement de consultation',
      description: 'Document définissant les règles de la consultation',
      icon: 'rules',
      type: 'docx'
    },
    {
      id: 'doc3',
      title: 'Grille d\'évaluation',
      description: 'Grille pré-remplie avec vos critères d\'attribution',
      icon: 'evaluation',
      type: 'xlsx'
    },
    {
      id: 'doc4',
      title: 'Lettre de consultation',
      description: 'Lettre type pour inviter les entreprises à consulter',
      icon: 'letter',
      type: 'docx'
    }
  ];

  const handleToggleDocument = (docId, isSelected) => {
    if (isSelected) {
      updateSelectedDocuments([...selectedDocuments, availableDocuments.find(d => d.id === docId)]);
    } else {
      updateSelectedDocuments(selectedDocuments.filter(d => d.id !== docId));
    }
  };

  const handlePreviewDocument = (docId) => {
    const doc = availableDocuments.find(d => d.id === docId);
    setPreviewDocument(doc);
    setIsPreviewModalOpen(true);
  };

  const handleDownloadAll = () => {
    setIsGenerating(true);
    
    // Simulation de génération de documents
    setTimeout(() => {
      setIsGenerating(false);
      resetSearch();
      // Redirection vers la page d'accueil
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          5. Génération de documents
        </h2>
        <p className="text-gray-600 mb-6">
          Sélectionnez les documents à générer pour votre consultation.
          {selectedCompanies.length > 0 && (
            <span> Ces documents seront personnalisés pour les {selectedCompanies.length} entreprises sélectionnées.</span>
          )}
        </p>
        
        {selectedCompanies.length === 0 ? (
          <Alert type="warning" title="Aucune entreprise sélectionnée">
            Veuillez retourner à l'étape précédente pour sélectionner des entreprises.
          </Alert>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {availableDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  description={doc.description}
                  icon={doc.icon}
                  isSelected={selectedDocuments.some(d => d.id === doc.id)}
                  onSelect={(isSelected) => handleToggleDocument(doc.id, isSelected)}
                  onPreview={() => handlePreviewDocument(doc.id)}
                />
              ))}
            </div>
            
            {selectedDocuments.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="primary"
                  onClick={handleDownloadAll}
                  disabled={isGenerating}
                  className="flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Télécharger tous les documents
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={prevStep}
        >
          Retour
        </Button>
        <Button 
          variant="secondary"
          onClick={resetSearch}
        >
          Terminer
        </Button>
      </div>
      
      {/* Modal pour la prévisualisation */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Prévisualisation du document"
        size="large"
      >
        {previewDocument && (
          <DocumentPreview
            documentType={previewDocument.type}
            documentContent={`<h2>${previewDocument.title}</h2><p>Ce document serait personnalisé avec les informations de votre projet et les entreprises sélectionnées.</p><p>Dans la version finale, vous verriez ici un aperçu complet du document généré.</p>`}
            onClose={() => setIsPreviewModalOpen(false)}
            onDownload={() => {
              setIsPreviewModalOpen(false);
              alert(`Téléchargement du document "${previewDocument.title}" (démonstration)`);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default DocumentsStep;