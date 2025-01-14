import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, CheckCircle2 } from "lucide-react";

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
      
      // Enhanced success toast with animation
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-in fade-in-50 zoom-in-95' : 'animate-out fade-out-50 zoom-out-95'} 
          max-w-md w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 
          text-white rounded-lg shadow-lg p-6 flex items-center gap-4
          transform transition-all duration-500 ease-out`}
        >
          <div className="flex-shrink-0 relative">
            <CheckCircle2 className="w-8 h-8 animate-pulse" />
            <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 animate-fade-in">
              Message Sent Successfully! ✨
            </h3>
            <p className="text-sm opacity-90">
              Thank you for reaching out. We'll get back to you soon!
            </p>
          </div>
        </div>
      ), {
        duration: 4000,
      });
      
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