
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface PaceCalculation {
  km: number;
  time: string;
}

interface ResultsSectionProps {
  calculations: PaceCalculation[];
  showResults: boolean;
}

const ResultsSection = ({ calculations, showResults }: ResultsSectionProps) => {
  if (!showResults) return null;

  return (
    <section id="results" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-cheerpoint-navy text-center mb-12">
            <MapPin className="inline-block mr-3 h-8 w-8" />
            Tu Plan de Paso
          </h2>
          
          <Card className="shadow-xl border-0 animate-fade-in">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {calculations.map((calc) => (
                  <div 
                    key={calc.km}
                    className="bg-cheerpoint-gray/30 rounded-lg p-4 text-center hover:bg-cheerpoint-lime/20 transition-colors duration-300"
                  >
                    <div className="text-lg font-bold text-cheerpoint-navy">KM {calc.km}</div>
                    <div className="text-cheerpoint-navy/70 font-medium">{calc.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
