
//Query es como se llama el texto de búsqueda SEGÚN LA API, también es lo que usaba antes de usar debounce
// string, ya que es el valor del input
// Cambiar el tipo de estado a Movie[]
//"Envolver" searchQuery en debouncedQuery para aplicar el retraso
// se necesita pasar searchQuery como argumento (o debouncedQuery ya que se usa debounce)
// console.log("data multi recibida:", data);
// 'searchQuery' o 'debounce' se incluye como dependencia para que se actualice al cambiar = [searchQuery]


//📌 Nota Personal: useDebounce es un hook personalizado porque usa useState y useEffect.

/* Nota Personal: Un hook personalizado usa otros hooks de React (useState, useEffect, etc.).
Una función de utilidad es solo una función normal que no usa hooks. 

Diferencia resumida
Característica	Hook personalizado (useDebounce)	Función de utilidad (debounceFunction)
Usa useState	✅ Sí	❌ No
Usa useEffect	✅ Sí	❌ No
Se usa dentro de React	✅ Sí	✅ Sí (pero no es exclusivo)
Guarda valores	✅ Sí (almacena estado)	❌ No, solo retrasa una función
Requiere importación de React	✅ Sí	❌ No

*/

⚠️ Riesgos de regresión (Bug f5 para ver los detalles   )

Rutas adicionales (ej. /person) deben respetar el patrón y la lógica de ocultar resultados.

Asegurar que Name/Title se mapee correctamente (en TV suele ser name en lugar de title).

Si se mueve la búsqueda a una página propia, revisar que Layout no duplique listados.

📌 Pendientes recomendados (post-MVP)

Extraer un SearchResults como componente/página dedicada (mejor control del layout).

Skeletons/estados de carga para detalles y resultados.

Manejo de “sin resultados” con UI amigable.

Ajustar tipados: Movie | TvShow | Person con campos específicos (title vs name).

Tests básicos de navegación (React Testing Library) para asegurar que el detalle se monta.