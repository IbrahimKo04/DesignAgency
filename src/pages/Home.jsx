import { Hero } from "@/components/Hero";
import { AboutUs } from "@/components/AboutUs";

export const Home = ({ isDark }) => {
  return (
    <>
      {/* The Home page combines the Hero and About sections */}
      <Hero isDark={isDark} />
      <AboutUs />
    </>
  );
};