import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
}

export const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation 
}: ConversationListProps) => {
  return (
    <Card className="w-1/4 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Conversations
      </h3>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "p-3 rounded-lg cursor-pointer transition-all duration-200",
                "hover:bg-accent/50 hover:shadow-sm",
                selectedConversation === conversation.id 
                  ? 'bg-accent shadow-sm' 
                  : 'hover:translate-x-1'
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <h4 className="font-medium truncate">
                {conversation.title || 'Untitled Conversation'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(conversation.created_at), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};