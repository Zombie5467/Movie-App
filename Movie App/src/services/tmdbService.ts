// import { UseDebounce } from "./useDebounce";
//revisar por que me pide que tenga mayúscula al inicio
import { Movie } from "../../../otros/SearchMulti";
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
    console.log("Respuesta API:", response.data);
    return response.data || {};
  } catch (error) {
    console.error("Error al obtener los detalles:", error);
    return {};
  }
};

export const getTvDetails = async (id: number) => {
  try {
    const response = await tmdbApi.get(`/tv/${id}`);
    console.log("Respuesta API:", response.data);
    return response.data || {};
  } catch (error) {
    console.error("Error al obtener los detalles de la serie:", error);
    return {};
  }
};

export const getPersonDetails = async (id: number) => {
  try {
    const response = await tmdbApi.get(`/person/${id}`);
    console.log("Respuesta API:", response.data);
    return response.data || {};
  } catch (error) {
    console.error("Error al obtener los detalles de la persona:", error);
    return {};
  }
};

// 2 constantes de le la url y la key
// Crear una instancia de axios con la url base y los parámetros de la api
// Crear una función para obtener las películas populares
// Crear una función para obtener la petición multi
// PENDIENTE: falta hacer que esta función tome como "query" el parámetro que se le pase en la búsqueda
 // debe recibir como parámetro el texto de búsqueda (`query`).
  // const debounceValue = UseDebounce(query, 500);
// Version de copilot

// export const getMultiSearch = async (query: string) => {
//     try {
//         const response = await tmdbApi.get("/search/multi", {
//             params: {
//                 query,
//             },
//         });
//         return response.data.results || [];
//     } catch (error) {
//         console.error("Error al obtener la búsqueda multi:", error);
//         return [];
//     }
// };

// Crear una función para obtener los detalles de una película o película trending
// Esta función recibe un id de película y devuelve los detalles de esa película sea trending o una búsqueda