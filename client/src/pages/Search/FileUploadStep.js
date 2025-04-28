import React from 'react';
import { useSearch } from '../../context/SearchContext';
import FileUploader from '../../components/FileUpload/FileUploader';
import Button from '../../components/common/Button';

const FileUploadStep = () => {
  const { specificationFile, setSpecificationFile, nextStep } = useSearch();

  const handleFileSelect = (file) => {
    setSpecificationFile(file);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          1. Téléverser votre cahier des charges
        </h2>
        <p className="text-gray-600 mb-6">
          Commencez par téléverser votre cahier des charges. L'IA analysera son contenu pour extraire les informations pertinentes.
        </p>
        
        <FileUploader
          onFileSelect={handleFileSelect}
          acceptedFileTypes=".pdf,.doc,.docx"
          maxFileSize={10}
          label="Téléverser votre cahier des charges"
          description="Glissez-déposez votre fichier ici ou cliquez pour parcourir"
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={nextStep} 
          disabled={!specificationFile}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default FileUploadStep;