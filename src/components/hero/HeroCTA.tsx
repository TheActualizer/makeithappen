import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#9b87f5] to-[#0EA5E9] text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
        onClick={() => navigate('/start-project')}
      >
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
        className="border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
      >
        Explore Solutions
      </Button>
    </div>
  );
};