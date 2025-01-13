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
    console.log("CalendlyEmbed mounted with props:", { url, prefill });
  }, [url, prefill]);

  return (
    <InlineWidget
      url={url}
      prefill={prefill}
      styles={{
        height: '100%',
        width: '100%',
        minHeight: '700px'
      }}
    />
  );
};

export default CalendlyEmbed;