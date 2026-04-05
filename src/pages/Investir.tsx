import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { sql } from "@/lib/neon";
import { toast } from "sonner";

const Investir = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await sql`SELECT * FROM investments ORDER BY id DESC`;
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Investissez dans l'Avenir du <span className="text-gradient-gold">Parfum</span></h1>
            <p className="text-xl text-muted-foreground mb-8">Soutenez les projets les plus innovants de l'industrie parfumée...</p>
          </div>
          <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3"><TrendingUp className="text-primary" /> Projets en cours</h2>
          
          {loading ? (
            <div className="py-20 text-center">Chargement des investissements...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => {
                const progress = (project.current_amount / project.goal_amount) * 100;
                return (
                  <div key={project.id} className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div><h3 className="text-2xl font-display font-bold mb-2">{project.project_name}</h3><p className="text-sm text-muted-foreground flex items-center gap-2"><Users size={14} /> Porté par : {project.founder}</p></div>
                      <div className="text-right"><div className="text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">ROI ciblé : {project.roi_percentage}%</div></div>
                    </div>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{project.description}</p>
                    <div className="mt-auto space-y-4">
                      <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Levée de fonds</span><span className="font-bold">{project.current_amount} € / {project.goal_amount} €</span></div>
                      <Progress value={progress} className="h-2" />
                      <Button className="w-full mt-4 bg-gradient-gold shadow-gold" onClick={() => toast.success("Investissement : Veuillez vous connecter pour investir")}>Participer au projet <ArrowRight size={16} className="ml-2" /></Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Investir;
