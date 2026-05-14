import { MessageSquare } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export const WhatsAppBubble = () => {
    const { t, dir } = useLang();
    
    return (
      <a 
        href="https://wa.me/213675332211" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`fixed bottom-8 ${dir === "rtl" ? "right-8" : "left-8"} z-50 bg-[#25D366] text-foreground p-5 rounded-[24px] shadow-[0_20px_40px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_30px_60px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center group active:scale-90`}
      >
        <span className={`absolute bg-emerald-100 backdrop-blur-md text-foreground text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl -top-12 opacity-0 group-hover:opacity-100 transition-all border border-emerald-300 shadow-2xl whitespace-nowrap ${dir === "rtl" ? "right-0" : "left-0"}`}>
          {t("footer.support_nexus")}
        </span>
        <MessageSquare size={32} fill="currentColor" stroke="none" />
      </a>
    );
  };
