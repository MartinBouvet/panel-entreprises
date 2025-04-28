import React from 'react';
import KeywordBadge from './KeywordBadge';
import KeywordEditor from './KeywordEditor';

const KeywordList = ({
  keywords = [],
  editable = true,
  onKeywordsChange,
  onAddKeyword,
  onRemoveKeyword,
  showEditor = true,
  className = '',
}) => {
  const handleAdd = (keyword) => {
    if (onAddKeyword && keyword.trim() !== '') {
      onAddKeyword(keyword.trim());
    }
  };

  const handleRemove = (index) => {
    if (onRemoveKeyword) {
      onRemoveKeyword(index);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <KeywordBadge
              key={index}
              keyword={keyword}
              onRemove={editable ? () => handleRemove(index) : null}
            />
          ))
        ) : (
          <div className="text-sm text-gray-500 italic">Aucun mot-clé disponible</div>
        )}
      </div>

      {showEditor && editable && (
        <KeywordEditor onAddKeyword={handleAdd} />
      )}
    </div>
  );
};

export default KeywordList;