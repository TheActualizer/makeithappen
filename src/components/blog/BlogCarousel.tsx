import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

const BlogCarousel = memo(({ items }: { items: CarouselItem[] }) => {
  return (
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent className="-ml-2 md:-ml-4">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden bg-gradient-to-br from-accent/95 via-primary/10 to-secondary/20 backdrop-blur-sm border-secondary/20 h-full">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading={index <= 2 ? "eager" : "lazy"}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm md:text-base">{item.description}</p>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12 bg-secondary/20 hover:bg-secondary/30 border-secondary/30" />
      <CarouselNext className="hidden md:flex -right-12 bg-secondary/20 hover:bg-secondary/30 border-secondary/30" />
    </Carousel>
  );
});

BlogCarousel.displayName = "BlogCarousel";
export default BlogCarousel;