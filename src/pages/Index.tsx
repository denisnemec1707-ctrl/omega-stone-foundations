 import { Link } from "react-router-dom";
 import { ArrowRight, Building2, Briefcase, Landmark } from "lucide-react";
 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
         {/* Hero Section */}
         <section className="min-h-[90vh] flex items-center justify-center pt-20">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="max-w-4xl mx-auto text-center">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
                 Súkromná investičná spoločnosť
               </p>
               <h1 className="font-serif text-4xl md:text-display-md lg:text-display-lg mb-8 leading-tight">
                 ASSETRA <span className="text-gold">investments</span>
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-12">
                 Investujeme do nehnuteľností, akvizícií zabehnutých firiem a poskytujeme zabezpečené úvery. 
                 Naša stratégia je založená na konzervativnom prístupe s dôrazom na ochranu kapitálu.
               </p>
             </div>
           </div>
         </section>
 
         {/* Three Verticals Section */}
         <section className="py-20 md:py-32">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="text-center mb-16">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4">
                 Naše investičné vertikály
               </p>
               <h2 className="font-serif text-3xl md:text-display-sm lg:text-display-md">
                 Tri piliere <span className="text-gold">rastu</span>
               </h2>
             </div>
 
             <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
               {/* Real Estate */}
               <Link 
                 to="/real-estate" 
                 className="group bg-charcoal p-8 lg:p-10 border border-border hover:border-gold/30 transition-all duration-300"
               >
                 <Building2 className="w-10 h-10 text-gold mb-6" />
                 <h3 className="font-serif text-2xl mb-4 group-hover:text-gold transition-colors">
                   Real Estate
                 </h3>
                 <p className="text-muted-foreground font-light leading-relaxed mb-6">
                   Nakupujeme nehnuteľnosti pod trhovú hodnotu prostredníctvom realitného flippingu. 
                   Špecializujeme sa na problémové nehnuteľnosti, ktorým pridávame hodnotu a následne predávame.
                 </p>
                 <span className="inline-flex items-center text-sm tracking-wide uppercase text-gold group-hover:gap-3 gap-2 transition-all">
                   Zistiť viac <ArrowRight className="w-4 h-4" />
                 </span>
               </Link>
 
               {/* Private Equity */}
               <Link 
                 to="/private-equity" 
                 className="group bg-charcoal p-8 lg:p-10 border border-border hover:border-gold/30 transition-all duration-300"
               >
                 <Briefcase className="w-10 h-10 text-gold mb-6" />
                 <h3 className="font-serif text-2xl mb-4 group-hover:text-gold transition-colors">
                   Private Equity
                 </h3>
                 <p className="text-muted-foreground font-light leading-relaxed mb-6">
                   Vyhľadávame fungujúce, zabehnuté firmy na slovenskom a českom trhu vhodné na odkúpenie. 
                   Hľadáme príležitosti s jasným potenciálom rastu.
                 </p>
                 <span className="inline-flex items-center text-sm tracking-wide uppercase text-gold group-hover:gap-3 gap-2 transition-all">
                   Zistiť viac <ArrowRight className="w-4 h-4" />
                 </span>
               </Link>
 
               {/* Private Credit */}
               <Link 
                 to="/private-credit" 
                 className="group bg-charcoal p-8 lg:p-10 border border-border hover:border-gold/30 transition-all duration-300"
               >
                 <Landmark className="w-10 h-10 text-gold mb-6" />
                 <h3 className="font-serif text-2xl mb-4 group-hover:text-gold transition-colors">
                   Private Credit
                 </h3>
                 <p className="text-muted-foreground font-light leading-relaxed mb-6">
                   Financujeme právnické osoby a realitné projekty zabezpečenými úvermi. 
                   Ponúkame flexibilné podmienky s dôrazom na bezpečnosť investície.
                 </p>
                 <span className="inline-flex items-center text-sm tracking-wide uppercase text-gold group-hover:gap-3 gap-2 transition-all">
                   Zistiť viac <ArrowRight className="w-4 h-4" />
                 </span>
               </Link>
             </div>
           </div>
         </section>
 
         {/* About Section */}
         <section className="py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="max-w-4xl mx-auto text-center">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
                 O spoločnosti
               </p>
               <h2 className="font-serif text-3xl md:text-display-sm mb-8">
                 Konzervativný prístup k <span className="text-gold">investíciám</span>
               </h2>
               <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
                 ASSETRA investments je súkromná investičná spoločnosť so sídlom na Slovensku. 
                 Naša filozofia je založená na ochrane kapitálu a generovaní stabilných výnosov 
                 prostredníctvom reálnych aktív a overených investičných stratégií.
               </p>
               <p className="text-muted-foreground font-light leading-relaxed">
                 Každá investícia je zabezpečená reálnymi aktívami – nehnuteľnosťami, podielmi vo firmách 
                 alebo záložným právom. Transparentnosť a bezpečnosť sú našimi hlavnými hodnotami.
               </p>
             </div>
           </div>
         </section>
 
         {/* Contact CTA */}
         <section id="kontakt" className="py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="max-w-3xl mx-auto text-center">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
                 Kontaktujte nás
               </p>
               <h2 className="font-serif text-3xl md:text-display-sm mb-8">
                 Začnime <span className="text-gold">spoluprácu</span>
               </h2>
               <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                 Či už máte záujem o investovanie, predaj firmy alebo financovanie vášho projektu, 
                 radi sa s vami spojíme.
               </p>
               
               <div className="space-y-6">
                 <div>
                   <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                     Email
                   </p>
                   <a 
                     href="mailto:info@assetra.sk" 
                     className="text-xl md:text-2xl text-foreground hover:text-gold transition-colors"
                   >
                     info@assetra.sk
                   </a>
                 </div>
                 
                 <div>
                   <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                     Sídlo
                   </p>
                   <p className="text-xl md:text-2xl text-foreground">
                     Bratislava, Slovensko
                   </p>
                 </div>
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
