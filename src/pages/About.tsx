import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProjectStartModal from "@/components/ProjectStartModal";
import { useModal } from "@/hooks/use-modal";
import HeroSection from "@/components/about/HeroSection";
import VisionSection from "@/components/about/VisionSection";
import VideoSection from "@/components/about/VideoSection";
import ValuesSection from "@/components/about/ValuesSection";
import CTASection from "@/components/about/CTASection";

const About = () => {
  const { isOpen, onOpen, onClose } = useModal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <VideoSection />
      <ValuesSection />
      <CTASection onStartProject={onOpen} />
      <ProjectStartModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default About;