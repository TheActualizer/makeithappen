import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategoryIcon } from "@/utils/blogUtils";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface CategoryGridProps {
  categories: Category[];
  categoryDetails: Record<string, string>;
}

const CategoryGrid = memo(({ categories, categoryDetails }: CategoryGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="bg-gradient-to-br from-accent/95 via-primary/10 to-secondary/20 backdrop-blur-sm border-secondary/20 hover:border-primary/50 transition-all duration-300">
            <Accordion type="single" collapsible>
              <AccordionItem value={category.slug} className="border-none">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex flex-col items-center text-center w-full">
                    <div className="mb-4">
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 text-center">
                    <p className="text-gray-300">
                      {categoryDetails[category.slug] || category.description}
                    </p>
                    <Button
                      variant="secondary"
                      className="w-full md:w-auto group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300"
                      onClick={() => navigate(`/blog/category/${category.slug}`)}
                    >
                      Explore {category.name}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </motion.div>
      ))}
    </div>
  );
});

CategoryGrid.displayName = "CategoryGrid";
export default CategoryGrid;