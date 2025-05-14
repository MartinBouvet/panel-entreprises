// frontend/src/components/Results/CompanyCard.jsx
import React from 'react';
import { Eye, Check } from 'lucide-react';

const CompanyCard = ({ company, onSelect }) => {
  const { id, name, location, experience, certifications, score, ca, selected = true } = company;
  
  const handleSelectChange = (e) => {
    if (onSelect) {
      onSelect(e.target.checked);
    }
  };
  
  const handleViewDetails = () => {
    // Could open a modal with company details
    console.log('View details for company:', id);
  };
  
  // Generate a color for the company "avatar"
  const generateColor = (id) => {
    const colors = [
      '#4285F4', '#34A853', '#FBBC05', '#EA4335', 
      '#673AB7', '#3F51B5', '#2196F3', '#03A9F4'
    ];
    const index = id.toString().charCodeAt(id.toString().length - 1) % colors.length;
    return colors[index];
  };
  
  // Get company initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  return (
    <div className={`company-card ${selected ? 'selected' : ''}`}>
      <div className="company-info">
        <div className="company-avatar" style={{ backgroundColor: generateColor(id) }}>
          {getInitials(name)}
        </div>
        <div className="company-details">
          <h4 className="company-name">{name}</h4>
          <p className="company-ca">CA: {ca}</p>
        </div>
      </div>
      
      <div className="company-location">
        {location}
      </div>
      
      <div className="company-experience">
        {experience}
      </div>
      
      <div className="company-certifications">
        {certifications.map((cert, index) => (
          <span key={index} className={`certification-badge ${cert.toLowerCase()}`}>
            {cert}
          </span>
        ))}
      </div>
      
      <div className="company-score">
        <div className="score-value">{score}%</div>
      </div>
      
      <div className="company-actions">
        <button className="view-details-btn" onClick={handleViewDetails}>
          <Eye size={18} />
        </button>
        <label className="select-company-checkbox">
          <input 
            type="checkbox" 
            checked={selected} 
            onChange={handleSelectChange} 
          />
          <span className="checkmark">
            {selected && <Check size={14} />}
          </span>
        </label>
      </div>
    </div>
  );
};

export default CompanyCard;