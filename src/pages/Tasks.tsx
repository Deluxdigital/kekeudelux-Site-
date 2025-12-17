import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, CheckCircle } from "lucide-react";

const Tasks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client_id: "",
    due_date: "",
    priority: "medium",
    status: "pending",
  });

  useEffect(() => {
    fetchTasks();
    fetchClients();
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    const { data } = await supabase.from("tasks").select("*, clients(name)").eq("user_id", user.id).order("created_at", { ascending: false });
    setTasks(data || []);
  };

  const fetchClients = async () => {
    if (!user) return;
    const { data } = await supabase.from("clients").select("*").eq("user_id", user.id);
    setClients(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("tasks").insert([{ ...formData, user_id: user.id }]);
    if (error) {
      toast({ title: "Erro ao criar tarefa", variant: "destructive" });
    } else {
      toast({ title: "Tarefa criada!" });
      fetchTasks();
      setDialogOpen(false);
    }
  };

  const toggleComplete = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    await supabase.from("tasks").update({ status: newStatus }).eq("id", id);
    fetchTasks();
  };

  const filterTasks = (status: string) => {
    if (status === "overdue") {
      return tasks.filter(t => t.status !== "completed" && new Date(t.due_date) < new Date());
    }
    return tasks.filter(t => t.status === status);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div><h1 className="text-4xl font-bold">Tarefas</h1><p className="text-muted-foreground">Gerencie suas tarefas diárias</p></div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />Nova Tarefa</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nova Tarefa</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><Label>Título</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                <div><Label>Cliente</Label><Select value={formData.client_id} onValueChange={(value) => setFormData({ ...formData, client_id: value })}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{clients.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}</SelectContent></Select></div>
                <div><Label>Descrição</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
                <div><Label>Data de Entrega</Label><Input type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} /></div>
                <div><Label>Prioridade</Label><Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Baixa</SelectItem><SelectItem value="medium">Média</SelectItem><SelectItem value="high">Alta</SelectItem></SelectContent></Select></div>
                <Button type="submit" className="w-full">Criar Tarefa</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="pending">
          <TabsList><TabsTrigger value="pending">Pendentes ({filterTasks("pending").length})</TabsTrigger><TabsTrigger value="completed">Concluídas ({filterTasks("completed").length})</TabsTrigger><TabsTrigger value="overdue">Atrasadas ({filterTasks("overdue").length})</TabsTrigger></TabsList>
          {["pending", "completed", "overdue"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {filterTasks(status).map((task) => (
                <div key={task.id} className="p-4 border rounded-lg flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      {task.clients && <span>Cliente: {task.clients.name}</span>}
                      {task.due_date && <span>Prazo: {new Date(task.due_date).toLocaleDateString("pt-BR")}</span>}
                      <span className="capitalize">Prioridade: {task.priority}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleComplete(task.id, task.status)}><CheckCircle className={`h-5 w-5 ${task.status === "completed" ? "text-green-500" : ""}`} /></Button>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
