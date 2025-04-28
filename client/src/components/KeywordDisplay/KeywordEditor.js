import React, { useState } from 'react';
import Button from '../common/Button';

const KeywordEditor = ({ onAddKeyword, placeholder = 'Ajouter un mot-clé', buttonText = 'Ajouter' }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      onAddKeyword(keyword.trim());
      setKeyword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <Button
        type="submit"
        className="rounded-l-none"
        disabled={keyword.trim() === ''}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default KeywordEditor;