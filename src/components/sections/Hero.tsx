import heroMarble from "@/assets/hero-marble.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroMarble})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-16 text-center pt-20">
        <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-6 md:mb-8 animate-fade-in opacity-0">
          Investícia s fixným výnosom
        </p>
        <h1 className="font-serif text-4xl md:text-display-md lg:text-display-xl mb-6 md:mb-8 animate-fade-in-up opacity-0">
          10% ročný výnos<br />
          <span className="text-gold">Vyplácaný mesačne</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-light leading-relaxed animate-fade-in-delayed opacity-0 mb-10 md:mb-12">
          Váš kapitál je zabezpečený realitnými transakciami. Predvídateľné výnosy podporené reálnymi aktívami, nie trhovými špekuláciami.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed opacity-0">
          <Button 
            asChild
            className="bg-gold hover:bg-gold/90 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-8 md:px-10 text-sm md:text-base"
          >
            <a href="#kontakt">Začať investovať</a>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="border-border hover:border-gold hover:text-gold font-medium tracking-wide uppercase h-12 md:h-14 px-8 md:px-10 text-sm md:text-base"
          >
            <a href="#kalkulacka">Vypočítať výnos</a>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-delayed opacity-0">
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
