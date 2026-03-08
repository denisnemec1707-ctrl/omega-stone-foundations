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
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-primary-foreground leading-tight tracking-tight">
          {title} {titleAccent}
        </h1>
      </motion.div>

      <motion.div
        className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16 max-w-xl md:max-w-2xl lg:max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 leading-snug">
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default SubpageHero;
