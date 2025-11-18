import { Github, Twitter, Dribbble, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-6 py-12">
        {/* Added text-left to ensure alignment on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Studio</span>
            </div>
            <p className="text-muted-foreground">
              Crafting digital experiences that leave lasting impressions
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Brand Identity</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Web Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors duration-300">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Work</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            {/* Added justify-start so icons aren't centered */}
            <div className="flex gap-4 justify-start">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Dribbble className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2025 Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};