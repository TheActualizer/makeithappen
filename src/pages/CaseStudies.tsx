import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, ChartBar, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudies = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      title: "AI-Powered Digital Workforce Transformation",
      company: "Global Manufacturing Corp",
      description: "Implemented an intelligent automation system that reduced manual data processing by 95% and saved $2.5M annually.",
      impact: ["95% reduction in processing time", "100% accuracy in data entry", "$2.5M annual savings"],
      industry: "Manufacturing",
      icon: <Rocket className="w-6 h-6 text-primary" />,
      tags: ["AI Automation", "Process Optimization", "Digital Transformation"]
    },
    {
      title: "Enterprise-Wide Business Process Automation",
      company: "Financial Services Leader",
      description: "Deployed intelligent agents across 12 departments, automating complex workflows and improving customer response times by 80%.",
      impact: ["80% faster response times", "24/7 operation capability", "90% reduction in errors"],
      industry: "Financial Services",
      icon: <ChartBar className="w-6 h-6 text-primary" />,
      tags: ["Workflow Automation", "AI Agents", "Customer Service"]
    },
    {
      title: "Intelligent Document Processing Revolution",
      company: "Healthcare Provider Network",
      description: "Revolutionized document processing with AI, handling 1M+ documents monthly with near-perfect accuracy.",
      impact: ["1M+ documents processed monthly", "99.9% accuracy", "75% cost reduction"],
      industry: "Healthcare",
      icon: <Award className="w-6 h-6 text-primary" />,
      tags: ["Document Processing", "Healthcare", "Cost Optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforming Businesses Through Innovation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover how we've helped organizations achieve breakthrough results with our cutting-edge AI and automation solutions.
          </p>
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => navigate("/start-project")}
            className="animate-float"
          >
            Start Your Success Story
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="bg-accent/40 backdrop-blur-sm border border-accent/20 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  {study.icon}
                  <Badge variant="secondary">{study.industry}</Badge>
                </div>
                <CardTitle className="text-xl text-white mb-2">{study.title}</CardTitle>
                <CardDescription className="text-gray-300 font-medium">
                  {study.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">{study.description}</p>
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white">Key Impact:</h4>
                  <ul className="space-y-2">
                    {study.impact.map((item, i) => (
                      <li key={i} className="text-gray-300 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 flex flex-wrap gap-2">
                    {study.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;