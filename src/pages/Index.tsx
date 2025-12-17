import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
 
 const Index = () => {
   return (
     <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
       <BackgroundPaths mode="background" title="Portfólio em movimento" />
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
