//revisar por que me pide que tenga mayúscula al inicio
import { Movie } from "../../otros/SearchMulti";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
console.log("API_KEY:", API_KEY);
console.log("BASE_URL:", BASE_URL);

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "es-US",
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/week");
    // console.log("Respuesta API:", response.data);
    return response.data.results || [];
  } catch (error) {
    console.error("Error al obtener películas populares:", error);
    return [];
  }
};

export const getMulti = async (query: string): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get(`/search/multi?query=${query}`); //sin debounce se pone query
    // console.log("Respuesta API:", response.data);
    return response.data.results || [];
  } catch (error) {
    console.error("Error al obtener la petición multi:", error);
    return [];
  }
};

export const getMovieDetails = async (id: number) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`);
    // console.log("Respuesta API:", response.data);
    return response.data || {};
  } catch (error) {
    console.error("Error al obtener los detalles:", error);
    return {};
  }
};

export const getTvDetails = async (id: number) => {
  try {
    const response = await tmdbApi.get(`/tv/${id}`);
    // console.log("Respuesta API:", response.data);
    return response.data || {};
  } catch (error) {
    console.error("Error al obtener los detalles de la serie:", error);
    return {};
  }
};

export const getPersonDetails = async (id: number) => {
  try {
    const response = await tmdbApi.get(`/person/${id}`);
    // console.log("Respuesta API:", response.data);
    return response.data || {};
  } catch (error) {
    console.error("Error al obtener los detalles de la persona:", error);
    return {};
  }
};
