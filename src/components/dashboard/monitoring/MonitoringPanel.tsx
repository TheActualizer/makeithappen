import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const MonitoringPanel = () => {
  const monitoringLinks = [
    {
      title: "Edge Functions Logs",
      description: "Monitor Edge Function executions and debug issues",
      url: "https://supabase.com/dashboard/project/kmakgvgtduxtactdiwyp/functions",
      icon: "🔍"
    },
    {
      title: "Database Tables",
      description: "View and manage database tables and records",
      url: "https://supabase.com/dashboard/project/kmakgvgtduxtactdiwyp/database/tables",
      icon: "📊"
    },
    {
      title: "User Management",
      description: "Manage user accounts and authentication",
      url: "https://supabase.com/dashboard/project/kmakgvgtduxtactdiwyp/auth/users",
      icon: "👥"
    },
    {
      title: "Storage Buckets",
      description: "Manage file storage and access",
      url: "https://supabase.com/dashboard/project/kmakgvgtduxtactdiwyp/storage/buckets",
      icon: "📁"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Supabase Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monitoringLinks.map((link) => (
          <Card key={link.title} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{link.icon}</span>
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {link.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(link.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};