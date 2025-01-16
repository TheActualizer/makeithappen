import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesShowcase from "@/components/ServicesShowcase";
import DifyChat from "@/components/chat/DifyChat";
import SkipToContent from "@/components/SkipToContent";
import ZoomConnect from "@/components/ZoomConnect";
import { ProfileMetadata } from "@/components/profile/ProfileMetadata";
import { InfrastructureMetrics } from "@/components/dashboard/InfrastructureMetrics";
import { Activity, Cloud, Database, Shield, Command, Grid3X3, Users, Settings } from "lucide-react";

  const systemStats = [
    {
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      label: "System Status",
      value: "All Systems Operational",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    },
    {
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      label: "Cloud Resources",
      value: "24 Active Instances",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: <Database className="w-5 h-5 text-purple-400" />,
      label: "Data Processing",
      value: "1.2TB Processed",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const navigationItems = [
    { icon: <Command className="w-5 h-5" />, label: "Command Center" },
    { icon: <Grid3X3 className="w-5 h-5" />, label: "System Analysis" },
    { icon: <Users className="w-5 h-5" />, label: "Agent Coordination" },
    { icon: <Shield className="w-5 h-5" />, label: "Security" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings" }
  ];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-accent/95 to-primary/20">
      <SkipToContent />
      <Navbar />
      
      <main id="main-content" tabIndex={-1}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="flex justify-end mb-4">
            <ZoomConnect />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {systemStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${stat.borderColor} ${stat.bgColor} backdrop-blur-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">{stat.label}</h3>
                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-8">
            <InfrastructureMetrics />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded-xl border border-accent/20 bg-accent/10 backdrop-blur-lg h-[600px]"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Shared Interface</h2>
                <div className="flex gap-4 mb-6">
                  {["Stop Sharing", "Video Call", "Voice Chat", "Screen Record"].map((action, index) => (
                    <motion.button
                      key={action}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium text-white transition-colors"
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
                <div className="w-full h-[500px] rounded-lg bg-accent/20 border border-accent/10">
                  <ProfileMetadata />
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <Suspense fallback={
                <div className="w-full h-64 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                  />
                </div>
              }>
                <ServicesShowcase />
              </Suspense>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 p-4 rounded-xl bg-accent/10 backdrop-blur-lg border border-accent/20"
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <DifyChat />
    </div>
  );
};

export default Index;
