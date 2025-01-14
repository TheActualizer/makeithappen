import { Bot, Calculator, Scale, Stethoscope } from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Digital Business Suite",
    description: "Comprehensive digital transformation with custom websites, CRM integration, and intelligent automation.",
    icon: Scale,
    features: [
      "Custom website development with AI-powered features",
      "Advanced CRM with Zoom integration",
      "Intelligent email automation workflows",
      "Document processing and management",
      "Meeting summaries and follow-up automation",
      "Client portal with real-time updates"
    ],
    tags: ["Website", "CRM", "Automation", "Integration"],
    metrics: "Reduce manual tasks by 60%"
  },
  {
    id: 2,
    title: "Advanced Business Process Automation",
    description: "Revolutionary AI agents that take over complex business processes with high accuracy.",
    icon: Bot,
    features: [
      "Autonomous workflow orchestration",
      "Multi-agent decision systems",
      "Business process automation up to 90%",
      "Intelligent document processing",
      "Advanced data analysis and reporting",
      "24/7 automated operations"
    ],
    tags: ["AI Agents", "Workflow", "Automation"],
    metrics: "Up to 90% process automation"
  },
  {
    id: 3,
    title: "Professional Precision Systems",
    description: "Engineering-grade calculation engines for professional services and technical industries.",
    icon: Calculator,
    features: [
      "Legal compliance analysis engines",
      "Architectural computation systems",
      "Financial modeling & risk assessment",
      "Advanced accounting automation",
      "Underwriting decision systems",
      "Technical documentation generation"
    ],
    tags: ["Engineering", "Finance", "Legal", "Architecture"],
    metrics: "99.9% calculation accuracy"
  },
  {
    id: 4,
    title: "Healthcare Innovation Suite",
    description: "HIPAA-compliant systems with FHIR integration and advanced privacy protocols.",
    icon: Stethoscope,
    features: [
      "HIPAA-compliant infrastructure",
      "FHIR integration framework",
      "Advanced privacy protocols",
      "Secure patient data management",
      "Healthcare workflow automation",
      "Compliance monitoring & reporting"
    ],
    tags: ["Healthcare", "HIPAA", "FHIR", "Privacy"],
    metrics: "100% HIPAA compliance"
  }
];