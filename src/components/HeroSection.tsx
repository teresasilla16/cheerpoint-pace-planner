
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface HeroSectionProps {
  onScrollToCalculator: () => void;
}

const HeroSection = ({ onScrollToCalculator }: HeroSectionProps) => {
  return (
    <section className="gradient-hero min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
        <div className="text-cheerpoint-lime text-xl md:text-2xl font-bold mb-4">
          Cheerpoint
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          ¿A qué hora pasarás
          <br />
          <span className="text-cheerpoint-lime">por el 21?</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Calcula tu hora estimada de paso por cada kilómetro y comparte el plan con los tuyos.
        </p>
        <Button 
          onClick={onScrollToCalculator}
          size="lg" 
          className="bg-cheerpoint-lime text-cheerpoint-navy hover:bg-cheerpoint-lime/90 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 animate-slide-up"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Empieza a calcular
        </Button>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cheerpoint-lime/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cheerpoint-lime/30 rounded-full blur-lg"></div>
    </section>
  );
};

export default HeroSection;
