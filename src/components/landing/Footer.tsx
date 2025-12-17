import logo from "@/assets/logo-dlx.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logo} alt="KekeuDelux" className="h-10 w-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Design gráfico e motion designer para marcas que querem impacto visual.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links Rápidos</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#inicio" className="block hover:text-primary transition-colors">
                Início
              </a>
              <a href="#sobre" className="block hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#servicos" className="block hover:text-primary transition-colors">
                Serviços
              </a>
              <a href="#portfolio" className="block hover:text-primary transition-colors">
                Portfólio
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Redes Sociais</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a
                href="https://www.behance.net/kekeudeluux"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                Behance
              </a>
              <a
                href="https://instagram.com/kekeudelux"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KekeuDelux. Todos os direitos reservados.</p>
          <p className="mt-2">CNPJ: 45.735.338/0001-20 | Email: agenciadelux20@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
