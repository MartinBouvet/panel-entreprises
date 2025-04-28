import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import SliderGroup from '../../components/AttributionSliders/SliderGroup';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const AttributionStep = () => {
  const { 
    attributionCriteria, 
    updateAttributionCriteria,
    nextStep, 
    prevStep 
  } = useSearch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCriterion, setNewCriterion] = useState({
    name: '',
    value: 5,
    color: 'blue'
  });

  const handleCriteriaChange = (updatedCriteria) => {
    updateAttributionCriteria(updatedCriteria);
  };

  const handleAddCriterion = () => {
    setIsModalOpen(true);
    setNewCriterion({
      name: '',
      value: 5,
      color: 'blue'
    });
  };

  const handleSaveCriterion = () => {
    if (newCriterion.name.trim() === '') {
      return;
    }

    const newId = Math.max(0, ...attributionCriteria.map(c => c.id)) + 1;
    const newCriteriaItem = {
      ...newCriterion,
      id: newId
    };

    // Adjust all criteria values to maintain total of 100%
    const currentTotal = attributionCriteria.reduce((sum, c) => sum + c.value, 0);
    const remaining = 100 - currentTotal;
    
    if (remaining >= newCriterion.value) {
      // We have enough remaining percentage
      updateAttributionCriteria([...attributionCriteria, newCriteriaItem]);
    } else {
      // Need to adjust values proportionally
      const ratio = (100 - newCriterion.value) / currentTotal;
      const adjustedCriteria = attributionCriteria.map(c => ({
        ...c,
        value: Math.round(c.value * ratio)
      }));
      
      updateAttributionCriteria([...adjustedCriteria, newCriteriaItem]);
    }

    setIsModalOpen(false);
  };

  const isTotalValid = () => {
    const total = attributionCriteria.reduce((sum, criterion) => sum + criterion.value, 0);
    return total === 100;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          4. Critères d'attribution
        </h2>
        <p className="text-gray-600 mb-6">
          Répartissez les pourcentages entre les différents critères d'attribution. 
          Le total doit être égal à 100%.
        </p>
        
        <SliderGroup
          criteria={attributionCriteria}
          onChange={handleCriteriaChange}
          onAddCriterion={handleAddCriterion}
          minTotal={100}
          maxTotal={100}
        />
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
          disabled={!isTotalValid()}
        >
          Continuer
        </Button>
      </div>

      {/* Modal pour ajouter un critère */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter un critère d'attribution"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSaveCriterion}
              disabled={!newCriterion.name.trim()}
            >
              Ajouter
            </Button>
          </>
        }
      >
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
              placeholder="Ex: Qualité environnementale"
            />
          </div>
          
          <div>
            <label htmlFor="criterionValue" className="block text-sm font-medium text-gray-700">
              Pourcentage initial ({newCriterion.value}%)
            </label>
            <input
              type="range"
              id="criterionValue"
              min="5"
              max="50"
              step="5"
              value={newCriterion.value}
              onChange={(e) => setNewCriterion({ ...newCriterion, value: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur
            </label>
            <div className="flex space-x-2">
              {['blue', 'green', 'red', 'purple', 'yellow'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewCriterion({ ...newCriterion, color })}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    newCriterion.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{ backgroundColor: getColorHex(color) }}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Helper pour convertir le nom de couleur en code hex
const getColorHex = (color) => {
  const colors = {
    blue: '#2563eb',
    green: '#059669',
    red: '#dc2626',
    purple: '#7c3aed',
    yellow: '#f59e0b'
  };
  
  return colors[color] || colors.blue;
};

export default AttributionStep;