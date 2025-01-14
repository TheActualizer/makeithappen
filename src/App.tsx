import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import CaseStudies from "@/pages/CaseStudies";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import StartProject from "@/pages/StartProject";
import Dashboard from "@/pages/Dashboard";
import ResetPassword from "@/pages/ResetPassword";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import BlogCategory from "@/pages/blog/BlogCategory";
import AITrends from "@/pages/blog/AITrends";
import AgenticSystems from "@/pages/blog/AgenticSystems";
import Search from "@/pages/blog/Search";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

function App() {
  useEffect(() => {
    // Log auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/blog/category/:category" element={<BlogCategory />} />
        <Route path="/blog/ai-trends" element={<AITrends />} />
        <Route path="/blog/agentic-systems" element={<AgenticSystems />} />
        <Route path="/blog/search" element={<Search />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;