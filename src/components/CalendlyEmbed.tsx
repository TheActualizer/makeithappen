import { useEffect } from "react";
import { InlineWidget } from "react-calendly";

interface PrefillData {
  name?: string;
  email?: string;
  customAnswers?: {
    [key: string]: string;
  };
}

interface CalendlyEmbedProps {
  url: string;
  prefill?: PrefillData;
}

const CalendlyEmbed = ({ url, prefill }: CalendlyEmbedProps) => {
  useEffect(() => {
    // Add Calendly event listener
    const handleCalendlyEvent = (e: any) => {
      if (e.data.event === "calendly.event_scheduled") {
        const eventData = e.data.payload;
        console.log("Calendly event scheduled:", eventData);
        
        // Send webhook to our edge function
        fetch("/functions/send-consultation-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: eventData.invitee.name,
            email: eventData.invitee.email,
            consultationDate: new Date(eventData.event.start_time).toLocaleDateString(),
            consultationTime: new Date(eventData.event.start_time).toLocaleTimeString(),
            projectType: prefill?.customAnswers?.a1 || "Not specified",
            description: prefill?.customAnswers?.a3 || "No description provided",
            zoomLink: eventData.event.location?.join_url || "Will be provided separately"
          }),
        });
      }
    };

    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, [prefill]);

  return (
    <InlineWidget
      url={url}
      prefill={prefill}
      styles={{
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default CalendlyEmbed;