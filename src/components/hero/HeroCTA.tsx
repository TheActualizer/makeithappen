import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 transition-all duration-300 hover:-translate-y-1"
        onClick={() => navigate('/start-project')}
      >
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: 'smooth' })}
        className="rounded-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
      >
        Explore Solutions
      </Button>
    </div>
  );
};