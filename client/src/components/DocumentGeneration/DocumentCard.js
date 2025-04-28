import React from 'react';
import Button from '../common/Button';

const DocumentCard = ({
  title,
  description,
  icon,
  isSelected = false,
  onSelect,
  onPreview,
  className = '',
}) => {
  const documentIcons = {
    contract: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    rules: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582a1 1 0 00-.646.942v4.5a1 1 0 00.646.942L9 13.871V16a1 1 0 001 1h.5a1 1 0 00.933-.657l2.226-5.343a1 1 0 00-.17-1L10 5.5V3a1 1 0 00-1-1zm-5 8V5.61L9 3.938V5.5a1 1 0 00.5.866l3.5 2.1a1 1 0 010 1.732l-3.5 2.1a1 1 0 00-.5.866v2.062L5 13.39V10zm6.5 4.267V12.5a1 1 0 00-.5-.866L9 10.804v-1.608l2-1.2a1 1 0 00.5-.865V6.234l1.066.617a1 1 0 01.434.82v2.529a1 1 0 01-.2.6L11.5 14.267z" clipRule="evenodd" />
      </svg>
    ),
    evaluation: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
    letter: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
    default: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
    ),
  };

  const renderIcon = () => {
    return documentIcons[icon] || documentIcons.default;
  };

  return (
    <div 
      className={`border rounded-lg overflow-hidden ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} ${className}`}
    >
      <div className="p-6 flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
          {renderIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(isSelected ? false : true)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>
      
      {onPreview && (
        <div className="px-6 py-3 bg-gray-50 text-right">
          <Button
            variant="text"
            onClick={onPreview}
            className="text-blue-600 hover:text-blue-900"
          >
            Prévisualiser
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;