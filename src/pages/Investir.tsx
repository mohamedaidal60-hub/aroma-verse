import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Target, ArrowRight, Globe, BarChart3, Wallet, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { api } from "@/lib/api";

const Investir = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.investments.listProjects();
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
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero & Global Stats */}
          <div className="mb-16">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6 w-fit">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Perfume Nexus Invest</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Investissez dans le futur des <span className="text-gradient-gold">Essences Naturelles</span>
            </h1>
            <p className="text-xl text-muted-foreground font-arabic mb-12">
              استثمر في مستقبل العطور الطبيعية والمستدامة حول العالم
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Investisseurs", value: "12,847", icon: Users, sub: "إجمالي المستثمرين" },
                { label: "Total Investi", value: "$45.2M", icon: Wallet, sub: "إجمالي الاستثمار" },
                { label: "Rendement Moyen", value: "14.2%", icon: BarChart3, sub: "متوسط العائد" },
                { label: "Pays Couverts", value: "87", icon: Globe, sub: "دول المستثمرين" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <stat.icon className="text-gold" size={20} />
                  </div>
                  <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-xs text-muted-foreground mb-1 uppercase tracking-tighter">{stat.label}</span>
                  <span className="text-[10px] text-gold/60 font-arabic">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <Target className="text-gold" /> المشاريع المتاحة للاستثمار
            </h2>
            
            {loading ? (
              <div className="py-20 text-center text-muted-foreground">Chargement des opportunités...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="glass-card rounded-3xl overflow-hidden border border-white/10 group hover:border-gold/30 transition-all flex flex-col">
                    <div className="p-8">
                       <div className="flex justify-between items-start mb-6">
                         <div>
                            <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                            <p className="text-sm text-gold font-arabic">{project.location} | {project.location === 'Cambodia' ? 'مشروع خشب العود – كمبوديا' : 'مشروع الورد الدمشقي – بلغاريا'}</p>
                         </div>
                         <div className="bg-gold text-black font-bold text-xs px-3 py-1 rounded-full">{project.roi_range} ROI</div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="block text-[10px] uppercase text-muted-foreground mb-1">Durée</span>
                            <span className="font-bold">{project.duration_years} ans</span>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="block text-[10px] uppercase text-muted-foreground mb-1">Investisseurs</span>
                            <span className="font-bold">{project.investor_count}</span>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-xs text-muted-foreground">Financement : {Math.round((project.current_funding / project.total_funding) * 100)}%</span>
                            <span className="text-sm font-bold text-white">${(project.current_funding / 1000000).toFixed(1)}M / ${(project.total_funding / 1000000).toFixed(1)}M</span>
                          </div>
                          <Progress value={(project.current_funding / project.total_funding) * 100} className="h-2 bg-white/5" indicatorClassName="bg-gold" />
                       </div>
                    </div>
                    
                    <div className="mt-auto p-4 bg-white/5 border-t border-white/5 flex gap-4">
                       <Button className="flex-1 bg-gold hover:bg-gold/80 text-black font-bold rounded-xl h-12" onClick={() => toast.success("Redirection vers le terminal de paiement...")}>
                         Investir Maintenant <ArrowRight size={18} className="ml-2" />
                       </Button>
                       <Button variant="outline" className="border-white/20 h-12 w-12 p-0 rounded-xl hover:bg-white/10" title="Télécharger le rapport">
                         <Download size={20} className="text-muted-foreground" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Portfolio */}
          <div className="glass-card rounded-[40px] p-10 border border-white/10 bg-gradient-to-br from-secondary/40 to-background relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                  <BarChart3 className="text-gold" /> محفظتي الاستثمارية (Mon Portfolio)
                </h2>
                
                <div className="space-y-4 max-w-4xl">
                   <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:bg-black/60 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold"><FileText size={20} /></div>
                        <div>
                          <p className="font-bold">Oud Cambodge</p>
                          <p className="text-[10px] text-muted-foreground">ID: #INV-9821</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">$2,500</p>
                        <p className="text-[10px] text-green-500 font-bold">+8.2% Rendement</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:bg-black/60 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold"><FileText size={20} /></div>
                        <div>
                          <p className="font-bold">Rose de Damas</p>
                          <p className="text-[10px] text-muted-foreground">ID: #INV-4412</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">$1,000</p>
                        <p className="text-[10px] text-green-500 font-bold">+4.5% Rendement</p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-10">
                   <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold hover:text-black font-bold h-12 px-8 rounded-xl flex items-center gap-2">
                     <Wallet size={18} /> Retirer mes profits
                   </Button>
                   <Button variant="ghost" className="text-muted-foreground hover:text-white h-12 px-8 font-bold">
                     Marché Secondaire (Vendre)
                   </Button>
                </div>
             </div>
             <div className="absolute right-0 top-0 w-96 h-96 bg-gold/5 blur-[100px] pointer-events-none"></div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
export default Investir;
