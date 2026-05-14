import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Globe2, MapPin, MessageSquare, Heart, Trophy, Plus, ArrowLeft, UserPlus, Star, Send, UserCheck, BookOpen, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Community() {
  const { t, lang, dir } = useLang();
  const { user, profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const [continent, setContinent] = useState("Loading...");
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState("");
  const initialPosts = [
    { id: 1, author: "Jean D.", avatar: 30, text: "Je cherche un fournisseur fiable pour l'absolue de rose de mai.", likes: 45, comments: [], followed: false, hasLiked: false },
    { id: 2, author: "Sarah M.", avatar: 35, text: "Mon dernier prototype Oud & Vanille vient de passer les tests de macération ! Résultat bluffant.", likes: 120, comments: [], followed: true, hasLiked: true },
    { id: 3, author: "AromaCorp", avatar: 25, text: "Attention à la nouvelle régulation IFRA concernant les muscs polycycliques. Mettez à jour vos formules.", likes: 89, comments: [], followed: false, hasLiked: false },
  ];
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("community_posts");
    return saved ? JSON.parse(saved) : initialPosts;
  });
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  useEffect(() => {
    localStorage.setItem("community_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setContinent(data.continent_name || "Europe");
      })
      .catch(() => setContinent("Europe"));
  }, []);

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const newHasLiked = !p.hasLiked;
        return { ...p, hasLiked: newHasLiked, likes: newHasLiked ? p.likes + 1 : p.likes - 1 };
      }
      return p;
    }));
    toast.success(t("community.vote.success"));
  };

  const handleFollow = (id: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const newFollowed = !p.followed;
        toast.success(newFollowed ? "Auteur suivi" : "Auteur retiré");
        return { ...p, followed: newFollowed };
      }
      return p;
    }));
  };

  const handleAddComment = (id: number) => {
    const text = commentInputs[id];
    if (!text?.trim()) return;
    
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, comments: [...(p.comments as any), { text, author: "Moi" }] };
      }
      return p;
    }));
    setCommentInputs(prev => ({ ...prev, [id]: "" }));
    toast.success("Commentaire ajouté !");
  };

  return (
    <div className={`min-h-screen bg-background flex flex-col font-body ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {!activeChannel ? (
            <>
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
                  <Star size={14} className="text-gold" fill="currentColor" />
                  <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Nexus Social Hub</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-display font-black mb-6 tracking-tighter">
                    {t("titre.communauté.1")} <span className="text-gold">{t("titre.communauté.2")}</span>
                </h1>
                <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === "rtl" ? "font-arabic" : ""}`}>
                    {t("community.desc")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Global Hub - Visible to All */}
                <div onClick={() => setActiveChannel("Global")} className="glass-card p-10 rounded-[48px] border border-primary/20 hover:border-primary transition-all cursor-pointer group relative overflow-hidden bg-white shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                  <div className="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform border border-primary/20">
                    <Globe2 size={32} />
                  </div>
                  <h2 className="text-2xl font-display font-black mb-3 uppercase tracking-tighter text-primary">Global Nexus</h2>
                  <p className="text-primary/60 text-xs mb-8 leading-relaxed font-bold">Le centre névralgique mondial de l'industrie (85K+ membres).</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-4">
                      {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-10 h-10 rounded-xl border-4 border-white" alt="avatar" />)}
                    </div>
                    <span className="text-[10px] font-black text-primary flex items-center gap-2 uppercase tracking-widest">Entrer <Plus size={14}/></span>
                  </div>
                </div>

                {/* Algérie Hub */}
                <div onClick={() => setActiveChannel("Algerie")} className="glass-card p-10 rounded-[48px] border border-primary/20 hover:border-primary transition-all cursor-pointer group bg-forest-deep relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl"></div>
                   <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-lg">
                    <MapPin size={32} />
                  </div>
                  <h2 className="text-2xl font-display font-black mb-3 text-white uppercase tracking-tighter">Algérie Hub</h2>
                  <p className="text-white/40 text-xs mb-8 leading-relaxed font-bold">Production locale, sourcing Sud et logistique (12K+ membres).</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-4">
                      {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 30}`} className="w-10 h-10 rounded-xl border-4 border-primary" alt="avatar" />)}
                    </div>
                    <span className="text-[10px] font-black text-gold flex items-center gap-2 uppercase tracking-widest italic animate-pulse">Accès Certifié <Plus size={14}/></span>
                  </div>
                </div>

                {/* France Hub */}
                <div onClick={() => setActiveChannel("France")} className="glass-card p-10 rounded-[48px] border border-primary/20 hover:border-primary transition-all cursor-pointer group bg-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl"></div>
                   <div className="w-16 h-16 bg-primary/5 rounded-[24px] flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                    <MapPin size={32} />
                  </div>
                  <h2 className="text-2xl font-display font-black mb-3 text-primary uppercase tracking-tighter">France Hub</h2>
                  <p className="text-primary/60 text-xs mb-8 leading-relaxed font-bold">Héritage de Grasse et centres R&D Européens (24K+ membres).</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-4">
                      {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 40}`} className="w-10 h-10 rounded-xl border-4 border-white" alt="avatar" />)}
                    </div>
                    <span className="text-[10px] font-black text-primary flex items-center gap-2 uppercase tracking-widest">Rejoindre <Plus size={14}/></span>
                  </div>
                </div>

                {/* Scent Archive */}
                <div onClick={() => setActiveChannel("Scent Archive")} className="glass-card p-10 rounded-[48px] border border-gold/40 hover:border-gold transition-all cursor-pointer group bg-gold/5 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gold/10 blur-3xl"></div>
                   <div className="w-16 h-16 bg-gold/20 rounded-[24px] flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform border border-gold/20">
                    <BookOpen size={32} />
                  </div>
                  <h2 className="text-2xl font-display font-black mb-3 text-gold uppercase tracking-tighter">Scent Archive</h2>
                  <p className="text-muted-foreground text-xs mb-8 leading-relaxed font-bold">L'encyclopédie participative du patrimoine olfactif mondial et historique.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gold flex items-center gap-2 uppercase tracking-widest">Explorer l'Histoire <Plus size={14}/></span>
                  </div>
                </div>

                {/* Open Research Hub */}
                <div onClick={() => setActiveChannel("Research")} className="glass-card p-10 rounded-[48px] border border-blue-500/20 hover:border-blue-500 transition-all cursor-pointer group bg-blue-500/5 relative overflow-hidden shadow-xl">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
                   <div className="w-16 h-16 bg-blue-500/20 rounded-[24px] flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform border border-blue-500/20">
                    <FlaskConical size={32} />
                  </div>
                  <h2 className="text-2xl font-display font-black mb-3 text-blue-500 uppercase tracking-tighter">Open Research</h2>
                  <p className="text-muted-foreground text-xs mb-8 leading-relaxed font-bold">Documentation collaborative. Publiez vos succès et échecs de distillation.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-500 flex items-center gap-2 uppercase tracking-widest">Contribuer <Plus size={14}/></span>
                  </div>
                </div>
            </div>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
               <button onClick={() => setActiveChannel(null)} className="mb-12 flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-black uppercase text-[10px] tracking-widest">
                   <ArrowLeft size={16}/> {t("common.back")}
               </button>
               
               <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-8 flex flex-col gap-10">
                       
                       {/* Quick Post */}
                       <div className="glass-card p-8 rounded-[32px] flex flex-col gap-6 border border-white/10 bg-black/40">
                          <div className="flex gap-4">
                             <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20"><Users size={24}/></div>
                             <div className="flex-1">
                                <h3 className="font-bold text-lg text-white">Postez dans {activeChannel}</h3>
                                <p className="text-xs text-muted-foreground">Partagez vos formules ou posez une question.</p>
                             </div>
                          </div>
                          <div className="relative group">
                            <Input 
                               value={newPostText}
                               onChange={(e) => setNewPostText(e.target.value)}
                               placeholder="Quoi de neuf dans votre Lab ?" 
                               className="h-16 bg-black/60 border-white/5 rounded-2xl pl-6 pr-20 text-white placeholder:text-muted-foreground/30 focus-visible:ring-gold" 
                             />
                             <Button 
                               onClick={() => {
                                 if (!newPostText.trim()) return;
                                 setPosts([{ id: Date.now(), author: profile?.full_name || "Moi", avatar: 10, text: newPostText, likes: 0, comments: [], followed: false, hasLiked: false }, ...posts]);
                                 setNewPostText("");
                                 toast.success("Message publié dans " + activeChannel);
                               }}
                               className="absolute right-2 top-2 h-12 w-12 bg-gold hover:bg-gold/80 text-black rounded-xl shadow-gold"
                             >
                                <Send size={18}/>
                             </Button>
                          </div>
                       </div>

                       {/* Feed */}
                       <div className="space-y-10">
                          {posts.map(post => (
                              <div key={post.id} className="glass-card p-10 rounded-[48px] border border-white/10 flex flex-col bg-black/20 hover:bg-black/30 transition-all group">
                                  <div className="flex items-center justify-between mb-8">
                                      <div className="flex items-center gap-5">
                                          <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-gold/20">
                                            <img src={`https://i.pravatar.cc/100?img=${post.avatar}`} className="w-full h-full object-cover" alt={post.author} />
                                          </div>
                                          <div>
                                              <h4 className="font-black text-xl text-white tracking-tight">{post.author}</h4>
                                              <span className="text-[10px] text-gold font-black uppercase tracking-widest bg-gold/5 px-2 py-0.5 rounded border border-gold/10">Membre Certifié</span>
                                          </div>
                                      </div>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleFollow(post.id)}
                                        className={`rounded-2xl px-6 h-12 border-white/10 hover:border-gold/50 gap-2 transition-all ${post.followed ? 'bg-gold/10 text-gold border-gold/30' : 'text-muted-foreground hover:bg-gold hover:text-black'}`}
                                      >
                                          {post.followed ? <UserCheck size={18} /> : <UserPlus size={18} />}
                                          <span className="text-[10px] font-black uppercase tracking-widest">{post.followed ? t("community.following") : t("community.follow")}</span>
                                      </Button>
                                  </div>

                                  <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 mb-8">
                                    <p className="text-xl text-white/90 leading-relaxed font-medium">{post.text}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-10 mb-8 px-4">
                                      <button 
                                        onClick={() => handleLike(post.id)}
                                        className={`flex items-center gap-3 transition-colors font-black text-xs uppercase tracking-widest ${post.hasLiked ? 'text-gold scale-110' : 'text-muted-foreground hover:text-white'}`}
                                      >
                                          <Heart size={24} className={post.hasLiked ? 'fill-gold' : ''} /> {post.likes}
                                      </button>
                                      <button className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors font-black text-xs uppercase tracking-widest">
                                          <MessageSquare size={24}/> {post.comments.length}
                                      </button>
                                  </div>

                                  {/* Comments Section */}
                                  <div className="space-y-4 px-4">
                                      {post.comments.map((c: any, ci) => (
                                          <div key={ci} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-sm">
                                              <span className="font-black text-gold text-[10px] uppercase block mb-1">{c.author}</span>
                                              <p className="text-white/80">{c.text}</p>
                                          </div>
                                      ))}
                                      {post.comments.length === 0 && (
                                          <p className="text-xs text-muted-foreground/50 italic">{t("community.no_comments")}</p>
                                      )}
                                      <div className="flex gap-3 mt-6">
                                          <Input 
                                            placeholder={t("community.comment.placeholder")} 
                                            value={commentInputs[post.id] || ""}
                                            onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                            className="h-12 bg-black/40 border-white/5 rounded-xl text-xs" 
                                          />
                                          <Button size="icon" onClick={() => handleAddComment(post.id)} className="h-12 w-12 bg-white/5 hover:bg-gold hover:text-black rounded-xl border border-white/10 transition-all"><Send size={16}/></Button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                       </div>
                   </div>

                   {/* Sidebar */}
                   <div className="lg:col-span-4 flex flex-col gap-10">
                       <div className="glass-card p-10 rounded-[48px] border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent relative overflow-hidden group shadow-2xl">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] pointer-events-none"></div>
                           <h3 className="font-display font-black text-3xl mb-4 flex items-center gap-4 uppercase tracking-tighter">
                               <Trophy className="text-gold" size={32} /> LEADERBOARD
                           </h3>
                           <p className="text-xs text-muted-foreground mb-12 leading-relaxed font-bold uppercase tracking-widest opacity-60">Le top 10 mensuel accède au Lab VIP.</p>
                           
                           <div className="space-y-5">
                               {[
                                 { name: "Sarah M.", pts: 1540, img: 35 },
                                 { name: "Léonard F.", pts: 1320, img: 36 },
                                 { name: "AromaCorp", pts: 980, img: 25 },
                                 { name: "Jean D.", pts: 850, img: 30 },
                                 { name: "Nez_Pro", pts: 640, img: 28 },
                               ].map((creator, i) => (
                                   <div key={i} className="flex items-center justify-between p-5 bg-black/40 rounded-[28px] border border-white/5 hover:border-gold/30 transition-all hover:bg-black/60 group/item">
                                       <div className="flex items-center gap-5">
                                           <div className="relative">
                                              <img src={`https://i.pravatar.cc/100?img=${creator.img}`} className="w-14 h-14 rounded-2xl object-cover grayscale group-hover/item:grayscale-0 transition-all border border-white/10" alt={creator.name}/>
                                              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-[10px] font-black">#{i+1}</div>
                                           </div>
                                           <span className="font-black text-white text-sm uppercase tracking-tight">{creator.name}</span>
                                       </div>
                                       <span className="text-[10px] font-black text-gold uppercase tracking-tighter px-3 py-1 bg-gold/10 rounded-full">{creator.pts} PTS</span>
                                   </div>
                               ))}
                           </div>
                           <Button className="w-full mt-12 h-16 bg-white hover:bg-gold text-black font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all">
                              {t("common.search")}
                           </Button>
                       </div>
                   </div>
               </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
