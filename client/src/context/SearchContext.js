import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  // État pour le fichier cahier des charges
  const [specificationFile, setSpecificationFile] = useState(null);
  
  // État pour les mots-clés
  const [keywords, setKeywords] = useState([]);
  
  // État pour les critères de sélection
  const [selectionCriteria, setSelectionCriteria] = useState([]);
  
  // État pour les critères d'attribution
  const [attributionCriteria, setAttributionCriteria] = useState([
    { id: 1, name: 'Qualité technique de l\'offre', value: 40 },
    { id: 2, name: 'Coût global de l\'offre', value: 30 },
    { id: 3, name: 'Respect des délais', value: 15 },
    { id: 4, name: 'Qualité de l\'organisation sécurité', value: 10 },
    { id: 5, name: 'Intégration de la RSE', value: 5 }
  ]);
  
  // État pour les entreprises sélectionnées
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  
  // État pour les documents à générer
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  
  // État pour l'étape actuelle du processus
  const [currentStep, setCurrentStep] = useState(0);
  
  // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, 7)); // 7 étapes au total
  };
  
  // Fonction pour revenir à l'étape précédente
  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };
  
  // Fonction pour aller à une étape spécifique
  const goToStep = (step) => {
    setCurrentStep(Math.min(Math.max(step, 0), 7));
  };
  
  // Fonction pour ajouter un mot-clé
  const addKeyword = (keyword) => {
    if (!keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
    }
  };
  
  // Fonction pour supprimer un mot-clé
  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };
  
  // Fonction pour ajouter un critère de sélection
  const addSelectionCriterion = (criterion) => {
    setSelectionCriteria([...selectionCriteria, criterion]);
  };
  
  // Fonction pour supprimer un critère de sélection
  const removeSelectionCriterion = (index) => {
    setSelectionCriteria(selectionCriteria.filter((_, i) => i !== index));
  };
  
  // Fonction pour modifier un critère de sélection
  const updateSelectionCriterion = (index, updatedCriterion) => {
    const updatedCriteria = [...selectionCriteria];
    updatedCriteria[index] = updatedCriterion;
    setSelectionCriteria(updatedCriteria);
  };
  
  // Fonction pour activer/désactiver un critère de sélection
  const toggleSelectionCriterion = (index) => {
    const updatedCriteria = [...selectionCriteria];
    updatedCriteria[index].selected = !updatedCriteria[index].selected;
    setSelectionCriteria(updatedCriteria);
  };
  
  // Fonction pour mettre à jour les critères d'attribution
  const updateAttributionCriteria = (criteria) => {
    setAttributionCriteria(criteria);
  };
  
  // Fonction pour ajouter une entreprise
  const addCompany = (company) => {
    if (!selectedCompanies.some(c => c.id === company.id)) {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };
  
  // Fonction pour supprimer une entreprise
  const removeCompany = (companyId) => {
    setSelectedCompanies(selectedCompanies.filter(c => c.id !== companyId));
  };
  
  // Fonction pour mettre à jour les entreprises sélectionnées
  const updateSelectedCompanies = (companies) => {
    setSelectedCompanies(companies);
  };
  
  // Fonction pour mettre à jour les documents sélectionnés
  const updateSelectedDocuments = (documents) => {
    setSelectedDocuments(documents);
  };
  
  // Fonction pour réinitialiser la recherche
  const resetSearch = () => {
    setSpecificationFile(null);
    setKeywords([]);
    setSelectionCriteria([]);
    setAttributionCriteria([
      { id: 1, name: 'Qualité technique de l\'offre', value: 40 },
      { id: 2, name: 'Coût global de l\'offre', value: 30 },
      { id: 3, name: 'Respect des délais', value: 15 },
      { id: 4, name: 'Qualité de l\'organisation sécurité', value: 10 },
      { id: 5, name: 'Intégration de la RSE', value: 5 }
    ]);
    setSelectedCompanies([]);
    setSelectedDocuments([]);
    setCurrentStep(0);
  };
  
  return (
    <SearchContext.Provider 
      value={{
        // États
        specificationFile,
        keywords,
        selectionCriteria,
        attributionCriteria,
        selectedCompanies,
        selectedDocuments,
        currentStep,
        
        // Setters
        setSpecificationFile,
        setKeywords,
        setSelectionCriteria,
        setAttributionCriteria,
        setSelectedCompanies,
        setSelectedDocuments,
        setCurrentStep,
        
        // Actions
        nextStep,
        prevStep,
        goToStep,
        addKeyword,
        removeKeyword,
        addSelectionCriterion,
        removeSelectionCriterion,
        updateSelectionCriterion,
        toggleSelectionCriterion,
        updateAttributionCriteria,
        addCompany,
        removeCompany,
        updateSelectedCompanies,
        updateSelectedDocuments,
        resetSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};