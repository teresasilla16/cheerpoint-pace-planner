import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Calculator, Clock, Download, Share2, MapPin, Users } from "lucide-react";

interface PaceCalculation {
  km: number;
  time: string;
}

const Index = () => {
  const [startTime, setStartTime] = useState("");
  const [pace, setPace] = useState("");
  const [distance, setDistance] = useState("");
  const [customDistance, setCustomDistance] = useState("");
  const [calculations, setCalculations] = useState<PaceCalculation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [raceName, setRaceName] = useState("");
  const [participationType, setParticipationType] = useState("");

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculatePaces = () => {
    if (!startTime || !pace) {
      toast({
        title: "Error",
        description: "Por favor completa la hora de salida y el ritmo",
        variant: "destructive",
      });
      return;
    }

    const totalDistance = distance === "custom" ? parseInt(customDistance) : parseInt(distance);
    
    if (!totalDistance || totalDistance <= 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona una distancia válida",
        variant: "destructive",
      });
      return;
    }

    const [paceMin, paceSec] = pace.split(':').map(Number);
    const paceInSeconds = paceMin * 60 + (paceSec || 0);
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;

    const results: PaceCalculation[] = [];
    
    for (let km = 1; km <= totalDistance; km++) {
      const totalSecondsFromStart = km * paceInSeconds;
      const totalMinutesFromStart = totalSecondsFromStart / 60;
      const finalTimeInMinutes = startTimeInMinutes + totalMinutesFromStart;
      
      const finalHour = Math.floor(finalTimeInMinutes / 60) % 24;
      const finalMinute = Math.floor(finalTimeInMinutes % 60);
      const finalSecond = Math.floor(totalSecondsFromStart % 60);
      
      const timeString = `${finalHour.toString().padStart(2, '0')}:${finalMinute.toString().padStart(2, '0')}:${finalSecond.toString().padStart(2, '0')}`;
      
      results.push({
        km,
        time: timeString
      });
    }

    setCalculations(results);
    setShowResults(true);
    
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDownloadPDF = () => {
    if (!email || !firstName || !lastName || !raceName || !participationType) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Perfecto!",
      description: "Revisa tu bandeja de entrada para descargar tu plan de paso.",
    });

    setTimeout(() => {
      document.getElementById('thanks')?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = "¿A qué hora pasarás por el 21? Calcula tu tiempo con Cheerpoint";
    
    let shareUrl = "";
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-instrument">
      {/* Hero Section */}
      <section className="gradient-hero min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            ¿A qué hora pasarás
            <br />
            <span className="text-cheerpoint-lime">por el 21?</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Calcula tu hora estimada de paso por cada kilómetro y comparte el plan con los tuyos. Correr es emocionante. Animar, también. Porque saber cuándo llega no le quita emoción. Le da sentido. Y porque estar ahí, justo ahí, también es parte de la carrera.
          </p>
          <Button 
            onClick={scrollToCalculator}
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

      {/* Calculator Section */}
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
                  onClick={calculatePaces}
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

      {/* Results Section */}
      {showResults && (
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
      )}

      {/* Download PDF Section */}
      {showResults && (
        <section className="gradient-section py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-2xl border-0 animate-slide-up">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-cheerpoint-navy mb-4">
                    <Download className="mx-auto mb-4 h-12 w-12 text-cheerpoint-lime" />
                    Descarga tu Plan
                  </CardTitle>
                  <p className="text-cheerpoint-navy/70 text-lg">
                    Recibe tu plan personalizado en PDF
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-cheerpoint-navy font-semibold">
                        Nombre
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Tu nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border-cheerpoint-gray focus:border-cheerpoint-lime"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-cheerpoint-navy font-semibold">
                        Apellidos
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Tus apellidos"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border-cheerpoint-gray focus:border-cheerpoint-lime"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cheerpoint-navy font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-cheerpoint-gray focus:border-cheerpoint-lime"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="raceName" className="text-cheerpoint-navy font-semibold">
                      Carrera a la que asistes
                    </Label>
                    <Input
                      id="raceName"
                      type="text"
                      placeholder="Nombre de la carrera"
                      value={raceName}
                      onChange={(e) => setRaceName(e.target.value)}
                      className="border-cheerpoint-gray focus:border-cheerpoint-lime"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-cheerpoint-navy font-semibold">¿Vas a correr o animar?</Label>
                    <Select value={participationType} onValueChange={setParticipationType}>
                      <SelectTrigger className="border-cheerpoint-gray focus:border-cheerpoint-lime">
                        <SelectValue placeholder="Selecciona tu participación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="runner">🏃‍♂️ Voy a correr</SelectItem>
                        <SelectItem value="supporter">📣 Voy a animar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleDownloadPDF}
                    className="w-full bg-cheerpoint-navy text-white hover:bg-cheerpoint-navy/90 text-lg py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Enviar y descargar PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Thanks Section */}
      <section id="thanks" className="py-20 bg-cheerpoint-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <Users className="inline-block mr-4 h-12 w-12" />
              ¡Te veo en el 21!
            </h2>
            <p className="text-xl mb-12 text-white/90">
              Revisa tu bandeja de entrada para descargar tu plan de paso.
            </p>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-cheerpoint-lime">
                Comparte la herramienta
              </h3>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => shareOnSocial('twitter')}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  onClick={() => shareOnSocial('facebook')}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button
                  onClick={() => shareOnSocial('whatsapp')}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cheerpoint-navy/95 text-white/70 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg">
            Hecho con ❤️ para runners · <span className="text-cheerpoint-lime font-semibold">Cheerpoint</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
