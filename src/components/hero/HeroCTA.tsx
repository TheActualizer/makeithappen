import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <Button
        size="lg"
        className="relative overflow-hidden bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:from-[#7E69AB] hover:to-[#33C3F0] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 transform skew-x-1 after:absolute after:inset-0 after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity"
        onClick={() => navigate('/start-project')}
      >
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
        className="border-white/10 text-[#D6BCFA] hover:text-white hover:bg-white/5 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1 hover:translate-x-1 skew-x-1"
      >
        Explore Solutions
      </Button>
    </div>
  );
};