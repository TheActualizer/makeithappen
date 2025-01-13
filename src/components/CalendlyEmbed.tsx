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
        
        // Comprehensive logging of the entire event data structure
        console.log("\n========== CALENDLY EVENT SCHEDULING START ==========");
        console.log("Raw event data:", e);
        console.log("Full event payload:", JSON.stringify(eventData, null, 2));
        console.log("Event type:", e.data.event);
        console.log("Event URI:", eventData.uri);
        
        // Detailed logging of event details
        console.log("\n========== EVENT DETAILS ==========");
        console.log("Event:", {
          type: eventData.event?.type,
          start_time: eventData.event?.start_time,
          end_time: eventData.event?.end_time,
          status: eventData.event?.status,
          calendar: eventData.event?.calendar,
          scheduling_method: eventData.event?.scheduling_method,
        });
        
        // Invitee information logging
        console.log("\n========== INVITEE DETAILS ==========");
        console.log("Invitee:", {
          name: eventData.invitee?.name,
          email: eventData.invitee?.email,
          timezone: eventData.invitee?.timezone,
          uuid: eventData.invitee?.uuid,
          text_reminder_number: eventData.invitee?.text_reminder_number,
          cancel_url: eventData.invitee?.cancel_url,
          reschedule_url: eventData.invitee?.reschedule_url,
        });
        
        // Detailed location/Zoom link extraction logging
        console.log("\n========== LOCATION/ZOOM DETAILS ==========");
        let zoomLink = null;
        
        if (eventData.event && eventData.event.location) {
          const location = eventData.event.location;
          console.log("Raw location data:", location);
          console.log("Location data type:", typeof location);
          console.log("Location stringified:", JSON.stringify(location, null, 2));
          
          if (typeof location === 'string') {
            console.log("Location is a string:", location);
            if (location.includes('zoom.us')) {
              console.log("Direct Zoom URL found in string location");
              zoomLink = location;
            }
          } else if (typeof location === 'object') {
            console.log("Location is an object, checking properties:", Object.keys(location));
            
            // Case 1: Direct join_url
            if (location.join_url) {
              console.log("Found join_url directly in location object:", location.join_url);
              zoomLink = location.join_url;
            }
            
            // Case 2: Nested in data object
            if (location.data) {
              console.log("Found data object in location:", location.data);
              if (location.data.join_url) {
                console.log("Found join_url in data object:", location.data.join_url);
                zoomLink = location.data.join_url;
              }
            }
            
            // Case 3: In settings
            if (location.settings) {
              console.log("Found settings object:", location.settings);
              if (location.settings.global_join_url) {
                console.log("Found global_join_url in settings:", location.settings.global_join_url);
                zoomLink = location.settings.global_join_url;
              }
            }
            
            // Additional Zoom-related properties
            if (location.data?.host_url) {
              console.log("Host URL found:", location.data.host_url);
            }
            if (location.data?.id) {
              console.log("Zoom Meeting ID found:", location.data.id);
            }
            
            // Log all nested properties
            console.log("All nested location properties:");
            const logNestedProperties = (obj: any, prefix = '') => {
              for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                  console.log(`${prefix}${key}: [Object]`);
                  logNestedProperties(obj[key], `${prefix}  `);
                } else {
                  console.log(`${prefix}${key}: ${obj[key]}`);
                }
              }
            };
            logNestedProperties(location);
          }
        } else {
          console.warn("No location data found in event");
        }
        
        // Final Zoom link status
        console.log("\n========== FINAL ZOOM LINK STATUS ==========");
        console.log("Extracted Zoom link:", zoomLink);
        if (!zoomLink) {
          console.warn("No Zoom link could be extracted from any known location");
        }
        
        // Additional event metadata logging
        console.log("\n========== ADDITIONAL METADATA ==========");
        console.log("Tracking:", eventData.tracking);
        console.log("Questions and Answers:", {
          customAnswers: prefill?.customAnswers,
          eventQuestions: eventData.questions_and_answers,
        });
        
        // Prepare email notification data
        const emailData = {
          name: eventData.invitee.name,
          email: eventData.invitee.email,
          consultationDate: new Date(eventData.event.start_time).toLocaleDateString(),
          consultationTime: new Date(eventData.event.start_time).toLocaleTimeString(),
          projectType: prefill?.customAnswers?.a1 || "Not specified",
          description: prefill?.customAnswers?.a3 || "No description provided",
          zoomLink: zoomLink || "Will be provided in the Calendly confirmation email",
          eventUri: eventData.uri
        };
        
        // Send webhook to our edge function
        console.log("\n========== SENDING EMAIL NOTIFICATION ==========");
        console.log("Email notification data being sent:", emailData);
        
        fetch("/functions/send-consultation-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }).then(async response => {
          console.log("Email notification response status:", response.status);
          console.log("Email notification response headers:", Object.fromEntries(response.headers.entries()));
          
          try {
            const responseData = await response.json();
            console.log("Email notification response data:", responseData);
            
            if (!response.ok) {
              console.error("Email notification failed:", responseData);
            } else {
              console.log("Email notification sent successfully:", responseData);
            }
          } catch (error) {
            console.error("Error parsing email notification response:", error);
          }
        }).catch(error => {
          console.error("Error sending email notification:", error);
          console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
          });
        });
        
        console.log("========== CALENDLY EVENT SCHEDULING END ==========\n");
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