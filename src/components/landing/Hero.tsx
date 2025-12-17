import { Button } from "@/components/ui/button";
import { PixelCursorTrail } from "@/components/ui/pixel-trail";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen pt-24 px-4 flex items-center justify-center"
    >
      <PixelCursorTrail className="w-full h-full flex items-center justify-center">
        <div className="container mx-auto flex items-center justify-center">
          {/* bloco central com degradê animado */}
          <div className="relative w-full max-w-5xl rounded-[3rem] border border-border/40 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan/80 shadow-[0_0_80px_hsl(var(--neon-blue)/0.6)] overflow-hidden animate-pulse">
            {/* vinheta para cair no preto nas bordas */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,transparent_0%,hsl(0_0%_0%/0.6)_65%,hsl(0_0%_0%/0.95)_90%)]" />

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center flex flex-col items-center">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                Quando o Design
                <br />
                <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
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
        </div>
      </PixelCursorTrail>
    </section>
  );
};

export default Hero;
