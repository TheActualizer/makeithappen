import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  reading_time: number;
  views: number;
  published_at: string;
}

const BlogCategory = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts for category:', slug);
        
        // First get the category details
        const { data: categoryData, error: categoryError } = await supabase
          .from('blog_categories')
          .select('id, name')
          .eq('slug', slug)
          .single();

        if (categoryError) {
          console.error('Error fetching category:', categoryError);
          return;
        }

        if (categoryData) {
          setCategoryName(categoryData.name);
          
          // Then get all posts for this category using the category ID
          const { data: postsData, error: postsError } = await supabase
            .from('blog_posts')
            .select(`
              id,
              title,
              excerpt,
              slug,
              reading_time,
              views,
              published_at
            `)
            .eq('category_id', categoryData.id)
            .eq('status', 'published')
            .order('published_at', { ascending: false });

          if (postsError) {
            console.error('Error fetching posts:', postsError);
            return;
          }

          console.log('Posts fetched:', postsData);
          setPosts(postsData || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">{categoryName}</h1>
        
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card 
                key={post.id}
                className="bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{post.reading_time} min read</span>
                    <span>{post.views} views</span>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full mt-4 group hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-white text-center">
            No posts found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCategory;