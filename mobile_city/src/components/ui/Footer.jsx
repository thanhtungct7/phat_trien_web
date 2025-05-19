import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const Footer = ({
  variant = 'full',
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-white border-t border-gray-200';
  
  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Blog', path: '/blog' },
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Help Center', path: '/help' },
      { name: 'Returns & Exchanges', path: '/returns' },
      { name: 'Shipping Information', path: '/shipping' },
    ],
    legal: [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
    ],
    categories: [
      { name: 'Electronics', path: '/product-listing-page?category=electronics' },
      { name: 'Clothing', path: '/product-listing-page?category=clothing' },
      { name: 'Home & Garden', path: '/product-listing-page?category=home' },
      { name: 'Sports & Outdoors', path: '/product-listing-page?category=sports' },
    ],
  };
  
  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com' },
  ];

  const renderFullFooter = () => (
    <footer className={`${baseClasses} ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and company info */}
          <div className="lg:col-span-2">
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
            <p className="mt-4 text-gray-600">
              Your one-stop destination for quality products at competitive prices. Shop with confidence and enjoy a seamless shopping experience.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Follow Us</h3>
              <div className="mt-2 flex space-x-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-600"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-600 hover:text-primary-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-600 hover:text-primary-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-600 hover:text-primary-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-primary-600">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  
  const renderCompactFooter = () => (
    <footer className={`${baseClasses} ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Link to="/homepage" className="flex items-center">
              <svg 
                className="h-6 w-auto text-primary-600" 
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
              <span className="ml-2 text-lg font-bold text-gray-900">ShopHub</span>
            </Link>
            <p className="ml-4 text-sm text-gray-600">
              &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600"
                aria-label={social.name}
              >
                <Icon name={social.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
          {[...footerLinks.legal].map((link) => (
            <Link key={link.name} to={link.path} className="text-xs text-gray-400 hover:text-primary-600">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
  
  const renderMobileFooter = () => (
    <footer className={`${baseClasses} ${className}`} {...props}>
      <div className="px-4 py-6">
        <div className="flex justify-center">
          <Link to="/homepage" className="flex items-center">
            <svg 
              className="h-6 w-auto text-primary-600" 
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
            <span className="ml-2 text-lg font-bold text-gray-900">ShopHub</span>
          </Link>
        </div>
        
        <div className="mt-4 flex justify-center space-x-6">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600"
              aria-label={social.name}
            >
              <Icon name={social.icon} size={20} />
            </a>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-8">
          <Link to="/contact" className="text-sm text-center text-gray-600 hover:text-primary-600">
            Contact
          </Link>
          <Link to="/help" className="text-sm text-center text-gray-600 hover:text-primary-600">
            Help
          </Link>
          <Link to="/terms" className="text-sm text-center text-gray-600 hover:text-primary-600">
            Terms
          </Link>
          <Link to="/privacy" className="text-sm text-center text-gray-600 hover:text-primary-600">
            Privacy
          </Link>
        </div>
        
        <p className="mt-6 text-xs text-center text-gray-400">
          &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
        </p>
      </div>
    </footer>
  );

  switch (variant) {
    case 'compact':
      return renderCompactFooter();
    case 'mobile':
      return renderMobileFooter();
    case 'full':
    default:
      return renderFullFooter();
  }
};

export default Footer;