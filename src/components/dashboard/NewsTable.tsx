import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadedSection } from '@/components/LazyLoadedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Tag } from 'lucide-react';

interface NewsTableProps {
  data: {
    id: string;
    title: string;
    description?: string;
    category?: string;
    date: string;
    readTime?: string;
    views?: number;
    tags?: string[];
  }[];
}

export const NewsTable = ({ data }: NewsTableProps) => {
  return (
    <div className="grid gap-6">
      {data.map((item, index) => (
        <LazyLoadedSection key={item.id} delay={index * 0.1}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-accent/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-primary">
                  {item.title}
                </CardTitle>
                {item.category && (
                  <Badge variant="secondary" className="text-sm">
                    {item.category}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {item.description && (
                  <p className="text-muted-foreground">{item.description}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  
                  {item.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.readTime} read</span>
                    </div>
                  )}
                  
                  {item.views !== undefined && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{item.views} views</span>
                    </div>
                  )}
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <div 
                        key={tag} 
                        className="flex items-center gap-1 text-sm text-muted-foreground"
                      >
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </LazyLoadedSection>
      ))}
    </div>
  );
};