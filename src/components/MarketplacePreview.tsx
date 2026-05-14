import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLang } from "@/contexts/LanguageContext";

const products = [
  {
    id: "p1",
    name: "Oud Malaki Pure",
    category: "MATIÈRES PREMIÈRES",
    category_key: "marketplace.matiere",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1592914610354-fd359645f8b9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "p2",
    name: "Ambroxan Crystal",
    category: "MOLÉCULES",
    category_key: "marketplace.molecules",
    price: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1528740561666-dc2479da08ad?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "p3",
    name: "Jasmin Absolute",
    category: "MATIÈRES PREMIÈRES",
    category_key: "marketplace.matiere",
    price: 280,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1595151402017-40c291109a20?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "p4",
    name: "Cetalox Prime",
    category: "MOLÉCULES",
    category_key: "marketplace.molecules",
    price: 95,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1615397323145-120019fa300e?auto=format&fit=crop&w=400&q=80"
  },
];

const MarketplacePreview = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t, dir } = useLang();

  return (
    <section className="py-24 font-body">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
              <Star size={14} className="text-gold" fill="currentColor" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">{t("marketplace.badge")}</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-black leading-none tracking-tighter">
              {t("marketplace.title.1")} <span className="text-gold">{t("marketplace.title.2")}</span>
            </h2>
            <p className={`text-xl text-emerald-700/70 mt-4 ${dir === "rtl" ? "font-arabic" : ""}`}>
              {t("marketplace.subtitle")}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/marketplace')}
            className="border-emerald-200 hover:border-gold hover:bg-gold/5 h-14 px-8 rounded-2xl group transition-all"
          >
            {t("marketplace.view_all")} 
            <ArrowRight size={18} className={dir === "rtl" ? "mr-2 rotate-180" : "ml-2 group-hover:translate-x-1 transition-transform"} />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group glass-card rounded-[32px] overflow-hidden border border-emerald-100 hover:border-gold/30 transition-all duration-500 bg-white/20">
              <div className="h-64 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-[10px] font-bold text-gold border border-gold/20">
                    {t(product.category_key)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-gold transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-2xl font-black text-foreground mb-6">{product.price} €</p>
                
                <Button 
                  onClick={() => addItem(product)}
                  className="w-full h-12 bg-emerald-50 hover:bg-gold hover:text-black font-black text-xs uppercase tracking-widest rounded-xl border border-emerald-200 hover:border-gold transition-all flex items-center gap-2"
                >
                  <ShoppingCart size={16} /> {t("marketplace.add_to_cart")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
