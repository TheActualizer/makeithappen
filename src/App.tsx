import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StartProject from "./pages/StartProject";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import ProfileSettings from "./pages/settings/ProfileSettings";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/start-project" element={<StartProject />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<div>Projects (Coming Soon)</div>} />
            <Route path="/dashboard/calendar" element={<div>Calendar (Coming Soon)</div>} />
            <Route path="/dashboard/messages" element={<div>Messages (Coming Soon)</div>} />
            <Route path="/dashboard/documents" element={<div>Documents (Coming Soon)</div>} />
            <Route path="/dashboard/financials" element={<div>Financial Metrics (Coming Soon)</div>} />
            <Route path="/dashboard/progress" element={<div>Project Progress (Coming Soon)</div>} />
            <Route path="/dashboard/scope" element={<div>Project Scope (Coming Soon)</div>} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/settings/preferences" element={<div>Preferences (Coming Soon)</div>} />
            <Route path="/settings/notifications" element={<div>Notifications (Coming Soon)</div>} />
          </Routes>
          <Toaster />
          <Sonner />
        </React.StrictMode>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;