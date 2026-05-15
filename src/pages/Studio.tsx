import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Studio = () => {
  const { dir } = useLang();

  return (
    <div className={`min-h-screen bg-[#f1f5f9] font-body text-slate-900 flex flex-col ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      <main className="pt-24 flex-grow flex flex-col">
        <div className="w-full flex-grow px-0 md:px-4 pb-8">
          {/* Desktop: iframe plein écran, Mobile: iframe tall scrollable */}
          <div className="w-full bg-[#062112] md:rounded-[40px] shadow-2xl border border-emerald-900/20 overflow-hidden"
               style={{ height: 'calc(100vh - 100px)', minHeight: '600px' }}>
            <iframe
              src="/studio-app/index.html"
              title="Nexus Lab Studio"
              allow="fullscreen"
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          </div>
          {/* Mobile hint */}
          <p className="md:hidden text-center text-xs text-emerald-700/60 font-bold mt-3 uppercase tracking-widest">
            📱 Pincez pour zoomer • Faites défiler pour voir tous les résultats
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Studio;
