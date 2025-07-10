// import './App.css'
// import Navbar from "./components/Navbar/Navbar";
// import { Details } from "@mui/icons-material";
import Home from "./Pages/Home";
import SearchMulti from "./components/Navbar/SearchMulti";
import DetailsPage from "./Pages/DetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchPage } from "./Pages/SearchPage";
import { Layout } from "./Pages/Layout";

function App() {
  return (
    <>
      <Router>
        <SearchMulti />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/details/:media_type/:id" element={<DetailsPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            {/* Ruta alternativa para detalles sin media_type?? */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
