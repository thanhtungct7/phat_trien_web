import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
    const formatCurrency = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

    return (
        <table className="products-table">
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Thương hiệu</th>
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 ? (
                    products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img src={product.imageUrl || 'https://via.placeholder.com/60'} alt={product.name} className="product-thumbnail" />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td>{product.stock}</td>
                            <td className="action-buttons">
                                <button onClick={() => onEdit(product)} className="btn-secondary">Sửa</button>
                                <button onClick={() => onDelete(product.id)} className="btn-danger">Xóa</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>Không tìm thấy sản phẩm nào.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ProductTable;