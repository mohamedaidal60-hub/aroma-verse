import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { sql } from "@/lib/neon";
import { useState } from "react";

const CartSheet = () => {
  const { items, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) return toast.error("Veuillez vous connecter pour commander.");
    if (items.length === 0) return toast.error("Le panier est vide");

    setLoading(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const geo = await res.json();
      const continent = geo.continent_name || "Inconnu";

      const itemsDesc = items.map(i => `${i.quantity}x ${(i as any).name || (i as any).title}`).join(", ");
      await sql`INSERT INTO orders (email, continent, items, total_price, status) VALUES (${user.email}, ${continent}, ${itemsDesc}, ${total}, 'Payée / À traiter')`;

      const msg = encodeURIComponent(`Nouvelle commande (${continent}):\nClient: ${user.email}\nProduits: ${itemsDesc}\nTotal: ${total}€`);
      window.open(`https://wa.me/213675332211?text=${msg}`, "_blank");

      toast.success("Commande transmise à l'administrateur !");
      clearCart();
    } catch (e: any) {
      toast.error("Erreur serveur : " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
          <ShoppingCart className="w-5 h-5 text-foreground" />
          {items.length > 0 && <span className="absolute -top-1 -right-1 bg-primary text-[10px] font-bold text-primary-foreground w-4 h-4 rounded-full flex items-center justify-center">{items.length}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-secondary/95 backdrop-blur-xl border-border flex flex-col">
        <SheetHeader><SheetTitle className="text-xl font-display font-bold">Votre Panier</SheetTitle></SheetHeader>
        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? <p className="text-muted-foreground text-center">Votre panier est vide.</p> : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-background/50 p-3 rounded-xl border border-border">
                  <div className="flex-1"><h4 className="font-semibold text-sm">{(item as any).name || (item as any).title}</h4><div className="flex items-center gap-2 mt-2"><span className="text-sm font-bold text-primary">{item.price} €</span><span className="text-xs text-muted-foreground">x{item.quantity}</span></div></div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border pt-4 mt-auto">
            <div className="flex justify-between items-center mb-6"><span className="text-foreground font-semibold">Total</span><span className="text-2xl font-bold text-gradient-gold">{total} €</span></div>
            <Button className="w-full bg-gradient-gold shadow-gold text-white font-bold" onClick={handleCheckout} disabled={loading}>{loading ? "Traitement..." : "Procéder au paiement via l'Admin WhatsApp"} <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default CartSheet;
