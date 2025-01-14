import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { ContactFormProgress } from "./ContactFormProgress";
import { ContactFormStep } from "./ContactFormStep";
import { ContactFormFields } from "./ContactFormFields";
import { useContactForm } from "./useContactForm";

export const ContactForm = () => {
  const {
    form,
    isSubmitting,
    currentStep,
    currentFields,
    isLastStep,
    nextStep,
    prevStep,
    onSubmit,
    formSteps,
  } = useContactForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-accent/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
      >
        <ContactFormProgress currentStep={currentStep} totalSteps={formSteps.length} />

        <ContactFormStep currentStep={currentStep}>
          <ContactFormFields
            form={form}
            currentFields={currentFields}
            isSubmitting={isSubmitting}
          />
        </ContactFormStep>

        <div className="flex justify-between gap-4 pt-4">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="w-full"
              disabled={isSubmitting}
            >
              Previous
            </Button>
          )}

          {!isLastStep ? (
            <Button
              type="button"
              onClick={nextStep}
              className="w-full"
              disabled={isSubmitting}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
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
          )}
        </div>
      </form>
    </Form>
  );
};