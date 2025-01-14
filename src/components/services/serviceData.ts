import { Brain, Calculator, Scale, Truck, Search, Database, Bot, Network, Shield, Workflow, Mail, Calendar, Users, FileText, ChartBar, MessageSquare } from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Client Onboarding",
    description: "Automated project intake & scheduling",
    icon: Users,
    features: ["Smart Forms", "Meeting Scheduler", "Auto Follow-ups"],
    metrics: "15min Setup ↓",
    tags: ["Automation", "AI", "CRM"]
  },
  {
    id: 2,
    title: "Project Management",
    description: "Real-time tracking & collaboration",
    icon: Workflow,
    features: ["Task Automation", "Progress Tracking", "Team Sync"],
    metrics: "40% Time Saved",
    tags: ["Dashboard", "Analytics"]
  },
  {
    id: 3,
    title: "Document Hub",
    description: "Secure file sharing & storage",
    icon: FileText,
    features: ["Auto-Organize", "Version Control", "Quick Share"],
    metrics: "100% Paperless",
    tags: ["Storage", "Security"]
  },
  {
    id: 4,
    title: "Meeting Assistant",
    description: "AI-powered meeting management",
    icon: Calendar,
    features: ["Smart Scheduling", "Auto Notes", "Action Items"],
    metrics: "24/7 Booking",
    tags: ["AI", "Zoom"]
  },
  {
    id: 5,
    title: "Communication Hub",
    description: "Multi-channel client engagement",
    icon: MessageSquare,
    features: ["Email Automation", "Chat Support", "Updates"],
    metrics: "2min Response ↓",
    tags: ["Email", "Chat"]
  },
  {
    id: 6,
    title: "Analytics Suite",
    description: "Real-time business insights",
    icon: ChartBar,
    features: ["Performance", "Trends", "Forecasts"],
    metrics: "Live Metrics",
    tags: ["Data", "Reports"]
  }
];