
import Home from "./Pages/Home";
import DetailsPage from "./Pages/DetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Pages/Layout";

function App() {
  return (
    <>
      <Router>
        {/* <SearchMulti /> */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/details/:media_type/:id" element={<DetailsPage />} />
            <Route path="/details/movie/:id" element={<DetailsPage />} />
            <Route path="/details/tv/:id" element={<DetailsPage />} />     
            <Route path="/details/:id" element={<DetailsPage />} />
            {/* Ruta alternativa para detalles sin media_type?? */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
