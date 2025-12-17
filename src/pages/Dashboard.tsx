import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, ListTodo, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    clients: 0,
    budgets: 0,
    budgetsApproved: 0,
    budgetsApprovedValue: 0,
    tasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const [clientsRes, budgetsRes, tasksRes, budgetsApprovedRes, budgetsApprovedValuesRes] = await Promise.all([
        supabase.from("clients").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("budgets").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("tasks").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "pending"),
        supabase
          .from("budgets")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("status", "approved"),
        supabase
          .from("budgets")
          .select("total_value")
          .eq("user_id", user.id)
          .eq("status", "approved"),
      ]);

      const approvedBudgetsTotalValue =
        budgetsApprovedValuesRes.data?.reduce(
          (sum, budget) => sum + (budget.total_value || 0),
          0,
        ) || 0;

      setStats({
        clients: clientsRes.count || 0,
        budgets: budgetsRes.count || 0,
        budgetsApproved: budgetsApprovedRes.count || 0,
        budgetsApprovedValue: approvedBudgetsTotalValue,
        tasks: tasksRes.count || 0,
      });
    };

    fetchStats();
  }, [user]);

  const cards = [
    {
      title: "Clientes Ativos",
      value: stats.clients,
      icon: Users,
      description: "Total de clientes cadastrados",
    },
    {
      title: "Orçamentos do Mês",
      value: stats.budgets,
      icon: FileText,
      description: `${stats.budgetsApproved} aprovados`,
    },
    {
      title: "Tarefas Pendentes",
      value: stats.tasks,
      icon: ListTodo,
      description: "Tarefas aguardando conclusão",
    },
    {
      title: "Valor Fechado (Aprovados)",
      value: stats.budgetsApprovedValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }),
      icon: TrendingUp,
      description: "Soma dos orçamentos aprovados",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu painel de gerenciamento</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
