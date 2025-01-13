import { useEffect } from "react";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useNavigate } from "react-router-dom";

const StartProject = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent/10">
      <div className="max-w-4xl mx-auto pt-8 pb-4 px-4">
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-8">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/eXlqLTSWMv4"
            title="Project Overview Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <ProjectStartModal 
        isOpen={true}
        onClose={() => navigate("/")}
      />
    </div>
  );
};

export default StartProject;