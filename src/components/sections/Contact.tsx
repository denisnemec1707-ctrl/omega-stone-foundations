const Contact = () => {
  return (
    <section id="contact" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            Get Started
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-8">
            Investment <span className="text-gold">Inquiries</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed mb-12">
            If you are interested in learning more about investing with Omega Capital, we invite you to contact us. We will provide you with complete documentation, current terms, and answer any questions about our investment model.
          </p>
          
          <div className="space-y-4 text-muted-foreground mb-16">
            <p className="tracking-wide">
              <span className="text-gold">Email</span> — invest@omegacapital.sk
            </p>
            <p className="tracking-wide">
              <span className="text-gold">Phone</span> — +421 2 123 456 789
            </p>
            <p className="tracking-wide">
              <span className="text-gold">Office</span> — Bratislava, Slovakia
            </p>
          </div>
          
          <div className="pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              Minimum investment: €10,000 · Investment terms: 12–24 months · Returns: 10% annually, paid monthly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
