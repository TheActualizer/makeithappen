import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case "Invalid login credentials":
        return "The email or password you entered is incorrect. Please try again.";
      case "Email not confirmed":
        return "Please check your email and confirm your account before signing in.";
      case "User not found":
        return "We couldn't find an account with these credentials. Need to create one?";
      case "Email link is invalid or has expired":
        return "The login link has expired. Please request a new one.";
      default:
        return "Something went wrong. Please try again later.";
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
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

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/90">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-gray-300 mt-2">
              Join MakeITHappen and start building your projects
            </p>
          </div>
          <div className="bg-background rounded-lg p-8 shadow-xl border border-border/5">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(var(--primary))',
                      brandAccent: 'rgb(var(--secondary))',
                      inputBackground: 'rgb(var(--background))',
                      inputBorder: 'rgb(var(--border))',
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
                  button: 'bg-primary text-primary-foreground hover:bg-primary/90',
                  input: 'bg-background border border-input',
                  label: 'text-foreground',
                  message: 'text-sm text-destructive',
                },
              }}
              theme="dark"
              providers={[]}
              view="sign_up"
              showLinks={true}
            />
          </div>
          <div className="mt-8 text-center text-sm text-gray-300">
            <p>
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;