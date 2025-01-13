import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Services", href: "/#services" },
    { name: "Case Studies", href: "#case-studies" },
    { 
      name: "Blog", 
      href: "/blog",
      subItems: [
        { name: "AI Trends", href: "/blog/category/ai-trends" },
        { name: "Agentic Systems", href: "/blog/category/agentic-systems" },
        { name: "Hive & Collaborative AI", href: "/blog/category/hive-collaborative-ai" },
        { name: "Case Studies", href: "/blog/category/case-studies" },
        { name: "Tutorials", href: "/blog/category/tutorials" },
        { name: "Vector & Tooling", href: "/blog/category/vector-tooling" },
      ]
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      // If we're already on the homepage, just scroll to the section
      if (window.location.pathname === '/') {
        const element = document.querySelector(href.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If we're on another page, navigate to home first
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
    <nav className="fixed w-full bg-accent/95 backdrop-blur-sm z-50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          MakeITHappen
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.subItems ? (
                <>
                  <button
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.name}
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                item.href.startsWith("/") ? (
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
                )
              )}
            </div>
          ))}
          <div className="flex items-center space-x-4">
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
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-accent/95 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="text-gray-300 hover:text-white transition-colors text-left w-full"
                    >
                      {item.name}
                    </button>
                    <div className="pl-4 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-gray-300 hover:text-white transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      className="text-gray-300 hover:text-white transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="text-gray-300 hover:text-white transition-colors text-left w-full"
                    >
                      {item.name}
                    </button>
                  )
                )}
              </div>
            ))}
            <div className="flex flex-col space-y-2">
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