// una función para hacer el render de trending movies y hero section

import HeroSection from '../components/HeroSection/HeroSection';
import TrendingMovies from '../components/TrendingApp/TrendingApp';
// import { SearchMulti } from "../components/Navbar/SearchMulti";

const renderSections = () => {
    return (
        <>
            {/* <SearchMulti /> */}
            <HeroSection />
            <TrendingMovies />
        </>
    );
};

export default function Home() {
    return (
        <div className="home">
            {renderSections()}
        </div>
    );
}