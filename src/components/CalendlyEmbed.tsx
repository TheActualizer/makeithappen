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