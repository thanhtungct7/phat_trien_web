import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    brand,
    price,
    salePrice,
    image,
    rating,
    // specs, // Không dùng specs vì backend chưa có
    inStock
  } = product;

  // Calculate discount percentage if there's a sale price
  const discountPercentage = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Product image with badge */}
      <div className="relative">
        {salePrice && (
          <div className="absolute top-2 left-2 bg-error text-white text-xs font-bold px-2 py-1 rounded-md">
            {discountPercentage}% OFF
          </div>
        )}
        {!inStock && (
          <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded-md">
            Out of Stock
          </div>
        )}
        <Link to={`/product-detail-page?id=${id}`} className="block aspect-w-1 aspect-h-1">
          <Image
            src={image}
            alt={name}
            className="object-cover w-full h-48"
          />
        </Link>
      </div>

      {/* Product info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-gray-500">{brand}</span>
          <Link to={`/product-detail-page?id=${id}`} className="block">
            <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
        </div>

        {/* Price */}
        <div className="flex items-center mb-3">
          {salePrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">${salePrice}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">${price}</span>
          )}
          
          {/* Rating */}
          <div className="ml-auto flex items-center">
            <Icon name="Star" size={16} className="text-amber-500" />
            <span className="ml-1 text-sm text-gray-600">{rating}</span>
          </div>
        </div>

        {/* Key specs - Tạm thời comment lại để tránh lỗi */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/*
          <div className="flex items-center text-xs text-gray-600">
            <Icon name="HardDrive" size={14} className="mr-1 text-gray-400" />
            {specs.storage}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Icon name="Smartphone" size={14} className="mr-1 text-gray-400" />
            {specs.screenSize}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Icon name="Camera" size={14} className="mr-1 text-gray-400" />
            {specs.camera}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Icon name="Battery" size={14} className="mr-1 text-gray-400" />
            {specs.battery}
          </div>
          */}
        </div>

        {/* CTA Button */}
        <Link to={`/product-detail-page?id=${id}`} className="block">
          <Button
            variant={inStock ? "primary" : "secondary"}
            className="w-full"
            disabled={!inStock}
          >
            {inStock ? "View Details" : "Out of Stock"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;