import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getTvDetails,
  getPersonDetails,
} from "../services/tmdbService";


// Mostrar los detalles de una película o serie al hacer clic en un elemento de la lista de resultados de búsqueda.
interface Movie {
  id: number;
  title: string; //con esta API puede ser number o string
  overview: string;
  backdrop_path: string;
}

function DetailsPage() {
  const [detalles, setDetalles] = useState<Movie[]>([]);
  const { id, media_type } = useParams();
  

  useEffect(() => {
    console.log("ID:", id, "MediaType:", media_type);

    async function fetchDetails() {
      if (media_type === "movie" || media_type === undefined) {
        const data = await getMovieDetails(Number(id));
        setDetalles([data]);
      } else if (media_type === "tv") {
        const data = await getTvDetails(Number(id));
        setDetalles([data]);
      } else if (media_type === "person") {
        const data = await getPersonDetails(Number(id));
        setDetalles([data]);
      }
    }
    fetchDetails();
  }, [id, media_type]);

  return (
    <>
      <h1>Detalles de la Película/Serie</h1>
      {detalles.map((detalle) => (
        <div key={detalle.id}>
          <h2>{detalle.title}</h2>
          {detalle.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${detalle.backdrop_path}`}
              alt={detalle.title}
            />
          )}
          <h2>{detalle.overview}</h2>
        </div>
      ))}
    </>
  );
}

export default DetailsPage;
