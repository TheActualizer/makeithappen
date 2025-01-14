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
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed w-full bg-accent/80 backdrop-blur-xl z-50 py-4 border-b border-secondary/20 shadow-lg">
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
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu with enhanced layering */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 mt-1"
          >
            <div className="bg-accent/95 backdrop-blur-2xl shadow-2xl border-2 border-secondary/20 rounded-b-2xl mx-2 overflow-hidden">
              <div className="container mx-auto p-4">
                <div className="space-y-4">
                  {/* Primary Navigation Items with ABC Highlight */}
                  <div className="space-y-2 relative">
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
                          className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive(item.href)
                              ? 'bg-secondary/20 text-secondary font-medium translate-y-[-1px] shadow-sm'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-y-[-1px]'
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

                  {/* Enhanced Gradient Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent my-4 shadow-sm" />

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
                          className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive(item.href)
                              ? 'bg-secondary/20 text-secondary font-medium translate-y-[-1px] shadow-sm'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-y-[-1px]'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons with enhanced layering */}
                  <div className="pt-4 space-y-3 border-t border-secondary/30">
                    <motion.div variants={itemVariants}>
                      <Button 
                        variant="ghost"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/login');
                        }}
                        className="w-full justify-start text-white hover:bg-white/10 transition-all duration-200 hover:translate-y-[-1px]"
                      >
                        <User className="w-5 h-5 mr-2" />
                        Login
                      </Button>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Button 
                        variant="secondary"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/start-project');
                        }}
                        className="w-full shadow-lg hover:shadow-secondary/20 transition-all duration-200 hover:translate-y-[-1px]"
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