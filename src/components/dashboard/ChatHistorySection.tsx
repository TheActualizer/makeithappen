import { Card } from "@/components/ui/card";
import { useMessages } from "@/hooks/useMessages";

export const ChatHistorySection = () => {
  const { messages } = useMessages();

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {messages?.map((message, index) => (
          <div
            key={message.id || index}
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <div className="flex flex-col">
              <span className="font-medium">{message.content}</span>
              <span className="text-sm text-muted-foreground">
                {message.type === 'ai' ? 'AI Assistant' : 'You'}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(message.created_at || '').toLocaleString()}
            </span>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <p className="text-muted-foreground">No chat history available.</p>
        )}
      </div>
    </Card>
  );
};