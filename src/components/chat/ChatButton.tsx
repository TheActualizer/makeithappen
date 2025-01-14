import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const ChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    // Show greeting after a short delay
    const greetingTimer = setTimeout(() => {
      setIsExpanded(true);
      setShowGreeting(true);
      setShowSparkle(true);
    }, 1000);

    // Hide greeting after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsExpanded(false);
      setShowGreeting(false);
    }, 5000);

    // Keep sparkle visible for a bit longer
    const sparkleTimer = setTimeout(() => {
      setShowSparkle(false);
    }, 6000);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(hideTimer);
      clearTimeout(sparkleTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-3 z-50">
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="bg-purple-900/95 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg max-w-[280px]"
          >
            <p className="text-sm font-medium">
              👋 Hi! I'm your AI companion. I can help you navigate and customize this application.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <SheetTrigger asChild>
        <motion.div
          animate={{
            scale: isExpanded ? 1.1 : 1,
          }}
          whileHover={{ scale: 1.1 }}
          className="relative"
        >
          <Button
            className={`h-12 w-12 rounded-full shadow-lg transition-all duration-300 bg-purple-600 hover:bg-purple-700
              ${!showGreeting && "animate-pulse"}`}
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <AnimatePresence>
            {showSparkle && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </SheetTrigger>
    </div>
  );
};

export default ChatButton;
