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
        <h3 className="flex items-center gap-3 text-xl font-semibold mb-6 text-[#001e00]">
          <UserCircle className="w-6 h-6 text-[#108a00]" />
          Personal Information
        </h3>
      </div>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-[#001e00]">
          Full Name *
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="John Doe"
          className="border-[#e4ebe4] focus:border-[#108a00] focus:ring-[#108a00]/10"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-[#001e00]">
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
          className="border-[#e4ebe4] focus:border-[#108a00] focus:ring-[#108a00]/10"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-[#001e00]">
          Phone Number
        </label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          placeholder="+1 (555) 000-0000"
          className="border-[#e4ebe4] focus:border-[#108a00] focus:ring-[#108a00]/10"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-[#001e00]">
          Company Name
        </label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          placeholder="Company Inc."
          className="border-[#e4ebe4] focus:border-[#108a00] focus:ring-[#108a00]/10"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;