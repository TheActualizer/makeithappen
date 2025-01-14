import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "User not found":
        return "No user found with these credentials.";
      case "Invalid grant":
        return "Invalid login credentials.";
      default:
        return error.message;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
      }
      if (event === "USER_UPDATED" || event === "SIGNED_OUT") {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error_description');
        if (error) {
          toast({
            title: "Authentication Error",
            description: getErrorMessage({ message: error } as AuthError),
            variant: "destructive",
          });
        }
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/90 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-[800px] h-[800px] bg-primary/30 rounded-full blur-[128px] animate-pulse" />
      </div>
      
      <Navbar />
      
      <div className="container relative mx-auto px-4 pt-20 pb-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 relative">
            <div className="inline-block p-3 rounded-xl bg-primary/10 backdrop-blur-sm mb-4 animate-float">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-300/80 text-lg mb-2">
              Sign in to your account or create a new one
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-primary/60">
              <Sparkles className="w-4 h-4" />
              <span>Secure authentication powered by Supabase</span>
            </div>
          </div>

          <Card className="backdrop-blur-md bg-background/30 border border-border/10 shadow-2xl">
            <div className="p-6">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: 'rgb(var(--primary))',
                        brandAccent: 'rgb(var(--secondary))',
                        inputBackground: 'rgba(var(--background), 0.5)',
                        inputBorder: 'rgba(var(--border), 0.1)',
                      },
                      borderWidths: {
                        buttonBorderWidth: '1px',
                        inputBorderWidth: '1px',
                      },
                      radii: {
                        borderRadiusButton: '0.5rem',
                        buttonBorderRadius: '0.5rem',
                        inputBorderRadius: '0.5rem',
                      },
                    },
                  },
                  className: {
                    container: 'flex flex-col gap-4',
                    button: 'bg-primary/90 hover:bg-primary text-primary-foreground transition-colors duration-200',
                    input: 'bg-background/50 border border-border/10 focus:border-primary/50 transition-all duration-200',
                    label: 'text-foreground/80',
                    message: 'text-sm text-destructive',
                  },
                }}
                theme="dark"
                providers={[]}
                redirectTo={`${window.location.origin}/reset-password`}
              />
            </div>
          </Card>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-300/80">
              By signing up, you agree to our{" "}
              <Link 
                to="/terms-of-service" 
                className="text-primary hover:text-primary/80 transition-colors duration-200 underline decoration-primary/30 hover:decoration-primary/60"
              >
                Terms of Service
              </Link>
              {" "}and{" "}
              <Link 
                to="/privacy-policy" 
                className="text-primary hover:text-primary/80 transition-colors duration-200 underline decoration-primary/30 hover:decoration-primary/60"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;