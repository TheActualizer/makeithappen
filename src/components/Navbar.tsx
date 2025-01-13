import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      if (window.location.pathname === '/') {
        const element = document.querySelector(href.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-accent/95 backdrop-blur-sm z-50 border-b border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white shrink-0">
            MakeITHappen
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.href.startsWith("/") ? (
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 shrink-0">
            <Button 
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-white hover:text-white hover:bg-accent-foreground/10"
            >
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate('/start-project')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-accent/95 backdrop-blur-sm border-t border-accent/10">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.href.startsWith("/") ? (
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="text-gray-300 hover:text-white transition-colors text-left w-full py-2"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-accent/10">
              <Button 
                variant="ghost"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
                className="text-white hover:text-white hover:bg-accent-foreground/10 w-full justify-start"
              >
                <User className="w-5 h-5 mr-2" />
                Login
              </Button>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/start-project');
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;