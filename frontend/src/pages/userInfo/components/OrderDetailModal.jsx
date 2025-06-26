import React from 'react';

const OrderDetailModal = ({ order, onClose }) => {
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };

    if (!order) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Chi tiết đơn hàng: {order.id}</h4>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="order-detail-info">
                        <p><strong>Ngày đặt:</strong> {order.date}</p>
                        <p><strong>Trạng thái:</strong> {order.status}</p>
                        <p><strong>Tổng tiền:</strong> <span className="total-price">{formatCurrency(order.total)}</span></p>
                    </div>
                    <h5>Danh sách sản phẩm:</h5>
                    <ul className="order-detail-products">
                        {order.products.map(product => (
                            <li key={product.id}>
                                <span className="product-name">{product.name} (x{product.quantity})</span>
                                <span className="product-price">{formatCurrency(product.price * product.quantity)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;