import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export const getAllProducts = async () => {
  const response = await axios.get(
    "https://dummyjson.com/products?limit=0"
  );

  return response.data.products;
};

export const getProducts = async (limit = 12, skip = 0) => {
  const response = await axios.get(
    `${BASE_URL}?limit=${limit}&skip=${skip}`
  );

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(
    `${BASE_URL}/categories`
  );

  return response.data;
};