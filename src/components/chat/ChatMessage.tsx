import React from 'react';
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    type: 'text' | 'system' | 'ai';
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 text-sm",
        message.type === 'text' ? "justify-end" : "justify-start"
      )}
    >
      {message.type === 'ai' && (
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      {message.type === 'text' && (
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-4 w-4 text-secondary-foreground" />
        </div>
      )}
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          message.type === 'text' ? "bg-primary text-primary-foreground" : "bg-muted",
          message.type === 'system' ? "bg-accent text-accent-foreground w-full text-center" : ""
        )}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;