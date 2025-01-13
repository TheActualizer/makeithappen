import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar Overview</h2>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </Card>
  );
};