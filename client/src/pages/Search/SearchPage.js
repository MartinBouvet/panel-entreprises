import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SearchProvider } from '../../context/SearchContext';
import StepIndicator from '../../components/common/StepIndicator';
import { useSearch } from '../../context/SearchContext';
import FileUploadStep from './FileUploadStep';
import KeywordsStep from './KeywordsStep';
import CriteriaStep from './CriteriaStep';
import AttributionStep from './AttributionStep';
import CompaniesStep from './CompaniesStep';
import DocumentsStep from './DocumentsStep';

// Étapes du processus de recherche
const steps = [
  { id: 0, label: 'Cahier des charges', path: 'upload' },
  { id: 1, label: 'Critères', path: 'criteria' },
  { id: 2, label: 'Liste courte', path: 'companies' },
  { id: 3, label: 'Doc. consultation', path: 'documents' },
  { id: 4, label: 'Dauphin', path: 'dauphin' },
  { id: 5, label: 'Intégration offres', path: 'offers' },
  { id: 6, label: 'Analyses', path: 'analysis' },
  { id: 7, label: 'Fiche synthèse', path: 'summary' }
];

// Composant de navigation entre les étapes
const SearchNav = () => {
  const { currentStep, goToStep } = useSearch();

  return (
    <div className="mb-6">
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onChange={goToStep}
      />
    </div>
  );
};

// Composant principal
const SearchPageContent = () => {
  const { currentStep } = useSearch();

  // Redirection automatique vers la bonne route en fonction de l'étape actuelle
  const getRedirectPath = () => {
    return `/search/${steps[currentStep].path}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Recherche d'entreprises</h1>
      <SearchNav />
      <Routes>
        <Route path="/" element={<Navigate to={getRedirectPath()} replace />} />
        <Route path="upload" element={<FileUploadStep />} />
        <Route path="keywords" element={<KeywordsStep />} />
        <Route path="criteria" element={<CriteriaStep />} />
        <Route path="attribution" element={<AttributionStep />} />
        <Route path="companies" element={<CompaniesStep />} />
        <Route path="documents" element={<DocumentsStep />} />
        <Route path="*" element={<Navigate to={getRedirectPath()} replace />} />
      </Routes>
    </div>
  );
};

// Wrapper avec le provider
const SearchPage = () => {
  return (
    <SearchProvider>
      <SearchPageContent />
    </SearchProvider>
  );
};

export default SearchPage;