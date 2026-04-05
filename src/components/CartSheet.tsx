import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { X, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CartSheet = () => {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState(false);

  const handleOrder = async () => {
    if (!user) {
      toast.error("Connectez-vous pour passer commande");
      navigate("/auth");
      return;
    }

    setOrdering(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({ user_id: user.id, total, status: "pending" })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      toast.success("Commande passée avec succès !");
    } catch (err: any) {
      toast.error("Erreur lors de la commande : " + err.message);
    }
    setOrdering(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <ShoppingCart size={20} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-card border-border w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-foreground">Panier ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <ShoppingCart size={48} className="mb-4" />
            <p>Votre panier est vide</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 mt-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.price.toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-muted-foreground hover:text-foreground">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-muted-foreground hover:text-foreground">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4 space-y-3">
              <div className="flex justify-between text-lg font-display font-bold">
                <span>Total</span>
                <span className="text-gradient-gold">{total.toFixed(2)} €</span>
              </div>
              <Button className="w-full bg-gradient-gold font-semibold shadow-gold" onClick={handleOrder} disabled={ordering}>
                {ordering ? "Traitement..." : "Commander"}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
