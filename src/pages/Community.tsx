import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Globe2, MapPin, MessageSquare, Heart, Trophy, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Community() {
  const [continent, setContinent] = useState("Loading...");
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setContinent(data.continent_name || "Europe");
      })
      .catch(() => setContinent("Europe"));
  }, []);

  const dummyPosts = [
    { id: 1, author: "Jean D.", avatar: 30, text: "Je cherche un fournisseur fiable pour l'absolue de rose de mai.", likes: 45, comments: 12 },
    { id: 2, author: "Sarah M.", avatar: 35, text: "Mon dernier prototype Oud & Vanille vient de passer les tests de macération ! Résultat bluffant.", likes: 120, comments: 34 },
    { id: 3, author: "AromaCorp", avatar: 25, text: "Attention à la nouvelle régulation IFRA concernant les muscs polycycliques. Mettez à jour vos formules.", likes: 89, comments: 5 },
    { id: 4, author: "Alex R.", avatar: 40, text: "Qui a une bonne alternative synthétique au santal albun ?", likes: 12, comments: 8 },
  ];

  const topCreators = [
    { name: "Sarah M.", points: 1540 },
    { name: "Léonard F.", points: 1320 },
    { name: "AromaCorp", points: 980 },
    { name: "Jean D.", points: 850 },
    { name: "Nez_Anonyme", points: 640 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {!activeChannel ? (
            <>
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Communauté <span className="text-gradient-gold">AromaVerse</span></h1>
                <p className="text-muted-foreground text-lg">Choisissez un canal pour échanger des formules, fournisseurs et participer aux votes mensuels.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div onClick={() => setActiveChannel("Globale")} className="glass-card p-8 rounded-2xl border-primary/20 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Globe2 size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Communauté Globale</h2>
                  <p className="text-muted-foreground mb-6">Le HUB mondial (85 000+ membres). Pour les grands débats, les formules internationales et l'industrie globale.</p>
                  <div className="bg-secondary p-4 rounded-xl flex items-center justify-between">
                    <div className="flex -space-x-4">
                      {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-10 h-10 rounded-full border-2 border-background" alt="avatar" />)}
                    </div>
                    <span className="text-sm font-bold text-primary">Accéder au Flux</span>
                  </div>
                </div>

                {(localStorage.getItem("adminAuth") === "true" ? ["Europe", "Afrique", "Asie", "Amérique", "Océanie"] : [continent]).map((cont, idx) => (
                  <div key={cont} onClick={() => setActiveChannel(cont)} className="glass-card p-8 rounded-2xl border-primary/20 hover:border-primary/50 transition-colors cursor-pointer group bg-primary/5">
                    <div className="w-16 h-16 bg-gradient-gold shadow-gold rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform relative">
                      <MapPin size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Canal {cont}</h2>
                    <p className="text-muted-foreground mb-6">Flux continental. Partagez des informations ultra-locales sur les fournisseurs, réglementations et matières premières de la région.</p>
                    <div className="bg-secondary p-4 rounded-xl flex items-center justify-between">
                      <div className="flex -space-x-4">
                        {[5,6,7].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + idx * 3}`} className="w-10 h-10 rounded-full border-2 border-background" alt="avatar" />)}
                      </div>
                      <span className="text-sm font-bold text-primary">Accéder au Flux</span>
                    </div>
                  </div>
                ))}
            </div>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4">
               <Button variant="ghost" onClick={() => setActiveChannel(null)} className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
                   <ArrowLeft size={16}/> Retour aux Canaux
               </Button>
               
               <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 rounded-xl bg-primary/10 text-primary">
                       {activeChannel === "Globale" ? <Globe2 size={32}/> : <MapPin size={32}/>}
                   </div>
                   <div>
                       <h1 className="text-3xl font-display font-bold">Flux : {activeChannel}</h1>
                       <p className="text-muted-foreground">Discussions, entraide et votes des créateurs en temps réel.</p>
                   </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* FEED */}
                   <div className="lg:col-span-2 flex flex-col gap-6">
                       <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                           <img src="https://i.pravatar.cc/100?img=11" className="w-12 h-12 rounded-full" alt="Mon profil" />
                           <input type="text" placeholder="Partagez une formule, demandez de l'aide..." className="flex-1 bg-transparent border-0 focus:ring-0 text-foreground" />
                           <Button className="bg-primary/20 text-primary hover:bg-primary/30 rounded-full gap-2"><Plus size={16}/> Publier</Button>
                       </div>

                       {dummyPosts.map(post => (
                           <div key={post.id} className="glass-card p-6 rounded-2xl border-border">
                               <div className="flex items-center gap-3 mb-4">
                                   <img src={`https://i.pravatar.cc/100?img=${post.avatar}`} className="w-10 h-10 rounded-full" alt={post.author} />
                                   <div>
                                       <h4 className="font-bold">{post.author}</h4>
                                       <span className="text-xs text-muted-foreground">Il y a 2 heures</span>
                                   </div>
                               </div>
                               <p className="text-foreground/90 mb-6">{post.text}</p>
                               <div className="flex items-center gap-6 pt-4 border-t border-border">
                                   <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                       <Heart size={18}/> {post.likes}
                                   </button>
                                   <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                       <MessageSquare size={18}/> {post.comments} commentaires
                                   </button>
                               </div>
                           </div>
                       ))}
                   </div>

                   {/* LEADERBOARD */}
                   <div className="flex flex-col gap-6">
                       <div className="glass-card p-6 rounded-2xl border-primary/20 bg-primary/5">
                           <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                               <Trophy className="text-gradient-gold" /> Top Créateurs
                           </h3>
                           <p className="text-sm text-muted-foreground mb-6">Vote mensuel. Les 10 meilleurs accumulant des "Likes" gagnent des accès Pro.</p>
                           
                           <div className="space-y-4">
                               {topCreators.map((creator, index) => (
                                   <div key={creator.name} className="flex items-center justify-between p-3 bg-background rounded-xl border border-border">
                                       <div className="flex items-center gap-3">
                                           <span className={`font-bold w-6 text-center ${index === 0 ? 'text-gradient-gold' : 'text-muted-foreground'}`}>#{index + 1}</span>
                                           <span className="font-medium">{creator.name}</span>
                                       </div>
                                       <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">{creator.points} pts</span>
                                   </div>
                               ))}
                           </div>
                           <Button className="w-full mt-6 bg-gradient-gold shadow-gold text-white font-bold">Voir tous les classements</Button>
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
