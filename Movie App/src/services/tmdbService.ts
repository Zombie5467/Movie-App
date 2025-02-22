// VITE_TMDB_BASE_URL= https:api.themoviedb.org/3
// VITE_TMDB_BASE_URL= https:api.themoviedb.org/3/trending/movie/week?

import axios from "axios";

// 2 constantes de le la url y la key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
console.log("API_KEY:",
API_KEY);
console.log("BASE_URL:", BASE_URL);
// Crear una instancia de axios con la url base y los parámetros de la api
const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "es-US",
    }
})
// Crear una función para obtener las películas populares
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