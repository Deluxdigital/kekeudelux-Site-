const services = [
  {
    title: "Identidade Visual",
    description: "Criação de logos, paletas de cores e guias de marca que traduzem a essência do seu negócio.",
    icon: "🎯",
  },
  {
    title: "Social Media Design",
    description: "Artes para redes sociais que engajam, convertem e fortalecem sua presença digital.",
    icon: "📱",
  },
  {
    title: "Motion Graphics",
    description: "Animações e vídeos motion que dão vida às suas ideias e comunicam com movimento.",
    icon: "🎬",
  },
  {
    title: "Edição & Tratamento",
    description: "Edição profissional de conteúdo visual para criadores e marcas que buscam qualidade.",
    icon: "✨",
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">O que eu faço</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Serviços & Especialidades</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Design que comunica, motion que emociona, e resultados que transformam sua marca.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
