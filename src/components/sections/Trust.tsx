const Trust = () => {
  return (
    <section id="dovera" className="py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
              Riadenie rizík
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md mb-8">
              Ochrana kapitálu <span className="text-gold">na prvom mieste</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed">
              Každú transakciu štruktúrujeme s bezpečnosťou vášho kapitálu ako primárnou prioritou.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="border-l border-gold pl-8">
              <h3 className="font-serif text-2xl mb-4">Konzervatívna akvizícia</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Kupujeme iba nehnuteľnosti s cenou 20% alebo viac pod trhovou hodnotou. Táto marža chráni pred trhovými výkyvmi a zabezpečuje ziskovosť aj v nepriaznivých podmienkach.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Zabezpečenie reálnymi aktívami</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Každá investícia je krytá fyzickými nehnuteľnosťami. Na rozdiel od finančných nástrojov si nehnuteľnosť zachováva vnútornú hodnotu bez ohľadu na trhový sentiment.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Krátke cykly</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Investičné obdobia 12–18 mesiacov limitujú expozíciu voči dlhodobým trhovým zmenám. Kapitál sa vracia a môže byť reinvestovaný alebo vybraný v pravidelných intervaloch.
              </p>
            </div>
            
            <div className="border-l border-border pl-8">
              <h3 className="font-serif text-2xl mb-4">Prevádzkové skúsenosti</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Náš tím dokončil desiatky akvizično-rekonštrukčno-predajných cyklov. Rozumieme slovenskému realitnému trhu, miestnym predpisom a ekonomike rekonštrukcií.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border text-center">
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">50+</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Dokončených projektov</p>
            </div>
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">0</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Vynechaných výplat</p>
            </div>
            <div>
              <p className="font-serif text-display-sm text-gold mb-2">100%</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">Vrátená istina</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
