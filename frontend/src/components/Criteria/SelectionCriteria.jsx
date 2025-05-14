// frontend/src/components/Criteria/SelectionCriteria.jsx
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CriteriaCheckbox from './CriteriaCheckbox';

const SelectionCriteria = ({ criteria, onChange }) => {
  const [expandedCriteria, setExpandedCriteria] = useState(null);
  
  const handleCriteriaSelect = (criteriaId, isSelected) => {
    const updatedCriteria = criteria.map(criterion => 
      criterion.id === criteriaId 
        ? { ...criterion, selected: isSelected } 
        : criterion
    );
    onChange(updatedCriteria);
  };
  
  const handleDepartmentSelect = (criteriaId, departments) => {
    const updatedCriteria = criteria.map(criterion => 
      criterion.id === criteriaId 
        ? { ...criterion, selectedDepartments: departments } 
        : criterion
    );
    onChange(updatedCriteria);
  };
  
  const handleAddCriterion = () => {
    const newCriterion = {
      id: criteria.length + 1,
      name: 'Nouveau critère',
      description: 'Description du critère',
      selected: true
    };
    onChange([...criteria, newCriterion]);
    setExpandedCriteria(newCriterion.id);
  };
  
  const handleRemoveCriterion = (criteriaId) => {
    const updatedCriteria = criteria.filter(criterion => criterion.id !== criteriaId);
    onChange(updatedCriteria);
  };
  
  const toggleCriteriaExpand = (criteriaId) => {
    setExpandedCriteria(expandedCriteria === criteriaId ? null : criteriaId);
  };
  
  return (
    <div className="selection-criteria">
      {criteria.map((criterion) => (
        <div 
          key={criterion.id} 
          className={`criterion-card ${expandedCriteria === criterion.id ? 'expanded' : ''}`}
          onClick={() => toggleCriteriaExpand(criterion.id)}
        >
          <div className="criterion-header">
            <div className="criterion-title-section">
              <h4>{criterion.name}</h4>
              <p className="criterion-description">{criterion.description}</p>
            </div>
            <div className="criterion-actions">
              <span className={`selection-badge ${criterion.selected ? 'selected' : ''}`}>
                Sélection
              </span>
              <CriteriaCheckbox 
                checked={criterion.selected} 
                onChange={(e) => {
                  e.stopPropagation();
                  handleCriteriaSelect(criterion.id, e.target.checked);
                }}
              />
            </div>
          </div>
          
          {expandedCriteria === criterion.id && (
            <div className="criterion-details" onClick={(e) => e.stopPropagation()}>
              {criterion.name === 'Zone d\'intervention' && criterion.options && (
                <div className="departments-selector">
                  <h5>Sélectionnez les départements concernés</h5>
                  <div className="departments-list">
                    {criterion.options.map((department, index) => (
                      <div key={index} className="department-item">
                        <input 
                          type="checkbox" 
                          id={`department-${criterion.id}-${index}`}
                          checked={criterion.selectedDepartments?.includes(department) || false}
                          onChange={(e) => {
                            const depts = criterion.selectedDepartments || [];
                            if (e.target.checked) {
                              handleDepartmentSelect(criterion.id, [...depts, department]);
                            } else {
                              handleDepartmentSelect(
                                criterion.id, 
                                depts.filter(d => d !== department)
                              );
                            }
                          }}
                        />
                        <label htmlFor={`department-${criterion.id}-${index}`}>
                          {department}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="criterion-edit-actions">
                <button 
                  className="remove-criterion-btn" 
                  onClick={() => handleRemoveCriterion(criterion.id)}
                >
                  <Trash2 size={16} />
                  Supprimer ce critère
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <button className="add-criterion-btn" onClick={handleAddCriterion}>
        <Plus size={18} />
        Ajouter un critère de sélection
      </button>
    </div>
  );
};

export default SelectionCriteria;