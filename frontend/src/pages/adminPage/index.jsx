import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminSidebar from './components/AdminSidebar';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
import ProductAPIService from './components/ProductAPIService'; // Import API service
import './AdminPage.css';

import { useAuth } from '../../components/AuthContext';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState('products');
    const [successMessage, setSuccessMessage] = useState('');
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const navigate = useNavigate();
    const { logout } = useAuth();

    // Gọi API để lấy tất cả sản phẩm từ các endpoint riêng lẻ
    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔄 Fetching products from multiple APIs...');

            // Gọi đồng thời tất cả các API
            const [camerasResponse, laptopsResponse, phonesResponse] = await Promise.allSettled([
                ProductAPIService.getProductsByType('cameras'),
                ProductAPIService.getProductsByType('laptops'),
                ProductAPIService.getProductsByType('phones')
            ]);

            let allProducts = [];
            let errors = [];

            // Xử lý kết quả từ camera API
            if (camerasResponse.status === 'fulfilled') {
                const camerasData = camerasResponse.value.map(product => ({
                    ...product,
                    category: 'Camera',
                    productType: 'camera'
                }));
                allProducts = [...allProducts, ...camerasData];
                console.log('✅ Cameras loaded:', camerasData.length);
            } else {
                console.error('❌ Failed to load cameras:', camerasResponse.reason);
                errors.push('Không thể tải camera');
            }

            // Xử lý kết quả từ laptop API
            if (laptopsResponse.status === 'fulfilled') {
                const laptopsData = laptopsResponse.value.map(product => ({
                    ...product,
                    category: 'Laptop',
                    productType: 'laptop'
                }));
                allProducts = [...allProducts, ...laptopsData];
                console.log('✅ Laptops loaded:', laptopsData.length);
            } else {
                console.error('❌ Failed to load laptops:', laptopsResponse.reason);
                errors.push('Không thể tải laptop');
            }

            // Xử lý kết quả từ phone API
            if (phonesResponse.status === 'fulfilled') {
                const phonesData = phonesResponse.value.map(product => ({
                    ...product,
                    category: 'Điện thoại',
                    productType: 'phone'
                }));
                allProducts = [...allProducts, ...phonesData];
                console.log('✅ Phones loaded:', phonesData.length);
            } else {
                console.error('❌ Failed to load phones:', phonesResponse.reason);
                errors.push('Không thể tải điện thoại');
            }

            // Sắp xếp theo ID hoặc ngày tạo (mới nhất trước)
            allProducts.sort((a, b) => {
                if (a.createdAt && b.createdAt) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return b.id - a.id;
            });

            setProducts(allProducts);
            console.log('📊 Total products loaded:', allProducts.length);

            // Hiển thị cảnh báo nếu có lỗi từ một số API
            if (errors.length > 0 && allProducts.length > 0) {
                setError(`Cảnh báo: ${errors.join(', ')}. Các sản phẩm khác đã được tải thành công.`);
            } else if (errors.length > 0 && allProducts.length === 0) {
                throw new Error(`Không thể tải sản phẩm: ${errors.join(', ')}`);
            }

        } catch (err) {
            console.error('❌ Error fetching products:', err);
            setError(`Không thể tải danh sách sản phẩm: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Lấy sản phẩm theo danh mục
    const fetchProductsByCategory = async (category) => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔄 Fetching products by category:', category);

            const categoryProducts = await ProductAPIService.getProductsByType(category);
            const processedProducts = categoryProducts.map(product => ({
                ...product,
                category: category === 'cameras' ? 'Camera' :
                    category === 'laptops' ? 'Laptop' :
                        category === 'phones' ? 'Điện thoại' : product.category,
                productType: category.slice(0, -1) // Remove 's' from end
            }));

            setProducts(processedProducts);
            console.log('📊 Products loaded for category:', category, processedProducts.length);

        } catch (err) {
            console.error('❌ Error fetching products by category:', err);
            setError(`Không thể tải sản phẩm ${category}: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchAllProducts();
    }, []);

    // Mở modal thêm sản phẩm
    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setIsProductModalOpen(true);
    };

    // Mở modal chỉnh sửa sản phẩm
    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    // Thêm hoặc cập nhật sản phẩm
    const handleProductFormSubmit = async (formData) => {
        try {
            setLoading(true);

            if (editingProduct) {
                // Cập nhật sản phẩm
                await ProductAPIService.updateProduct(editingProduct, formData);
                showSuccessMessage('Cập nhật sản phẩm thành công!');
            } else {
                // Thêm sản phẩm mới - API sẽ tự động chọn endpoint phù hợp
                await ProductAPIService.addProduct(formData);
                showSuccessMessage('Thêm sản phẩm mới thành công!');
            }

            // Refresh danh sách sản phẩm
            await fetchAllProducts();
            closeAllModals();
        } catch (err) {
            setError(`Có lỗi xảy ra khi lưu sản phẩm: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý mở modal xác nhận xóa
    const handleOpenDeleteModal = (productId) => {
        // Tìm thông tin sản phẩm để xác định loại khi xóa
        const product = products.find(p => p.id === productId);
        setDeletingProduct(product); // Lưu toàn bộ thông tin sản phẩm thay vì chỉ ID
        setIsDeleteModalOpen(true);
    };

    // Xác nhận xóa sản phẩm
    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            await ProductAPIService.deleteProduct(deletingProduct);

            // Refresh danh sách sản phẩm
            await fetchAllProducts();
            closeAllModals();
            showSuccessMessage('Xóa sản phẩm thành công!');
        } catch (err) {
            setError(`Có lỗi xảy ra khi xóa sản phẩm: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Đăng xuất tài khoản quản trị
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        closeAllModals();
        navigate('/homepage');
        window.location.reload();
    };

    // Tiện ích đóng modal
    const closeAllModals = () => {
        setIsProductModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsLogoutModalOpen(false);
        setEditingProduct(null);
        setDeletingProduct(null);
    };

    // Hiện thông báo thành công
    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
    };

    // Đóng thông báo thành công
    const closeSuccessModal = () => {
        setSuccessMessage('');
    };

    // Đóng thông báo lỗi
    const closeErrorModal = () => {
        setError(null);
    };

    // --- Render các modal ---

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
                    <button className="btn-secondary" onClick={closeAllModals} disabled={loading}>Hủy</button>
                    <button className="btn-danger" onClick={handleConfirmDelete} disabled={loading}>
                        {loading ? 'Đang xóa...' : 'Xác nhận Xóa'}
                    </button>
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

    const renderErrorModal = () => (
        <div className="modal-overlay" onClick={closeErrorModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">❌ Lỗi</h4>
                </div>
                <div className="modal-body">
                    <p>{error}</p>
                </div>
                <div className="modal-actions">
                    <button className="btn-primary" onClick={closeErrorModal}>Đóng</button>
                    <button className="btn-secondary" onClick={fetchAllProducts}>Thử lại</button>
                </div>
            </div>
        </div>
    );

    const renderLoadingOverlay = () => (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Đang tải...</p>
            </div>
        </div>
    );

    // --- Main render ---
    return (
        <div className="account-page">
            <AdminSidebar
                activeView={activeView}
                setActiveView={setActiveView}
                openLogoutModal={() => setIsLogoutModalOpen(true)}
            />

            <main className="account-content">
                <div className="admin-content-header">
                    <h1>Sản phẩm ({products.length})</h1>
                    <div className="header-actions">
                        <select
                            className="filter-select"
                            value={activeView}
                            onChange={(e) => {
                                setActiveView(e.target.value);
                                if (e.target.value !== 'products') {
                                    fetchProductsByCategory(e.target.value);
                                } else {
                                    fetchAllProducts();
                                }
                            }}
                        >
                            <option value="products">Tất cả sản phẩm</option>
                            <option value="cameras">Chỉ Camera</option>
                            <option value="laptops">Chỉ Laptop</option>
                            <option value="phones">Chỉ Điện thoại</option>
                        </select>
                        <button
                            onClick={fetchAllProducts}
                            className="btn-secondary"
                            disabled={loading}
                        >
                            {loading ? 'Đang tải...' : 'Làm mới'}
                        </button>
                        <button
                            onClick={handleOpenAddModal}
                            className="btn-primary"
                            disabled={loading}
                        >
                            Thêm sản phẩm
                        </button>
                    </div>
                </div>

                {loading && products.length === 0 ? (
                    <div className="loading-container">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Đang tải danh sách sản phẩm...</p>
                        </div>
                    </div>
                ) : (
                    <ProductTable
                        products={products}
                        onEdit={handleOpenEditModal}
                        onDelete={handleOpenDeleteModal}
                    />
                )}
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
            {error && renderErrorModal()}
            {loading && products.length > 0 && renderLoadingOverlay()}
        </div>
    );
};

export default AdminPage;