import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Eye } from "lucide-react";
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
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts for category:', slug);
        
        // First get the category details
        const { data: categoryData, error: categoryError } = await supabase
          .from('blog_categories')
          .select('id, name, description')
          .eq('slug', slug)
          .single();

        if (categoryError) {
          console.error('Error fetching category:', categoryError);
          return;
        }

        if (categoryData) {
          setCategoryName(categoryData.name);
          setCategoryDescription(categoryData.description || '');
          
          // Then get all posts for this category
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {categoryName}
          </h1>
          {categoryDescription && (
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {categoryDescription}
            </p>
          )}
        </motion.div>
        
        {loading ? (
          <div className="text-center">
            <div className="animate-pulse text-white">Loading posts...</div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="h-full bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {formatDate(post.published_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.reading_time} min read</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white">
            No posts found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCategory;