import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const ProfileMetadata = () => {
  const { toast } = useToast();
  
  const { data: profileMetadata, isLoading } = useQuery({
    queryKey: ["profileMetadata"],
    queryFn: async () => {
      console.log("Fetching profile metadata");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("No user found");
      }

      const { data, error } = await supabase
        .from("profile_metadata")
        .select("*")
        .eq("profile_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile metadata:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load profile data",
        });
        throw error;
      }

      console.log("Profile metadata loaded:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Expertise Areas</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileMetadata?.expertise_areas?.map((area: string) => (
              <span
                key={area}
                className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Service Preferences</h3>
          <pre className="mt-2 p-4 bg-accent/5 rounded-lg overflow-auto">
            {JSON.stringify(profileMetadata?.service_preferences, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Platform Settings</h3>
          <pre className="mt-2 p-4 bg-accent/5 rounded-lg overflow-auto">
            {JSON.stringify(profileMetadata?.platform_settings, null, 2)}
          </pre>
        </div>
      </div>
    </Card>
  );
};