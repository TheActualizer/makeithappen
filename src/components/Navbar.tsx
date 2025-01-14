import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.15,
        ease: "easeOut"
      }
    }),
    exit: { 
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  return (
    <nav className="fixed w-full bg-accent/95 backdrop-blur-sm z-50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className={`text-2xl font-bold transition-colors ${
            isActive('/') ? 'text-secondary' : 'text-white'
          }`}
        >
          MakeITHappen
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.href.startsWith("/") ? (
                <Link
                  to={item.href}
                  className={`transition-colors relative ${
                    isActive(item.href)
                      ? 'text-secondary font-medium'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary rounded-full" />
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`transition-colors ${
                    isActive(item.href)
                      ? 'text-secondary font-medium'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/login')}
              className={`transition-colors ${
                isActive('/login')
                  ? 'text-secondary bg-accent-foreground/10'
                  : 'text-white hover:text-white hover:bg-accent-foreground/10'
              }`}
            >
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate('/start-project')}
              className={isActive('/start-project') ? 'bg-opacity-90' : ''}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-accent-foreground/20"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu with Enhanced Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 border-t-2 border-secondary/30"
          >
            <div className="bg-accent/98 backdrop-blur-md shadow-2xl border-b-2 border-x-2 border-secondary/30 rounded-b-xl mx-2">
              <div className="container mx-auto p-4">
                <div className="space-y-2 divide-y-2 divide-secondary/20">
                  <div className="space-y-2 pb-3">
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {item.href.startsWith("/") ? (
                          <Link
                            to={item.href}
                            className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive(item.href)
                                ? 'bg-secondary/20 text-secondary font-medium shadow-inner'
                                : 'text-gray-300 hover:bg-accent-foreground/10 hover:text-white hover:shadow-lg'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleNavigation(item.href)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive(item.href)
                                ? 'bg-secondary/20 text-secondary font-medium shadow-inner'
                                : 'text-gray-300 hover:bg-accent-foreground/10 hover:text-white hover:shadow-lg'
                            }`}
                          >
                            {item.name}
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="pt-3 space-y-3">
                    <motion.div
                      variants={itemVariants}
                      custom={navItems.length}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Button 
                        variant="ghost"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/login');
                        }}
                        className={`w-full justify-start rounded-lg ${
                          isActive('/login')
                            ? 'bg-secondary/20 text-secondary shadow-inner'
                            : 'text-gray-300 hover:bg-accent-foreground/10 hover:text-white hover:shadow-lg'
                        }`}
                      >
                        <User className="w-5 h-5 mr-2" />
                        Login
                      </Button>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      custom={navItems.length + 1}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Button 
                        variant="secondary" 
                        className="w-full shadow-lg hover:shadow-xl transition-shadow duration-200"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/start-project');
                        }}
                      >
                        Get Started
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
