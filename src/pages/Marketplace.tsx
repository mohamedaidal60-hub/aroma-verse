import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, ShoppingBag, Star, User, PlusCircle, AlertTriangle, MessageSquare, Image as ImageIcon, Upload, X, ShieldAlert, Lock, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Marketplace() {
  const { t } = useLang();
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // États de la Modale de Vente
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Huile essentielle");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  // États de Chat & Détails
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender:string, text:string, time:string}[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Rôles
  const isSpectator = profile?.role === "subscriber_no_pass" || !profile;
  const isFullSubscriber = profile?.role === "subscriber_pass" || profile?.role === "admin";

  const categoryFilters = [
    "Huile essentielle", 
    "Huile absolut", 
    "Hydrolat",
    "Aromas chemicals", 
    "equipment (laboratoire)",
    "Cosmétiques"
  ];
  const [activeFilter, setActiveFilter] = useState("Huile essentielle");

  // Simulation BDD initiale
  useEffect(() => {
     setItems([
        { id: 1, title: "Huile Essentielle de Rose (Bio)", desc: "Récolte 2025, pure à 100%. Idéal pour compositions florales de luxe. Fourni avec certificat d'analyse.", price: 80, displayPrice: 80 * 1.20, vendor: "RoseExpert_Grasse", category: "Matières Premières", image: "https://images.unsplash.com/photo-1595425970377-c9703bc48b12?auto=format&fit=crop&q=80&w=800" },
        { id: 2, title: "Lot de 50 Flacons en Verre 30ml", desc: "Verre épais, pompes dorées haute précision. Stock limité. Parfait pour collections privées.", price: 40, displayPrice: 40 * 1.20, vendor: "PackagingLux", category: "Flacons", image: "https://images.unsplash.com/photo-1629198725807-60de7dc8a739?auto=format&fit=crop&q=80&w=800" },
        { id: 3, title: "Iso E Super (Pur)", desc: "Molécule de synthèse boisée et ambrée, pureté 99%. Un incontournable de la parfumerie moderne.", price: 25, displayPrice: 25 * 1.20, vendor: "ChemMaster_Lab", category: "Molécules de Synthèse", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800" }
     ]);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      if (previewImages.length + files.length > 5) {
          toast.error("Limite atteinte: 5 images maximum par article.");
          return;
      }

      const maxSizeMB = 2;
      Array.from(files).forEach(file => {
          if (file.size > maxSizeMB * 1024 * 1024) {
              toast.error(`Sécurité: L'image ${file.name} est trop lourde (> ${maxSizeMB} Mo).`);
              return;
          }
          const reader = new FileReader();
          reader.onload = (ev) => {
              if (ev.target?.result) setPreviewImages(prev => [...prev, ev.target!.result as string]);
          };
          reader.readAsDataURL(file);
      });
  };

  const handleSellProduct = () => {
     if (!isFullSubscriber) {
         toast.error("Accès Refusé: Vous devez avoir un Pass Abonné Actif pour vendre.");
         return;
     }
     if (!newProdName || !newProdPrice) {
         toast.error("Veuillez remplir au moins le titre et le prix.");
         return;
     }

     const basePrice = parseFloat(newProdPrice);
     const newItem = {
         id: Date.now(),
         title: newProdName,
         desc: newProdDesc,
         price: basePrice,
         displayPrice: basePrice * 1.20,
         vendor: profile?.full_name || "Moi (Abonné)",
         category: newProdCategory,
         image: previewImages.length > 0 ? previewImages[0] : "https://images.unsplash.com/photo-1616949755610-8c9bac08f9f8?auto=format&fit=crop&q=80&w=800"
     };
     setItems(prev => [newItem, ...prev]);
     setShowAddModal(false);
     setNewProdName(""); setNewProdDesc(""); setNewProdPrice(""); setPreviewImages([]);
     toast.success("Produit mis en vente ! La commission de 20% a été appliquée au prix public.");
  };

  const handleSendMessage = () => {
    if(!newMessage) return;
    
    // Contrôle Anti-Coordonnées
    const phoneRegex = /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g;
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
    
    if (phoneRegex.test(newMessage) || emailRegex.test(newMessage)) {
        toast.error("ALERTE SÉCURITÉ: L'échange de coordonnées directes est interdit. Risque de bannissement.");
        return;
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages([...chatMessages, { sender: "Moi", text: newMessage, time: now }]);
    setNewMessage("");
    
    toast.info("Message transmis de manière sécurisée au vendeur.");
  };

  const handleOpenChat = (product: any) => {
    setSelectedProduct(product);
    setShowChat(true);
    setIsChatMinimized(false);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-body">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 bg-gold/10 px-3 py-1 rounded-full border border-gold/20 mb-4">
                 <ShieldAlert size={14} className="text-gold" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gold text-shadow-sm">Marché P2P Surveillé & Sécurisé</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Commerce <span className="text-gold tracking-tighter">Communautaire</span></h1>
              
              <div className="relative group max-w-2xl">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700/70 group-focus-within:text-gold transition-colors" size={20} />
                 <Input 
                   placeholder="Rechercher une huile, une molécule, un vendeur..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="h-14 pl-12 bg-emerald-50 border-emerald-200 rounded-2xl w-full text-lg focus-visible:ring-gold transition-all"
                 />
              </div>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto self-end">
               {isSpectator ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3">
                     <Lock className="text-emerald-700/70" size={20} />
                     <div className="text-[10px] uppercase font-black text-emerald-700/70 tracking-widest leading-tight">
                        Pass Abonné Requis<br />Pour Vendre & Acheter
                     </div>
                  </div>
               ) : (
                  <Button onClick={() => setShowAddModal(true)} className="bg-gold text-black font-black uppercase tracking-widest rounded-2xl h-14 px-8 shadow-xl shadow-gold/20 hover:scale-105 transition-transform flex items-center gap-2">
                     <PlusCircle size={20} /> Publier une offre
                  </Button>
               )}
            </div>
          </div>

          {/* Filtres Catégories : Menu Déroulant */}
          <div className="mb-10 w-full md:w-1/3">
             <label className="text-[10px] font-black uppercase tracking-widest text-emerald-700/70 block mb-3 pl-2">Filtrer par catégorie</label>
             <div className="relative">
                <select 
                   value={activeFilter} 
                   onChange={(e) => setActiveFilter(e.target.value)}
                   className="w-full appearance-none bg-emerald-50 border border-emerald-200 rounded-2xl h-14 px-6 text-foreground text-lg font-bold outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer transition-all hover:bg-emerald-100"
                >
                   {categoryFilters.map(filter => (
                      <option key={filter} value={filter} className="bg-white text-foreground">{filter}</option>
                   ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
             </div>
          </div>

          {/* Grid Produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             {items.filter(item => {
                const matchesCategory = item.category === activeFilter || activeFilter === "";
                const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                     item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     item.desc.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
             }).map((item) => (
                <div key={item.id} className="glass-card rounded-[32px] p-6 group cursor-pointer hover:border-gold/30 transition-all flex flex-col relative" onClick={() => handleOpenChat(item)}>
                   <div className="aspect-[4/5] bg-secondary/30 rounded-2xl mb-4 overflow-hidden relative border border-emerald-100">
                      <img 
                        src={item.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://picsum.photos/seed/placeholder/800/600";
                        }}
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-white/60 backdrop-blur text-foreground text-[10px] font-black uppercase tracking-widest rounded-full">
                         {item.category}
                      </div>
                   </div>
                   <h3 className="font-display font-medium text-xl mb-1 line-clamp-1 text-foreground">{item.title}</h3>
                   <div className="flex items-center gap-1 text-[11px] text-emerald-700/70 mb-4">
                      <User size={12} className="text-gold" /> Vendeur: <span className="font-bold text-foreground">{item.vendor}</span>
                   </div>
                   <div className="mt-auto flex justify-between items-center bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                      <div>
                        <span className="text-[10px] text-emerald-700/70 uppercase block">Prix Public</span>
                        <div className="font-black text-2xl text-gold">{item.displayPrice.toFixed(2)} €</div>
                      </div>
                      <Button className="rounded-xl h-10 px-4 bg-gold/10 text-gold border border-gold/20 hover:bg-gold hover:text-black">Détails</Button>
                   </div>
                   {isSpectator && (
                      <div className="absolute inset-x-6 bottom-20 py-2 bg-white/60 backdrop-blur-md rounded-xl flex items-center justify-center gap-2 border border-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Lock size={14} className="text-gold" />
                         <span className="text-[10px] font-black uppercase text-gold">Abonnement Requis</span>
                      </div>
                   )}
                </div>
             ))}
          </div>

          {/* Modal Vente */}
          {showAddModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/90 backdrop-blur-lg" onClick={() => setShowAddModal(false)}>
                <div className="glass-card max-w-2xl w-full p-8 rounded-[40px] border border-emerald-200 shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
                    <h2 className="text-4xl font-display font-black text-foreground mb-2">Vendre un Article</h2>
                    <p className="text-emerald-700/70 text-sm mb-8">Partagez votre stock avec la communauté. Nous appliquons 20% de commission.</p>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-[10px] uppercase tracking-widest text-emerald-700/70 font-black mb-2 block">Nom de l'article</label>
                              <Input className="h-12 bg-emerald-50 rounded-xl border-emerald-200 text-foreground placeholder:text-foreground/20" placeholder="Ex: Absolu Jasmin de Grasse" value={newProdName} onChange={e => setNewProdName(e.target.value)} />
                           </div>
                           <div>
                              <label className="text-[10px] uppercase tracking-widest text-emerald-700/70 font-black mb-2 block">Catégorie</label>
                              <select className="w-full h-12 bg-emerald-50 border border-emerald-200 rounded-xl text-foreground px-4 text-sm" value={newProdCategory} onChange={e => setNewProdCategory(e.target.value)}>
                                 {categoryFilters.filter(c => c !== 'Tous').map(c => <option key={c} value={c} className="bg-white">{c}</option>)}
                              </select>
                           </div>
                        </div>

                        <div>
                           <label className="text-[10px] uppercase tracking-widest text-emerald-700/70 font-black mb-2 block">Descriptif Technique & Olfactif</label>
                           <textarea className="w-full bg-emerald-50 rounded-xl border-emerald-200 text-foreground p-4 min-h-[100px] text-sm focus:border-gold outline-none transition-all" placeholder="Détaillez l'origine, la pureté et les notes..." value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)}></textarea>
                        </div>
                        
                        <div className="flex gap-4 items-end">
                           <div className="flex-1">
                              <label className="text-[10px] uppercase tracking-widest text-emerald-700/70 font-black mb-2 block">VOTRE PRIX NET (€)</label>
                              <Input type="number" className="h-14 bg-emerald-100 rounded-xl border-gold/30 text-foreground text-2xl font-black text-center" placeholder="0.00" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} />
                           </div>
                           <div className="flex-1 p-4 bg-gold text-black rounded-xl border border-gold shadow-lg shadow-gold/20">
                              <label className="text-[10px] uppercase tracking-widest font-black mb-1 block opacity-70">PRIX DE VENTE PUBLIC</label>
                              <div className="text-3xl font-black">
                                 {newProdPrice ? (parseFloat(newProdPrice) * 1.20).toFixed(2) : "0.00"} €
                              </div>
                           </div>
                        </div>

                        <div>
                           <label className="text-[10px] uppercase tracking-widest text-emerald-700/70 font-black mb-2 block">Photos (Max 5 images)</label>
                           <div className="flex gap-3 flex-wrap">
                              {previewImages.map((src, i) => (
                                 <div key={i} className="w-20 h-20 rounded-xl overflow-hidden relative border border-emerald-300 shadow-lg">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button onClick={() => setPreviewImages(previewImages.filter((_, idx)=>idx!==i))} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-foreground hover:text-red-500 transition-colors"><X size={12}/></button>
                                 </div>
                              ))}
                              {previewImages.length < 5 && (
                                 <label className="w-20 h-20 rounded-xl border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center text-emerald-700/70 cursor-pointer hover:border-gold hover:text-gold transition-all bg-emerald-50">
                                    <Upload size={20} className="mb-1 opacity-50"/>
                                    <span className="text-[8px] font-black uppercase">Ajouter</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                                 </label>
                              )}
                           </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                           <Button className="flex-1 h-14 bg-gold text-black font-black uppercase tracking-widest rounded-2xl hover:bg-gold/80 shadow-xl shadow-gold/20" onClick={handleSellProduct}>Confirmer & Publier</Button>
                           <Button variant="outline" className="flex-1 h-14 border-emerald-200 text-foreground rounded-2xl" onClick={() => setShowAddModal(false)}>Annuler</Button>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* Modal Détails & Chat */}
          {selectedProduct && !isChatMinimized && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/95 backdrop-blur-2xl" onClick={() => {setSelectedProduct(null); setShowChat(false)}}>
                <div className="glass-card max-w-6xl w-full flex flex-col md:flex-row overflow-hidden rounded-[40px] border border-emerald-200 shadow-3xl bg-[#0a0a0a]" style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
                    
                    {/* Colonne Produit */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-emerald-100 overflow-y-auto scrollbar-hide">
                        <div className="aspect-square w-full rounded-[32px] overflow-hidden mb-10 border border-emerald-100 bg-secondary/20 shadow-2xl relative group/img">
                           <img 
                              src={selectedProduct.image} 
                              className="w-full h-full object-cover animate-in fade-in duration-500" 
                              alt={selectedProduct.title}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1616949755610-8c9bac08f9f8?auto=format&fit=crop&q=80&w=800";
                              }}
                           />
                           <div className="absolute top-6 right-6 px-4 py-2 bg-white/80 backdrop-blur rounded-2xl border border-emerald-200 flex items-center gap-2">
                              <ShieldAlert size={14} className="text-gold" />
                              <span className="text-foreground font-black text-[10px] uppercase tracking-widest">Contrôlé NEXUS</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 rounded-2xl bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
                              <User size={18} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold/60">Vendeur Nexus</p>
                              <p className="text-foreground font-bold">{selectedProduct.vendor}</p>
                           </div>
                        </div>

                        <h2 className="text-4xl font-display font-black text-foreground mb-4 tracking-tighter">{selectedProduct.title}</h2>
                        <div className="flex items-baseline gap-2 mb-10">
                           <div className="text-5xl font-black text-gold">{selectedProduct.displayPrice.toFixed(2)} €</div>
                           <span className="text-[10px] text-emerald-700/70 font-black uppercase tracking-widest">Prix Final Public</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-10">
                           <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 backdrop-blur-sm">
                              <span className="text-[9px] uppercase font-black text-gold/60 block mb-1">Catégorie</span>
                              <span className="text-foreground text-sm font-bold uppercase tracking-tight">{selectedProduct.category}</span>
                           </div>
                           <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 backdrop-blur-sm">
                              <span className="text-[9px] uppercase font-black text-gold/60 block mb-1">ID Objet</span>
                              <span className="text-foreground text-sm font-mono">#{selectedProduct.id.toString().slice(-6)}</span>
                           </div>
                           <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 backdrop-blur-sm">
                              <span className="text-[9px] uppercase font-black text-gold/60 block mb-1">Condition</span>
                              <span className="text-emerald-400 text-sm font-bold uppercase">Neuf / Intact</span>
                           </div>
                           <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 backdrop-blur-sm">
                              <span className="text-[9px] uppercase font-black text-gold/60 block mb-1">Disponibilité</span>
                              <span className="text-foreground text-sm font-bold">En Stock</span>
                           </div>
                        </div>

                        <div className="space-y-4 mb-12">
                           <div className="flex items-center gap-2 border-b border-emerald-200 pb-2 mb-4">
                              <Info size={14} className="text-gold" />
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-700/70">Note du Vendeur</h4>
                           </div>
                           <p className="text-foreground/60 leading-relaxed text-sm italic">"{selectedProduct.desc}"</p>
                        </div>
                        
                        {!isSpectator ? (
                           !showChat && (
                              <Button className="w-full h-16 bg-gold text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold/30" onClick={() => {setShowChat(true); setChatMessages([])}}>
                                 <MessageSquare size={22} /> Entrer en discussion directe
                              </Button>
                           )
                        ) : (
                           <div className="p-8 bg-red-500/5 rounded-3xl border border-red-500/20 text-center backdrop-blur-lg">
                              <Lock className="mx-auto mb-4 text-red-500" size={32} />
                              <p className="text-sm font-black uppercase tracking-widest text-red-500 mb-2">Canal P2P Verrouillé</p>
                              <p className="text-[10px] text-emerald-700/70 uppercase leading-relaxed font-medium">L'activation de votre pack membre est nécessaire pour négocier avec ce vendeur.</p>
                           </div>
                        )}
                    </div>

                    {/* Chat Interne */}
                    {showChat && (
                      <div className="w-full md:w-1/2 flex flex-col bg-white/60 relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none"></div>
                         
                         <div className="p-8 border-b border-emerald-100 bg-white/80 backdrop-blur-2xl flex items-center justify-between z-10">
                            <div className="flex items-start gap-5">
                               <div className="w-14 h-14 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500 border border-red-600/20 shadow-2xl animate-pulse">
                                  <ShieldAlert size={28} />
                               </div>
                               <div>
                                  <p className="text-[11px] text-red-500 uppercase tracking-[0.2em] font-black mb-1 flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                     PROTECTION NEX-GUARD ACTIVE
                                  </p>
                                  <p className="text-[10px] text-emerald-700/70 leading-relaxed max-w-sm font-bold uppercase tracking-tight">
                                     ÉCHANGE DE COORDONNÉES INTERDIT.
                                  </p>
                               </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-foreground hover:bg-emerald-100" onClick={() => setIsChatMinimized(true)}>
                               <X size={20} />
                            </Button>
                         </div>
                         
                         <div className="flex-1 p-8 overflow-y-auto space-y-8 z-10 scrollbar-hide">
                            <div className="flex justify-center">
                               <div className="px-5 py-2 bg-emerald-50 rounded-full border border-emerald-100 text-[9px] font-black uppercase tracking-widest text-gold/40 backdrop-blur-md">
                                  Discussion P2P - Session Chiffrée
                               </div>
                            </div>
                            
                            {chatMessages.length === 0 ? (
                               <div className="h-full flex items-center justify-center text-emerald-700/70 text-sm flex-col opacity-20 py-20 grayscale">
                                  <MessageSquare size={80} strokeWidth={0.5} className="mb-6" />
                                  <span className="font-black uppercase tracking-[0.4em] text-[11px]">En attente de votre message...</span>
                               </div>
                            ) : (
                               chatMessages.map((msg, i) => (
                                 <div key={i} className={`flex flex-col ${msg.sender === 'Moi' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                                    <div className={`max-w-[85%] p-6 rounded-[28px] text-sm leading-relaxed shadow-2xl backdrop-blur-md ${msg.sender === 'Moi' ? 'bg-gold text-black font-bold rounded-tr-none' : 'bg-emerald-100 text-foreground rounded-tl-none border border-emerald-200'}`}>
                                       {msg.text}
                                    </div>
                                    <div className="flex items-center gap-3 mt-3 px-3">
                                       <span className="text-[10px] text-gold font-black uppercase tracking-widest">{msg.sender}</span>
                                       <span className="text-foreground/10 text-[10px]">❘</span>
                                       <span className="text-[9px] text-emerald-700/70 font-black uppercase tracking-widest">{msg.time}</span>
                                    </div>
                                 </div>
                               ))
                            )}
                         </div>

                         <div className="p-8 border-t border-emerald-100 bg-white/80 backdrop-blur-3xl z-10">
                             <div className="relative flex items-center">
                                <Input 
                                   className="h-16 flex-1 bg-emerald-50 border-emerald-200 rounded-2xl px-8 focus:border-gold transition-all text-sm pr-16 shadow-2xl focus-visible:ring-0 placeholder:text-emerald-700/70/30" 
                                   placeholder="Posez votre question technique ici..." 
                                   value={newMessage}
                                   onChange={e => setNewMessage(e.target.value)}
                                   onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                                />
                                <Button className="absolute right-2 h-12 w-12 bg-gold text-black rounded-xl shadow-xl shadow-gold/30 hover:scale-110 active:scale-95 transition-all" onClick={handleSendMessage}>
                                   <PlusCircle className="rotate-45" size={24} />
                                </Button>
                             </div>
                             <p className="text-center mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-gold/20 italic">
                                Chiffrement Alpha-Nexus • Surveillance Admin Alpha Activée
                             </p>
                         </div>
                      </div>
                    )}
                </div>
            </div>
          )}

          {/* Bulle Chat Flottante (Réduit) */}
          {selectedProduct && isChatMinimized && (
            <div 
              className="fixed bottom-8 right-8 z-[70] w-20 h-20 bg-gold rounded-full shadow-2xl shadow-gold/40 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-in fade-in slide-in-from-bottom-5 duration-500"
              onClick={() => setIsChatMinimized(false)}
            >
               <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-background flex items-center justify-center">
                  <span className="text-[10px] font-black text-foreground">{chatMessages.length || "1"}</span>
               </div>
               <MessageSquare size={32} className="text-black" />
               <div className="absolute -left-48 bg-white/80 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black text-gold uppercase tracking-widest border border-gold/20 opacity-0 hover:opacity-100 transition-opacity">
                  Discussion avec {selectedProduct.vendor}
               </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}
