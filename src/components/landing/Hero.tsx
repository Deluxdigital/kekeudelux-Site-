import { Button } from "@/components/ui/button";
import { BeamsBackground } from "@/components/ui/beams-background";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-24 px-4 flex items-center justify-center overflow-hidden"
    >
      {/* fundo com gradiente animado, sem quadrado destacado */}
      <BeamsBackground className="absolute inset-0 -z-10" intensity="strong" />

      <div className="container mx-auto flex items-center justify-center">
        <div className="text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Quando o Design
            <br />
            <span>
              Encontra o Movimento
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Portfólio e estúdio criativo de KekeuDelux – design gráfico e motion
            para marcas que querem impacto visual.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_24px_hsl(var(--neon-purple)/0.6)] hover:shadow-[0_0_40px_hsl(var(--neon-purple)/0.9)] transition-all"
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Portfólio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/60 bg-background/60 hover:bg-primary/10 hover:border-primary/90"
              onClick={() => (window.location.href = "/login")}
            >
              Gerenciar Clientes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
