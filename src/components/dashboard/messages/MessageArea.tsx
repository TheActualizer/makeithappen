import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  conversation_id?: string;
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
                "flex items-start gap-3",
                message.profiles?.email === 'admin@example.com' ? 'justify-end' : ''
              )}
            >
              <div className="flex flex-col max-w-[80%]">
                <p className="text-sm font-medium text-muted-foreground">
                  {message.profiles?.first_name && message.profiles?.last_name
                    ? `${message.profiles.first_name} ${message.profiles.last_name}`
                    : 'Unknown User'}
                </p>
                <div className="bg-accent/50 p-3 rounded-lg mt-1 shadow-sm">
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={onSendMessage} className="flex gap-2 pt-2 border-t">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || !newMessage.trim()}
          className="transition-all duration-200 hover:scale-105"
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