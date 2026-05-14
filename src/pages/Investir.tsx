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

  const [showProposal, setShowProposal] = useState(false);
  const [proposalData, setProposalData] = useState({ crop: "", hectares: "" });

  const handlePropose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalData.crop || !proposalData.hectares) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    const currentProposals = JSON.parse(localStorage.getItem("nexus_proposals") || "[]");
    const newProposal = {
      id: Date.now(),
      ...proposalData,
      status: "pending",
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem("nexus_proposals", JSON.stringify([...currentProposals, newProposal]));
    toast.success("Votre proposition de culture a été envoyée à l'équipe Nexus !");
    setShowProposal(false);
    setProposalData({ crop: "", hectares: "" });
  };

  const handleInvest = (title: string) => {
    toast.success(t("invest.success") + " - " + title);
  };

  const handleWithdraw = () => {
    toast.error(t("invest.no_profits") || "Aucun profit disponible pour le retrait.");
  };

  const handleMarket = () => {
    toast.info("Le marché secondaire sera bientôt disponible.");
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Modal de Proposition */}
          {showProposal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowProposal(false)}></div>
              <div className="relative bg-[#062112] border border-gold/30 p-10 rounded-[40px] w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
                <h2 className="text-3xl font-display font-black text-foreground mb-2 uppercase tracking-tight">Proposer une Culture</h2>
                <p className="text-gold/60 text-xs font-bold uppercase tracking-widest mb-8 italic">Algérie Hub - Opportunité Nexus</p>
                
                <form onSubmit={handlePropose} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2 block">Que souhaitez-vous planter ?</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Rose de Damas, Oud, Jasmin..." 
                      className="w-full h-14 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 text-foreground text-sm focus:border-gold outline-none transition-all"
                      value={proposalData.crop}
                      onChange={e => setProposalData({...proposalData, crop: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2 block">Surface estimée (Hectares)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 5" 
                      className="w-full h-14 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 text-foreground text-sm focus:border-gold outline-none transition-all"
                      value={proposalData.hectares}
                      onChange={e => setProposalData({...proposalData, hectares: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full h-16 bg-gold text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all">
                    SOUMETTRE MON PROJET
                  </Button>
                </form>
              </div>
            </div>
          )}
          
          {/* Hero & Global Stats */}
          <div className="mb-16">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6 w-fit">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{t("invest.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tighter text-foreground">
              {t("invest.title.1")} <span className="text-primary italic font-bold tracking-tighter">{t("invest.title.2")}</span>
            </h1>
            <p className="text-xl text-foreground/80 font-medium mb-12 max-w-3xl">
              {t("invest.desc")}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Investisseurs", value: "12,847", icon: Users },
                { label: t("invest.total"), value: "$45.2M", icon: Wallet },
                { label: t("invest.roi"), value: "14.2%", icon: BarChart3 },
                { label: "Pays Couverts", value: "87", icon: Globe }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl border border-emerald-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <stat.icon className="text-gold" size={20} />
                  </div>
                  <span className="text-2xl font-bold text-foreground mb-1 tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] text-emerald-700/70 font-bold uppercase tracking-widest">{stat.label}</span>
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
              <div className="py-20 text-center text-emerald-700/70">{t("common.loading")}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="glass-card rounded-[40px] overflow-hidden border border-primary/20 group hover:border-primary/50 transition-all flex flex-col bg-white/40 shadow-xl relative">
                    <div className="p-10">
                       <div className="flex justify-between items-start mb-8">
                         <div>
                            <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tight">{project.title}</h3>
                            <span className="text-xs text-primary font-black uppercase tracking-widest bg-primary/5 px-2 py-1 rounded border border-primary/10">{project.location}</span>
                         </div>
                         <div className="bg-primary text-foreground font-black text-[10px] px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">{project.roi_range} ROI</div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                            <span className="block text-[10px] uppercase font-black text-foreground/40 mb-1">Période</span>
                            <span className="font-black text-foreground text-lg">{project.duration_years} Ans</span>
                          </div>
                          <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                            <span className="block text-[10px] uppercase font-black text-foreground/40 mb-1">Membres</span>
                            <span className="font-black text-foreground text-lg">{project.investor_count}</span>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] uppercase font-black text-primary/60">Levée de Fonds : {Math.round((project.current_funding / project.total_funding) * 100)}%</span>
                            <span className="text-sm font-black text-foreground">${(project.current_funding / 1000000).toFixed(1)}M / ${(project.total_funding / 1000000).toFixed(1)}M</span>
                          </div>
                          <Progress value={(project.current_funding / project.total_funding) * 100} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                       </div>
                    </div>
                    
                    <div className="mt-auto p-10 bg-primary/5 border-t border-primary/10 flex flex-col gap-4">
                       <Button 
                         className="w-full bg-primary hover:bg-primary/90 text-foreground font-black uppercase tracking-[0.2em] text-xs h-16 rounded-2xl shadow-xl transition-all"
                         onClick={() => handleInvest(project.title)}
                       >
                         INVESTIR MAINTENANT
                       </Button>
                       <div className="flex gap-4">
                         <Button variant="outline" className="flex-1 border-primary/20 h-14 rounded-2xl hover:bg-primary/10 font-bold text-[10px] uppercase tracking-widest text-primary">
                           FICHE TECHNIQUE (PDF)
                         </Button>
                         <Button variant="ghost" className="h-14 w-14 rounded-2xl text-primary/40 hover:text-primary">
                           <Download size={20} />
                         </Button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Proposition de Projet Agricole (Algérie) */}
          <div className="glass-card rounded-[40px] p-8 md:p-12 mb-16 border-2 border-gold/20 bg-gold/5 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-4">
                   <Target size={14} className="text-gold" />
                   <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Partenariat Cultivateur</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black mb-4 text-foreground">Proposer votre <span className="text-gold italic">Projet Agricole</span> en Algérie</h2>
                <p className="text-foreground/80 mb-6 font-medium leading-relaxed">
                  Offrez vos parcelles de terrain à la location (selon les dimensions désirées) ou proposez la culture d'un ingrédient spécifique. Les abonnés investissent dans votre projet pour le financer.
                </p>
                <div className="flex gap-4">
                   <Button 
                      className="h-14 px-8 bg-gold text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-gold/20 hover:scale-105 transition-all"
                      onClick={() => setShowProposal(true)}
                   >
                      PROPOSER UNE CULTURE
                   </Button>
                </div>
             </div>
             <div className="w-full md:w-5/12 aspect-video md:aspect-[4/3] rounded-[32px] overflow-hidden border border-emerald-200 shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Terrain agricole Algérie" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
                   <div>
                     <p className="text-foreground font-black text-lg">Parcelles Disponibles</p>
                     <p className="text-gold font-bold uppercase tracking-widest text-[10px] mb-2">Terres Agricoles & Distilleries Locales</p>
                   </div>
                </div>
             </div>
          </div>

          {/* User Portfolio */}
          <div className="glass-card rounded-[48px] p-10 md:p-16 border border-emerald-200 bg-gradient-to-br from-secondary/40 to-background relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                  <BarChart3 className="text-gold" /> {t("invest.total")}
                </h2>
                
                <div className="space-y-4 max-w-4xl">
                   <div className="flex items-center justify-between p-6 bg-white/40 rounded-3xl border border-emerald-100 hover:bg-white/60 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-all"><FileText size={20} /></div>
                        <div>
                          <p className="font-bold text-foreground">Oud Cambodge</p>
                          <p className="text-[10px] text-emerald-700/70 uppercase tracking-widest">ID: #INV-9821</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-2xl text-foreground tracking-tighter">$2,500</p>
                        <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">+8.2% Rendement</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between p-6 bg-white/40 rounded-3xl border border-emerald-100 hover:bg-white/60 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-all"><FileText size={20} /></div>
                        <div>
                          <p className="font-bold text-foreground">Rose de Damas</p>
                          <p className="text-[10px] text-emerald-700/70 uppercase tracking-widest">ID: #INV-4412</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-2xl text-foreground tracking-tighter">$1,000</p>
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
                     className="text-emerald-700/70 hover:text-foreground h-14 px-10 font-bold uppercase tracking-widest text-xs"
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
