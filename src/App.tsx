import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import PageTransition from "@/components/PageTransition";
import VoiceInterface from "@/components/VoiceInterface";

// Lazy load pages with prefetch
const Index = lazy(() => {
  const component = import("@/pages/Index");
  // Prefetch other routes
  import("@/pages/About");
  import("@/pages/Blog");
  return component;
});
const About = lazy(() => import("@/pages/About"));
const Blog = lazy(() => import("@/pages/Blog"));
const Contact = lazy(() => import("@/pages/Contact"));
const Services = lazy(() => import("@/pages/Services"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const Login = lazy(() => import("@/pages/Login"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const StartProject = lazy(() => import("@/pages/StartProject"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      // Remove suspense option as it's not needed here
      // The Suspense component in PageTransition will handle loading states
    },
  },
});

const App: React.FC = () => {
  console.log("App rendering - Route transition started");

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <Router>
          <PageTransition>
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
          </PageTransition>
          <VoiceInterface />
          <Toaster />
        </Router>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};

export default App;