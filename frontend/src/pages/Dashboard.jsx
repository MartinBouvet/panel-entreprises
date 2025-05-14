// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, BarChart2, PieChart, Calendar, FileText, Plus } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 24,
    inProgressProjects: 8,
    completedProjects: 16,
    contractsValue: '2.4M€'
  });
  
  const [activePeriod, setActivePeriod] = useState('month');
  
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Consultation lancée pour projet renovimax',
      timestamp: '2 heures',
      type: 'consultation'
    },
    {
      id: 2,
      title: 'Panel d\'entreprises ajouté pour projet Hydral-25',
      timestamp: '5 heures',
      type: 'panel'
    },
    {
      id: 3,
      title: 'Documents générés pour projet électrification',
      timestamp: '1 jour',
      type: 'document'
    },
    {
      id: 4,
      title: 'Mise à jour des critères pour projet réfection',
      timestamp: '2 jours',
      type: 'update'
    }
  ]);
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Réfection des échangeurs à plaques',
      deadline: '15/06/2025',
      status: 'active',
      budget: '120k€'
    },
    {
      id: 2,
      name: 'Mise à niveau hydrolique local',
      deadline: '28/05/2025',
      status: 'pending',
      budget: '85k€'
    },
    {
      id: 3,
      name: 'Vérification système électrique',
      deadline: '12/07/2025',
      status: 'active',
      budget: '95k€'
    }
  ]);
  
  const getActivityIcon = (type) => {
    switch (type) {
      case 'consultation':
        return <Calendar size={20} />;
      case 'panel':
        return <PieChart size={20} />;
      case 'document':
        return <FileText size={20} />;
      case 'update':
        return <BarChart2 size={20} />;
      default:
        return <BarChart2 size={20} />;
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Tableau de bord</h1>
          <Link to="/recherche" className="primary-button">
            <Plus size={18} />
            Nouveau projet
          </Link>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-title">Projets en cours</div>
            <div className="stat-value">{stats.inProgressProjects}</div>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              <span>+12% vs mois dernier</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">Projets terminés</div>
            <div className="stat-value">{stats.completedProjects}</div>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              <span>+8% vs mois dernier</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">Valeur des contrats</div>
            <div className="stat-value">{stats.contractsValue}</div>
            <div className="stat-trend negative">
              <ArrowDownRight size={16} />
              <span>-3% vs mois dernier</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-chart">
          <div className="chart-header">
            <h3 className="chart-title">Évolution des projets</h3>
            <div className="chart-period-selector">
              <div 
                className={`period-option ${activePeriod === 'week' ? 'active' : ''}`}
                onClick={() => setActivePeriod('week')}
              >
                Semaine
              </div>
              <div 
                className={`period-option ${activePeriod === 'month' ? 'active' : ''}`}
                onClick={() => setActivePeriod('month')}
              >
                Mois
              </div>
              <div 
                className={`period-option ${activePeriod === 'quarter' ? 'active' : ''}`}
                onClick={() => setActivePeriod('quarter')}
              >
                Trimestre
              </div>
              <div 
                className={`period-option ${activePeriod === 'year' ? 'active' : ''}`}
                onClick={() => setActivePeriod('year')}
              >
                Année
              </div>
            </div>
          </div>
          
          <div className="chart-container">
            {/* Placeholder for chart */}
            <div className="chart-placeholder">
              <BarChart2 size={40} />
              <p>Graphique d'évolution des projets</p>
            </div>
          </div>
        </div>
        
        <div className="recent-activities">
          <div className="activities-header">
            <h3>Activités récentes</h3>
            <Link to="#" className="view-all-link">Voir tout</Link>
          </div>
          
          <div className="activity-list">
            {activities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-timestamp">il y a {activity.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="dashboard-sidebar">
        <div className="upcoming-projects">
          <div className="projects-header">
            <h3>Projets à venir</h3>
            <Link to="#" className="view-all-link">Voir tout</Link>
          </div>
          
          <div className="project-list">
            {projects.map(project => (
              <div key={project.id} className="project-item">
                <div className="project-name">{project.name}</div>
                <div className="project-details">
                  <span>Échéance: {project.deadline}</span>
                  <span className={`project-status ${getStatusClass(project.status)}`}>
                    {project.status === 'active' ? 'En cours' : 
                     project.status === 'pending' ? 'À venir' : 'Terminé'}
                  </span>
                </div>
                <div className="project-details">
                  <span>Budget: {project.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;