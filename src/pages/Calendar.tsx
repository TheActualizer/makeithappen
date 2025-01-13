import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Calendar = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Calendar content will go here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;