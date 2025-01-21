import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useContactForm } from "./useContactForm";
import { ContactFormFields } from "./ContactFormFields";
import { toast } from "sonner";

export const ContactForm = () => {
  const { form, isSubmitting, onSubmit } = useContactForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-accent/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-primary/5"
      >
        <div className="space-y-4">
          <ContactFormFields form={form} isSubmitting={isSubmitting} />
        </div>

        <Button
          type="submit"
          className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
};