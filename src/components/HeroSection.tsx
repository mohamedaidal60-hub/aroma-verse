import { ArrowRight, Sparkles, GraduationCap, ShoppingBag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-perfume.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury perfume collection" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-gold tracking-widest uppercase">Perfume Nexus Ecosystem</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-4 text-white">
            PERFUME NEXUS
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-arabic font-medium mb-12 text-gold/90 drop-shadow-lg" dir="rtl">
            حيث تلتقي رائحة الإبداع بطعم المعرفة
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/80 text-black font-bold h-16 px-10 rounded-xl shadow-2xl transition-all hover:scale-105 flex items-center gap-3"
              onClick={() => window.location.href = "/academy"}
            >
              <GraduationCap size={24} />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs opacity-80 uppercase">Academy</span>
                <span className="font-arabic text-lg">ابدأ التعلم مجاناً</span>
              </div>
            </Button>

            <Button 
              size="lg" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 h-16 px-10 rounded-xl transition-all hover:scale-105 flex items-center gap-3"
              onClick={() => window.location.href = "/marketplace"}
            >
              <ShoppingBag size={24} />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs opacity-80 uppercase">Shop</span>
                <span className="font-arabic text-lg">تسوق الآن</span>
              </div>
            </Button>

            <Button 
              size="lg" 
              className="bg-green-600/20 hover:bg-green-600/40 backdrop-blur-md text-green-400 border border-green-600/30 h-16 px-10 rounded-xl transition-all hover:scale-105 flex items-center gap-3"
              onClick={() => window.location.href = "/investir"}
            >
              <TrendingUp size={24} />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs opacity-80 uppercase">Invest</span>
                <span className="font-arabic text-lg">استثمر</span>
              </div>
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16 pt-12 border-t border-white/10">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-display font-bold text-white mb-1">100K+</span>
              <span className="text-gold font-arabic text-xl">مستخدم</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-display font-bold text-white mb-1">50K+</span>
              <span className="text-gold font-arabic text-xl">منتج</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-display font-bold text-white mb-1">10K+</span>
              <span className="text-gold font-arabic text-xl">مورد</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-display font-bold text-white mb-1">12K+</span>
              <span className="text-gold font-arabic text-xl">مستثمر</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
