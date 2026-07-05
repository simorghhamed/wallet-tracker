import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ArrowDownSvg } from '../assets/svg/ArrowDownSvg';

function SearchBoxNetworkSelect({ options, value, onChange }) {

    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(opt => opt.name === value);

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {

      if(options?.length){
        onChange(options[0]?.name)
      }

    }, [options])


  return (
    <div ref={ref} className="absolute right-2 top-1/2 -translate-y-1/2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-[3px] bg-[#161616] px-1 py-2 max-w-14 max-h-9 rounded-lg text-white hover:opacity-80 transition-all cursor-pointer"
      >
        {selectedOption ? (
          <img src={selectedOption.iconUrl ? selectedOption.iconUrl : '/images/icons8-apple-inc-.png'} alt="" className="w-6 h-6" />
        ) : (
          <span className="w-6 h-6 inline-block" />
        )}
        <span className='text-white w-6 h-6 flex items-center justify-center mt-0.5'>{ArrowDownSvg}</span>

      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-[#222] rounded-lg shadow-lg py-2 z-10">
          {options?.length ? options.map((opt) => (
            <button
              key={opt.name}
              onClick={() => {
                onChange(opt.name);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 hover:bg-[#333] transition-all flex justify-center cursor-pointer"
            >
              <img src={opt?.iconUrl ? opt?.iconUrl : '/images/icons8-apple-inc-.png'} alt="" className="w-6 h-6" />
            </button>
          )) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBoxNetworkSelect
