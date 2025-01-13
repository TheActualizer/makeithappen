import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
  type?: 'text' | 'system' | 'ai';
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
}

interface MessageAreaProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const MessageArea = ({ 
  messages, 
  newMessage, 
  setNewMessage, 
  onSendMessage,
  isLoading = false
}: MessageAreaProps) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex-1 p-4 flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="flex-1 mb-4 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 text-sm animate-fade-in",
                message.sender_id ? "justify-end" : "justify-start"
              )}
            >
              {!message.sender_id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.profiles?.avatar_url || ''} />
                  <AvatarFallback className="bg-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={cn("flex flex-col", message.sender_id && "items-end")}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">
                    {message.profiles?.first_name && message.profiles?.last_name
                      ? `${message.profiles.first_name} ${message.profiles.last_name}`
                      : message.profiles?.email?.split('@')[0] || 'System'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(message.created_at), 'h:mm a')}
                  </span>
                </div>
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%] shadow-sm transition-all duration-200",
                    message.sender_id 
                      ? "bg-primary text-primary-foreground rounded-br-none hover:bg-primary/90" 
                      : "bg-muted rounded-bl-none hover:bg-muted/90",
                    !message.sender_id && message.type === 'system' && "bg-accent text-accent-foreground w-full text-center"
                  )}
                >
                  {message.content}
                </div>
              </div>
              {message.sender_id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.profiles?.avatar_url || ''} />
                  <AvatarFallback className="bg-secondary">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form 
        onSubmit={onSendMessage} 
        className="flex gap-2 pt-2 border-t animate-fade-in"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-background/50 focus:bg-background transition-colors"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || !newMessage.trim()}
          className={cn(
            "transition-all duration-200",
            !isLoading && newMessage.trim() && "hover:scale-105"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </Card>
  );
};