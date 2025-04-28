import React from 'react';

const TotalCalculator = ({ 
  total, 
  targetTotal = 100, 
  minTotal = null,
  maxTotal = null
}) => {
  const isCorrect = minTotal !== null && maxTotal !== null 
    ? total >= minTotal && total <= maxTotal
    : total === targetTotal;
  
  const getStatusText = () => {
    if (isCorrect) {
      return "Le total est correct";
    }
    
    if (minTotal !== null && maxTotal !== null) {
      if (total < minTotal) {
        return `Le total est trop bas (minimum: ${minTotal}%)`;
      } else if (total > maxTotal) {
        return `Le total est trop élevé (maximum: ${maxTotal}%)`;
      }
    } else if (total < targetTotal) {
      return `Le total est trop bas (objectif: ${targetTotal}%)`;
    } else {
      return `Le total est trop élevé (objectif: ${targetTotal}%)`;
    }
  };

  return (
    <div className={`p-4 rounded-md ${
      isCorrect ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium">
            Total des critères d'attribution:
          </span>
          <span className={`ml-2 text-lg font-bold ${
            isCorrect ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {total}%
          </span>
        </div>
        
        <div className={`text-sm ${
          isCorrect ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {getStatusText()}
        </div>
      </div>
    </div>
  );
};

export default TotalCalculator;