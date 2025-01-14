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
        <section className="pt-32 pb-16 px-4 relative">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete Business Automation Solutions
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Transform your business with our comprehensive suite of AI-powered automation solutions.
              From digital workforce to departmental setups, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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