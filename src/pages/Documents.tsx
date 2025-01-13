import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Documents = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Documents content will go here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;