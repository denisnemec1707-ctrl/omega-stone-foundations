const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
              The Investment Model
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md mb-8">
              How Your Capital <span className="text-gold">Works</span>
            </h2>
          </div>
          
          <div className="space-y-16">
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gold flex items-center justify-center">
                <span className="font-serif text-2xl text-gold">1</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">You Invest</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  You commit capital for a defined period (typically 12–18 months). Your investment terms—return rate, payout schedule, and duration—are fixed at signing.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-border flex items-center justify-center">
                <span className="font-serif text-2xl text-muted-foreground">2</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">We Acquire Property</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Your capital funds the purchase of carefully selected properties. We only acquire assets priced at least 20% below market value, ensuring built-in margin for your returns and our operations.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-border flex items-center justify-center">
                <span className="font-serif text-2xl text-muted-foreground">3</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">Renovation & Resale</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  We renovate the property to market standard and sell it at fair market value. The profit margin covers your fixed return, operational costs, and our earnings.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gold flex items-center justify-center">
                <span className="font-serif text-2xl text-gold">4</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">You Receive Returns</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Throughout the investment period, you receive monthly payouts. At the end of the cycle, your full principal is returned. You can then reinvest or withdraw completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
