// 1 importar use useEffect y state
import { useEffect, useState } from "react";
// 2 importar getTrendingMovies
import { getTrendingMovies } from "../../services/tmdbService";
// Definir la interfaz para describir la estructura de los objetos de película
interface Movie {
    id: number;
    title: string;
}

// 3 crear el componente TrendingApp
function TrendingApp() {
    // 4 crear un estado para las películas movies
    const  [movies, setMovies] = useState<Movie[]>([]);

    // 5 usar useEffect para obtener las películas trending, usando async con una función fetchMovies
    useEffect(() =>{
        async function fetchMovies() {
            // 6 constante data y await getTrendingMovies
            const data = await getTrendingMovies();
            console.log('data recibida:', data);
            // 7 setMovies con data
            setMovies(data || []);
        }
        // 8 llamar fetchMovies en useEffect
        fetchMovies();
    }, []);

    // 9 return un div con un h1, un ul, y un map de movies, con un li y un key
    return (
        <div>
            <h1>Trending Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

// 10 exportar TrendingApp
export default TrendingApp;
