import { useState, useEffect } from "react";
import useDebounce from "../../services/useDebounce";
import { getMulti } from "../../services/tmdbService";
import Navbar from "./Navbar";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
// Aquí tienes los pasos detallados para implementar la barra de búsqueda con debounce en tu app. **No incluiré código, solo explicaciones detalladas.**  

// ---

// ### 📂 **Estructura de archivos**  
// Para mantener el código organizado, trabajaremos con los siguientes archivos:  
// 1. **`tmdbService.ts`** → Encargado de hacer las peticiones a la API de TMDB.  
// 2. **`useDebounce.ts`** → Custom hook para aplicar debounce a la búsqueda.  
// 3. **`SearchBar.tsx`** → Componente que maneja el input de búsqueda.  
// 4. **`Navbar.tsx`** → Componente donde se usa `SearchBar` y se conecta con la búsqueda.  

// ---

// ### 🛠 **Pasos detallados**  

// #### 🔹 **1. Crear la función para hacer la búsqueda en la API (`tmdbService.ts`)**  
// - Este archivo se encargará de hacer la petición a la API de TMDB.  
// - Debe usar **Axios** y reutilizar la instancia que ya tienes (`tmdbApi`).  
// - Se creará una función llamada `searchMovies` que reciba como parámetro el texto de búsqueda (`query`).  
// - La función usará el **endpoint** `/search/multi` para obtener resultados que incluyan películas, series y personas.  

// ---

// #### 🔹 **2. Crear un custom hook para el debounce (`useDebounce.ts`)**  
// - Usaremos un **hook personalizado (`useDebounce`)** para retrasar la ejecución de la búsqueda mientras el usuario sigue escribiendo.  
// - El debounce evita hacer llamadas a la API en cada pulsación de tecla y mejora el rendimiento.  
// - Este hook tomará un valor (`value`, en este caso el texto ingresado en la búsqueda) y devolverá una versión "retrasada" de ese valor.  
// - Se aplicará un **delay** de aproximadamente 300-500ms.  

// ---

// #### 🔹 **3. Crear el componente `SearchBar.tsx`**  
// - Este componente contendrá el input donde el usuario escribe la búsqueda.  
// - Debe tener:  
//   - Un **estado local (`searchQuery`)** que almacene el valor del input.  
//   - Un **`onChange`** que actualice el estado en cada cambio.  
//   - La función de debounce aplicada al estado.  
//   - Un `onSubmit` que prevenga el comportamiento por defecto del formulario.  
// - Se debe **exportar** este componente para usarlo en `Navbar.tsx`.  

// ---

// #### 🔹 **4. Conectar `SearchBar.tsx` con `Navbar.tsx`**  
// - Importar `SearchBar` dentro de `Navbar.tsx`.  
// - Crear un **estado global (`searchResults`)** en `Navbar.tsx` para almacenar los resultados de la API.  
// - Pasar una **función `onSearch`** como prop a `SearchBar` para manejar la búsqueda en `Navbar`.  
// - Cuando el usuario escriba algo, `SearchBar` enviará la búsqueda a `Navbar`, que hará la petición a la API con `searchMovies`.  
// - Mostrar los resultados en una sección debajo de la barra de búsqueda (en una `Grid` de MUI con `Card`).  

// ---

// #### 🔹 **5. Manejar los resultados y mostrar la información en pantalla**  
// - Una vez obtenidos los resultados de la API en `Navbar.tsx`, se deben almacenar en el estado `searchResults`.  
// - Mapear los resultados para mostrar en una `Grid` de **MUI** con **`Card`**, donde cada resultado tenga:  
//   - Imagen de la película o serie.  
//   - Título.  
//   - Fecha de lanzamiento (opcional).  
//   - Al hacer click en un resultado, se navega a una página con más detalles.  

// ---

// ### 🎯 **Resumen del flujo de datos**  
// 1. El usuario escribe en el `input` de `SearchBar.tsx`.  
// 2. La función `handleInputChange` actualiza el estado `searchQuery`.  
// 3. Se aplica `useDebounce`, retrasando la petición a la API.  
// 4. Cuando el texto estabiliza, se llama `onSearch(query)`, enviando el valor a `Navbar.tsx`.  
// 5. `Navbar.tsx` recibe el valor y llama a `searchMovies(query)`, obteniendo los resultados de TMDB.  
// 6. Los resultados se almacenan en `searchResults` y se Renderizar en pantalla.  

// ---

// Si todo esto está claro, dime qué punto quieres implementar primero y lo haremos paso a paso. 🚀

export interface Movie {
    id: number; 
    title: string;
    backdrop_path: string;
}

export function SearchMulti() {
  //Query es como se llama el texto de búsqueda SEGÚN EL API, también es lo que usaba antes de usar debounce
    const [searchQuery, setSearchQuery] = useState(""); // string, ya que es el valor del input
    const [searchResults, setSearchResults] = useState<Movie[]>([]); // Cambiar el tipo de estado a Movie[]
    const debouncedQuery = useDebounce(searchQuery, 500); // 500ms de retraso
    //"Envolver" searchQuery en debouncedQuery para aplicar el retraso

    const handleSearchMulti = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }
   
    useEffect(() => {
        async function fetchSearch() {
            const data  = await getMulti(debouncedQuery); // se necesita pasar searchQuery como argumento
            console.log("data multi recibida:", data);
            setSearchResults(data || []);
        }
        
        fetchSearch();
    }, [debouncedQuery]); // 'searchQuery' o 'debounce' se incluye como dependencia para que se actualice al cambiar = [searchQuery]

    /**
     * Preguntar sobre esto
     * Actualmente, useEffect está mal optimizado porque no tiene un array de dependencias. Hay que corregir eso.
     */

    return (
        <>
        <Navbar debouncedQuery={handleSearchMulti} /> 
        {/* Aquí se mostrarán los resultados de la búsqueda */}  
          {searchResults.map((result) => (
            <Card key={result.id} style={{ maxWidth: 340 }}>
              <CardMedia>
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`}
                  alt="movie"
                ></img>
              </CardMedia>
              <CardContent>
                <Typography variant="h5" component="div">
                  {result.title}
                </Typography>
              </CardContent>
            </Card>
          ))} 
        </>
    )
}

export default SearchMulti;



/** 
 * NUEVO ERROR
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