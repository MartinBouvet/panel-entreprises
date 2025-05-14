// frontend/src/routes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import Dashboard from './pages/Dashboard';
import SearchCompanies from './pages/SearchCompanies';
import Database from './pages/Database';
import DocumentTypes from './pages/DocumentTypes';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Support from './pages/Support';

// Import context provider
import { SearchProvider } from './contexts/SearchContext';

/**
 * Application routes configuration
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />
      
      {/* Search companies with context provider */}
      <Route 
        path="/recherche" 
        element={
          <SearchProvider>
            <SearchCompanies />
          </SearchProvider>
        } 
      />
      
      {/* Other pages */}
      <Route path="/base-donnees" element={<Database />} />
      <Route path="/types-documents" element={<DocumentTypes />} />
      <Route path="/parametres" element={<Settings />} />
      <Route path="/aide" element={<Help />} />
      <Route path="/support" element={<Support />} />
      
      {/* Redirect to dashboard for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;