import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface ContactFormFieldsProps {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
}

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.5,
      delay: i * 0.1,
    },
  }),
};

export const ContactFormFields = ({ form, isSubmitting }: ContactFormFieldsProps) => {
  return (
    <>
      {[
        {
          name: "name",
          label: "Name",
          placeholder: "Your name",
          type: "text",
        },
        {
          name: "email",
          label: "Email",
          placeholder: "your.email@example.com",
          type: "email",
        },
        {
          name: "phone",
          label: "Phone (Optional)",
          placeholder: "Your phone number",
          type: "text",
        },
      ].map((field, index) => (
        <motion.div
          key={field.name}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          className="gpu"
        >
          <FormField
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-gray-200">{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                    className="transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary gpu"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      ))}

      <motion.div
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        className="gpu"
      >
        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Project Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary gpu">
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-accent border-gray-700">
                  <SelectItem value="healthcare">Healthcare AI</SelectItem>
                  <SelectItem value="financial">Financial Automation</SelectItem>
                  <SelectItem value="realestate">Real Estate Underwriting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        custom={4}
        className="gpu"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project or inquiry"
                  className="min-h-[120px] transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary resize-none gpu"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </>
  );
};