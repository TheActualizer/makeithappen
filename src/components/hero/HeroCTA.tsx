import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button
        size="lg"
        className="bg-secondary hover:bg-secondary/90 text-white shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
        onClick={() => navigate('/start-project')}
      >
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
        className="border-secondary/20 text-gray-200 hover:bg-secondary/10 transition-all duration-300"
      >
        Explore Solutions
      </Button>
    </div>
  );
};