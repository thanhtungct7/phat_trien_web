import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProductCard = ({ product }) => {
  const {
    id,
    brand,
    description,
    image,
    name,
    price,
    stock,
    yearOfManufacture,
    chipset,
    cpuCores,
    gpuCores,
    resolution,
    screenSize,
    rating,
    reviews,
    discount,
    isNew
  } = product;

  const discountedPrice = discount ? price - (price * discount / 100) : price;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md flex flex-col h-full">
      <div className="relative">
        <Link to={`/product-detail-page?id=${id}`}>
          <div className="h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-36 object-contain bg-white rounded-t-lg mx-auto"
            />
          </div>
        </Link>
        {isNew && (
          <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-error text-white text-xs font-bold px-2 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product-detail-page?id=${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </Link>
        <div className="text-xs text-gray-500 mb-2">{description}</div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Factory" size={12} className="mr-1" />
            Hãng: {brand}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Calendar" size={12} className="mr-1" />
            Năm SX: {yearOfManufacture}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Cpu" size={12} className="mr-1" />
            Chip: {chipset}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Cpu" size={12} className="mr-1" />
            Số nhân CPU: {cpuCores}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Gpu" size={12} className="mr-1" />
            Số nhân GPU: {gpuCores}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Monitor" size={12} className="mr-1" />
            Độ phân giải: {resolution}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Smartphone" size={12} className="mr-1" />
            Kích thước màn: {screenSize}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
            <Icon name="Box" size={12} className="mr-1" />
            Tồn kho: {stock}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex items-center text-amber-500 mr-2">
            <Icon name="Star" size={16} className="fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            {discount > 0 ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
        <Link to={`/product-detail-page?id=${id}`} className="block mt-auto">
          <Button 
            variant="primary" 
            className="w-full"
            icon="Eye"
            iconPosition="left"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;