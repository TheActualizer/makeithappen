import { useNavigate } from "react-router-dom";
import { Settings, LogOut, Home, Menu, ChevronDown, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
      });
    }
  };

  const sections = [
    { name: "Overview", href: "/dashboard" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Calendar", href: "/dashboard/calendar" },
    { name: "Messages", href: "/dashboard/messages" },
    { name: "Social Marketplace", href: "/dashboard/social", icon: Users },
    { name: "Documents", href: "/dashboard/documents" },
    { name: "Financial Metrics", href: "/dashboard/financials" },
    { name: "Project Progress", href: "/dashboard/progress" },
    { name: "Project Scope", href: "/dashboard/scope" },
  ];

  const settingsItems = [
    { name: "Profile Settings", href: "/settings/profile" },
    { name: "Preferences", href: "/settings/preferences" },
    { name: "Notifications", href: "/settings/notifications" },
  ];

  return (
    <div className="border-b bg-accent/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-white hover:bg-accent-foreground/10"
          >
            <Home className="h-5 w-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-accent-foreground/10 md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <div className="space-y-2">
                  <h2 className="text-sm font-medium">Sections</h2>
                  {sections.map((section) => (
                    <Button
                      key={section.name}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(section.href);
                      }}
                    >
                      {section.icon && <section.icon className="mr-2 h-4 w-4" />}
                      {section.name}
                    </Button>
                  ))}
                </div>
                <div className="space-y-2">
                  <h2 className="text-sm font-medium">Settings</h2>
                  {settingsItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(item.href);
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {sections.slice(0, 5).map((section) => (
            <Button
              key={section.name}
              variant="ghost"
              className="text-white hover:bg-accent-foreground/10 flex items-center gap-2"
              onClick={() => navigate(section.href)}
            >
              {section.icon && <section.icon className="h-4 w-4" />}
              {section.name}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-accent-foreground/10">
                Sections
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Dashboard Sections</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {sections.map((section) => (
                  <DropdownMenuItem
                    key={section.name}
                    onClick={() => navigate(section.href)}
                    className="flex items-center"
                  >
                    {section.icon && <section.icon className="mr-2 h-4 w-4" />}
                    {section.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-accent-foreground/10">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {settingsItems.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  onClick={() => navigate(item.href)}
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-white hover:bg-accent-foreground/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};