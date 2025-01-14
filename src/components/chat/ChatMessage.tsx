import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/message';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${
        message.type === 'system' 
          ? 'bg-purple-50/10 dark:bg-purple-900/20 border border-purple-200/20 dark:border-purple-800/20' 
          : ''
      } p-4 rounded-lg backdrop-blur-sm`}
    >
      <div className="flex-1 space-y-2">
        <div className="prose prose-purple dark:prose-invert max-w-none">
          {message.content}
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <Copy className="w-4 h-4 text-purple-500" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <RotateCcw className="w-4 h-4 text-purple-500" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <ThumbsUp className="w-4 h-4 text-purple-500" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <ThumbsDown className="w-4 h-4 text-purple-500" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;