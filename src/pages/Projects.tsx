import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Projects content will go here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;