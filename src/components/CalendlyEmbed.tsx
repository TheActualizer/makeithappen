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
        console.log("Full Calendly event data:", eventData);
        console.log("Location data:", eventData.event.location);
        
        // Enhanced Zoom link extraction
        let zoomLink = "Will be provided separately";
        
        if (eventData.event.location) {
          // Check if location is a string containing zoom.us
          if (typeof eventData.event.location === 'string' && eventData.event.location.includes('zoom.us')) {
            zoomLink = eventData.event.location;
          } 
          // Check if location is an object with join_url
          else if (typeof eventData.event.location === 'object' && eventData.event.location.join_url) {
            zoomLink = eventData.event.location.join_url;
          }
          // Check if location is an object with a data property
          else if (typeof eventData.event.location === 'object' && eventData.event.location.data) {
            const locationData = eventData.event.location.data;
            if (locationData.join_url) {
              zoomLink = locationData.join_url;
            }
          }
        }

        console.log("Extracted Zoom link:", zoomLink);
        
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
            zoomLink: zoomLink,
            eventUri: eventData.uri
          }),
        }).then(response => {
          console.log("Email notification response:", response);
        }).catch(error => {
          console.error("Error sending email notification:", error);
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