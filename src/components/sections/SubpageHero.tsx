import { motion } from "framer-motion";
import heroMountains from "@/assets/hero-mountains.jpg";

interface SubpageHeroProps {
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  image?: string;
}

const SubpageHero = ({ label, title, titleAccent, description, image }: SubpageHeroProps) => {
  return (
    <section className="relative h-[65vh] sm:h-[70vh] md:h-[80vh] overflow-hidden rounded-xl sm:rounded-2xl mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4 md:mt-6 flex flex-col justify-between">
      <div className="absolute inset-0">
        <img
          src={image || heroMountains}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

      <motion.div
        className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16 pt-16 sm:pt-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs sm:text-sm tracking-ultra-wide uppercase text-primary-foreground/60 mb-3 sm:mb-4">
          {label}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight">
          {title} <span className="text-primary">{titleAccent}</span>
        </h1>
      </motion.div>

      <motion.div
        className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/70 font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default SubpageHero;
