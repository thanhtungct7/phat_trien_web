import React, { useState, useEffect } from 'react';

const emptyForm = { 
    category: '', name: '', brand: '', price: '', stock: '', imageUrl: '', description: '',
    operatingSystem: '', screenSize: '', ram: '', storage: '', color: '',
    cpu: '', screenResolution: '', graphicsCard: '', weight: '',
    resolution: '', sensorType: '', focalLength: '', connectivity: '', features: ''
};

const ProductFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (initialData) {
            setStep(2);
            setSelectedCategory(initialData.category);
            setFormData({ ...emptyForm, ...initialData });
        } else {
            setStep(1);
            setSelectedCategory('');
            setFormData(emptyForm);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setFormData(prev => ({ ...emptyForm, category }));
        setStep(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Component con cho các trường của Điện thoại
    const PhoneFields = () => (
        <>
            <div className="form-group"><label>Thương hiệu</label><input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Hệ điều hành</label><input type="text" name="operatingSystem" value={formData.operatingSystem} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Kích thước màn hình</label><input type="text" name="screenSize" value={formData.screenSize} onChange={handleInputChange} /></div>
            <div className="form-group"><label>RAM</label><input type="text" name="ram" value={formData.ram} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Dung lượng lưu trữ</label><input type="text" name="storage" value={formData.storage} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Màu sắc</label><input type="text" name="color" value={formData.color} onChange={handleInputChange} /></div>
        </>
    );

    // Component con cho các trường của Laptop
    const LaptopFields = () => (
         <>
            <div className="form-group"><label>Thương hiệu</label><input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>CPU</label><input type="text" name="cpu" value={formData.cpu} onChange={handleInputChange} /></div>
            <div className="form-group"><label>RAM</label><input type="text" name="ram" value={formData.ram} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Ổ cứng</label><input type="text" name="storage" value={formData.storage} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Card đồ họa</label><input type="text" name="graphicsCard" value={formData.graphicsCard} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Kích thước màn hình</label><input type="text" name="screenSize" value={formData.screenSize} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Độ phân giải màn hình</label><input type="text" name="screenResolution" value={formData.screenResolution} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Cân nặng</label><input type="text" name="weight" value={formData.weight} onChange={handleInputChange} /></div>
        </>
    );

    // Component con cho các trường của Camera
    const CameraFields = () => (
        <>
            <div className="form-group"><label>Thương hiệu</label><input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Độ phân giải</label><input type="text" name="resolution" value={formData.resolution} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Loại Camera</label><input type="text" name="type" value={formData.type} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Cảm biến</label><input type="text" name="sensorType" value={formData.sensorType} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Kết nối</label><input type="text" name="connectivity" value={formData.connectivity} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Tính năng (cách nhau bởi dấu phẩy)</label><input type="text" name="features" value={formData.features} onChange={handleInputChange} /></div>
        </>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{initialData ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>
                
                <div className="modal-body">
                    {step === 1 && !initialData && (
                        <div className="category-selection">
                            <p>Vui lòng chọn loại sản phẩm để tiếp tục:</p>
                            <div className="category-buttons">
                                <button onClick={() => handleCategorySelect('Điện thoại')} className="btn-primary">Điện thoại</button>
                                <button onClick={() => handleCategorySelect('Laptop')} className="btn-primary">Laptop</button>
                                <button onClick={() => handleCategorySelect('Camera')} className="btn-primary">Camera</button>
                            </div>
                        </div>
                    )}
                    
                    {step === 2 && (
                        <form id="product-form-id" onSubmit={handleSubmit} className="product-form">
                            <p className="form-category-indicator">Danh mục: <strong>{selectedCategory}</strong></p>
                            {/* --- Các trường chung --- */}
                            <div className="form-group"><label>Tên sản phẩm</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required /></div>
                            
                            {/* --- Các trường động --- */}
                            {selectedCategory === 'Điện thoại' && <PhoneFields />}
                            {selectedCategory === 'Laptop' && <LaptopFields />}
                            {selectedCategory === 'Camera' && <CameraFields />}
                            
                            {/* --- Các trường chung khác --- */}
                            <div className="form-group"><label>URL Hình ảnh</label><input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} /></div>
                            <div className="form-group"><label>Mô tả sản phẩm</label><textarea name="description" rows="4" value={formData.description} onChange={handleInputChange}></textarea></div>
                            <div className="form-group"><label>Giá</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label>Số lượng tồn kho</label><input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required /></div>
                        </form>
                    )}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onClose} className="btn-secondary">Hủy</button>
                    {step === 2 && <button type="submit" form="product-form-id" className="btn-primary">Lưu sản phẩm</button>}
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;