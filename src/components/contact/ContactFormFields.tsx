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

interface ContactFormFieldsProps {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
}

export const ContactFormFields = ({ form, isSubmitting }: ContactFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Your name"
                {...field}
                className="transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your.email@example.com"
                {...field}
                className="transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Phone (Optional)</FormLabel>
            <FormControl>
              <Input
                placeholder="Your phone number"
                {...field}
                className="transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
                <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary">
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

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Message</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your project or inquiry"
                className="min-h-[120px] transition-all duration-300 focus:scale-[1.02] bg-accent/30 border-gray-700 focus:border-primary resize-none"
                {...field}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};