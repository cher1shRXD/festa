interface PaginationProps {
  currentPage: number;
  totalCount: number;
  numOfRows: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalCount, numOfRows, onPageChange }: PaginationProps) => {
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
      <div className="mt-12 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          처음
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          이전
        </button>

        <div className="flex space-x-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 border text-sm font-medium ${
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
          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          다음
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          마지막
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        전체 {totalCount}개 중 {((currentPage - 1) * numOfRows) + 1}~{Math.min(currentPage * numOfRows, totalCount)}개 표시 (페이지 {currentPage}/{totalPages})
      </div>
    </>
  );
};

export default Pagination;
