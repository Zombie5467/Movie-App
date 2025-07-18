import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../services/useDebounce";
import { getMulti } from "../services/tmdbService";
import Navbar from "../components/Navbar/Navbar";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export interface Movie {
  id: number;
  title: string;
  media_type: string; // Puede ser "movie", "tv" o "person"
  poster_path: string;
}



export const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const debouncedQuery = useDebounce(searchQuery, 500); // 500ms de retraso

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
      <Outlet />
    </>
  );
};

// Layout para que la Navbar se muestre en todas las páginas
//Query es como se llama el texto de búsqueda SEGÚN LA API, también es lo que usaba antes de usar debounce
// string, ya que es el valor del input
// Cambiar el tipo de estado a Movie[]
//"Envolver" searchQuery en debouncedQuery para aplicar el retraso
// se necesita pasar searchQuery como argumento (o debouncedQuery ya que se usa debounce)
// console.log("data multi recibida:", data);
// 'searchQuery' o 'debounce' se incluye como dependencia para que se actualice al cambiar = [searchQuery]
{
  /* Al parecer este onButtonClick si funciona, para ver los detalles */
}
{
  /* Aquí se mostrarán los resultados de la búsqueda */
}

// NOTA SUPER IMPORTANTE ANTES DE HACER CUALQUIER COSA REVISA A QUE BRANCH ESTA YENDO TODO ESTO, ES POSIBLE QUE LA LOCAL SEA
// router-details pero la remota sea main, creo que hice un merge.

// Dos posibles formas de usar Layout:

/**
 * Navbar me pide las 2 funciones handleSearchMulti y handleButton como props,
 * por lo que, Layout debe recibirlas y pasarlas a Navbar?
 * Podría intentar hacer la lógica de las dos funciones dentro de Layout,
 * pero necesitaría usar useState y useEffect, lo cual no es posible porque estas funciones están dentro de
 * SearchMulti, que es un componente separado.
 * Las funciones no se pueden exportar directamente desde SearchMulti porque son funciones internas de ese componente.
 *
 * Existe alguna forma de hacer la lógica de esas dos funciones dentro de Layout?
 */

// NOTA INTERMEDIA: INTENTA PASAR SOLO SearchMulti COMO UN COMPONENTE HIJO DE Layout A VER SI FUNCIONA.

/**
  combinar los componentes Navbar y SearchMulti en uno solo,
  de modo que puedo pasar SearchMulti como un componente hijo de Layout.

  Cuando lo intente, en App.tsx, Layout me pide las funciones handleSearchMulti y handleButton como props.
  Como puedo pasar esas funciones a Layout si están dentro de SearchMulti?
 */

// Esta es una 3ra opción que no funciono, no recuerdo por que.

/**
 * 
import { getMulti } from "../services/tmdbService";
import { useState, useEffect } from "react";
import useDebounce from "../services/useDebounce";


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
      <Outlet />
    </>
  );
};
 * 
 */
