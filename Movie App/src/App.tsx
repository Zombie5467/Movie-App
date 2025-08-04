import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
// import SearchPage from "./Pages/SearchPage";
import DetailsPage from "./Pages/DetailsPage";
import { Layout } from "./Pages/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Estas rutas ahora están *dentro del Layout* */}
          <Route index element={<Home />} />
          {/* <Route path="search" element={<DetailsPage />} /> */}
          <Route path="details/:media_type/:id" element={<DetailsPage />} />
          <Route path="details/:id" element={<DetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
