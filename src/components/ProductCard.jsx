import { Link } from "react-router-dom";

function ProductCard({ product }) {
  // Helper to render high-fidelity SVG stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 <= 0.75;
    const ceilRating = Math.ceil(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        // Full Star
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === ceilRating && rating % 1 > 0.75) {
        // Almost full star -> Full star
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === ceilRating && hasHalf) {
        // Half Star
        stars.push(
          <div key={i} className="relative w-3.5 h-3.5 text-slate-200 fill-current">
            <svg className="absolute top-0 left-0 w-full h-full text-slate-200 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
              <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '14px' }}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        );
      } else {
        // Empty Star
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-slate-200 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
        {/* Product Image Wrapper */}
        <div className="relative w-full h-44 bg-slate-50/40 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-2 border border-slate-100/50">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
          {product.discountPercentage > 12 && (
            <span className="absolute top-2.5 left-2.5 bg-red-500/90 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm select-none">
              Sale
            </span>
          )}
        </div>

        {/* Brand Label (Optional) */}
        {product.brand && (
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block select-none">
            {product.brand}
          </span>
        )}

        {/* Product Title */}
        <h2 className="text-slate-800 font-bold text-sm group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-1">
          {product.title}
        </h2>

        {/* Price & Star Rating Row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
          <span className="text-slate-900 font-extrabold text-base">
            ${product.price}
          </span>
          <div className="flex items-center gap-1.5" title={`${product.rating} stars`}>
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-[11px] text-slate-400 font-bold ml-0.5 select-none">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;