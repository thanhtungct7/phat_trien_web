import React, { useState } from 'react';
import Icon from '../../components/AppIcon';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  icon,
  iconPosition = 'left',
  error,
  success,
  disabled = false,
  required = false,
  className = '',
  id,
  name,
  autoComplete,
  isSearch = false,
  onIconClick,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  const handleChange = (e) => {
    if (onChange) onChange(e);
  };
  
  const handleIconClick = () => {
    if (onIconClick) onIconClick();
  };
  
  const handleClearSearch = () => {
    if (onChange) {
      const event = { target: { value: '', name } };
      onChange(event);
    }
  };

  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
  
  const inputWrapperClasses = `
    relative w-full
    ${className}
  `;
  
  const inputClasses = `
    block w-full px-3 py-2 bg-white border rounded-md
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' || isSearch && value ? 'pr-10' : ''}
    ${error ? 'border-error text-error focus:border-error focus:ring-error' : ''}
    ${success ? 'border-success text-success focus:border-success focus:ring-success' : ''}
    ${!error && !success ? 'border-gray-200 focus:border-primary-600 focus:ring-primary-600' : ''}
    ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
    transition-colors focus:outline-none focus:ring-2
  `;

  return (
    <div className={inputWrapperClasses}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`block mb-1 text-sm font-medium ${error ? 'text-error' : 'text-gray-900'}`}
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div 
            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${onIconClick ? 'cursor-pointer' : ''}`}
            onClick={onIconClick ? handleIconClick : undefined}
          >
            <Icon 
              name={icon} 
              size={20} 
              className={error ? 'text-error' : success ? 'text-success' : 'text-gray-400'} 
            />
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
          autoComplete={autoComplete}
          {...props}
        />
        
        {icon && iconPosition === 'right' && !isSearch && (
          <div 
            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${onIconClick ? 'cursor-pointer' : ''}`}
            onClick={onIconClick ? handleIconClick : undefined}
          >
            <Icon 
              name={icon} 
              size={20} 
              className={error ? 'text-error' : success ? 'text-success' : 'text-gray-400'} 
            />
          </div>
        )}
        
        {isSearch && value && (
          <div 
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={handleClearSearch}
          >
            <Icon name="X" size={20} className="text-gray-400 hover:text-gray-600" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      
      {success && !error && (
        <p className="mt-1 text-sm text-success">{success}</p>
      )}
    </div>
  );
};

export default Input;