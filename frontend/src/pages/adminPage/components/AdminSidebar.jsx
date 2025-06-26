

import React from 'react';
import { useAuth } from '../../../components/AuthContext';

const adminNavItems = [
    { key: 'products', label: 'Quản lý Sản phẩm', icon: '📦' },
    { key: 'logout', label: 'Đăng xuất', icon: '🚪' },
];

const AdminSidebar = ({ activeView, setActiveView }) => {
    const { logout } = useAuth();

    const handleNavItemClick = (item) => {
        if (item.key === 'logout') {
            logout(); 
        } else {
            setActiveView(item.key);
        }
    };

    return (
        <aside className="account-sidebar">
            <div className="user-profile">
                <h3 className="user-name">Trang Quản Trị</h3>
                <p className="user-tier">Vai trò: Admin</p>
            </div>
            <nav className="account-nav">
                <ul>
                    {adminNavItems.map(item => (
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

export default AdminSidebar;