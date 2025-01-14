import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const ChatButton = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    // Show message and sparkle after a short delay
    const showTimer = setTimeout(() => {
      setShowMessage(true);
      setShowSparkle(true);
    }, 1000);

    // Hide message after 5 seconds
    const hideTimer = setTimeout(() => {
      setShowMessage(false);
    }, 6000);

    // Keep sparkle visible slightly longer
    const sparkleTimer = setTimeout(() => {
      setShowSparkle(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(sparkleTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-3 z-50">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-purple-900/95 backdrop-blur-sm text-white px-6 py-4 rounded-lg shadow-lg max-w-[300px] relative"
          >
            <p className="text-sm font-medium leading-relaxed">
              👋 AI Assistant coming soon! We're working on making your experience even better.
            </p>
            {showSparkle && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatButton;
