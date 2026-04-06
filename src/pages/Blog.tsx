import { useState, useEffect } from "react";
import { Calendar, User, ArrowRight, Bookmark, Share2, Eye, Star, Search, Clock, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Blog = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.blog.listPosts();
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
                <Star size={14} className="text-gold" fill="currentColor" />
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest leading-none">Nexus Scientific Journal</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-bold mb-4">
                Nexus <span className="text-gold">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground font-arabic leading-relaxed">أبحاث علمية، تحليلات جزيئية، وآخر أخبار صناعة العطور العالمية</p>
            </div>
            
            <div className="relative w-full md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 w-4 h-4" />
               <Input placeholder="Rechercher un article..." className="pl-12 h-14 bg-white/5 border-white/5 rounded-2xl text-white placeholder:text-muted-foreground/30 focus-visible:ring-gold/40" />
            </div>
          </div>

          {/* Featured Article (if exists) */}
          {articles.length > 0 && (
            <div className="mb-20 glass-card rounded-[48px] overflow-hidden border border-white/5 bg-gradient-to-br from-gold/5 to-transparent relative group cursor-pointer hover:border-gold/30 transition-all p-2">
               <div className="flex flex-col lg:flex-row items-stretch min-h-[450px]">
                  <div className="lg:w-1/2 relative overflow-hidden rounded-[40px] m-4">
                     <img 
                       src="https://images.unsplash.com/photo-1615397323145-120019fa300e?auto=format&fit=crop&w=1200&q=80" 
                       alt="Featured" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                     />
                     <div className="absolute top-6 left-6 px-4 py-2 bg-gold text-black font-black text-[10px] uppercase tracking-widest rounded-full shadow-gold">Nexus Exclusive</div>
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center">
                     <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 font-bold uppercase tracking-widest">
                        <span className="text-gold">{articles[0].category || 'Scientifique'}</span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="flex items-center gap-1"><Clock size={12}/> 12 min de lecture</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white group-hover:text-gold transition-colors">{articles[0].title}</h2>
                     <p className="text-muted-foreground text-lg mb-8 leading-relaxed line-clamp-3">{articles[0].content?.slice(0, 200)}...</p>
                     
                     <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full border-2 border-gold/20 flex items-center justify-center bg-gold/5 overflow-hidden">
                              <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" alt="Author" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-white leading-none mb-1">Dr. S. Al-Dali</p>
                              <p className="text-[10px] text-muted-foreground uppercase">Expert Moléculaire</p>
                           </div>
                        </div>
                        <Button className="rounded-full h-14 w-14 bg-white hover:bg-gold text-black shadow-lg">
                           <ArrowRight size={24} />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card h-[450px] rounded-[40px] animate-pulse border border-white/5" />
              ))
            ) : (
              articles.slice(1).map((article) => (
                <article key={article.id} className="glass-card rounded-[40px] border border-white/5 bg-black/40 group hover:border-gold/30 transition-all flex flex-col overflow-hidden relative">
                   <div className="h-64 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
                      <div className="absolute top-6 left-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">{article.category}</div>
                   </div>
                   
                   <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-gold transition-colors leading-snug">{article.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-8">{article.excerpt || article.content?.slice(0, 150)}...</p>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                         <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest leading-none">
                            <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(article.created_at).toLocaleDateString()}</span>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="flex items-center gap-1"><Eye size={12}/> 2.4k</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <button onClick={(e) => { e.stopPropagation(); toast.success("Article sauvegardé !"); }} className="p-2 hover:text-gold transition-colors"><Bookmark size={18} /></button>
                           <button onClick={(e) => { e.stopPropagation(); toast.success("Lien copié !"); }} className="p-2 hover:text-gold transition-colors"><Share2 size={18} /></button>
                         </div>
                      </div>
                   </div>
                </article>
              ))
            )}
          </div>

          {/* Load More / Pagination */}
          <div className="flex justify-center mt-20">
             <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold hover:text-black font-bold h-14 px-12 rounded-[24px] text-lg">
                Explorer tous les articles
             </Button>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
