import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

interface SectionBlockProps {
  label: string;
  title: string;
  titleAccent: string;
  description?: string;
  children: React.ReactNode;
  dark?: boolean;
  id?: string;
}

const SectionBlock = ({ label, title, titleAccent, description, children, dark, id }: SectionBlockProps) => {
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 md:py-32 ${dark ? "bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6" : ""}`}
    >
      <div className={dark ? "px-5 sm:px-8 md:px-12 lg:px-16" : "container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20"}>
        <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
          <p className={`text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 ${dark ? "text-primary-foreground/40" : "text-muted-foreground"}`}>
            {label}
          </p>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight ${dark ? "text-primary-foreground" : "text-foreground"}`}>
              {title} <span className="text-primary">{titleAccent}</span>
            </h2>
            {description && (
              <p className={`text-base sm:text-lg font-light leading-relaxed md:pt-2 ${dark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {description}
              </p>
            )}
          </div>
        </AnimatedSection>
        {children}
      </div>
    </section>
  );
};

export default SectionBlock;

export { StaggerContainer, StaggerItem };
