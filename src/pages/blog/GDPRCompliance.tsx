import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Code, Globe, Server, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';

const GDPRCompliance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/95">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg prose-invert mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            GDPR Compliance in the Age of Open Source AI
          </h1>
          
          <div className="text-gray-300 space-y-6">
            <p className="text-xl">
              In today's data-driven world, GDPR compliance isn't just about following rules—it's about 
              embracing technologies that inherently support privacy and transparency. Open source AI 
              solutions offer unique advantages in achieving and maintaining GDPR compliance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <Card className="bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Transparent Data Processing
                  </h3>
                  <p className="text-gray-300">
                    Open source AI systems provide complete visibility into data processing mechanisms, 
                    making it easier to demonstrate GDPR compliance and data handling practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-accent-foreground/5 backdrop-blur-sm border-accent-foreground/10">
                <CardContent className="p-6">
                  <Lock className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Data Sovereignty
                  </h3>
                  <p className="text-gray-300">
                    Self-hosted solutions ensure complete control over data storage and processing, 
                    making it easier to comply with data localization requirements.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">
              Key Benefits of Open Source for GDPR Compliance
            </h2>

            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-4">
                <Code className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-white font-semibold">Auditable Code Base</h3>
                  <p>Complete transparency in how data is processed and stored, allowing for thorough security audits.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Globe className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-white font-semibold">Data Localization</h3>
                  <p>Easy deployment within specific geographic regions to meet data residency requirements.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Server className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-white font-semibold">Custom Data Retention</h3>
                  <p>Implement precise data retention policies and automated deletion processes.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">
              Implementation Strategies
            </h2>

            <div className="space-y-6">
              <p>
                When implementing open source AI solutions for GDPR-compliant systems, consider:
              </p>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <p>Self-hosting options for complete data control</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <p>Regular security audits and updates</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <p>Automated data handling and deletion processes</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <p>Clear documentation of data processing activities</p>
                </li>
              </ul>
            </div>

            <div className="mt-12 p-6 bg-accent-foreground/5 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Looking Ahead
              </h2>
              <p>
                As AI technology continues to evolve, open source solutions will play an increasingly 
                crucial role in maintaining GDPR compliance. The transparency and flexibility offered 
                by open source tools make them ideal for organizations looking to innovate while 
                maintaining the highest standards of data protection and privacy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GDPRCompliance;