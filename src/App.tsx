import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "@/pages/Dashboard";
import ProfessionalNetwork from "@/pages/ProfessionalNetwork";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/network" element={<ProfessionalNetwork />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;