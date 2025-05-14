// frontend/src/components/common/Alert.jsx
import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Alert component for displaying notifications
 * @param {String} type - Alert type (success, error, info, warning)
 * @param {String} message - Alert message
 * @param {String} title - Alert title (optional)
 * @param {Function} onClose - Close handler (optional)
 * @param {Number} autoCloseTime - Auto close time in ms (optional)
 */
const Alert = ({ 
  type = 'info', 
  message, 
  title,
  onClose,
  autoCloseTime = 0
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Auto close after specified time
    if (autoCloseTime > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoCloseTime]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  // Return null if not visible
  if (!isVisible) {
    return null;
  }
  
  // Get icon and color based on type
  let Icon;
  let alertClass;
  
  switch (type) {
    case 'success':
      Icon = CheckCircle;
      alertClass = 'alert-success';
      break;
    case 'error':
      Icon = AlertCircle;
      alertClass = 'alert-error';
      break;
    case 'warning':
      Icon = AlertTriangle;
      alertClass = 'alert-warning';
      break;
    case 'info':
    default:
      Icon = Info;
      alertClass = 'alert-info';
      break;
  }
  
  return (
    <div className={`alert ${alertClass}`}>
      <div className="alert-icon">
        <Icon size={20} />
      </div>
      
      <div className="alert-content">
        {title && <h4 className="alert-title">{title}</h4>}
        <p className="alert-message">{message}</p>
      </div>
      
      <button className="alert-close" onClick={handleClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Alert;