import React, { useState } from 'react';

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const validateField = (name, value) => {
        let error = '';
        if (name === 'newPassword') {
            if (value.length < 8) error = 'Mật khẩu mới phải có ít nhất 8 ký tự.';
            else if (!/[A-Z]/.test(value)) error = 'Mật khẩu phải chứa ít nhất 1 chữ hoa.';
            else if (!/[a-z]/.test(value)) error = 'Mật khẩu phải chứa ít nhất 1 chữ thường.';
            else if (!/[0-9]/.test(value)) error = 'Mật khẩu phải chứa ít nhất 1 chữ số.';
        } else if (name === 'confirmPassword' && value !== passwords.newPassword) {
            error = 'Mật khẩu xác nhận không khớp.';
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {
            newPassword: validateField('newPassword', passwords.newPassword),
            confirmPassword: validateField('confirmPassword', passwords.confirmPassword),
        };
        setErrors(validationErrors);
        const isValid = !Object.values(validationErrors).some(Boolean);
        
        if (isValid && isFormValid) {
            setIsConfirmModalOpen(true); 
        }
    };

    //được gọi khi người dùng xác nhận đổi mật khẩu
    const handleConfirmPasswordChange = () => {
        setIsConfirmModalOpen(false); 
        
        console.log('Đang gửi yêu cầu đổi mật khẩu:', passwords);
        
        setSuccessMessage('Đổi mật khẩu thành công!');
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' }); 
    };

    const isFormValid = passwords.oldPassword && passwords.newPassword && passwords.confirmPassword && !Object.values(errors).some(Boolean);

    return (
        <div className="change-password">
            <h1>Đổi mật khẩu</h1>
            <form className="account-details-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="oldPassword">Mật khẩu cũ</label>
                    <input type="password" id="oldPassword" name="oldPassword" value={passwords.oldPassword} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handleInputChange} onBlur={handleBlur} className={errors.newPassword ? 'input-error' : ''} required />
                    {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handleInputChange} onBlur={handleBlur} className={errors.confirmPassword ? 'input-error' : ''} required />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={!isFormValid}>
                        Lưu mật khẩu
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
                            <button className="btn-secondary" onClick={() => setIsConfirmModalOpen(false)}>Hủy</button>
                            <button className="btn-primary" onClick={handleConfirmPasswordChange}>Xác nhận</button>
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