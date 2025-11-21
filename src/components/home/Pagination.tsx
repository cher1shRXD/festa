import { useLanguage } from "../../hooks/useLanguage";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  numOfRows: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalCount, numOfRows, onPageChange }: PaginationProps) => {
  const { t } = useLanguage();
  const totalPages = Math.ceil(totalCount / numOfRows);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="mt-8 sm:mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {t.pagination.first}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {t.pagination.prev}
        </button>

        <div className="flex space-x-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-2 sm:px-4 py-1 sm:py-2 border text-xs sm:text-sm font-medium ${
                currentPage === pageNum
                  ? 'bg-[#003876] text-white border-[#003876]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {t.pagination.next}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {t.pagination.last}
        </button>
      </div>

      <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
        {t.pagination.showing(
          ((currentPage - 1) * numOfRows) + 1,
          Math.min(currentPage * numOfRows, totalCount),
          totalCount,
          currentPage,
          totalPages
        )}
      </div>
    </>
  );
};

export default Pagination;
