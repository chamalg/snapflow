import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get("/favorites");
  return response.data;
};

export const addFavorite = async (id: number) => {
  const response = await api.post("/favorites", { id });
  return response.data;
};

export const removeFavorite = async (id: number) => {
  const response = await api.delete(`/favorites/${id}`);
  return response.data;
};
