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
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("ContactForm: Starting submission with values:", values);
    setIsSubmitting(true);
    
    try {
      console.log("ContactForm: Attempting to insert into contact_submissions table...");
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

      console.log("ContactForm: Submission successful, triggering webhook...");
      
      // Trigger the webhook function
      const { error: webhookError, data: webhookData } = await supabase.functions.invoke('contact-webhook', {
        body: { 
          name: values.name,
          email: values.email,
          phone: values.phone,
          project_type: values.projectType,
          message: values.message
        }
      });
      
      if (webhookError) {
        console.error("ContactForm: Webhook error:", webhookError);
        throw webhookError;
      }

      console.log("ContactForm: Process completed successfully");
      toast.success("Message sent successfully!");
      form.reset();
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
    onSubmit,
  };
};