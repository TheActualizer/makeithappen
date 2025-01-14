import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.enum(["healthcare", "financial", "realestate", "other"]),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .refine(
      (val) => {
        const trimmed = val.trim();
        return trimmed !== '' && !trimmed.split('').every(char => char === ',');
      },
      "Message cannot be empty or contain only commas"
    ),
});

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "other",
      message: "",
    },
  });

  const formSteps = [
    ["name", "email", "phone"],
    ["projectType"],
    ["message"],
  ];

  const currentFields = formSteps[currentStep];
  const isLastStep = currentStep === formSteps.length - 1;

  const nextStep = async () => {
    console.log("ContactForm: Attempting to move to next step", { currentStep, fieldsToValidate: formSteps[currentStep] });
    const fieldsToValidate = formSteps[currentStep];
    const isValid = await form.trigger(fieldsToValidate as any[]);
    
    if (isValid && currentStep < formSteps.length - 1) {
      console.log("ContactForm: Step validation successful, moving to next step");
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("ContactForm: Step validation failed or last step reached", { isValid, currentStep });
    }
  };

  const prevStep = () => {
    console.log("ContactForm: Moving to previous step", { currentStep });
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("ContactForm: Starting form submission with values:", values);
    setIsSubmitting(true);
    
    try {
      console.log("ContactForm: Saving contact submission to database...");
      const { error: submissionError, data: submissionData } = await supabase
        .from("contact_submissions")
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          project_type: values.projectType,
          message: values.message,
        })
        .select()
        .single();

      if (submissionError) {
        console.error("ContactForm: Database submission error:", submissionError);
        throw submissionError;
      }

      console.log("ContactForm: Logging initial automation attempt...");
      await supabase
        .from("automation_logs")
        .insert({
          contact_submission_id: submissionData.id,
          stage: "initial_submission",
          status: "success",
          metadata: {
            form_data: values
          }
        });

      console.log("ContactForm: Triggering CRM automation...");
      const { error: automationError, data: automationData } = await supabase.functions.invoke('crm-email-automation', {
        body: {
          ...values,
          id: submissionData.id
        }
      });

      if (automationError) {
        console.error("ContactForm: CRM automation error:", automationError);
        
        await supabase
          .from("automation_logs")
          .insert({
            contact_submission_id: submissionData.id,
            stage: "crm_automation",
            status: "error",
            error_message: automationError.message,
            error_context: { error: automationError }
          });

        await supabase
          .from("automation_retry_queue")
          .insert({
            contact_submission_id: submissionData.id,
            stage: "crm_automation",
            payload: {
              ...values,
              id: submissionData.id
            }
          });

        await supabase
          .from("contact_submissions")
          .update({
            automation_status: "failed",
            last_error: automationError.message
          })
          .eq("id", submissionData.id);

        toast.error("Message saved but notification failed to send. Our team will still be in touch shortly.");
      } else {
        console.log("ContactForm: CRM automation completed successfully", automationData);
        
        await supabase
          .from("automation_logs")
          .insert({
            contact_submission_id: submissionData.id,
            stage: "crm_automation",
            status: "success",
            metadata: { automation_response: automationData }
          });

        await supabase
          .from("contact_submissions")
          .update({
            automation_status: "completed",
            processed_at: new Date().toISOString()
          })
          .eq("id", submissionData.id);

        toast.success("Message sent successfully!");
      }

      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("ContactForm: Error in form submission:", error);
      toast.error(
        "Failed to send message. Please try again or contact support directly."
      );
    } finally {
      console.log("ContactForm: Submission process completed");
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    currentStep,
    currentFields,
    isLastStep,
    nextStep,
    prevStep,
    onSubmit,
    formSteps,
  };
};