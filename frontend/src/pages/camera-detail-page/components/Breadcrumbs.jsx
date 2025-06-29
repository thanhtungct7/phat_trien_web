import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="mx-1 text-gray-400 flex-shrink-0" 
                />
              )}
              
              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.path} 
                  className="text-gray-600 hover:text-primary-600 hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;