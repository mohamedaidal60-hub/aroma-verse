import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Shield, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sql } from "@/lib/neon";

export default function Pricing() {
  const { user } = useAuth();
  const [continent, setContinent] = useState("");
  const [pricing, setPricing] = useState(30);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const cont = data.continent_name || "Europe";
        setContinent(cont);
        if (["Africa", "Afrique"].includes(cont)) setPricing(10);
        else if (["Asia", "Asie", "South America"].includes(cont)) setPricing(20);
        else setPricing(30);
      })
      .catch(() => { setContinent("Europe"); setPricing(30); });
  }, []);

  const handleSubscribe = async () => {
    if (!user) return toast.error("Connectez-vous d'abord !");
    try {
      await sql`INSERT INTO subscriptions (email, continent, status) VALUES (${user.email}, ${continent}, 'En attente')`;
      toast.success("Demande d'abonnement envoyée à l'administrateur !");
    } catch (e: any) {
      toast.error("Erreur : " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-display font-bold mb-4">Plans et <span className="text-gradient-gold">Abonnements</span></h1>
            <p className="text-muted-foreground text-lg mb-2">Les tarifs professionnels s'adaptent équitablement à votre région : <strong className="text-primary">{continent}</strong></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl border-border flex flex-col">
              <h2 className="text-2xl font-bold mb-2">Spectateur</h2>
              <p className="text-muted-foreground mb-6">Profitez des outils de base d'AromaVerse.</p>
              <div className="text-4xl font-bold mb-8">0 €<span className="text-lg text-muted-foreground font-normal"> / an</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm"><Check className="text-green-500"/> Accès au Studio limité (1 formule)</li>
                <li className="flex items-center gap-3 text-sm"><Check className="text-green-500"/> Aperçu de l'Academy</li>
                <li className="flex items-center gap-3 text-sm"><Check className="text-green-500"/> Consultation Marketplace</li>
              </ul>
              <Button variant="outline" className="w-full">Mode Actuel</Button>
            </div>

            <div className="glass-card p-8 rounded-3xl border-primary bg-primary/5 flex flex-col relative shadow-2xl shadow-primary/10">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-gold text-white px-4 py-1 rounded-full text-sm font-bold shadow-gold flex items-center gap-1">
                <Star size={14}/> Accès Premium
              </div>
              <h2 className="text-2xl font-bold mb-2">Abonnement Pro</h2>
              <p className="text-muted-foreground mb-6">Toutes les fonctionnalités avancées (Tarif ajusté).</p>
              <div className="text-4xl font-bold mb-8 text-primary">{pricing} €<span className="text-lg text-muted-foreground font-normal"> / an</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="text-primary"/> Accès illimité Moteur B2B Global</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="text-primary"/> Formules d'IA débloquées (Studio)</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="text-primary"/> Toutes les données Academy et Investissement</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Shield className="text-primary"/> Accès complet API sécurisées</li>
              </ul>
              <Button onClick={handleSubscribe} className="w-full bg-gradient-gold shadow-gold font-bold">Demander l'Accès Pro</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
