import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon'; // Đảm bảo đường dẫn này đúng
import Button from './Button'; // Đảm bảo đường dẫn này đúng
import Input from './Input'; // Đảm bảo đường dẫn này đúng

const Header = ({
  variant = 'default',
  className = '',
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  // State để quản lý trạng thái mở/đóng của dropdown "Điện thoại"
  const [isPhonesDropdownOpen, setIsPhonesDropdownOpen] = useState(false); 
  const location = useLocation();

  const navigationItems = [
    // Thêm thuộc tính hasDropdown để đánh dấu mục nào có dropdown
    { name: 'Điện thoại', path: '/phones', hasDropdown: true },
    { name: 'Máy tính bảng', path: '/tablets' },
    { name: 'Camera', path: '/cameras' },
  ];

  // Danh sách các hãng điện thoại
  const phoneBrands = [
    { name: 'Samsung', path: '/phones/samsung' },
    { name: 'iPhone', path: '/phones/iphone' },
    { name: 'Xiaomi', path: '/phones/xiaomi' },
    { name: 'Oppo', path: '/phones/oppo' },
    { name: 'Realme', path: '/phones/realme' },
    // Thêm các hãng khác nếu cần
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Đóng cả menu di động và dropdown điện thoại khi route thay đổi
    setIsMenuOpen(false);
    setIsPhonesDropdownOpen(false); 
  }, [location]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchValue);
    // Thêm logic chuyển hướng hoặc tìm kiếm ở đây nếu cần
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const baseClasses = 'w-full z-50';
  
  const variantClasses = {
    default: `bg-blue-600 shadow-sm ${isScrolled ? 'shadow-md' : ''}`,
    compact: 'bg-blue-600 shadow-sm py-2',
    transparent: `${isScrolled ? 'bg-blue-600 shadow-md' : 'bg-transparent'} transition-all duration-300`,
  };

  return (
    <header 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <div className="sr-only">
        <a href="#main-content">Skip to content</a>
      </div>
      
      <div className="bg-blue-700 text-white text-sm py-1.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center space-x-4">
              <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
              <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12"> 
          <div className="flex-shrink-0">
            <Link to="/homepage" className="flex items-center">
              <svg 
                className="h-8 w-auto text-white" 
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
              <span className="ml-2 text-xl font-bold text-white">ShopHub</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              // Bọc Link bằng div để xử lý dropdown
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsPhonesDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsPhonesDropdownOpen(false)}
              >
                <Link
                  to={item.path} // Link cho mục chính (ví dụ: /phones)
                  className={`
                    px-1 py-2 text-sm font-medium border-b-2 transition-colors
                    ${
                      // Logic để gạch chân item hiện tại hoặc khi dropdown của nó mở
                      (item.name === 'Điện thoại' && (location.pathname.startsWith(item.path) || isPhonesDropdownOpen)) ||
                      (item.name !== 'Điện thoại' && location.pathname.startsWith(item.path))
                      ? 'border-white text-white' 
                      : 'border-transparent text-gray-200 hover:text-white hover:border-gray-300'
                    }
                  `}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </Link>
                {/* Dropdown cho "Điện thoại" */}
                {item.hasDropdown && isPhonesDropdownOpen && (
                  <div 
                    className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" 
                    aria-orientation="vertical" 
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      {phoneBrands.map(brand => (
                        <Link 
                          key={brand.name}
                          to={brand.path}
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => setIsPhonesDropdownOpen(false)} // Đóng dropdown khi click vào hãng
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {variant !== 'compact' && (
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  icon="Search"
                  iconPosition="left"
                  className="w-64"
                  isSearch={true}
                />
              </form>
            )}
            
            <Link to="/shopping-cart" className="relative p-2 text-gray-200 hover:text-white">
              <Icon name="ShoppingCart" size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
            </Link>
            
            <Link to="/account">
              <Button 
                variant="ghost" 
                icon="User"
                aria-label="Tài khoản"
                className="text-gray-200 hover:text-white"
              />
            </Link>
          </div>
          
          <div className="flex md:hidden">
            <Link to="/shopping-cart" className="relative p-2 mr-2 text-gray-200 hover:text-white">
              <Icon name="ShoppingCart" size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
            </Link>
            
            <button
              type="button"
              className="p-2 rounded-md text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Đóng menu' : 'Mở menu'}</span>
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Bạn cũng cần thêm dropdown cho mobile nếu muốn */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-600`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <form onSubmit={handleSearchSubmit} className="mb-4 px-2">
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchValue}
              onChange={handleSearchChange}
              icon="Search"
              iconPosition="left"
              isSearch={true}
            />
          </form>
          
          {navigationItems.map((item) => (
            <React.Fragment key={item.name}>
              <Link
                to={item.path}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${location.pathname.startsWith(item.path) 
                    ? 'bg-blue-700 text-white' 
                    :'text-gray-200 hover:bg-blue-500 hover:text-white'}
                `}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                // Tùy chọn: Bạn có thể thêm logic dropdown cho mobile menu tại đây nếu muốn
                // Ví dụ: onClick={() => item.hasDropdown && setIsPhonesDropdownOpen(!isPhonesDropdownOpen)}
              >
                {item.name}
              </Link>
              {/* Nếu bạn muốn dropdown cho mobile menu, bạn sẽ thêm logic tương tự ở đây */}
            </React.Fragment>
          ))}
          
          <div className="pt-4 pb-3 border-t border-blue-700">
            <div className="flex items-center px-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white">
                  <Icon name="User" size={20} />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">User Account</div>
                <div className="text-sm font-medium text-gray-200">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-blue-500 hover:text-white"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-blue-500 hover:text-white"
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-blue-500 hover:text-white"
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