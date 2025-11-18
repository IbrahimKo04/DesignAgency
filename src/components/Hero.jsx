import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroScene } from './HeroScene';
import { useMediaQuery } from '../hooks/useMediaQuery'; // <-- Import the hook

const heroBgPlaceholder = "https://via.placeholder.com/1920x1080/000000/FFFFFF?text=Hero+Background";

export const Hero = ({ isDark }) => {
  // Check if we are on a desktop-sized screen (md breakpoint is 768px)
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* --- Background Elements --- */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBgPlaceholder})` }}
      />
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* --- Render 3D Scene (or not) --- */}
      {/* Only render the 3D scene if we are on desktop */}
      {isDesktop && <HeroScene isDark={isDark} />}
      
      {/* These blur divs are fine for mobile, they are cheap to render */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* --- Main Text Content --- */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="space-y-8 animate-fade-in-up">
          {/* Responsive text size classes */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-foreground">Marketing Designs</span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
              That Convert
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stunning visuals for social media, ads, and campaigns that make your brand unforgettable
          </p>

          {/* Stacks buttons on mobile */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary hover:bg-secondary/50 transition-all duration-300 text-lg px-8 w-full sm:w-auto" // Full width on mobile
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>

      {/* --- Scroll Indicator --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};