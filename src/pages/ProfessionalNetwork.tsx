import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  Filter,
  MessageSquare,
  Video,
  Calendar,
  Link as LinkIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function ProfessionalNetwork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConnect = (userId: string) => {
    toast({
      title: "Connection request sent",
      description: "We'll notify you when they respond.",
    });
  };

  const handleMessage = (userId: string) => {
    navigate(`/dashboard/messages?user=${userId}`);
  };

  const handleSchedule = (userId: string) => {
    navigate(`/schedule?user=${userId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold">Professional Network</h1>
            <p className="text-muted-foreground">
              Connect with professionals, schedule meetings, and grow your network.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skills, or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Professionals</SelectItem>
                <SelectItem value="connections">My Connections</SelectItem>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example cards - will be populated from database */}
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avatars/svg?seed=${i}`} />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle>User Name {i}</CardTitle>
                      <CardDescription>Senior Developer</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      San Francisco, CA
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>Tech Company {i}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span>Computer Science, Stanford</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleConnect(i.toString())}
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMessage(i.toString())}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSchedule(i.toString())}
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}