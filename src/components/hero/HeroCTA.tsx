import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button
        size="lg"
        className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-[2px] after:absolute after:inset-0 after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity"
        onClick={() => navigate('/start-project')}
      >
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
        className="border-white/10 text-gray-200 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
      >
        Explore Solutions
      </Button>
    </div>
  );
};