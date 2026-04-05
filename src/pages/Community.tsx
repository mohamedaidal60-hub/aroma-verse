import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Globe2, Share2, MapPin } from "lucide-react";

export default function Community() {
  const [continent, setContinent] = useState("Loading...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setContinent(data.continent_name || "Europe");
      })
      .catch(() => setContinent("Europe"));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Communauté <span className="text-gradient-gold">AromaVerse</span></h1>
            <p className="text-muted-foreground text-lg">Rejoignez le réseau mondial et votre réseau local de créateurs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl border-primary/20 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Globe2 size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Communauté Globale</h2>
              <p className="text-muted-foreground mb-6">Échangez avec des experts, nez et chimistes du monde entier. Partagez vos formules et demandez des avis internationaux.</p>
              <div className="bg-secondary p-4 rounded-xl flex items-center justify-between">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => <img key={i} src={`https://source.unsplash.com/100x100/?portrait,${i}`} className="w-10 h-10 rounded-full border-2 border-background" />)}
                </div>
                <span className="text-sm font-bold text-primary">Rejoindre le HUB</span>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border-primary/20 hover:border-primary/50 transition-colors cursor-pointer group bg-primary/5">
              <div className="w-16 h-16 bg-gradient-gold shadow-gold rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform relative">
                <MapPin size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Canal {continent}</h2>
              <p className="text-muted-foreground mb-6">Un réseau exclusif détecté selon votre position. Idéal pour partager des données sur les fournisseurs locaux, régulations régionales (IFRA) et logistique proche.</p>
              <div className="bg-secondary p-4 rounded-xl flex items-center justify-between">
                <div className="flex -space-x-4">
                  {[5,6,7].map(i => <img key={i} src={`https://source.unsplash.com/100x100/?face,${i}`} className="w-10 h-10 rounded-full border-2 border-background" />)}
                </div>
                <span className="text-sm font-bold text-primary">Connecter ({continent})</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
