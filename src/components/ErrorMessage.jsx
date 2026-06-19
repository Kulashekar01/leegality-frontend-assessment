function ErrorMessage({ message }) {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center py-20 px-4 select-none">
      <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 max-w-sm text-center shadow-sm">
        <div className="w-12 h-12 bg-red-100/50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-red-800 mb-1.5 uppercase tracking-wider">
          Something went wrong
        </h3>
        <p className="text-xs text-red-600/90 leading-relaxed font-semibold">
          {message || "An error occurred. Please check your network and try again."}
        </p>
      </div>
    </div>
  );
}

export default ErrorMessage;