const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-sm rounded ${
            page === currentPage ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
