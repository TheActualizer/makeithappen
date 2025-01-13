import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Lock, Cloud } from "lucide-react";

const HealthcareTech = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl"
      >
        <h1 className="text-4xl font-bold mb-8 text-white">Modernizing Healthcare with FHIR & AI</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              Understanding FHIR Protocols
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Fast Healthcare Interoperability Resources (FHIR) is a standard for healthcare data exchange 
              that enables seamless integration between different healthcare systems. This protocol 
              facilitates secure, standardized communication while maintaining compliance with healthcare 
              regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              HIPAA Compliance & Modern AI
            </h2>
            <p className="text-gray-300 leading-relaxed">
              By leveraging open-source tools and secure infrastructure, healthcare organizations can now 
              implement cutting-edge AI solutions while maintaining HIPAA compliance. Key considerations include:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
              <li>Self-hosted AI models for data privacy</li>
              <li>Business Associate Agreements (BAA) with cloud providers</li>
              <li>End-to-end encryption for data transmission</li>
              <li>Audit trails and access controls</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              Security & Implementation
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Modern healthcare technology implementations require robust security measures:
            </p>
            <div className="bg-accent/30 p-6 rounded-lg space-y-4">
              <h4 className="text-lg font-semibold text-white">Security Framework</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>PHI encryption at rest and in transit</li>
                <li>Role-based access control (RBAC)</li>
                <li>Regular security audits</li>
                <li>Secure API endpoints</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
              <Cloud className="h-6 w-6 text-primary" />
              The Future of Healthcare Tech
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Healthcare organizations can now leverage advanced AI capabilities through:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
              <li>Self-hosted large language models</li>
              <li>HIPAA-compliant cloud services</li>
              <li>Secure API integrations</li>
              <li>Real-time data processing with privacy guarantees</li>
            </ul>
          </section>

          <section className="bg-accent/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-white">Impact on Healthcare</h3>
            <p className="text-gray-300 leading-relaxed">
              By embracing modern technology while maintaining compliance, healthcare providers can 
              significantly improve patient care, operational efficiency, and data-driven decision-making. 
              This technological transformation positions healthcare at the forefront of the AI revolution 
              while ensuring patient privacy and data security.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthcareTech;