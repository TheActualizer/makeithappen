import React, { useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useMessageSender } from '@/hooks/useMessageSender';
import { uploadChatAttachment } from '@/utils/fileUpload';
import { useToast } from "@/components/ui/use-toast";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  const { newMessage, setNewMessage, sendMessage } = useMessageSender(null, () => {});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const attachment = await uploadChatAttachment(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been attached to your message.`,
      });
      // You can now use the attachment URL in your message or store it
      console.log('Attachment uploaded:', attachment);
    } catch (error) {
      console.error('Error uploading attachment:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload attachment. Please try again.",
      });
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        className="min-h-[60px] w-full pr-20 bg-white/5 border-white/10 focus:ring-purple-400/30 resize-none rounded-lg placeholder-purple-200/40 text-purple-100"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 bottom-2 w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
        onClick={handleAttachmentClick}
      >
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatInput;