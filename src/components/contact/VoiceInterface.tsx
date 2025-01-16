import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceInterfaceProps {
  onSpeakingChange?: (speaking: boolean) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onSpeakingChange }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const chatRef = useRef<RealtimeChat | null>(null);

  const handleMessage = (event: any) => {
    console.log('VoiceInterface: Received message:', event);
    
    if (event.type === 'response.audio.delta') {
      setIsSpeaking(true);
      onSpeakingChange?.(true);
    } else if (event.type === 'response.audio.done') {
      setIsSpeaking(false);
      onSpeakingChange?.(false);
    }
  };

  const startConversation = async () => {
    try {
      console.log('VoiceInterface: Starting conversation');
      setIsConnecting(true);
      
      chatRef.current = new RealtimeChat(handleMessage);
      await chatRef.current.init();
      
      setIsConnected(true);
      toast({
        title: "Voice Interface Connected",
        description: "You can now speak with the AI assistant",
      });
    } catch (error) {
      console.error('VoiceInterface: Error starting conversation:', error);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : 'Failed to start conversation',
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const endConversation = () => {
    console.log('VoiceInterface: Ending conversation');
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsSpeaking(false);
    onSpeakingChange?.(false);
  };

  useEffect(() => {
    return () => {
      console.log('VoiceInterface: Cleaning up');
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-24 right-8 flex flex-col items-center gap-4 z-50"
    >
      {!isConnected ? (
        <Button 
          onClick={startConversation}
          size="icon"
          className="bg-bland-500/80 hover:bg-bland-500 text-bland-100 shadow-glow hover:shadow-glow-strong transition-all duration-500"
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </Button>
      ) : (
        <Button 
          onClick={endConversation}
          variant="destructive"
          size="icon"
          className="shadow-glow hover:shadow-glow-strong transition-all duration-500"
        >
          <MicOff className="w-5 h-5" />
        </Button>
      )}
      {isConnected && (
        <motion.div
          animate={isSpeaking ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ repeat: isSpeaking ? Infinity : 0, duration: 1 }}
          className="w-3 h-3 rounded-full bg-green-500 shadow-glow"
        />
      )}
    </motion.div>
  );
};

export default VoiceInterface;