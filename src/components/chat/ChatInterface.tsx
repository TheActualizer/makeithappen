import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, Link2, Settings2, ChevronDown, MessageSquare, HelpCircle, Info } from "lucide-react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { motion, AnimatePresence } from "framer-motion";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="fixed bottom-0 right-0 w-full md:w-[420px] z-50"
    >
      <div className="bg-gradient-to-br from-purple-900/90 to-purple-800/90 backdrop-blur-xl border border-purple-300/20 rounded-t-lg shadow-2xl">
        <motion.div
          className="flex items-center justify-between px-4 py-3 border-b border-purple-300/20 cursor-pointer hover:bg-purple-800/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-full">
              <MessageSquare className="w-5 h-5 text-purple-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">The Make it happen app</span>
              <span className="text-xs text-purple-200/80">Your AI Assistant</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-purple-700/50 text-purple-200"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-purple-700/50 text-purple-200"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-purple-200"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30
              }}
            >
              <div className="h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-400/20 scrollbar-track-transparent">
                  <ChatMessages />
                </div>

                <div className="border-t border-purple-300/20 p-4 bg-purple-900/50 backdrop-blur-sm">
                  <div className="relative">
                    <ChatInput />
                    <div className="absolute right-2 bottom-2 flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8 hover:bg-purple-700/50 text-purple-200"
                      >
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        className="w-8 h-8 bg-purple-500 hover:bg-purple-600 transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-purple-200/70">
                    <span>Type / for commands</span>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      <span>AI-powered assistance</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatInterface;