// frontend/src/components/common/StepIndicator.jsx
import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="step-indicator">
      <div className="step-progress">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              <div 
                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <div className="step-bubble">
                  {isCompleted ? (
                    <Check size={16} />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="step-label">
                  <div className="step-name">{step.name}</div>
                  <div className="step-description">{step.description}</div>
                </div>
              </div>
              
              {!isLast && (
                <div 
                  className={`step-connector ${isCompleted ? 'completed' : ''}`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;