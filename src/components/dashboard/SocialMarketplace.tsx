import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Briefcase, GraduationCap, MapPin, Globe, Link } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Profile = Tables<"profiles">;

export const SocialMarketplace = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("last_name", { ascending: true });

        if (error) throw error;
        setProfiles(data || []);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        toast({
          variant: "destructive",
          title: "Error loading profiles",
          description: "There was a problem loading the user profiles.",
        });
      }
    };

    fetchProfiles();
  }, [toast]);

  const getInitials = (profile: Profile) => {
    const first = profile.first_name?.[0] || '';
    const last = profile.last_name?.[0] || '';
    return (first + last).toUpperCase();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Professional Network</h2>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            View Professional Profiles
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[350px] max-h-[500px] overflow-y-auto">
          <DropdownMenuLabel>Professional Network</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profiles.map((profile) => (
            <DropdownMenuItem key={profile.id} className="flex flex-col items-start p-4 space-y-2 cursor-pointer">
              <div className="flex items-center space-x-3 w-full">
                <Avatar>
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback>{getInitials(profile)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">
                    {profile.first_name} {profile.last_name}
                  </div>
                  {profile.headline && (
                    <div className="text-sm text-muted-foreground">{profile.headline}</div>
                  )}
                </div>
              </div>
              
              {profile.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-2 w-full">
                {profile.location && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {profile.location}
                  </div>
                )}
                
                {profile.experience && Array.isArray(JSON.parse(profile.experience as string)) && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {JSON.parse(profile.experience as string).length} experiences
                  </div>
                )}
                
                {profile.education && Array.isArray(JSON.parse(profile.education as string)) && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {JSON.parse(profile.education as string).length} education
                  </div>
                )}
                
                {profile.website && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Globe className="h-3 w-3 mr-1" />
                    Website
                  </div>
                )}
                
                {profile.social_links && Object.keys(JSON.parse(profile.social_links as string)).length > 0 && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Link className="h-3 w-3 mr-1" />
                    {Object.keys(JSON.parse(profile.social_links as string)).length} links
                  </div>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};