import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity based on scroll position
  const getBackgroundStyle = () => {
    const minOpacity = 0.85; // Minimum opacity to ensure readability
    const maxOpacity = 0.95; // Maximum opacity for solid look
    const scrollThreshold = 100; // Pixels to scroll before reaching max opacity
    
    const opacity = Math.min(
      maxOpacity,
      minOpacity + (scrollPosition / scrollThreshold) * (maxOpacity - minOpacity)
    );

    return {
      backgroundColor: `rgba(15, 23, 42, ${opacity})`,
      backdropFilter: "blur(12px)",
    };
  };

  const primaryNavItems = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const secondaryNavItems = [
    { name: "Services", href: "/services" },
    { name: "Success Stories", href: "/case-studies" },
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(8px)",
      transition: {
        duration: 0.15,
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: -10,
      filter: "blur(4px)"
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav 
      className="fixed w-full z-50 py-4 border-b border-secondary/20 shadow-lg transition-colors duration-300"
      style={getBackgroundStyle()}
    >
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        <Link 
          to="/" 
          className={`text-2xl font-bold transition-all duration-300 ${
            isActive('/') 
              ? 'bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]' 
              : 'text-white hover:text-secondary/90'
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
              className={`transition-all duration-300 relative font-medium ${
                isActive(item.href)
                  ? 'text-secondary drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]'
                  : 'text-gray-100 hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]'
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <motion.span 
                  layoutId="navunderline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)]" 
                />
              )}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-white hover:bg-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate('/start-project')}
              className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 shadow-lg hover:shadow-secondary/30 transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-white/15 transition-all duration-300"
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
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 right-0 mt-2"
            >
              <div className="bg-accent/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-2 border-secondary/20 rounded-2xl mx-2 overflow-hidden">
                <div className="container mx-auto p-4">
                  <div className="space-y-4">
                    {/* Primary Navigation Items */}
                    <div className="space-y-2">
                      {primaryNavItems.map((item) => (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          className="overflow-hidden"
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive(item.href)
                                ? 'bg-secondary/20 text-secondary font-medium translate-x-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-2'
                            }`}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Animated Divider */}
                    <motion.div 
                      variants={itemVariants}
                      className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.2)]"
                    />

                    {/* Secondary Navigation Items */}
                    <div className="space-y-2">
                      {secondaryNavItems.map((item) => (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive(item.href)
                                ? 'bg-secondary/20 text-secondary font-medium translate-x-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
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
