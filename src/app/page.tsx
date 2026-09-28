import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Hero from "@/components/sections/Hero";
import HowWeWork from "@/components/sections/HowWeWork";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import BusinessImpact from "@/components/sections/BusinessImpact";
import Pricing from "@/components/sections/Pricing";
import PerformanceSecurity from "@/components/sections/PerformanceSecurity";
import WhyAndHuman from "@/components/sections/WhyAndHuman";
import Trust from "@/components/sections/Trust";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <div className="brand-seam" aria-hidden />
        <HowWeWork />
        <div className="brand-seam" aria-hidden />
        <Services />
        <div className="brand-seam" aria-hidden />
        <Portfolio />
        <div className="brand-seam" aria-hidden />
        <BusinessImpact />
        <div className="brand-seam" aria-hidden />
        <Pricing />
        <div className="brand-seam" aria-hidden />
        <PerformanceSecurity />
        <div className="brand-seam" aria-hidden />
        <WhyAndHuman />
        <div className="brand-seam" aria-hidden />
        <Trust />
        <div className="brand-seam" aria-hidden />
        <Contact />
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
