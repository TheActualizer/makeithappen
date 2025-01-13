import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";

export const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Recovery email sent",
        description: "Please check your inbox for the password reset link.",
      });
    } catch (error) {
      console.error("Password recovery error:", error);
      toast({
        title: "Error",
        description: "Failed to send recovery email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-6 max-w-md mx-auto text-center">
        <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold mb-4">Check Your Email</h2>
        <p className="text-muted-foreground mb-4">
          We've sent a password recovery link to {email}. Please check your inbox
          and follow the instructions to reset your password.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="w-full"
        >
          Send another email
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold">Forgot Password?</h2>
        <p className="text-muted-foreground">
          Enter your email address to receive a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Recovery Link"}
        </Button>
      </form>
    </Card>
  );
};