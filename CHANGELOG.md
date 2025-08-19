## [Fix] Detalles no se renderizaban al navegar desde resultados de búsqueda (requiere F5)

**Fecha:** 2025-08-5  
**Tipo:** Bugfix / Routing & UI state  
**Ámbito:** `react-router`, `Layout`, `Navbar` + búsqueda (debounce), páginas de detalle

### 🐞 Síntomas

-   Al hacer click en un card de **resultados de búsqueda** (`/search`), la URL cambiaba a `/details/:media_type/:id`, aparecían logs en consola, **pero la vista no se actualizaba** hasta forzar un refresh (F5).
    
-   Desde **Trending** (home) sí funcionaba: click → renderizaba la página de detalles sin problemas.
    

### 🔁 Pasos para reproducir

1.  Escribir un término en la barra de búsqueda (ej. “LEGO”).
    
2.  Click en cualquiera de los resultados.
    
3.  Observar: la URL cambia a `/details/tv/…` (o `/details/movie/…`), hay logs del fetch, **pero la UI sigue mostrando la lista de resultados**. Solo F5 mostraba el detalle.
    

### 🧠 Causa raíz

1.  **Estructura de rutas incompleta**: el `Router` no tenía un **Layout padre** que anidara las rutas con `<Outlet />`.
    
2.  **Componente de búsqueda siempre montado**: la lista de resultados se renderizaba **fuera de `<Routes>`**, quedando persistente en pantalla incluso al cambiar de ruta.
    
3.  **Falta de control de visibilidad**: no se ocultaban los resultados cuando se entraba a una ruta de detalles (`/details/...`), por lo que “tapaban” visualmente el contenido nuevo.
    

> Nota: El flujo desde Trending funcionaba porque la pantalla inicial no tenía resultados de búsqueda montados, así que el detalle no quedaba cubierto por esa capa.

### 🛠️ Solución aplicada

1.  **Reestructura de routing con Layout**
    
    -   Se creó un **Layout** que:
        
        -   Renderiza la `Navbar` (siempre visible).
            
        -   Mantiene el estado de búsqueda (query, resultados, debounce).
            
        -   Expone un `<Outlet />` para las páginas hijas.
            
2.  **Rutas anidadas**
    
    -   La app ahora define un **Route raíz** con `path="/"` que usa `Layout` como `element`, y dentro:
        
        -   `index` → `Home` (Trending + Hero).
            
        -   `/details/:media_type/:id` → `DetailsPage`.
            
        -   (Opcional) `/search` → página de resultados dedicados.
            
3.  **Control de visibilidad de resultados**
    
    -   En `Layout`, se ocultan los resultados cuando la ruta **empieza con** `/details` (`location.pathname.startsWith("/details")`).
        
    -   Esto evita que la capa de resultados persista y oculte la vista de detalle.
        
4.  **Enlaces consistentes**
    
    -   Los `Link` de resultados usan:
        
        -   `/details/${result.media_type}/${result.id}` para multi-búsqueda.
            
        -   `/details/movie/${id}` para Trending (donde el `media_type` ya es conocido).
            
5.  **Efectos correctamente atados a la ruta**
    
    -   En `DetailsPage`, el `useEffect` depende de `[id, media_type]` para refetch al navegar entre detalles.
        

### 🧩 Resumen visual (antes → después)

**Antes**

```
<BrowserRouter>
  <Navbar />   // y/o SearchMulti fuera de Routes (siempre montado)
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:media_type/:id" element={<DetailsPage />} />
  </Routes>
</BrowserRouter>

```

**Después**

```
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout>}>
      <Route index element={<Home />} />
      <Route path="details/:media_type/:id" element={<DetailsPage />} />
      <!-- opcional -->
      <Route path="search" element={<SearchPage />} />
    </Route>
  </Routes>
</BrowserRouter>

```

En `Layout`:

-   Render de `Navbar`.
    
-   Estado y lógica de búsqueda (con debounce).
    
-   **Ocultar resultados si `pathname` empieza por `/details`**.
    
-   `<Outlet />` para la página hija activa.
    

### ✅ Verificación (QA manual)

-   Abrir `/` → ver Hero + Trending.
    
-   Escribir en la búsqueda → aparecen resultados (cards).
    
-   Click en un resultado de búsqueda → se navega a `/details/:media_type/:id` y **se renderiza el detalle** (sin F5).
    
-   Volver atrás → regresan los resultados de búsqueda.
    
-   Click en una trending → detalle se renderiza correctamente.
    
-   Navegar entre detalles (movie ↔ tv) actualiza contenido sin recargar.
    

### ⚠️ Riesgos de regresión

-   Rutas adicionales (ej. `/person`) deben respetar el patrón y la lógica de ocultar resultados.
    
-   Asegurar que `Name/Title` se mapee correctamente (en TV suele ser `name` en lugar de `title`).
    
-   Si se mueve la búsqueda a una página propia, revisar que `Layout` no duplique listados.
    

### 📌 Pendientes recomendados (post-MVP)

-   Extraer un `SearchResults` como componente/página dedicada (mejor control del layout).
    
-   Skeletons/estados de carga para detalles y resultados.
    
-   Manejo de “sin resultados” con UI amigable.
    
-   Ajustar tipados: `Movie | TvShow | Person` con campos específicos (`title` vs `name`).
    
-   Tests básicos de navegación (React Testing Library) para asegurar que el detalle se monta.
    

----------