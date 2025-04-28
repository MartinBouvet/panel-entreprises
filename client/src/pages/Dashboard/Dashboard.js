import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const Dashboard = () => {
  // Statistiques fictives pour la démo
  const stats = [
    { name: 'Projets en cours', value: '12' },
    { name: 'Consultations lancées', value: '48' },
    { name: 'Entreprises référencées', value: '450' },
    { name: 'Documents générés', value: '156' }
  ];

  // Projets récents fictifs
  const recentProjects = [
    { id: 1, name: 'Maintenance électrique CNPE Chooz', status: 'En préparation', date: '24 Avr 2025' },
    { id: 2, name: 'Rénovation éclairage Val de Fontenay', status: 'Consultation lancée', date: '20 Avr 2025' },
    { id: 3, name: 'Remplacement transformateurs site Saclay', status: 'Analyse des offres', date: '15 Avr 2025' },
    { id: 4, name: 'Audit sécurité électrique Flamanville', status: 'Terminé', date: '08 Avr 2025' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <Link to="/search">
          <Button>
            Nouvelle recherche
          </Button>
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
            </div>
          </div>
        ))}
      </div>

      {/* Projets récents */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Projets récents</h2>
          <Link to="/search" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Voir tous les projets
          </Link>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom du projet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de mise à jour
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'Terminé'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'En préparation'
                          ? 'bg-blue-100 text-blue-800'
                          : project.status === 'Consultation lancée'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/projects/${project.id}`} className="text-blue-600 hover:text-blue-900">
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Raccourcis */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Recherche d'entreprises</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      Lancer une nouvelle recherche
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <Link to="/search">
                <Button variant="secondary" className="w-full">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Base de données</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      Ajouter une nouvelle entreprise
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <Link to="/database">
                <Button variant="secondary" className="w-full">
                  Accéder
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Documents types</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      Gérer vos modèles de documents
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <Link to="/documents">
                <Button variant="secondary" className="w-full">
                  Accéder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;