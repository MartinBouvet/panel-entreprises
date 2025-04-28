import React, { useState } from 'react';
import Button from '../common/Button';

const CriteriaCard = ({
  criterion,
  onToggle,
  onRemove,
  onEdit,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(criterion.name);
  const [editedDescription, setEditedDescription] = useState(criterion.description || '');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedName.trim() !== '') {
      onEdit({
        ...criterion,
        name: editedName.trim(),
        description: editedDescription.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(criterion.name);
    setEditedDescription(criterion.description || '');
    setIsEditing(false);
  };

  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${className}`}>
      <div className="border-b px-4 py-3 bg-gray-50 flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="flex-grow px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nom du critère"
            autoFocus
          />
        ) : (
          <h3 className="font-medium text-gray-900">{criterion.name}</h3>
        )}

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="success" size="small" onClick={handleSave}>
                Enregistrer
              </Button>
              <Button variant="secondary" size="small" onClick={handleCancel}>
                Annuler
              </Button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  criterion.selected ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span className="sr-only">
                  {criterion.selected ? 'Désélectionner' : 'Sélectionner'}
                </span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    criterion.selected ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="text-gray-500 hover:text-red-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description du critère (optionnel)"
            rows={3}
          />
        ) : (
          <p className="text-sm text-gray-600">{criterion.description}</p>
        )}

        {criterion.options && !isEditing && (
          <div className="mt-4">
            {criterion.type === 'select' && (
              <select
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Sélectionner une option</option>
                {criterion.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {criterion.type === 'multiselect' && (
              <div className="space-y-2">
                {criterion.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`option-${criterion.id}-${index}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={option.selected}
                      onChange={() => {}}
                    />
                    <label
                      htmlFor={`option-${criterion.id}-${index}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CriteriaCard;