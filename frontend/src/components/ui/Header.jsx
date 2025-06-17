import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from './Button';
import Input from './Input';
import { CiMedal } from "react-icons/ci";
import { RiExchangeFill } from "react-icons/ri";
import { GiMaterialsScience } from "react-icons/gi";

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
  const [isLaptopsDropdownOpen, setIsLaptopsDropdownOpen] = useState(false); 
  const [isCamerasDropdownOpen, setIsCamerasDropdownOpen] = useState(false); 
  const location = useLocation();

  const navigationItems = [
    // Thêm thuộc tính hasDropdown để đánh dấu mục nào có dropdown
    { name: 'Phone', path: '/phones', hasDropdown: true },
    { name: 'Laptop', path: '/laptops', hasDropdown: true },
    { name: 'Camera', path: '/cameras', hasDropdown: true },
  ];

  // Danh sách các hãng điện thoại
  const phoneBrands = [
    { name: 'Samsung', path: '/phones/samsung' },
    { name: 'iPhone', path: '/phones/iphone' },
    { name: 'Xiaomi', path: '/phones/xiaomi' },
    { name: 'Oppo', path: '/phones/oppo' },
    { name: 'Realme', path: '/phones/realme' },
  ];

  const laptopBrands = [
    { name: 'Apple', path: '/laptops/apple' },
    { name: 'Dell', path: '/laptops/dell' },
    { name: 'Asus', path: '/laptops/asus' },
    { name: 'Lenovo', path: '/laptops/lenovo' },
    { name: 'HP', path: '/laptops/hp' },
  ];

  const cameraBrands = [
    { name: 'Ezviz', path: '/cameras/ezviz' },
    { name: 'TpLink', path: '/cameras/tplink' },
    { name: 'Imou', path: '/cameras/imou' },
    { name: 'Tiandy', path: '/cameras/tiandy' },
    { name: '365 Selection', path: '/cameras/365selection' },
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

      {/* Phần Header top */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left rounded-lg">
          <div className="flex items-center space-x-2 text-[#001a72] font-medium">
            <span className="flex items-center">
              <RiExchangeFill className="w-8 h-8" />
            </span>
            <span className="font-bold">Thu cũ</span>
            <span className="text-[14px] opacity-70">Giá ngon</span>
            <span>-</span>
            <span className="font-bold">Lên đời</span>
            <span className="text-[14px] opacity-70">tiết kiệm</span>
          </div>
          <div className="flex items-center space-x-2 text-[#001a72] font-medium">
            <span  className="flex items-center">
              < CiMedal className="w-8 h-8" />
            </span>
            <span className="text-[14px] opacity-70">Sản phẩm</span>
            <span className="font-bold">Chính hãng</span>
            <span>-</span>
            <span className="font-bold">Xuất VAT</span>
            <span className="text-[14px] opacity-70">đầy đủ</span>
          </div>
          <div className="flex items-center space-x-2 text-[#001a72] font-medium">
            <span className="flex items-center">
              <GiMaterialsScience className="w-8 h-8" />
            </span>
            <span className="font-bold">Tải App Smember</span>
            <span className="text-[14px] opacity-70">- Tích điểm & nhận ưu đãi</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16"> 

          {/* Logo và tên thương hiệu */}
          <div className="flex-shrink-0">
            <Link to="/homepage" className="flex items-center">
              <span className="flex items-center">
                <GiMaterialsScience className="w-8 h-8 bg-white rounded-lg" />
              </span>
              <span className="ml-2 text-xl font-bold text-white">ShopHub</span>
            </Link>
          </div>
          
          {/* Menu chính */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              // Xác định dropdown và state tương ứng
              let brands = [];
              let isDropdownOpen = false;
              let setDropdownOpen = () => {};
              if (item.name === 'Phone') {
                brands = phoneBrands;
                isDropdownOpen = isPhonesDropdownOpen;
                setDropdownOpen = setIsPhonesDropdownOpen;
              } else if (item.name === 'Laptop') {
                brands = laptopBrands;
                isDropdownOpen = isLaptopsDropdownOpen;
                setDropdownOpen = setIsLaptopsDropdownOpen;
              } else if (item.name === 'Camera') {
                brands = cameraBrands;
                isDropdownOpen = isCamerasDropdownOpen;
                setDropdownOpen = setIsCamerasDropdownOpen;
              }

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setDropdownOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`
                      px-1 py-2 text-sm font-medium border-b-2 transition-colors text-[16px]
                      ${
                        (item.hasDropdown && isDropdownOpen) ||
                        location.pathname.startsWith(item.path)
                          ? 'border-white text-white'
                          : 'border-transparent text-white hover:text-white hover:border-gray-300'
                      }
                    `}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                  {/* Dropdown cho các mục có dropdown */}
                  {item.hasDropdown && isDropdownOpen && (
                    <div
                      className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div className="py-1" role="none">
                        {brands.map(brand => (
                          <Link
                            key={brand.name}
                            to={brand.path}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* Phần tìm kiếm và đăng nhập/đăng ký */}
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

            {/* Nút đăng nhập/đăng ký */}
            <div className="flex items-center space-x-2 ml-2">
              <Link to="/login" className="text-white hover:text-gray-200">Đăng nhập</Link>
              <span className="text-white">/</span>
              <Link to="/register" className="text-white hover:text-gray-200">Đăng ký</Link>
            </div>

            {/* Biểu tượng giỏ hàng và tài khoản */}
            <Link to="/shopping-cart" className="relative p-2 text-gray-200 hover:text-white">
              <Icon name="ShoppingCart" size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
            </Link>
            
            {/* Biểu tượng tài khoản */}
            <Link to="/account">
              <Button 
                variant="ghost"
                icon="User"
                aria-label="Tài khoản"
                className="text-white hover:text-white"
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