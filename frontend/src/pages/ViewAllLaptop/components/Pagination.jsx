import React from "react";

import Button from "../../../components/ui/Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 py-3" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      
      <div className="flex-1 flex justify-between sm:justify-end">
        <Button
          variant="secondary"
          size="small"
          icon="ChevronLeft"
          iconPosition="left"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-3"
        >
          Previous
        </Button>
        
        <div className="hidden md:flex">
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 ${
                  currentPage === page
                    ? 'bg-primary-600 text-white' :'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <Button
          variant="secondary"
          size="small"
          icon="ChevronRight"
          iconPosition="right"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;