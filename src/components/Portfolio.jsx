import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/**
 * Resolves the final public URL for an asset inside the src directory.
 */
const getImageUrl = (fileName) => {
  return new URL(`../assets/portfolio/${fileName}`, import.meta.url).href;
};

// Kept the same data structure, but we will ignore the "span" for the chaotic layout
const projects = [
  { image: getImageUrl("campaign.png"), title: "Social Campaign", type: "Strategy" },
  { image: getImageUrl("ecommerce.png"), title: "E-Commerce Ad", type: "Conversion" },
  { image: getImageUrl("instagram-content.png"), title: "Instagram Story", type: "Social" },
  { image: getImageUrl("brand-identity.png"), title: "Brand Identity", type: "Branding" },
  { image: getImageUrl("email-template.png"), title: "Email Template", type: "CRM" },
  { image: getImageUrl("carousel-post.png"), title: "Carousel Post", type: "Social" },
  { image: getImageUrl("tech-product-ad.png"), title: "Tech Product Ad", type: "Creative" },
  { image: getImageUrl("marketing-flyer.png"), title: "Marketing Flyer", type: "Print" },
  { image: getImageUrl("product-packaging.png"), title: "Product Packaging", type: "Physical" },
];


// --- Individual Crazy Item Component ---
const PortfolioItem = ({ project, index, hoveredIndex, setHoveredIndex }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Crazy magnetic tilt effect on hover
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 30); // Max tilt range X
    y.set(yPct * -30); // Max tilt range Y (inverted)
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredIndex(null);
  };

  // Springs for smooth magnetic tilt
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  // Determine state based on hover index
  const isHovered = hoveredIndex === index;
  const isSomethingElseHovered = hoveredIndex !== null && hoveredIndex !== index;

  // Variants for the "Spotlight" effect
  const itemVariants = {
    idle: {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      z: 0,
      filter: "blur(0px) grayscale(0%)",
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    },
    hovered: {
      scale: 1.15,
      z: 50, // lift forward in 3D space
      filter: "blur(0px) grayscale(0%)",
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    receded: {
      scale: 0.85,
      z: -50, // push back
      filter: "blur(4px) grayscale(80%)", // Blur and desaturate others
      opacity: 0.7,
      transition: { type: "spring", stiffness: 200, damping: 25 }
    }
  };

  // Generate some pseudo-random positioning for the "chaotic" look before interaction
  // Using modulo math to create a deterministic but scattered layout pattern
  const randomRotate = (index % 2 === 0 ? 1 : -1) * (index * 1.5);
  const randomYOffset = (index % 3 === 0 ? -20 : index % 3 === 1 ? 20 : 0);

  return (
    <motion.div
      ref={ref}
      className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHoveredIndex(index)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100, rotate: randomRotate * 2 }}
      whileInView={{ opacity: 1, y: randomYOffset, rotate: randomRotate }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: index * 0.05 }}
      style={{
        rotateX: isHovered ? springY : 0,
        rotateY: isHovered ? springX : 0,
        transformStyle: "preserve-3d",
      }}
      animate={isHovered ? "hovered" : isSomethingElseHovered ? "receded" : "idle"}
      variants={itemVariants}
    >
      {/* The Image with a slight parallax scale on hover */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Crazy layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Crazy glowing border effect on hover */}
      <motion.div 
        className="absolute inset-0 border-4 border-primary/0 rounded-2xl"
        animate={{ 
            borderColor: isHovered ? "rgba(var(--primary-rgb), 0.8)" : "rgba(var(--primary-rgb), 0)",
            boxShadow: isHovered ? "inset 0 0 30px rgba(var(--primary-rgb), 0.5), 0 0 30px rgba(var(--primary-rgb), 0.5)" : "none"
        }}
      />

      {/* Content info */}
      <motion.div 
        className="absolute bottom-0 left-0 p-6 w-full"
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0.8 }}
      >
        <span className="text-sm text-primary font-mono uppercase tracking-wider mb-2 block">{project.type}</span>
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-none" style={{textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}>
          {project.title.split(" ").map((word, i) => (
            // Staggered text reveal on hover
            <motion.span key={i} className="inline-block mr-2" animate={{y: isHovered ? 0 : [0, -5, 0]}} transition={{delay: 0.1 * i, repeat: isHovered ? 0 : Infinity, repeatDelay: 3}}>
              {word}
            </motion.span>
          ))}
        </h3>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---
export const Portfolio = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  
  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create different scroll speeds for different columns to create depth
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yColumn3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Background blob movement based on scroll
  const blobY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const blobX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const springBlobX = useSpring(blobX, { stiffness: 50, damping: 20 });
  const springBlobY = useSpring(blobY, { stiffness: 50, damping: 20 });


  return (
    <section id="work" ref={containerRef} className="py-32 px-6 relative overflow-hidden z-10 min-h-screen flex flex-col justify-center bg-black/95 perspective-[2000px]">
      
      {/* --- Absolutely Bonkers Animated Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div 
            style={{ x: springBlobX, y: springBlobY }}
            className="absolute top-1/4 left-1/4 w-[50vmax] h-[50vmax] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" 
         />
          <motion.div 
            style={{ x: useTransform(springBlobX, v => -parseFloat(v)), y: useTransform(springBlobY, v => parseFloat(v) * 1.5) }}
            className="absolute bottom-1/4 right-1/4 w-[40vmax] h-[40vmax] bg-accent/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slower" 
         />
         {/* Noise texture overlay for grit */}
         <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* --- Header with glitchy entrance --- */}
        <motion.div
          className="text-center mb-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
        >
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
            DIGITAL <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-primary blur-xl opacity-50 animate-pulse"></span>
                <span className="bg-gradient-primary bg-clip-text text-transparent relative z-10">MAYHEM</span>
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-xl mx-auto font-mono">
            <span className="text-primary">{">"}</span> Selected works 2023-2024
          </p>
        </motion.div>

        {/* --- The Chaotic Grid Layout --- */}
        {/* We abandon the strict bento grid for a 3-column layout where columns shift differently */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
            
            {/* Column 1 - Medium Speed */}
            <motion.div style={{ y: yColumn1 }} className="flex flex-col gap-8 md:gap-12 md:mt-24">
                {projects.slice(0, 3).map((project, index) => (
                   <PortfolioItem key={index} project={project} index={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
                ))}
            </motion.div>

            {/* Column 2 - Fast Speed (Creates depth center) */}
            <motion.div style={{ y: yColumn2 }} className="flex flex-col gap-8 md:gap-12">
                {projects.slice(3, 6).map((project, index) => (
                   <PortfolioItem key={index + 3} project={project} index={index + 3} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
                ))}
            </motion.div>

             {/* Column 3 - Slow Speed */}
             <motion.div style={{ y: yColumn3 }} className="flex flex-col gap-8 md:gap-12 md:mt-48">
                {projects.slice(6, 9).map((project, index) => (
                   <PortfolioItem key={index + 6} project={project} index={index + 6} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
                ))}
            </motion.div>

        </div>
      </div>
    </section>
  );
};