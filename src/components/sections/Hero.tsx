import heroMarble from "@/assets/hero-marble.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroMarble})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16 text-center">
        <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-8 animate-fade-in opacity-0">
          Fixed Income Investment
        </p>
        <h1 className="font-serif text-display-md md:text-display-lg lg:text-display-xl mb-8 animate-fade-in-up opacity-0">
          10% Fixed Annual Return<br />
          <span className="text-gold">Paid Monthly</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light leading-relaxed animate-fade-in-delayed opacity-0">
          Your capital is secured by real estate transactions. Predictable returns backed by tangible assets, not market speculation.
        </p>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-delayed opacity-0">
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
