import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Footer = () => {
  return (
    <footer className="bg-charcoal rounded-t-2xl sm:rounded-t-3xl mt-6 sm:mt-8">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        {/* Logo - large ASSETRA text matching hero style */}
        <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] text-primary-foreground tracking-tight leading-none text-center">
            ASSETRA
          </h2>
        </div>

        {/* CTA Section */}
        <AnimatedSection>
          <div className="border-t border-primary-foreground/10 pt-12 sm:pt-16 md:pt-20">
            <div className="flex flex-col gap-10 sm:gap-12 md:grid md:grid-cols-2 md:gap-16 md:items-start">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-4 sm:mb-6">
                  Poďme investovať spoločne
                </h3>
                <p className="text-primary-foreground/50 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg">
                  ASSETRA investments stojí na pevných základoch a dlhodobých partnerstvách. Ak zvažujete investíciu do niektorého z našich sektorov, radi sa s Vami spojíme.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 md:items-end md:text-right">
                <Link
                  to="/real-estate#kontakt"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-base sm:text-lg md:text-xl self-start md:self-auto"
                >
                  info@assetra.sk
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <p className="text-primary-foreground/50 text-xs sm:text-sm md:text-base">
                  <span className="font-medium text-primary-foreground/70">Sídlo:</span> Bratislava, Slovensko
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom bar */}
        <div className="mt-16 sm:mt-20 md:mt-28 py-6 sm:py-8 border-t border-primary-foreground/10">
          <p className="text-[11px] sm:text-xs md:text-sm text-primary-foreground/30 text-center">
            © 2025 Assetra Investments s.r.o. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
