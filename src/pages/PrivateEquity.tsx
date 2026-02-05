 import { Link } from "react-router-dom";
 import { ArrowLeft, CheckCircle2, Building, Users, TrendingUp, Target } from "lucide-react";
 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion";
 
 const criteria = [
   {
     icon: TrendingUp,
     title: "Obrat 1–10 mil. €",
     description: "Hľadáme firmy s ročným obratom v rozmedzí 1 až 10 miliónov eur.",
   },
   {
     icon: CheckCircle2,
     title: "Ziskovosť",
     description: "Firma musí byť zisková minimálne 2 roky po sebe s čistým ziskom nad 100 000 €.",
   },
   {
     icon: Building,
     title: "SK/CZ trh",
     description: "Zameriavame sa na slovenský a český trh s potenciálom regionálnej expanzie.",
   },
   {
     icon: Users,
     title: "Stabilný tím",
     description: "Preferujeme firmy so zabehnutým manažmentom a lojálnym tímom zamestnancov.",
   },
 ];
 
 const process = [
   {
     step: "01",
     title: "Prvotný kontakt",
     description: "Nezáväzná konzultácia o vašej firme a vašich cieľoch. Podpíšeme NDA pre ochranu citlivých informácií.",
   },
   {
     step: "02",
     title: "Due diligence",
     description: "Detailná analýza finančných výkazov, právnych záležitostí a obchodného modelu.",
   },
   {
     step: "03",
     title: "Ocenenie a ponuka",
     description: "Pripravíme férovú ponuku na základe trhového ocenenia a potenciálu firmy.",
   },
   {
     step: "04",
     title: "Uzavretie transakcie",
     description: "Finalizácia právnych dokumentov a prevod vlastníctva s možnosťou postupného odkúpenia.",
   },
 ];
 
 const faqs = [
   {
     question: "Aké typy firiem hľadáte?",
     answer: "Hľadáme zabehnuté, ziskové firmy s obratom 1–10 mil. € v rôznych odvetviach – výroba, služby, e-commerce, IT. Preferujeme firmy s jasným obchodným modelom a stabilnou zákazníckou základňou.",
   },
   {
     question: "Ako dlho trvá celý proces akvizície?",
     answer: "Štandardne 3–6 mesiacov od prvého kontaktu po uzavretie transakcie. Závisí to od komplexnosti firmy a pripravenosti dokumentácie.",
   },
   {
     question: "Čo sa stane so zamestnancami po akvizícii?",
     answer: "Zamestnanci sú kľúčovou hodnotou každej firmy. Naším cieľom je zachovať stabilný tím a prípadne ho ďalej rozvíjať. Nepristupujeme k hromadnému prepúšťaniu.",
   },
   {
     question: "Môžem ostať vo firme po predaji?",
     answer: "Áno, ponúkame rôzne modely spolupráce – od úplného odchodu až po pokračovanie v manažérskej pozícii alebo poradenstvo počas prechodného obdobia.",
   },
   {
     question: "Ako stanovujete cenu firmy?",
     answer: "Používame kombináciu metód – násobok EBITDA, diskontované cash flow a porovnanie s podobnými transakciami na trhu. Vždy hľadáme férovú cenu pre obe strany.",
   },
 ];
 
 const PrivateEquity = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main>
         {/* Hero Section */}
          <section className="min-h-[60vh] sm:min-h-[70vh] flex items-center pt-16 sm:pt-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <Link 
               to="/" 
                className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-wide uppercase text-muted-foreground hover:text-gold active:text-gold transition-colors mb-6 sm:mb-8 py-2"
             >
               <ArrowLeft className="w-4 h-4" /> Späť na hlavnú
             </Link>
             
             <div className="max-w-4xl">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4 sm:mb-6">
                 Private Equity
               </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-display-md lg:text-display-lg mb-6 sm:mb-8 leading-tight">
                 Akvizície <span className="text-gold">zabehnutých firiem</span>
               </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                 Hľadáme fungujúce, ziskové firmy na slovenskom a českom trhu. 
                 Ponúkame férovú cenu, diskrétny proces a rôzne modely spolupráce po akvizícii.
               </p>
             </div>
           </div>
         </section>
 
         {/* Criteria Section */}
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
              <div className="text-center mb-10 sm:mb-16">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4">
                 Investičné kritériá
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm">
                 Aké firmy <span className="text-gold">hľadáme</span>
               </h2>
             </div>
 
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
               {criteria.map((item, index) => (
                  <div key={index} className="bg-charcoal p-4 sm:p-6 lg:p-8 border border-border">
                    <item.icon className="w-7 h-7 sm:w-10 sm:h-10 text-gold mb-3 sm:mb-6" />
                    <h3 className="font-serif text-base sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">
                     {item.description}
                   </p>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Process Section */}
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
              <div className="text-center mb-10 sm:mb-16">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4">
                 Proces akvizície
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm">
                 Ako to <span className="text-gold">funguje</span>
               </h2>
             </div>
 
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
               {process.map((item, index) => (
                 <div key={index} className="relative">
                    <span className="font-serif text-4xl sm:text-6xl text-gold/20 absolute -top-2 sm:-top-4 -left-1 sm:-left-2">
                     {item.step}
                   </span>
                    <div className="pt-8 sm:pt-12">
                      <h3 className="font-serif text-base sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">
                       {item.description}
                     </p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* FAQ Section */}
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4">
                   Časté otázky
                 </p>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm">
                   Otázky pre <span className="text-gold">predávajúcich</span>
                 </h2>
               </div>
 
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                 {faqs.map((faq, index) => (
                   <AccordionItem 
                     key={index} 
                     value={`item-${index}`}
                      className="border border-border bg-charcoal px-4 sm:px-6"
                   >
                      <AccordionTrigger className="text-left font-serif text-base sm:text-lg hover:text-gold py-4 sm:py-5">
                       {faq.question}
                     </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base pb-4 sm:pb-5">
                       {faq.answer}
                     </AccordionContent>
                   </AccordionItem>
                 ))}
               </Accordion>
             </div>
           </div>
         </section>
 
         {/* Contact CTA */}
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <div className="max-w-3xl mx-auto text-center">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4 sm:mb-6">
                 Predávate firmu?
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm mb-6 sm:mb-8">
                 Kontaktujte <span className="text-gold">nás</span>
               </h2>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
                 Zaujíma vás nezáväzná konzultácia o predaji vašej firmy? 
                 Všetky informácie sú dôverné.
               </p>
               
               <div className="space-y-4">
                  <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-gold-muted">
                   Email
                 </p>
                 <a 
                   href="mailto:equity@assetra.sk" 
                    className="text-lg sm:text-xl md:text-2xl text-foreground hover:text-gold active:text-gold transition-colors inline-block py-1"
                 >
                   equity@assetra.sk
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
 
 export default PrivateEquity;