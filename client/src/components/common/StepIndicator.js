import React from 'react';

const StepIndicator = ({ steps, currentStep, onChange = null }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = onChange !== null;
          
          return (
            <div key={index} className="flex-1 relative">
              {/* Line before */}
              {index > 0 && (
                <div 
                  className={`absolute top-1/2 -left-full w-full h-1 -translate-y-1/2 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
              
              {/* Step button */}
              <div className="flex flex-col items-center relative z-10">
                <button
                  onClick={() => isClickable && onChange(index)}
                  disabled={!isClickable}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 focus:outline-none ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : isCompleted
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-500 border-gray-300'
                  } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>
                <span className={`mt-2 text-xs font-medium ${isActive || isCompleted ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;