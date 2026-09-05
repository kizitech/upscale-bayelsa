import HeroSection from "./components/sections/home/HeroSection";
import Navbar from "./components/Navbar";
import WhyUs from "./components/sections/home/WhyUs";
import OurService from "./components/sections/home/OurService";
import WhoAreWe from "./components/sections/home/WhoAreWe";
import ProcessTimeline from "./components/sections/home/ProcessTimeline";
import Footer from "./components/Footer";
import CTASection from "./components/sections/home/CTA";
import FAQ from "./components/sections/home/Faq";
import Pricing from "./components/sections/home/Pricing";
import Testimonials from "./components/sections/home/Testimonials";
import PricingInquiryProvider from "./components/PricingInquiryProvider";

export default function Home() {
  return (
    <>
      <PricingInquiryProvider>
        <main className="flex flex-col gap-20 w-full ">
          <HeroSection />
          <WhyUs />
          <WhoAreWe />
          <OurService />
          <ProcessTimeline />
          <CTASection />
          <Pricing />
          <Testimonials />
          <FAQ />
        </main>
      </PricingInquiryProvider>
    </>
  );
}
