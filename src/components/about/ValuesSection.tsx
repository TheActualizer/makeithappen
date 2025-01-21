import { Brain, Shield, Rocket } from "lucide-react";
import { useMemo } from "react";

const ValuesSection = () => {
  const values = useMemo(() => [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Innovation",
      description: "Pushing boundaries with AI-driven solutions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      description: "Building trust through transparency and security"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Impact",
      description: "Creating meaningful change through technology"
    }
  ], []);

  return (
    <section className="py-16 px-4 bg-accent/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-background/50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-background/60"
            >
              <div className="mb-4 inline-block p-3 bg-primary/20 rounded-full">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;