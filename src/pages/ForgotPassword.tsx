import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import Navbar from "@/components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Check your email for the password reset link",
      });
      
      navigate("/login");
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/90">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center px-4 pt-24">
        <Card className="p-6 max-w-md w-full bg-background">
          <div className="text-center mb-6">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <p className="text-muted-foreground">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;