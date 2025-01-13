import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DocumentPreviewDialogProps {
  url: string | null;
  onClose: () => void;
}

export const DocumentPreviewDialog = ({ url, onClose }: DocumentPreviewDialogProps) => {
  console.log("Preview URL:", url);
  
  return (
    <Dialog open={!!url} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Document Preview</DialogTitle>
        </DialogHeader>
        {url && (
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Document Preview"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};