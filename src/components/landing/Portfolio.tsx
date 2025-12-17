import { Button } from "@/components/ui/button";

interface PortfolioItem {
  id: string;
  name: string;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "capa",
    name: "Neutrogena - Quando a originalidade pede licença",
    image: "/src/assets/CAPA.png",
  },
  {
    id: "resultados-que-inspiram",
    name: "Neutrogena - Resultados que inspiram",
    image: "/src/assets/RESULTAADOS-QUE-INSPIRAM.png",
  },
  {
    id: "encerramento",
    name: "Neutrogena - Influência é sobre conexão",
    image: "/src/assets/ENCERRAMENTO.png",
  },
  {
    id: "o-evento",
    name: "Neutrogena - O evento",
    image: "/src/assets/O-EVENTO.png",
  },
  {
    id: "ambos-marcam-capa",
    name: "Ambos Marcam - Quando o jogo acaba o impacto continua",
    image: "/src/assets/CAPA_CARROSSEL_AMBOS.png",
  },
  {
    id: "ambos-marcam-card-2",
    name: "Ambos Marcam - Saúde mental não é pauta secundária",
    image: "/src/assets/CARD_CARROSSEL_AMBOS_2.png",
  },
  {
    id: "ambos-marcam-card-4",
    name: "Ambos Marcam - A gincana não é só entretenimento",
    image: "/src/assets/CARD_CARROSSEL_AMBOS_4.png",
  },
  {
    id: "ambos-marcam-logo",
    name: "Ambos Marcam - Identidade visual",
    image: "/src/assets/CARD_FINAL.png",
  },
  {
    id: "z4-artes",
    name: "Z4 Store - Artes de lançamento de produtos",
    image: "/src/assets/artes.png",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">Meu trabalho</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Portfólio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Uma seleção de projetos autorais que traduzem conexão, impacto e criatividade em cada detalhe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
