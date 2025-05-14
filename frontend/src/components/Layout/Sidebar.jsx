// frontend/src/components/Layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Database, 
  FileText, 
  Settings, 
  HelpCircle, 
  MessageSquare, 
  User 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/logo-edf.svg" alt="EDF Logo" />
          <h2>Panel d'Entreprises</h2>
        </div>
        <button className="mobile-toggle">
          <span></span>
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="navigation-group">
          <h3>NAVIGATION</h3>
          <nav className="sidebar-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              <Home size={20} />
              <span>Tableau de bord</span>
            </NavLink>
            <NavLink to="/recherche" className={({ isActive }) => isActive ? 'active' : ''}>
              <Search size={20} />
              <span>Recherche d'entreprises</span>
            </NavLink>
            <NavLink to="/base-donnees" className={({ isActive }) => isActive ? 'active' : ''}>
              <Database size={20} />
              <span>Base de données</span>
            </NavLink>
            <NavLink to="/types-documents" className={({ isActive }) => isActive ? 'active' : ''}>
              <FileText size={20} />
              <span>Documents types</span>
            </NavLink>
            <NavLink to="/parametres" className={({ isActive }) => isActive ? 'active' : ''}>
              <Settings size={20} />
              <span>Paramètres</span>
            </NavLink>
          </nav>
        </div>
        
        <div className="navigation-group">
          <h3>AIDE</h3>
          <nav className="sidebar-nav">
            <NavLink to="/aide" className={({ isActive }) => isActive ? 'active' : ''}>
              <HelpCircle size={20} />
              <span>Guide d'utilisation</span>
            </NavLink>
            <NavLink to="/support" className={({ isActive }) => isActive ? 'active' : ''}>
              <MessageSquare size={20} />
              <span>Support</span>
            </NavLink>
          </nav>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <User size={24} />
          <span>Utilisateur</span>
        </div>
        <div className="made-with">
          <small>Made with DeepSite</small>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;