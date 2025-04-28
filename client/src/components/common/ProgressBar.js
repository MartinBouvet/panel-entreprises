import React from 'react';

const ProgressBar = ({ 
  value, 
  max = 100, 
  label = null, 
  showPercentage = true,
  color = 'blue',
  size = 'medium',
  className = ''
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-500',
    gray: 'bg-gray-500'
  };
  
  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} rounded-full ${sizeClasses[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;