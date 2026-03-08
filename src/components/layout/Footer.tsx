import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Footer = () => {
  return (
    <footer className="bg-charcoal rounded-t-3xl mt-8">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left - CTA */}
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6 sm:mb-8">
                Poďme investovať spoločne
              </h2>
              <p className="text-primary-foreground/60 text-base sm:text-lg font-light leading-relaxed max-w-lg">
                ASSETRA investments stojí na pevných základoch a dlhodobých partnerstvách. Ak zvažujete investíciu do niektorého z našich sektorov, radi sa s Vami spojíme.
              </p>
            </div>

            {/* Right - Contact */}
            <div className="flex flex-col gap-6 md:items-end md:text-right">
              <Link
                to="/real-estate#kontakt"
                className="group inline-flex items-center gap-3 px-6 py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-lg sm:text-xl"
              >
                info@assetra.sk
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <p className="text-primary-foreground/60 text-sm sm:text-base">
                <span className="font-medium text-primary-foreground/80">Sídlo:</span> Bratislava, Slovensko
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom bar */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg text-primary-foreground tracking-wide">
            ASSETRA <span className="text-primary">investments</span>
          </p>
          <p className="text-xs sm:text-sm text-primary-foreground/40">
            © 2025 Assetra Investments s.r.o. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
