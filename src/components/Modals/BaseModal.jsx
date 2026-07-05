import React from 'react';

const BaseModal = ({ isOpen, onClose, children, title, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className={`z-20 w-full max-w-md mx-4 bg-[#2C2C2C] rounded-[15px] shadow-[0px_0px_17px_-4px_rgba(222,222,222,0.13)] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-[15px]">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-200"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-family-IranYekan-Bold text-white">{title}</h2>
        </div>
        
        {/* Content */}
        <div className="p-[15px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;