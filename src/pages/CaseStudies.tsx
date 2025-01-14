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
      title: "AI-Enhanced Process Automation",
      company: "Manufacturing Solutions Co",
      description: "Implemented an intelligent automation system that reduced manual data processing time by 75% and improved operational efficiency.",
      impact: ["75% reduction in processing time", "98% accuracy in data entry", "$150K annual savings"],
      industry: "Manufacturing",
      icon: <Rocket className="w-6 h-6 text-primary" />,
      tags: ["AI Automation", "Process Optimization", "Digital Transformation"]
    },
    {
      title: "Smart Workflow Automation",
      company: "Regional Financial Services",
      description: "Deployed intelligent automation across key departments, streamlining workflows and improving customer response times significantly.",
      impact: ["60% faster response times", "16/5 operation capability", "85% reduction in manual tasks"],
      industry: "Financial Services",
      icon: <ChartBar className="w-6 h-6 text-primary" />,
      tags: ["Workflow Automation", "AI Integration", "Customer Service"]
    },
    {
      title: "Intelligent Document Processing",
      company: "Healthcare Provider",
      description: "Revolutionized document processing with AI, handling thousands of documents monthly with high accuracy and compliance.",
      impact: ["25K+ documents processed monthly", "99% accuracy", "40% cost reduction"],
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1]">
            Transforming Businesses Through Innovation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-[1.6] tracking-[0.0125em]">
            Discover how we've helped organizations achieve breakthrough results with our cutting-edge AI and automation solutions.
          </p>
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => navigate("/start-project")}
            className="animate-float hover:scale-105 transition-transform duration-300"
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
            <Card 
              key={index} 
              className="group bg-accent/40 backdrop-blur-sm relative overflow-hidden
                before:absolute before:inset-0 before:border before:border-primary/10 before:rounded-lg
                after:absolute after:inset-0 after:border after:border-primary/20 after:rounded-lg after:transition-transform after:duration-700
                hover:after:scale-95 hover:before:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="transform transition-transform duration-300 group-hover:scale-110">
                    {study.icon}
                  </div>
                  <Badge variant="secondary" className="transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    {study.industry}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white mb-2 transition-colors duration-300 group-hover:text-primary">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-gray-300 font-medium">
                  {study.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6 leading-[1.6] tracking-[0.0125em]">{study.description}</p>
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white">Key Impact:</h4>
                  <ul className="space-y-2">
                    {study.impact.map((item, i) => (
                      <li key={i} className="text-gray-300 flex items-center group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2 transition-transform duration-300 group-hover:scale-125" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 flex flex-wrap gap-2">
                    {study.tags.map((tag, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="text-gray-300 transition-all duration-300 hover:bg-primary/10"
                      >
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