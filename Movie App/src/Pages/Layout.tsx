import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../services/useDebounce";
import { getMulti } from "../services/tmdbService";
import Navbar from "../components/Navbar/Navbar";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export interface Movie {
  id: number;
  title: string;
  media_type: string;
  poster_path: string;
}

// Layout para que la Navbar se muestre en todas las páginas

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const location = useLocation(); // <-- Importante para saber en qué ruta estamos

  const handleSearchMulti = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    async function fetchSearch() {
      const data = await getMulti(debouncedQuery);
      setSearchResults(data || []);
    }

    fetchSearch();
  }, [debouncedQuery]);

  const handleButton = async () => {
    if (!searchQuery.trim()) {
      // console.log("favor ingrese texto valido");
      return;
    }

    try {
      const result = await getMulti(searchQuery);
      // console.log("botón presionado");
      setSearchResults(result);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  // 🔍 Si estamos en una ruta de detalles, no mostramos resultados
  const isDetailsPage = location.pathname.startsWith("/details");

  return (
    <>
      <Navbar debouncedQuery={handleSearchMulti} onButtonClick={handleButton} />

      {!isDetailsPage &&
        searchResults.map((multi) => (
          <Card key={multi.id} style={{ maxWidth: 500 }}>
            <Link to={`/details/${multi.media_type}/${multi.id}`}>
              <CardMedia>
                <img
                  src={`https://image.tmdb.org/t/p/w500${multi.poster_path}`}
                  alt="movie"
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h5" component="div">
                  {multi.title}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}

      <Outlet />
    </>
  );
};
