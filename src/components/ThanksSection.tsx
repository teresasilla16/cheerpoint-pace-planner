
import { Button } from "@/components/ui/button";
import { Share2, Users, Link } from "lucide-react";

interface ThanksSectionProps {
  onShareOnSocial: (platform: string) => void;
}

const ThanksSection = ({ onShareOnSocial }: ThanksSectionProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here if needed
  };

  return (
    <>
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
                  onClick={() => onShareOnSocial('whatsapp')}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link className="mr-2 h-4 w-4" />
                  Copiar enlace
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
    </>
  );
};

export default ThanksSection;
