function Loader() {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center py-20 select-none">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin"></div>
      </div>
      <p className="mt-4 text-xs font-bold text-slate-400 tracking-widest uppercase animate-pulse">
        Loading...
      </p>
    </div>
  );
}

export default Loader;