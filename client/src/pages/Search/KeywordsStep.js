import React from 'react';
import { useSearch } from '../../context/SearchContext';
import KeywordList from '../../components/KeywordDisplay/KeywordList';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';

const KeywordsStep = () => {
  const { keywords, addKeyword, removeKeyword, nextStep, prevStep } = useSearch();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          2. Mots-clés extraits par l'IA
        </h2>
        <p className="text-gray-600 mb-6">
          L'IA a analysé votre document et a identifié les mots-clés suivants. Vous pouvez les modifier ou en ajouter d'autres.
        </p>
        
        {keywords.length === 0 ? (
          <Alert type="info" title="Simulation">
            En situation réelle, l'IA aurait analysé votre document et extrait des mots-clés pertinents. 
            Vous pouvez ajouter manuellement des mots-clés ci-dessous pour simuler cette étape.
          </Alert>
        ) : null}
        
        <div className="mt-6">
          <KeywordList
            keywords={keywords}
            onAddKeyword={addKeyword}
            onRemoveKeyword={removeKeyword}
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={prevStep}
        >
          Retour
        </Button>
        <Button 
          onClick={nextStep} 
          disabled={keywords.length === 0}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default KeywordsStep;