import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      if (tab === "users") {
        data = await sql`SELECT id, name as title, email as subtitle, role as details, current_plan as extra, created_at FROM users ORDER BY created_at DESC`;
      } else if (tab === "products") {
        data = await sql`SELECT id, title, category as subtitle, price::text as extra, description as details FROM products ORDER BY created_at DESC`;
      } else if (tab === "academy") {
        data = await sql`SELECT id, title, level::text as subtitle, description as details FROM courses ORDER BY level ASC`;
      } else if (tab === "investments") {
        data = await sql`SELECT id, title, location as subtitle, roi_range as extra, progress::text as details FROM investment_projects ORDER BY created_at DESC`;
      }
      setItems(data);
    } catch (err) {
      console.error(err);
      toast.error("Erreur de chargement: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    try {
      if (activeTab === "users") await sql`DELETE FROM users WHERE id = ${id}`;
      else if (activeTab === "products") await sql`DELETE FROM products WHERE id = ${id}`;
      else if (activeTab === "academy") await sql`DELETE FROM courses WHERE id = ${id}`;
      else if (activeTab === "investments") await sql`DELETE FROM investment_projects WHERE id = ${id}`;
      
      toast.success(`Élément supprimé.`);
      fetchData(activeTab);
    } catch (e: any) {
      toast.error("Erreur de suppression: " + e.message);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle) return toast.error("Le titre est requis.");
    try {
        if (activeTab === "products") {
          const slug = newItemTitle.toLowerCase().replace(/ /g, '-');
          await sql`INSERT INTO products (title, slug, category, price) VALUES (${newItemTitle}, ${slug}, ${newItemSubtitle || 'Matières Premières'}, 0)`;
        } else if (activeTab === "academy") {
          await sql`INSERT INTO courses (title, level, description) VALUES (${newItemTitle}, 0, ${newItemSubtitle})`;
        } else if (activeTab === "investments") {
          await sql`INSERT INTO investment_projects (title, location, roi_range) VALUES (${newItemTitle}, ${newItemSubtitle}, '10-15%')`;
        }
        
        toast.success("Élément ajouté à la base de données !");
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
          if (activeTab === "products") await sql`UPDATE products SET title = ${editTitle}, category = ${editSubtitle} WHERE id = ${editingItem.id}`;
          else if (activeTab === "academy") await sql`UPDATE courses SET title = ${editTitle}, level = ${parseInt(editSubtitle) || 0} WHERE id = ${editingItem.id}`;
          else if (activeTab === "investments") await sql`UPDATE investment_projects SET title = ${editTitle}, location = ${editSubtitle} WHERE id = ${editingItem.id}`;
          else if (activeTab === "users") await sql`UPDATE users SET name = ${editTitle}, role = ${editSubtitle} WHERE id = ${editingItem.id}`;
          
          toast.success("Mise à jour réussie !");
          setEditingItem(null);
          fetchData(activeTab);
      } catch (e: any) {
          toast.error("Erreur de mise à jour: " + e.message);
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

  const canAdd = ["products", "academy", "investments"].includes(activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3"><Shield className="text-gold" /> Nexus Admin</h1>
            <Button variant="outline" className="border-white/10" onClick={() => { setIsAuthenticated(false); localStorage.removeItem("adminAuth"); }}>Déconnexion</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
                {id: "users", label: "Utilisateurs", icon: <Users size={18}/>},
                {id: "products", label: "Catalogue", icon: <ShoppingBag size={18}/>}, 
                {id: "academy", label: "Academy", icon: <Settings size={18}/>}, 
                {id: "investments", label: "Invests", icon: <Activity size={18}/>}
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`glass-card p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${activeTab === tab.id ? 'border-gold bg-gold/5' : 'hover:border-gold/30'}`}>
                <div className={`${activeTab === tab.id ? 'text-gold' : 'text-muted-foreground'}`}>{tab.icon}</div>
                <div className="text-sm font-bold text-center">{tab.label}</div>
              </button>
            ))}
          </div>

          <div className="glass-card p-8 rounded-[32px] border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-semibold uppercase flex items-center gap-2">Gestion : {activeTab}</h2>
                {canAdd && !showAddForm && !editingItem && (
                    <Button onClick={() => setShowAddForm(true)} className="bg-gold hover:bg-gold/80 text-black font-bold gap-2"><Plus size={16}/> Ajouter</Button>
                )}
            </div>

            {showAddForm && (
                <form onSubmit={handleAddItem} className="bg-white/5 p-6 rounded-2xl border border-gold/20 mb-6 flex flex-col gap-4 relative animate-in fade-in slide-in-from-top-4">
                    <Button variant="ghost" size="icon" type="button" className="absolute top-2 right-2 text-muted-foreground" onClick={() => setShowAddForm(false)}>
                        <X size={16}/>
                    </Button>
                    <h3 className="font-bold text-lg text-gold">Nouveau Élément</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Titre / Nom" value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)} required className="bg-black/40 h-12" />
                        <Input placeholder="Infos / Catégorie" value={newItemSubtitle} onChange={e => setNewItemSubtitle(e.target.value)} className="bg-black/40 h-12" />
                    </div>
                    <Button type="submit" className="bg-gold text-black font-bold self-end px-8 rounded-xl h-12">Sauvegarder</Button>
                </form>
            )}

            {editingItem && (
                <form onSubmit={handleUpdate} className="bg-white/5 p-6 rounded-2xl border border-gold/20 mb-6 flex flex-col gap-4 relative animate-in fade-in slide-in-from-top-4">
                    <Button variant="ghost" size="icon" type="button" className="absolute top-2 right-2 text-muted-foreground" onClick={() => setEditingItem(null)}>
                        <X size={16}/>
                    </Button>
                    <h3 className="font-bold text-lg text-gold">Modifier Élément (ID: {editingItem.id.substring(0, 8)}...)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">Titre Principal</label>
                            <Input placeholder="Modifier le titre" value={editTitle} onChange={e => setEditTitle(e.target.value)} required className="bg-black/40 h-12" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">Infos / Détails</label>
                            <Input placeholder="Modifier les infos" value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} className="bg-black/40 h-12" />
                        </div>
                    </div>
                    <Button type="submit" className="bg-gold text-black font-bold self-end px-8 rounded-xl h-12">Appliquer</Button>
                </form>
            )}

            {loading ? <p className="text-muted-foreground animate-pulse">Chargement Neon DB...</p> : (
              <div className="space-y-4">
                {items.length === 0 ? <p className="text-muted-foreground">Aucune donnée trouvée.</p> : items.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors gap-4 border border-white/5">
                    <div className="flex-1">
                      <p className="font-bold text-lg">{item.title}</p>
                      <div className="flex gap-4 mt-1">
                         <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full text-gold uppercase font-bold tracking-widest">{item.subtitle}</span>
                         {item.details && <span className="text-[10px] text-muted-foreground">Info: {item.details}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {item.extra && <p className="font-bold text-white text-lg">{item.extra}</p>}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-white/10 hover:bg-white/10" onClick={() => startEdit(item)}>Modifier</Button>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(item.id)}><Trash size={14} /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
