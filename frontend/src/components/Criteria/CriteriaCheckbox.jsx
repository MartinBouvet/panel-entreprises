// frontend/src/components/Criteria/CriteriaCheckbox.jsx
import React from 'react';
import { Check } from 'lucide-react';

const CriteriaCheckbox = ({ checked, onChange, label }) => {
  return (
    <div className="criteria-checkbox">
      <label className="checkbox-container">
        {label}
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
        />
        <span className="checkmark">
          {checked && <Check size={14} />}
        </span>
      </label>
    </div>
  );
};

export default CriteriaCheckbox;