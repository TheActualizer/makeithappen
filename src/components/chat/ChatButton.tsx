import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const ChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Show greeting after a short delay
    const greetingTimer = setTimeout(() => {
      setIsExpanded(true);
      setShowGreeting(true);
    }, 1000);

    // Hide greeting after 3 seconds
    const hideTimer = setTimeout(() => {
      setIsExpanded(false);
      setShowGreeting(false);
    }, 4000);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-3 z-50">
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-accent/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Welcome! How can I help you today?
          </motion.div>
        )}
      </AnimatePresence>
      
      <SheetTrigger asChild>
        <motion.div
          animate={{
            scale: isExpanded ? 1.1 : 1,
          }}
          whileHover={{ scale: 1.1 }}
        >
          <Button
            className={`h-12 w-12 rounded-full shadow-lg transition-colors duration-200 
              ${!showGreeting && "animate-pulse"}`}
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      </SheetTrigger>
    </div>
  );
};

export default ChatButton;