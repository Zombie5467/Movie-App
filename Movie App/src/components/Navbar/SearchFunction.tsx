import { useState, useEffect } from "react";
import useDebounce from "../../services/useDebounce";
import { getMulti } from "../../services/tmdbService";
import Navbar from "./Navbar";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

export interface Movie {
    id: number; 
    title: string;
    backdrop_path: string;
}

export function SearchMulti() {
  //Query es como se llama el texto de búsqueda SEGÚN LA API, también es lo que usaba antes de usar debounce
    const [searchQuery, setSearchQuery] = useState(""); // string, ya que es el valor del input
    const [searchResults, setSearchResults] = useState<Movie[]>([]); // Cambiar el tipo de estado a Movie[]
    const debouncedQuery = useDebounce(searchQuery, 500); // 500ms de retraso
    //"Envolver" searchQuery en debouncedQuery para aplicar el retraso

    const handleSearchMulti = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }
   
    useEffect(() => {
        async function fetchSearch() {
            const data  = await getMulti(debouncedQuery); // se necesita pasar searchQuery como argumento (o debouncedQuery ya que se usa debounce)
            console.log("data multi recibida:", data);
            setSearchResults(data || []);
        }
        
        fetchSearch();
    }, [debouncedQuery]); // 'searchQuery' o 'debounce' se incluye como dependencia para que se actualice al cambiar = [searchQuery]


    const handleButton = async () => {
        console.log("Buscando...", searchQuery); //imprimir en consola el texto de búsqueda
        //"botón presionado" estaba aquí y funcionaba (comentario actualmente en desuso)

        if(!searchQuery.trim()) {
            console.log("favor ingrese texto valido");
            return; 
        }

        try{
          const result = await getMulti(searchQuery);
          console.log("Resultado de la búsqueda:", result);//imprimir en consola el resultado de la búsqueda
          console.log('botón presionado');
          setSearchResults(result);
        } catch (error) {
          console.error("Error al buscar:", error);
        }
    }

    return (
        <>
        <Navbar debouncedQuery={handleSearchMulti} onButtonClick={handleButton}/> 
        {/* Aquí se mostrarán los resultados de la búsqueda */}  
          {searchResults.map((multi) => (
            <Card key={multi.id} style={{ maxWidth: 340 }}>
              <CardMedia>
                <img
                  src={`https://image.tmdb.org/t/p/w500${multi.backdrop_path}`}
                  alt="movie"
                ></img>
              </CardMedia>
              <CardContent>
                <Typography variant="h5" component="div">
                  {multi.title}
                </Typography>
              </CardContent>
            </Card>
          ))} 
        </>
    )
}

export default SearchMulti;



/** 
 * NUEVO ERROR (resuelto, recuerda actualizar los comentarios)
 * La función no presenta ninguna alerta, 
 * sin embargo no se muestra el resultado de la búsqueda 
 * en la pantalla o consola. ¿Qué podría estar fallando? 
 * 
 * Estamos obteniendo algo de la api?
 * El código para Renderizar en pantalla esta correcto?
 * Necesitamos un botón para hacer la búsqueda?
 * Por que la búsqueda no funciona al presionar enter?
 * RESUELTO:
 *  Error encontrado: pase handleSearchMulti como prop a Navbar, pero también había que hacerlo en App.tsx
 * ----------------------------------------------------
 * NUEVO ERROR
 * Debounce no retrasa lo que se escribe en consola
 * */

/**
 **TODOS LOS ERRORES ANTERIORES A 28/03/2024 ESTÁN RESUELTOS**
 * - Se corrigió el error de la búsqueda al presionar enter, ahora se puede buscar sin hacer click en el botón.
 * NUEVOS ERRORES A CORREGIR:
 * - Se actualiza el render al escribir en el input sin presionar enter, queremos mantenerlo asi?
 * - Resumen completo de todo hasta ahora, incluyendo errores y soluciones.
 * - Los comentarios.
 * - Eliminar todos los Console.log que no sean necesarios.
 * - navbar duplicado.
 */