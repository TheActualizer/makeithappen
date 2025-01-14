import React, { useRef, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { uploadChatAttachment } from '@/utils/fileUpload';
import { useToast } from "@/components/ui/use-toast";
import { Link2, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendMessageToDify } from '@/utils/difyApi';

const ChatInput = () => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await sendMessageToDify(newMessage);
      console.log('Message sent successfully:', response);
      setNewMessage('');
      toast({
        title: "Message sent",
        description: "Your message has been processed by the AI.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
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
      <div className="absolute right-2 bottom-2 flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
          onClick={handleAttachmentClick}
        >
          <Link2 className="w-4 h-4" />
        </Button>
        <Button 
          size="icon" 
          className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border border-purple-400/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;