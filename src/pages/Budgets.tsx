import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import { generateBudgetPDF } from "@/utils/pdfGenerator";
import logo from "@/assets/logo-dlx.png";

const Budgets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    client_id: "",
    service_type: "",
    description: "",
    discount: 0,
    total_value: 0,
    status: "draft",
  });

  useEffect(() => {
    fetchBudgets();
    fetchClients();
  }, [user]);

  const fetchBudgets = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("budgets")
      .select("*, clients(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setBudgets(data || []);
    setLoading(false);
  };

  const fetchClients = async () => {
    if (!user) return;
    const { data } = await supabase.from("clients").select("*").eq("user_id", user.id);
    setClients(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const code = `#${new Date().getFullYear()}-${String(budgets.length + 1).padStart(3, "0")}`;
    const { error } = await supabase
      .from("budgets")
      .insert([{ ...formData, code, user_id: user.id }]);

    if (error) {
      toast({ title: "Erro ao criar orçamento", variant: "destructive" });
    } else {
      toast({ title: "Orçamento criado!" });
      fetchBudgets();
      setDialogOpen(false);
    }
  };

  const handleExportPDF = async (budget: any) => {
    const imgToBase64 = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    const logoBase64 = await imgToBase64(logo);
    
    await generateBudgetPDF({
      code: budget.code,
      clientName: budget.clients?.name || "Cliente não especificado",
      serviceType: budget.service_type,
      items: [{ name: budget.description || "Serviço", quantity: 1, unit_price: budget.total_value, subtotal: budget.total_value }],
      discount: budget.discount,
      total_value: budget.total_value,
      date: new Date(budget.created_at).toLocaleDateString("pt-BR"),
      logoBase64,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Orçamentos</h1>
            <p className="text-muted-foreground">Gerencie seus orçamentos</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />Novo Orçamento</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Novo Orçamento</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select value={formData.client_id} onValueChange={(value) => setFormData({ ...formData, client_id: value })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>{clients.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Serviço</Label>
                  <Input value={formData.service_type} onChange={(e) => setFormData({ ...formData, service_type: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Valor Total</Label>
                  <Input type="number" step="0.01" value={formData.total_value} onChange={(e) => setFormData({ ...formData, total_value: Number(e.target.value) })} required />
                </div>
                <Button type="submit" className="w-full">Criar Orçamento</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell className="font-medium">{budget.code}</TableCell>
                  <TableCell>{budget.clients?.name || "-"}</TableCell>
                  <TableCell>{budget.service_type}</TableCell>
                  <TableCell>R$ {budget.total_value.toFixed(2)}</TableCell>
                  <TableCell className="capitalize">{budget.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleExportPDF(budget)}><Download className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budgets;
