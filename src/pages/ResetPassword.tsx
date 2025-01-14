import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";
import Navbar from "@/components/Navbar";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      console.log("[ResetPassword] Starting session validation");
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log("[ResetPassword] Current session:", { session, error: sessionError });

      // Parse URL hash
      const hash = window.location.hash;
      console.log("[ResetPassword] URL hash:", hash);
      
      const fragment = new URLSearchParams(hash.substring(1));
      const type = fragment.get('type');
      const accessToken = fragment.get('access_token');
      
      console.log("[ResetPassword] Recovery flow details:", {
        type,
        hasAccessToken: !!accessToken,
        currentUrl: window.location.href
      });

      // Validate recovery flow
      if (!session && type !== 'recovery') {
        console.error("[ResetPassword] Invalid recovery flow:", {
          hasSession: !!session,
          type,
          accessToken: !!accessToken
        });
        setError("Invalid or expired password reset link. Please request a new one.");
      }
    };

    validateSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[ResetPassword] Starting password reset");
    setError(null);
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("[ResetPassword] Attempting to update password");
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      console.log("[ResetPassword] Update password response:", { data, error });

      if (error) {
        throw error;
      }

      console.log("[ResetPassword] Password updated successfully");
      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
      });
      
      // Sign out and redirect
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error: any) {
      console.error("[ResetPassword] Error details:", {
        message: error.message,
        status: error.status,
        name: error.name,
        stack: error.stack
      });
      
      setError(error.message);
      toast({
        title: "Error",
        description: error.message || "Failed to reset password. Please try again.",
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
            <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold">Reset Password</h2>
            <p className="text-muted-foreground">
              Please enter your new password below.
            </p>
          </div>

          {error ? (
            <div className="text-center mb-6">
              <p className="text-destructive">{error}</p>
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="mt-2"
              >
                Return to login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full"
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;