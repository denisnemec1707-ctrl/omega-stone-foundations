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
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-xl sm:rounded-2xl mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4 md:mt-6 flex flex-col justify-between">
      <div className="absolute inset-0">
        <img
          src={image || heroMountains}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

      <motion.div
        className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-16 pt-14 sm:pt-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/60 mb-2 sm:mb-3">
          {label}
        </span>
        <h1 className="font-serif text-[1.75rem] sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-primary-foreground leading-[1.15] sm:leading-tight tracking-tight">
          {title}
          <br className="sm:hidden" />
          <span className="sm:ml-3">{titleAccent}</span>
        </h1>
      </motion.div>

      <motion.div
        className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-16 max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-primary-foreground/90 leading-snug">
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default SubpageHero;
