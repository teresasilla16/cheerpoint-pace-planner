
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
  city: string;
  setCity: (value: string) => void;
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
  city,
  setCity,
  onCalculate
}: CalculatorSectionProps) => {
  const spanishCities = [
    "Valencia",
    "A Coruña",
    "Albacete",
    "Alicante",
    "Almería",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Bilbao",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Castellón",
    "Ceuta",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Girona",
    "Granada",
    "Guadalajara",
    "Huelva",
    "Huesca",
    "Jaén",
    "Las Palmas de Gran Canaria",
    "León",
    "Lleida",
    "Logroño",
    "Lugo",
    "Madrid",
    "Málaga",
    "Melilla",
    "Murcia",
    "Ourense",
    "Oviedo",
    "Palencia",
    "Pamplona",
    "Pontevedra",
    "Salamanca",
    "San Sebastián",
    "Santa Cruz de Tenerife",
    "Santander",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valladolid",
    "Vitoria-Gasteiz",
    "Zamora",
    "Zaragoza"
  ];
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
                <Label className="text-cheerpoint-navy font-semibold">¿Dónde corres?</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="border-cheerpoint-gray focus:border-cheerpoint-lime">
                    <SelectValue placeholder="Selecciona tu ciudad" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {spanishCities.map((cityName) => (
                      <SelectItem key={cityName} value={cityName}>
                        {cityName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="text-cheerpoint-navy font-semibold">Distancia total</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    variant={distance === "21" ? "default" : "outline"}
                    onClick={() => setDistance("21")}
                    className={distance === "21" 
                      ? "bg-cheerpoint-lime text-cheerpoint-navy hover:bg-cheerpoint-lime/90" 
                      : "text-cheerpoint-navy border-cheerpoint-gray hover:bg-cheerpoint-lime/10"
                    }
                  >
                    21K (Media Maratón)
                  </Button>
                  <Button
                    variant={distance === "42" ? "default" : "outline"}
                    onClick={() => setDistance("42")}
                    className={distance === "42" 
                      ? "bg-cheerpoint-lime text-cheerpoint-navy hover:bg-cheerpoint-lime/90" 
                      : "text-cheerpoint-navy border-cheerpoint-gray hover:bg-cheerpoint-lime/10"
                    }
                  >
                    42K (Maratón)
                  </Button>
                  <Button
                    variant={distance === "custom" ? "default" : "outline"}
                    onClick={() => setDistance("custom")}
                    className={distance === "custom" 
                      ? "bg-cheerpoint-lime text-cheerpoint-navy hover:bg-cheerpoint-lime/90" 
                      : "text-cheerpoint-navy border-cheerpoint-gray hover:bg-cheerpoint-lime/10"
                    }
                  >
                    Personalizada
                  </Button>
                </div>
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
