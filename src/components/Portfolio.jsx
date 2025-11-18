import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


/**
 * Resolves the final public URL for an asset inside the src directory.
 * The path is relative from Portfolio.jsx (the current file) to the assets folder.
 */
const getImageUrl = (fileName) => {
  // The path starts here: . (src/)
  // It goes into: assets/portfolio/
  // It loads the file: ${fileName}
  return new URL(`../assets/portfolio/${fileName}`, import.meta.url).href;
};

// You will need to import the last one, assuming you have a file for LinkedIn Post:
// import linkedInPostImg from './assets/portfolio/linkedin-post.png';
const projects = [
  { image: getImageUrl("campaign.png"), title: "Social Campaign", span: "row-span-2" },
  { image: getImageUrl("ecommerce.png"), title: "E-Commerce Ad", span: "col-span-2" },
  { image: getImageUrl("instagram-content.png"), title: "Instagram Story", span: "row-span-2" },
  { image: getImageUrl("brand-identity.png"), title: "Brand Identity", span: "col-span-1" },
  { image: getImageUrl("email-template.png"), title: "Email Template", span: "col-span-1" },
  { image: getImageUrl("carousel-post.png"), title: "Carousel Post", span: "col-span-1" },
  { image: getImageUrl("tech-product-ad.png"), title: "Tech Product Ad", span: "col-span-2 row-span-2" },
  { image: getImageUrl("marketing-flyer.png"), title: "Marketing Flyer", span: "col-span-1" },
  { image: getImageUrl("product-packaging.png"), title: "Product Packaging", span: "col-span-1" },
];

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      ease: "easeOut",
    },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const Portfolio = () => {
  return (
    // THE FIX: Added z-10 here
    <section id="work" className="py-32 px-6 relative overflow-hidden z-10">
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={fadeIn.transition}
          viewport={fadeIn.viewport}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Marketing designs that drive real results for our clients
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4 max-w-7xl mx-auto"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${project.span}`}
              variants={gridItemVariants}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
              </div>
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};