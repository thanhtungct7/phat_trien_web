import React, { useState, useEffect } from 'react';

const emptyForm = {
    category: '', name: '', brand: '', price: '', stock: '', image: '', description: '', type: '', yearOfManufacture: '',
    // Camera fields
    resolution: '', wifiConnect: '', storage: '',
    // Laptop fields
    screenSize: '', chipSet: '', cpuCores: '', gpuCores: '',
    // Phone fields
    technology: '', chipset: '', gpu: '', mainCamera: '', cameraUltraWide: '', cameraTelephoto: ''
};

const ProductFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (initialData) {
            setStep(2);
            // Xác định category từ dữ liệu có sẵn
            let category = initialData.category;
            if (!category) {
                // Nếu không có category, thử xác định từ productType
                if (initialData.productType === 'camera') category = 'Camera';
                else if (initialData.productType === 'laptop') category = 'Laptop';
                else if (initialData.productType === 'phone') category = 'Điện thoại';
            }

            setSelectedCategory(category);
            setFormData({ ...emptyForm, ...initialData, category });
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

        // Chuẩn bị dữ liệu theo từng loại sản phẩm
        let submitData = {
            name: formData.name,
            brand: formData.brand || "no",
            type: formData.type,
            description: formData.description || "no",
            image: formData.image || "no",
            price: parseInt(formData.price),
            stock: parseInt(formData.stock) || 0,
            yearOfManufacture: formData.yearOfManufacture
        };

        // Thêm các trường riêng theo loại sản phẩm
        if (selectedCategory === 'Camera') {
            submitData = {
                ...submitData,
                resolution: formData.resolution || "no",
                wifiConnect: formData.wifiConnect || "no",
                storage: formData.storage || "no"
            };
        } else if (selectedCategory === 'Laptop') {
            submitData = {
                ...submitData,
                screenSize: formData.screenSize || "0",
                resolution: formData.resolution || "no",
                chipSet: formData.chipSet || "no",
                cpuCores: formData.cpuCores || "no",
                gpuCores: formData.gpuCores || "no"
            };
        } else if (selectedCategory === 'Điện thoại') {
            submitData = {
                ...submitData,
                screenSize: formData.screenSize || "0",
                technology: formData.technology,
                cpuCores: formData.cpuCores || "no",
                chipset: formData.chipset || "no",
                gpu: formData.gpu || "no",
                mainCamera: formData.mainCamera,
                cameraUltraWide: formData.cameraUltraWide,
                cameraTelephoto: formData.cameraTelephoto
            };
        }

        console.log('📤 Submitting product data:', submitData);
        onSubmit(submitData);
    };

    // Component con cho các trường của Điện thoại (SmartPhoneRequestDTO)
    const PhoneFields = () => (
        <>
            <div className="form-group">
                <label>Thương hiệu *</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Loại điện thoại</label>
                <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="VD: Smartphone, iPhone" />
            </div>
            <div className="form-group">
                <label>Năm sản xuất</label>
                <input type="text" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleInputChange} placeholder="VD: 2024" />
            </div>
            <div className="form-group">
                <label>Kích thước màn hình</label>
                <input type="text" name="screenSize" value={formData.screenSize} onChange={handleInputChange} placeholder="VD: 6.7 inch" />
            </div>
            <div className="form-group">
                <label>Công nghệ màn hình</label>
                <input type="text" name="technology" value={formData.technology} onChange={handleInputChange} placeholder="VD: OLED, AMOLED" />
            </div>
            <div className="form-group">
                <label>CPU Cores</label>
                <input type="text" name="cpuCores" value={formData.cpuCores} onChange={handleInputChange} placeholder="VD: 8 cores" />
            </div>
            <div className="form-group">
                <label>Chipset</label>
                <input type="text" name="chipset" value={formData.chipset} onChange={handleInputChange} placeholder="VD: A17 Pro, Snapdragon 8 Gen 3" />
            </div>
            <div className="form-group">
                <label>GPU</label>
                <input type="text" name="gpu" value={formData.gpu} onChange={handleInputChange} placeholder="VD: Apple GPU, Adreno 750" />
            </div>
            <div className="form-group">
                <label>Camera chính</label>
                <input type="text" name="mainCamera" value={formData.mainCamera} onChange={handleInputChange} placeholder="VD: 48MP" />
            </div>
            <div className="form-group">
                <label>Camera Ultra Wide</label>
                <input type="text" name="cameraUltraWide" value={formData.cameraUltraWide} onChange={handleInputChange} placeholder="VD: 12MP" />
            </div>
            <div className="form-group">
                <label>Camera Telephoto</label>
                <input type="text" name="cameraTelephoto" value={formData.cameraTelephoto} onChange={handleInputChange} placeholder="VD: 12MP 3x zoom" />
            </div>
        </>
    );

    // Component con cho các trường của Laptop (LaptopRequestDTO)
    const LaptopFields = () => (
        <>
            <div className="form-group">
                <label>Thương hiệu *</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Loại laptop</label>
                <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="VD: Gaming, Ultrabook, Business" />
            </div>
            <div className="form-group">
                <label>Năm sản xuất</label>
                <input type="text" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleInputChange} placeholder="VD: 2024" />
            </div>
            <div className="form-group">
                <label>Kích thước màn hình</label>
                <input type="text" name="screenSize" value={formData.screenSize} onChange={handleInputChange} placeholder="VD: 15.6 inch" />
            </div>
            <div className="form-group">
                <label>Độ phân giải màn hình</label>
                <input type="text" name="resolution" value={formData.resolution} onChange={handleInputChange} placeholder="VD: 1920x1080, 2560x1600" />
            </div>
            <div className="form-group">
                <label>Chipset</label>
                <input type="text" name="chipSet" value={formData.chipSet} onChange={handleInputChange} placeholder="VD: Intel Core i7, AMD Ryzen 7" />
            </div>
            <div className="form-group">
                <label>CPU Cores</label>
                <input type="text" name="cpuCores" value={formData.cpuCores} onChange={handleInputChange} placeholder="VD: 8 cores, 16 threads" />
            </div>
            <div className="form-group">
                <label>GPU Cores</label>
                <input type="text" name="gpuCores" value={formData.gpuCores} onChange={handleInputChange} placeholder="VD: RTX 4060, Intel Iris Xe" />
            </div>
        </>
    );

    // Component con cho các trường của Camera (CameraRequestDTO)
    const CameraFields = () => (
        <>
            <div className="form-group">
                <label>Thương hiệu *</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Loại Camera</label>
                <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="VD: Mirrorless, DSLR, Action Camera" />
            </div>
            <div className="form-group">
                <label>Năm sản xuất</label>
                <input type="text" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleInputChange} placeholder="VD: 2024" />
            </div>
            <div className="form-group">
                <label>Độ phân giải</label>
                <input type="text" name="resolution" value={formData.resolution} onChange={handleInputChange} placeholder="VD: 24MP, 45MP" />
            </div>
            <div className="form-group">
                <label>Kết nối WiFi</label>
                <select name="wifiConnect" value={formData.wifiConnect} onChange={handleInputChange}>
                    <option value="no">Không</option>
                    <option value="yes">Có</option>
                </select>
            </div>
            <div className="form-group">
                <label>Bộ nhớ</label>
                <input type="text" name="storage" value={formData.storage} onChange={handleInputChange} placeholder="VD: 64GB, 128GB, SD Card" />
            </div>
        </>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content product-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{initialData ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>

                <div className="modal-body">
                    {step === 1 && !initialData && (
                        <div className="category-selection">
                            <p>Vui lòng chọn loại sản phẩm để tiếp tục:</p>
                            <div className="category-buttons">
                                <button onClick={() => handleCategorySelect('Điện thoại')} className="btn-primary category-btn">
                                    📱 Điện thoại
                                </button>
                                <button onClick={() => handleCategorySelect('Laptop')} className="btn-primary category-btn">
                                    💻 Laptop
                                </button>
                                <button onClick={() => handleCategorySelect('Camera')} className="btn-primary category-btn">
                                    📷 Camera
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <form id="product-form-id" onSubmit={handleSubmit} className="product-form">
                            <div className="form-category-indicator">
                                <span className="category-badge">Danh mục: <strong>{selectedCategory}</strong></span>
                                {!initialData && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="btn-change-category"
                                    >
                                        Đổi danh mục
                                    </button>
                                )}
                            </div>

                            {/* --- Các trường chung --- */}
                            <div className="form-group">
                                <label>Tên sản phẩm *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>

                            {/* --- Các trường động theo loại sản phẩm --- */}
                            {selectedCategory === 'Điện thoại' && <PhoneFields />}
                            {selectedCategory === 'Laptop' && <LaptopFields />}
                            {selectedCategory === 'Camera' && <CameraFields />}

                            {/* --- Các trường chung khác --- */}
                            <div className="form-group">
                                <label>URL Hình ảnh</label>
                                <input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
                            </div>
                            <div className="form-group">
                                <label>Mô tả sản phẩm</label>
                                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} placeholder="Mô tả chi tiết về sản phẩm..."></textarea>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Giá (VND) *</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" />
                                </div>
                                <div className="form-group">
                                    <label>Số lượng tồn kho *</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" />
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onClose} className="btn-secondary">Hủy</button>
                    {step === 2 && (
                        <button type="submit" form="product-form-id" className="btn-primary">
                            {initialData ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;