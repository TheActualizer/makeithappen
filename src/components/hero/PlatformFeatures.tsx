import { 
  Database,
  Bot,
  Users,
  Calendar,
  Mail,
  FileText,
  BarChart,
  Lock
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const platformFeatures = [
  {
    category: "Data & Integration",
    features: [
      "Multi-Database Synchronization",
      "Real-time Data Pipelines",
      "Custom API Development",
      "ETL Automation"
    ],
    icon: Database,
    description: "Enterprise-grade data integration and synchronization capabilities"
  },
  {
    category: "AI & Automation",
    features: [
      "Multi-Agent Orchestration",
      "Natural Language Processing",
      "Predictive Analytics",
      "Automated Decision Making"
    ],
    icon: Bot,
    description: "Advanced AI-powered automation and analytics solutions"
  },
  {
    category: "Project Management",
    features: [
      "Client Onboarding",
      "Resource Planning",
      "Progress Tracking",
      "Team Collaboration"
    ],
    icon: Users,
    description: "Comprehensive project and resource management tools"
  },
  {
    category: "Meeting Management",
    features: [
      "AI Meeting Scheduling",
      "Automated Note Taking",
      "Action Item Tracking",
      "Follow-up Automation"
    ],
    icon: Calendar,
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
    <div id="capabilities" className="mt-16 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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