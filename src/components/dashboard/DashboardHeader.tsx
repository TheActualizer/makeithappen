import { useNavigate } from "react-router-dom";
import { Settings, LogOut, Home, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Calendar", href: "/dashboard/calendar" },
    { name: "Messages", href: "/dashboard/messages" },
    { name: "Settings", href: "/settings/profile" },
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
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-2 mt-4">
                {navigationItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      navigate(item.href);
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="text-white hover:bg-accent-foreground/10"
              onClick={() => navigate(item.href)}
            >
              {item.name}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-accent-foreground/10">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings/profile")}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings/preferences")}>
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings/notifications")}>
                Notifications
              </DropdownMenuItem>
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