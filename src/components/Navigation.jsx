import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Import cn utility

export const Navigation = ({ isDark, setIsDark }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      {/* Main Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Studio</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#work" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
                Work
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              
              {/* --- UPDATED THIS --- */}
              {/* Changed from <Button> to <a ...> and applied button styles */}
              <a
                href="#contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  "h-9 px-3", // This matches size="sm"
                  "bg-gradient-primary hover:shadow-glow transition-all duration-500"
                )}
              >
                Contact
              </a>
              {/* -------------------- */}
              
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
                onClick={() => setIsDark(!isDarks)}
                className="hover:bg-secondary transition-colors duration-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-secondary transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col items-center gap-4">
              <a 
                href="#work" 
                className="text-lg text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </a>
              <a 
                href="#about" 
                className="text-lg text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              
              {/* --- UPDATED THIS --- */}
              {/* Changed from <Button> to <a ...> and applied button styles */}
              <a
                href="#contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  "h-9 px-3 w-full", // This matches size="sm" and w-full
                  "bg-gradient-primary hover:shadow-glow transition-all duration-500"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              {/* -------------------- */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};