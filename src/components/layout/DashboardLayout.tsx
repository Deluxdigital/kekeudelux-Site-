import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo-dlx.png";
import { LayoutDashboard, Users, FileText, ListTodo, LogOut } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/dashboard/clients", label: "Clientes", icon: Users },
    { path: "/dashboard/budgets", label: "Orçamentos", icon: FileText },
    { path: "/dashboard/tasks", label: "Tarefas", icon: ListTodo },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card p-6 z-20">
        <div className="mb-8">
          <img src={logo} alt="KekeuDelux" className="h-10 w-auto mb-4" />
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      : ""
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-start border-destructive/50 text-destructive hover:bg-destructive/10"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      <main className="relative ml-64 p-8">
        <BeamsBackground className="absolute inset-0 -z-10 opacity-70" intensity="subtle" />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
