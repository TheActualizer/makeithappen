import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
      <Button
        size="lg"
        className="bg-[#FF9900] hover:bg-[#EC7211] text-white min-w-[160px] shadow-sm"
        onClick={() => navigate('/start-project')}
      >
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
        className="border-[#232F3E] text-[#232F3E] hover:bg-[#232F3E]/5 min-w-[160px]"
      >
        Explore Solutions
      </Button>
    </div>
  );
};