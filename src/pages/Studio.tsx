import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Studio = () => {
  const { dir } = useLang();

  return (
    <div className={`min-h-screen bg-[#f1f5f9] font-body text-slate-900 flex flex-col ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      <main className="pt-24 flex-grow flex flex-col">
        <div className="w-full h-full flex-grow px-0 md:px-4 pb-8">
           <div className="w-full h-[calc(100vh-100px)] min-h-[800px] bg-[#062112] md:rounded-[40px] shadow-2xl overflow-hidden border border-emerald-900/20 relative">
             <iframe 
               src="/studio-app/index.html" 
               className="absolute top-0 left-0 w-full h-full border-0"
               title="Nexus Lab Studio"
               sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
             />
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Studio;
