import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Hero from "@/components/sections/Hero";
import HowWeWork from "@/components/sections/HowWeWork";
import ConceptLab from "@/components/sections/ConceptLab";
import Services from "@/components/sections/Services";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Portfolio from "@/components/sections/Portfolio";
import AIFeatures from "@/components/sections/AIFeatures";
import BusinessImpact from "@/components/sections/BusinessImpact";
import Pricing from "@/components/sections/Pricing";
import PerformanceSecurity from "@/components/sections/PerformanceSecurity";
import DashboardDemo from "@/components/sections/DashboardDemo";
import Industries from "@/components/sections/Industries";
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
        <HowWeWork />
        <ConceptLab />
        <Services />
        <BeforeAfter />
        <Portfolio />
        <AIFeatures />
        <BusinessImpact />
        <Industries />
        <Pricing />
        <PerformanceSecurity />
        <DashboardDemo />
        <WhyAndHuman />
        <Trust />
        <Contact />
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
