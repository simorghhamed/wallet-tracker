import React, { useEffect, useRef } from 'react'

function CustomDropdown({ isOpen, onClose, options }) {

    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onClose]);



  if (!isOpen) return null;
  if(!options?.length) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-max max-w-52 max-h-[300px] overflow-y-auto bg-[#3B3B3B] rounded-[10px] backdrop-blur-[28px] z-50 overflow-hidden transition-all"
    >

        {
            options.map((opt, i) => (
                <button 
                  key={i} 
                  className='w-full flex items-center gap-2.5 p-[15px] rounded-[10px] bg-transparent cursor-pointer hover:bg-[#ffffff]/30 transition-all'
                  onClick={() => {
                    if (opt?.action) opt.action();
                    if (onClose) onClose(); // بستن dropdown
                  }}
                >

                    {opt.svg}

                    <span className='text-sm text-white font-family-IranYekan-Medium leading-0 mt-0.5'>{opt.title}</span>

                </button>
            ))
        }
      
    </div>
  )
}

export default CustomDropdown
