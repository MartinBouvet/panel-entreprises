import React from 'react';

const KeywordBadge = ({ keyword, onRemove, className = '', size = 'medium' }) => {
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base'
  };

  return (
    <div className={`inline-flex items-center rounded-full bg-blue-100 text-blue-800 ${sizeClasses[size]} ${className}`}>
      <span>{keyword}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default KeywordBadge;