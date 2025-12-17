import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contato" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold">
            Vamos criar algo
            <br />
            <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              incrível juntos?
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seja para transformar sua marca, criar conteúdo visual de impacto ou dar vida às suas ideias com motion design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all"
              onClick={() => window.open("https://wa.me/seu-numero-aqui", "_blank")}
            >
              Falar no WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
              onClick={() => window.open("https://www.behance.net/kekeudeluux", "_blank")}
            >
              Ver Portfólio no Behance
            </Button>
          </div>

          <div className="pt-12 text-sm text-muted-foreground">
            <p>Email: agenciadelux20@gmail.com</p>
            <p>CNPJ: 45.735.338/0001-20</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
