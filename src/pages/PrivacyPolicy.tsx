import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/90">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
                <h3 className="text-xl font-medium mt-4">1.1 Personal Information</h3>
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Name and contact information</li>
                  <li>Email address</li>
                  <li>Phone number (when provided)</li>
                  <li>Company information (if applicable)</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                </ul>

                <h3 className="text-xl font-medium mt-4">1.2 Automatically Collected Information</h3>
                <p>
                  When you use our services, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
                <p>We use the collected information for various purposes, including:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Providing and maintaining our services</li>
                  <li>Processing your transactions</li>
                  <li>Sending you important updates and notifications</li>
                  <li>Improving our services and user experience</li>
                  <li>Complying with legal obligations</li>
                  <li>Detecting and preventing fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">3. Information Sharing</h2>
                <p>
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Service providers and business partners</li>
                  <li>Legal authorities when required by law</li>
                  <li>Third-party analytics providers</li>
                  <li>Payment processors for transaction processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">7. Children's Privacy</h2>
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">8. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Email: privacy@makeithappen.com</li>
                  <li>Address: [Your Business Address]</li>
                </ul>
              </section>

              <p className="text-sm text-gray-500 mt-8">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;