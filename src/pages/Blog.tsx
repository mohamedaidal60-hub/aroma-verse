import { Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
const supabase: any = { from: () => ({ select: () => ({ eq: () => ({ order: async () => ({data: []}) }), order: async () => ({data: []}) }) }) };

const Blog = () => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["blog-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Blog & <span className="text-gradient-gold">Recherche</span>
          </h1>
          <p className="text-muted-foreground mb-10">Articles éducatifs, analyses scientifiques et actualités du monde olfactif.</p>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gradient-card rounded-xl border border-border p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-16 bg-muted rounded mb-4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <article key={a.id} className="bg-gradient-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col">
                  <span className="text-xs text-primary font-medium mb-3">{a.category}</span>
                  <h2 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{a.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      {a.author_name && (
                        <span className="flex items-center gap-1"><User size={12} /> {a.author_name}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(a.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
