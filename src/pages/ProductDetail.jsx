import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

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

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full rounded-lg shadow"
        />

        <div>

          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-2xl font-semibold text-green-600 mb-4">
            ${product.price}
          </p>

          <p className="mb-3">
            ⭐ {product.rating}
          </p>

          <p className="mb-4 text-gray-700">
            {product.description}
          </p>

          <div className="space-y-2">

            <p>
              <strong>Brand:</strong>{" "}
              {product.brand}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;