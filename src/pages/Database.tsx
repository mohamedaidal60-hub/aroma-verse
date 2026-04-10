import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, Beaker, Zap, Clock, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import materialsData from "@/data/materials.json";
import { sql } from "@/lib/neon";
import { toast } from "sonner";

export default function Database() {
  const { t, dir } = useLang();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNote, setFilterNote] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [dbMaterials, setDbMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(36492);
  const itemsPerPage = 80;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterNote]);

  // Recherche dynamique dans Neon avec pagination
  useEffect(() => {
    const searchInNeon = async () => {
      setLoading(true);
      try {
        let results;
        
        // Si vide
        if (searchTerm.length < 2 && !filterNote) {
           const countRes = await sql`SELECT COUNT(*) as count FROM tgsc_materials`;
           const realCount = Number(countRes[0].count);
           setTotalCount(realCount + 134); // on ajoute les locaux

           results = await sql`
             SELECT name, cas, scent, note, 'The Good Scents Co' as company, true as "isTGSC", ifra_restricted 
             FROM tgsc_materials 
             LIMIT ${itemsPerPage} OFFSET ${(currentPage - 1) * itemsPerPage}
           `;
        } else {
           const query = `%${searchTerm.toLowerCase()}%`;
           if (filterNote) {
             const countRes = await sql`
               SELECT COUNT(*) as count FROM tgsc_materials 
               WHERE (LOWER(name) LIKE ${query} OR cas LIKE ${query})
               AND note = ${filterNote}
             `;
             setTotalCount(Number(countRes[0].count));

             results = await sql`
               SELECT name, cas, scent, note, 'The Good Scents Co' as company, true as "isTGSC", ifra_restricted 
               FROM tgsc_materials 
               WHERE (LOWER(name) LIKE ${query} OR cas LIKE ${query})
               AND note = ${filterNote}
               LIMIT ${itemsPerPage} OFFSET ${(currentPage - 1) * itemsPerPage}
             `;
           } else {
             const countRes = await sql`
               SELECT COUNT(*) as count FROM tgsc_materials 
               WHERE (LOWER(name) LIKE ${query} OR cas LIKE ${query})
             `;
             setTotalCount(Number(countRes[0].count));

             results = await sql`
               SELECT name, cas, scent, note, 'The Good Scents Co' as company, true as "isTGSC", ifra_restricted 
               FROM tgsc_materials 
               WHERE (LOWER(name) LIKE ${query} OR cas LIKE ${query})
               LIMIT ${itemsPerPage} OFFSET ${(currentPage - 1) * itemsPerPage}
             `;
           }
        }
        setDbMaterials(results);
      } catch (err) {
        console.error("Erreur recherche Neon:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(searchInNeon, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, filterNote, currentPage]);

  // Produits statiques de base (PerfumeNuke)
  const baseMaterials = materialsData.materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filterNote ? m.note === filterNote : true)
  );

  const materials = [...baseMaterials, ...dbMaterials];

  return (
    <div className={`min-h-screen bg-background flex flex-col font-body ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center mb-12 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-6 relative z-10">
                <Beaker size={14} className="text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Base de Données Scientifique</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tighter text-foreground relative z-10">
               Nexus <span className="text-primary">Data Hub</span>
             </h1>
             <p className="text-muted-foreground max-w-2xl mx-auto text-lg relative z-10">
                L'encyclopédie exhaustive des matières premières. Propulsée par <span className="text-primary font-bold">PerfumeNuke</span> + <span className="text-gold font-bold">The Good Scents Company</span> — {totalCount.toLocaleString()} ingrédients en direct.
              </p>
          </div>

          <div className="glass-card p-6 rounded-[32px] border border-white/5 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-30 shadow-2xl bg-background/80 backdrop-blur-xl">
             <div className="relative flex-1 w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" size={20} />
                <Input 
                   placeholder="Rechercher par nom, CAS ou tag (ex: Rose, 106-22-9, Musc)..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="h-14 pl-12 bg-white/5 border-white/10 rounded-2xl w-full text-lg focus-visible:ring-gold transition-all"
                />
                {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-primary animate-spin" size={20} />}
             </div>
             <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {["TOP", "HEART", "BASE"].map(note => (
                   <Button 
                      key={note}
                      variant={filterNote === note ? "default" : "outline"}
                      onClick={() => setFilterNote(filterNote === note ? null : note)}
                      className={`h-14 rounded-2xl px-6 font-black uppercase tracking-widest text-xs flex-shrink-0 ${filterNote === note ? (note === 'TOP' ? 'bg-yellow-500 text-black' : note === 'HEART' ? 'bg-rose-500 text-white' : 'bg-amber-900 text-white') : 'border-white/10 text-muted-foreground hover:bg-white/5'}`}
                   >
                     {note}
                   </Button>
                ))}
             </div>
          </div>

          {/* Table Database View */}
          <div className="glass-card rounded-[32px] border border-white/5 overflow-hidden border-t-4 border-t-primary">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                         <th className="p-5 font-black text-xs uppercase tracking-widest text-muted-foreground">Matière</th>
                         <th className="p-5 font-black text-xs uppercase tracking-widest text-muted-foreground">CAS</th>
                         <th className="p-5 font-black text-xs uppercase tracking-widest text-muted-foreground">Scent / Profil</th>
                         <th className="p-5 font-black text-xs uppercase tracking-widest text-muted-foreground">Note</th>
                         <th className="p-5 font-black text-xs uppercase tracking-widest text-muted-foreground"><div className="flex items-center gap-1"><Clock size={14}/> Longévité (h)</div></th>
                         <th className="p-5 font-black text-xs uppercase tracking-widest text-muted-foreground"><div className="flex items-center gap-1"><Zap size={14}/> Impact</div></th>
                         <th className="p-5 font-black text-xs uppercase tracking-widest text-muted-foreground">IFRA</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {materials.map((m, index) => (
                         <tr key={index} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedItem(m)}>
                            <td className="p-5 align-top">
                               <span className="font-bold text-white block mb-1">{m.name}</span>
                               <div className="flex items-center gap-1 mt-0.5">
                                 {(m as any).isTGSC && <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-gold/20 text-gold border border-gold/30">TGSC</span>}
                                 <span className="text-[10px] text-muted-foreground uppercase">{m.company || m.id}</span>
                               </div>
                            </td>
                            <td className="p-5 align-top text-xs font-mono text-muted-foreground">
                               {m.cas || "N/A"}
                            </td>
                            <td className="p-5 align-top max-w-sm">
                               <p className="text-sm text-white/80 line-clamp-2 group-hover:line-clamp-none transition-all">{m.scent || "Solvant / Additif"}</p>
                               {m.tags && m.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                     {m.tags.map((tag:string, i:number) => (
                                       <span key={i} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm bg-white/10 text-white/60">
                                         {tag}
                                       </span>
                                     ))}
                                  </div>
                               )}
                            </td>
                            <td className="p-5 align-top">
                               {m.note ? (
                                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${m.note === 'TOP' ? 'bg-yellow-500/20 text-yellow-500' : m.note === 'HEART' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-900/40 text-amber-500'}`}>
                                    {m.note}
                                  </span>
                               ) : (
                                  <span className="text-muted-foreground text-xs">-</span>
                               )}
                            </td>
                            <td className="p-5 align-top text-xs font-bold text-primary">{m.longevity || "-"}</td>
                            <td className="p-5 align-top text-xs font-bold text-gold">{m.impact || "-"}</td>
                            <td className="p-5 align-top">
                               {m.ifra_restricted ? (
                                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-red-500/20 text-red-500 border border-red-500/20">Limite</span>
                               ) : (
                                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-blue-500/20 text-blue-500 border border-blue-500/20">Standard</span>
                               )}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             {materials.length === 0 && (
                <div className="p-20 text-center text-muted-foreground">
                   Aucune matière trouvée pour votre recherche.
                </div>
             )}

             {totalCount > itemsPerPage && materials.length > 0 && (
                <div className="flex justify-between items-center p-6 border-t border-white/5 bg-white/5">
                   <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-gold hover:border-gold font-bold" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                      Précédent
                   </Button>
                   <span className="text-muted-foreground text-xs uppercase tracking-widest font-black">
                      Page <span className="text-gold text-base">{currentPage}</span> sur {Math.ceil(totalCount / itemsPerPage)}
                   </span>
                   <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-gold hover:border-gold font-bold" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= Math.ceil(totalCount / itemsPerPage)}>
                      Suivant
                   </Button>
                </div>
             )}
          </div>

          {/* Modal Détails Matière */}
          {selectedItem && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
                <div className="glass-card max-w-2xl w-full p-10 rounded-[32px] border border-white/10 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                   <button className="absolute top-6 right-6 text-muted-foreground hover:text-white" onClick={() => setSelectedItem(null)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </button>
                   
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20">
                         <Beaker size={32} />
                      </div>
                      <div>
                         <h2 className="text-3xl font-display font-black text-white">{selectedItem.name}</h2>
                         <p className="text-gold uppercase tracking-widest text-xs font-bold">{selectedItem.cas || "CAS INCONNU"}</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                         <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-black mb-2">Profil Olfactif</h3>
                         <p className="text-white leading-relaxed">{selectedItem.scent || "Profil non spécifié / Solvant"}</p>
                      </div>

                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                         <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-black mb-2">Usage & Application Scientifique</h3>
                         <p className="text-white leading-relaxed">{selectedItem.usage || "Aucune information d'usage spécifique n'est enregistrée pour cette molécule."}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <h4 className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Point d'ébullition</h4>
                            <p className="text-sm font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{selectedItem.boiling_point || "En cours d'indexation..."}</p>
                         </div>
                         <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <h4 className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Flash Point</h4>
                            <p className="text-sm font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{selectedItem.flash_point || "En cours d'indexation..."}</p>
                         </div>
                         <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <h4 className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Poids Moléculaire</h4>
                            <p className="text-sm font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{selectedItem.molecular_weight || "En cours..."}</p>
                         </div>
                         <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <h4 className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Plafond IFRA (Max %)</h4>
                            <p className="text-sm font-bold text-gold">{selectedItem.ifra_recommendation || "En cours d'indexation..."}</p>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span className="text-xs font-bold leading-tight">Robot d'Extraction en Cours : Le module <i>Nexus Scraper</i> analyse actuellement des dizaines de milliers de fiches. Les valeurs "En cours" apparaîtront d'ici peu.</span>
                      </div>
                   </div>
                </div>
             </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
