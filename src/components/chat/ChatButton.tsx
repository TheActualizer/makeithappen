import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    // Show sparkle effect on initial load
    setShowSparkle(true);
    const timer = setTimeout(() => {
      setShowSparkle(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SheetTrigger asChild onClick={() => setIsOpen(!isOpen)}>
        <motion.div
          initial={false}
          animate={{
            scale: isOpen ? 0.9 : 1,
            rotate: isOpen ? 180 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <Button
            className="h-12 w-12 rounded-full shadow-lg transition-all duration-300 bg-purple-600 hover:bg-purple-700"
            size="icon"
          >
            <motion.div
              animate={{
                rotate: isOpen ? 180 : 0
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30
              }}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MessageCircle className="h-6 w-6" />
              )}
            </motion.div>
          </Button>
          <AnimatePresence>
            {showSparkle && !isOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1"
              >
                <div className="h-2 w-2" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </SheetTrigger>
    </div>
  );
};

export default ChatButton;