import React from 'react';
import Button from '../common/Button';

const DocumentPreview = ({ 
  documentType,
  documentContent,
  onClose,
  onDownload,
  isLoading = false
}) => {
  // Icône en fonction du type de document
  const getDocumentIcon = () => {
    switch (documentType) {
      case 'pdf':
        return (
          <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'docx':
        return (
          <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'xlsx':
        return (
          <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full max-h-screen flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          {getDocumentIcon()}
          <h2 className="ml-3 text-xl font-semibold text-gray-900">
            Prévisualisation du document
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-grow overflow-auto p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-3 text-sm text-gray-500">Génération du document en cours...</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50 min-h-[400px]">
            {documentContent ? (
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: documentContent }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <p className="mt-2">Aperçu non disponible</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 flex justify-between">
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
        <Button 
          variant="primary" 
          onClick={onDownload}
          disabled={isLoading || !documentContent}
        >
          Télécharger
        </Button>
      </div>
    </div>
  );
};

export default DocumentPreview;