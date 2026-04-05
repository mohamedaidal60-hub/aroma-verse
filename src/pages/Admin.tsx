import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sql } from "@/lib/neon";
import { Shield, Database, Users, Settings, Activity, Plus, Trash, Edit } from "lucide-react";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("b2b");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
      fetchData(activeTab);
    }
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email === "mohamed@aroma-verse.com" && password === "@sba-Trs2026") {
        setIsAuthenticated(true);
        localStorage.setItem("adminAuth", "true");
        toast.success("Connexion réussie");
        fetchData("b2b");
      } else {
        toast.error("Identifiants incorrects");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (tab: string) => {
    setLoading(true);
    try {
      let data = [];
      if (tab === "b2b") data = await sql`SELECT id, name as title, supplier as subtitle FROM b2b_products ORDER BY id DESC LIMIT 20`;
      if (tab === "academy") data = await sql`SELECT id, title, source as subtitle FROM academy_courses ORDER BY id DESC LIMIT 20`;
      if (tab === "marketplace") data = await sql`SELECT id, title, creator as subtitle FROM marketplace_items ORDER BY id DESC LIMIT 20`;
      if (tab === "investments") data = await sql`SELECT id, project_name as title, founder as subtitle FROM investments ORDER BY id DESC LIMIT 20`;
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`Élément ${id} supprimé.`);
    setItems(items.filter(i => i.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="glass-card w-full max-w-md p-8 rounded-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full text-primary"><Shield size={40} /></div>
          </div>
          <h1 className="text-2xl font-display font-bold text-center mb-6">Accès Administrateur</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email administrateur" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full bg-gradient-gold shadow-gold" disabled={loading}>Se connecter</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
              <Shield className="text-primary" /> AromaVerse Admin
            </h1>
            <Button variant="outline" onClick={() => { setIsAuthenticated(false); localStorage.removeItem("adminAuth"); }}>Déconnexion</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[{id: "b2b", label: "Store B2B", icon: <Database />}, {id: "academy", label: "Academy", icon: <Settings />}, {id: "marketplace", label: "Marketplace", icon: <Users />}, {id: "investments", label: "Investissements", icon: <Activity />}].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`glass-card p-6 rounded-xl flex items-center gap-4 transition-all ${activeTab === tab.id ? 'border-primary bg-primary/5' : 'hover:border-primary/30'}`}>
                <div className={`p-3 rounded-lg ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{tab.icon}</div>
                <div className="text-left font-bold">{tab.label}</div>
              </button>
            ))}
          </div>

          <div className="glass-card p-8 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold uppercase">{activeTab}</h2>
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-white" onClick={() => toast.success("Module d'ajout ouvert")}><Plus size={16} /> Ajouter</Button>
            </div>
            {loading ? <p className="text-muted-foreground">Chargement des données de Neon DB...</p> : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast.success("Mode édition")}><Edit size={14} /></Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-white" onClick={() => handleDelete(item.id)}><Trash size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Admin;
