import { useEffect } from "react";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const StartProject = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent/10">
      <div className="grid lg:grid-cols-2 h-screen">
        {/* Left Section - Video */}
        <ScrollArea className="h-screen p-8">
          <div className="flex flex-col justify-center">
            <Card className="relative overflow-hidden shadow-lg">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/eXlqLTSWMv4"
                  title="Project Overview Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
            <div className="mt-6 text-center px-4">
              <h2 className="text-2xl font-semibold mb-3">Watch Our Overview</h2>
              <p className="text-muted-foreground">
                Learn about our process and how we can help transform your business with AI solutions.
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Right Section - Project Form */}
        <ScrollArea className="h-screen bg-background/95 backdrop-blur-sm shadow-xl">
          <ProjectStartModal 
            isOpen={true}
            onClose={() => navigate("/")}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default StartProject;