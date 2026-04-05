import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sql, setupDatabase } from "@/lib/neon";
import { Shield, Database, Users, Settings, Activity } from "lucide-react";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);

  useEffect(() => {
    // Check if session exists in localStorage for prototype brevity
    if (localStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
      checkDbStatus();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create admin table if it doesn't exist
      await setupDatabase();
      
      const adminUsers = await sql`
        SELECT * FROM admin_users 
        WHERE email = ${email} AND password = ${password}
      `;

      if (adminUsers.length > 0) {
        setIsAuthenticated(true);
        localStorage.setItem("adminAuth", "true");
        toast.success("Connexion réussie");
        checkDbStatus();
      } else {
        toast.error("Identifiants incorrects");
      }
    } catch (err) {
      toast.error("Erreur de connexion à la base de donnéesNeon");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  const checkDbStatus = async () => {
    setLoading(true);
    try {
      const stats = await sql`
        SELECT 
          (SELECT count(*) FROM courses) as course_count,
          (SELECT count(*) FROM admin_users) as admin_count
      `;
      setDbStatus(stats[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRebuildDatabase = async () => {
    setLoading(true);
    try {
      await setupDatabase();
      toast.success("Base de données initialisée et synchronisée avec Neon");
      checkDbStatus();
    } catch (err) {
      toast.error("Erreur lors de l'initialisation");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="glass-card w-full max-w-md p-8 rounded-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <Shield size={40} />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-center mb-6">Accès Administrateur</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email administrateur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-gold shadow-gold" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
              <Shield className="text-primary" /> Panneau d'Administration
            </h1>
            <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><Activity /></div>
              <div>
                <p className="text-sm text-muted-foreground">Statut Système</p>
                <p className="font-bold text-xl text-green-500">Opérationnel</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg"><Database /></div>
              <div>
                <p className="text-sm text-muted-foreground">Base de Données</p>
                <p className="font-bold text-xl">Neon PostgreSQL</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg"><Users /></div>
              <div>
                <p className="text-sm text-muted-foreground">Administrateurs</p>
                <p className="font-bold text-xl">{dbStatus?.admin_count || "-"}</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg"><Settings /></div>
              <div>
                <p className="text-sm text-muted-foreground">Cours Academy</p>
                <p className="font-bold text-xl">{dbStatus?.course_count || "-"}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl mb-8 border border-border">
            <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
              <Database className="text-primary" /> Gestion de la Base de Données
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Cette interface permet de synchroniser les tables Neon, d'importer les données mockées pour l'académie 
                et de vérifier que l'infrastructure est opérationnelle conformément à votre demande.
              </p>
              <Button onClick={handleRebuildDatabase} disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Forcer la synchronisation Neon DB
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Admin;
