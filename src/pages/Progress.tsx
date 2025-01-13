import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Progress = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Progress content will go here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;