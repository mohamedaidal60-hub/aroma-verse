import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Bookmark, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await api.blog.listPosts();
        const found = all.find((p: any) => p.id.toString() === slug || p.title.toLowerCase().includes(slug?.toLowerCase() || ''));
        if (found) setPost(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar /><div className="pt-40 text-center animate-pulse text-gold font-bold">{t("common.loading")}</div><Footer />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-background">
      <Navbar /><div className="pt-40 text-center">{t("common.no_data")}</div><Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Article Header */}
        <div className="relative h-[60vh] overflow-hidden mb-16">
           <img src="https://images.unsplash.com/photo-1615397323145-120019fa300e?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover opacity-50" />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
           
           <div className="absolute bottom-0 left-0 w-full">
              <div className="container mx-auto px-4 max-w-4xl pb-10">
                 <Button 
                   variant="ghost" 
                   className="mb-8 text-gold hover:text-white font-bold h-12 rounded-xl group px-0"
                   onClick={() => navigate('/blog')}
                 >
                   <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-2 transition-transform" /> {t("common.back")}
                 </Button>

                 <div className="flex gap-4 mb-6">
                    <span className="px-4 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-black uppercase tracking-widest">{post.category}</span>
                    <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Clock size={12}/> 12 MIN READ</span>
                 </div>

                 <h1 className="text-4xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter leading-none italic">{post.title}</h1>
                 
                 <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8 mt-10">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center p-0.5 shadow-gold bg-gold/5 overflow-hidden">
                          <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <p className="text-white font-black text-lg leading-none mb-1">Dr. S. Al-Dali</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Expert Parfumeur Moléculaire</p>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all" onClick={() => toast.success("Enregistré")}><Bookmark size={20}/></button>
                       <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all" onClick={() => toast.success("Copié")}><Share2 size={20}/></button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Article Body */}
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Content */}
              <div className="lg:col-span-12 space-y-8 prose prose-invert prose-gold max-w-none">
                 <p className="text-2xl text-muted-foreground leading-relaxed italic mb-12 border-l-4 border-gold pl-8">
                   Analyses moléculaires avancées pour l'industrie de la parfumerie moderne selon les standards scientifiques mondiaux Nexus.
                 </p>
                 
                 <div className="text-xl text-white/80 leading-[1.8] font-light space-y-8">
                    {post.content ? (
                      post.content.split('\n\n').map((para: string, i: number) => (
                        <p key={i}>{para}</p>
                      ))
                    ) : (
                      <>
                        <p>L'industrie de la parfumerie connaît une mutation sans précédent, portée par les avancées majeures en chimie biocatalytique et l'intégration de l'intelligence artificielle dans le processus de formulation. Chez Perfume Nexus, nous avons intégré ces paradigmes dès la conception du système Nexus.</p>
                        
                        <div className="glass-card rounded-[40px] p-10 border border-gold/20 my-16 bg-gradient-to-br from-gold/5 to-transparent">
                           <h3 className="text-2xl font-display font-bold text-gold mb-6 flex items-center gap-3"><Star size={24}/> Chiffres Clés Industrie 2024</h3>
                           <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <li className="flex flex-col"><span className="text-3xl font-black text-white">+14.2%</span><span className="text-xs text-muted-foreground uppercase tracking-widest">Croissance Marché Sourcing</span></li>
                              <li className="flex flex-col"><span className="text-3xl font-black text-white">87%</span><span className="text-xs text-muted-foreground uppercase tracking-widest">Adoption molécules durables</span></li>
                              <li className="flex flex-col"><span className="text-3xl font-black text-white">$4.2B</span><span className="text-xs text-muted-foreground uppercase tracking-widest">Investissements R&D Essences</span></li>
                              <li className="flex flex-col"><span className="text-3xl font-black text-white">2.4m</span><span className="text-xs text-muted-foreground uppercase tracking-widest">Références Moléculaires</span></li>
                           </ul>
                        </div>

                        <p>La traçabilité à 100% devient la norme. Grâce à notre module Investir, nous permettons une visibilité totale de la chaîne d'approvisionnement, du champ de Roses de Damas en Bulgarie jusqu'au laboratoire de distillation en France.</p>
                        
                        <p>Ces "Insights Nexus" sont réservés aux membres professionnels qui cherchent non seulement à formuler des parfums, mais à comprendre l'équilibre économique et scientifique qui régit notre industrie.</p>
                      </>
                    )}
                 </div>

                 {/* Tags */}
                 <div className="flex flex-wrap gap-3 mt-20 pt-10 border-t border-white/5">
                    {['#Sourcing', '#Moléculaire', '#FutureOfFragrance', '#NexusPro', '#SustainableLuxury'].map(tag => (
                      <span key={tag} className="text-[10px] font-black text-gold/60 uppercase tracking-widest hover:text-gold cursor-pointer transition-colors">{tag}</span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
