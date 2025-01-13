import { useState } from "react";
import { Card } from "@/components/ui/card";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, Calendar, MessageSquare } from "lucide-react";
import useMessages from "@/hooks/useMessages";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const { data: messages, isLoading } = useMessages("default-conversation");

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      icon: <LineChart className="w-6 h-6 text-primary" />,
    },
    {
      title: "Tasks Completed",
      value: "48",
      change: "+5",
      icon: <BarChart className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Upcoming Meetings",
      value: "3",
      change: "0",
      icon: <Calendar className="w-6 h-6 text-primary" />,
    },
    {
      title: "Unread Messages",
      value: "7",
      change: "+3",
      icon: <MessageSquare className="w-6 h-6 text-secondary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ProjectProgress />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-accent/50 p-3 rounded-lg">
                  {stat.icon}
                </div>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 
                  stat.change.startsWith('-') ? 'text-red-500' : 
                  'text-gray-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            {isLoading ? (
              <p>Loading messages...</p>
            ) : (
              <div className="space-y-4">
                {messages?.slice(0, 5).map((message: any) => (
                  <div key={message.id} className="flex items-start space-x-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                      <p className="mt-1">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/start-project")}
              >
                New Project
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/messages")}
              >
                Messages
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/calendar")}
              >
                Schedule
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/reports")}
              >
                Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;