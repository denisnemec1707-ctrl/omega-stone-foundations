 import { Link } from "react-router-dom";
 import { ArrowRight, Building2, Briefcase, Landmark, Shield, TrendingUp } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
         {/* Hero Section */}
          <section className="min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center pt-20 sm:pt-24">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16 pb-8 sm:pb-12">
             <div className="max-w-4xl mx-auto text-center">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4 sm:mb-6">
                 Súkromná investičná spoločnosť
               </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-display-md lg:text-display-lg mb-6 sm:mb-8 leading-tight">
                 ASSETRA <span className="text-gold">investments</span>
               </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
                 Investujeme do nehnuteľností, akvizícií zabehnutých firiem a poskytujeme zabezpečené úvery. 
                 Naša stratégia je založená na konzervativnom prístupe s dôrazom na ochranu kapitálu.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                 <Button 
                   asChild
                   className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base"
                 >
                   <Link to="/real-estate#kontakt">Investovať do nehnuteľností</Link>
                 </Button>
                 <Button 
                   asChild
                   variant="outline"
                   className="border-border hover:border-gold hover:text-gold active:border-gold active:text-gold font-medium tracking-wide uppercase h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm md:text-base"
                 >
                   <Link to="/real-estate#preco-investovat">Zistiť viac o investíciách</Link>
                 </Button>
               </div>
             </div>
           </div>
         </section>
 
         {/* Three Verticals Section */}
          <section className="py-8 sm:py-16 md:py-24">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
              <div className="text-center mb-10 sm:mb-16">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4">
                 Naše investičné vertikály
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md">
                 Tri piliere <span className="text-gold">rastu</span>
               </h2>
             </div>
 
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
              {/* Real Estate */}
              <Link 
                to="/real-estate" 
                className="group bg-card p-6 sm:p-8 lg:p-10 border border-border hover:border-primary shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
                <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  Real Estate
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-4 sm:mb-6">
                  Nakupujeme nehnuteľnosti pod trhovú hodnotu prostredníctvom realitného flippingu. 
                  Špecializujeme sa na problémové nehnuteľnosti, ktorým pridávame hodnotu a následne predávame.
                </p>
                <span className="inline-flex items-center text-xs sm:text-sm tracking-wide uppercase text-primary group-hover:gap-3 gap-2 transition-all py-2">
                  Zistiť viac <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
 
              {/* Private Equity */}
              <Link 
                to="/private-equity" 
                className="group bg-card p-6 sm:p-8 lg:p-10 border border-border hover:border-primary shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
                <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  Private Equity
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-4 sm:mb-6">
                  Vyhľadávame fungujúce, zabehnuté firmy na slovenskom a českom trhu vhodné na odkúpenie. 
                  Hľadáme príležitosti s jasným potenciálom rastu.
                </p>
                <span className="inline-flex items-center text-xs sm:text-sm tracking-wide uppercase text-primary group-hover:gap-3 gap-2 transition-all py-2">
                  Zistiť viac <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
 
              {/* Private Credit */}
              <Link 
                to="/private-credit" 
                className="group bg-card p-6 sm:p-8 lg:p-10 border border-border hover:border-primary shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
                <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  Private Credit
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-4 sm:mb-6">
                  Financujeme právnické osoby a realitné projekty zabezpečenými úvermi. 
                  Ponúkame flexibilné podmienky s dôrazom na bezpečnosť investície.
                </p>
                <span className="inline-flex items-center text-xs sm:text-sm tracking-wide uppercase text-primary group-hover:gap-3 gap-2 transition-all py-2">
                  Zistiť viac <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
             </div>
           </div>
         </section>
 
         {/* Investment CTA Banner */}
         <section className="py-12 sm:py-16 md:py-20 bg-charcoal border-y border-border">
           <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <div className="max-w-4xl mx-auto text-center">
               <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                 <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                 <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted">
                   Zabezpečené investície
                 </p>
               </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm mb-4 sm:mb-6 text-foreground">
                  Fixný výnos <span className="text-gold">10% ročne</span>
                </h2>
               <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
                 Mesačné vyplácanie výnosov • Investícia zabezpečená reálnymi nehnuteľnosťami • Minimálna investícia od 10 000 €
               </p>
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                 <Button 
                   asChild
                   className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-11 md:h-12 px-6 sm:px-8 text-sm"
                 >
                   <Link to="/real-estate#kontakt">Začať investovať</Link>
                 </Button>
                 <Button 
                   asChild
                   variant="outline"
                   className="border-border hover:border-gold hover:text-gold active:border-gold active:text-gold font-medium tracking-wide uppercase h-11 md:h-12 px-6 sm:px-8 text-sm"
                 >
                   <Link to="/real-estate#kalkulacka">Vypočítať výnos</Link>
                 </Button>
               </div>
             </div>
           </div>
         </section>

         {/* About Section */}
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <div className="max-w-4xl mx-auto text-center">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4 sm:mb-6">
                 O spoločnosti
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm mb-6 sm:mb-8">
                 Konzervativný prístup k <span className="text-gold">investíciám</span>
               </h2>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
                 ASSETRA investments je súkromná investičná spoločnosť so sídlom na Slovensku. 
                 Naša filozofia je založená na ochrane kapitálu a generovaní stabilných výnosov 
                 prostredníctvom reálnych aktív a overených investičných stratégií.
               </p>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed px-2 sm:px-0">
                 Každá investícia je zabezpečená reálnymi aktívami – nehnuteľnosťami, podielmi vo firmách 
                 alebo záložným právom. Transparentnosť a bezpečnosť sú našimi hlavnými hodnotami.
               </p>
               
               <div className="mt-8 sm:mt-10">
                 <Button 
                   asChild
                   variant="outline"
                   className="border-border hover:border-gold hover:text-gold active:border-gold active:text-gold font-medium tracking-wide uppercase h-11 md:h-12 px-6 sm:px-8 text-sm"
                 >
                   <Link to="/real-estate">Preskúmať investičné možnosti</Link>
                 </Button>
               </div>
             </div>
           </div>
         </section>
 
         {/* Contact CTA */}
          <section id="kontakt" className="py-12 sm:py-20 md:py-32 border-t border-border bg-charcoal">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <div className="max-w-3xl mx-auto text-center">
               <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                 <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                 <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted">
                   Začnite investovať
               </p>
               </div>
                 <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm mb-6 sm:mb-8 text-foreground">
                  Máte záujem o <span className="text-gold">investovanie?</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
                 Zistite viac o našich zabezpečených investíciách do nehnuteľností s fixným výnosom 10% ročne.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                 <Button 
                   asChild
                   className="bg-gold hover:bg-gold/90 active:bg-gold/80 text-background font-medium tracking-wide uppercase h-12 md:h-14 px-8 sm:px-10 text-sm md:text-base"
                 >
                   <Link to="/real-estate#kontakt">Chcem investovať</Link>
                 </Button>
                 <Button 
                   asChild
                   variant="outline"
                   className="border-border hover:border-gold hover:text-gold active:border-gold active:text-gold font-medium tracking-wide uppercase h-12 md:h-14 px-8 sm:px-10 text-sm md:text-base"
                 >
                   <Link to="/real-estate">Dozvedieť sa viac</Link>
                 </Button>
               </div>
             </div>
           </div>
         </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
