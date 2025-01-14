import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Rocket, Zap, Timer, DollarSign, LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const CaseStudies = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      title: "Process Automation",
      company: "Manufacturing Solutions Co",
      metrics: [
        { icon: <Timer className="w-5 h-5" />, value: "75%", label: "Time Saved" },
        { icon: <BarChart3 className="w-5 h-5" />, value: "98%", label: "Accuracy" },
        { icon: <DollarSign className="w-5 h-5" />, value: "150K", label: "Annual Savings" }
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      tags: ["AI Automation", "Process Optimization"],
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Smart Workflows",
      company: "Regional Financial Services",
      metrics: [
        { icon: <Zap className="w-5 h-5" />, value: "60%", label: "Faster Response" },
        { icon: <Timer className="w-5 h-5" />, value: "16/5", label: "Operation Hours" },
        { icon: <LineChart className="w-5 h-5" />, value: "85%", label: "Task Reduction" }
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tags: ["Workflow Automation", "AI Integration"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Document Intelligence",
      company: "Healthcare Provider",
      metrics: [
        { icon: <BarChart3 className="w-5 h-5" />, value: "25K+", label: "Monthly Docs" },
        { icon: <Timer className="w-5 h-5" />, value: "99%", label: "Accuracy Rate" },
        { icon: <DollarSign className="w-5 h-5" />, value: "40%", label: "Cost Reduction" }
      ],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      tags: ["Document Processing", "Healthcare"],
      color: "from-emerald-500 to-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px] opacity-25" />
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-fade-in">
              Success Stories
            </h1>
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => navigate("/start-project")}
              className="mt-8 group animate-fade-in [animation-delay:200ms]"
            >
              Start Your Success Story
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card 
              key={index}
              className="group bg-accent/40 backdrop-blur-sm border-accent/20 overflow-hidden
                hover:shadow-lg hover:shadow-primary/5 transition-all duration-500
                animate-fade-in [animation-delay:var(--delay)]"
              style={{ '--delay': `${(index + 1) * 200}ms` } as React.CSSProperties}
            >
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-80`} />
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-semibold text-white">{study.title}</h3>
                  <p className="text-sm text-gray-200">{study.company}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300">
                      <div className="mb-2 flex justify-center text-primary">{metric.icon}</div>
                      <div className="font-semibold text-white">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, i) => (
                    <Badge 
                      key={i}
                      variant="outline"
                      className="bg-accent/50 text-gray-300 border-accent/30 hover:bg-accent"
                    >
                      {tag}
                    </Badge>
                  ))}
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