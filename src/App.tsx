import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import StartProject from "./pages/StartProject";
import TransformativeAccounting from "./pages/blog/TransformativeAccounting";
import TransformativeCaseStudies from "./pages/blog/TransformativeCaseStudies";
import GDPRCompliance from "./pages/blog/GDPRCompliance";
import AITrends from "./pages/blog/AITrends";
import TransformativeCRM from "./pages/blog/TransformativeCRM";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/start-project" element={<StartProject />} />
      <Route path="/blog/transformative-accounting" element={<TransformativeAccounting />} />
      <Route path="/blog/transformative-case-studies" element={<TransformativeCaseStudies />} />
      <Route path="/blog/gdpr-compliance" element={<GDPRCompliance />} />
      <Route path="/blog/ai-trends" element={<AITrends />} />
      <Route path="/blog/transformative-crm" element={<TransformativeCRM />} />
    </Routes>
  );
};

export default App;
