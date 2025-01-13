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
    console.log("[CalendlyEmbed] Container dimensions:", {
      height: componentRef.current?.clientHeight,
      width: componentRef.current?.clientWidth
    });
  }, [url, prefill]);

  return (
    <div ref={componentRef} className="h-[700px]">
      <InlineWidget
        url={url}
        prefill={prefill}
        styles={{
          height: '100%',
          width: '100%',
          minHeight: '700px'
        }}
      />
    </div>
  );
};

export default CalendlyEmbed;