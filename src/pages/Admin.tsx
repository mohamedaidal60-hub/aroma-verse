import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sql } from "@/lib/neon";
import { Shield, Database, Users, Settings, Activity, Trash, Check, UserCheck, ShoppingBag, Plus, X } from "lucide-react";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [items, setItems] = useState<any[]>([]);
  
  // Edit item state
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  
  // Add item form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemSubtitle, setNewItemSubtitle] = useState("");

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
        fetchData("orders");
      } else {
        toast.error("Identifiants incorrects");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (tab: string) => {
    setLoading(true);
    setShowAddForm(false);
    setEditingItem(null);
    try {
      let data = [];
      if (tab === "orders") data = await sql`SELECT id, email as title, continent as subtitle, items as details, total_price as extra, status FROM orders ORDER BY id DESC`;
      else if (tab === "subscriptions") data = await sql`SELECT id, email as title, continent as subtitle, status FROM subscriptions ORDER BY id DESC`;
      else if (tab === "b2b") data = await sql`SELECT id, name as title, supplier as subtitle FROM b2b_products ORDER BY id DESC LIMIT 50`;
      else if (tab === "academy") data = await sql`SELECT id, title, source as subtitle FROM academy_courses ORDER BY id DESC LIMIT 50`;
      else if (tab === "marketplace") data = await sql`SELECT id, title, creator as subtitle FROM marketplace_items ORDER BY id DESC LIMIT 50`;
      else if (tab === "investments") data = await sql`SELECT id, project_name as title, founder as subtitle FROM investments ORDER BY id DESC LIMIT 50`;
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    try {
      if (activeTab === "b2b") await sql`DELETE FROM b2b_products WHERE id = ${id}`;
      else if (activeTab === "academy") await sql`DELETE FROM academy_courses WHERE id = ${id}`;
      else if (activeTab === "marketplace") await sql`DELETE FROM marketplace_items WHERE id = ${id}`;
      else if (activeTab === "investments") await sql`DELETE FROM investments WHERE id = ${id}`;
      else if (activeTab === "orders") await sql`DELETE FROM orders WHERE id = ${id}`;
      else if (activeTab === "subscriptions") await sql`DELETE FROM subscriptions WHERE id = ${id}`;
      toast.success(`Élément ${id} supprimé.`);
      fetchData(activeTab);
    } catch (e: any) {
      toast.error("Erreur de suppression: " + e.message);
    }
  };

  const handleValidateSub = async (id: number) => {
    try {
        await sql`UPDATE subscriptions SET status = 'Actif' WHERE id = ${id}`;
        toast.success("Abonnement validé !");
        fetchData(activeTab);
    } catch (e: any) {
        toast.error("Valid error: " + e.message);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle) return toast.error("Le titre est requis.");
    try {
        if (activeTab === "b2b") await sql`INSERT INTO b2b_products (name, supplier, price_per_unit, unit, category, origin) VALUES (${newItemTitle}, ${newItemSubtitle || 'Générique'}, 0, 'pc', 'Divers', 'Global')`;
        else if (activeTab === "academy") await sql`INSERT INTO academy_courses (title, source, content, estimated_time) VALUES (${newItemTitle}, ${newItemSubtitle || 'Interne'}, 'Nouveau cours ajouté par l\'administrateur.', '5 min')`;
        else if (activeTab === "marketplace") await sql`INSERT INTO marketplace_items (title, creator, description, price, category) VALUES (${newItemTitle}, ${newItemSubtitle || 'Admin'}, 'Description non définie.', 0, 'Divers')`;
        else if (activeTab === "investments") await sql`INSERT INTO investments (project_name, founder, description, goal_amount, current_amount, roi_percentage) VALUES (${newItemTitle}, ${newItemSubtitle || 'N/A'}, 'Nouveau projet.', 100000, 0, 10)`;
        
        toast.success("L'élément a été correctement ajouté à votre base de données Neon !");
        setNewItemTitle("");
        setNewItemSubtitle("");
        setShowAddForm(false);
        fetchData(activeTab);
    } catch(e: any) {
        toast.error("Erreur lors de l'ajout: " + e.message);
    }
  };

  const startEdit = (item: any) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditSubtitle(item.subtitle);
    setShowAddForm(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          if (activeTab === "b2b") await sql`UPDATE b2b_products SET name = ${editTitle}, supplier = ${editSubtitle} WHERE id = ${editingItem.id}`;
          else if (activeTab === "academy") await sql`UPDATE academy_courses SET title = ${editTitle}, source = ${editSubtitle} WHERE id = ${editingItem.id}`;
          else if (activeTab === "marketplace") await sql`UPDATE marketplace_items SET title = ${editTitle}, creator = ${editSubtitle} WHERE id = ${editingItem.id}`;
          else if (activeTab === "investments") await sql`UPDATE investments SET project_name = ${editTitle}, founder = ${editSubtitle} WHERE id = ${editingItem.id}`;
          else if (activeTab === "orders") await sql`UPDATE orders SET email = ${editTitle}, continent = ${editSubtitle} WHERE id = ${editingItem.id}`;
          else if (activeTab === "subscriptions") await sql`UPDATE subscriptions SET email = ${editTitle}, continent = ${editSubtitle} WHERE id = ${editingItem.id}`;
          
          toast.success("Mise à jour réussie dans Neon DB !");
          setEditingItem(null);
          fetchData(activeTab);
      } catch (e: any) {
          toast.error("Erreur lors de la mise à jour: " + e.message);
      }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="glass-card w-full max-w-md p-8 rounded-2xl">
          <div className="flex justify-center mb-6"><div className="p-4 bg-primary/10 rounded-full text-primary"><Shield size={40} /></div></div>
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

  const canAdd = ["b2b", "academy", "marketplace", "investments"].includes(activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3"><Shield className="text-primary" /> AromaVerse Panel</h1>
            <Button variant="outline" onClick={() => { setIsAuthenticated(false); localStorage.removeItem("adminAuth"); }}>Déconnexion</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            {[
                {id: "orders", label: "Commandes", icon: <ShoppingBag size={18}/>},
                {id: "subscriptions", label: "Abonnements", icon: <UserCheck size={18}/>},
                {id: "b2b", label: "Store B2B", icon: <Database size={18}/>}, 
                {id: "academy", label: "Academy", icon: <Settings size={18}/>}, 
                {id: "marketplace", label: "Market", icon: <Users size={18}/>}, 
                {id: "investments", label: "Invests", icon: <Activity size={18}/>}
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`glass-card p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${activeTab === tab.id ? 'border-primary bg-primary/5' : 'hover:border-primary/30'}`}>
                <div className={`${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'}`}>{tab.icon}</div>
                <div className="text-sm font-bold text-center">{tab.label}</div>
              </button>
            ))}
          </div>

          <div className="glass-card p-8 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-semibold uppercase flex items-center gap-2">Gestion : {activeTab}</h2>
                {canAdd && !showAddForm && !editingItem && (
                    <Button onClick={() => setShowAddForm(true)} className="bg-primary hover:bg-primary/90 gap-2"><Plus size={16}/> Ajouter un produit</Button>
                )}
            </div>

            {showAddForm && (
                <form onSubmit={handleAddItem} className="bg-secondary/30 p-6 rounded-xl border border-primary/20 mb-6 flex flex-col gap-4 relative animate-in fade-in slide-in-from-top-4">
                    <Button variant="ghost" size="icon" type="button" className="absolute top-2 right-2 text-muted-foreground" onClick={() => setShowAddForm(false)}>
                        <X size={16}/>
                    </Button>
                    <h3 className="font-bold text-lg text-primary">Nouveau Produit / Élément</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Titre / Nom de l'élément" value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)} required />
                        <Input placeholder="Fournisseur / Créateur / Source" value={newItemSubtitle} onChange={e => setNewItemSubtitle(e.target.value)} />
                    </div>
                    <Button type="submit" className="bg-green-500 hover:bg-green-600 self-end px-8 text-white">Sauvegarder dans Neon DB</Button>
                </form>
            )}

            {editingItem && (
                <form onSubmit={handleUpdate} className="bg-primary/10 p-6 rounded-xl border border-primary/40 mb-6 flex flex-col gap-4 relative animate-in fade-in slide-in-from-top-4">
                    <Button variant="ghost" size="icon" type="button" className="absolute top-2 right-2 text-muted-foreground" onClick={() => setEditingItem(null)}>
                        <X size={16}/>
                    </Button>
                    <h3 className="font-bold text-lg text-gradient-gold">Modifier l'Élément (ID: {editingItem.id})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">Titre Principal</label>
                            <Input placeholder="Modifier le titre" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">Sous-titre / Info</label>
                            <Input placeholder="Modifier les infos" value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} />
                        </div>
                    </div>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 self-end px-8 text-white">Appliquer les modifications</Button>
                </form>
            )}

            {loading ? <p className="text-muted-foreground">Chargement sécurisé depuis Neon DB...</p> : (
              <div className="space-y-4">
                {items.length === 0 ? <p className="text-muted-foreground">Aucune donnée trouvée.</p> : items.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg">{item.title} <span className="text-xs ml-2 bg-background px-2 py-1 rounded-full text-primary">{item.subtitle}</span></p>
                      {item.details && <p className="text-sm text-muted-foreground mt-1 break-all">📦 {item.details}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                      {item.extra && <p className="font-bold text-gradient-gold">{item.extra} €</p>}
                      {item.status && <span className={`text-xs px-2 py-1 rounded-md font-bold ${item.status === 'Actif' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>{item.status}</span>}
                      <div className="flex gap-2">
                        {activeTab === "subscriptions" && item.status !== 'Actif' && (
                            <Button size="sm" onClick={() => handleValidateSub(item.id)} className="bg-green-500 hover:bg-green-600 text-white"><Check size={14} /></Button>
                        )}
                        <Button variant="outline" size="sm" className="text-primary hover:bg-primary/10 border-primary/20" onClick={() => startEdit(item)}><Plus className="rotate-45" size={14} /> Modifier</Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-white" onClick={() => handleDelete(item.id)}><Trash size={14} /></Button>
                      </div>
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
}
