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
    <section className="relative min-h-[70vh] sm:min-h-[80vh] overflow-hidden rounded-xl sm:rounded-2xl mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4 md:mt-6 flex items-end">
      <div className="absolute inset-0">
        <img
          src={image || heroMountains}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <motion.div
        className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16 w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs sm:text-sm tracking-ultra-wide uppercase text-primary-foreground/60 mb-3 sm:mb-4">
          {label}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-primary-foreground leading-tight mb-4 sm:mb-6">
          {title} <span className="text-primary">{titleAccent}</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/70 font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default SubpageHero;
