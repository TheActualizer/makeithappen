import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Next-Generation Web Scraping: Intelligent Research & Data Collection",
      description: "Explore how AI-powered web scraping is revolutionizing digital research and data collection with intelligent navigation and automated workflows.",
      link: "/blog/intelligent-scraping",
      date: "2024",
      image: "/placeholder.svg"
    },
    {
      title: "Transforming Financial Operations: AI-Powered Accounting Systems",
      description: "Discover how AI is revolutionizing accounting with intelligent document processing and automated workflows.",
      link: "/blog/transformative-accounting",
      date: "2024",
      image: "/placeholder.svg"
    },
    {
      title: "The Future of Content Creation: AI-Powered Social Media",
      description: "Learn how AI is transforming content creation and social media marketing with automated, personalized content generation.",
      link: "/blog/transformative-content",
      date: "2024",
      image: "/placeholder.svg"
    },
    {
      title: "Reimagining CRM: AI-Powered Customer Relationship Management",
      description: "Explore how AI is revolutionizing CRM systems with intelligent automation and predictive analytics.",
      link: "/blog/transformative-crm",
      date: "2024",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <Link to={post.link}>
                    <Button variant="ghost" className="group">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
