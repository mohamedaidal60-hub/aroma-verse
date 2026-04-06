import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sql } from "@/lib/neon";
import { 
  Shield, Users, Settings, Activity, Trash2, UserCheck, 
  ShoppingBag, Plus, X, AlertTriangle, Database, RefreshCw, Search, Eye, Globe
} from "lucide-react";

import { useLang } from "@/contexts/LanguageContext";

export default function Admin() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [items, setItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemSubtitle, setNewItemSubtitle] = useState("");
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [purgeTarget, setPurgeTarget] = useState<string | null>(null);
  const [dbStats, setDbStats] = useState<any>({});

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
      fetchData(activeTab);
      fetchDbStats();
    }
  }, [activeTab]);

  const fetchDbStats = async () => {
    try {
      const [users, products, courses, blog, invest] = await Promise.all([
        sql`SELECT COUNT(*) FROM users`,
        sql`SELECT COUNT(*) FROM products`,
        sql`SELECT COUNT(*) FROM courses`,
        sql`SELECT COUNT(*) FROM blog_posts`,
        sql`SELECT COUNT(*) FROM investment_projects`,
      ]);
      setDbStats({
        users: users[0]?.count || 0,
        products: products[0]?.count || 0,
        courses: courses[0]?.count || 0,
        blog: blog[0]?.count || 0,
        investments: invest[0]?.count || 0,
      });
    } catch (err) {
      console.error("Stats fetch failed", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email === "mohamed@aroma-verse.com" && password === "@sba-Trs2026") {
        setIsAuthenticated(true);
        localStorage.setItem("adminAuth", "true");
        toast.success("Connexion réussie à Nexus Admin — Vue Globale Activée");
        fetchData("products");
        fetchDbStats();
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
    setSearchQuery("");
    try {
      let data: any[] = [];
      if (tab === "users") {
        data = await sql`SELECT id, name as title, email as subtitle, role as details, current_plan as extra, created_at FROM users ORDER BY created_at DESC`;
      } else if (tab === "products") {
        data = await sql`SELECT id, title, category as subtitle, price::text as extra, description as details, created_at FROM products ORDER BY created_at DESC`;
      } else if (tab === "academy") {
        data = await sql`SELECT id, title, level::text as subtitle, description as details, created_at FROM courses ORDER BY level ASC`;
      } else if (tab === "investments") {
        data = await sql`SELECT id, title, location as subtitle, roi_range as extra, progress::text as details, created_at FROM investment_projects ORDER BY created_at DESC`;
      } else if (tab === "blog") {
        data = await sql`SELECT id, title, category as subtitle, is_published::text as extra, created_at FROM blog_posts ORDER BY created_at DESC`;
      }
      setItems(data);
    } catch (err: any) {
      toast.error("Erreur de chargement : " + err.message);
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
      else if (activeTab === "blog") await sql`DELETE FROM blog_posts WHERE id = ${id}`;
      toast.success("Élément supprimé.");
      fetchData(activeTab);
      fetchDbStats();
    } catch (e: any) {
      toast.error("Erreur de suppression : " + e.message);
    }
  };

  const handlePurgeAllSeeds = async () => {
    if (!purgeTarget) return;
    setLoading(true);
    try {
      if (purgeTarget === "products") await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;
      else if (purgeTarget === "academy") await sql`TRUNCATE TABLE courses RESTART IDENTITY CASCADE`;
      else if (purgeTarget === "investments") await sql`TRUNCATE TABLE investment_projects RESTART IDENTITY CASCADE`;
      else if (purgeTarget === "blog") await sql`TRUNCATE TABLE blog_posts RESTART IDENTITY CASCADE`;
      else if (purgeTarget === "all") {
        await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE courses RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE investment_projects RESTART IDENTITY CASCADE`;
        await sql`TRUNCATE TABLE blog_posts RESTART IDENTITY CASCADE`;
      }
      toast.success(`PURGE TERMINÉE : La table "${purgeTarget}" est vide et prête.`);
      setShowPurgeModal(false);
      setPurgeTarget(null);
      fetchData(activeTab);
      fetchDbStats();
    } catch (e: any) {
      toast.error("Erreur de purge : " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle) return toast.error("Le titre est requis.");
    try {
      if (activeTab === "products") {
        const slug = newItemTitle.toLowerCase().replace(/ /g, "-");
        await sql`INSERT INTO products (title, slug, category, price) VALUES (${newItemTitle}, ${slug}, ${newItemSubtitle || "Matières Premières"}, 0)`;
      } else if (activeTab === "academy") {
        await sql`INSERT INTO courses (title, level, description) VALUES (${newItemTitle}, 0, ${newItemSubtitle})`;
      } else if (activeTab === "investments") {
        await sql`INSERT INTO investment_projects (title, location, roi_range) VALUES (${newItemTitle}, ${newItemSubtitle}, "10-15%")`;
      } else if (activeTab === "blog") {
        const slug = newItemTitle.toLowerCase().replace(/ /g, "-");
        await sql`INSERT INTO blog_posts (title, slug, category, is_published) VALUES (${newItemTitle}, ${slug}, ${newItemSubtitle || "Général"}, false)`;
      }
      toast.success("Élément ajouté !");
      setNewItemTitle(""); setNewItemSubtitle(""); setShowAddForm(false);
      fetchData(activeTab); fetchDbStats();
    } catch (e: any) {
      toast.error("Erreur lors de l'ajout : " + e.message);
    }
  };

  const startEdit = (item: any) => { setEditingItem(item); setEditTitle(item.title); setEditSubtitle(item.subtitle || ""); setShowAddForm(false); };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === "products") await sql`UPDATE products SET title = ${editTitle}, category = ${editSubtitle} WHERE id = ${editingItem.id}`;
      else if (activeTab === "academy") await sql`UPDATE courses SET title = ${editTitle}, level = ${parseInt(editSubtitle) || 0} WHERE id = ${editingItem.id}`;
      else if (activeTab === "investments") await sql`UPDATE investment_projects SET title = ${editTitle}, location = ${editSubtitle} WHERE id = ${editingItem.id}`;
      else if (activeTab === "users") await sql`UPDATE users SET name = ${editTitle}, role = ${editSubtitle} WHERE id = ${editingItem.id}`;
      else if (activeTab === "blog") await sql`UPDATE blog_posts SET title = ${editTitle}, category = ${editSubtitle} WHERE id = ${editingItem.id}`;
      toast.success("Mise à jour réussie !");
      setEditingItem(null);
      fetchData(activeTab);
    } catch (e: any) {
      toast.error("Erreur de mise à jour : " + e.message);
    }
  };

  const filteredItems = items.filter(item =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 font-body">
        <div className="glass-card w-full max-w-md p-10 rounded-[40px] border border-white/10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gold/10 rounded-[24px] flex items-center justify-center text-gold border border-gold/20">
              <Shield size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-center mb-2">Nexus Admin</h1>
          <p className="text-center text-muted-foreground text-sm mb-8">Accès sécurisé à la console d'administration.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email administrateur" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-14 bg-black/40 border-white/10 rounded-2xl" />
            <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-14 bg-black/40 border-white/10 rounded-2xl" />
            <Button type="submit" className="w-full h-14 bg-gold hover:bg-gold/80 text-black font-black rounded-2xl shadow-gold" disabled={loading}>
              {loading ? "Vérification..." : "Accéder au Panel"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "products", label: "Catalogue", icon: <ShoppingBag size={18} />, count: dbStats.products },
    { id: "users", label: "Utilisateurs", icon: <Users size={18} />, count: dbStats.users },
    { id: "academy", label: "Academy", icon: <Settings size={18} />, count: dbStats.courses },
    { id: "investments", label: "Investissements", icon: <Activity size={18} />, count: dbStats.investments },
    { id: "blog", label: "Blog", icon: <Database size={18} />, count: dbStats.blog },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-black flex items-center gap-3">
                <Shield className="text-gold" /> Nexus Admin
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <Globe size={14} className="text-green-500" />
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Vue Globale : Afrique • Europe • Asie • Amérique • Océanie</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                  <UserCheck size={14} className="text-gold" />
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest">Admin : mohamed@aroma-verse.com</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2 border-white/10 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest" onClick={() => { fetchData(activeTab); fetchDbStats(); }}>
                <RefreshCw size={14} /> {t("common.search")}
              </Button>
              <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white h-12 rounded-xl text-[10px] font-black uppercase tracking-widest" onClick={() => { setIsAuthenticated(false); localStorage.removeItem("adminAuth"); }}>
                Déconnexion
              </Button>
            </div>
          </div>

          {/* DB Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {tabs.map(tab => (
              <div key={tab.id} className={`glass-card p-6 rounded-[32px] cursor-pointer transition-all ${activeTab === tab.id ? 'border-gold bg-gold/5' : 'border-white/5 hover:border-gold/30'}`} onClick={() => setActiveTab(tab.id)}>
                <div className={`mb-3 ${activeTab === tab.id ? 'text-gold' : 'text-muted-foreground'}`}>{tab.icon}</div>
                <p className="text-3xl font-black text-white tracking-tighter">{tab.count ?? '—'}</p>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{tab.label}</p>
              </div>
            ))}
          </div>

          {/* Purge Modal */}
          {showPurgeModal && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="glass-card rounded-[48px] p-12 max-w-md w-full border-2 border-red-500/30 bg-black shadow-2xl">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-400 mx-auto mb-8 animate-pulse">
                  <AlertTriangle size={40} />
                </div>
                <h3 className="text-3xl font-display font-black text-center mb-4 uppercase tracking-tighter">Purger la Table ?</h3>
                <p className="text-muted-foreground text-center mb-10 leading-relaxed">
                  Cette action va <strong className="text-red-400">supprimer DÉFINITIVEMENT</strong> toutes les données d'exemple de la table <strong className="text-white">"{purgeTarget}"</strong>. 
                  C'est l'étape recommandée avant la mise en production réelle.
                </p>
                <div className="flex flex-col gap-4">
                  <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-lg uppercase tracking-widest text-xs" onClick={handlePurgeAllSeeds} disabled={loading}>
                    {loading ? "Purge en cours..." : "OUI, TOUT EFFACER"}
                  </Button>
                  <Button variant="ghost" className="w-full h-12 text-muted-foreground hover:text-white font-bold" onClick={() => { setShowPurgeModal(false); setPurgeTarget(null); }}>
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="glass-card p-10 rounded-[48px] border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
              <div className="flex items-center gap-6">
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <span className="px-4 py-2 bg-gold/10 text-gold rounded-2xl text-xs font-black border border-gold/20 shadow-inner">
                  {filteredItems.length} entrées
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-72">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-5 h-5" />
                  <Input
                    placeholder="Chercher dans la liste..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-14 h-14 bg-black/60 border-white/5 rounded-2xl focus-visible:ring-gold/50"
                  />
                </div>
                
                <Button onClick={() => setShowAddForm(true)} className="h-14 bg-gold hover:bg-gold/80 text-black font-black gap-2 rounded-2xl px-8 shadow-gold uppercase tracking-widest text-xs">
                  <Plus size={18} /> Ajouter
                </Button>
                
                <Button
                  variant="outline"
                  className="h-14 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl gap-2 px-8 uppercase font-black tracking-widest text-xs transition-all"
                  onClick={() => { setPurgeTarget(activeTab); setShowPurgeModal(true); }}
                >
                  <Trash2 size={18} /> Purger
                </Button>
              </div>
            </div>

            {/* Global Purge Alert */}
            <div className="flex items-center gap-6 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-3xl p-8 mb-12 shadow-inner">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 flex-shrink-0">
                <AlertTriangle size={32} />
              </div>
              <div className="flex-1">
                <p className="font-black text-orange-400 text-lg uppercase tracking-tighter">Prêt pour la Production ?</p>
                <p className="text-sm text-muted-foreground max-w-2xl mt-1 leading-relaxed">
                  L'étape de <strong className="text-white">NETTOYAGE</strong> globale est nécessaire avant de remettre les clés au client. 
                  Cela videra toutes les tables de démonstration.
                </p>
              </div>
              <Button
                className="h-14 bg-orange-500 hover:bg-orange-600 text-black font-black px-10 rounded-2xl shadow-lg uppercase tracking-widest text-xs transition-transform active:scale-95"
                onClick={() => { setPurgeTarget("all"); setShowPurgeModal(true); }}
              >
                Purger TOUTES les tables
              </Button>
            </div>

            {/* Table Data */}
            {loading ? (
              <div className="space-y-6">
                {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white/5 rounded-3xl animate-pulse" />)}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-24 text-muted-foreground border-2 border-dashed border-white/5 rounded-[32px]">
                    <Database size={56} className="mx-auto mb-6 opacity-10" />
                    <p className="text-xl font-bold">Aucune entrée pour ce module.</p>
                  </div>
                ) : filteredItems.map(item => (
                  <div key={item.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-8 bg-black/40 rounded-[32px] hover:bg-white/5 transition-all gap-6 border border-white/5 group">
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-xl text-white group-hover:text-gold transition-colors truncate">{item.title}</p>
                      <div className="flex flex-wrap gap-3 mt-3">
                        {item.subtitle && (
                          <span className="text-[10px] bg-gold/10 text-gold px-4 py-1.5 rounded-xl border border-gold/20 uppercase font-black tracking-widest">{item.subtitle}</span>
                        )}
                        {item.details && (
                          <span className="text-[10px] text-muted-foreground/60 px-4 py-1.5 bg-white/5 rounded-xl uppercase font-bold tracking-widest italic">{item.details?.substring(0, 80)}...</span>
                        )}
                        <span className="text-[10px] text-muted-foreground/30 px-2 py-1.5 font-mono">ID: {String(item.id).substring(0, 8)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {item.extra && (
                        <span className="font-black text-white text-2xl tracking-tighter mr-6">{item.extra}</span>
                      )}
                      <Button variant="outline" size="sm" className="h-12 px-6 rounded-xl border-white/10 hover:bg-white/10 gap-2 font-black text-xs uppercase" onClick={() => startEdit(item)}>
                        <Eye size={16} /> ÉDITER
                      </Button>
                      <Button variant="outline" size="sm" className="h-12 w-12 p-0 rounded-xl border-red-500/10 text-red-500/50 hover:bg-red-500 hover:text-white transition-all shadow-sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 size={16} />
                      </Button>
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
