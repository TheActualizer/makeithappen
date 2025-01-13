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
        
        // Enhanced Zoom link extraction with detailed logging
        let zoomLink = null;
        
        if (eventData.event && eventData.event.location) {
          console.log("Location data type:", typeof eventData.event.location);
          console.log("Location data:", eventData.event.location);
          
          const location = eventData.event.location;
          
          // Case 1: Direct Zoom URL
          if (typeof location === 'string' && location.includes('zoom.us')) {
            console.log("Found direct Zoom URL");
            zoomLink = location;
          }
          // Case 2: Location object with join_url
          else if (typeof location === 'object') {
            if (location.join_url) {
              console.log("Found join_url in location object");
              zoomLink = location.join_url;
            }
            // Case 3: Nested data structure
            else if (location.data) {
              console.log("Found data object in location");
              const data = location.data;
              if (data.join_url) {
                console.log("Found join_url in data object");
                zoomLink = data.join_url;
              }
            }
            // Case 4: Status and other fields
            else if (location.status === 'confirmed' && location.settings) {
              console.log("Found confirmed status with settings");
              if (location.settings.global_join_url) {
                zoomLink = location.settings.global_join_url;
              }
            }
          }
        }

        // Additional logging
        console.log("Final extracted Zoom link:", zoomLink);
        
        if (!zoomLink) {
          console.warn("No Zoom link found in the event data");
        }

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
            zoomLink: zoomLink || "Will be provided in the Calendly confirmation email",
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