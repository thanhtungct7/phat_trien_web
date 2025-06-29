import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const FeaturedProducts = ({
  products,
  type,
  isLoading,
  hasError,
  onRefresh,
  className = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  title = "Featured Devices",
  subtitle = "Explore our most popular smartphones",
  viewAllLink = "/product-detail-page"
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-2">{subtitle}</p>
          </div>
          <Link to={viewAllLink}>
            <Button variant="ghost" icon="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>

        {hasError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load products</h3>
            <p className="text-red-600 mb-4">We encountered an issue while fetching the products. Please try again.</p>
            <Button 
              variant="primary" 
              icon="RefreshCw" 
              iconPosition="left" 
              onClick={onRefresh}
            >
              Refresh
            </Button>
          </div>
        ) : (
          <div className={`grid ${className} gap-6`}>
            {isLoading
              ? Array(6).fill().map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : products.map(product => (
                  <ProductCard key={product.id} product={product} type={type} />
                ))
            }
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;