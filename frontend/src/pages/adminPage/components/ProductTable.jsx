import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
    const formatCurrency = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <div className="table-container">
            <table className="products-table">
                <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Thương hiệu</th>
                    <th>Loại</th>
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Năm SX</th>
                    <th>Ngày tạo</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={product.image || 'https://via.placeholder.com/60'}
                                    alt={product.name}
                                    className="product-thumbnail"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/60';
                                    }}
                                />
                            </td>
                            <td>
                                <div className="product-name">
                                    <strong>{product.name}</strong>
                                    {product.description && (
                                        <div className="product-description">
                                            {product.description}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td>{product.brand}</td>
                            <td>
                                    <span className="product-type-badge">
                                        {product.type}
                                    </span>
                            </td>
                            <td className="price-cell">
                                {formatCurrency(product.price)}
                            </td>
                            <td>
                                    <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.stock}
                                    </span>
                            </td>
                            <td>{product.yearOfManufacture}</td>
                            <td>{formatDate(product.createdAt)}</td>
                            <td className="action-buttons">
                                <button
                                    onClick={() => onEdit(product)}
                                    className="btn-secondary"
                                    title="Chỉnh sửa sản phẩm"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => onDelete(product.id)}
                                    className="btn-danger"
                                    title="Xóa sản phẩm"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                            <div className="empty-state">
                                <p>📦 Không tìm thấy sản phẩm nào.</p>
                                <small>Nhấn "Thêm sản phẩm" để bắt đầu thêm sản phẩm đầu tiên.</small>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;