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
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.enum(["healthcare", "financial", "realestate", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form to Supabase:", values);
      
      // First, save to contact_submissions
      const { error: submissionError } = await supabase.from("contact_submissions").insert({
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        project_type: values.projectType,
        message: values.message,
      });

      if (submissionError) {
        console.error("Supabase submission error:", submissionError);
        throw submissionError;
      }

      // Create a conversation for this contact
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          title: `Contact from ${values.name}`,
          provider: 'dify',
        })
        .select()
        .single();

      if (conversationError) {
        console.error("Error creating conversation:", conversationError);
        throw conversationError;
      }

      // Add the message to the conversation
      const { data: message, error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          content: values.message,
          type: 'text',
        })
        .select()
        .single();

      if (messageError) {
        console.error("Error creating message:", messageError);
        throw messageError;
      }

      // Trigger the notification edge function
      const { error: notificationError } = await supabase.functions.invoke('notify-admin', {
        body: {
          message: values.message,
          userId: message.sender_id,
          conversationId: conversation.id,
        },
      });

      if (notificationError) {
        console.error("Error sending notification:", notificationError);
        throw notificationError;
      }

      toast.success("Message sent successfully! We'll be in touch soon.");
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSteps = [
    ["name", "email", "phone"],
    ["projectType"],
    ["message"],
  ];

  const currentFields = formSteps[currentStep];

  const nextStep = () => {
    const fieldsToValidate = formSteps[currentStep];
    form.trigger(fieldsToValidate as any[]).then((isValid) => {
      if (isValid) {
        setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
      }
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === formSteps.length - 1;

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Let's Innovate Together
            </h1>
            <p className="text-gray-300">
              Reach out to start your rapid transformation journey
            </p>
          </div>

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
                      index <= currentStep ? 'bg-secondary' : 'bg-gray-600'
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
                  >
                    Previous
                  </Button>
                )}
                
                {!isLastStep ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full"
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
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;