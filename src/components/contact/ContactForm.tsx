import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useContactForm } from "./useContactForm";
import { ContactFormFields } from "./ContactFormFields";
import { motion } from "framer-motion";

export const ContactForm = () => {
  const { form, isSubmitting, onSubmit } = useContactForm();

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-accent/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-primary/5 gpu"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 25,
            mass: 0.5
          }
        }}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      >
        <div className="space-y-4">
          <ContactFormFields form={form} isSubmitting={isSubmitting} />
        </div>

        <Button
          type="submit"
          className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] gpu"
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
      </motion.form>
    </Form>
  );
};