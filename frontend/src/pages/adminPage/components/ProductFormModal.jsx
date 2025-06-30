
import React, { useState, useEffect } from 'react';

const PhoneFields = ({ formData, handleInputChange }) => (
    <>
        <div className="form-group"><label>Thương hiệu</label><input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required /></div>
        <div className="form-group"><label>Công nghệ</label><input type="text" name="technology" value={formData.technology} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Kích thước màn hình</label><input type="text" name="screenSize" value={formData.screenSize} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Lõi CPU</label><input type="text" name="cpuCores" value={formData.cpuCores} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Chipset</label><input type="text" name="chipset" value={formData.chipset} onChange={handleInputChange} /></div>
        <div className="form-group"><label>GPU</label><input type="text" name="gpu" value={formData.gpu} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Camera chính</label><input type="text" name="mainCamera" value={formData.mainCamera} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Camera góc rộng</label><input type="text" name="cameraUltraWide" value={formData.cameraUltraWide} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Camera telephoto</label><input type="text" name="cameraTelephoto" value={formData.cameraTelephoto} onChange={handleInputChange} /></div>
    </>
);

const LaptopFields = ({ formData, handleInputChange }) => (
     <>
        <div className="form-group"><label>Thương hiệu</label><input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required /></div>
        <div className="form-group"><label>Chipset</label><input type="text" name="chipSet" value={formData.chipSet} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Lõi CPU</label><input type="text" name="cpuCores" value={formData.cpuCores} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Lõi GPU</label><input type="text" name="gpuCores" value={formData.gpuCores} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Kích thước màn hình</label><input type="text" name="screenSize" value={formData.screenSize} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Độ phân giải màn hình</label><input type="text" name="resolution" value={formData.resolution} onChange={handleInputChange} /></div>
    </>
);

const CameraFields = ({ formData, handleInputChange }) => (
    <>
        <div className="form-group"><label>Thương hiệu</label><input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required /></div>
        <div className="form-group"><label>Độ phân giải</label><input type="text" name="resolution" value={formData.resolution} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Kết nối Wifi</label><input type="text" name="wifiConnect" value={formData.wifiConnect} onChange={handleInputChange} /></div>
        <div className="form-group"><label>Bộ nhớ lưu trữ</label><input type="text" name="storage" value={formData.storage} onChange={handleInputChange} /></div>
    </>
);

const initialFormState = {
    name: '', brand: '', type: '', description: '', image: '', price: '', stock: '', yearOfManufacture: '',
    screenSize: '', technology: '', cpuCores: '', chipset: '', gpu: '', mainCamera: '', cameraUltraWide: '', cameraTelephoto: '',
    chipSet: '', gpuCores: '', resolution: '',
    wifiConnect: '', storage: ''
};

const ProductFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setSelectedCategory('');
            setFormData(initialFormState);
            return;
        }

        if (initialData) {
            setStep(2);
            setSelectedCategory(initialData.category);
            const mappedData = {
                ...initialFormState,
                ...initialData,
            };
            setFormData(mappedData);
        } else {
            setStep(1);
            setSelectedCategory('');
            setFormData(initialFormState);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setFormData({ ...initialFormState, type: category });
        setStep(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const commonFields = ['name', 'brand', 'description', 'image', 'price', 'stock', 'yearOfManufacture'];
        const categoryFields = {
            SMARTPHONE: ['screenSize', 'technology', 'cpuCores', 'chipset', 'gpu', 'mainCamera', 'cameraUltraWide', 'cameraTelephoto'],
            LAPTOP: ['screenSize', 'resolution', 'chipSet', 'cpuCores', 'gpuCores'],
            CAMERA: ['resolution', 'wifiConnect', 'storage']
        };

        const fieldsToKeep = [...commonFields, ...(categoryFields[selectedCategory] || [])];

        const dataToSend = {};
        for (const key of fieldsToKeep) {
            if (formData[key] !== undefined && formData[key] !== '') {
                dataToSend[key] = formData[key];
            }
        }

        dataToSend.type = selectedCategory.toUpperCase();
        dataToSend.price = Number(formData.price) || 0;
        dataToSend.stock = Number(formData.stock) || 0;
        
        onSubmit(dataToSend, selectedCategory);
    };

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
                                <button onClick={() => handleCategorySelect('SMARTPHONE')} className="btn-primary">Điện thoại</button>
                                <button onClick={() => handleCategorySelect('LAPTOP')} className="btn-primary">Laptop</button>
                                <button onClick={() => handleCategorySelect('CAMERA')} className="btn-primary">Camera</button>
                            </div>
                        </div>
                    )}
                    
                    {step === 2 && (
                        <form id="product-form-id" onSubmit={handleSubmit} className="product-form">
                            <p className="form-category-indicator">Danh mục: <strong>{selectedCategory}</strong></p>
                            <div className="form-group"><label>Tên sản phẩm</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label>Mô tả sản phẩm</label><textarea name="description" rows="4" value={formData.description} onChange={handleInputChange}></textarea></div>
                            <div className="form-group"><label>URL Hình ảnh</label><input type="text" name="image" value={formData.image} onChange={handleInputChange} /></div>
                            <div className="form-group"><label>Giá</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label>Số lượng tồn kho</label><input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label>Năm sản xuất</label><input type="text" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleInputChange} /></div>

                            {selectedCategory === 'SMARTPHONE' && <PhoneFields formData={formData} handleInputChange={handleInputChange} />}
                            {selectedCategory === 'LAPTOP' && <LaptopFields formData={formData} handleInputChange={handleInputChange} />}
                            {selectedCategory === 'CAMERA' && <CameraFields formData={formData} handleInputChange={handleInputChange} />}
                        </form>
                    )}
                </div>

                <div className="modal-actions">
                    <button type="button" onClick={onClose} className="btn-secondary">Hủy</button>
                    {step === 2 && <button type="submit" form="product-form-id" className="btn-primary">Lưu sản phẩm</button>}
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;