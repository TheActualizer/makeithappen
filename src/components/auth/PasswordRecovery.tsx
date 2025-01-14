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
    console.log("[PasswordRecovery] Initiating password recovery for email:", email);
    console.log("[PasswordRecovery] Current origin:", window.location.origin);

    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      console.log("[PasswordRecovery] Redirect URL:", redirectUrl);

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      console.log("[PasswordRecovery] Reset password response:", { data, error });

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Recovery email sent",
        description: "Please check your inbox for the password reset link.",
      });
    } catch (error: any) {
      console.error("[PasswordRecovery] Error details:", {
        message: error.message,
        status: error.status,
        name: error.name,
        stack: error.stack,
      });
      
      toast({
        title: "Error",
        description: error.message || "Failed to send recovery email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 max-w-md mx-auto backdrop-blur-md bg-background/30 border border-border/10 shadow-2xl">
        <Lock className="w-12 h-12 mx-auto mb-6 text-primary animate-float" />
        <h2 className="text-2xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Check Your Email
        </h2>
        <p className="text-muted-foreground mb-6 text-center">
          We've sent a password recovery link to {email}. Please check your inbox
          and follow the instructions to reset your password.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="w-full bg-background/50 hover:bg-background/70 transition-all duration-200"
        >
          Send another email
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 max-w-md mx-auto backdrop-blur-md bg-background/30 border border-border/10 shadow-2xl">
      <div className="text-center mb-8">
        <Lock className="w-12 h-12 mx-auto mb-6 text-primary animate-float" />
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Forgot Password?
        </h2>
        <p className="text-muted-foreground mt-2">
          Enter your email address to receive a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-background/50 backdrop-blur-sm border-border/10 focus:border-primary/50"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Recovery Link"}
        </Button>
      </form>
    </Card>
  );
};