import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.thumbnail);
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 <= 0.75;
    const ceilRating = Math.ceil(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === ceilRating && rating % 1 > 0.75) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === ceilRating && hasHalf) {
        stars.push(
          <div key={i} className="relative w-4 h-4 text-slate-200 fill-current">
            <svg className="absolute top-0 left-0 w-full h-full text-slate-200 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
              <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-slate-200 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 antialiased">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3 bg-[#334155] text-white shadow-sm border-b border-slate-700/50 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-slate-200 focus:outline-none p-2 rounded-lg hover:bg-slate-700 transition cursor-pointer"
            title="Go to list"
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              ShopSphere
            </span>
          </div>
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
          <button className="hover:text-slate-200 transition cursor-pointer">
            <div className="w-8.5 h-8.5 rounded-full bg-slate-600 flex items-center justify-center text-sm font-semibold border border-slate-500 shadow-sm transition hover:bg-slate-500">
              <svg className="w-4.5 h-4.5 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* Detail Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-8 flex flex-col">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-6 flex items-center gap-2 text-sm text-slate-500 font-semibold hover:text-slate-800 transition cursor-pointer group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to products
        </button>

        {/* Main Details Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm grid md:grid-cols-2 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col">
            <div className="relative bg-slate-50/50 border border-slate-100 rounded-2xl overflow-hidden p-6 aspect-square flex items-center justify-center shadow-inner">
              <img
                src={activeImage || product.thumbnail}
                alt={product.title}
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-2 custom-scrollbar">
                {product.images.map((img, idx) => {
                  const isActive = img === activeImage;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 shrink-0 bg-slate-50 border rounded-xl overflow-hidden p-1 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-blue-400 ${
                        isActive ? "border-2 border-blue-600 shadow-sm" : "border-slate-200"
                      }`}
                    >
                      <img src={img} alt={`${product.title} gallery thumbnail ${idx + 1}`} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Details Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand and Category Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.brand && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 uppercase tracking-wider select-none">
                    {product.brand}
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 uppercase tracking-wider select-none">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                {product.title}
              </h1>

              {/* Stars & Stock */}
              <div className="flex items-center gap-3.5 mb-5 select-none">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-slate-200">|</span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                  In Stock ({product.stock})
                </span>
              </div>

              {/* Price Panel */}
              <div className="flex items-baseline gap-3 mb-6 p-4 bg-slate-50/70 rounded-2xl border border-slate-100/50">
                <span className="text-3xl font-black text-slate-900">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-sm text-slate-400 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications Block */}
              <div className="border-t border-slate-100 pt-5 space-y-3 mb-6">
                {product.sku && (
                  <div className="grid grid-cols-3 text-xs">
                    <span className="text-slate-400 font-medium">SKU</span>
                    <span className="col-span-2 text-slate-800 font-semibold">{product.sku}</span>
                  </div>
                )}
                {product.warrantyInformation && (
                  <div className="grid grid-cols-3 text-xs">
                    <span className="text-slate-400 font-medium">Warranty</span>
                    <span className="col-span-2 text-slate-800 font-semibold">{product.warrantyInformation}</span>
                  </div>
                )}
                {product.shippingInformation && (
                  <div className="grid grid-cols-3 text-xs">
                    <span className="text-slate-400 font-medium">Shipping</span>
                    <span className="col-span-2 text-slate-800 font-semibold">{product.shippingInformation}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shopping buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/25 active:scale-98 cursor-pointer text-center">
                Add to Cart
              </button>
              <button className="flex-1 py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all active:scale-98 cursor-pointer text-center">
                Buy Now
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;