'use client';

import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Target, Users, Heart, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

// --- IMPORT YOUR 3D COMPONENT HERE ---
// Make sure the path matches where you saved AboutScene.jsx
import { AboutScene } from "./AboutScene"; 

const values = [
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description: "We push boundaries to deliver designs that captivate and convert. Our team lives and breathes creativity."
  },
  {
    icon: Target,
    title: "Strategic Thinking",
    description: "Every design decision is backed by data and market insights. We don't just make things look pretty; we make them work."
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "Your vision combined with our expertise creates magic. We view ourselves as an extension of your team."
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "We love what we do, and it shows in every pixel. Passion is the fuel that drives our innovative solutions."
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description: "In the digital world, speed matters. We deliver high-quality work without compromising on deadlines."
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized by industry leaders for our innovative approach and exceptional design quality."
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true },
};

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 50 } 
  },
};

export const AboutUs = () => {
  const scrollRef = useRef(null);

  return (
    <section id="about" className="py-32 px-6 bg-secondary/30 relative overflow-hidden z-10">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <motion.div
          className="text-center mb-24 max-w-4xl mx-auto"
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={fadeIn.transition}
          viewport={fadeIn.viewport}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Crafting Digital <span className="bg-gradient-primary bg-clip-text text-transparent">Masterpieces</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            We are more than just a design agency. We are a collective of dreamers, thinkers, and creators dedicated to transforming brands into digital icons.
          </p>
        </motion.div>

        {/* --- STORY SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h3>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Founded in 2020, our studio began with a simple mission: to rid the world of boring design. What started as a small team of two has grown into a global powerhouse of creative talent.
              </p>
              <p>
                We believe that design is not just about aesthetics; it's about communication. It's about telling a story that resonates with your audience and compels them to act.
              </p>
              <p>
                From humble beginnings to working with Fortune 500 companies, our commitment to excellence has never wavered. We treat every project, big or small, with the same level of passion and precision.
              </p>
            </div>
          </motion.div>
          
          {/* Right: 3D Scene Area */}
          <motion.div
            className="relative h-[500px] w-full cursor-move" 
            // No borders, no background, no shadow as requested
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
             {/* Rendering the imported component */}
             <AboutScene />
          </motion.div>
        </div>

        {/* --- VALUES HORIZONTAL SCROLL --- */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Us?</h3>
          <p className="text-muted-foreground text-lg">Our core values define who we are and how we work.</p>
        </motion.div>

        <div className="relative w-full">
          {/* Gradient Fade Effect for Scroll indication */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
          
          <motion.div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory custom-scrollbar px-4 md:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="min-w-[300px] md:min-w-[350px] snap-center first:pl-2 last:pr-2"
                variants={cardVariants}
                custom={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    delay: index * 0.1, // Stagger effect
                    duration: 0.5 
                  } 
                }}
                viewport={{ once: true }}
              >
                <Card
                  className="group p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-500 hover:shadow-glow hover:-translate-y-2 h-full flex flex-col"
                >
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-secondary/50 group-hover:bg-gradient-primary transition-all duration-500 w-fit">
                    <value.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- CTA --- */}
        <motion.div 
            className="mt-32 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-4xl font-bold mb-6">Ready to start your journey?</h2>
            <p className="text-xl text-muted-foreground mb-8">Let's create something extraordinary together.</p>
        </motion.div>

      </div>
    </section>
  );
};