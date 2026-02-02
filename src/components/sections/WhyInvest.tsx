const WhyInvest = () => {
  return (
    <section id="why-invest" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            Investor Benefits
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-8">
            Why Invest With <span className="text-gold">Omega Capital</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed">
            We offer a straightforward investment model with clear terms, predictable returns, and real asset security.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">10%</p>
            <h3 className="font-serif text-xl mb-3">Fixed Annual Yield</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Your return is predetermined and contractually guaranteed. No market volatility, no surprises.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">Monthly</p>
            <h3 className="font-serif text-xl mb-3">Regular Income</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Receive your earnings every month. Consistent cash flow you can plan around.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">Real</p>
            <h3 className="font-serif text-xl mb-3">Asset Backing</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Every investment is tied to physical real estate. Tangible security, not paper promises.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">12–18</p>
            <h3 className="font-serif text-xl mb-3">Month Cycles</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Short investment horizons with defined exit points. Your capital is not locked indefinitely.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">20%+</p>
            <h3 className="font-serif text-xl mb-3">Operating Margins</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Our acquisition model targets minimum 20% profit margins, ensuring your fixed return is always covered.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-serif text-display-sm text-gold mb-4">Full</p>
            <h3 className="font-serif text-xl mb-3">Capital Return</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              At cycle end, you receive your full principal back plus all earned returns. Simple and complete.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;
