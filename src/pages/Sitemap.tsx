import { motion } from "framer-motion";
import { siteMapCategories } from "@/utils/siteMapConfig";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sitemap = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              Complete Site Navigation
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our comprehensive collection of resources, tools, and knowledge bases
            </p>
          </div>

          <ScrollArea className="h-[800px] rounded-lg border border-accent/20 p-6">
            {siteMapCategories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-white">
                    {category.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.pages.map((page) => (
                    <Card
                      key={page.path}
                      className="p-6 bg-accent/10 border-accent/20 hover:bg-accent/20 transition-all"
                    >
                      <Link to={page.path} className="space-y-3">
                        <h3 className="text-lg font-medium text-white">
                          {page.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {page.description}
                        </p>
                        {page.isProtected && (
                          <Badge variant="secondary" className="mt-2">
                            Protected
                          </Badge>
                        )}
                      </Link>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </ScrollArea>
        </motion.div>
      </div>
    </div>
  );
};

export default Sitemap;