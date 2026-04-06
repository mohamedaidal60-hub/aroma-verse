import { useLang } from "@/contexts/LanguageContext";

export const Logo = ({ className = "" }: { className?: string }) => {
  const { dir } = useLang();
  
  return (
    <div className={`flex items-center gap-4 group transition-all duration-500 hover:opacity-90 ${className} ${dir === "rtl" ? "flex-row-reverse" : "flex-row"}`}>
      {/* Icon: The Nexus Crystal Drop */}
      <div className="relative w-12 h-14 flex items-center justify-center">
         {/* Metallic Gold Drop Shape (SVG) */}
         <svg viewBox="0 0 40 50" className="w-10 h-10 drop-shadow-gold transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
            <path 
               d="M20 0C25 15 35 25 35 35C35 43.28 28.28 50 20 50C11.72 50 5 43.28 5 35C5 25 15 15 20 0Z" 
               fill="url(#goldGradient)"
               className="stroke-white/10 stroke-[0.5]"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FEF3C7', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
         </svg>
         
         {/* Inner Nexus Link Ring */}
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-black/20 group-hover:border-gold/50 transition-all opacity-40 group-hover:scale-150 group-hover:opacity-100 duration-1000"></div>
         </div>
      </div>

      {/* Brand Text: Premium Minimalist */}
      <div className={`flex flex-col gap-0.5 ${dir === "rtl" ? "items-end" : "items-start"}`}>
        <h1 className="text-2xl font-display font-black tracking-[-0.08em] uppercase text-white leading-none">
           PERFUME <span className="text-gold italic font-extrabold tracking-tighter ml-[-2px]">NEXUS</span>
        </h1>
        <div className="flex items-center gap-2">
           <div className="h-[1px] w-4 bg-gold/40"></div>
           <span className="text-[9px] font-black uppercase tracking-[0.6em] text-gold opacity-60 leading-tight">
              WORLDWIDE • NETWORK
           </span>
        </div>
      </div>
    </div>
  );
};
