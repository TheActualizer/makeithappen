import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/message';
import { motion } from 'framer-motion';

const AICivilEngineer = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initial message from AI Civil Engineer
    const sendInitialMessage = async () => {
      console.log('AICivilEngineer: Sending initial message');
      const { data, error } = await supabase
        .from('ai_interactions')
        .insert([
          {
            sender_role: 'civil_engineer',
            message: "Hello! I'm your AI Civil Engineer assistant. I'm analyzing construction patterns and preparing insights about sustainable building practices. What would you like to know about modern construction techniques?",
            metadata: {
              expertise: ['construction', 'sustainability', 'engineering'],
              context: 'initial_greeting'
            }
          }
        ])
        .select();

      if (error) {
        console.error('AICivilEngineer: Error sending initial message:', error);
      } else {
        console.log('AICivilEngineer: Initial message sent:', data);
      }
    };

    sendInitialMessage();

    // Set up real-time subscription
    console.log('AICivilEngineer: Setting up real-time subscription');
    const channel = supabase
      .channel('ai_engineering_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_interactions'
        },
        (payload) => {
          console.log('AICivilEngineer: Received real-time update:', payload);
          setMessages(prevMessages => [...prevMessages, payload.new as Message]);
        }
      )
      .subscribe((status) => {
        console.log('AICivilEngineer: Subscription status:', status);
      });

    return () => {
      console.log('AICivilEngineer: Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50/10 to-blue-100/10 p-4 rounded-lg backdrop-blur-sm border border-blue-200/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-500/20 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-blue-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 22a8 8 0 1 1 16 0" />
                <circle cx="10" cy="6" r="6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-200">AI Civil Engineer</span>
          </div>
          <p className="text-gray-300 ml-8">{message.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AICivilEngineer;