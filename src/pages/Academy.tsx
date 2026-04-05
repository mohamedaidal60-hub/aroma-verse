import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Database, Clock, ChevronDown, ChevronUp, ExternalLink, Beaker, Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sql } from "@/lib/neon";
import { toast } from "sonner";

const Academy = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // PubChem API State
  const [chemQuery, setChemQuery] = useState("");
  const [chemData, setChemData] = useState<any>(null);
  const [chemLoading, setChemLoading] = useState(false);
  const [chemError, setChemError] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await sql`SELECT * FROM academy_courses ORDER BY id ASC`;
        setCourses(res);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const toggleCourse = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePubChemSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chemQuery.trim()) return;
    setChemLoading(true);
    setChemError("");
    setChemData(null);
    try {
      const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(chemQuery)}/property/MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES/JSON`);
      if (!response.ok) throw new Error("Introuvable");
      
      const data = await response.json();
      if (data.PropertyTable && data.PropertyTable.Properties && data.PropertyTable.Properties.length > 0) {
        setChemData({
          ...data.PropertyTable.Properties[0],
          image: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(chemQuery)}/PNG`
        });
        toast.success("Données moléculaires récupérées !");
      }
    } catch (err: any) {
      setChemError(err.message);
      toast.error("Erreur d'analyse moléculaire");
    } finally {
      setChemLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><BookOpen size={32} /></div>
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold">
                  AromaVerse <span className="text-gradient-gold">Academy</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">Cours et données extraits des sources mondiales expertes.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* PUBCHEM API TERMINAL */}
            <div className="lg:col-span-3 glass-card rounded-3xl p-6 border border-primary/40 bg-gradient-to-r from-primary/10 via-background to-background relative overflow-hidden shadow-2xl">
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                <Beaker size={250} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold flex items-center gap-2 mb-2"><Beaker className="text-primary"/> AromaVerse Laboratoire Moléculaire</h2>
                  <p className="text-muted-foreground mb-6 text-sm">Interrogez notre base de données scientifique pour analyser vos molécules odorantes (ex: <i>Linalool, Coumarin, Vanillin, Geraniol</i>).</p>
                  
                  <form onSubmit={handlePubChemSearch} className="flex items-center gap-2 mb-4">
                    <Input placeholder="Nom scientifique de la molécule obligatoirement en anglais (ex: Vanillin, Limonene)..." value={chemQuery} onChange={e => setChemQuery(e.target.value)} className="bg-secondary/50 border-primary/20 flex-1" />
                    <Button type="submit" disabled={chemLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      {chemLoading ? "Analyse..." : <><Search size={16} className="mr-2" /> Analyser</>}
                    </Button>
                  </form>

                  {chemError && <div className="text-destructive flex items-center gap-2 text-sm bg-destructive/10 p-3 rounded-lg"><AlertCircle size={16}/> Molécule introuvable dans nos bases de données.</div>}
                </div>

                {chemData && (
                  <div className="flex-1 bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-border shadow-inner">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gradient-gold mb-4 capitalize">{chemQuery}</h3>
                        <div className="space-y-2 text-sm">
                          <p><strong className="text-muted-foreground">Poids Moléculaire :</strong> {chemData.MolecularWeight} g/mol</p>
                          <p><strong className="text-muted-foreground">Formule :</strong> {chemData.MolecularFormula}</p>
                          <p><strong className="text-muted-foreground">IUPAC Name :</strong> <span className="line-clamp-2">{chemData.IUPACName}</span></p>
                          <p><strong className="text-muted-foreground">SMILES :</strong> <span className="break-all text-primary font-mono text-xs">{chemData.CanonicalSMILES}</span></p>
                        </div>
                      </div>
                      <div className="w-32 h-32 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-md flex-shrink-0">
                        <img src={chemData.image} alt="Structure moléculaire" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-4">
                <div className="flex flex-col p-6 glass-card rounded-3xl border border-border bg-secondary/20 h-full">
                    <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2"><Database className="text-primary" size={20}/> Portails DB Externes</h2>
                    <p className="text-muted-foreground text-sm mb-6">Liens directs et documentations vers les sources fermées majeures.</p>
                    
                    <div className="space-y-3">
                        {[
                            {name: "The Good Scents Company", url: "http://www.thegoodscentscompany.com/search3.php?q="},
                            {name: "Scentree", url: "https://www.scentree.com/"},
                            {name: "Knowde Chemicals", url: "https://www.knowde.com/search?q="},
                            {name: "Scents and Flavors", url: "https://scentsandflavors.com/"},
                            {name: "RIFM Database", url: "https://www.rifm.org/"},
                            {name: "Elsevier Safety", url: "https://fragrancematerialsafetyresource.elsevier.com/"}
                        ].map(source => (
                            <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-background rounded-xl hover:border-primary/50 transition-colors border border-border flex items-center justify-between group text-sm font-medium">
                                <span>{source.name}</span>
                                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2">
                {loading ? (
                    <div className="flex justify-center items-center py-20 text-muted-foreground">Chargement des données internes courantes...</div>
                ) : (
                    <div className="space-y-4">
                    <h2 className="text-2xl font-display font-bold mb-6">Archives & Réglementations (Mock Scraper)</h2>
                    {courses.map((course) => (
                        <div key={course.id} className={`glass-card rounded-xl overflow-hidden transition-all ${expandedId === course.id ? 'border-primary shadow-lg bg-primary/5' : 'hover:border-primary/30'}`}>
                        <div className="p-5 cursor-pointer flex gap-4 items-center" onClick={() => toggleCourse(course.id)}>
                            <div className="w-10 h-10 flex-shrink-0 bg-gradient-gold rounded-lg flex items-center justify-center text-white font-bold shadow-gold text-lg">
                            {course.title.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold leading-tight">{course.title}</h3>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Database size={12} /> {course.source}</span>
                                </div>
                            </div>
                            <div className="text-muted-foreground p-2">{expandedId === course.id ? <ChevronUp /> : <ChevronDown />}</div>
                        </div>

                        {expandedId === course.id && (
                            <div className="px-6 pb-6 pt-2 border-t border-border mt-2 bg-secondary/10">
                                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">{course.content}</p>
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                )}
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Academy;
