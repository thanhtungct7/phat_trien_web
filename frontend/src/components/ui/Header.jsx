import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from './Button';
import Input from './Input';

const Header = ({
  variant = 'default',
  className = '',
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage' },
    { name: 'Products', path: '/product-listing-page' },
    { name: 'Featured', path: '/product-detail-page' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search submitted:', searchValue);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const baseClasses = 'w-full z-50';
  
  const variantClasses = {
    default: `bg-white shadow-sm ${isScrolled ? 'shadow-md' : ''}`,
    compact: 'bg-white shadow-sm py-2',
    transparent: `${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} transition-all duration-300`,
  };

  return (
    <header 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <div className="sr-only">
        <a href="#main-content">Skip to content</a>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/homepage" className="flex items-center">
              <svg 
                className="h-8 w-auto text-primary-600" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 5L30 10V30L20 35L10 30V10L20 5Z" 
                  fill="currentColor" 
                  fillOpacity="0.2"
                />
                <path 
                  d="M20 5L30 10V30L20 35L10 30V10L20 5Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M20 15L25 17.5V25L20 27.5L15 25V17.5L20 15Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">ShopHub</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  px-1 py-2 text-sm font-medium border-b-2 transition-colors
                  ${location.pathname === item.path 
                    ? 'border-primary-600 text-primary-600' :'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'}
                `}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            {variant !== 'compact' && (
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  icon="Search"
                  iconPosition="left"
                  className="w-64"
                  isSearch={true}
                />
              </form>
            )}
            
            <Link to="/shopping-cart" className="relative p-2 text-gray-600 hover:text-gray-900">
              <Icon name="ShoppingCart" size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-600 rounded-full">3</span>
            </Link>
            
            <Button 
              variant="ghost" 
              icon="User"
              aria-label="Account"
            />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Link to="/shopping-cart" className="relative p-2 mr-2 text-gray-600 hover:text-gray-900">
              <Icon name="ShoppingCart" size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-600 rounded-full">3</span>
            </Link>
            
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <form onSubmit={handleSearchSubmit} className="mb-4 px-2">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearchChange}
              icon="Search"
              iconPosition="left"
              isSearch={true}
            />
          </form>
          
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                block px-3 py-2 rounded-md text-base font-medium
                ${location.pathname === item.path 
                  ? 'bg-primary-100 text-primary-600' :'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <Icon name="User" size={20} />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">User Account</div>
                <div className="text-sm font-medium text-gray-500">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;