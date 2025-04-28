import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import CriteriaList from '../../components/CriteriaSelect/CriteriaList';
import RegionSelector from '../../components/CriteriaSelect/RegionSelector';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';

const CriteriaStep = () => {
  const { 
    selectionCriteria, 
    addSelectionCriterion,
    removeSelectionCriterion,
    updateSelectionCriterion,
    toggleSelectionCriterion,
    nextStep, 
    prevStep 
  } = useSearch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [newCriterion, setNewCriterion] = useState({
    name: '',
    description: '',
    selected: true,
    type: 'text'
  });

  const handleAddCriterion = () => {
    setNewCriterion({
      name: '',
      description: '',
      selected: true,
      type: 'text'
    });
    setModalType('add');
    setIsModalOpen(true);
  };

  const handleSaveCriterion = () => {
    if (newCriterion.name.trim() === '') {
      return;
    }

    if (modalType === 'region') {
      addSelectionCriterion({
        name: 'Zone d\'intervention',
        description: `Departments sélectionnés: ${selectedDepartments.length}`,
        selected: true,
        type: 'region',
        departments: selectedDepartments
      });
    } else {
      addSelectionCriterion(newCriterion);
    }

    setIsModalOpen(false);
  };

  const handleRegionSelect = () => {
    setSelectedDepartments([]);
    setModalType('region');
    setIsModalOpen(true);
  };

  // Critères exemple par défaut
  const defaultCriteria = [
    {
      name: 'Expérience dans projets similaires',
      description: 'Minimum 3 projets similaires réalisés dans les 5 dernières années',
      selected: true,
      type: 'text'
    },
    {
      name: 'Certification MASE ou équivalent',
      description: 'Certification obligatoire pour ce type de travaux',
      selected: true,
      type: 'text'
    },
    {
      name: 'Capacité de production',
      description: 'Minimum 10 salariés pour assurer les délais',
      selected: true,
      type: 'text'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          3. Critères de sélection proposés
        </h2>
        <p className="text-gray-600 mb-6">
          L'IA a suggéré les critères suivants basés sur votre cahier des charges. Vous pouvez les ajuster selon vos besoins.
        </p>
        
        {selectionCriteria.length === 0 && (
          <Alert type="info" title="Simulation">
            En situation réelle, l'IA aurait analysé votre document et proposé des critères de sélection adaptés.
            Des critères par défaut sont affichés ci-dessous pour la démonstration.
          </Alert>
        )}
        
        <div className="mt-6">
          <CriteriaList
            criteria={selectionCriteria.length > 0 ? selectionCriteria : defaultCriteria}
            onAddCriteria={handleAddCriterion}
            onRemoveCriteria={removeSelectionCriterion}
            onToggleCriteria={toggleSelectionCriterion}
            onEditCriteria={updateSelectionCriterion}
          />
          
          <div className="mt-4">
            <Button
              variant="text"
              onClick={handleRegionSelect}
              className="flex items-center"
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Ajouter une zone d'intervention
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={prevStep}
        >
          Retour
        </Button>
        <Button onClick={nextStep}>
          Continuer
        </Button>
      </div>
      
      {/* Modal pour ajouter un critère */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'region' ? "Sélectionner les départements" : "Ajouter un critère de sélection"}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleSaveCriterion}>
              Enregistrer
            </Button>
          </>
        }
      >
        {modalType === 'region' ? (
          <RegionSelector
            selectedDepartments={selectedDepartments}
            onChange={setSelectedDepartments}
          />
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="criterionName" className="block text-sm font-medium text-gray-700">
                Nom du critère
              </label>
              <input
                type="text"
                id="criterionName"
                value={newCriterion.name}
                onChange={(e) => setNewCriterion({ ...newCriterion, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Certification requise"
              />
            </div>
            <div>
              <label htmlFor="criterionDescription" className="block text-sm font-medium text-gray-700">
                Description (optionnel)
              </label>
              <textarea
                id="criterionDescription"
                value={newCriterion.description}
                onChange={(e) => setNewCriterion({ ...newCriterion, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description détaillée du critère"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CriteriaStep;