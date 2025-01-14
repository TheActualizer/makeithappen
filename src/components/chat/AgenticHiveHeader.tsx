import { Network, HelpCircle, Settings2, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const AgenticHiveHeader = () => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-500/20 shadow-lg">
          <Network className="w-5 h-5 text-purple-100" />
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-medium text-white/95 tracking-tight">Agentic Hive Interface</span>
          <span className="text-xs text-purple-200/70 font-light">Enterprise-Grade AI Orchestration</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-purple-900/90 backdrop-blur-lg border-white/10 text-purple-100">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Partnership & Integration Hub</h4>
              <div className="text-xs space-y-2">
                <p>Connect to our enterprise ecosystem powered by:</p>
                <ul className="list-disc list-inside space-y-1 text-purple-200/70">
                  <li>Multi-agent swarm intelligence</li>
                  <li>Custom business automation</li>
                  <li>White-label solutions</li>
                  <li>Franchise opportunities</li>
                </ul>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-white/10 text-purple-200/80 transition-colors duration-300"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[480px] bg-purple-900/90 backdrop-blur-lg border-white/10 text-purple-100">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-sm mb-3">Enterprise Resources</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 border-r border-white/10 pr-4">
                    <h5 className="text-xs font-medium text-purple-200">Infrastructure</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Multi-Agent Orchestration</span>
                        <span className="text-yellow-400">Pending</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Business Process Engine</span>
                        <span className="text-yellow-400">Pending</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>White-Label Dashboard</span>
                        <span className="text-yellow-400">Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pl-4">
                    <h5 className="text-xs font-medium text-purple-200">Integration Status</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>API Gateway</span>
                        <span className="text-yellow-400">Pending</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Custom Workflows</span>
                        <span className="text-yellow-400">Pending</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Data Pipeline</span>
                        <span className="text-yellow-400">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-3">Partnership Resources</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs p-2 bg-white/5 rounded-lg">
                    <span>Business Model Templates</span>
                    <span className="text-xs text-purple-200/70">Available</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-white/5 rounded-lg">
                    <span>Franchise Documentation</span>
                    <span className="text-xs text-purple-200/70">Available</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-white/5 rounded-lg">
                    <span>Integration Guides</span>
                    <span className="text-xs text-purple-200/70">Available</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-purple-200/50 pt-2">
                <p>Schedule a consultation to discuss partnership opportunities and custom solutions</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AgenticHiveHeader;