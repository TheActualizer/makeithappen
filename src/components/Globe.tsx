import React from 'react';
import { Image } from "@/components/ui/image";

const Globe = () => {
  return (
    <div className="relative w-full h-full">
      <img 
        src="/placeholder.svg" 
        alt="Globe visualization"
        className="w-full h-full object-cover rounded-lg opacity-75"
      />
    </div>
  );
};

export default Globe;