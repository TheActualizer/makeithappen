import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.enum(["healthcare", "financial", "realestate", "other"]),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .refine(
      (val) => val.trim() !== '' && !val.split('').every(char => char === ','),
      "Message cannot be empty or contain only commas"
    ),
});

export const ContactForm = () => {
  console.log("ContactForm: Component initialized");
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

  console.log("ContactForm: Form initialized with default values", form.getValues());

  const formSteps = [
    ["name", "email", "phone"],
    ["projectType"],
    ["message"],
  ];

  const currentFields = formSteps[currentStep];

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

  const isLastStep = currentStep === formSteps.length - 1;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("ContactForm: Starting form submission with values:", values);
    setIsSubmitting(true);
    
    try {
      console.log("ContactForm: Attempting to save submission to Supabase...");
      const { error: submissionError } = await supabase
        .from("contact_submissions")
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          project_type: values.projectType,
          message: values.message,
        });

      if (submissionError) {
        console.error("ContactForm: Supabase submission error:", submissionError);
        throw submissionError;
      }

      console.log("ContactForm: Contact submission saved successfully");

      // Trigger CRM automation
      console.log("ContactForm: Triggering CRM automation...");
      const { error: automationError } = await supabase.functions.invoke('crm-email-automation', {
        body: values
      });

      if (automationError) {
        console.error("ContactForm: CRM automation error:", automationError);
        throw automationError;
      }

      console.log("ContactForm: CRM automation completed successfully");
      toast.success("Message sent successfully!");
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-accent/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
      >
        <div className="flex justify-between mb-8">
          {formSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full flex-1 mx-1 ${
                index <= currentStep ? "bg-secondary" : "bg-gray-600"
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {currentFields.includes("name") && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="transition-all duration-300 focus:scale-[1.02]"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {currentFields.includes("email") && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      className="transition-all duration-300 focus:scale-[1.02]"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {currentFields.includes("phone") && (
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your phone number"
                      {...field}
                      className="transition-all duration-300 focus:scale-[1.02]"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {currentFields.includes("projectType") && (
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-300 focus:scale-[1.02]">
                        <SelectValue placeholder="Select a project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare AI</SelectItem>
                      <SelectItem value="financial">
                        Financial Automation
                      </SelectItem>
                      <SelectItem value="realestate">
                        Real Estate Underwriting
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {currentFields.includes("message") && (
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project or inquiry"
                      className="min-h-[120px] transition-all duration-300 focus:scale-[1.02]"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </motion.div>

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