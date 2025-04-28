import React, { useState } from 'react';
import Button from '../../components/common/Button';
import DocumentCard from '../../components/DocumentGeneration/DocumentCard';
import DocumentPreview from '../../components/DocumentGeneration/DocumentPreview';
import Modal from '../../components/common/Modal';

const DocumentsPage = () => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // Modèles de documents
  const documentTemplates = [
    {
      id: 'tpl1',
      title: 'Projet de marché',
      description: 'Document type incluant les clauses administratives et techniques',
      icon: 'contract',
      type: 'docx',
      lastUpdated: '15 Avr 2025'
    },
    {
      id: 'tpl2',
      title: 'Règlement de consultation',
      description: 'Document définissant les règles de la consultation',
      icon: 'rules',
      type: 'docx',
      lastUpdated: '12 Avr 2025'
    },
    {
      id: 'tpl3',
      title: 'Grille d\'évaluation',
      description: 'Grille pour évaluer les offres selon les critères d\'attribution',
      icon: 'evaluation',
      type: 'xlsx',
      lastUpdated: '10 Avr 2025'
    },
    {
      id: 'tpl4',
      title: 'Lettre de consultation',
      description: 'Lettre type pour inviter les entreprises à consulter',
      icon: 'letter',
      type: 'docx',
      lastUpdated: '08 Avr 2025'
    }
  ];

  const handlePreviewDocument = (docId) => {
    const doc = documentTemplates.find(d => d.id === docId);
    setSelectedDocument(doc);
    setIsPreviewModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file.name.endsWith('.docx') || file.name.endsWith('.xlsx')) {
        setUploadFile(file);
        setUploadError(null);
      } else {
        setUploadFile(null);
        setUploadError('Format de fichier non supporté. Veuillez sélectionner un fichier Word (.docx) ou Excel (.xlsx).');
      }
    }
  };

  const handleUpload = () => {
    // Simulation d'upload
    setTimeout(() => {
      setIsUploadModalOpen(false);
      setUploadFile(null);
      alert('Modèle de document ajouté avec succès !');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Documents types</h1>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          Ajouter un modèle
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Modèles de documents disponibles
        </h2>
        <p className="text-gray-600 mb-6">
          Ces modèles sont utilisés pour générer automatiquement les documents de consultation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentTemplates.map((doc) => (
            <div key={doc.id} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {doc.icon === 'contract' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    )}
                    {doc.icon === 'rules' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    )}
                    {doc.icon === 'evaluation' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                      </svg>
                    )}
                    {doc.icon === 'letter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{doc.description}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase ${
                        doc.type === 'docx' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {doc.type}
                      </span>
                      <span className="ml-2">Mis à jour: {doc.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t flex justify-end">
                <Button
                  variant="text"
                  onClick={() => handlePreviewDocument(doc.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Aperçu
                </Button>
                <Button
                  variant="text"
                  className="text-blue-600 hover:text-blue-900 ml-2"
                >
                  Télécharger
                </Button>
                <Button
                  variant="text"
                  className="text-red-600 hover:text-red-900 ml-2"
                >
                  Remplacer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour la prévisualisation */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Aperçu du modèle de document"
        size="large"
      >
        {selectedDocument && (
          <DocumentPreview
            documentType={selectedDocument.type}
            documentContent={`<h2>${selectedDocument.title}</h2><p>Ceci est un aperçu simplifié du modèle de document "${selectedDocument.title}".</p><p>Dans la version finale, vous verriez ici le contenu du document avec les variables remplaçables mises en évidence.</p>`}
            onClose={() => setIsPreviewModalOpen(false)}
            onDownload={() => {
              setIsPreviewModalOpen(false);
              alert(`Téléchargement du modèle "${selectedDocument.title}" (démonstration)`);
            }}
          />
        )}
      </Modal>

      {/* Modal pour l'ajout d'un modèle */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Ajouter un modèle de document"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsUploadModalOpen(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!uploadFile}
            >
              Ajouter
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">
              Nom du modèle
            </label>
            <input
              type="text"
              id="templateName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Cahier des clauses techniques"
            />
          </div>
          
          <div>
            <label htmlFor="templateDescription" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="templateDescription"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description du modèle de document"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fichier modèle
            </label>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="template-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Sélectionner un fichier</span>
                    <input id="template-upload" name="template-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.xlsx" />
                  </label>
                  <p className="pl-1">ou glisser-déposer</p>
                </div>
                <p className="text-xs text-gray-500">
                  Word (.docx) ou Excel (.xlsx)
                </p>
              </div>
            </div>
          </div>
          
          {uploadFile && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-blue-700">{uploadFile.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setUploadFile(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          {uploadError && (
            <div className="text-sm text-red-600">
              {uploadError}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DocumentsPage;