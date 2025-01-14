import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { Lock, Shield, Key } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-b from-accent via-accent/95 to-primary/20 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <Navbar />
      
      <div className="container relative mx-auto px-4 pt-20 pb-12">
        <div className="max-w-md mx-auto">
          {/* Security Icons Animation */}
          <motion.div 
            className="flex justify-center gap-6 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-3 rounded-lg bg-primary/10 backdrop-blur-sm"
            >
              <Lock className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="p-3 rounded-lg bg-secondary/10 backdrop-blur-sm"
            >
              <Shield className="w-6 h-6 text-secondary" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-3 rounded-lg bg-primary/10 backdrop-blur-sm"
            >
              <Key className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary mb-3">
                Welcome Back
              </h1>
              <p className="text-gray-300/80 text-lg">
                Sign in to your account or create a new one
              </p>
            </div>

            <Card className="backdrop-blur-md bg-background/40 border border-white/10 shadow-2xl">
              <motion.div 
                className="p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
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
                      button: 'bg-primary/90 hover:bg-primary text-primary-foreground transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
                      input: 'bg-background/50 border border-white/10 focus:border-primary/50 transition-all duration-300',
                      label: 'text-foreground/80 font-medium',
                      message: 'text-sm text-destructive',
                      anchor: 'text-primary hover:text-primary/80 transition-colors duration-200',
                    },
                  }}
                  theme="dark"
                  providers={[]}
                  redirectTo={`${window.location.origin}/dashboard`}
                />
              </motion.div>
            </Card>
          </motion.div>

          <motion.div 
            className="mt-8 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;