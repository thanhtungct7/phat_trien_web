import React, { useState } from 'react';
import AccountSidebar from './components/AccountSidebar';
import AccountDetails from './components/AccountDetails';
import OrderManagement from './components/OrderManagement';
import ChangePassword from './components/ChangePassword';
import './MyAccountPage.css';

const MyAccountPage = () => {
    const [activeView, setActiveView] = useState('details');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (products, orderId) => {
        console.log(`Đã thêm các sản phẩm từ đơn hàng ${orderId} vào giỏ hàng:`, products);
        setCartItems(prevItems => [...prevItems, ...products]);
        window.location.href = '/shopping-cart'; 
    };

    const handleLogout = () => {
        console.log("Thực hiện đăng xuất...");
        setIsLogoutModalOpen(false);
        window.location.href = '/'; 
    };

    const renderContent = () => {
        switch (activeView) {
            case 'orders':
                return <OrderManagement onAddToCart={handleAddToCart} />;
            case 'password':
                return <ChangePassword />;
            case 'details':
            default:
                return <AccountDetails />;
        }
    };

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