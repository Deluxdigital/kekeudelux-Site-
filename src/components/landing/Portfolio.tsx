import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface BehanceProject {
  id: string;
  name: string;
  covers: {
    "404": string;
  };
  url: string;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<BehanceProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Para integração real com Behance, você precisará de uma API key do Behance
    // Por enquanto, vamos usar dados mock que você pode substituir depois
    const mockProjects = [
      {
        id: "1",
        name: "Projeto de Identidade Visual",
        covers: { "404": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },
        url: "https://www.behance.net/kekeudeluux",
      },
      {
        id: "2",
        name: "Social Media Pack",
        covers: { "404": "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=600&h=400&fit=crop" },
        url: "https://www.behance.net/kekeudeluux",
      },
      {
        id: "3",
        name: "Motion Graphics Reel",
        covers: { "404": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop" },
        url: "https://www.behance.net/kekeudeluux",
      },
      {
        id: "4",
        name: "Brand Design",
        covers: { "404": "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop" },
        url: "https://www.behance.net/kekeudeluux",
      },
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">Meu trabalho</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Portfólio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Projetos selecionados direto do meu Behance. Design, motion e criatividade em cada detalhe.
          </p>
          <Button
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => window.open("https://www.behance.net/kekeudeluux", "_blank")}
          >
            Ver Behance Completo →
          </Button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.covers["404"]}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
