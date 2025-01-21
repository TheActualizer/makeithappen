import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import PageTransition from "@/components/PageTransition";
import VoiceInterface from "@/components/VoiceInterface";

// Preload all routes immediately
const routes = {
  Index: () => import("@/pages/Index"),
  About: () => import("@/pages/About"),
  Blog: () => import("@/pages/Blog"),
  Contact: () => import("@/pages/Contact"),
  Services: () => import("@/pages/Services"),
  CaseStudies: () => import("@/pages/CaseStudies"),
  Login: () => import("@/pages/Login"),
  ResetPassword: () => import("@/pages/ResetPassword"),
  StartProject: () => import("@/pages/StartProject"),
  Dashboard: () => import("@/pages/Dashboard"),
};

// Preload all routes in the background
Object.values(routes).forEach(route => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'script';
  link.href = route.toString();
  document.head.appendChild(link);
});

// Lazy load components with preloading
const Index = lazy(routes.Index);
const About = lazy(routes.About);
const Blog = lazy(routes.Blog);
const Contact = lazy(routes.Contact);
const Services = lazy(routes.Services);
const CaseStudies = lazy(routes.CaseStudies);
const Login = lazy(routes.Login);
const ResetPassword = lazy(routes.ResetPassword);
const StartProject = lazy(routes.StartProject);
const Dashboard = lazy(routes.Dashboard);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
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