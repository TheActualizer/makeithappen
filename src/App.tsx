import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import CaseStudies from "@/pages/CaseStudies";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import Dashboard from "@/pages/Dashboard";
import StartProject from "@/pages/StartProject";
import AgenticSystems from "@/pages/blog/AgenticSystems";
import AITrends from "@/pages/blog/AITrends";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/agentic-systems" element={<AgenticSystems />} />
        <Route path="/blog/ai-trends" element={<AITrends />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-project" element={<StartProject />} />
      </Routes>
    </Router>
  );
}

export default App;