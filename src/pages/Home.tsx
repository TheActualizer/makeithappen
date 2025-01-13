import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to MakeITHappen</h1>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/services")}>
            Explore Our Services
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;