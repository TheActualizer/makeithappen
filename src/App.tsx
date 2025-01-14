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

function App() {
  return (
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
        <Toaster />
      </Router>
    </SessionContextProvider>
  );
}

export default App;