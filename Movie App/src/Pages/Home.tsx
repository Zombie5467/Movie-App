import HeroSection from "../components/HeroSection/HeroSection";
import TrendingApp from "../components/TrendingApp/TrendingApp";

// una función para hacer el render de trending movies y hero section
const renderSections = () => {
  return (
    <>
      <HeroSection />
      <TrendingApp />
    </>
  );
};

export default function Home() {
  return <div className="home">{renderSections()}</div>;
}
