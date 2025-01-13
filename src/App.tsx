import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Settings from "@/pages/Settings";
import Projects from "@/pages/Projects";
import Documents from "@/pages/Documents";
import Calendar from "@/pages/Calendar";
import Messages from "@/pages/Messages";
import Progress from "@/pages/Progress";
import Scope from "@/pages/Scope";
import Financials from "@/pages/Financials";
import "./App.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/progress" element={<Progress />} />
          <Route path="/dashboard/scope" element={<Scope />} />
          <Route path="/dashboard/financials" element={<Financials />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;