const About = () => {
  return (
    <section id="about" className="py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            About Omega Capital
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-12 leading-tight">
            Real Estate Acquisition <span className="text-gold">Specialists</span>
          </h2>
          <div className="space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
            <p>
              Omega Capital is a Slovak investment company specializing in the acquisition, renovation, and resale of undervalued residential properties. We operate exclusively in markets we understand deeply, focusing on opportunities where we can acquire assets significantly below market value.
            </p>
            <p>
              Our team identifies distressed sales, estate liquidations, and motivated sellers. We renovate properties to market standard and resell them at fair value. This margin—the difference between our acquisition cost and final sale price—is what generates consistent returns for our investors.
            </p>
            <p>
              We do not speculate on market movements. We do not trade financial instruments. We buy real property, improve it, and sell it. This straightforward model has proven resilient across market conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
