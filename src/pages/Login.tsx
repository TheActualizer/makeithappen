import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session?.user.email);
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center p-4 pt-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome to MakeITHappen</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="new-client" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="new-client">New Client</TabsTrigger>
                <TabsTrigger value="existing-client">Existing Client</TabsTrigger>
                <TabsTrigger value="staff">Staff Portal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="new-client">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    New to MakeITHappen? Create an account to get started with your project.
                  </p>
                  <Auth
                    supabaseClient={supabase}
                    view="sign_up"
                    appearance={{
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          colors: {
                            brand: 'rgb(var(--primary))',
                            brandAccent: 'rgb(var(--primary))',
                          },
                        },
                      },
                    }}
                    providers={["google"]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="existing-client">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Welcome back! Sign in to access your project dashboard.
                  </p>
                  <Auth
                    supabaseClient={supabase}
                    view="sign_in"
                    appearance={{
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          colors: {
                            brand: 'rgb(var(--primary))',
                            brandAccent: 'rgb(var(--primary))',
                          },
                        },
                      },
                    }}
                    providers={["google"]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="staff">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Staff members, please sign in with your work credentials.
                  </p>
                  <Auth
                    supabaseClient={supabase}
                    view="sign_in"
                    appearance={{
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          colors: {
                            brand: 'rgb(var(--primary))',
                            brandAccent: 'rgb(var(--primary))',
                          },
                        },
                      },
                    }}
                    providers={["google"]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;