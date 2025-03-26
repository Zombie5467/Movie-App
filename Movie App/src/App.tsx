// import './App.css'
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import TrendingApp from "./components/TrendingApp/TrendingApp";


function App() {
  return (
    <>
      <Navbar debouncedQuery={(event) => console.log( event.target.value)} />
      <HeroSection />
      <TrendingApp />
    </>
  );
}

export default App;
