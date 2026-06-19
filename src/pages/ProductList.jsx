import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("min") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("max") || ""
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const PRODUCTS_PER_PAGE = 8; // Showing 8 products per page like in mockups

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, minPrice, maxPrice, searchQuery]);

  useEffect(() => {
    const params = {};

    if (selectedCategory) params.category = selectedCategory;
    if (selectedBrand) params.brand = selectedBrand;
    if (minPrice) params.min = minPrice;
    if (maxPrice) params.max = maxPrice;
    if (searchQuery) params.search = searchQuery;
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params);
  }, [
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    searchQuery,
    currentPage,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getAllProducts();
      const categoriesData = await getCategories();

      setAllProducts(productsData);
      setCategories(categoriesData);

      const uniqueBrands = [
        ...new Set(productsData.map((p) => p.brand).filter(Boolean)),
      ];
      setBrands(uniqueBrands);
    } catch (error) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch =
      !selectedCategory || product.category === selectedCategory;

    const brandMatch = !selectedBrand || product.brand === selectedBrand;

    const minMatch = !minPrice || product.price >= Number(minPrice);

    const maxMatch = !maxPrice || product.price <= Number(maxPrice);

    const searchMatch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && brandMatch && minMatch && maxMatch && searchMatch;
  });

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 antialiased">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3 bg-[#334155] text-white shadow-sm border-b border-slate-700/50 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-white hover:text-slate-200 focus:outline-none p-2 rounded-lg hover:bg-slate-700 transition cursor-pointer"
            aria-label="Toggle filters sidebar"
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent hidden sm:block">
              ShopSphere
            </span>
          </div>
        </div>

        {/* Search Input in Navbar */}
        <div className="relative flex-1 max-w-xl mx-4 md:mx-10">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f8fafc] text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition shadow-inner border border-slate-300/40"
          />
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3.5 md:gap-5">
          <button className="hover:text-slate-200 transition cursor-pointer relative p-1 rounded-lg hover:bg-slate-700" title="Shopping Cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#334155]">
              3
            </span>
          </button>
          <button className="hover:text-slate-200 transition cursor-pointer p-1 rounded-lg hover:bg-slate-700" title="History">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="hover:text-slate-200 transition cursor-pointer" title="Profile Account">
            <div className="w-8.5 h-8.5 rounded-full bg-slate-600 flex items-center justify-center text-sm font-semibold border border-slate-500 shadow-sm transition hover:bg-slate-500">
              <svg className="w-4.5 h-4.5 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* Content Wrapper */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Responsive Sidebar for Filters */}
        {showSidebar && (
          <aside className="w-full lg:w-72 shrink-0 animate-in fade-in slide-in-from-left duration-200 self-start">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-fit">
              <FilterSidebar
                categories={categories}
                brands={brands}
                selectedCategory={selectedCategory}
                selectedBrand={selectedBrand}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setSelectedCategory={setSelectedCategory}
                setSelectedBrand={setSelectedBrand}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </aside>
        )}

        {/* Main Products Listing Grid & Pagination */}
        <main className="flex-1 w-full flex flex-col">
          {filteredProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[450px]">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 text-slate-400 mb-4 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
              <p className="text-slate-500 text-sm max-w-sm px-4">
                We couldn't find any products matching your filters. Try search term or adjustments.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedBrand("");
                  setMinPrice("");
                  setMaxPrice("");
                  setSearchQuery("");
                }}
                className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Product Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>

      </div>
    </div>
  );
}

export default ProductList;

