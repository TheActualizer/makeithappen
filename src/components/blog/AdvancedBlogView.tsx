import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ZoomConnect from '../ZoomConnect';
import { Network, Database, Cpu, GitBranch } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdvancedBlogView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        // Get Mapbox token from Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('get-secret', {
          body: { name: 'MAPBOX_PUBLIC_TOKEN' }
        });

        if (error) {
          throw error;
        }

        if (!data?.value) {
          throw new Error('Mapbox token not found');
        }

        mapboxgl.accessToken = data.value;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [0, 0],
          zoom: 2,
          projection: 'globe'
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add atmosphere effect
        map.current.on('style.load', () => {
          map.current?.setFog({
            color: 'rgb(186, 210, 235)',
            'high-color': 'rgb(36, 92, 223)',
            'horizon-blend': 0.02
          });
        });

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Zoom Integration */}
      <div className="absolute top-4 right-4 z-50">
        <ZoomConnect />
      </div>

      {/* Map Container */}
      <div className="absolute inset-0">
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      {/* Microservices Visualization */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Network, label: 'API Gateway', color: 'from-blue-500/20 to-blue-600/20' },
              { icon: Database, label: 'Data Pipeline', color: 'from-purple-500/20 to-purple-600/20' },
              { icon: Cpu, label: 'Processing Engine', color: 'from-green-500/20 to-green-600/20' },
              { icon: GitBranch, label: 'Service Mesh', color: 'from-orange-500/20 to-orange-600/20' }
            ].map((service, index) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} backdrop-blur-md border border-white/10`}>
                  <service.icon className="w-6 h-6 text-white/80 mb-2" />
                  <h3 className="text-sm font-medium text-white/90">{service.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedBlogView;