import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import FeaturedProducts from "../phonePage/components/FeaturedProducts";

const phoneFeaturedProducts = [
    {
        id: "iphone-15-pro-max",
        name: "Apple iPhone 15 Pro Max",
        price: 1199.99,
        image: "/assets/images/Phones/Apple iPhone 15 Pro Max.webp", 
        rating: 4.9,
        reviews: 450,
        discount: 10,
        isNew: true,
        specs: {
            storage: "256GB",
            chip: "Apple A17 Bionic",
            display: "6.7-inch Super Retina XDR",
            camera: "48MP Chính",
        },
    },
    {
        id: "samsung-galaxy-s24-ultra",
        name: "Samsung Galaxy S24 Ultra",
        price: 1299.99,
        image: "/assets/images/Phones/Samsung Galaxy S24 Ultra.webp", 
        rating: 4.8,
        reviews: 380,
        discount: 15,
        isNew: true,
        specs: {
            storage: "512GB",
            chip: "Snapdragon 8 Gen 3 for Galaxy",
            display: "6.8-inch Dynamic AMOLED 2X",
            camera: "200MP Chính",
        },
    },
    {
        id: "google-pixel-8-pro",
        name: "Google Pixel 8 Pro",
        price: 999.99,
        image: "/assets/images/Phones/Google Pixel 8 Pro.webp", 
        rating: 4.7,
        reviews: 310,
        discount: 5,
        isNew: false,
        specs: {
            storage: "128GB",
            chip: "Google Tensor G3",
            display: "6.7-inch OLED",
            camera: "50MP Chính",
        },
    },
    {
        id: "xiaomi-14-ultra",
        name: "Xiaomi 14 Ultra",
        price: 1099.00,
        image: "/assets/images/Phones/Xiaomi 14 Ultra.webp",
        rating: 4.8,
        reviews: 250,
        discount: 8,
        isNew: true,
        specs: {
            storage: "512GB",
            chip: "Snapdragon 8 Gen 3",
            display: "6.73-inch AMOLED",
            camera: "50MP Leica Chính",
        },
    },
    {
        id: "oppo-find-x7-ultra",
        name: "Oppo Find X7 Ultra",
        price: 1150.00,
        image: "/assets/images/Phones/Oppo Find X7 Ultra.webp",
        rating: 4.7,
        reviews: 190,
        discount: 0,
        isNew: true,
        specs: {
            storage: "256GB",
            chip: "Snapdragon 8 Gen 3",
            display: "6.82-inch AMOLED LTPO",
            camera: "50MP Hasselblad Chính",
        },
    },
    {
        id: "samsung-galaxy-z-fold-5",
        name: "Samsung Galaxy Z Fold 5",
        price: 1799.99,
        image: "/assets/images/Phones/Samsung Galaxy Z Fold 5.webp",
        rating: 4.6,
        reviews: 220,
        discount: 12,
        isNew: false,
        specs: {
            storage: "512GB",
            chip: "Snapdragon 8 Gen 2 for Galaxy",
            display: "7.6-inch Gập & 6.2-inch Phụ",
            camera: "50MP Chính",
        },
    },
    {
        id: "iphone-15",
        name: "Apple iPhone 15",
        price: 799.99,
        image: "/assets/images/Phones/Apple iPhone 15.webp",
        rating: 4.7,
        reviews: 350,
        discount: 5,
        isNew: true,
        specs: {
            storage: "128GB",
            chip: "Apple A16 Bionic",
            display: "6.1-inch Super Retina XDR",
            camera: "48MP Chính",
        },
    },
    {
        id: "nothing-phone-2",
        name: "Nothing Phone (2)",
        price: 699.00,
        image: "/assets/images/Phones/Nothing Phone 2.webp",
        rating: 4.5,
        reviews: 150,
        discount: 3,
        isNew: false,
        specs: {
            storage: "256GB",
            chip: "Snapdragon 8+ Gen 1",
            display: "6.7-inch OLED LTPO",
            camera: "50MP Chính",
        },
    },
];

const PhonePage = () => { 
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        // Mô phỏng việc tải dữ liệu
        setTimeout(() => {
            setFeaturedProducts(phoneFeaturedProducts); // Sử dụng danh sách sản phẩm điện thoại
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setHasError(false);
        // Mô phỏng việc tải lại dữ liệu
        setTimeout(() => {
            setFeaturedProducts(phoneFeaturedProducts); // Sử dụng danh sách sản phẩm điện thoại
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header variant="default" />
            <main className="flex-grow" id="main-content">
                <FeaturedProducts
                    products={featuredProducts}
                    isLoading={isLoading}
                    hasError={hasError}
                    onRefresh={handleRefresh}
                    className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5" 
                />
            </main>
            <Footer variant="compact" />
        </div>
    );
};

export default PhonePage; 