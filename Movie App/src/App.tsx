// import './App.css'
import HeroSection from "./components/HeroSection/HeroSection";
// import Navbar from "./components/Navbar/Navbar";
import SearchMulti from "./components/Navbar/SearchFunction";
import TrendingApp from "./components/TrendingApp/TrendingApp";

function App() {
  return (
    <>
      {/* <Navbar
        handleSearchMulti={(event) => console.log(event.target.value)}
        onButtonClick={() => console.log("Botón presionado")}
      /> */}
      <SearchMulti />
      <HeroSection />
      <TrendingApp />
    </>
  );
}

export default App;
