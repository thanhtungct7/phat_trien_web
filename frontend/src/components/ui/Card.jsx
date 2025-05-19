import React from 'react';
import Button from './Button';
import Image from '../../components/AppImage';

const Card = ({
  variant = 'product',
  title,
  subtitle,
  description,
  image,
  imageAlt,
  price,
  salePrice,
  rating,
  features,
  ctaText,
  ctaLink,
  onCtaClick,
  badge,
  badgeColor = 'primary',
  className = '',
  planDetails,
  planPrice,
  planPeriod,
  planFeatures,
  comparisonItems,
  comparisonFeatures,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm overflow-hidden';
  
  const badgeClasses = {
    primary: 'bg-primary-600 text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
    info: 'bg-info text-white',
  };

  const renderProductCard = () => (
    <div className={`${baseClasses} ${className}`} {...props}>
      <div className="relative">
        {badge && (
          <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-md ${badgeClasses[badgeColor]}`}>
            {badge}
          </span>
        )}
        <div className="aspect-w-1 aspect-h-1">
          <Image 
            src={image} 
            alt={imageAlt || title} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {salePrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">${salePrice}</span>
                <span className="ml-2 text-sm text-gray-400 line-through">${price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">${price}</span>
            )}
          </div>
          {rating && (
            <div className="flex items-center">
              <span className="text-amber-500">★</span>
              <span className="ml-1 text-sm text-gray-600">{rating}</span>
            </div>
          )}
        </div>
        {ctaText && (
          <div className="mt-4">
            <Button 
              variant="primary" 
              size="medium" 
              className="w-full"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderFeatureCard = () => (
    <div className={`${baseClasses} ${className}`} {...props}>
      {image && (
        <div className="aspect-w-16 aspect-h-9">
          <Image 
            src={image} 
            alt={imageAlt || title} 
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-6">
        {badge && (
          <span className={`inline-block px-2 py-1 mb-3 text-xs font-medium rounded-md ${badgeClasses[badgeColor]}`}>
            {badge}
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm font-medium text-gray-600">{subtitle}</p>}
        {description && <p className="mt-3 text-gray-600">{description}</p>}
        {features && features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 text-primary-600">✓</span>
                <span className="ml-2 text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        {ctaText && (
          <div className="mt-6">
            <Button 
              variant="primary" 
              size="medium"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderPlanCard = () => (
    <div className={`${baseClasses} ${className}`} {...props}>
      <div className="p-6">
        {badge && (
          <span className={`inline-block px-2 py-1 mb-3 text-xs font-medium rounded-md ${badgeClasses[badgeColor]}`}>
            {badge}
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm font-medium text-gray-600">{subtitle}</p>}
        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">${planPrice}</span>
          {planPeriod && <span className="text-gray-600">/{planPeriod}</span>}
        </div>
        {description && <p className="mt-3 text-gray-600">{description}</p>}
        {planFeatures && planFeatures.length > 0 && (
          <ul className="mt-6 space-y-3">
            {planFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 text-primary-600">✓</span>
                <span className="ml-2 text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        {ctaText && (
          <div className="mt-8">
            <Button 
              variant="primary" 
              size="medium" 
              className="w-full"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderComparisonCard = () => (
    <div className={`${baseClasses} ${className}`} {...props}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm font-medium text-gray-600">{subtitle}</p>}
        
        <div className="mt-6 space-y-6">
          {comparisonFeatures && comparisonFeatures.map((feature, index) => (
            <div key={index}>
              <h4 className="text-sm font-medium text-gray-900">{feature.name}</h4>
              <div className="mt-2 space-y-2">
                {comparisonItems && comparisonItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.features[index].value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {ctaText && (
          <div className="mt-8">
            <Button 
              variant="primary" 
              size="medium" 
              className="w-full"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  switch (variant) {
    case 'feature':
      return renderFeatureCard();
    case 'plan':
      return renderPlanCard();
    case 'comparison':
      return renderComparisonCard();
    case 'product':
    default:
      return renderProductCard();
  }
};

export default Card;