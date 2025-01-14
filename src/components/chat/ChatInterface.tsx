import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, Link2, Settings2, ChevronDown, MessageSquare, HelpCircle, Info } from "lucide-react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { motion, AnimatePresence } from "framer-motion";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-[420px] transition-all duration-300 ease-in-out z-50">
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full right-4 mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 backdrop-blur-lg rounded-lg shadow-lg border border-purple-200 dark:border-purple-800 max-w-[280px]"
          >
            <p className="text-sm text-purple-800 dark:text-purple-200">
              I'm your AI companion! I can help you navigate, answer questions, and make changes to your application.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : '60px',
          opacity: 1,
        }}
        className="bg-white/5 backdrop-blur-lg border border-purple-200/20 dark:border-purple-800/20 rounded-t-lg shadow-2xl"
      >
        <div 
          className="flex items-center justify-between px-4 py-3 border-b border-purple-200/20 dark:border-purple-800/20 cursor-pointer bg-purple-50/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">AI Assistant</span>
              <span className="text-xs text-purple-600 dark:text-purple-300">Online</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              onClick={(e) => {
                e.stopPropagation();
                setShowTip(!showTip);
              }}
            >
              <HelpCircle className="w-4 h-4 text-purple-500" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              <Settings2 className="w-4 h-4 text-purple-500" />
            </Button>
            <ChevronDown className={`w-4 h-4 text-purple-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        <motion.div
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <ChatMessages />
            </div>

            <div className="border-t border-purple-200/20 dark:border-purple-800/20 p-4 bg-purple-50/10 backdrop-blur-sm">
              <div className="relative">
                <ChatInput />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  >
                    <Link2 className="w-4 h-4 text-purple-500" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="w-8 h-8 bg-purple-500 hover:bg-purple-600 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-purple-600 dark:text-purple-300">
                <span>Type / for commands</span>
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>AI-powered assistance</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;