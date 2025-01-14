import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const primaryNavItems = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const secondaryNavItems = [
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
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
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 1, 1]
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
          {[...primaryNavItems, ...secondaryNavItems].map((item) => (
            <div key={item.name} className="relative group">
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
            className="md:hidden absolute top-full left-0 right-0"
          >
            <div className="bg-accent/98 backdrop-blur-md shadow-xl border-2 border-secondary/50 rounded-b-2xl mx-2 overflow-hidden">
              <div className="container mx-auto p-4">
                <div className="space-y-4">
                  {/* Primary Navigation Items with ABC Highlight */}
                  <div className="space-y-2 pb-4">
                    {primaryNavItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        custom={i}
                        variants={itemVariants}
                      >
                        <Link
                          to={item.href}
                          className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive(item.href)
                              ? 'bg-secondary/20 text-secondary font-medium shadow-inner'
                              : 'text-gray-300 hover:bg-accent-foreground/10 hover:text-white'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-secondary font-bold">{item.name[0]}</span>
                          {item.name.slice(1)}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

                  {/* Secondary Navigation Items */}
                  <div className="space-y-2 pt-2">
                    {secondaryNavItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        custom={i + primaryNavItems.length}
                        variants={itemVariants}
                      >
                        <Link
                          to={item.href}
                          className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive(item.href)
                              ? 'bg-secondary/20 text-secondary font-medium shadow-inner'
                              : 'text-gray-300 hover:bg-accent-foreground/10 hover:text-white'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-3 border-t-2 border-secondary/30">
                    <motion.div
                      variants={itemVariants}
                      custom={primaryNavItems.length + secondaryNavItems.length}
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
                            : 'text-gray-300 hover:bg-accent-foreground/10 hover:text-white'
                        }`}
                      >
                        <User className="w-5 h-5 mr-2" />
                        Login
                      </Button>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      custom={primaryNavItems.length + secondaryNavItems.length + 1}
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