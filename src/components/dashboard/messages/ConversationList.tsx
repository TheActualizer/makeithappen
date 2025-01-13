import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

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
    <Card className="w-1/4 p-4">
      <h3 className="font-semibold mb-4">Conversations</h3>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer hover:bg-accent ${
                selectedConversation === conversation.id ? 'bg-accent' : ''
              }`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <h4 className="font-medium">{conversation.title || 'Untitled Conversation'}</h4>
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