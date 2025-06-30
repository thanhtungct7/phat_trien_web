import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import OrderDetailModal from './OrderDetailModal';

// Endpoint API để lấy đơn hàng
const API_ORDERS_URL = 'http://localhost:8080/api/orders';

const OrderManagement = ({ userId }) => { 
    const [activeTab, setActiveTab] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]); // State để lưu data từ API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dữ liệu đơn hàng khi component mount
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('accessToken');
                // THAY ĐỔI: Thêm userId vào URL để fetch đơn hàng của user cụ thể
                // Giả sử backend có endpoint /api/orders/user/{userId} hoặc /api/orders?userId=...
                const response = await fetch(`${API_ORDERS_URL}/user/${userId}`, { 
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (!response.ok) {
                    throw new Error('Không thể tải danh sách đơn hàng.');
                }
                const data = await response.json();
                setOrders(data.result);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Có lỗi khi tải đơn hàng. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const filteredOrders = orders.filter(order => {
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

    if (loading) {
        return <div className="loading-indicator">Đang tải đơn hàng...</div>;
    }

    if (error) {
        return <div className="error-message">Lỗi: {error}</div>;
    }

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
                            onReorder={() => console.log('Reorder logic here')}
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