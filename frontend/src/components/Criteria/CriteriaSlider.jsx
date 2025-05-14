// frontend/src/components/Criteria/CriteriaSlider.jsx
import React, { useState, useEffect } from 'react';

const CriteriaSlider = ({ value, onChange, min = 0, max = 100, step = 5 }) => {
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setLocalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  const calculatePercentage = () => {
    return ((localValue - min) / (max - min)) * 100;
  };
  
  return (
    <div className="criteria-slider">
      <div className="slider-container">
        <div 
          className="slider-fill" 
          style={{ width: `${calculatePercentage()}%` }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          className="slider-input"
        />
      </div>
    </div>
  );
};

export default CriteriaSlider;