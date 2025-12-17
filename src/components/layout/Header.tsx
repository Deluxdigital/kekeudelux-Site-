import { Link } from "react-router-dom";
import logo from "@/assets/logo-dlx.png";
import { SaveButton } from "@/components/ui/save-button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center gap-6">
          {/* Logo maior e mais visível */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="KekeuDelux" className="h-14 w-auto" />
          </Link>

          {/* Navegação centralizada */}
          <nav className="flex-1 flex items-center justify-center gap-8">
            {[
              { href: "#inicio", label: "Início" },
              { href: "#sobre", label: "Sobre" },
              { href: "#servicos", label: "Serviços" },
              { href: "#portfolio", label: "Portfólio" },
              { href: "#contato", label: "Contato" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-all duration-200 hover:text-foreground hover:drop-shadow-[0_0_12px_hsl(var(--foreground)/0.95)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botão Entrar alinhado à direita */}
          <div className="hidden md:flex items-center">
            <Link to="/login">
              <SaveButton
                text={{ idle: "Entrar", saving: "Entrando...", saved: "Pronto" }}
                className="ml-2 rounded-full border border-foreground/40 bg-background/60 hover:bg-background/90 shadow-[0_0_14px_hsl(var(--foreground)/0.55)]"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
