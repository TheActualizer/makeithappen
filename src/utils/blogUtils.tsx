import React from 'react';
import { BookOpen, TrendingUp, Building2, Scale, Brain, 
  Wrench, Database, FileCode, Workflow, Heart, 
  Github, Rocket } from "lucide-react";

export const getCategoryIcon = (slug: string) => {
  const icons: Record<string, JSX.Element> = {
    'financial-automation': <TrendingUp className="w-8 h-8 text-primary" />,
    'real-estate-logistics': <Building2 className="w-8 h-8 text-primary" />,
    'legal-tech': <Scale className="w-8 h-8 text-primary" />,
    'agentic-systems': <Brain className="w-8 h-8 text-primary" />,
    'agent-tooling': <Wrench className="w-8 h-8 text-primary" />,
    'vector-systems': <Database className="w-8 h-8 text-primary" />,
    'data-engineering': <FileCode className="w-8 h-8 text-primary" />,
    'workflow-automation': <Workflow className="w-8 h-8 text-primary" />,
    'healthcare-compliance': <Heart className="w-8 h-8 text-primary" />,
    'open-source-ai': <Github className="w-8 h-8 text-primary" />,
    'rapid-prototyping': <Rocket className="w-8 h-8 text-primary" />,
    'manufacturing': <BookOpen className="w-8 h-8 text-primary" />
  };
  
  return icons[slug] || <BookOpen className="w-8 h-8 text-primary" />;
};