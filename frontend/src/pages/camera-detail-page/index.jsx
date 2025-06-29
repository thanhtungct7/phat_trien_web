import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import TabSystem from "./components/TabSystem";
import Breadcrumbs from "./components/Breadcrumbs";
import SkeletonLoader from "./components/SkeletonLoader";
import AddToCartModal from "./components/AddToCartModal";

const CameraDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy sản phẩm.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios.get(`/api/cameras/${id}`)
      .then(res => {
        setProduct(res.data.result);
        setError(null);
      })
      .catch(() => {
        setError("Không tìm thấy sản phẩm.");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => setShowModal(true);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    axios.get(`/api/cameras/${id}`)
      .then(res => {
        setProduct(res.data.result);
        setError(null);
      })
      .catch(() => {
        setError("Không tìm thấy sản phẩm.");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  };

  const handleQuantityChange = (newQuantity) => setQuantity(newQuantity);

  const breadcrumbItems = [
    { name: "Home", path: "/homepage" },
    { name: "Cameras", path: "/cameras" },
    { name: product?.name || "Product", path: "" },
  ];

  // Chuẩn hóa dữ liệu cho UI
  const getProductImages = () => {
    if (product?.images && Array.isArray(product.images)) return product.images;
    if (product?.image) return [{ id: 1, src: product.image, alt: product.name }];
    return [];
  };

  const getSpecifications = () => [
    { category: "Thông số chính", items: [
      { name: "Độ phân giải", value: product?.resolution },
      { name: "Kết nối Wifi", value: product?.wifiConnect },
      { name: "Lưu trữ", value: product?.storage }
    ] }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8" id="main-content">
        <Breadcrumbs items={breadcrumbItems} />
        {loading ? (
          <SkeletonLoader />
        ) : error && !loading ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                <Icon name="AlertTriangle" size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load product</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button 
                variant="primary" 
                onClick={handleRetry}
                icon="RefreshCw"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              <ImageGallery images={getProductImages()} />
              <ProductInfo 
                product={product} 
                onAddToCart={handleAddToCart} 
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
              />
            </div>
            <TabSystem 
              specifications={getSpecifications()} 
              reviews={product?.reviews || []} 
            />
          </div>
        )}
      </main>
      <Footer variant="compact" />
      {showModal && (
        <AddToCartModal 
          product={product}
          quantity={quantity}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CameraDetailPage;
