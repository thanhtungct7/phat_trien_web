// src/pages/MyAccount/components/AccountSidebar.jsx
import React from 'react';
import { useAuth } from '../../../components/AuthContext'; 

const navItems = [
    { key: 'details', label: 'Thông tin cá nhân', icon: '👤' },
    { key: 'orders', label: 'Quản lý đơn hàng', icon: '📦' },
    { key: 'password', label: 'Đổi mật khẩu', icon: '🔑' },
    { key: 'logout', label: 'Đăng xuất', icon: '🚪' },
];

const AccountSidebar = ({ activeView, setActiveView, openLogoutModal }) => {
    const { user, logout } = useAuth(); 

    const handleNavItemClick = (item) => {
        if (item.key === 'logout') {
            openLogoutModal();
        } else {
            setActiveView(item.key);
        }
    };

    return (
        <aside className="account-sidebar">
            <div className="user-profile">
                <img src={'https://via.placeholder.com/80'} alt="User Avatar" className="user-avatar" />
                <h3 className="user-name">{user ? user.name : 'Người dùng'}</h3>
            </div>
            <nav className="account-nav">
                <ul>
                    {navItems.map(item => (
                        <li
                            key={item.key}
                            className={`nav-item ${activeView === item.key ? 'active' : ''}`}
                            onClick={() => handleNavItemClick(item)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AccountSidebar;