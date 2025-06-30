import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminSidebar from './components/AdminSidebar';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
import './AdminPage.css';

import { useAuth } from '../../components/AuthContext';

// Khai báo endpoint API
const API_BASE_URL = 'http://localhost:8080/api/';

const AdminPage = () => {
    // Đã bỏ initialProducts, sẽ load từ API
    const [products, setProducts] = useState([]);
    const [activeView, setActiveView] = useState('products');
    const [successMessage, setSuccessMessage] = useState('');
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState(null);
    // THAY ĐỔI: Thêm state để lưu category của sản phẩm cần xóa
    const [deletingProductCategory, setDeletingProductCategory] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { logout } = useAuth();

    // THAY ĐỔI: Thêm "/" vào cuối URL để khớp với backend
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('accessToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            // FETCH DỮ LIỆU TỪ CÁC ENDPOINT CÓ DẤU GẠCH CHÉO CUỐI
            const [phoneRes, laptopRes, cameraRes] = await Promise.all([
                fetch(`${API_BASE_URL}smartphones/`, { headers }), // FIX: Thêm /
                fetch(`${API_BASE_URL}laptops/`, { headers }),     // FIX: Thêm /
                fetch(`${API_BASE_URL}cameras/`, { headers })      // FIX: Thêm /
            ]);

            if (!phoneRes.ok || !laptopRes.ok || !cameraRes.ok) {
                throw new Error('Failed to fetch data from one or more endpoints.');
            }

            const phoneData = await phoneRes.json();
            const laptopData = await laptopRes.json();
            const cameraData = await cameraRes.json();
            
            // HỢP NHẤT DỮ LIỆU VÀ GÁN CATEGORY ĐỂ HIỂN THỊ
            const allProducts = [
                ...phoneData.result.map(p => ({ ...p, category: 'SMARTPHONE', key: p.id + '-phone' })),
                ...laptopData.result.map(p => ({ ...p, category: 'LAPTOP', key: p.id + '-laptop' })),
                ...cameraData.result.map(p => ({ ...p, category: 'CAMERA', key: p.id + '-camera' })),
            ];

            setProducts(allProducts);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Không thể tải dữ liệu sản phẩm. Vui lòng kiểm tra kết nối backend.");
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetchProducts khi component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setIsProductModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    // THAY ĐỔI: Thêm hoặc cập nhật sản phẩm - Gửi API
    const handleProductFormSubmit = async (formData, category) => {
        try {
            const token = localStorage.getItem('accessToken');
            let endpoint = '';
            let method = '';
            let productId = editingProduct ? editingProduct.id : '';

            // Xác định endpoint và method dựa trên danh mục và hành động
            if (category === 'SMARTPHONE') { endpoint = `${API_BASE_URL}smartphones`; }
            else if (category === 'LAPTOP') { endpoint = `${API_BASE_URL}laptops`; }
            else if (category === 'CAMERA') { endpoint = `${API_BASE_URL}cameras`; }
            
            if (editingProduct) {
                method = 'PUT';
                endpoint += `/${productId}`;
            } else {
                method = 'POST';
                // FIX: Thêm dấu gạch chéo cho phương thức POST
                endpoint += '/'; 
            }

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Lỗi từ server.');
            }

            // Sau khi thành công, fetch lại dữ liệu mới nhất
            await fetchProducts();
            showSuccessMessage(editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm mới thành công!');
        } catch (err) {
            console.error("Error submitting product:", err);
            setError(err.message);
        }
        closeAllModals();
    };

    // THAY ĐỔI: Cập nhật hàm mở modal xóa để lưu category
    const handleOpenDeleteModal = (product) => {
        setDeletingProductId(product.id);
        setDeletingProductCategory(product.category); // Lưu category
        setIsDeleteModalOpen(true);
    };

    // THAY ĐỔI: Xác nhận xóa sản phẩm - Gửi API
    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            let endpoint = '';
            
            // Sử dụng deletingProductCategory để xác định endpoint
            if (deletingProductCategory === 'SMARTPHONE') { endpoint = `${API_BASE_URL}smartphones`; }
            else if (deletingProductCategory === 'LAPTOP') { endpoint = `${API_BASE_URL}laptops`; }
            else if (deletingProductCategory === 'CAMERA') { endpoint = `${API_BASE_URL}cameras`; }

            // FIX: Đã đúng, không cần thay đổi
            const response = await fetch(`${endpoint}/${deletingProductId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Lỗi khi xóa sản phẩm từ server.');
            }

            await fetchProducts();
            showSuccessMessage('Xóa sản phẩm thành công!');
        } catch (err) {
            console.error("Error deleting product:", err);
            setError(err.message);
        }
        closeAllModals();
    };
    
    const handleLogout = () => {
        logout();
        closeAllModals();
        navigate('/homepage');
    };

    const closeAllModals = () => {
        setIsProductModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsLogoutModalOpen(false);
        setEditingProduct(null);
        setDeletingProductId(null);
        setDeletingProductCategory(null); // Reset category
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const closeSuccessModal = () => {
        setSuccessMessage('');
    };
    
    const renderDeleteModal = () => (
        <div className="modal-overlay" onClick={closeAllModals}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
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
    );

    const renderLogoutModal = () => (
        <div className="modal-overlay" onClick={closeAllModals}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Xác nhận Đăng xuất</h4>
                    <button className="modal-close-btn" onClick={closeAllModals}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị không?</p>
                </div>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={closeAllModals}>Hủy</button>
                    <button className="btn-danger" onClick={handleLogout}>Xác nhận</button>
                </div>
            </div>
        </div>
    );

    const renderSuccessModal = () => (
        <div className="modal-overlay" onClick={closeSuccessModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
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
    );
    
    if (loading) {
        return <div className="loading-indicator">Đang tải dữ liệu sản phẩm...</div>;
    }

    if (error) {
        return <div className="error-message">Lỗi: {error}</div>;
    }

    return (
        <div className="account-page">
            <AdminSidebar
                activeView={activeView}
                setActiveView={setActiveView}
                openLogoutModal={() => {
                    console.log('Logout button clicked!');
                    setIsLogoutModalOpen(true);
                }}
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

            {isDeleteModalOpen && renderDeleteModal()}
            {isLogoutModalOpen && renderLogoutModal()}
            {successMessage && renderSuccessModal()}
        </div>
    );
};

export default AdminPage;