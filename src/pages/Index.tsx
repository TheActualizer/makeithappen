import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import CalendarDemo from "@/components/CalendarDemo";

const Index = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <Hero />
      <ServicesShowcase />
      <CalendarDemo />
    </div>
  );
};

export default Index;