import React from 'react';
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AIModel = 'gpt-4o-mini' | 'gpt-4o' | 'claude' | 'gemini';

interface ChatHeaderProps {
  selectedModel: AIModel;
  onModelChange: (value: AIModel) => void;
}

const ChatHeader = ({ selectedModel, onModelChange }: ChatHeaderProps) => {
  return (
    <SheetHeader className="px-6 py-4 border-b">
      <SheetTitle className="flex items-center justify-between">
        <span>Chat Assistant</span>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4o-mini">GPT-4 Mini</SelectItem>
            <SelectItem value="gpt-4o">GPT-4</SelectItem>
            <SelectItem value="claude">Claude</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
          </SelectContent>
        </Select>
      </SheetTitle>
    </SheetHeader>
  );
};

export default ChatHeader;