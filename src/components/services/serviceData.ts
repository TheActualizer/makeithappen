import { Brain, Calculator, Scale, Truck, Search, Database, Bot, Network, Shield, Workflow, Users, ShoppingCart, MessageSquare, Map, FileText, Mail, Calendar, BarChart } from "lucide-react";

export const websiteCategories = [
  {
    id: "client-portal",
    title: "Client Portals & CRM",
    description: "Secure client management platforms with project tracking",
    features: [
      "Project request handling",
      "Zoom meeting scheduling",
      "AI meeting summaries",
      "Document sharing",
      "Client dashboards"
    ],
    icon: Users,
    metrics: "40% Client Engagement ↑"
  },
  {
    id: "marketplace",
    title: "Digital Marketplaces",
    description: "Custom B2B/B2C marketplace solutions",
    features: [
      "Vendor management",
      "Payment processing",
      "Inventory tracking",
      "Rating systems",
      "Analytics dashboard"
    ],
    icon: ShoppingCart,
    metrics: "2x Transaction Volume"
  },
  {
    id: "communication",
    title: "Communication Platforms",
    description: "Real-time messaging and collaboration tools",
    features: [
      "Chat systems",
      "Video conferencing",
      "File sharing",
      "Thread management",
      "Notifications"
    ],
    icon: MessageSquare,
    metrics: "90% Response Time ↓"
  },
  {
    id: "logistics",
    title: "Logistics & Tracking",
    description: "GPS-enabled fleet and asset management",
    features: [
      "Real-time tracking",
      "Route optimization",
      "Delivery management",
      "Performance analytics",
      "Mobile apps"
    ],
    icon: Map,
    metrics: "30% Efficiency ↑"
  },
  {
    id: "data-enrichment",
    title: "Data Enrichment Tools",
    description: "Intelligent data collection and analysis",
    features: [
      "Web scraping",
      "Data processing",
      "API integrations",
      "Custom algorithms",
      "Reporting"
    ],
    icon: Database,
    metrics: "10x Data Processing"
  },
  {
    id: "automation",
    title: "Business Automation",
    description: "Streamline operations with AI",
    features: [
      "Email automation",
      "Task scheduling",
      "Document processing",
      "Workflow automation",
      "Integration hub"
    ],
    icon: Workflow,
    metrics: "75% Manual Work ↓"
  }
];

export const services = [
  {
    id: 1,
    title: "Financial Systems",
    description: "AI-powered financial operations & analysis",
    icon: Calculator,
    features: ["Real-time Analysis", "Automated Accounting", "Risk Assessment"],
    metrics: "85% Processing Time ↓",
    tags: ["Finance", "AI", "Automation"]
  },
  {
    id: 2,
    title: "Legal Tech",
    description: "HIPAA & GDPR compliant solutions",
    icon: Scale,
    features: ["Contract Review", "Compliance", "Case Management"],
    metrics: "75% Review Time ↓",
    tags: ["Legal", "Compliance", "AI"]
  },
  {
    id: 3,
    title: "Supply Chain",
    description: "End-to-end logistics optimization",
    icon: Truck,
    features: ["Inventory", "Maintenance", "Quality Control"],
    metrics: "60% Efficiency ↑",
    tags: ["Logistics", "IoT", "Analytics"]
  },
  {
    id: 4,
    title: "R&D Acceleration",
    description: "Rapid prototyping & research",
    icon: Search,
    features: ["Fast Prototyping", "Data Analysis", "Innovation"],
    metrics: "10x Research Speed",
    tags: ["Research", "AI", "Innovation"]
  },
  {
    id: 5,
    title: "Data Architecture",
    description: "AWS & vector database integration",
    icon: Database,
    features: ["Data Processing", "Analytics", "Integration"],
    metrics: "99.9% Accuracy",
    tags: ["Data", "Cloud", "Scale"]
  },
  {
    id: 6,
    title: "AI Systems",
    description: "Custom agent networks & orchestration",
    icon: Brain,
    features: ["Automation", "Memory Systems", "Workflows"],
    metrics: "24/7 Operation",
    tags: ["AI", "Agents", "Automation"]
  }
];