import { useState, useEffect } from "react";
import useDebounce from "../Movie App/src/services/useDebounce";
import { getMulti } from "../Movie App/src/services/tmdbService";
import Navbar from "../Movie App/src/components/Navbar/Navbar";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export interface Movie {
  id: number;
  title: string;
  media_type: string; // Puede ser "movie", "tv" o "person"
  poster_path: string;
}

export function SearchMulti() {
  //Query es como se llama el texto de búsqueda SEGÚN LA API, también es lo que usaba antes de usar debounce
  const [searchQuery, setSearchQuery] = useState(""); // string, ya que es el valor del input
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // Cambiar el tipo de estado a Movie[]
  const debouncedQuery = useDebounce(searchQuery, 500); // 500ms de retraso
  //"Envolver" searchQuery en debouncedQuery para aplicar el retraso

  const handleSearchMulti = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    async function fetchSearch() {
      const data = await getMulti(debouncedQuery); // se necesita pasar searchQuery como argumento (o debouncedQuery ya que se usa debounce)
      // console.log("data multi recibida:", data);
      setSearchResults(data || []);
    }

    fetchSearch();
  }, [debouncedQuery]); // 'searchQuery' o 'debounce' se incluye como dependencia para que se actualice al cambiar = [searchQuery]

  const handleButton = async () => {
    // console.log("Buscando...", searchQuery);
    //imprimir en consola el texto de búsqueda

    if (!searchQuery.trim()) {
      console.log("favor ingrese texto valido");
      return;
    }

    try {
      const result = await getMulti(searchQuery);
      // console.log("Resultado de la búsqueda:", result);
      //imprimir en consola el resultado de la búsqueda
      console.log("botón presionado");
      setSearchResults(result);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <>
      <Navbar debouncedQuery={handleSearchMulti} onButtonClick={handleButton} />
      {/* Aquí se mostrarán los resultados de la búsqueda */}
      {searchResults.map((multi) => (
        <Card key={multi.id} style={{ maxWidth: 500 }}>
          <Link to={`/details/${multi.media_type}/${multi.id}`}>
            <CardMedia>
              <img
                src={`https://image.tmdb.org/t/p/w500${multi.poster_path}`}
                alt="movie"
              ></img>
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="div">
                {multi.title}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      ))}
    </>
  );
}

export default SearchMulti;
