import React from 'react';
import CriteriaCard from './CriteriaCard';
import Button from '../common/Button';

const CriteriaList = ({
  criteria = [],
  onAddCriteria,
  onRemoveCriteria,
  onToggleCriteria,
  onEditCriteria,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {criteria.map((criterion, index) => (
        <CriteriaCard
          key={index}
          criterion={criterion}
          onToggle={() => onToggleCriteria(index)}
          onRemove={() => onRemoveCriteria(index)}
          onEdit={(updatedCriterion) => onEditCriteria(index, updatedCriterion)}
        />
      ))}

      {onAddCriteria && (
        <div className="mt-4">
          <Button
            variant="text"
            onClick={onAddCriteria}
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
            Ajouter un critère de sélection
          </Button>
        </div>
      )}
    </div>
  );
};

export default CriteriaList;