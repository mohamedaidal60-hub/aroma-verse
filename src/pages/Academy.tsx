import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Database, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { sql } from "@/lib/neon";

const Academy = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <BookOpen size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                AromaVerse <span className="text-gradient-gold">Academy</span>
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">Contenus extraits des meilleures sources (Elsevier, RIFM, Scentree, SGC).</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
              Chargement des cours depuis Neon Database...
            </div>
          ) : (
            <div className="space-y-4 mb-10">
              {courses.map((course) => (
                <div key={course.id} className={`glass-card rounded-2xl overflow-hidden transition-all ${expandedId === course.id ? 'border-primary shadow-lg' : 'hover:border-primary/30'}`}>
                  
                  <div 
                    className="p-6 cursor-pointer flex gap-4 items-start"
                    onClick={() => toggleCourse(course.id)}
                  >
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-gold flex items-center justify-center text-white font-bold shadow-gold mt-1">
                      {course.title.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-secondary px-3 py-1 rounded-full flex items-center gap-1">
                          <Database size={12} /> Source: {course.source}
                        </span>
                        <span className="text-xs font-semibold bg-secondary px-3 py-1 rounded-full flex items-center gap-1">
                          <Clock size={12} /> Temps: {course.estimated_time}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold leading-tight">{course.title}</h3>
                    </div>
                    
                    <div className="text-muted-foreground p-2">
                      {expandedId === course.id ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>

                  {expandedId === course.id && (
                    <div className="px-6 pb-6 pt-2 border-t border-border mt-2 bg-secondary/10">
                      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                        <p className="whitespace-pre-line leading-relaxed pb-4 text-foreground/90">
                          {course.content}
                        </p>
                      </div>
                    </div>
                  )}

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
