import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />

        <h2 className="mt-3 font-semibold">
          {product.title}
        </h2>

        <p className="text-green-600 font-bold">
          ${product.price}
        </p>

        <p>
          ⭐ {product.rating}
        </p>

      </div>
    </Link>
  );
}

export default ProductCard;