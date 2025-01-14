import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, ChartBar, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Canvas } from '@react-three/fiber';
import Globe from "@/components/Globe";

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
      
      {/* Hero Section with Globe */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Global Impact Through Innovation
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transforming businesses across the globe with cutting-edge AI and automation solutions.
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
            <div className="h-[500px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-transparent to-transparent z-10" />
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Globe />
              </Canvas>
            </div>
          </div>
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