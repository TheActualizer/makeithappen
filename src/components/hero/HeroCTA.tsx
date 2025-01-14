import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
      <Button
        size="lg"
        className="bg-[#0071DC] hover:bg-[#005CB2] text-white min-w-[160px] shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
        onClick={() => navigate('/start-project')}
      >
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
        className="border-[#D6BCFA] text-[#1A1F2C] hover:bg-[#F1F0FB] min-w-[160px] transition-all duration-300"
      >
        Explore Solutions
      </Button>
    </div>
  );
};