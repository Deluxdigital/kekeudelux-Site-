import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BeamsBackground } from "@/components/ui/beams-background";
interface PortfolioItem {
  id: string;
  name: string;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "neutrogena-ambos",
    name: "Neutrogena & Ambos Marcam - Campanhas e eventos",
    image: "/src/assets/portfolio-neutrogena-ambos.png",
  },
  {
    id: "davi-brega-paredao",
    name: "Davi Brega & Paredão - Identidade visual e capas",
    image: "/src/assets/portfolio-davi-brega.png",
  },
  {
    id: "theuzinho-favela",
    name: "Theuzinho - A Favela tá no Foco 3.0 - Projeto visual completo",
    image: "/src/assets/portfolio-theuzinho.png",
  },
];

const Portfolio = () => {
  const [hoveredItem, setHoveredItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="relative py-24 px-4 overflow-hidden">
      <BeamsBackground className="absolute inset-0 -z-10 opacity-70" intensity="subtle" />
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">Meu trabalho</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Portfólio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Uma seleção de projetos autorais que traduzem conexão, impacto e criatividade em cada detalhe.
          </p>
          <Button
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => window.open("https://www.behance.net/kekeudeluux", "_blank")}
          >
            Ver Behance Completo →
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.5)] cursor-pointer"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem((current) => (current?.id === item.id ? null : current))}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Passe o mouse para ver em tela cheia</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {hoveredItem && (
          <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
            <div className="relative max-w-5xl w-full px-4">
              <div className="overflow-hidden rounded-3xl border border-primary/40 bg-background/80 shadow-[0_0_80px_hsl(var(--neon-purple)/0.6)]">
                <img
                  src={hoveredItem.image}
                  alt={hoveredItem.name}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
