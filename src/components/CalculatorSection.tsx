
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Clock } from "lucide-react";

interface CalculatorSectionProps {
  startTime: string;
  setStartTime: (value: string) => void;
  pace: string;
  setPace: (value: string) => void;
  distance: string;
  setDistance: (value: string) => void;
  customDistance: string;
  setCustomDistance: (value: string) => void;
  onCalculate: () => void;
}

const CalculatorSection = ({
  startTime,
  setStartTime,
  pace,
  setPace,
  distance,
  setDistance,
  customDistance,
  setCustomDistance,
  onCalculate
}: CalculatorSectionProps) => {
  return (
    <section id="calculator" className="gradient-section py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 animate-slide-up">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-cheerpoint-navy mb-4">
                <Clock className="mx-auto mb-4 h-12 w-12 text-cheerpoint-lime" />
                Calculadora de Ritmo
              </CardTitle>
              <p className="text-cheerpoint-navy/70 text-lg">
                Introduce tus datos para calcular tus tiempos de paso
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-cheerpoint-navy font-semibold">
                    Hora de salida
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border-cheerpoint-gray focus:border-cheerpoint-lime"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pace" className="text-cheerpoint-navy font-semibold">
                    Ritmo medio (min:seg/km)
                  </Label>
                  <Input
                    id="pace"
                    type="text"
                    placeholder="5:30"
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                    className="border-cheerpoint-gray focus:border-cheerpoint-lime"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-cheerpoint-navy font-semibold">Distancia total</Label>
                <Select value={distance} onValueChange={setDistance}>
                  <SelectTrigger className="border-cheerpoint-gray focus:border-cheerpoint-lime">
                    <SelectValue placeholder="Selecciona la distancia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21">21K (Media Maratón)</SelectItem>
                    <SelectItem value="42">42K (Maratón)</SelectItem>
                    <SelectItem value="custom">Personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {distance === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="customDistance" className="text-cheerpoint-navy font-semibold">
                    Distancia personalizada (km)
                  </Label>
                  <Input
                    id="customDistance"
                    type="number"
                    placeholder="10"
                    value={customDistance}
                    onChange={(e) => setCustomDistance(e.target.value)}
                    className="border-cheerpoint-gray focus:border-cheerpoint-lime"
                  />
                </div>
              )}

              <Button 
                onClick={onCalculate}
                className="w-full bg-cheerpoint-lime text-cheerpoint-navy hover:bg-cheerpoint-lime/90 text-lg py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular tiempos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
