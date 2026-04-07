import { useLang } from "@/contexts/LanguageContext";

export const Logo = ({ className = "" }: { className?: string }) => {
  const { dir } = useLang();
  
  return (
    <div className={`flex items-center gap-4 group transition-all duration-500 hover:opacity-90 ${className} ${dir === "rtl" ? "flex-row-reverse" : "flex-row"}`}>
      {/* Icon: The Nexus Infinity / Abstract Geometric Form */}
      <div className="relative w-12 h-14 flex items-center justify-center">
         {/* Metallic Gold Geometric Infinity Shape (SVG) */}
         <svg viewBox="0 0 50 50" className="w-11 h-11 drop-shadow-gold transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
            <path 
               d="M14.5 15C8.5 15 4 19.5 4 25C4 30.5 8.5 35 14.5 35C22 35 28 15 35.5 15C41.5 15 46 19.5 46 25C46 30.5 41.5 35 35.5 35C28 35 22 15 14.5 15Z" 
               fill="none"
               stroke="url(#goldGradient)"
               strokeWidth="4"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="opacity-90"
            />
            {/* Elegant inner star/diamond */}
            <path d="M25 18L27 23L32 25L27 27L25 32L23 27L18 25L23 23Z" fill="url(#goldGradient)" />
            
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FEF3C7', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
         </svg>
         
         {/* Inner glowing effect */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-6 h-6 rounded-full border border-gold/10 group-hover:border-gold/40 transition-all opacity-0 group-hover:scale-150 group-hover:opacity-100 duration-1000 blur-[1px]"></div>
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
