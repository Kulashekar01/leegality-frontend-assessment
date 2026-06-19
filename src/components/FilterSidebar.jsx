import { useEffect, useState } from "react";

function FilterSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  setSelectedCategory,
  setSelectedBrand,
  setMinPrice,
  setMaxPrice,
  searchQuery,
  setSearchQuery,
}) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setLocalMax(maxPrice);
  }, [maxPrice]);

  const handleApply = () => {
    setMinPrice(localMin);
    setMaxPrice(localMax);
  };

  const handleClearPrices = () => {
    setLocalMin("");
    setLocalMax("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="space-y-6 select-none">
      {/* Title */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h3 className="font-bold text-slate-800 text-base">Filters</h3>
      </div>

      {/* Sidebar Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
        />
      </div>

      {/* Categories Checklist */}
      <div>
        <h4 className="font-semibold text-slate-700 text-sm mb-3">Categories</h4>
        <div className="max-h-48 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
          {categories.map((cat) => {
            const isChecked = selectedCategory === cat.slug;
            return (
              <label key={cat.slug} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setSelectedCategory(isChecked ? "" : cat.slug)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                />
                <span className={isChecked ? "font-medium text-slate-900" : ""}>{cat.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Fields */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-slate-700 text-sm">Price Range</h4>
          {(minPrice || maxPrice) && (
            <button
              onClick={handleClearPrices}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 px-3 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
          />
          <span className="text-slate-400 text-xs">to</span>
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 px-3 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
          />
        </div>
        <button
          onClick={handleApply}
          className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          Apply
        </button>
      </div>

      {/* Brands Checklist */}
      <div>
        <h4 className="font-semibold text-slate-700 text-sm mb-3">Brands</h4>
        <div className="max-h-48 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
          {brands.map((brand) => {
            const isChecked = selectedBrand === brand;
            return (
              <label key={brand} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setSelectedBrand(isChecked ? "" : brand)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                />
                <span className={isChecked ? "font-medium text-slate-900" : ""}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;