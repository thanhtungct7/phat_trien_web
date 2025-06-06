import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import FeaturedProducts from "../laptopPage/components/FeaturedProducts";

const laptopFeaturedProducts = [
	{
		id: "macbook-air-m2-2024",
		name: "Apple Macbook Air M2 2024",
		price: 1299.99,
		image: "/assets/images/Laptops/Apple Macbook Air M2 2024.webp",
		rating: 4.9,
		reviews: 320,
		discount: 8,
		isNew: true,
		specs: {
			storage: "512GB SSD",
			cpu: "Apple M2",
			display: "13.6-inch Retina",
		},
	},
	{
		id: "asus-vivobook-15-x1504va-bq2076w",
		name: "Laptop Asus VivoBook 15 X1504VA-BQ2076W",
		price: 799.99,
		image: "/assets/images/Laptops/Laptop Asus VivoBook 15 X1504VA-BQ2076W.webp",
		rating: 4.7,
		reviews: 210,
		discount: 12,
		isNew: false,
		specs: {
			storage: "512GB SSD",
			cpu: "Intel Core i5",
			display: "15.6-inch FHD",
		},
	},
	{
		id: "asus-vivobook-s-16-oled-s5606ma-mx051w",
		name: "Laptop Asus VivoBook S 16 OLED S5606MA-MX051W",
		price: 1099.99,
		image: "/assets/images/Laptops/Laptop Asus VivoBook S 16 OLED S5606MA-MX051W.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "1TB SSD",
			cpu: "Intel Core i7",
			display: "16-inch OLED",
		},
	},
	{
		id: "acer-nitro-v-avn15-51-57b2",
		name: "Laptop Gaming Acer Nitro V AVN15-51-57B2",
		price: 1099.99,
		image: "/assets/images/Laptops/Laptop Gaming Acer Nitro V AVN15-51-57B2.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "512GB SSD",
			cpu: "Intel Core i5-13420H",
			display: "15.6-inch FULL HD",
		},
	},
	{
		id: "hp-15-fc0086au",
		name: "Laptop Hp 15-FC0086AU",
		price: 1099.99,
		image: "/assets/images/Laptops/Laptop Hp 15-FC0086AU.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "512GB SSD",
			cpu: "R5-7430U",
			display: "15.6-inch FULL HD",
		},
	},
	{
		id: "hp-gaming-victus-15-fa1139tx-8y6w3pa",
		name: "Laptop HP Gaming Victus 15-FA1139TX 8Y6W3PA",
		price: 1099.99,
		image: "/assets/images/Laptops/Laptop HP Gaming Victus 15-FA1139TX 8Y6W3PA.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "512GB SSD",
			cpu: "Intel Core i5-12450H",
			display: "15.6-inch FULL HD",
		},
	},
	{
		id: "lenovo-ideapad-slim-3-14irh10-83l00008vn",
		name: "Laptop Lenovo IdeaPad Slim 3 14IRH10 83L00008VN",
		price: 1099.99,
		image: "/assets/images/Laptops/Laptop Lenovo IdeaPad Slim 3 14IRH10 83L00008VN.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "512GB SSD",
			cpu: "Intel Core i5-13420H",
			display: "14-inch WUXGA",
		},
	},
	{
		id: "msi-modern-14-c12mo-660vn",
		name: "Laptop MSI Modern 14 C12MO-660VN",
		price: 1099.99,
		image: "/assets/images/Laptops/Laptop MSI Modern 14 C12MO-660VN.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "512GB SSD",
			cpu: "Intel Core i5-1235U",
			display: "14-inch FULL HD",
		},
	},
	{
		id: "asus-gaming-vivobook-k3605zc-rp564w",
		name: "Latop Asus Gaming VivoBook K3605ZC-RP564W",
		price: 1099.99,
		image: "/assets/images/Laptops/Latop Asus Gaming VivoBook K3605ZC-RP564W.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "512GB SSD",
			cpu: "Intel Core i5-12500H",
			display: "16-inch WUXGA",
		},
	},
	{
		id: "macbook-air-m4-13-inch-2025",
		name: "MacBook Air M4 13 inch 2025",
		price: 1099.99,
		image: "/assets/images/Laptops/MacBook Air M4 13 inch 2025.webp",
		rating: 4.8,
		reviews: 180,
		discount: 10,
		isNew: true,
		specs: {
			storage: "256GB SSD",
			cpu: "Apple M4",
			display: "13.6-inch 2.5K",
		},
	},
];

const LaptopPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [featuredProducts, setFeaturedProducts] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setFeaturedProducts(laptopFeaturedProducts);
			setIsLoading(false);
		}, 1000);
	}, []);

	const handleRefresh = () => {
		setIsLoading(true);
		setHasError(false);
		setTimeout(() => {
			setFeaturedProducts(laptopFeaturedProducts);
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

export default LaptopPage;