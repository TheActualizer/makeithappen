import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Conversation {
  id: string;
  title: string | null;
  created_at: string;
}

export const ConversationList = ({ 
  selectedConversationId,
  onSelect
}: { 
  selectedConversationId: string | null;
  onSelect: (id: string) => void;
}) => {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data } = await supabase
        .from("conversations")
        .select("*")
        .order("created_at", { ascending: false });
      return data as Conversation[];
    },
  });

  if (isLoading) {
    return <div>Loading conversations...</div>;
  }

  return (
    <div className="space-y-4">
      {conversations?.map((conversation) => (
        <Card
          key={conversation.id}
          className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
            selectedConversationId === conversation.id ? "bg-accent" : ""
          }`}
          onClick={() => onSelect(conversation.id)}
        >
          <h3 className="font-medium">
            {conversation.title || "New Conversation"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {new Date(conversation.created_at).toLocaleDateString()}
          </p>
        </Card>
      ))}
    </div>
  );
};