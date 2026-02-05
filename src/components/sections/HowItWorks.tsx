import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  return (
     <section id="ako-to-funguje" className="py-12 sm:py-20 md:py-32 lg:py-48">
       <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-10 sm:mb-12 md:mb-20">
             <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              Investičný model
            </p>
             <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md">
              Ako váš kapitál <span className="text-gold">pracuje</span>
            </h2>
          </div>
          
           <div className="space-y-6 sm:space-y-10 md:space-y-16">
             <div className="flex gap-4 sm:gap-5 md:gap-8">
               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border border-gold flex items-center justify-center">
                 <span className="font-serif text-lg sm:text-xl md:text-2xl text-gold">1</span>
              </div>
              <div>
                 <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">Investujete</h3>
                 <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
                  Záväzujete kapitál na definované obdobie (zvyčajne 12–18 mesiacov). Vaše investičné podmienky — výnosová sadzba, výplatný kalendár a trvanie — sú fixované pri podpise zmluvy.
                </p>
              </div>
            </div>
            
             <div className="flex gap-4 sm:gap-5 md:gap-8">
               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center">
                 <span className="font-serif text-lg sm:text-xl md:text-2xl text-muted-foreground">2</span>
              </div>
              <div>
                 <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">Kupujeme nehnuteľnosť</h3>
                 <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
                  Váš kapitál financuje nákup starostlivo vybraných nehnuteľností. Akvizujeme iba aktíva s cenou minimálne 20% pod trhovou hodnotou, čím zabezpečujeme vstavanú maržu pre vaše výnosy a naše operácie.
                </p>
              </div>
            </div>
            
             <div className="flex gap-4 sm:gap-5 md:gap-8">
               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center">
                 <span className="font-serif text-lg sm:text-xl md:text-2xl text-muted-foreground">3</span>
              </div>
              <div>
                 <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">Rekonštrukcia a predaj</h3>
                 <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
                  Nehnuteľnosť rekonštruujeme na trhový štandard a predávame za férovú trhovú cenu. Zisková marža pokrýva váš fixný výnos, prevádzkové náklady a náš zisk.
                </p>
              </div>
            </div>
            
             <div className="flex gap-4 sm:gap-5 md:gap-8">
               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border border-gold flex items-center justify-center">
                 <span className="font-serif text-lg sm:text-xl md:text-2xl text-gold">4</span>
              </div>
              <div>
                 <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">Dostávate výnosy</h3>
                 <p className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed">
                  Počas celého investičného obdobia dostávate mesačné výplaty. Na konci cyklu sa vám vráti celá istina. Potom sa môžete rozhodnúť reinvestovať alebo kapitál kompletne vybrať.
                </p>
              </div>
            </div>
          </div>

           <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <Button 
              asChild
               className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base"
            >
              <a href="#kontakt">Začať investovať</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
