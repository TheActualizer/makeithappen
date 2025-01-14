import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, Link2, Settings2, ChevronDown, MessageCircle, HelpCircle, Info } from "lucide-react";
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
      <div className="bg-gradient-to-br from-purple-900/60 via-purple-800/55 to-purple-900/60 backdrop-blur-md border border-white/10 rounded-t-xl shadow-2xl">
        <motion.div
          className="flex items-center justify-between px-5 py-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-500/20 shadow-lg">
              <MessageCircle className="w-5 h-5 text-purple-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-white/95 tracking-tight">The Make it happen app</span>
              <span className="text-xs text-purple-200/70 font-light">Your AI Assistant</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-purple-200/80"
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
                <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  <ChatMessages />
                </div>

                <div className="border-t border-white/10 p-5 bg-purple-900/20 backdrop-blur-sm">
                  <div className="relative">
                    <ChatInput />
                    <div className="absolute right-2 bottom-2 flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
                      >
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border border-purple-400/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-purple-200/60">
                    <span className="font-light tracking-wide">Type / for commands</span>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      <span className="font-light tracking-wide">AI-powered assistance</span>
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