import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, Link2, Settings2, ChevronDown, MessageCircle, HelpCircle, Info, Network } from "lucide-react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              <Network className="w-5 h-5 text-purple-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-white/95 tracking-tight">Agentic Hive Interface</span>
              <span className="text-xs text-purple-200/70 font-light">Enterprise-Grade AI Orchestration</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-purple-900/90 backdrop-blur-lg border-white/10 text-purple-100">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Agentic Hive Assistant</h4>
                  <div className="text-xs space-y-2">
                    <p>Connect to our enterprise-grade AI orchestration system powered by:</p>
                    <ul className="list-disc list-inside space-y-1 text-purple-200/70">
                      <li>Advanced data pipelines</li>
                      <li>Multi-agent swarm intelligence</li>
                      <li>Automated report generation</li>
                      <li>Industry-specific insights</li>
                    </ul>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Settings2 className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-purple-900/90 backdrop-blur-lg border-white/10 text-purple-100">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Interface Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span>Connected to Enterprise Pipeline</span>
                      <span className="text-emerald-400">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Swarm Intelligence Mode</span>
                      <span className="text-emerald-400">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Data Processing Status</span>
                      <span className="text-emerald-400">Online</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
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
                    <span className="font-light tracking-wide">Access the Hive Swarm Network</span>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      <span className="font-light tracking-wide">Connected to Enterprise Data Pipelines & Analytics</span>
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