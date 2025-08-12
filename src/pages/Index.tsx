"use client";

import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient"; // <-- asegúrate de tenerlo
import HeroSection from "@/components/HeroSection";
import CalculatorSection from "@/components/CalculatorSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import DownloadFormSection from "@/components/DownloadFormSection";
import ThanksSection from "@/components/ThanksSection";

interface PaceCalculation {
  km: number;
  time: string; // HH:MM:SS
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
  const [participationType, setParticipationType] = useState(""); // 'runner' | 'supporter' etc.
  const [city, setCity] = useState("");

  const scrollToCalculator = useCallback(() => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const calculatePaces = useCallback(() => {
    if (!startTime || !pace) {
      toast({
        title: "Error",
        description: "Por favor completa la hora de salida y el ritmo",
        variant: "destructive",
      });
      return;
    }

    const totalDistanceRaw =
      distance === "custom" ? customDistance.trim() : distance.trim();
    const totalDistance = Number.parseInt(totalDistanceRaw, 10);

    if (!Number.isFinite(totalDistance) || totalDistance <= 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona una distancia válida",
        variant: "destructive",
      });
      return;
    }

    const [paceMinStr, paceSecStr] = pace.split(":");
    const paceMin = Number.parseInt(paceMinStr ?? "", 10);
    const paceSec = Number.parseInt(paceSecStr ?? "0", 10);

    if (!Number.isFinite(paceMin) || paceMin < 0 || !Number.isFinite(paceSec) || paceSec < 0 || paceSec >= 60) {
      toast({
        title: "Error",
        description: "Formato de ritmo inválido. Usa mm:ss (ej. 05:30).",
        variant: "destructive",
      });
      return;
    }

    const paceInSeconds = paceMin * 60 + paceSec;

    const [startHourStr, startMinuteStr] = startTime.split(":");
    const startHour = Number.parseInt(startHourStr ?? "", 10);
    const startMinute = Number.parseInt(startMinuteStr ?? "", 10);

    if (!Number.isFinite(startHour) || !Number.isFinite(startMinute) || startHour < 0 || startHour > 23 || startMinute < 0 || startMinute > 59) {
      toast({
        title: "Error",
        description: "Hora de salida inválida. Usa HH:MM (24h).",
        variant: "destructive",
      });
      return;
    }

    const startTimeInMinutes = startHour * 60 + startMinute;

    const results: PaceCalculation[] = [];
    for (let km = 1; km <= totalDistance; km++) {
      const totalSecondsFromStart = km * paceInSeconds; // segundos añadidos respecto a salida
      const totalMinutesFromStart = totalSecondsFromStart / 60;
      const finalTimeInMinutes = startTimeInMinutes + totalMinutesFromStart;

      const finalHour = Math.floor(finalTimeInMinutes / 60) % 24;
      const finalMinute = Math.floor(finalTimeInMinutes % 60);
      const finalSecond = Math.floor(totalSecondsFromStart % 60);

      const timeString = `${finalHour.toString().padStart(2, "0")}:${finalMinute
        .toString()
        .padStart(2, "0")}:${finalSecond.toString().padStart(2, "0")}`;

      results.push({ km, time: timeString });
    }

    setCalculations(results);
    setShowResults(true);

    // Opcional: scroll automático a resultados
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [startTime, pace, distance, customDistance]);

  const handleDownloadPDF = useCallback(async () => {
    if (!email || !firstName || !lastName || !participationType) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    try {
      // 1) Guardar en Supabase (no bloquea el flujo si falla)
      try {
        await supabase
          .from("calculations")
          .insert([
            {
              race_id: 1, // Medio Maratón de València por defecto
              pace,
              start_time: startTime,
              user_email: email,
              user_type: participationType === "runner" ? "corredor" : "animador",
              first_name: firstName,
              last_name: lastName,
              city,
              distance: distance === "custom" ? customDistance : distance,
              payload: calculations, // por si quieres guardar el array
            },
          ]);
      } catch (e) {
        console.warn("Supabase insert falló (continuo igualmente):", e);
      }

      // 2) Enviar a Make.com
      const response = await fetch(
        "https://hook.eu2.make.com/dfvd6bkw8httboxi2cw4nh3upxf638fv",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            participationType,
            city,
            calculations,
            startTime,
            pace,
            distance: distance === "custom" ? customDistance : distance,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Hook respondió ${response.status}`);
      }

      toast({
        title: "¡Perfecto!",
        description: "Revisa tu bandeja de entrada para descargar tu plan de paso.",
      });

      setTimeout(() => {
        document.getElementById("thanks")?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    } catch (error) {
      console.error("Error enviando datos:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar los datos. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
  }, [
    email,
    firstName,
    lastName,
    participationType,
    city,
    calculations,
    startTime,
    pace,
    distance,
    customDistance,
  ]);

  const shareOnSocial = useCallback((platform: string) => {
    const url = window.location.href;
    const text = "¿A qué hora pasarás por el 21? Calcula tu tiempo con Cheerpoint";

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
  }, []);

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

