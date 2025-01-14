import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Search, Grid, List, ArrowRight, Clock, Eye, Menu } from "lucide-react";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  reading_time: number;
  views: number;
  published_at: string;
}

const Blog = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, postsResponse] = await Promise.all([
          supabase.from('blog_categories').select('*').order('name'),
          supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('views', { ascending: false })
            .limit(3)
        ]);
        
        if (categoriesResponse.error) throw categoriesResponse.error;
        if (postsResponse.error) throw postsResponse.error;
        
        setCategories(categoriesResponse.data || []);
        setFeaturedPosts(postsResponse.data || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Search Bar - Google Style */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-4 p-4 rounded-full border shadow-sm hover:shadow-md transition-shadow">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-lg"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-lg"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              onClick={() => navigate(`/blog/category/${category.slug}`)}
              className="whitespace-nowrap rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {featuredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  {viewMode === 'grid' && (
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.reading_time} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;