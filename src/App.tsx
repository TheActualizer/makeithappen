import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import Services from "@/pages/Services";
import CaseStudies from "@/pages/CaseStudies";
import Blog from "@/pages/Blog";
import BlogCategory from "@/pages/blog/BlogCategory";
import AgenticSystems from "@/pages/blog/AgenticSystems";
import AITrends from "@/pages/blog/AITrends";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import StartProject from "@/pages/StartProject";
import Dashboard from "@/pages/Dashboard";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import ProfileSettings from "@/pages/settings/ProfileSettings";
import PageTransition from "@/components/PageTransition";
import "./App.css";

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/category/:slug" element={<PageTransition><BlogCategory /></PageTransition>} />
        <Route path="/blog/agentic-systems" element={<PageTransition><AgenticSystems /></PageTransition>} />
        <Route path="/blog/ai-trends" element={<PageTransition><AITrends /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
        <Route path="/start-project" element={<PageTransition><StartProject /></PageTransition>} />
        <Route path="/dashboard/*" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/settings/profile" element={<PageTransition><ProfileSettings /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;