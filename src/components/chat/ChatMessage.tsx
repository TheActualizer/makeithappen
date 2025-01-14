import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/message';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex gap-4 ${message.is_admin_message ? 'bg-accent/50 p-4 rounded-lg' : ''}`}>
      <div className="flex-1 space-y-2">
        <div className="prose prose-invert max-w-none">
          {message.content}
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Copy className="w-4 h-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <RotateCcw className="w-4 h-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ThumbsUp className="w-4 h-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ThumbsDown className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;