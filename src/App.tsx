import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import PageTransition from "@/components/PageTransition";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// Lazy load pages with prefetch hints
const Index = lazy(() => {
  // Add prefetch hint for Index page
  const indexModule = import("@/pages/Index");
  return indexModule;
});

// Configure QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes
      retry: 1, // Only retry failed requests once
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnReconnect: 'always', // Ensure data freshness after reconnection
      networkMode: 'online', // Only fetch when online
    },
  },
});

// Enhanced loading fallback with skeleton UI
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background/50 backdrop-blur-sm">
    <div className="space-y-4 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

function App() {
  console.log('App: Initializing application');
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <Router>
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/start-project" element={<StartProject />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </PageTransition>
          <Toaster />
        </Router>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;
