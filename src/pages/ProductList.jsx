import { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function ProductList() {

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const productsData =
        await getAllProducts();

      const categoriesData =
        await getCategories();

      setAllProducts(productsData);
      setCategories(categoriesData);

      const uniqueBrands = [
        ...new Set(
          productsData
            .map((p) => p.brand)
            .filter(Boolean)
        ),
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

  const filteredProducts =
  allProducts.filter((product) => {

    const categoryMatch =
      !selectedCategory ||
      product.category === selectedCategory;

    const brandMatch =
      !selectedBrand ||
      product.brand === selectedBrand;

    const minMatch =
      !minPrice ||
      product.price >= Number(minPrice);

    const maxMatch =
      !maxPrice ||
      product.price <= Number(maxPrice);

    return (
      categoryMatch &&
      brandMatch &&
      minMatch &&
      maxMatch
    );
  });

  return (
    <div className="grid grid-cols-12 gap-6">

    <div className="col-span-12 md:col-span-3">
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
      />
    </div>

  <div className="col-span-12 md:col-span-9">

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </div>

  </div>

</div>
  );
}

export default ProductList;