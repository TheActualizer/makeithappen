import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Search from "@/pages/blog/Search";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;