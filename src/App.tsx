import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import CaseStudies from "@/pages/CaseStudies";
import Blog from "@/pages/Blog";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import StartProject from "@/pages/StartProject";
import AgenticSystems from "@/pages/blog/AgenticSystems";
import AITrends from "@/pages/blog/AITrends";
import TransformativeCaseStudies from "@/pages/blog/TransformativeCaseStudies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/blog/agentic-systems" element={<AgenticSystems />} />
        <Route path="/blog/ai-trends" element={<AITrends />} />
        <Route path="/blog/transformative-case-studies" element={<TransformativeCaseStudies />} />
      </Routes>
    </Router>
  );
}

export default App;