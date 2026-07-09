import HeroSection from "./components/sections/home/HeroSection";
import Navbar from "./components/Navbar";
import WhyUs from "./components/sections/home/WhyUs";
import OurService from "./components/sections/home/OurService";
import WhoAreWe from "./components/sections/home/WhoAreWe";
import ProcessTimeline from "./components/sections/home/ProcessTimeline";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-20 w-full ">
        <HeroSection />
      <WhyUs/>
      <WhoAreWe />
      <OurService />
      <ProcessTimeline/>
      </main>
    </>
  );
}
