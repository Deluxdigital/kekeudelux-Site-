import { Link } from "react-router-dom";
import logo from "@/assets/logo-dlx.png";
import { SaveButton } from "@/components/ui/save-button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="KekeuDelux" className="h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#inicio"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Início
            </a>
            <a
              href="#sobre"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Sobre
            </a>
            <a
              href="#servicos"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Serviços
            </a>
            <a
              href="#portfolio"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Portfólio
            </a>
            <a
              href="#contato"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contato
            </a>
            <Link to="/login">
              <SaveButton
                text={{ idle: "Entrar", saving: "Entrando...", saved: "Pronto" }}
                className="ml-2"
              />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
