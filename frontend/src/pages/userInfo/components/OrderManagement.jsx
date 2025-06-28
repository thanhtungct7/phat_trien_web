import React, { useState } from 'react';
import OrderCard from './OrderCard';
import OrderDetailModal from './OrderDetailModal';

const mockOrders = [
    {
        id: '#ED12345',
        date: '22/06/2025',
        status: 'Đang giao hàng',
        total: 15000000,
        products: [
            { id: 'P01', name: 'Laptop ProMax 15', quantity: 1, price: 14000000 },
            { id: 'P02', name: 'Chuột không dây X1', quantity: 1, price: 500000 },
            { id: 'P03', name: 'Bàn di chuột Gaming', quantity: 2, price: 250000 },
        ]
    },
    {
        id: '#ED12321',
        date: '15/05/2025',
        status: 'Đã hoàn thành',
        total: 2500000,
        products: [
            { id: 'P04', name: 'Bàn phím cơ K2', quantity: 1, price: 2500000 }
        ]
    },
    {
        id: '#ED11999',
        date: '01/04/2025',
        status: 'Đã hủy',
        total: 890000,
        products: [
            { id: 'P05', name: 'Tai nghe Bluetooth Z5', quantity: 1, price: 890000 }
        ]
    },
];


const OrderManagement = ({ onAddToCart }) => { 
    const [activeTab, setActiveTab] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = mockOrders.filter(order => {
        if (activeTab === 'all') return true;
        if (activeTab === 'delivering') return order.status === 'Đang giao hàng';
        if (activeTab === 'completed') return order.status === 'Đã hoàn thành';
        if (activeTab === 'canceled') return order.status === 'Đã hủy';
        return false;
    });

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="order-management">
            <h1>Quản lý đơn hàng</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'active' : ''}>Tất cả</button>
                <button onClick={() => setActiveTab('delivering')} className={activeTab === 'delivering' ? 'active' : ''}>Đang giao</button>
                <button onClick={() => setActiveTab('completed')} className={activeTab === 'completed' ? 'active' : ''}>Hoàn thành</button>
                <button onClick={() => setActiveTab('canceled')} className={activeTab === 'canceled' ? 'active' : ''}>Đã hủy</button>
            </div>
            <div className="order-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onViewDetails={() => handleViewDetails(order)}
                            onReorder={() => onAddToCart(order.products, order.id)}
                        />
                    ))
                ) : (
                    <p>Không có đơn hàng nào trong mục này.</p>
                )}
            </div>

            {selectedOrder && (
                <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default OrderManagement;