
import axios from "axios";
// import { UseDebounce } from "./useDebounce";
//revisar por que me pide que tenga mayúscula al inicio

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


// Crear una función para obtener la petición multi
// PENDIENTE: falta hacer que esta función tome como "query" el parámetro que se le pase en la búsqueda
export const getMulti = async ( query: string) => {
    // debe recibir como parámetro el texto de búsqueda (`query`). 
    // const debounceValue = UseDebounce(query, 500); 
    try {
        const response = await tmdbApi.get(`/search/multi?query=${query}`); //sin debounce se pone query
        // console.log("Respuesta API:", response.data);
        return response.data.results || [];
    } catch (error) {
        console.error("Error al obtener la petición multi:", error);
        return [];
    }
}



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