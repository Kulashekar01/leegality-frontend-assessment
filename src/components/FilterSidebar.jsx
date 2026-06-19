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
}) {
  return (
    <div className="space-y-6">

      <div>
        <h3 className="font-bold mb-2">Category</h3>

        <select
        value={selectedCategory}
        onChange={(e) =>
            setSelectedCategory(e.target.value)
        }
        className="w-full border p-2 rounded"
        >
        <option value="">All Categories</option>

        {categories.map((category) => (
            <option
            key={category.slug}
            value={category.slug}
            >
            {category.name}
            </option>
        ))}
        </select>
      </div>

      <div>
        <h3 className="font-bold mb-2">Brand</h3>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">All Brands</option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-bold mb-2">Price Range</h3>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

    </div>
  );
}

export default FilterSidebar;