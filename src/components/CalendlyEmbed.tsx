import { InlineWidget } from "react-calendly";

interface CalendlyEmbedProps {
  url: string;
  styles?: React.CSSProperties;
}

const CalendlyEmbed = ({ url, styles }: CalendlyEmbedProps) => {
  return (
    <div className="w-full h-[700px] bg-accent/40 backdrop-blur-sm rounded-lg border border-accent/20 overflow-hidden">
      <InlineWidget
        url={url}
        styles={{ height: '100%', ...styles }}
      />
    </div>
  );
};

export default CalendlyEmbed;