import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";

const ChatButton = () => {
  return (
    <SheetTrigger asChild>
      <Button
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50 hover:scale-110 transition-transform duration-200"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </SheetTrigger>
  );
};

export default ChatButton;