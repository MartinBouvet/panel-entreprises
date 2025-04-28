import React, { useState, useEffect } from 'react';

const AttributionSlider = ({ 
  name,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  color = 'blue',
  onRemove,
  showRemoveButton = true
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setLocalValue(newValue);
  };

  const handleAfterChange = () => {
    onChange(localValue);
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-600'
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-grow">
          <label className="text-sm font-medium text-gray-700">{name}</label>
        </div>
        <div className="flex items-center">
          <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded">
            {localValue}%
          </span>
          {showRemoveButton && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          onMouseUp={handleAfterChange}
          onKeyUp={handleAfterChange}
          onTouchEnd={handleAfterChange}
          className="w-full h-2 rounded-md appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${colorToHex(color)} 0%, ${colorToHex(color)} ${localValue}%, #e5e7eb ${localValue}%, #e5e7eb 100%)`
          }}
        />
      </div>
    </div>
  );
};

// Helper function to convert color name to hex
const colorToHex = (colorName) => {
  const colors = {
    blue: '#2563eb',
    green: '#059669',
    red: '#dc2626',
    yellow: '#f59e0b',
    purple: '#7c3aed'
  };
  
  return colors[colorName] || colors.blue;
};

export default AttributionSlider;