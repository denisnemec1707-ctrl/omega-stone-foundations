import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhyInvest from "@/components/sections/WhyInvest";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Trust from "@/components/sections/Trust";
import Calculator from "@/components/sections/Calculator";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhyInvest />
        <About />
        <HowItWorks />
        <Trust />
        <Calculator />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
