// apiService.js - Helper để quản lý các API endpoints riêng lẻ

const API_BASE_URL = 'http://localhost:8080/api'; // Thay bằng URL API thực tế

// Mapping các loại sản phẩm với endpoints
const PRODUCT_ENDPOINTS = {
    'Camera': 'cameras',
    'Mirrorless': 'cameras',
    'DSLR': 'cameras',
    'Laptop': 'laptops',
    'Điện thoại': 'smartphones',
    'Phone': 'smartphones',
    'Smartphone': 'smartphones',

    // Aliases để dễ truy cập
    'cameras': 'cameras',
    'laptops': 'laptops',
    'phones': 'smartphones'
};

// Lấy endpoint phù hợp dựa trên loại sản phẩm
export const getProductEndpoint = (product) => {
    const category = product.category || product.type || product.productType;
    const endpoint = PRODUCT_ENDPOINTS[category];

    if (endpoint) {
        console.log(`📍 Product type: ${category} → API endpoint: ${endpoint}`);
        return endpoint;
    }

    console.log(`📍 Unknown product type: ${category} → Using default endpoint: cameras`);
    return 'cameras'; // Default endpoint
};

// Lấy token authentication
const getAuthToken = () => {
    return localStorage.getItem('authToken') || localStorage.getItem('accessToken');
};

// Headers mặc định cho API calls
const getHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// API Service class
export class ProductAPIService {

    // Lấy sản phẩm theo loại cụ thể
    static async getProductsByType(productType) {
        try {
            const endpoint = PRODUCT_ENDPOINTS[productType];
            if (!endpoint) {
                throw new Error(`Không hỗ trợ loại sản phẩm: ${productType}`);
            }

            const url = `${API_BASE_URL}/${endpoint}/`;

            console.log('🔄 Fetching products by type:', productType, '→', url);

            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders()
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            if (data.code === 1000 && Array.isArray(data.result)) {
                console.log(`✅ Fetched ${productType} products:`, data.result.length);
                return data.result;
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error(`❌ Error fetching ${productType} products:`, error);
            throw error;
        }
    }

    // Thêm sản phẩm mới
    static async addProduct(productData) {
        try {
            const endpoint = getProductEndpoint(productData);
            const url = `${API_BASE_URL}/${endpoint}/`;

            console.log('🔄 Adding product to:', url);
            console.log('📤 Product data:', productData);

            const response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('✅ Product added successfully:', result);
            return result;
        } catch (error) {
            console.error('❌ Error adding product:', error);
            throw error;
        }
    }

    // Cập nhật sản phẩm
    static async updateProduct(product, updateData) {
        try {
            const endpoint = getProductEndpoint(product);
            const url = `${API_BASE_URL}/${endpoint}/${product.id}`;

            console.log('🔄 Updating product:', url);
            console.log('📤 Update data:', updateData);

            const response = await fetch(url, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('✅ Product updated successfully:', result);
            return result;
        } catch (error) {
            console.error('❌ Error updating product:', error);
            throw error;
        }
    }

    // Xóa sản phẩm
    static async deleteProduct(product) {
        try {
            const endpoint = getProductEndpoint(product);
            const url = `${API_BASE_URL}/${endpoint}/${product.id}`;

            console.log('🔄 Deleting product:', url);

            const response = await fetch(url, {
                method: 'DELETE',
                headers: getHeaders()
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            console.log('✅ Product deleted successfully');
            return true;
        } catch (error) {
            console.error('❌ Error deleting product:', error);
            throw error;
        }
    }

    // Lấy tất cả cameras
    static async getAllCameras() {
        return this.getProductsByType('cameras');
    }

    // Lấy tất cả laptops
    static async getAllLaptops() {
        return this.getProductsByType('laptops');
    }

    // Lấy tất cả phones
    static async getAllPhones() {
        return this.getProductsByType('phones');
    }
}

// Export default cho dễ sử dụng
export default ProductAPIService;