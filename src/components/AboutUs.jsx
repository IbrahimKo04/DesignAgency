import { Card } from "@/components/ui/card";
import { Sparkles, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description: "We push boundaries to deliver designs that captivate and convert"
  },
  {
    icon: Target,
    title: "Strategic Thinking",
    description: "Every design decision is backed by data and market insights"
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "Your vision combined with our expertise creates magic"
  }
];

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const AboutUs = () => {
  return (
    // THE FIX: Added z-10 here
    <section id="about" className="py-32 px-6 bg-secondary/30 relative overflow-hidden z-10">
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={fadeIn.transition}
          viewport={fadeIn.viewport}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Our Studio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're a team of passionate designers specializing in marketing visuals that drive results.
            From social media campaigns to brand identities, we craft designs that make your audience stop scrolling.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className="group p-8 bg-card border-border hover:border-primary transition-all duration-500 hover:shadow-glow hover:-translate-y-2 h-full"
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-secondary group-hover:bg-gradient-primary transition-all duration-500">
                  <value.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};