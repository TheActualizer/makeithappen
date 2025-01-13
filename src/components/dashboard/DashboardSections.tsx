import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { DashboardStats } from "./DashboardStats";
import { DashboardDocuments } from "./DashboardDocuments";
import { ProjectScope } from "./ProjectScope";
import { ProjectProgress } from "./ProjectProgress";
import { DashboardCalendar } from "./DashboardCalendar";
import { DashboardActivity } from "./DashboardActivity";
import { FinancialMetrics } from "./FinancialMetrics";
import { renderSectionHeader } from "./utils/renderSectionHeader";
import { BarChart, FileText, Activity } from "lucide-react";

interface DashboardSectionsProps {
  isAdmin: boolean;
  activeProjectId?: string;
  handleExpandSection: (section: string) => void;
}

export const DashboardSections = ({ 
  isAdmin, 
  activeProjectId,
  handleExpandSection 
}: DashboardSectionsProps) => {
  return (
    <div className="grid gap-6">
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
            {renderSectionHeader("Overview", <BarChart className="h-5 w-5" />)}
            <ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <DashboardStats isAdmin={isAdmin} />
        </CollapsibleContent>
      </Collapsible>

      {/* Documents Section */}
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
            {renderSectionHeader(
              isAdmin ? "All Documents" : "My Documents",
              <FileText className="h-5 w-5" />
            )}
            <ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <DashboardDocuments isAdmin={isAdmin} />
        </CollapsibleContent>
      </Collapsible>

      {/* Project Progress Section */}
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
            {renderSectionHeader("Project Progress", <Activity className="h-5 w-5" />)}
            <ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <ProjectProgress projectId={activeProjectId} />
        </CollapsibleContent>
      </Collapsible>

      {/* Calendar Section */}
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
            {renderSectionHeader("Calendar", <Calendar className="h-5 w-5" />)}
            <ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <DashboardCalendar />
        </CollapsibleContent>
      </Collapsible>

      {/* Activity Section */}
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
            {renderSectionHeader("Recent Activity", <MessageSquare className="h-5 w-5" />)}
            <ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <DashboardActivity isAdmin={isAdmin} />
        </CollapsibleContent>
      </Collapsible>

      {/* Financial Metrics Section */}
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
            {renderSectionHeader("Financial Metrics", <DollarSign className="h-5 w-5" />)}
            <ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <FinancialMetrics projectId={activeProjectId} />
        </CollapsibleContent>
      </Collapsible>

      {/* Admin Users Section */}
      {isAdmin && (
        <Collapsible>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between w-full p-4 bg-background border rounded-lg hover:bg-accent">
              {renderSectionHeader("User Management", <Users className="h-5 w-5" />)}
              <ChevronDown className="h-4 w-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <Card className="p-6">
              <p className="text-muted-foreground">
                Admin user management features coming soon...
              </p>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};
