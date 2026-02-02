const Trust = () => {
  return (
    <section id="trust" className="py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
              Risk Management
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md mb-8">
              Capital Protection <span className="text-gold">First</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed">
              We structure every transaction with your capital security as the primary concern.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="border-l border-gold pl-8">
              <h3 className="font-serif text-2xl mb-4">Conservative Acquisition</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                We only purchase properties priced 20% or more below market value. This margin protects against market fluctuations and ensures profitability even in adverse conditions.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Real Asset Security</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Every investment is backed by physical real estate. Unlike financial instruments, property retains intrinsic value regardless of market sentiment.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Short Cycles</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Investment periods of 12–18 months limit exposure to long-term market shifts. Capital is returned and can be redeployed or withdrawn at regular intervals.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Operational Experience</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Our team has completed dozens of acquisition-renovation-resale cycles. We understand the Slovak real estate market, local regulations, and renovation economics.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border text-center">
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">50+</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Properties Completed</p>
            </div>
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">0</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Missed Payouts</p>
            </div>
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">100%</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Principal Returned</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
