import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StartProject from "./pages/StartProject";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import ProfileSettings from "./pages/settings/ProfileSettings";
import ResetPassword from "./pages/ResetPassword";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminProjects } from "./components/admin/AdminProjects";
import { AdminContacts } from "./components/admin/AdminContacts";
import { AdminMessages } from "./components/admin/AdminMessages";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { FinancialMetrics } from "./components/dashboard/FinancialMetrics";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { DashboardCalendar } from "./components/dashboard/DashboardCalendar";
import { DashboardDocuments } from "./components/dashboard/DashboardDocuments";
import { ProjectProgress } from "./components/dashboard/ProjectProgress";
import { ProjectScope } from "./components/dashboard/ProjectScope";
import { DashboardActivity } from "./components/dashboard/DashboardActivity";
import { Messages } from "./components/dashboard/Messages";

const queryClient = new QueryClient();

// Protected route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useIsAdmin();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <DashboardHeader />
    <div className="container mx-auto py-8">
      {children}
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/start-project" element={<StartProject />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/projects" element={<AdminRoute><AdminProjects /></AdminRoute>} />
            <Route path="/admin/contacts" element={<AdminRoute><AdminContacts /></AdminRoute>} />
            <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
            
            <Route path="/dashboard/projects" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Projects</h1>
                <DashboardActivity isAdmin={false} />
              </DashboardLayout>
            } />
            <Route path="/dashboard/calendar" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Calendar</h1>
                <DashboardCalendar />
              </DashboardLayout>
            } />
            <Route path="/dashboard/messages" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Messages</h1>
                <Messages />
              </DashboardLayout>
            } />
            <Route path="/dashboard/documents" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Documents</h1>
                <DashboardDocuments isAdmin={false} />
              </DashboardLayout>
            } />
            <Route path="/dashboard/financials" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Financial Metrics</h1>
                <FinancialMetrics />
              </DashboardLayout>
            } />
            <Route path="/dashboard/progress" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Project Progress</h1>
                <ProjectProgress />
              </DashboardLayout>
            } />
            <Route path="/dashboard/scope" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Project Scope</h1>
                <ProjectScope />
              </DashboardLayout>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/settings/preferences" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Preferences</h1>
                <div className="text-muted-foreground">Preferences settings coming soon...</div>
              </DashboardLayout>
            } />
            <Route path="/settings/notifications" element={
              <DashboardLayout>
                <h1 className="text-3xl font-bold mb-8">Notifications</h1>
                <div className="text-muted-foreground">Notification settings coming soon...</div>
              </DashboardLayout>
            } />
          </Routes>
          <Toaster />
          <Sonner />
        </React.StrictMode>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;