import { 
  Code,
  LayoutDashboard,
  Users,
  Video,
  Mail,
  FileText,
  BarChart,
  Lock
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const platformFeatures = [
  {
    category: "Website Development",
    features: [
      "Custom Web Applications",
      "Responsive Design",
      "API Integration",
      "Performance Optimization"
    ],
    icon: Code,
    description: "Professional web development with modern technologies and best practices"
  },
  {
    category: "Admin Panels & Dashboards",
    features: [
      "Custom Admin Interfaces",
      "Real-time Analytics",
      "User Management",
      "Role-based Access Control"
    ],
    icon: LayoutDashboard,
    description: "Powerful administrative tools and intuitive dashboards"
  },
  {
    category: "Project Management",
    features: [
      "Smart Project Request Forms",
      "AI-Powered Project Analysis",
      "Client Onboarding Flow",
      "Progress Tracking"
    ],
    icon: Users,
    description: "Comprehensive project and resource management tools"
  },
  {
    category: "Meeting Management",
    features: [
      "Zoom Integration",
      "AI Meeting Summaries",
      "Automated Scheduling",
      "Follow-up Automation"
    ],
    icon: Video,
    description: "Intelligent meeting coordination and documentation"
  },
  {
    category: "Communication",
    features: [
      "Email Automation",
      "Client Portal",
      "Document Sharing",
      "Secure Messaging"
    ],
    icon: Mail,
    description: "Secure and automated communication channels"
  },
  {
    category: "Documentation",
    features: [
      "Auto-Generated Reports",
      "Knowledge Base",
      "Version Control",
      "Compliance Tracking"
    ],
    icon: FileText,
    description: "Comprehensive documentation and compliance management"
  },
  {
    category: "Analytics",
    features: [
      "Performance Metrics",
      "Custom Dashboards",
      "ROI Tracking",
      "Trend Analysis"
    ],
    icon: BarChart,
    description: "Advanced analytics and reporting capabilities"
  },
  {
    category: "Security",
    features: [
      "Role-Based Access",
      "Data Encryption",
      "Audit Logging",
      "Compliance Controls"
    ],
    icon: Lock,
    description: "Enterprise-grade security and compliance features"
  }
];

export const PlatformFeatures = () => {
  return (
    <div id="capabilities" className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platformFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            category={feature.category}
            description={feature.description}
            features={feature.features}
          />
        ))}
      </div>
    </div>
  );
};