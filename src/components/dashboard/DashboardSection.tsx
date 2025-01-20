import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface DashboardSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onExpand?: () => void;
}

export const DashboardSection = ({ title, icon, children, onExpand }: DashboardSectionProps) => {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              {icon}
              {title}
            </h2>
            {onExpand && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExpand}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};