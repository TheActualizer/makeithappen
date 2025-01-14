import { motion } from "framer-motion";

interface ContactFormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const ContactFormProgress = ({ currentStep, totalSteps }: ContactFormProgressProps) => {
  return (
    <div className="flex justify-between mb-8">
      {[...Array(totalSteps)].map((_, index) => (
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
  );
};