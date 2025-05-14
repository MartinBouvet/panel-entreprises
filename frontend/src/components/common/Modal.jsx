// frontend/src/components/common/Modal.jsx
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Modal component for displaying content in a dialog
 * @param {Boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to call when modal is closed
 * @param {String} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {ReactNode} footer - Modal footer content (optional)
 * @param {String} size - Modal size (sm, md, lg)
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) => {
  const modalRef = useRef(null);
  
  // Determine size class
  let sizeClass;
  switch (size) {
    case 'sm':
      sizeClass = 'modal-sm';
      break;
    case 'lg':
      sizeClass = 'modal-lg';
      break;
    case 'md':
    default:
      sizeClass = 'modal-md';
      break;
  }
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  // Handle outside click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  
  // If modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={`modal ${sizeClass}`} ref={modalRef}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;