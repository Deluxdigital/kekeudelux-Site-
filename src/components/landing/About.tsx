import { BeamsBackground } from "@/components/ui/beams-background";
import profilePortrait from "@/assets/profile-portrait.png";

const About = () => {
  return (
    <section id="sobre" className="relative py-24 px-4 overflow-hidden">
      {/* fundo com mesmo efeito gradiente animado do herói */}
      <BeamsBackground className="absolute inset-0 -z-10" intensity="strong" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">
                Quem é KekeuDelux
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Kleberson Souza dos Santos
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Designer gráfico e motion designer, atuando há mais de
                <strong className="text-foreground"> 5 anos</strong> no mercado
                criativo.
              </p>

              <p>
                Minha trajetória é marcada por dedicação, evolução constante e
                paixão pelo design. Venho me destacando ao longo do tempo pela
                criatividade, identidade visual forte e pela busca contínua por
                entregar trabalhos que unem estética, impacto e profissionalismo.
              </p>

              <p className="italic border-l-4 border-primary pl-4">
                "Saí de onde poucos acreditavam ser possível e hoje construo
                minha história com talento, visão e consistência no mercado
                criativo."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">
                  Anos de Experiência
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Criatividade</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-neon-purple/30 via-neon-blue/25 to-neon-cyan/25 border-2 border-primary/40 overflow-hidden shadow-[0_0_50px_hsl(var(--neon-purple)/0.6)]">
              <img
                src={profilePortrait}
                alt="Foto de Kleberson Souza dos Santos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
