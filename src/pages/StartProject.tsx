import { useEffect } from "react";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useNavigate } from "react-router-dom";

const StartProject = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent/10">
      <ProjectStartModal 
        isOpen={true}
        onClose={() => navigate("/")}
      />
    </div>
  );
};

export default StartProject;