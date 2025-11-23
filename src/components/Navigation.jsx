import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavLink, Link } from "react-router-dom";

export const Navigation = ({ isDark, setIsDark }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Helper for active link styling
  const getNavLinkClass = ({ isActive }) => 
    cn(
      "text-foreground hover:text-primary transition-colors duration-300 relative group",
      isActive ? "text-primary font-medium" : ""
    );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Home Link */}
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Studio</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/" className={getNavLinkClass}>
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </NavLink>
              
              <NavLink to="/portfolio" className={getNavLinkClass}>
                Portfolio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </NavLink>
              
              <Link to="/contact">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-500"
                >
                  Contact Us
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="ml-2 hover:bg-secondary transition-colors duration-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="hover:bg-secondary"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-secondary"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col items-center gap-4">
              <Link 
                to="/" 
                className="text-lg text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/portfolio" 
                className="text-lg text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <Button className="w-full bg-gradient-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};