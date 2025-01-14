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
    const fieldsToValidate = formSteps[currentStep];
    const isValid = await form.trigger(fieldsToValidate as any[]);
    
    if (isValid && currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("ContactForm: Starting submission with values:", values);
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          project_type: values.projectType,
          message: values.message,
        });

      if (error) {
        console.error("ContactForm: Submission error:", error);
        throw error;
      }

      console.log("ContactForm: Submission successful");
      toast.success("Message sent successfully!");
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("ContactForm: Error in form submission:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
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