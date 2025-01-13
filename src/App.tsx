import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import StartProject from "./pages/StartProject";
import TransformativeAccounting from "./pages/blog/TransformativeAccounting";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/start-project" element={<StartProject />} />
      <Route path="/blog/transformative-accounting" element={<TransformativeAccounting />} />
    </Routes>
  );
};

export default App;