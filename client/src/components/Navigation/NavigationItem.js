import React from 'react';
import { Link } from 'react-router-dom';

const NavigationItem = ({ icon, label, path, isActive }) => {
  return (
    <Link
      to={path}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-blue-800 text-white'
          : 'text-blue-100 hover:bg-blue-600 hover:text-white'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

export default NavigationItem;