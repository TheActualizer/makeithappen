import React from 'react';
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    type: 'text' | 'system' | 'ai';
    created_at: string;
    sender_id?: string | null;
    profiles?: {
      first_name: string | null;
      last_name: string | null;
      email: string | null;
      avatar_url: string | null;
    } | null;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUserMessage = message.type === 'text';
  const formattedTime = format(new Date(message.created_at), 'h:mm a');
  
  const senderName = message.profiles?.first_name && message.profiles?.last_name
    ? `${message.profiles.first_name} ${message.profiles.last_name}`
    : message.profiles?.email?.split('@')[0] || 'Unknown User';

  return (
    <div
      className={cn(
        "flex items-start gap-3 text-sm animate-fade-in",
        isUserMessage ? "justify-end" : "justify-start"
      )}
    >
      {!isUserMessage && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.profiles?.avatar_url || ''} />
          <AvatarFallback className="bg-primary">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex flex-col", isUserMessage && "items-end")}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">{senderName}</span>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
        </div>
        <div
          className={cn(
            "rounded-lg px-4 py-2 max-w-[80%] shadow-sm",
            isUserMessage 
              ? "bg-primary text-primary-foreground rounded-br-none" 
              : "bg-muted rounded-bl-none",
            message.type === 'system' && "bg-accent text-accent-foreground w-full text-center"
          )}
        >
          {message.content}
        </div>
      </div>
      {isUserMessage && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.profiles?.avatar_url || ''} />
          <AvatarFallback className="bg-secondary">
            <User className="h-4 w-4 text-secondary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;