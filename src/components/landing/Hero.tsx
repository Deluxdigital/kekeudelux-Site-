import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto text-center md:text-left">
        <div className="relative max-w-3xl animate-fade-in">
          {/* brilho forte atrás do título */}
          <div className="pointer-events-none absolute -inset-x-10 -top-10 -bottom-6 -z-10 bg-[radial-gradient(circle_at_left,hsl(var(--neon-purple)/0.6)_0%,transparent_55%),radial-gradient(circle_at_bottom_left,hsl(var(--neon-blue)/0.5)_0%,transparent_55%),radial-gradient(circle_at_bottom,hsl(var(--neon-cyan)/0.5)_0%,transparent_55%)] opacity-80 blur-3xl" />

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
      </div>
    </section>
  );
};

export default Hero;
