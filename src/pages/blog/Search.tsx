import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, ArrowLeft, Loader2, Book, FolderOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'blog' | 'project' | 'document';
  url: string;
  metadata?: {
    views?: number;
    reading_time?: number;
    excerpt?: string;
    project_type?: string[];
    file_type?: string;
  };
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const searchBlogPosts = async (searchTerm: string) => {
    console.log('Searching blog posts...');
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('id, title, excerpt, slug, reading_time, views, content')
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
      .eq('status', 'published');

    if (error) throw error;

    console.log(`Found ${blogPosts?.length || 0} blog posts`);
    blogPosts?.forEach(post => {
      console.log('\nAnalyzing blog post:', post.title);
      console.log('Content:', post.content?.substring(0, 200));
      console.log('Excerpt:', post.excerpt);
    });

    return blogPosts?.map(post => ({
      id: post.id,
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 200) + '...',
      type: 'blog' as const,
      url: `/blog/${post.slug}`,
      metadata: {
        views: post.views,
        reading_time: post.reading_time,
      }
    })) || [];
  };

  const searchProjects = async (searchTerm: string) => {
    console.log('Searching projects...');
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .or(`
        name.ilike.%${searchTerm}%,
        description.ilike.%${searchTerm}%,
        current_challenges::text.ilike.%${searchTerm}%,
        business_objectives::text.ilike.%${searchTerm}%,
        pain_points::text.ilike.%${searchTerm}%
      `);

    if (error) throw error;

    console.log(`Found ${projects?.length || 0} projects`);
    projects?.forEach(project => {
      console.log('\nAnalyzing project:', project.name);
      console.log('Description:', project.description);
      console.log('Challenges:', project.current_challenges);
      console.log('Objectives:', project.business_objectives);
    });

    return projects?.map(project => ({
      id: project.id,
      title: project.name,
      description: [
        project.description,
        project.current_challenges?.join(', '),
        project.business_objectives?.join(', '),
        project.pain_points?.join(', ')
      ].filter(Boolean).join(' | ').substring(0, 200) + '...',
      type: 'project' as const,
      url: `/projects/${project.id}`,
      metadata: {
        project_type: project.project_type,
      }
    })) || [];
  };

  const searchDocuments = async (searchTerm: string) => {
    console.log('Searching documents...');
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .or(`
        title.ilike.%${searchTerm}%,
        description.ilike.%${searchTerm}%,
        notes.ilike.%${searchTerm}%
      `);

    if (error) throw error;

    console.log(`Found ${documents?.length || 0} documents`);
    documents?.forEach(doc => {
      console.log('\nAnalyzing document:', doc.title);
      console.log('Description:', doc.description);
      console.log('Notes:', doc.notes);
    });

    return documents?.map(doc => ({
      id: doc.id,
      title: doc.title,
      description: [doc.description, doc.notes]
        .filter(Boolean)
        .join(' | ')
        .substring(0, 200) + '...',
      type: 'document' as const,
      url: `/documents/${doc.id}`,
      metadata: {
        file_type: doc.file_type,
      }
    })) || [];
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      console.log('Starting search for term:', query);
      
      // Execute all searches in parallel
      const [blogResults, projectResults, documentResults] = await Promise.all([
        searchBlogPosts(query),
        searchProjects(query),
        searchDocuments(query)
      ]);

      // Combine all results
      const allResults = [...blogResults, ...projectResults, ...documentResults];

      console.log('\nSearch complete. Total results:', allResults.length);
      console.log('Results breakdown:');
      console.log('- Blog posts:', blogResults.length);
      console.log('- Projects:', projectResults.length);
      console.log('- Documents:', documentResults.length);

      setResults(allResults);
    } catch (error) {
      console.error('Error during search:', error);
      toast({
        title: "Search failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-white hover:text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-4xl font-bold text-white">Search</h1>
          </div>

          <div className="flex gap-4 mb-8">
            <Input
              type="text"
              placeholder="Search across blogs, projects, and documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              variant="secondary"
              onClick={handleSearch}
              disabled={isSearching}
              className="min-w-[100px]"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {results.map((result) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="p-6 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border-white/10"
                  onClick={() => navigate(result.url)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {result.type === 'blog' ? (
                        <Book className="h-5 w-5 text-blue-500" />
                      ) : result.type === 'project' ? (
                        <FolderOpen className="h-5 w-5 text-green-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-semibold text-white">
                          {result.title}
                        </h2>
                        <span className="text-sm text-gray-400 capitalize">
                          {result.type}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{result.description}</p>
                      {result.type === 'blog' && result.metadata && (
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{result.metadata.reading_time} min read</span>
                          <span>•</span>
                          <span>{result.metadata.views} views</span>
                        </div>
                      )}
                      {result.type === 'project' && result.metadata?.project_type && (
                        <div className="flex flex-wrap gap-2">
                          {result.metadata.project_type.map((type, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      )}
                      {result.type === 'document' && result.metadata?.file_type && (
                        <span className="text-sm text-gray-400">
                          File type: {result.metadata.file_type}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            {query && results.length === 0 && !isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-gray-300 text-lg">
                  No results found for "{query}"
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;