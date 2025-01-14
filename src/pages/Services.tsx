import { ServicesShowcase } from "@/components/ServicesShowcase";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      <main className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl animate-pulse opacity-20" />
          </div>

          <div className="max-w-6xl mx-auto text-center relative">
            {/* Floating images */}
            <div className="hidden lg:block absolute -left-4 top-0 animate-float">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&h=400"
                alt="AI Automation"
                className="w-64 h-80 object-cover rounded-2xl opacity-60 transform -rotate-6"
              />
            </div>
            <div className="hidden lg:block absolute -right-4 top-20 animate-float delay-200">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=300&h=400"
                alt="Enterprise Solutions"
                className="w-64 h-80 object-cover rounded-2xl opacity-60 transform rotate-6"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Autonomous Enterprise Websites
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in delay-100">
              Experience the future of web development with our AI-powered autonomous solutions. 
              We create intelligent, self-managing websites that adapt and scale with your enterprise.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-200">
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate("/start-project")}
                className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contact")}
                className="border-gray-300 text-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <ServicesShowcase />
      </main>
    </div>
  );
};

export default Services;