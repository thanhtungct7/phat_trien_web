// frontend/src/services/productService.js
const API_URL = "http://localhost:8080/api";

// Camera functions
export const fetchCameras = async () => {
    try {
        const response = await fetch(`${API_URL}/cameras/`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching cameras:", error);
        throw error;
    }
};

export const fetchCameraById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/cameras/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching camera ${id}:`, error);
        throw error;
    }
};

export const createCamera = async (cameraData) => {
    try {
        const response = await fetch(`${API_URL}/cameras/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cameraData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error creating camera:", error);
        throw error;
    }
};

export const updateCamera = async (id, cameraData) => {
    try {
        const response = await fetch(`${API_URL}/cameras/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cameraData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error updating camera ${id}:`, error);
        throw error;
    }
};

export const deleteCamera = async (id) => {
    try {
        const response = await fetch(`${API_URL}/cameras/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error deleting camera ${id}:`, error);
        throw error;
    }
};

export const fetchCamerasSortedByPriceAsc = async () => {
    try {
        const response = await fetch(`${API_URL}/cameras/asc`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching cameras sorted by price (ASC):", error);
        throw error;
    }
};

export const fetchCamerasSortedByPriceDesc = async () => {
    try {
        const response = await fetch(`${API_URL}/cameras/desc`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching cameras sorted by price (DESC):", error);
        throw error;
    }
};

export const fetchCamerasByPriceRange = async (minPrice, maxPrice) => {
    try {
        const response = await fetch(`${API_URL}/cameras/prices?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching cameras by price range (${minPrice}-${maxPrice}):`, error);
        throw error;
    }
};

export const fetchCamerasByBrand = async (brand) => {
    try {
        const response = await fetch(`${API_URL}/cameras/brands/${brand}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching cameras by brand ${brand}:`, error);
        throw error;
    }
};

// Phone and Laptop functions would go here when those APIs are implemented