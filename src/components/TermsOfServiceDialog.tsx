import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsOfServiceDialog = ({ open, onOpenChange }: TermsOfServiceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our Terms of Service carefully
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] mt-4 pr-4">
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">1. Acceptance of Terms</h3>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="font-semibold">2. Use License</h3>
            <p>
              Permission is granted to temporarily access the materials (information or software) on MakeITHappen's website for personal, non-commercial transitory viewing only.
            </p>

            <h3 className="font-semibold">3. Disclaimer</h3>
            <p>
              The materials on MakeITHappen's website are provided on an 'as is' basis. MakeITHappen makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3 className="font-semibold">4. Limitations</h3>
            <p>
              In no event shall MakeITHappen or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MakeITHappen's website.
            </p>

            <h3 className="font-semibold">5. Accuracy of Materials</h3>
            <p>
              The materials appearing on MakeITHappen's website could include technical, typographical, or photographic errors. MakeITHappen does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>

            <h3 className="font-semibold">6. Links</h3>
            <p>
              MakeITHappen has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MakeITHappen of the site.
            </p>

            <h3 className="font-semibold">7. Modifications</h3>
            <p>
              MakeITHappen may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h3 className="font-semibold">8. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceDialog;