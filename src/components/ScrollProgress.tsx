import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-14 sm:top-16 md:top-20 left-0 right-0 h-0.5 bg-gold z-50 origin-left"
      style={{ scaleX }}
    />
  );
};
