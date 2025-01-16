import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Share2, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { VoiceInterface } from '@/components/contact/VoiceInterface';

export const SpaceshipCallBeacon = () => {
  const { toast } = useToast();
  const [isRinging, setIsRinging] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);

  const handleCallInitiate = () => {
    setIsRinging(true);
    toast({
      title: "Initiating Call",
      description: "Connecting to the mothership...",
    });
    // Simulate call connection
    setTimeout(() => {
      setIsRinging(false);
      window.open('https://calendly.com/your-calendly-link', '_blank');
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/10 to-accent/5 rounded-xl blur-xl" />
      
      {/* Main beacon container */}
      <motion.div 
        className="relative z-10 p-8 rounded-xl bg-accent/50 backdrop-blur-lg border border-primary/20 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Pulsing beacon effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/5"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Control panel */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Call controls */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Intergalactic Communication Hub
            </h3>
            
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                size="lg"
                className={`relative group ${isRinging ? 'animate-pulse' : ''}`}
                onClick={handleCallInitiate}
              >
                <Phone className="w-5 h-5 mr-2" />
                <span>Initialize Call</span>
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/20"
                  animate={{
                    scale: isRinging ? [1, 1.1, 1] : 1,
                    opacity: isRinging ? [0.5, 0, 0.5] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isRinging ? Infinity : 0,
                  }}
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowVoiceInterface(!showVoiceInterface)}
              >
                {isSpeaking ? (
                  <MicOff className="w-5 h-5 mr-2" />
                ) : (
                  <Mic className="w-5 h-5 mr-2" />
                )}
                Voice Command
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://calendly.com/your-calendly-link', '_blank')}
              >
                <Video className="w-5 h-5 mr-2" />
                Video Conference
              </Button>

              <Button
                variant="outline"
                size="lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Documents
              </Button>
            </div>

            {showVoiceInterface && (
              <VoiceInterface onSpeakingChange={setIsSpeaking} />
            )}
          </div>

          {/* Right side - Communication preview */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-accent/30 backdrop-blur-sm border border-primary/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary p-1"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full rounded-full bg-accent flex items-center justify-center">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};