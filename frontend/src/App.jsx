// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import SearchCompanies from './pages/SearchCompanies';
import Database from './pages/Database';
import DocumentTypes from './pages/DocumentTypes';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Support from './pages/Support';
import './assets/styles/main.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recherche" element={<SearchCompanies />} />
          <Route path="/base-donnees" element={<Database />} />
          <Route path="/types-documents" element={<DocumentTypes />} />
          <Route path="/parametres" element={<Settings />} />
          <Route path="/aide" element={<Help />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;