import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../components/AuthContext';

const AccountDetails = ({ user }) => {
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
    const [hasChanged, setHasChanged] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);

    // THAY ĐỔI: Lấy đúng hàm updateUserContext từ context
    const { updateUserContext } = useAuth();

    useEffect(() => {
        if (user) {
            setUserId(user.userId);
            setFormData({
                fullName: `${user.firstname || ''} ${user.lastname || ''}`.trim(),
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;
        const initialFullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
        const initialEmail = user.email || '';
        const initialPhone = user.phone || '';

        const isDataChanged =
            formData.fullName !== initialFullName ||
            formData.email !== initialEmail ||
            formData.phone !== initialPhone;
        setHasChanged(isDataChanged);
    }, [formData, user]);

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleToggleEdit = (field) => {
        if (field === 'email') {
            setIsEditingEmail(true);
            setTimeout(() => emailInputRef.current?.focus(), 0);
        } else if (field === 'phone') {
            setIsEditingPhone(true);
            setTimeout(() => phoneInputRef.current?.focus(), 0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (hasChanged && userId) {
            setIsConfirmModalOpen(true);
        }
    };

    const handleConfirmSaveChanges = async () => {
        setIsConfirmModalOpen(false);
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const API_UPDATE_USER_URL = `http://localhost:8080/api/users/${userId}`;

        try {
            const token = localStorage.getItem('accessToken');
            const nameParts = formData.fullName.trim().split(' ');
            const lastname = nameParts.pop() || '';
            const firstname = nameParts.join(' ');

            const updateData = { firstname, lastname, email: formData.email, phone: formData.phone };

            const response = await fetch(API_UPDATE_USER_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Lỗi khi cập nhật thông tin.');
            }
            
            const data = await response.json();
            
            // THAY ĐỔI QUAN TRỌNG: Gọi hàm updateUserContext thay vì login
            updateUserContext(data.result);
            
            setSuccessMessage('Cập nhật thông tin thành công!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setIsEditingEmail(false);
            setIsEditingPhone(false);
        }
    };

    const closeSuccessModal = () => setSuccessMessage('');

    if (!user) {
        return <div className="loading-indicator">Đang tải...</div>;
    }

    return (
        <div className="account-details">
            <h1>Thông tin cá nhân</h1>
            <p>Quản lý thông tin cá nhân của bạn để bảo mật tài khoản.</p>
            <form className="account-details-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} disabled={loading} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-with-button">
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditingEmail} ref={emailInputRef} className={!isEditingEmail ? 'readonly-input' : ''} disabled={loading} />
                        {!isEditingEmail && <button type="button" className="btn-secondary btn-edit" onClick={() => handleToggleEdit('email')}>Thay đổi</button>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <div className="input-with-button">
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} readOnly={!isEditingPhone} ref={phoneInputRef} className={!isEditingPhone ? 'readonly-input' : ''} disabled={loading} />
                        {!isEditingPhone && <button type="button" className="btn-secondary btn-edit" onClick={() => handleToggleEdit('phone')}>Thay đổi</button>}
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={!hasChanged || loading}>
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </form>

            {isConfirmModalOpen && (
                <div className="modal-overlay" onClick={() => setIsConfirmModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header"><h4 className="modal-title">Xác nhận thay đổi</h4></div>
                        <div className="modal-body"><p>Bạn có chắc chắn muốn lưu các thay đổi này không?</p></div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setIsConfirmModalOpen(false)}>Hủy</button>
                            <button className="btn-primary" onClick={handleConfirmSaveChanges}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="modal-overlay" onClick={closeSuccessModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                         <div className="modal-header"><h4 className="modal-title">✅ Thành công</h4></div>
                         <div className="modal-body"><p>{successMessage}</p></div>
                         <div className="modal-actions"><button className="btn-primary" onClick={closeSuccessModal}>Đóng</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;