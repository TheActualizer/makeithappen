import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: string | null;
  created_at: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

interface MessageAreaProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export const MessageArea = ({ 
  messages, 
  newMessage, 
  setNewMessage, 
  onSendMessage 
}: MessageAreaProps) => {
  return (
    <Card className="flex-1 p-4 flex flex-col">
      <ScrollArea className="flex-1 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.profiles?.email === 'admin@example.com' ? 'justify-end' : ''
              }`}
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium">
                  {message.profiles?.first_name && message.profiles?.last_name
                    ? `${message.profiles.first_name} ${message.profiles.last_name}`
                    : 'Unknown User'}
                </p>
                <div className="bg-accent p-3 rounded-lg mt-1">
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={onSendMessage} className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};