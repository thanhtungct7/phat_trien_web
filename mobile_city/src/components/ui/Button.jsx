import React from 'react';
import Icon from '../../components/AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-100 disabled:text-gray-600',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400',
    outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-100 disabled:border-gray-200 disabled:text-gray-400',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-100 disabled:text-gray-400',
    icon: 'p-2 text-gray-600 hover:bg-gray-100 rounded-full disabled:text-gray-400',
  };
  
  const sizeClasses = {
    small: variant === 'icon' ? 'p-1' : 'px-3 py-1 text-sm',
    medium: variant === 'icon' ? 'p-2' : 'px-4 py-2',
    large: variant === 'icon' ? 'p-3' : 'px-6 py-3 text-lg',
  };
  
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const handleClick = (e) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <Icon name="Loader" className="animate-spin" size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
        </span>
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">
          <Icon name={icon} size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
        </span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">
          <Icon name={icon} size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
        </span>
      )}
    </button>
  );
};

export default Button;