import heroMarble from "@/assets/hero-marble.jpg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20 border-b border-border">
          <a href="#" className="font-serif text-xl tracking-wide">
            OMEGA <span className="text-gold">CAPITAL</span>
          </a>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#about" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#approach" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Approach
            </a>
            <a href="#trust" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Trust
            </a>
            <a href="#contact" className="text-sm tracking-ultra-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

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
          Est. 1987
        </p>
        <h1 className="font-serif text-display-md md:text-display-lg lg:text-display-xl mb-8 animate-fade-in-up opacity-0">
          Preserving Wealth<br />
          <span className="text-gold">Across Generations</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light leading-relaxed animate-fade-in-delayed opacity-0">
          Disciplined capital stewardship for institutions and families of significant wealth.
        </p>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-delayed opacity-0">
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            Capital Management
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-12 leading-tight">
            Long-term value creation through <span className="text-gold">patient capital deployment</span>
          </h2>
          <div className="space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
            <p>
              For over three decades, Omega Capital has served as a trusted steward of institutional and private wealth. Our approach is rooted in fundamental analysis, rigorous due diligence, and an unwavering commitment to capital preservation.
            </p>
            <p>
              We operate with a singular focus: generating consistent, risk-adjusted returns while protecting principal through market cycles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Approach = () => {
  return (
    <section id="approach" className="py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
              Investment Philosophy
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md mb-8">
              Conviction Through<br />
              <span className="text-gold">Conviction</span>
            </h2>
          </div>
          
          <div className="space-y-12 lg:pt-8">
            <div className="border-l border-gold pl-8">
              <h3 className="font-serif text-2xl mb-4">Concentrated Portfolios</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                We maintain high-conviction positions in a limited number of exceptional opportunities, allowing for deep understanding and meaningful engagement.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Long-Term Horizon</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Our patient capital approach enables us to capture value that short-term oriented investors cannot access. We measure success in years, not quarters.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Risk Discipline</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Capital preservation is paramount. We employ conservative leverage and maintain substantial liquidity reserves to navigate market dislocations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  return (
    <section id="trust" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            Trust & Stability
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-12">
            Built on <span className="text-gold">Integrity</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed mb-16">
            Our reputation has been earned through decades of principled conduct, transparent communication, and consistent delivery. We serve a select group of institutional investors and families who share our values and investment horizon.
          </p>
          
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">$12B+</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Assets Managed</p>
            </div>
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">37</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Years Operating</p>
            </div>
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">94%</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Client Retention</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
            Contact
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md mb-8">
            Institutional Inquiries
          </h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed mb-12">
            Omega Capital selectively engages with qualified institutional investors and family offices. For partnership inquiries, please contact our investor relations team.
          </p>
          
          <div className="space-y-4 text-muted-foreground">
            <p className="tracking-wide">
              <span className="text-gold">Email</span> — relations@omegacapital.com
            </p>
            <p className="tracking-wide">
              <span className="text-gold">New York</span> — 450 Park Avenue, 32nd Floor
            </p>
            <p className="tracking-wide">
              <span className="text-gold">London</span> — 22 Bishopsgate, Level 40
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-lg tracking-wide">
            OMEGA <span className="text-gold">CAPITAL</span>
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 Omega Capital Partners LP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
