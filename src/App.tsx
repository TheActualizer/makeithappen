import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import CaseStudies from "@/pages/CaseStudies";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import StartProject from "@/pages/StartProject";
import Dashboard from "@/pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";
import PageTransition from "@/components/PageTransition";
import VoiceInterface from "@/components/VoiceInterface";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => {
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