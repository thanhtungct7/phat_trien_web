import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TabSystem = ({ specifications, reviews }) => {
  const [activeTab, setActiveTab] = useState("specifications");

  return (
    <div className="border-t border-gray-200 mt-8">
      <div className="flex border-b border-gray-200">
        <button
          className={`py-4 px-6 text-sm font-medium focus:outline-none ${
            activeTab === "specifications"
              ? "text-primary-600 border-b-2 border-primary-600" :"text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("specifications")}
          aria-selected={activeTab === "specifications"}
          role="tab"
        >
          Specifications
        </button>
        <button
          className={`py-4 px-6 text-sm font-medium focus:outline-none ${
            activeTab === "reviews" ?"text-primary-600 border-b-2 border-primary-600" :"text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("reviews")}
          aria-selected={activeTab === "reviews"}
          role="tab"
        >
          Reviews ({reviews.length})
        </button>
      </div>

      <div className="p-6">
        {activeTab === "specifications" ? (
          <div className="space-y-8">
            {specifications.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{category.category}</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {category.items.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i} 
                      name="Star" 
                      size={18} 
                      className={i < 4 ? "text-amber-500" : "text-gray-300"} 
                      fill={i < 4 ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">Based on {reviews.length} reviews</span>
              </div>
            </div>
            
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={review.avatar}
                      alt={review.user}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{review.user}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mt-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={16} 
                          className={i < review.rating ? "text-amber-500" : "text-gray-300"} 
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <h5 className="text-sm font-medium text-gray-900 mb-1">{review.title}</h5>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
                Write a Review
                <Icon name="PenTool" size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSystem;