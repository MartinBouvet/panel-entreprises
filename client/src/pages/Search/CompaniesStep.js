import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import CompanyTable from '../../components/CompanyList/CompanyTable';
import CompanyDetails from '../../components/CompanyList/CompanyDetails';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';

const CompaniesStep = () => {
  const { 
    selectedCompanies,
    updateSelectedCompanies,
    nextStep, 
    prevStep 
  } = useSearch();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Simuler une liste d'entreprises correspondantes aux critères
  const mockCompanies = [
    {
      id: 'E1',
      name: 'ElectroTech Solutions',
      location: 'Paris (75)',
      experience: 5,
      revenue: '12M€',
      certifications: ['MASE', 'ISO 9001'],
      employees: 120,
      founded: '2005',
      score: 92,
      regions: ['Île-de-France', 'Hauts-de-France', 'Grand Est'],
      projects: [
        'Rénovation système électrique centrale EDF Nogent (2022)',
        'Maintenance préventive CNPE Flamanville (2021)',
        'Installation transformateurs HTB/HTA site industriel Dunkerque (2020)',
        'Câblage informatique bâtiment Saclay (2019)',
        'Audit sécurité électrique raffinerie Total Gonfreville (2018)'
      ],
      description: 'Spécialiste des interventions électriques en milieu industriel sensible, ElectroTech Solutions dispose d\'une expertise reconnue dans le secteur de l\'énergie et du nucléaire.'
    },
    {
      id: 'E2',
      name: 'PowerGrid France',
      location: 'Versailles (78)',
      experience: 4,
      revenue: '8M€',
      certifications: ['MASE'],
      employees: 85,
      founded: '2010',
      score: 85,
      regions: ['Île-de-France', 'Normandie', 'Centre-Val de Loire'],
      projects: [
        'Remplacement disjoncteurs centrale de Chinon (2021)',
        'Maintenance tableaux électriques CNPE Paluel (2020)',
        'Installation système surveillance électrique usine Renault Flins (2019)',
        'Déploiement réseau fibre optique campus EDF Lab (2018)'
      ],
      description: 'PowerGrid France est spécialisée dans la réalisation et la maintenance d\'infrastructures électriques pour les sites industriels et notamment le secteur de l\'énergie.'
    },
    {
      id: 'E3',
      name: 'HT Electric',
      location: 'Nanterre (92)',
      experience: 6,
      revenue: '15M€',
      certifications: ['MASE', 'ISO 14001'],
      employees: 145,
      founded: '2002',
      score: 88,
      regions: ['Île-de-France', 'Bourgogne-Franche-Comté', 'Auvergne-Rhône-Alpes'],
      projects: [
        'Rénovation complète poste HTB centrale Bugey (2022)',
        'Maintenance alternateurs CNPE Tricastin (2021)',
        'Installation réseau secouru data center Val d\'Europe (2020)',
        'Câblage haute tension poste source Ivry (2019)',
        'Audit et mise aux normes installations électriques site CEA Marcoule (2018)'
      ],
      description: 'HT Electric est un acteur majeur de l\'électricité industrielle haute tension en France. L\'entreprise accompagne les grands comptes de l\'énergie dans leurs projets de maintenance et d\'évolution de leurs installations.'
    }
  ];

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setIsDetailsModalOpen(true);
  };

  const handleSelectCompany = (company) => {
    const isAlreadySelected = selectedCompanies.some(c => c.id === company.id);
    
    if (isAlreadySelected) {
      updateSelectedCompanies(selectedCompanies.filter(c => c.id !== company.id));
    } else {
      // Limit to 3 companies max
      if (selectedCompanies.length >= 3) {
        updateSelectedCompanies([...selectedCompanies.slice(1), company]);
      } else {
        updateSelectedCompanies([...selectedCompanies, company]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          4. Panel d'entreprises proposé
        </h2>
        <p className="text-gray-600 mb-6">
          Voici les entreprises correspondant à vos critères de sélection.
          Sélectionnez jusqu'à 3 entreprises pour votre consultation.
        </p>
        
        <Alert type="info" title="Simulation">
          En situation réelle, les entreprises seraient proposées selon vos critères de sélection.
          Ci-dessous, un exemple de panel d'entreprises est présenté pour la démonstration.
        </Alert>
        
        <div className="mt-6">
          <CompanyTable
            companies={mockCompanies}
            onViewDetails={handleViewDetails}
            onSelectCompany={updateSelectedCompanies}
            selectedCompanies={selectedCompanies}
            maxSelections={3}
          />
        </div>
        
        {selectedCompanies.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Entreprises sélectionnées ({selectedCompanies.length}/3)
            </h3>
            <div className="flex items-center space-x-4">
              {selectedCompanies.map((company) => (
                <div 
                  key={company.id}
                  className="flex items-center px-3 py-2 bg-blue-50 border border-blue-200 rounded-md"
                >
                  <span className="font-medium">{company.name}</span>
                  <button
                    onClick={() => handleSelectCompany(company)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
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
          onClick={nextStep} 
          disabled={selectedCompanies.length === 0}
        >
          Continuer
        </Button>
      </div>
      
      {/* Modal pour les détails d'une entreprise */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Détails de l'entreprise"
        size="large"
      >
        {selectedCompany && (
          <CompanyDetails
            company={selectedCompany}
            onClose={() => setIsDetailsModalOpen(false)}
            onSelect={handleSelectCompany}
            isSelected={selectedCompanies.some(c => c.id === selectedCompany.id)}
          />
        )}
      </Modal>
    </div>
  );
};

export default CompaniesStep;