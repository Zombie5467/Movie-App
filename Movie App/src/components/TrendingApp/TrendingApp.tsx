// 1 importar use useEffect y state
import { useEffect, useState } from "react";
// 2 importar getTrendingMovies
import { getTrendingMovies } from "../../services/tmdbService";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
// Definir la interfaz para describir la estructura de los objetos de película
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

// 3 crear el componente TrendingApp
function TrendingApp() {
  // 4 crear un estado "movies" para las películas
  const [movies, setMovies] = useState<Movie[]>([]);

  // 5 usar useEffect para obtener las películas trending, usando async con una función fetchMovies
  useEffect(() => {
    async function fetchMovies() {
      // 6 constante data y await getTrendingMovies
      const data = await getTrendingMovies();
      console.log("data trending recibida:", data);
      // 7 setMovies con data
      setMovies(data || []);
    }
    // 8 llamar fetchMovies en useEffect
    fetchMovies();
  }, []);

  // 9 return un div con un h1, un ul, y un map de movies, con un li y un key
  return (
    <>
      <h1>Trending Movies</h1>

      {movies.map((movie) => (
        <Card key={movie.id} style={{ maxWidth: 500 }}>
          <Link to={`/details/movie/${movie.id}`}>
            <CardMedia>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="movie"
                //   style={{ height: 300 }}
              ></img>
            </CardMedia>

            <CardContent>
              <Typography variant="h5" component="div">
                {movie.title}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      ))}
    </>
  );
}

// 10 exportar TrendingApp
export default TrendingApp;
