import React, { useState, useEffect } from 'react';
import AccountSidebar from './components/AccountSidebar';
import AccountDetails from './components/AccountDetails';
import OrderManagement from './components/OrderManagement';
import ChangePassword from './components/ChangePassword';
import './MyAccountPage.css';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyAccountPage = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const [activeView, setActiveView] = useState('details');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    // Redirect nếu chưa đăng nhập
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Hàm xử lý đăng xuất (gọi từ sidebar)
    const handleLogout = () => {
        logout(); // Gọi hàm logout từ AuthContext
        setIsLogoutModalOpen(false);
        navigate('/homepage');
    };

    // Hàm render nội dung chính dựa trên activeView
    const renderContent = () => {
        // THAY ĐỔI: Chỉ render nội dung nếu user đã tồn tại
        if (!user) {
            return <div className="loading-indicator">Đang tải thông tin người dùng...</div>;
        }

        switch (activeView) {
            case 'orders':
                // Truyền user.userId vào component để fetch order
                return <OrderManagement userId={user.userId} />;
            case 'password':
                // Truyền user.username vào component
                return <ChangePassword username={user.username} />;
            case 'details':
            default:
                // Truyền toàn bộ user info vào component
                return <AccountDetails user={user} />;
        }
    };

    if (!isAuthenticated) {
        // Có thể hiển thị loading spinner hoặc null trong lúc redirect
        return null; 
    }

    return (
        <div className="account-page">
            <AccountSidebar
                activeView={activeView}
                setActiveView={setActiveView}
                openLogoutModal={() => setIsLogoutModalOpen(true)}
            />
            <main className="account-content">
                {renderContent()}
            </main>
            {isLogoutModalOpen && (
                <div className="modal-overlay" onClick={() => setIsLogoutModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận Đăng xuất</h4>
                            <button className="modal-close-btn" onClick={() => setIsLogoutModalOpen(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này không?</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setIsLogoutModalOpen(false)}>Hủy</button>
                            <button className="btn-danger" onClick={handleLogout}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAccountPage;