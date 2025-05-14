// frontend/src/components/Criteria/AttributionCriteria.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CriteriaSlider from './CriteriaSlider';

const AttributionCriteria = ({ criteria, onChange }) => {
  const [localCriteria, setLocalCriteria] = useState(criteria);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const sum = localCriteria.reduce((acc, criterion) => acc + criterion.weight, 0);
    setTotal(sum);
    
    if (sum !== 100 && sum !== 0) {
      setError('Le total des critères doit être égal à 100%');
    } else {
      setError('');
    }
  }, [localCriteria]);
  
  const handleWeightChange = (id, newWeight) => {
    const updated = localCriteria.map(criterion => 
      criterion.id === id 
        ? { ...criterion, weight: newWeight } 
        : criterion
    );
    
    setLocalCriteria(updated);
    
    if (onChange) {
      onChange(updated);
    }
  };
  
  const handleAddCriterion = () => {
    const newCriterion = {
      id: localCriteria.length + 1,
      name: 'Nouveau critère d\'attribution',
      weight: 0
    };
    
    const updated = [...localCriteria, newCriterion];
    setLocalCriteria(updated);
    
    if (onChange) {
      onChange(updated);
    }
  };
  
  const handleRemoveCriterion = (id) => {
    // Calculate the weight to distribute
    const criterionToRemove = localCriteria.find(c => c.id === id);
    const weightToDistribute = criterionToRemove ? criterionToRemove.weight : 0;
    
    // Remove the criterion
    const filtered = localCriteria.filter(criterion => criterion.id !== id);
    
    // Distribute the weight among remaining criteria
    if (filtered.length > 0 && weightToDistribute > 0) {
      const weightPerCriterion = Math.floor(weightToDistribute / filtered.length);
      let remainder = weightToDistribute % filtered.length;
      
      const updated = filtered.map((criterion, index) => {
        let additionalWeight = weightPerCriterion;
        if (remainder > 0) {
          additionalWeight += 1;
          remainder -= 1;
        }
        
        return {
          ...criterion,
          weight: criterion.weight + additionalWeight
        };
      });
      
      setLocalCriteria(updated);
      
      if (onChange) {
        onChange(updated);
      }
    } else {
      setLocalCriteria(filtered);
      
      if (onChange) {
        onChange(filtered);
      }
    }
  };
  
  return (
    <div className="attribution-criteria">
      <div className="criteria-total">
        <div className="total-header">
          <h4>Total des critères d'attribution:</h4>
          <span className={`total-value ${total === 100 ? 'valid' : 'invalid'}`}>
            {total}%
          </span>
        </div>
        {error ? (
          <p className="total-error">{error}</p>
        ) : (
          <p className="total-status">Le total est correct</p>
        )}
      </div>
      
      <div className="criteria-list">
        {localCriteria.map(criterion => (
          <div key={criterion.id} className="criterion-item">
            <div className="criterion-info">
              <h4>{criterion.name}</h4>
              <div className="weight-badge">
                <span className="attribution-badge">Attribution</span>
                <span className="weight-value">{criterion.weight}%</span>
              </div>
            </div>
            
            <div className="criterion-slider">
              <CriteriaSlider 
                value={criterion.weight}
                onChange={(newValue) => handleWeightChange(criterion.id, newValue)}
                min={0}
                max={100}
                step={5}
              />
            </div>
            
            <button
              className="remove-criterion"
              onClick={() => handleRemoveCriterion(criterion.id)}
            >
              <Trash2 size={16} />
              Supprimer
            </button>
          </div>
        ))}
      </div>
      
      <button className="add-criterion-btn" onClick={handleAddCriterion}>
        <Plus size={18} />
        Ajouter un critère d'attribution
      </button>
    </div>
  );
};

export default AttributionCriteria;