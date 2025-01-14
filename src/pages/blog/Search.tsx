import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, ArrowLeft, Loader2, FileText, Book, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      
      // Search blog posts with detailed logging
      console.log('Searching blog posts...');
      const { data: blogPosts, error: blogError } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, slug, reading_time, views, content')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .eq('status', 'published')
        .order('views', { ascending: false });

      if (blogError) throw blogError;

      console.log(`Found ${blogPosts?.length || 0} blog posts`);
      blogPosts?.forEach(post => {
        console.log('\nAnalyzing blog post:', post.title);
        const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
        const contentMatch = post.content.toLowerCase().includes(query.toLowerCase());
        const excerptMatch = post.excerpt?.toLowerCase().includes(query.toLowerCase());
        
        console.log('Matches found in:');
        if (titleMatch) console.log('- Title:', post.title);
        if (contentMatch) console.log('- Content excerpt:', post.content.substring(0, 100) + '...');
        if (excerptMatch) console.log('- Excerpt:', post.excerpt);
      });

      // Search projects with detailed logging
      console.log('\nSearching projects...');
      const { data: projects, error: projectError } = await supabase
        .from('projects')
        .select('id, name, description, project_type, current_challenges, business_objectives, pain_points')
        .or(`
          name.ilike.%${query}%,
          description.ilike.%${query}%,
          current_challenges::text.ilike.%${query}%,
          business_objectives::text.ilike.%${query}%,
          pain_points::text.ilike.%${query}%
        `)
        .order('created_at', { ascending: false });

      if (projectError) throw projectError;

      console.log(`Found ${projects?.length || 0} projects`);
      projects?.forEach(project => {
        console.log('\nAnalyzing project:', project.name);
        const nameMatch = project.name.toLowerCase().includes(query.toLowerCase());
        const descMatch = project.description.toLowerCase().includes(query.toLowerCase());
        const challengesMatch = project.current_challenges?.some(c => 
          c.toLowerCase().includes(query.toLowerCase())
        );
        const objectivesMatch = project.business_objectives?.some(o => 
          o.toLowerCase().includes(query.toLowerCase())
        );
        const painPointsMatch = project.pain_points?.some(p => 
          p.toLowerCase().includes(query.toLowerCase())
        );

        console.log('Matches found in:');
        if (nameMatch) console.log('- Name:', project.name);
        if (descMatch) console.log('- Description:', project.description);
        if (challengesMatch) console.log('- Challenges:', project.current_challenges?.join(', '));
        if (objectivesMatch) console.log('- Objectives:', project.business_objectives?.join(', '));
        if (painPointsMatch) console.log('- Pain Points:', project.pain_points?.join(', '));
      });

      // Search documents with detailed logging
      console.log('\nSearching documents...');
      const { data: documents, error: documentError } = await supabase
        .from('documents')
        .select('id, title, description, notes, file_type')
        .or(`
          title.ilike.%${query}%,
          description.ilike.%${query}%,
          notes.ilike.%${query}%
        `)
        .order('created_at', { ascending: false });

      if (documentError) throw documentError;

      console.log(`Found ${documents?.length || 0} documents`);
      documents?.forEach(doc => {
        console.log('\nAnalyzing document:', doc.title);
        const titleMatch = doc.title.toLowerCase().includes(query.toLowerCase());
        const descMatch = doc.description?.toLowerCase().includes(query.toLowerCase());
        const notesMatch = doc.notes?.toLowerCase().includes(query.toLowerCase());

        console.log('Matches found in:');
        if (titleMatch) console.log('- Title:', doc.title);
        if (descMatch) console.log('- Description:', doc.description);
        if (notesMatch) console.log('- Notes:', doc.notes);
      });

      // Format results with detailed descriptions
      const formattedResults: SearchResult[] = [
        ...(blogPosts?.map(post => ({
          id: post.id,
          title: post.title,
          description: post.excerpt || post.content.substring(0, 200) + '...',
          type: 'blog' as const,
          url: `/blog/${post.slug}`,
          metadata: {
            views: post.views,
            reading_time: post.reading_time,
          }
        })) || []),
        ...(projects?.map(project => ({
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
        })) || []),
        ...(documents?.map(doc => ({
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
        })) || [])
      ];

      console.log('\nSearch complete. Total results:', formattedResults.length);
      console.log('Results breakdown:');
      console.log('- Blog posts:', blogPosts?.length || 0);
      console.log('- Projects:', projects?.length || 0);
      console.log('- Documents:', documents?.length || 0);

      setResults(formattedResults);
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
