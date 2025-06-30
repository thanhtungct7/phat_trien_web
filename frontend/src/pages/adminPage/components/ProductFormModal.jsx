import React, { useState, useEffect } from 'react';

// DI CHUYỂN CÁC COMPONENT CON RA NGOÀI COMPONENT CHA
// ===================================================

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

// ===================================================

const emptyForm = { 
    // Các trường chung
    name: '', brand: '', type: '', description: '', image: '', price: '', stock: '', yearOfManufacture: '',
    // Các trường của Smartphone
    screenSize: '', technology: '', cpuCores: '', chipset: '', gpu: '', mainCamera: '', cameraUltraWide: '', cameraTelephoto: '',
    // Các trường của Laptop
    chipSet: '', gpuCores: '', resolution: '',
    // Các trường của Camera
    wifiConnect: '', storage: ''
};

const ProductFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (initialData) {
            setStep(2);
            setSelectedCategory(initialData.category);
            // Ánh xạ dữ liệu từ API vào form.
            const mappedData = {
                ...emptyForm,
                ...initialData,
                screenSize: initialData.screen_size || '',
                yearOfManufacture: initialData.year_of_manufacture || '',
                cpuCores: initialData.cpu_cores || '',
                mainCamera: initialData.main_camera || '',
                cameraUltraWide: initialData.camera_ultra_wide || '',
                cameraTelephoto: initialData.camera_telephoto || '',
                chipSet: initialData.chip_set || '',
                gpuCores: initialData.gpu_cores || '',
                wifiConnect: initialData.wifi_connect || '',
            };
            setFormData(mappedData);
        } else {
            setStep(1);
            setSelectedCategory('');
            setFormData(emptyForm);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setFormData(prev => ({ ...emptyForm, type: category }));
        setStep(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataToSend = { ...formData };
        
        // Ánh xạ các trường camelCase của form sang snake_case của backend
        const mapToBackend = (obj) => {
            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                    newObj[newKey] = obj[key];
                }
            }
            return newObj;
        };

        const finalData = mapToBackend(dataToSend);
        
        // Đảm bảo các trường chung không bị đổi tên nếu đã đúng
        finalData.name = formData.name;
        finalData.brand = formData.brand;
        finalData.type = selectedCategory.toUpperCase();
        finalData.description = formData.description;
        finalData.image = formData.image;
        finalData.price = Number(formData.price);
        finalData.stock = Number(formData.stock);
        finalData.year_of_manufacture = formData.yearOfManufacture;
        
        // Xóa các trường không cần thiết hoặc đã được chuyển đổi
        delete finalData.scree_n_size;
        delete finalData.cpu_cores;
        delete finalData.main_camera;
        delete finalData.camera_ultra_wide;
        delete finalData.camera_telephoto;
        delete finalData.chip_set;
        delete finalData.gpu_cores;
        delete finalData.wifi_connect;
        delete finalData.storage;
        delete finalData.technology;
        delete finalData.chipset;
        delete finalData.gpu;
        delete finalData.resolution;
        delete finalData.category;
        delete finalData.id;
        delete finalData.created_at;
        delete finalData.updated_at;

        // Bổ sung lại các trường đã được chuyển đổi đúng cách
        if (selectedCategory === 'SMARTPHONE') {
            finalData.screen_size = formData.screenSize;
            finalData.technology = formData.technology;
            finalData.cpu_cores = formData.cpuCores;
            finalData.chipset = formData.chipset;
            finalData.gpu = formData.gpu;
            finalData.main_camera = formData.mainCamera;
            finalData.camera_ultra_wide = formData.cameraUltraWide;
            finalData.camera_telephoto = formData.cameraTelephoto;
        } else if (selectedCategory === 'LAPTOP') {
            finalData.screen_size = formData.screenSize;
            finalData.resolution = formData.resolution;
            finalData.chip_set = formData.chipSet;
            finalData.cpu_cores = formData.cpuCores;
            finalData.gpu_cores = formData.gpuCores;
        } else if (selectedCategory === 'CAMERA') {
            finalData.resolution = formData.resolution;
            finalData.wifi_connect = formData.wifiConnect;
            finalData.storage = formData.storage;
        }

        onSubmit(finalData, selectedCategory);
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
                            {/* --- Các trường chung --- */}
                            <div className="form-group"><label>Tên sản phẩm</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label>Mô tả sản phẩm</label><textarea name="description" rows="4" value={formData.description} onChange={handleInputChange}></textarea></div>
                            <div className="form-group"><label>URL Hình ảnh</label><input type="text" name="image" value={formData.image} onChange={handleInputChange} /></div>
                            <div className="form-group"><label>Giá</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label>Số lượng tồn kho</label><input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label>Năm sản xuất</label><input type="text" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleInputChange} /></div>

                            {/* --- Truyền props xuống component con --- */}
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