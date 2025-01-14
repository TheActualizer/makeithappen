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

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      filter: "blur(12px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(12px)",
      scale: 0.95,
      transition: {
        duration: 0.25,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      filter: "blur(8px)"
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
      filter: "blur(8px)"
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="fixed w-full z-50 py-4"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/80 to-accent/40 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
      
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        <Link 
          to="/" 
          className={`text-2xl font-bold transition-all duration-500 ${
            isActive('/') 
              ? 'text-secondary drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]' 
              : 'text-white hover:text-secondary/90 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]'
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
              className={`transition-all duration-300 relative group ${
                isActive(item.href)
                  ? 'text-secondary font-medium drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive(item.href) && (
                <motion.span 
                  layoutId="navunderline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                />
              )}
              <span className="absolute inset-0 -z-10 scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/5 rounded-lg blur-sm" />
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate('/start-project')}
              className="shadow-lg hover:shadow-secondary/40 transition-all duration-300 bg-gradient-to-r from-secondary to-secondary/90"
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
            className="text-white hover:bg-white/10 transition-all duration-300 relative"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
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
              <div className="relative mx-2 rounded-2xl overflow-hidden">
                {/* Layered backgrounds for mobile menu */}
                <div className="absolute inset-0 bg-accent/95 backdrop-blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-primary/5" />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
                <div className="absolute inset-x-0 inset-y-0 border-2 border-secondary/20 rounded-2xl" />
                
                <div className="relative container mx-auto p-4">
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
                            className={`block px-4 py-3 rounded-xl transition-all duration-500 relative group ${
                              isActive(item.href)
                                ? 'bg-secondary/20 text-secondary font-medium translate-x-2 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-2'
                            }`}
                          >
                            <span className="relative z-10">{item.name}</span>
                            <span className="absolute inset-0 -z-10 scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/5 rounded-lg blur-sm" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Animated Divider */}
                    <motion.div 
                      variants={itemVariants}
                      className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.3)]"
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
    </motion.nav>
  );
};

export default Navbar;