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

  // Enhanced menu animation variants
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.98,
      transformOrigin: "top"
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.96,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.9,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      x: -10,
      scale: 0.9,
      filter: "blur(4px)",
      transition: {
        duration: 0.2
      }
    }
  };

  const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.3
      }
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  // ... keep existing code (desktop navigation)

  return (
    <nav className="fixed w-full bg-accent/95 backdrop-blur-xl z-50 py-4 border-b border-secondary/20 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center relative">
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
            <Link
              key={item.name}
              to={item.href}
              className={`transition-all duration-200 relative ${
                isActive(item.href)
                  ? 'text-secondary font-medium translate-y-[-1px]'
                  : 'text-gray-300 hover:text-white hover:translate-y-[-1px]'
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary rounded-full shadow-sm" />
              )}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-white hover:bg-white/10 transition-all duration-200 hover:translate-y-[-1px]"
            >
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate('/start-project')}
              className="shadow-lg hover:shadow-secondary/20 transition-all duration-200 hover:translate-y-[-1px]"
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
            className="text-white hover:bg-white/10"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Menu with enhanced animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-full left-0 right-0 mt-2"
            >
              <div className="bg-accent/98 backdrop-blur-2xl shadow-2xl border-2 border-secondary/20 rounded-2xl mx-2 overflow-hidden">
                <div className="container mx-auto p-4">
                  <div className="space-y-4">
                    {/* Primary Navigation Items */}
                    <div className="space-y-2">
                      {primaryNavItems.map((item, i) => (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          custom={i}
                          className="overflow-hidden"
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive(item.href)
                                ? 'bg-secondary/20 text-secondary font-medium translate-x-2 shadow-lg shadow-secondary/10'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-2'
                            }`}
                          >
                            <span className="text-secondary font-bold text-lg drop-shadow-sm">
                              {item.name[0]}
                            </span>
                            {item.name.slice(1)}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Animated Divider */}
                    <motion.div 
                      variants={dividerVariants}
                      className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent my-4 shadow-sm"
                    />

                    {/* Secondary Navigation Items */}
                    <div className="space-y-2">
                      {secondaryNavItems.map((item, i) => (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          custom={i + primaryNavItems.length}
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive(item.href)
                                ? 'bg-secondary/20 text-secondary font-medium translate-x-2 shadow-lg shadow-secondary/10'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-2'
                            }`}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                      variants={itemVariants}
                      className="pt-4 space-y-3 border-t border-secondary/30"
                    >
                      <Button 
                        variant="ghost"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/login');
                        }}
                        className="w-full justify-start text-white hover:bg-white/10 transition-all duration-300"
                      >
                        <User className="w-5 h-5 mr-2" />
                        Login
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/start-project');
                        }}
                        className="w-full shadow-lg hover:shadow-secondary/20 transition-all duration-300"
                      >
                        Get Started
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
