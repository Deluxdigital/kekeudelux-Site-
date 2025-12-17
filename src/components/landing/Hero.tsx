import { BeamsBackground } from "@/components/ui/beams-background";
import { HoverButton } from "@/components/ui/hover-button";
import { PixelCursorTrail } from "@/components/ui/pixel-trail";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-24 px-4 flex items-center justify-center overflow-hidden"
    >
      {/* fundo com gradiente animado, sem quadrado destacado */}
      <BeamsBackground className="absolute inset-0 -z-10" intensity="strong" />

      <PixelCursorTrail className="w-full">
        <div className="container mx-auto flex items-center justify-center">
          <div className="text-center flex flex-col items-center max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Quando o Design
              <br />
              <span>Encontra o Movimento</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Portfólio e estúdio criativo de KekeuDelux – design gráfico e motion
              para marcas que querem impacto visual.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HoverButton
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                onClick={() =>
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver Portfólio
              </HoverButton>
              <HoverButton
                className="bg-background text-foreground border border-border hover:bg-accent"
                onClick={() => (window.location.href = "/login")}
              >
                Gerenciar Clientes
              </HoverButton>
            </div>
          </div>
        </div>
      </PixelCursorTrail>
    </section>
  );
};

export default Hero;
