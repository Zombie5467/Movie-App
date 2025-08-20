import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/tmdbService";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

// Componente TrendingApp
function TrendingApp() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getTrendingMovies();
      // console.log("data trending recibida:", data);
      setMovies(data || []);
    }
    fetchMovies();
  }, []);

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

export default TrendingApp;
