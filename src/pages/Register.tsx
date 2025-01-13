import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent/90">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-gray-300 mt-2">
              Join us and start managing your projects
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
                    },
                  },
                },
              }}
              theme="dark"
              providers={[]}
              view="sign_up"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;