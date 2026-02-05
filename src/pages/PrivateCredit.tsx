 import { Link } from "react-router-dom";
 import { ArrowLeft, Shield, Clock, Percent, FileCheck, Building2, Briefcase } from "lucide-react";
 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion";
 
 const financingTypes = [
   {
     icon: Building2,
     title: "Realitné projekty",
     description: "Financovanie akvizícií, developmentu a rekonštrukcií nehnuteľností. Úvery zabezpečené záložným právom na nehnuteľnosť.",
     params: ["Výška: 100 000 – 2 000 000 €", "Splatnosť: 6–24 mesiacov", "LTV do 70%"],
   },
   {
     icon: Briefcase,
     title: "Podnikateľské úvery",
     description: "Financovanie prevádzkového kapitálu, akvizícií a expanzie pre ziskové spoločnosti. Zabezpečenie majetkom firmy alebo nehnuteľnosťou.",
     params: ["Výška: 50 000 – 1 000 000 €", "Splatnosť: 12–36 mesiacov", "Zabezpečenie aktívami"],
   },
 ];
 
 const benefits = [
   {
     icon: Clock,
     title: "Rýchle schválenie",
     description: "Rozhodnutie do 5 pracovných dní od doručenia kompletnej dokumentácie.",
   },
   {
     icon: Shield,
     title: "Flexibilné podmienky",
     description: "Individuálny prístup ku každému projektu. Možnosť predčasného splatenia bez poplatkov.",
   },
   {
     icon: Percent,
     title: "Transparentné náklady",
     description: "Žiadne skryté poplatky. Jasná úroková sadzba a harmonogram splátok od začiatku.",
   },
   {
     icon: FileCheck,
     title: "Minimálna byrokracia",
     description: "Jednoduchý proces schvaľovania. Zameriavame sa na podstatu projektu, nie na papierovanie.",
   },
 ];
 
 const process = [
   {
     step: "01",
     title: "Žiadosť",
     description: "Kontaktujte nás s popisom vášho projektu a požadovanej výšky financovania.",
   },
   {
     step: "02",
     title: "Analýza",
     description: "Vyhodnotíme váš projekt, zabezpečenie a schopnosť splácania.",
   },
   {
     step: "03",
     title: "Ponuka",
     description: "Pripravíme konkrétnu ponuku s úrokovou sadzbou a podmienkami.",
   },
   {
     step: "04",
     title: "Čerpanie",
     description: "Po podpise zmluvy a zriadení zabezpečenia uvoľníme financie.",
   },
 ];
 
 const faqs = [
   {
     question: "Aké zabezpečenie požadujete?",
     answer: "Štandardne požadujeme záložné právo na nehnuteľnosť (1. alebo 2. poradie) alebo záloh na obchodný podiel. V prípade podnikateľských úverov akceptujeme aj záloh na hnuteľný majetok firmy.",
   },
   {
     question: "Aká je maximálna výška úveru?",
     answer: "Pre realitné projekty poskytujeme financovanie do 2 000 000 €, pre podnikateľské úvery do 1 000 000 €. Pri väčších projektoch je možné individuálne posúdenie.",
   },
   {
     question: "Ako rýchlo môžem získať financie?",
     answer: "Pri kompletnej dokumentácii rozhodujeme do 5 pracovných dní. Čerpanie je možné do 2 týždňov od schválenia, v závislosti od rýchlosti zriadenia zabezpečenia.",
   },
   {
     question: "Aké sú úrokové sadzby?",
     answer: "Úrokové sadzby sa pohybujú od 10% do 18% p.a. v závislosti od typu projektu, kvality zabezpečenia a rizikovosti. Konkrétnu sadzbu stanovíme po posúdení žiadosti.",
   },
   {
     question: "Môžem splatiť úver predčasne?",
     answer: "Áno, predčasné splatenie je možné kedykoľvek bez poplatkov. Úroky sa počítajú len za obdobie skutočného čerpania.",
   },
   {
     question: "Financujete aj fyzické osoby?",
     answer: "Nie, poskytujeme financovanie výlučne právnickým osobám – spoločnostiam s ručením obmedzeným a akciovým spoločnostiam.",
   },
 ];
 
 const PrivateCredit = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main>
         {/* Hero Section */}
         <section className="min-h-[70vh] flex items-center pt-20">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <Link 
               to="/" 
               className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-muted-foreground hover:text-gold transition-colors mb-8"
             >
               <ArrowLeft className="w-4 h-4" /> Späť na hlavnú
             </Link>
             
             <div className="max-w-4xl">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
                 Private Credit
               </p>
               <h1 className="font-serif text-4xl md:text-display-md lg:text-display-lg mb-8 leading-tight">
                 Zabezpečené <span className="text-gold">úvery</span>
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                 Poskytujeme financovanie pre právnické osoby a realitné projekty. 
                 Rýchle schválenie, flexibilné podmienky a transparentné náklady.
               </p>
             </div>
           </div>
         </section>
 
         {/* Financing Types */}
         <section className="py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="text-center mb-16">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4">
                 Typy financovania
               </p>
               <h2 className="font-serif text-3xl md:text-display-sm">
                 Čo <span className="text-gold">financujeme</span>
               </h2>
             </div>
 
             <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
               {financingTypes.map((type, index) => (
                 <div key={index} className="bg-charcoal p-8 lg:p-10 border border-border">
                   <type.icon className="w-12 h-12 text-gold mb-6" />
                   <h3 className="font-serif text-2xl mb-4">{type.title}</h3>
                   <p className="text-muted-foreground font-light leading-relaxed mb-6">
                     {type.description}
                   </p>
                   <ul className="space-y-2">
                     {type.params.map((param, i) => (
                       <li key={i} className="text-sm text-gold-muted">
                         • {param}
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Benefits */}
         <section className="py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="text-center mb-16">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4">
                 Prečo my
               </p>
               <h2 className="font-serif text-3xl md:text-display-sm">
                 Výhody <span className="text-gold">spolupráce</span>
               </h2>
             </div>
 
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {benefits.map((benefit, index) => (
                 <div key={index} className="text-center">
                   <benefit.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                   <h3 className="font-serif text-lg mb-3">{benefit.title}</h3>
                   <p className="text-muted-foreground font-light text-sm leading-relaxed">
                     {benefit.description}
                   </p>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Process */}
         <section className="py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="text-center mb-16">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4">
                 Proces schvaľovania
               </p>
               <h2 className="font-serif text-3xl md:text-display-sm">
                 Ako to <span className="text-gold">funguje</span>
               </h2>
             </div>
 
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {process.map((item, index) => (
                 <div key={index} className="relative">
                   <span className="font-serif text-6xl text-gold/20 absolute -top-4 -left-2">
                     {item.step}
                   </span>
                   <div className="pt-12">
                     <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                     <p className="text-muted-foreground font-light text-sm leading-relaxed">
                       {item.description}
                     </p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* FAQ Section */}
         <section className="py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="max-w-3xl mx-auto">
               <div className="text-center mb-12">
                 <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4">
                   Časté otázky
                 </p>
                 <h2 className="font-serif text-3xl md:text-display-sm">
                   Otázky o <span className="text-gold">financovaní</span>
                 </h2>
               </div>
 
               <Accordion type="single" collapsible className="space-y-4">
                 {faqs.map((faq, index) => (
                   <AccordionItem 
                     key={index} 
                     value={`item-${index}`}
                     className="border border-border bg-charcoal px-6"
                   >
                     <AccordionTrigger className="text-left font-serif text-lg hover:text-gold">
                       {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground font-light leading-relaxed">
                       {faq.answer}
                     </AccordionContent>
                   </AccordionItem>
                 ))}
               </Accordion>
             </div>
           </div>
         </section>
 
         {/* Contact CTA */}
         <section className="py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-6 md:px-8 lg:px-16">
             <div className="max-w-3xl mx-auto text-center">
               <p className="text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
                 Potrebujete financovanie?
               </p>
               <h2 className="font-serif text-3xl md:text-display-sm mb-8">
                 Kontaktujte <span className="text-gold">nás</span>
               </h2>
               <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                 Pošlite nám popis vášho projektu a my sa vám ozveme s konkrétnou ponukou.
               </p>
               
               <div className="space-y-4">
                 <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted">
                   Email
                 </p>
                 <a 
                   href="mailto:credit@assetra.sk" 
                   className="text-xl md:text-2xl text-foreground hover:text-gold transition-colors"
                 >
                   credit@assetra.sk
                 </a>
               </div>
             </div>
           </div>
         </section>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default PrivateCredit;