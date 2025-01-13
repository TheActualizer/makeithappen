import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import StartProject from "./pages/StartProject";
import CaseStudies from "./pages/CaseStudies";
import ProfileSettings from "./pages/settings/ProfileSettings";
import AgenticSystems from "./pages/blog/AgenticSystems";
import IntelligentChatbots from "./pages/blog/IntelligentChatbots";
import IntelligentScraping from "./pages/blog/IntelligentScraping";
import TransformativeCRM from "./pages/blog/TransformativeCRM";
import HealthcareTech from "./pages/blog/HealthcareTech";
import GDPRCompliance from "./pages/blog/GDPRCompliance";
import AITrends from "./pages/blog/AITrends";
import TransformativeAccounting from "./pages/blog/TransformativeAccounting";
import TransformativeCaseStudies from "./pages/blog/TransformativeCaseStudies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        
        {/* Blog Routes */}
        <Route path="/blog/agentic-systems" element={<AgenticSystems />} />
        <Route path="/blog/intelligent-chatbots" element={<IntelligentChatbots />} />
        <Route path="/blog/intelligent-scraping" element={<IntelligentScraping />} />
        <Route path="/blog/transformative-crm" element={<TransformativeCRM />} />
        <Route path="/blog/healthcare-tech" element={<HealthcareTech />} />
        <Route path="/blog/gdpr-compliance" element={<GDPRCompliance />} />
        <Route path="/blog/ai-trends" element={<AITrends />} />
        <Route path="/blog/case-studies" element={<TransformativeCaseStudies />} />
        <Route path="/blog/transformative-accounting" element={<TransformativeAccounting />} />
      </Routes>
    </Router>
  );
}

export default App;