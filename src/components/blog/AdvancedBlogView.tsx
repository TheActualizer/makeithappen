import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ZoomConnect from '../ZoomConnect';
import { 
  Network, 
  Database, 
  Cpu, 
  GitBranch, 
  Cloud, 
  Shield, 
  Bot, 
  Workflow 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdvancedBlogView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        console.log('Initializing map...');
        const { data, error } = await supabase.functions.invoke('get-secret', {
          body: { name: 'MAPBOX_PUBLIC_TOKEN' }
        });

        if (error) {
          console.error('Error fetching Mapbox token:', error);
          setMapError('Failed to initialize map');
          toast.error('Map initialization failed');
          throw error;
        }

        if (!data?.value) {
          console.error('Mapbox token not found');
          setMapError('Map configuration missing');
          toast.error('Map configuration error');
          throw new Error('Mapbox token not found');
        }

        console.log('Mapbox token retrieved successfully');
        mapboxgl.accessToken = data.value;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [0, 0],
          zoom: 2,
          projection: 'globe'
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.current.on('style.load', () => {
          map.current?.setFog({
            color: 'rgb(186, 210, 235)',
            'high-color': 'rgb(36, 92, 223)',
            'horizon-blend': 0.02
          });
        });

        console.log('Map initialized successfully');
        toast.success('Map loaded successfully');

      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to load map');
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const services = [
    { icon: Network, label: 'API Gateway', color: 'from-blue-500/20 to-blue-600/20' },
    { icon: Database, label: 'Data Pipeline', color: 'from-purple-500/20 to-purple-600/20' },
    { icon: Cpu, label: 'Processing Engine', color: 'from-green-500/20 to-green-600/20' },
    { icon: GitBranch, label: 'Service Mesh', color: 'from-orange-500/20 to-orange-600/20' },
    { icon: Cloud, label: 'Cloud Infrastructure', color: 'from-cyan-500/20 to-cyan-600/20' },
    { icon: Shield, label: 'Security Layer', color: 'from-red-500/20 to-red-600/20' },
    { icon: Bot, label: 'AI Services', color: 'from-indigo-500/20 to-indigo-600/20' },
    { icon: Workflow, label: 'Workflow Engine', color: 'from-pink-500/20 to-pink-600/20' }
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Zoom Integration */}
      <div className="absolute top-4 right-4 z-50">
        <ZoomConnect />
      </div>

      {/* Map Container */}
      <div className="absolute inset-0">
        {mapError ? (
          <div className="flex items-center justify-center h-full bg-gray-900/50 backdrop-blur-sm">
            <p className="text-white/80 bg-red-500/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              {mapError}
            </p>
          </div>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
      </div>

      {/* Microservices Visualization */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div 
                  className={`p-4 rounded-xl bg-gradient-to-br ${service.color} backdrop-blur-md border border-white/10 hover:scale-105 transition-transform duration-200 cursor-pointer`}
                >
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