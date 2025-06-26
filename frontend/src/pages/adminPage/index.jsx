
import React, { useState } from 'react';

import AdminSidebar from './components/AdminSidebar';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
import './AdminPage.css';

const initialProducts = [
    { id: 1, name: 'Laptop ProMax 15', category: 'Laptop', brand: 'Apple', price: 34000000, stock: 50, imageUrl: 'https://via.placeholder.com/60', cpu: 'M3 Pro', ram: '16GB', storage: '512GB SSD', graphicsCard: 'Integrated', screenSize: '15 inch', screenResolution: '3024x1964', weight: '1.8kg', description: 'Siêu mạnh, siêu di động.' },
    { id: 2, name: 'Điện thoại Galaxy S25', category: 'Điện thoại', brand: 'Samsung', price: 25000000, stock: 100, imageUrl: 'https://via.placeholder.com/60', operatingSystem: 'Android 15', screenSize: '6.8 inch', ram: '12GB', storage: '256GB', color: 'Titanium Black', description: 'Camera AI đột phá.' }
];

const AdminPage = () => {
    const [products, setProducts] = useState(initialProducts);
    const [activeView, setActiveView] = useState('products');
    const [successMessage, setSuccessMessage] = useState(''); 
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    //THÊM / SỬA SẢN PHẨM
    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setIsProductModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const handleProductFormSubmit = (formData) => {
        let message = '';
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
            message = 'Cập nhật sản phẩm thành công!';
        } else {
            const newProduct = { ...formData, id: Date.now() };
            setProducts([newProduct, ...products]);
            message = 'Thêm sản phẩm mới thành công!';
        }
        closeAllModals();
        showSuccessMessage(message);
    };

    //XÓA SẢN PHẨM
    const handleOpenDeleteModal = (productId) => {
        setDeletingProductId(productId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setProducts(products.filter(p => p.id !== deletingProductId));
        closeAllModals();
        showSuccessMessage('Xóa sản phẩm thành công!');
    };

    //ĐĂNG XUẤT
    const handleLogout = () => {
        console.log("Admin đã xác nhận đăng xuất.");
        closeAllModals();
        window.location.href = '/';
    };
    
    //CÁC HÀM TIỆN ÍCH ---
    const closeAllModals = () => {
        setIsProductModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsLogoutModalOpen(false);
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
    };
    
    const closeSuccessModal = () => {
        setSuccessMessage('');
    };

    return (
        <div className="account-page">
            <AdminSidebar
                activeView={activeView}
                setActiveView={setActiveView}
                openLogoutModal={() => setIsLogoutModalOpen(true)}
            />

            <main className="account-content">

                <div className="admin-content-header">
                    <h1>Sản phẩm</h1>
                    <button onClick={handleOpenAddModal} className="btn-primary">Thêm sản phẩm</button>
                </div>
                
                <ProductTable 
                    products={products}
                    onEdit={handleOpenEditModal}
                    onDelete={handleOpenDeleteModal}
                />
            </main>
            <ProductFormModal 
                isOpen={isProductModalOpen}
                onClose={closeAllModals}
                onSubmit={handleProductFormSubmit}
                initialData={editingProduct}
            />
            {isDeleteModalOpen && (
                <div className="modal-overlay" onClick={closeAllModals}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận Xóa</h4>
                            <button className="modal-close-btn" onClick={closeAllModals}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={closeAllModals}>Hủy</button>
                            <button className="btn-danger" onClick={handleConfirmDelete}>Xác nhận Xóa</button>
                        </div>
                    </div>
                </div>
            )}
            {isLogoutModalOpen && (
                 <div className="modal-overlay" onClick={() => setIsLogoutModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận Đăng xuất</h4>
                            <button className="modal-close-btn" onClick={() => setIsLogoutModalOpen(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị không?</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setIsLogoutModalOpen(false)}>Hủy</button>
                            <button className="btn-danger" onClick={handleLogout}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="modal-overlay" onClick={closeSuccessModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">✅ Thành công</h4>
                        </div>
                        <div className="modal-body">
                            <p>{successMessage}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-primary" onClick={closeSuccessModal}>Đã hiểu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;