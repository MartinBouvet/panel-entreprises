import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import SearchPage from './pages/Search/SearchPage';
import DatabasePage from './pages/Database/DatabasePage';
import DocumentsPage from './pages/Documents/DocumentsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import { UIContext } from './context/UIContext';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <UIContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/search/*" element={<SearchPage />} />
                <Route path="/database" element={<DatabasePage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </UIContext.Provider>
    </Router>
  );
};

export default App;