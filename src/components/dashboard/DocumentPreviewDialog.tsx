import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DocumentPreviewDialogProps {
  url: string | null;
  onClose: () => void;
}

export const DocumentPreviewDialog = ({ url, onClose }: DocumentPreviewDialogProps) => {
  console.log("Preview URL:", url); // Debug log
  
  return (
    <Dialog open={!!url} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Document Preview</DialogTitle>
          <DialogDescription>
            You can scroll through the document below
          </DialogDescription>
        </DialogHeader>
        {url && (
          <div className="flex-1 overflow-hidden rounded-md">
            <iframe
              src={url}
              className="w-full h-[calc(90vh-120px)]"
              title="Document Preview"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};