import React, { useState } from 'react';
import { useAuth } from '../../../components/AuthContext';

const ChangePassword = ({ username }) => {
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    // THAY ĐỔI: Sử dụng state errors để lưu lỗi của từng trường
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // Bỏ state 'error' chung, dùng state 'errors'

    // Hàm validate cho từng trường
    const validateField = (name, value) => {
        let error = '';
        if (name === 'newPassword') {
            if (value.length < 6) error = 'Mật khẩu mới phải có ít nhất 6 ký tự.';
        } else if (name === 'confirmPassword' && value !== passwords.newPassword) {
            error = 'Mật khẩu xác nhận không khớp.';
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        // Xóa lỗi ngay khi người dùng bắt đầu gõ
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        // THAY ĐỔI: Thêm validate cho oldPassword khi blur
        if (name === 'oldPassword' && value.length === 0) {
            setErrors(prev => ({ ...prev, oldPassword: 'Vui lòng nhập mật khẩu cũ.' }));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {
            oldPassword: validateField('oldPassword', passwords.oldPassword),
            newPassword: validateField('newPassword', passwords.newPassword),
            confirmPassword: validateField('confirmPassword', passwords.confirmPassword),
        };
        // Kiểm tra lỗi empty field cho oldPassword
        if (!passwords.oldPassword) {
            validationErrors.oldPassword = 'Vui lòng nhập mật khẩu cũ.';
        }

        setErrors(validationErrors);
        const isValid = !Object.values(validationErrors).some(Boolean);
        
        // Mở modal xác nhận nếu form hợp lệ
        if (isValid) {
            setIsConfirmModalOpen(true); 
        }
    };

    // Hàm gọi API để đổi mật khẩu
    const handleConfirmPasswordChange = async () => {
        setIsConfirmModalOpen(false);
        setLoading(true);
        // Bỏ setError('') ở đây vì lỗi được set vào state 'errors'
        setErrors({}); 
        setSuccessMessage('');

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8080/api/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: username,
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword
                })
            });
            
            const data = await response.json();

            // THAY ĐỔI: Bắt lỗi API và cập nhật lỗi tương ứng với trường input
            if (!response.ok) {
                // Kiểm tra message từ backend để set lỗi cụ thể
                if (data.message === 'Old password is not correct' || data.code === 1008) {
                    setErrors({ oldPassword: 'Mật khẩu cũ không chính xác' });
                } else {
                    // Set lỗi chung nếu không phải lỗi cụ thể
                    setErrors({ apiError: data.message || 'Đổi mật khẩu thất bại.' });
                }
                // Ném lỗi để dừng try/catch
                throw new Error(data.message);
            }
            
            console.log('Đổi mật khẩu thành công!');
            setSuccessMessage('Đổi mật khẩu thành công!');
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' }); 
        } catch (err) {
            console.error('Error changing password:', err);
            // Lỗi đã được set ở trên, không cần set lại ở đây
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = passwords.oldPassword && passwords.newPassword && passwords.confirmPassword && !Object.values(errors).some(Boolean);

    return (
        <div className="change-password">
            <h1>Đổi mật khẩu</h1>
            <form className="account-details-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="oldPassword">Mật khẩu cũ</label>
                    <input 
                        type="password" 
                        id="oldPassword" 
                        name="oldPassword" 
                        value={passwords.oldPassword} 
                        onChange={handleInputChange} 
                        onBlur={handleBlur} // Thêm onBlur để validate khi rời input
                        className={errors.oldPassword ? 'input-error' : ''} 
                        required 
                        disabled={loading} 
                    />
                    {/* THAY ĐỔI: Hiển thị lỗi riêng cho trường này */}
                    {errors.oldPassword && <span className="error-message">{errors.oldPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handleInputChange} onBlur={handleBlur} className={errors.newPassword ? 'input-error' : ''} required disabled={loading} />
                    {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handleInputChange} onBlur={handleBlur} className={errors.confirmPassword ? 'input-error' : ''} required disabled={loading} />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={!isFormValid || loading}>
                        {loading ? 'Đang lưu...' : 'Lưu mật khẩu'}
                    </button>
                </div>
            </form>

            {/* xác nhận đổi mật khẩu */}
            {isConfirmModalOpen && (
                <div className="modal-overlay" onClick={() => setIsConfirmModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận thay đổi</h4>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn đổi mật khẩu không?</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setIsConfirmModalOpen(false)} disabled={loading}>Hủy</button>
                            <button className="btn-primary" onClick={handleConfirmPasswordChange} disabled={loading}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
            
            {successMessage && (
                <div className="modal-overlay" onClick={() => setSuccessMessage('')}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                         <div className="modal-header">
                            <h4 className="modal-title">✅ Thành công</h4>
                        </div>
                        <div className="modal-body">
                            <p>{successMessage}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-primary" onClick={() => setSuccessMessage('')}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;