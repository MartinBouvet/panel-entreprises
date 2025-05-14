// frontend/src/components/Criteria/KeywordsDisplay.jsx
import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

const KeywordsDisplay = ({ keywords, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedKeywords, setEditedKeywords] = useState([...keywords]);
  const [newKeyword, setNewKeyword] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedKeywords([...keywords]);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    if (onChange) {
      onChange(editedKeywords);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedKeywords([...keywords]);
  };

  const handleKeywordRemove = (indexToRemove) => {
    setEditedKeywords(editedKeywords.filter((_, index) => index !== indexToRemove));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() !== '') {
      setEditedKeywords([...editedKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
    }
  };

  return (
    <div className="keywords-display">
      <div className="keywords-header">
        <h3>Mots-clés</h3>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEditClick}>
            <Edit2 size={16} />
            Modifier les mots-clés
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-button" onClick={handleSaveClick}>
              <Check size={16} />
              Enregistrer
            </button>
            <button className="cancel-button" onClick={handleCancelClick}>
              <X size={16} />
              Annuler
            </button>
          </div>
        )}
      </div>

      <div className="keywords-list">
        {isEditing ? (
          <>
            <div className="editable-keywords">
              {editedKeywords.map((keyword, index) => (
                <div key={index} className="keyword-tag editable">
                  <span>{keyword}</span>
                  <button className="remove-keyword" onClick={() => handleKeywordRemove(index)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="add-keyword">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ajouter un mot-clé..."
              />
              <button className="add-button" onClick={handleAddKeyword}>
                Ajouter
              </button>
            </div>
          </>
        ) : (
          <div className="keyword-tags">
            {keywords.map((keyword, index) => (
              <div key={index} className="keyword-tag">
                {keyword}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordsDisplay;