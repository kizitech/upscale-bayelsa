import HeroSection from "./components/sections/home/HeroSection";
import Navbar from "./components/Navbar";
import WhyUs from "./components/sections/home/WhyUs";
import OurService from "./components/sections/home/OurService";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhyUs/>
      <OurService />
    </>
  );
}
