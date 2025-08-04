import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import CalculatorSection from "@/components/CalculatorSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import DownloadFormSection from "@/components/DownloadFormSection";
import ThanksSection from "@/components/ThanksSection";

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
  const [participationType, setParticipationType] = useState("");
  const [city, setCity] = useState("");

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

  const handleDownloadPDF = async () => {
    if (!email || !firstName || !lastName || !participationType) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('https://hook.eu2.make.com/dfvd6bkw8httboxi2cw4nh3upxf638fv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          participationType,
          city,
          calculations,
          startTime,
          pace,
          distance: distance === "custom" ? customDistance : distance
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Perfecto!",
          description: "Revisa tu bandeja de entrada para descargar tu plan de paso.",
        });

        setTimeout(() => {
          document.getElementById('thanks')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      } else {
        throw new Error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar los datos. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
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
      <HeroSection onScrollToCalculator={scrollToCalculator} />
      
      <CalculatorSection
        startTime={startTime}
        setStartTime={setStartTime}
        pace={pace}
        setPace={setPace}
        distance={distance}
        setDistance={setDistance}
        customDistance={customDistance}
        setCustomDistance={setCustomDistance}
        city={city}
        setCity={setCity}
        onCalculate={calculatePaces}
      />

      <AboutSection />

      <ResultsSection
        calculations={calculations}
        showResults={showResults}
      />

      <DownloadFormSection
        showResults={showResults}
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        participationType={participationType}
        setParticipationType={setParticipationType}
        onDownloadPDF={handleDownloadPDF}
      />

      <ThanksSection onShareOnSocial={shareOnSocial} />
    </div>
  );
};

export default Index;
