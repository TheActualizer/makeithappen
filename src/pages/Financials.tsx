import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Financials = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Financials</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Financials content will go here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financials;