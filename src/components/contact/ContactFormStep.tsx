import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContactFormStepProps {
  children: ReactNode;
  currentStep: number;
}

export const ContactFormStep = ({ children, currentStep }: ContactFormStepProps) => {
  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {children}
    </motion.div>
  );
};