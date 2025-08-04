
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface DownloadFormSectionProps {
  showResults: boolean;
  email: string;
  setEmail: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  participationType: string;
  setParticipationType: (value: string) => void;
  onDownloadPDF: () => void;
}

const DownloadFormSection = ({
  showResults,
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  participationType,
  setParticipationType,
  onDownloadPDF
}: DownloadFormSectionProps) => {
  if (!showResults) return null;

  return (
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
                onClick={onDownloadPDF}
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
  );
};

export default DownloadFormSection;
