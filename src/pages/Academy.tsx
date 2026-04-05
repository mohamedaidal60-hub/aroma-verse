import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ExternalLink, Database } from "lucide-react";
import { sql } from "@/lib/neon";
import { Button } from "@/components/ui/button";

const Academy = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        // Ensure table exists and has data (for demo purposes)
        const res = await sql`SELECT * FROM courses ORDER BY id ASC`;
        if (res.length > 0) {
          setCourses(res);
        } else {
          // Fallback if data not seeded yet
          setCourses([
            { id: 1, title: "Introduction à la Chimie des Parfums", source: "The Good Scents Company", url: "https://www.thegoodscentscompany.com/" },
            { id: 2, title: "Comprendre les Notes Olfactives", source: "Scentree", url: "https://www.scentree.com/" },
            { id: 3, title: "Recherche sur les Matériaux", source: "Knowde", url: "https://www.knowde.com/" },
            { id: 4, title: "La Science des Arômes", source: "Scents and Flavors", url: "https://scentsandflavors.com" },
            { id: 5, title: "Sécurité des Ingrédients (Elsevier)", source: "Fragrance Material Safety", url: "https://fragrancematerialsafetyresource.elsevier.com/" },
            { id: 6, title: "Normes RIFM", source: "RIFM", url: "https://www.rifm.org/" }
          ]);
        }
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <BookOpen size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                AromaVerse <span className="text-gradient-gold">Academy</span>
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">Acquérez les compétences essentielles depuis les meilleures bases de données mondiales.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
              Chargement des cours depuis Neon Database...
            </div>
          ) : (
            <div className="grid grid-cols-1 mb-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="glass-card rounded-2xl p-6 flex flex-col hover:border-primary/50 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-white font-bold shadow-gold">
                      {course.title.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold bg-secondary px-3 py-1 rounded-full flex items-center gap-1">
                      <Database size={12} /> Base de données
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">Source: {course.source}</p>
                  
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full justify-between hover:bg-primary hover:text-primary-foreground border-border">
                      Accéder au cours <ExternalLink size={16} />
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Academy;
