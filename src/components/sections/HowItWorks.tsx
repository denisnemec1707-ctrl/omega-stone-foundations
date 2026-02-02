const HowItWorks = () => {
  return (
    <section id="ako-to-funguje" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
              Investičný model
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md mb-8">
              Ako váš kapitál <span className="text-gold">pracuje</span>
            </h2>
          </div>
          
          <div className="space-y-16">
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gold flex items-center justify-center">
                <span className="font-serif text-2xl text-gold">1</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">Investujete</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Záväzujete kapitál na definované obdobie (zvyčajne 12–18 mesiacov). Vaše investičné podmienky — výnosová sadzba, výplatný kalendár a trvanie — sú fixované pri podpise zmluvy.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-border flex items-center justify-center">
                <span className="font-serif text-2xl text-muted-foreground">2</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">Kupujeme nehnuteľnosť</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Váš kapitál financuje nákup starostlivo vybraných nehnuteľností. Akvizujeme iba aktíva s cenou minimálne 20% pod trhovou hodnotou, čím zabezpečujeme vstavanú maržu pre vaše výnosy a naše operácie.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-border flex items-center justify-center">
                <span className="font-serif text-2xl text-muted-foreground">3</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">Rekonštrukcia a predaj</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Nehnuteľnosť rekonštruujeme na trhový štandard a predávame za férovú trhovú cenu. Zisková marža pokrýva váš fixný výnos, prevádzkové náklady a náš zisk.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gold flex items-center justify-center">
                <span className="font-serif text-2xl text-gold">4</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-4">Dostávate výnosy</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Počas celého investičného obdobia dostávate mesačné výplaty. Na konci cyklu sa vám vráti celá istina. Potom sa môžete rozhodnúť reinvestovať alebo kapitál kompletne vybrať.
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
