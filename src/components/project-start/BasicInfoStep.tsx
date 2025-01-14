import { Input } from "@/components/ui/input";
import { FormData } from "./types";
import { UserCircle, Crown } from "lucide-react";

interface BasicInfoStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const BasicInfoStep = ({ formData, setFormData }: BasicInfoStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-full">
        <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 relative group">
          <Crown className="w-7 h-7 text-primary animate-pulse" />
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient relative">
            Personal Information
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </h3>
      </div>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
          Full Name *
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="John Doe"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email *
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="john@example.com"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          placeholder="+1 (555) 000-0000"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium">
          Company Name
        </label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          placeholder="Company Inc."
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;