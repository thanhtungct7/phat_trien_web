import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import FeaturedProducts from "../laptopPage/components/FeaturedProducts";

const cameraFeaturedProducts = [
	{
		id: "camera-imou-ipc-a32e-khong-day-3mp_2",
		name: "Camera Imou IPC-A32E Không Dây 3MP",
		price: 899,
		image: "/assets/images/Cameras/camera-imou-ipc-a32e-khong-day-3mp_2.webp",
		rating: 4.8,
		reviews: 120,
		discount: 10,
		isNew: true,
		specs: {
			resolution: "3MP",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 256GB",
		},
	},
	{
		id: "camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro",
		name: "Camera IP Hồng Ngoại Không Dây 5MP EZVIZ H6C Pro",
		price: 129,
		image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro.webp",
		rating: 4.7,
		reviews: 98,
		discount: 12,
		isNew: false,
		specs: {
			resolution: "5MP",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 512GB",
		},
	},
	{
		id: "camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p",
		name: "Camera IP Hồng Ngoại Không Dây 5MP Imou IPC-A52P",
		price: 135,
		image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p.webp",
		rating: 4.9,
		reviews: 150,
		discount: 15,
		isNew: true,
		specs: {
			resolution: "5MP",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 256GB",
		},
	},
	{
		id: "camera-ip-hong-ngoai-khong-day-ezviz-c6n-3mp_3_",
		name: "Camera IP Hồng Ngoại Không Dây EZVIZ C6N 3MP",
		price: 990,
		image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-ezviz-c6n-3mp_3_.webp",
		rating: 4.6,
		reviews: 110,
		discount: 8,
		isNew: false,
		specs: {
			resolution: "3MP",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 256GB",
		},
	},
	{
		id: "camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_",
		name: "Camera IP Ngoài Trời Wifi 365 Selection OC1 2K",
		price: 149,
		image: "/assets/images/Cameras/camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_.webp",
		rating: 4.7,
		reviews: 90,
		discount: 10,
		isNew: true,
		specs: {
			resolution: "2K",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 128GB",
		},
	},
	{
		id: "camera-ip-wifi-2k-365-selection-c1.1",
		name: "Camera IP Wifi 2K 365 Selection C1.1",
		price: 119,
		image: "/assets/images/Cameras/camera-ip-wifi-2k-365-selection-c1.1.webp",
		rating: 4.5,
		reviews: 80,
		discount: 7,
		isNew: false,
		specs: {
			resolution: "2K",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 128GB",
		},
	},
	{
		id: "camera-ip-wifi-3k-365-selection-c2_5_",
		name: "Camera IP Wifi 3K 365 Selection C2",
		price: 159,
		image: "/assets/images/Cameras/camera-ip-wifi-3k-365-selection-c2_5_.webp",
		rating: 4.8,
		reviews: 105,
		discount: 11,
		isNew: true,
		specs: {
			resolution: "3K",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 256GB",
		},
	},
	{
		id: "camera-ip-wifi-4mp-imou-ipc-a43.1",
		name: "Camera IP Wifi 4MP Imou IPC-A43.1",
		price: 125,
		image: "/assets/images/Cameras/camera-ip-wifi-4mp-imou-ipc-a43.1.webp",
		rating: 4.7,
		reviews: 92,
		discount: 9,
		isNew: false,
		specs: {
			resolution: "4MP",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 256GB",
		},
	},
	{
		id: "camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi",
		name: "Camera IP Wifi AI Reoqoo XT-X31B 2.5K Ngoài Trời",
		price: 169,
		image: "/assets/images/Cameras/camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi.webp",
		rating: 4.9,
		reviews: 130,
		discount: 13,
		isNew: true,
		specs: {
			resolution: "2.5K",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 256GB",
		},
	},
	{
		id: "camera-ip-wifi-imou-ipc-a23p",
		name: "Camera IP Wifi Imou IPC-A23P",
		price: 105,
		image: "/assets/images/Cameras/camera-ip-wifi-imou-ipc-a23p.webp",
		rating: 4.6,
		reviews: 85,
		discount: 8,
		isNew: false,
		specs: {
			resolution: "2MP",
			connection: "WiFi",
			nightVision: "Có",
			storage: "Hỗ trợ thẻ nhớ 128GB",
		},
	},
];

const CameraPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [featuredProducts, setFeaturedProducts] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setFeaturedProducts(cameraFeaturedProducts);
			setIsLoading(false);
		}, 1000);
	}, []);

	const handleRefresh = () => {
		setIsLoading(true);
		setHasError(false);
		setTimeout(() => {
			setFeaturedProducts(cameraFeaturedProducts);
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

export default CameraPage;