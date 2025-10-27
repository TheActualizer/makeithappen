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

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <LazyMotion features={domAnimation}>
        <QueryClientProvider client={queryClient}>
          <SessionContextProvider supabaseClient={supabase}>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Index />
                    </PageTransition>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PageTransition>
                      <About />
                    </PageTransition>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <PageTransition>
                      <Blog />
                    </PageTransition>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <PageTransition>
                      <Services />
                    </PageTransition>
                  }
                />
                <Route
                  path="/case-studies"
                  element={
                    <PageTransition>
                      <CaseStudies />
                    </PageTransition>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PageTransition>
                      <Login />
                    </PageTransition>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <PageTransition>
                      <ResetPassword />
                    </PageTransition>
                  }
                />
                <Route
                  path="/start-project"
                  element={
                    <PageTransition>
                      <StartProject />
                    </PageTransition>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PageTransition>
                      <Dashboard />
                    </PageTransition>
                  }
                />
              </Routes>
              <Toaster />
            </Router>
          </SessionContextProvider>
        </QueryClientProvider>
      </LazyMotion>
    </React.StrictMode>
  );
};

export default App;