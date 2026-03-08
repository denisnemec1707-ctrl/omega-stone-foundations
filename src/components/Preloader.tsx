import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"typing" | "hold" | "exit">("typing");

  const letters = "ASSETRA".split("");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 900);
    const exitTimer = setTimeout(() => setPhase("exit"), 1800);
    const doneTimer = setTimeout(() => onComplete(), 2400);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] bg-charcoal flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, y: -30 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex overflow-hidden">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="font-serif text-5xl sm:text-6xl md:text-8xl text-primary-foreground tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
