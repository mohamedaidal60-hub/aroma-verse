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
                  {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-10 h-10 rounded-full border-2 border-background" alt="avatar" />)}
                </div>
                <span className="text-sm font-bold text-primary">Rejoindre le HUB</span>
              </div>
            </div>

            {(localStorage.getItem("adminAuth") === "true" ? ["Europe", "Afrique", "Asie", "Amérique", "Océanie"] : [continent]).map((cont, idx) => (
              <div key={cont} className="glass-card p-8 rounded-2xl border-primary/20 hover:border-primary/50 transition-colors cursor-pointer group bg-primary/5">
                <div className="w-16 h-16 bg-gradient-gold shadow-gold rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform relative">
                  <MapPin size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Canal {cont}</h2>
                <p className="text-muted-foreground mb-6">Réseau exclusif détecté selon la position. Partagez des données sur les fournisseurs locaux, régulations et logistique proche.</p>
                <div className="bg-secondary p-4 rounded-xl flex items-center justify-between">
                  <div className="flex -space-x-4">
                    {[5,6,7].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + idx * 3}`} className="w-10 h-10 rounded-full border-2 border-background" alt="avatar" />)}
                  </div>
                  <span className="text-sm font-bold text-primary">Connecter ({cont})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
