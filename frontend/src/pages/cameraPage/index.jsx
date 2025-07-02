import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import FeaturedProducts from "./components/FeaturedProducts";


const CameraPage = () => {
	const location = useLocation();
    const query = new URLSearchParams(location.search);
    const brand = query.get("brand");

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const fetchProducts = () => {
        setIsLoading(true);
        setHasError(false);
        let url = "/api/cameras/";
        if (brand) {
            url = `/api/cameras/brands/${brand}`;
        }
        axios.get(url)
            .then(res => {
                console.log("API response:", res.data); // Thêm dòng này
                setFeaturedProducts(Array.isArray(res.data.result) ? res.data.result : []);
            })
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [brand]);

    const handleRefresh = () => {
        fetchProducts();
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

export default CameraPage;