import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import profilePortrait from "@/assets/profile-portrait.png";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center">
        <div className="text-center md:text-left animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            Quando o Design
            <br />
            <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Encontra o Movimento
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl md:max-w-xl mx-auto md:mx-0 mb-12">
            Portfólio e estúdio criativo de KekeuDelux – design gráfico e motion
            para marcas que querem impacto visual.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--neon-purple)/0.4)] hover:shadow-[0_0_40px_hsl(var(--neon-purple)/0.7)] transition-all"
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
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
              onClick={() => (window.location.href = "/login")}
            >
              Gerenciar Clientes
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-neon-purple/40 via-neon-blue/30 to-neon-cyan/30 overflow-hidden shadow-[0_0_40px_hsl(var(--neon-purple)/0.6)]">
          <img
            src={profilePortrait}
            alt="Retrato do artista"
            className="w-full h-full object-cover"
          />
          <GlowingEffect className="rounded-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
