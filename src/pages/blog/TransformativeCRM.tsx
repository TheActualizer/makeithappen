import React from 'react';
import { Card } from "@/components/ui/card";

const TransformativeCRM = () => {
  return (
    <article className="prose prose-gray max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Reimagining CRM: AI-Powered Customer Relationship Management
      </h1>
      
      <div className="text-lg text-muted-foreground mb-8">
        Discover how our AI-driven approach transforms traditional CRM systems into intelligent, automated powerhouses for business relationships.
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          The Evolution of Customer Relationship Management
        </h2>
        <p>
          Traditional CRM systems have served as the backbone of business relationships for decades. 
          However, with the integration of AI and advanced automation, we're witnessing a paradigm shift 
          in how businesses manage customer relationships, process data, and drive growth.
        </p>
      </Card>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Key Innovations</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Intelligent Data Processing</h3>
            <p>
              Our system leverages the same precision AI technology used in financial analysis to 
              process and analyze customer data. This includes automated document processing, 
              intelligent data extraction, and real-time insights generation.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Automated Workflows</h3>
            <p>
              By integrating with existing business systems and utilizing AI agents, we've created 
              seamless automation workflows that handle everything from lead qualification to 
              customer support ticket routing.
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Advanced Integration Capabilities</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Seamless connection with existing database architectures</li>
            <li>Real-time synchronization with marketing platforms</li>
            <li>Integration with financial systems for complete business insights</li>
            <li>Automated content generation for personalized customer communications</li>
          </ul>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Transformative Features</h2>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Predictive Analytics</h3>
            <p>
              Using our advanced AI models, the system can predict customer behavior, identify potential 
              churn risks, and recommend proactive measures to maintain strong customer relationships.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Automated Customer Journey Mapping</h3>
            <p>
              The system automatically tracks and analyzes customer interactions across all touchpoints, 
              creating detailed journey maps that help businesses understand and optimize the customer 
              experience.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Intelligent Document Management</h3>
            <p>
              Leveraging our document processing capabilities, the system automatically categorizes, 
              extracts, and analyzes information from customer documents, making it instantly 
              accessible and actionable.
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Business Impact</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
            <p>
              Reduce manual data entry by up to 90% while improving data accuracy and consistency 
              across all business processes.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Intelligence</h3>
            <p>
              Gain deeper insights into customer behavior and preferences through AI-powered 
              analytics and prediction models.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Growth</h3>
            <p>
              Drive business growth through improved customer satisfaction, retention, and 
              targeted expansion strategies.
            </p>
          </Card>
        </div>
      </section>

      <Card className="p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Looking Ahead</h2>
        <p>
          As we continue to evolve our AI-powered CRM solution, we're focused on creating even more 
          sophisticated integrations and automated workflows. The future of CRM is not just about 
          managing relationships – it's about creating intelligent, self-optimizing systems that 
          drive business growth while maintaining the human touch that customers value.
        </p>
      </Card>
    </article>
  );
};

export default TransformativeCRM;