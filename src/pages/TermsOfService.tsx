import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/90">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">2. Use License</h2>
                <p>
                  Permission is granted to temporarily access the materials (information or software) on MakeITHappen's website for personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
                <p>
                  The materials on MakeITHappen's website are provided on an 'as is' basis. MakeITHappen makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">4. Limitations</h2>
                <p>
                  In no event shall MakeITHappen or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MakeITHappen's website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">5. Accuracy of Materials</h2>
                <p>
                  The materials appearing on MakeITHappen's website could include technical, typographical, or photographic errors. MakeITHappen does not warrant that any of the materials on its website are accurate, complete, or current.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">6. Links</h2>
                <p>
                  MakeITHappen has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MakeITHappen of the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">7. Modifications</h2>
                <p>
                  MakeITHappen may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">8. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;