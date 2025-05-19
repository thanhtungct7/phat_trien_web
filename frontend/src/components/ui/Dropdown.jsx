import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../components/AppIcon';

const Dropdown = ({
  options = [],
  selected,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  variant = 'single',
  withSearch = false,
  nested = false,
  id,
  name,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(Array.isArray(selected) ? selected : selected ? [selected] : []);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  const dropdownId = id || `dropdown-${name || Math.random().toString(36).substr(2, 9)}`;
  
  useEffect(() => {
    // Update selected options when prop changes
    if (variant === 'single' && selected !== undefined) {
      setSelectedOptions(selected ? [selected] : []);
    } else if (variant === 'multi' && Array.isArray(selected)) {
      setSelectedOptions(selected);
    }
  }, [selected, variant]);
  
  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    // Focus search input when dropdown opens
    if (isOpen && withSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, withSearch]);
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };
  
  const handleOptionClick = (option) => {
    if (variant === 'single') {
      setSelectedOptions([option]);
      onChange && onChange(option);
      setIsOpen(false);
    } else if (variant === 'multi') {
      const isSelected = selectedOptions.some(item => item.value === option.value);
      let newSelectedOptions;
      
      if (isSelected) {
        newSelectedOptions = selectedOptions.filter(item => item.value !== option.value);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
      
      setSelectedOptions(newSelectedOptions);
      onChange && onChange(newSelectedOptions);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && !isOpen) {
      setIsOpen(true);
    }
  };
  
  const filteredOptions = options.filter(option => {
    if (!searchTerm) return true;
    return option.label.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const isOptionSelected = (option) => {
    return selectedOptions.some(item => item.value === option.value);
  };
  
  const renderSelectedValue = () => {
    if (selectedOptions.length === 0) {
      return <span className="text-gray-400">{placeholder}</span>;
    }
    
    if (variant === 'single') {
      return <span className="truncate">{selectedOptions[0].label}</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {selectedOptions.length > 2 ? (
          <span>{selectedOptions.length} items selected</span>
        ) : (
          selectedOptions.map(option => (
            <span key={option.value} className="truncate">
              {option.label}{selectedOptions.indexOf(option) < selectedOptions.length - 1 ? ', ' : ''}
            </span>
          ))
        )}
      </div>
    );
  };
  
  const renderNestedOptions = (options, level = 0) => {
    return options.map(option => {
      const hasChildren = option.children && option.children.length > 0;
      
      return (
        <div key={option.value}>
          <button
            type="button"
            className={`
              w-full text-left px-4 py-2 text-sm flex items-center justify-between
              ${isOptionSelected(option) ? 'bg-primary-100 text-primary-600' : 'text-gray-900 hover:bg-gray-50'}
              ${level > 0 ? `pl-${4 + level * 4}` : ''}
            `}
            onClick={() => handleOptionClick(option)}
          >
            <span className="flex items-center">
              {variant === 'multi' && (
                <span className={`mr-2 flex-shrink-0 h-4 w-4 border rounded ${isOptionSelected(option) ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                  {isOptionSelected(option) && (
                    <Icon name="Check" size={16} className="text-white" />
                  )}
                </span>
              )}
              {option.label}
            </span>
            {hasChildren && (
              <Icon name="ChevronRight" size={16} className="text-gray-400" />
            )}
          </button>
          
          {hasChildren && (
            <div className="pl-4">
              {renderNestedOptions(option.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };
  
  const renderOptions = () => {
    if (nested) {
      return renderNestedOptions(filteredOptions);
    }
    
    return filteredOptions.map(option => (
      <button
        key={option.value}
        type="button"
        className={`
          w-full text-left px-4 py-2 text-sm
          ${isOptionSelected(option) ? 'bg-primary-100 text-primary-600' : 'text-gray-900 hover:bg-gray-50'}
        `}
        onClick={() => handleOptionClick(option)}
      >
        <span className="flex items-center">
          {variant === 'multi' && (
            <span className={`mr-2 flex-shrink-0 h-4 w-4 border rounded ${isOptionSelected(option) ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
              {isOptionSelected(option) && (
                <Icon name="Check" size={16} className="text-white" />
              )}
            </span>
          )}
          {option.label}
        </span>
      </button>
    ));
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={dropdownId} 
          className={`block mb-1 text-sm font-medium ${error ? 'text-error' : 'text-gray-900'}`}
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      <button
        id={dropdownId}
        type="button"
        className={`
          relative w-full bg-white border rounded-md py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 sm:text-sm
          ${error ? 'border-error' : 'border-gray-200'}
          ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        {...props}
      >
        <div className="flex items-center truncate">
          {renderSelectedValue()}
        </div>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Icon name="ChevronDown" size={20} className="text-gray-400" />
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
          {withSearch && (
            <div className="sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Icon name="Search" size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          )}
          
          <div className="py-1">
            {filteredOptions.length > 0 ? (
              renderOptions()
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;