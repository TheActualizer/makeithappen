import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Messages = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Messages content will go here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;