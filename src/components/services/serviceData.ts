import { Bot, Calculator, Scale, Stethoscope } from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Website & Business Operations",
    description: "Comprehensive digital transformation of your business operations with AI-powered automation.",
    icon: Scale,
    features: [
      "AI-powered client management system",
      "CRM integration with automated workflows",
      "Zoom integration with AI meeting summaries",
      "Intelligent follow-up automation",
      "Document processing and management",
      "Client portal development"
    ],
    metrics: "85% Operational Efficiency ↑",
    tags: ["Automation", "CRM", "AI"]
  },
  {
    id: 2,
    title: "Extensive AI Agent Operations",
    description: "Multi-agent swarms that revolutionize your business processes through intelligent automation.",
    icon: Bot,
    features: [
      "Policy automation and enforcement",
      "Complex workflow orchestration",
      "Multi-agent swarm coordination",
      "Business process optimization",
      "Automated decision systems",
      "Intelligent task distribution"
    ],
    metrics: "90% Process Automation ↑",
    tags: ["AI", "Automation", "Workflow"]
  },
  {
    id: 3,
    title: "Advanced Industry Calculations",
    description: "Specialized computation engines tailored for professional services and technical industries.",
    icon: Calculator,
    features: [
      "Accounting automation systems",
      "Legal analysis and compliance",
      "Engineering simulations",
      "Financial modeling",
      "Risk assessment calculations",
      "Technical documentation generation"
    ],
    metrics: "99.9% Calculation Accuracy",
    tags: ["Finance", "Legal", "Engineering"]
  },
  {
    id: 4,
    title: "Healthcare Automation",
    description: "HIPAA-compliant autonomous systems for modern healthcare operations.",
    icon: Stethoscope,
    features: [
      "HIPAA-compliant systems",
      "FHIR integration",
      "Patient data management",
      "Healthcare workflow automation",
      "Medical record processing",
      "Compliance monitoring"
    ],
    metrics: "100% HIPAA Compliance",
    tags: ["Healthcare", "HIPAA", "Automation"]
  }
];