import React, { useState } from 'react';
import Button from '../../components/common/Button';
import CompanyTable from '../../components/CompanyList/CompanyTable';
import CompanyDetails from '../../components/CompanyList/CompanyDetails';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';

const DatabasePage = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [importFile, setImportFile] = useState(null);
  const [importError, setImportError] = useState(null);

  // Données fictives d'entreprises
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
      regions: ['Île-de-France', 'Hauts-de-France', 'Grand Est']
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
      regions: ['Île-de-France', 'Normandie', 'Centre-Val de Loire']
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
      regions: ['Île-de-France', 'Bourgogne-Franche-Comté', 'Auvergne-Rhône-Alpes']
    },
    {
      id: 'E4',
      name: 'MécaTech Industrie',
      location: 'Lyon (69)',
      experience: 3,
      revenue: '5M€',
      certifications: ['ISO 9001'],
      employees: 65,
      founded: '2012',
      regions: ['Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur']
    },
    {
      id: 'E5',
      name: 'Nordelec',
      location: 'Lille (59)',
      experience: 7,
      revenue: '18M€',
      certifications: ['MASE', 'ISO 9001', 'ISO 14001'],
      employees: 170,
      founded: '1998',
      regions: ['Hauts-de-France', 'Grand Est', 'Normandie']
    }
  ];

  const filteredCompanies = mockCompanies.filter(company => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      company.name.toLowerCase().includes(term) ||
      company.location.toLowerCase().includes(term) ||
      company.certifications.some(cert => cert.toLowerCase().includes(term))
    );
  });

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setIsDetailsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setImportFile(file);
        setImportError(null);
      } else {
        setImportFile(null);
        setImportError('Format de fichier non supporté. Veuillez sélectionner un fichier Excel (.xlsx ou .xls).');
      }
    }
  };

  const handleImport = () => {
    // Simulation d'import
    setTimeout(() => {
      setIsImportModalOpen(false);
      setImportFile(null);
      alert('Import réussi ! 450 entreprises ont été importées dans la base de données.');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Base de données entreprises</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une entreprise..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Button onClick={() => setIsImportModalOpen(true)}>
            Importer des entreprises
          </Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <CompanyTable
          companies={filteredCompanies}
          onViewDetails={handleViewDetails}
          showScore={false}
        />
      </div>

      <Alert type="info" title="Base de données de démonstration">
        Cette page montre un exemple de la base de données d'entreprises. Dans la version finale, la liste contiendra les 450 entreprises importées depuis votre fichier Excel.
      </Alert>

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
          />
        )}
      </Modal>

      {/* Modal pour l'import d'entreprises */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Importer des entreprises"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsImportModalOpen(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleImport}
              disabled={!importFile}
            >
              Importer
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Importez un fichier Excel (.xlsx) contenant votre liste d'entreprises.
            Assurez-vous que le fichier contient les colonnes suivantes : Nom, Localisation, CA, Effectif, Certifications, etc.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Sélectionner un fichier</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".xlsx,.xls" />
                </label>
                <p className="pl-1">ou glisser-déposer</p>
              </div>
              <p className="text-xs text-gray-500">
                Excel (.xlsx, .xls)
              </p>
            </div>
          </div>
          
          {importFile && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-blue-700">{importFile.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setImportFile(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          {importError && (
            <div className="text-sm text-red-600">
              {importError}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DatabasePage;