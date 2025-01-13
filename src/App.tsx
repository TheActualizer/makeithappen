import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatInterface from "@/components/chat/ChatInterface";
import Blog from "@/pages/Blog";
import AgenticSystems from "@/pages/blog/AgenticSystems";
import VectorMemory from "@/pages/blog/VectorMemory";
import TransformativeCaseStudies from "@/pages/blog/TransformativeCaseStudies";
import AITrends from "@/pages/blog/AITrends";
import CaseStudies from "@/pages/blog/CaseStudies";
import HealthcareTech from "@/pages/blog/HealthcareTech";
import GDPRCompliance from "@/pages/blog/GDPRCompliance";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog/agentic-systems" element={<AgenticSystems />} />
        <Route path="/blog/vector-memory" element={<VectorMemory />} />
        <Route path="/blog/transformative-case-studies" element={<TransformativeCaseStudies />} />
        <Route path="/blog/ai-trends" element={<AITrends />} />
        <Route path="/blog/case-studies" element={<CaseStudies />} />
        <Route path="/blog/healthcare-tech" element={<HealthcareTech />} />
        <Route path="/blog/gdpr-compliance" element={<GDPRCompliance />} />
      </Routes>
      <ChatInterface />
      <Toaster />
    </Router>
  );
}

export default App;