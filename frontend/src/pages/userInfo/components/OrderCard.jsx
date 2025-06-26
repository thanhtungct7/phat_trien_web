import React from 'react';

const OrderCard = ({ order, onViewDetails, onReorder }) => {
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };

    return (
        <div className="order-card">
            <div className="order-header">
                <h4>Đơn hàng: {order.id}</h4>
                <span className={`status status-${order.status.toLowerCase().replace(/ /g, '-')}`}>{order.status}</span>
            </div>
            <div className="order-body">
                <p><strong>Ngày đặt:</strong> {order.date}</p>
                <p><strong>Tổng tiền:</strong> {formatCurrency(order.total)}</p>
            </div>
            <div className="order-actions">
                <button onClick={onViewDetails} className="btn-secondary">Xem chi tiết</button>
                {order.status === 'Đã hoàn thành' && <button onClick={onReorder} className="btn-primary">Mua lại</button>}
            </div>
        </div>
    );
};

export default OrderCard;