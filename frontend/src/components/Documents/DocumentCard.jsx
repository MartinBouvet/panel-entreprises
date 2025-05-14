// frontend/src/components/Documents/DocumentCard.jsx
import React from 'react';
import { Check } from 'lucide-react';

const DocumentCard = ({ title, description, icon, color, selected, onSelect }) => {
  const handleChange = (e) => {
    if (onSelect) {
      onSelect(e.target.checked);
    }
  };
  
  return (
    <div className={`document-card ${selected ? 'selected' : ''}`}>
      <div className="document-card-content">
        <div className="document-icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
        
        <div className="document-info">
          <h4 className="document-title">{title}</h4>
          <p className="document-description">{description}</p>
        </div>
      </div>
      
      <div className="document-select">
        <label className="document-checkbox">
          <input 
            type="checkbox" 
            checked={selected} 
            onChange={handleChange} 
          />
          <span className="checkmark">
            {selected && <Check size={14} />}
          </span>
        </label>
      </div>
    </div>
  );
};

export default DocumentCard;