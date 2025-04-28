import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profil utilisateur</h3>
              <p className="mt-1 text-sm text-gray-500">
                Vos informations personnelles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="Jean"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="Dupont"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="jean.dupont@edf.fr"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Département
                </label>
                <div className="mt-1">
                  <select
                    id="department"
                    name="department"
                    autoComplete="department"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="achat"
                  >
                    <option value="achat">Achats</option>
                    <option value="technique">Direction Technique</option>
                    <option value="projet">Gestion de Projets</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Configuration API</h3>
              <p className="mt-1 text-sm text-gray-500">
                Paramètres de connexion à l'API Mistral.
              </p>
            </div>
            
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                Clé API Mistral
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="api-key"
                  id="api-key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Entrez votre clé API Mistral"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Cette clé est nécessaire pour l'analyse des cahiers des charges et la génération de documents.
              </p>
            </div>
            
            <div>
              <label htmlFor="api-endpoint" className="block text-sm font-medium text-gray-700">
                URL de l'API
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="api-endpoint"
                  id="api-endpoint"
                  defaultValue="https://api.mistral.ai/v1"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Modèle
              </label>
              <div className="mt-1">
                <select
                  id="model"
                  name="model"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  defaultValue="mistral-large-latest"
                >
                  <option value="mistral-tiny">Mistral Tiny</option>
                  <option value="mistral-small">Mistral Small</option>
                  <option value="mistral-medium">Mistral Medium</option>
                  <option value="mistral-large-latest">Mistral Large (Recommandé)</option>
                </select>
              </div>
            </div>
            
            <div className="py-3">
              <Button 
                variant="secondary"
                onClick={() => alert('Test de connexion réussi !')}
              >
                Tester la connexion
              </Button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Préférences de notification</h3>
              <p className="mt-1 text-sm text-gray-500">
                Gérez comment et quand vous souhaitez être notifié.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email-notifications"
                    name="email-notifications"
                    type="checkbox"
                    defaultChecked
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email-notifications" className="font-medium text-gray-700">Notifications par email</label>
                  <p className="text-gray-500">Recevoir des emails pour les consultations terminées et les offres reçues.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="deadline-reminders"
                    name="deadline-reminders"
                    type="checkbox"
                    defaultChecked
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="deadline-reminders" className="font-medium text-gray-700">Rappels d'échéance</label>
                  <p className="text-gray-500">Être notifié lorsqu'une date limite approche.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="system-updates"
                    name="system-updates"
                    type="checkbox"
                    defaultChecked
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="system-updates" className="font-medium text-gray-700">Mises à jour système</label>
                  <p className="text-gray-500">Recevoir des notifications sur les nouvelles fonctionnalités et améliorations.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
      
      {showSuccess && (
        <Alert type="success" title="Modifications enregistrées" dismissible onDismiss={() => setShowSuccess(false)}>
          Vos paramètres ont été mis à jour avec succès.
        </Alert>
      )}
      
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Profil
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`${
                activeTab === 'api'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              API
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Notifications
            </button>
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
          
          <div className="mt-6 border-t border-gray-200 pt-6 flex justify-end">
            <Button
              variant="secondary"
              className="mr-3"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;