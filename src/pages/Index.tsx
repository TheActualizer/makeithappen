import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import CalendarDemo from "@/components/CalendarDemo";
import ChatInterface from "@/components/chat/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <Navbar />
      <main className="relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        {/* Main content */}
        <div className="relative">
          <Hero />
          <ServicesShowcase />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="my-20 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                Schedule a consultation and let's discuss how we can leverage AI to revolutionize your operations.
              </p>
            </div>
            <div className="bg-accent/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-20 border border-accent/20">
              <CalendarDemo />
            </div>
          </div>
        </div>
      </main>
      <ChatInterface />
    </div>
  );
};

export default Index;