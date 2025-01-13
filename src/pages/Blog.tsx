import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const Blog = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching blog categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our Blog
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover insights, tutorials, and case studies about AI development, collaborative systems, and the future of technology.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Card key={n} className="h-48 animate-pulse bg-accent-foreground/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 bg-accent-foreground/5 border-accent-foreground/10"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate(`/blog/category/${category.slug}`)}
                  >
                    Explore {category.name}
                  </Button>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/50 rounded-lg transition-all duration-300" />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;