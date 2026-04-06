import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Target, ArrowRight, Globe, BarChart3, Wallet, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useLang } from "@/contexts/LanguageContext";

const Investir = () => {
  const { t, dir } = useLang();
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

  const handleInvest = (title: string) => {
    toast.success(`${t("invest.success")} (${title})`);
  };

  const handleWithdraw = () => {
    toast.info(t("invest.no_profits"));
  };

  const handleMarket = () => {
    toast.info("Marché secondaire bientôt disponible sur Mobile.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero & Global Stats */}
          <div className="mb-16">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6 w-fit">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{t("invest.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tighter">
              {t("invest.title.1")} <span className="text-gold">{t("invest.title.2")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              {t("invest.desc")}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Investisseurs", value: "12,847", icon: Users },
                { label: t("invest.total"), value: "$45.2M", icon: Wallet },
                { label: t("invest.roi"), value: "14.2%", icon: BarChart3 },
                { label: "Pays Couverts", value: "87", icon: Globe }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <stat.icon className="text-gold" size={20} />
                  </div>
                  <span className="text-2xl font-bold text-white mb-1 tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <Target className="text-gold" /> {t("invest.active")}
            </h2>
            
            {loading ? (
              <div className="py-20 text-center text-muted-foreground">{t("common.loading")}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="glass-card rounded-[40px] overflow-hidden border border-white/10 group hover:border-gold/30 transition-all flex flex-col bg-black/20">
                    <div className="p-8">
                       <div className="flex justify-between items-start mb-6">
                         <div>
                            <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                            <p className="text-sm text-gold font-bold">{project.location}</p>
                         </div>
                         <div className="bg-gold text-black font-black text-[10px] px-3 py-1.5 rounded-full shadow-gold uppercase tracking-widest">{project.roi_range} ROI</div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-[10px] uppercase font-black text-muted-foreground mb-1">Durée</span>
                            <span className="font-bold text-white">{project.duration_years} ans</span>
                          </div>
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-[10px] uppercase font-black text-muted-foreground mb-1">Soutiens</span>
                            <span className="font-bold text-white">{project.investor_count}</span>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] uppercase font-black text-muted-foreground">Financement : {Math.round((project.current_funding / project.total_funding) * 100)}%</span>
                            <span className="text-sm font-black text-white">${(project.current_funding / 1000000).toFixed(1)}M / ${(project.total_funding / 1000000).toFixed(1)}M</span>
                          </div>
                          <Progress value={(project.current_funding / project.total_funding) * 100} className="h-2 bg-white/5" indicatorClassName="bg-gold" />
                       </div>
                    </div>
                    
                    <div className="mt-auto p-6 bg-white/5 border-t border-white/5 flex gap-4">
                       <Button 
                         className="flex-1 bg-gold hover:bg-gold/80 text-black font-black uppercase tracking-widest text-xs h-14 rounded-2xl shadow-gold"
                         onClick={() => handleInvest(project.title)}
                       >
                         {t("invest.cta.buy")} <ArrowRight size={18} className={dir === "rtl" ? "mr-2 rotate-180" : "ml-2"} />
                       </Button>
                       <Button variant="outline" className="border-white/20 h-14 w-14 p-0 rounded-2xl hover:bg-gold hover:text-black group transition-all">
                         <Download size={24} className="text-muted-foreground group-hover:text-black" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Portfolio */}
          <div className="glass-card rounded-[48px] p-10 md:p-16 border border-white/10 bg-gradient-to-br from-secondary/40 to-background relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                  <BarChart3 className="text-gold" /> {t("invest.total")}
                </h2>
                
                <div className="space-y-4 max-w-4xl">
                   <div className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 hover:bg-black/60 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-all"><FileText size={20} /></div>
                        <div>
                          <p className="font-bold text-white">Oud Cambodge</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">ID: #INV-9821</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-2xl text-white tracking-tighter">$2,500</p>
                        <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">+8.2% Rendement</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 hover:bg-black/60 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-all"><FileText size={20} /></div>
                        <div>
                          <p className="font-bold text-white">Rose de Damas</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">ID: #INV-4412</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-2xl text-white tracking-tighter">$1,000</p>
                        <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">+4.5% Rendement</p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-12">
                   <Button 
                     variant="outline" 
                     className="border-gold/30 text-gold hover:bg-gold hover:text-black font-black uppercase tracking-widest text-xs h-14 px-10 rounded-2xl flex items-center gap-2 shadow-gold/20"
                     onClick={handleWithdraw}
                   >
                     <Wallet size={18} /> {t("invest.cta.withdraw")}
                   </Button>
                   <Button 
                     variant="ghost" 
                     className="text-muted-foreground hover:text-white h-14 px-10 font-bold uppercase tracking-widest text-xs"
                     onClick={handleMarket}
                   >
                     {t("invest.cta.market")}
                   </Button>
                </div>
             </div>
             <div className="absolute right-0 top-0 w-96 h-96 bg-gold/5 blur-[120px] pointer-events-none rounded-full"></div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Investir;
