import React, { useState, useRef, useEffect } from 'react';

const currentUser = {
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0987654321',
    gender: 'Nam',
    dob: '1995-10-20',
    address: 'Số 123, Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh'
};

const AccountDetails = () => {
    const [initialData] = useState(currentUser);
    const [formData, setFormData] = useState(currentUser);
    const [hasChanged, setHasChanged] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);

    useEffect(() => {
        const isDataChanged = JSON.stringify(initialData) !== JSON.stringify(formData);
        setHasChanged(isDataChanged);
    }, [formData, initialData]);

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleToggleEdit = (field) => {
        if (field === 'email') {
            setIsEditingEmail(true);
            setTimeout(() => emailInputRef.current.focus(), 0);
        } else if (field === 'phone') {
            setIsEditingPhone(true);
            setTimeout(() => phoneInputRef.current.focus(), 0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (hasChanged) {
            setIsConfirmModalOpen(true); // Mở pop-up
        }
    };

    //lưu thông tin sau khi người dùng xác nhận
    const handleConfirmSaveChanges = () => {
        setIsConfirmModalOpen(false); // Đóng pop-up xác nhận

        console.log('Đang lưu dữ liệu:', formData);
        setIsEditingEmail(false);
        setIsEditingPhone(false);
        
        setSuccessMessage('Cập nhật thông tin thành công!');
    };

    const closeSuccessModal = () => {
        setSuccessMessage('');
    };

    return (
        <div className="account-details">
            <h1>Thông tin cá nhân</h1>
            <p>Quản lý thông tin cá nhân của bạn để bảo mật tài khoản.</p>
            <form className="account-details-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-with-button">
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditingEmail} ref={emailInputRef} className={!isEditingEmail ? 'readonly-input' : ''} />
                        {!isEditingEmail && <button type="button" className="btn-secondary btn-edit" onClick={() => handleToggleEdit('email')}>Thay đổi</button>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <div className="input-with-button">
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} readOnly={!isEditingPhone} ref={phoneInputRef} className={!isEditingPhone ? 'readonly-input' : ''} />
                        {!isEditingPhone && <button type="button" className="btn-secondary btn-edit" onClick={() => handleToggleEdit('phone')}>Thay đổi</button>}
                    </div>
                </div>
                <div className="form-row">
                     <div className="form-group">
                        <label htmlFor="dob">Ngày sinh</label>
                        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Giới tính</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                </div>
                 <div className="form-group">
                    <label htmlFor="address">Địa chỉ</label>
                    <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleInputChange}></textarea>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={!hasChanged}>
                        Lưu thay đổi
                    </button>
                </div>
            </form>

            {isConfirmModalOpen && (
                <div className="modal-overlay" onClick={() => setIsConfirmModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận thay đổi</h4>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn lưu các thay đổi này không?</p>
                        </div>
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
                        <div className="modal-header">
                            <h4 className="modal-title">✅ Thành công</h4>
                        </div>
                        <div className="modal-body">
                            <p>{successMessage}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-primary" onClick={closeSuccessModal}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;