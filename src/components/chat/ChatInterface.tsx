import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, Link2, Settings2, ChevronDown } from "lucide-react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-[420px] bg-accent/95 backdrop-blur-lg border-t md:border-l border-secondary/20 shadow-2xl transition-all duration-300 ease-in-out z-50">
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-secondary/20 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-200">Assistant</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Settings2 className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </div>

      <div className={`flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'h-[600px]' : 'h-0'} overflow-hidden`}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <ChatMessages />
        </div>

        <div className="border-t border-secondary/20 p-4 bg-accent/90 backdrop-blur-sm">
          <div className="relative">
            <ChatInput />
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Link2 className="w-4 h-4 text-gray-400" />
              </Button>
              <Button size="icon" className="w-8 h-8 bg-primary hover:bg-primary/90">
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <span>Type / to see available commands</span>
            <div className="flex items-center gap-2">
              <span>AI can make mistakes.</span>
              <span>Please verify responses.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;