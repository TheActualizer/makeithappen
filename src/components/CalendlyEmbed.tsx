import { useEffect, useRef } from "react";
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
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("[CalendlyEmbed] Component mounted with props:", { url, prefill });
  }, [url, prefill]);

  return (
    <div ref={componentRef} className="w-full h-[600px] overflow-hidden">
      <InlineWidget
        url={url}
        prefill={prefill}
        styles={{
          height: '100%',
          width: '100%'
        }}
      />
    </div>
  );
};

export default CalendlyEmbed;