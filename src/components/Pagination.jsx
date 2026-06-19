function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10 py-4 select-none">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-semibold bg-white hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:cursor-not-allowed transition cursor-pointer shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Previous
      </button>

      <span className="text-sm font-semibold text-slate-500 bg-slate-100/60 px-3.5 py-1.5 rounded-lg border border-slate-200/40">
        Page <span className="text-slate-800 font-extrabold">{currentPage}</span> of <span className="text-slate-800 font-extrabold">{totalPages}</span>
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-semibold bg-white hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:cursor-not-allowed transition cursor-pointer shadow-sm"
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
