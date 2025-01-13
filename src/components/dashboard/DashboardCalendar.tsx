import { Card } from "@/components/ui/card";
import CalendlyEmbed from "../CalendlyEmbed";

export const DashboardCalendar = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Schedule a Meeting</h2>
      <div className="h-[600px]">
        <CalendlyEmbed 
          url="https://calendly.com/belchonen18/30min"
        />
      </div>
    </Card>
  );
};