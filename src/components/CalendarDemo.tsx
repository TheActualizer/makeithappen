import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleBooking = () => {
    if (!date) {
      toast({
        title: "Please select a date",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demo scheduled!",
      description: `Your demo has been scheduled for ${date.toLocaleDateString()}`,
    });
  };

  return (
    <section id="book-demo" className="py-16 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Schedule a Demo
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience firsthand how our AI-powered solutions and database
            architecture can transform your business operations.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <CalendarDays className="h-5 w-5 text-secondary" />
              Select Your Preferred Date
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <Clock className="h-5 w-5 text-secondary" />
                Available Time Slots
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"].map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Time selected",
                        description: `Selected time slot: ${time}`,
                      });
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleBooking}
                disabled={!date}
              >
                Book Your Demo
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                A confirmation email will be sent to you with meeting details.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CalendarDemo;