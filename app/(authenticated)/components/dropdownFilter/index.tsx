'use client'
import React, { useEffect, useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
type Props = {
    options: string[],
    onSelect: (option: string) => void
}

export default function DropdownFilter({ options, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    setSearchTerm('');
    setSelected(option);
  };

  useEffect(() => {
    if (isOpen) {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [isOpen, options, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='mb-4'>
      <div className=''>
      <span className='block text-gray-700 text-sm font-medium mb-2'>Tesss</span>
      </div>
     
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <div>
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md shadow-sm cursor-pointer"
        >
          <button
            type="button"
            className="inline-flex justify-between w-full p-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600 focus:ring-indigo-600"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          > 
            {selected ? selected : 'Selecione uma opção'}
            <IoChevronDown
            className={`w-5 h-5 ml-2 transition-transform transform ${
              isOpen ? '-rotate-180' : 'rotate-0'
            }`}
/>
          </button>
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar..."
            className="w-full p-2.5 border-b border-gray-300 focus:outline-none"
          />
          <div
            role="listbox"
            aria-labelledby="options-menu"
            className="max-h-40 overflow-y-auto"
          >
            {filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900"
                role="option"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

