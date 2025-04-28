import React, { useState, useEffect } from 'react';
import AttributionSlider from './AttributionSlider';
import TotalCalculator from './TotalCalculator';
import Button from '../common/Button';

const SliderGroup = ({ 
  criteria = [], 
  onChange,
  onAddCriterion,
  showAddButton = true,
  minTotal = 100,
  maxTotal = 100
}) => {
  const [localCriteria, setLocalCriteria] = useState(criteria);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLocalCriteria(criteria);
  }, [criteria]);

  useEffect(() => {
    const newTotal = localCriteria.reduce((sum, criterion) => sum + criterion.value, 0);
    setTotal(newTotal);
  }, [localCriteria]);

  const handleSliderChange = (index, value) => {
    const updatedCriteria = [...localCriteria];
    updatedCriteria[index].value = value;
    
    setLocalCriteria(updatedCriteria);
    onChange(updatedCriteria);
  };

  const handleRemoveCriterion = (index) => {
    const updatedCriteria = [...localCriteria];
    updatedCriteria.splice(index, 1);
    
    setLocalCriteria(updatedCriteria);
    onChange(updatedCriteria);
  };

  return (
    <div className="space-y-6">
      <TotalCalculator 
        total={total} 
        targetTotal={minTotal === maxTotal ? minTotal : null}
        minTotal={minTotal}
        maxTotal={maxTotal}
      />
      
      <div className="space-y-4">
        {localCriteria.map((criterion, index) => (
          <AttributionSlider
            key={index}
            name={criterion.name}
            value={criterion.value}
            onChange={(value) => handleSliderChange(index, value)}
            onRemove={localCriteria.length > 1 ? () => handleRemoveCriterion(index) : null}
            color={criterion.color || 'blue'}
          />
        ))}
      </div>
      
      {showAddButton && onAddCriterion && (
        <div className="mt-4">
          <Button
            variant="text"
            onClick={onAddCriterion}
            className="flex items-center"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Ajouter un critère d'attribution
          </Button>
        </div>
      )}
    </div>
  );
};

export default SliderGroup;