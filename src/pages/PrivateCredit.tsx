 import { Link } from "react-router-dom";
 import { ArrowLeft, Shield, Clock, Percent, FileCheck, Building2, Briefcase } from "lucide-react";
 import { useState } from "react";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { toast } from "sonner";
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
 
 const contactSchema = z.object({
   name: z
     .string()
     .trim()
     .min(1, { message: "Meno je povinné" })
     .max(100, { message: "Meno môže mať maximálne 100 znakov" }),
   email: z
     .string()
     .trim()
     .email({ message: "Neplatná emailová adresa" })
     .max(255, { message: "Email môže mať maximálne 255 znakov" }),
   phone: z
     .string()
     .trim()
     .max(20, { message: "Telefón môže mať maximálne 20 znakov" })
     .optional()
     .or(z.literal("")),
   companyName: z
     .string()
     .trim()
     .min(1, { message: "Názov spoločnosti je povinný" })
     .max(200, { message: "Názov spoločnosti môže mať maximálne 200 znakov" }),
   loanAmount: z
     .string()
     .trim()
     .optional()
     .or(z.literal("")),
   projectType: z
     .string()
     .trim()
     .optional()
     .or(z.literal("")),
   message: z
     .string()
     .trim()
     .min(1, { message: "Popis projektu je povinný" })
     .max(1000, { message: "Správa môže mať maximálne 1000 znakov" }),
 });
 
 type ContactFormData = z.infer<typeof contactSchema>;
 
 const PrivateCredit = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm<ContactFormData>({
     resolver: zodResolver(contactSchema),
   });
 
   const onSubmit = async (data: ContactFormData) => {
     setIsSubmitting(true);
     
     await new Promise((resolve) => setTimeout(resolve, 1000));
     
     console.log("Private Credit form submitted:", {
       name: data.name,
       email: data.email,
       hasPhone: !!data.phone,
       companyName: data.companyName,
       loanAmount: data.loanAmount,
       projectType: data.projectType,
       messageLength: data.message.length,
     });
     
     toast.success("Žiadosť bola odoslaná", {
       description: "Budeme vás kontaktovať do 5 pracovných dní.",
     });
     
     reset();
     setIsSubmitting(false);
   };
 
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
                 Private Credit
               </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-display-md lg:text-display-lg mb-6 sm:mb-8 leading-tight">
                 Zabezpečené <span className="text-gold">úvery</span>
               </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                 Poskytujeme financovanie pre právnické osoby a realitné projekty. 
                 Rýchle schválenie, flexibilné podmienky a transparentné náklady.
               </p>
             </div>
           </div>
         </section>
 
         {/* Financing Types */}
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
              <div className="text-center mb-10 sm:mb-16">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4">
                 Typy financovania
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm">
                 Čo <span className="text-gold">financujeme</span>
               </h2>
             </div>
 
              <div className="grid md:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
               {financingTypes.map((type, index) => (
                  <div key={index} className="bg-card p-5 sm:p-8 lg:p-10 border border-border shadow-sm">
                    <type.icon className="w-10 h-10 sm:w-12 sm:h-12 text-gold mb-4 sm:mb-6" />
                    <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">{type.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-4 sm:mb-6">
                     {type.description}
                   </p>
                   <ul className="space-y-2">
                     {type.params.map((param, i) => (
                        <li key={i} className="text-xs sm:text-sm text-gold-muted">
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
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
              <div className="text-center mb-10 sm:mb-16">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4">
                 Prečo my
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm">
                 Výhody <span className="text-gold">spolupráce</span>
               </h2>
             </div>
 
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
               {benefits.map((benefit, index) => (
                  <div key={index} className="text-center p-2 sm:p-0">
                    <benefit.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gold mx-auto mb-3 sm:mb-4" />
                    <h3 className="font-serif text-base sm:text-lg mb-2 sm:mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">
                     {benefit.description}
                   </p>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Process */}
          <section className="py-12 sm:py-20 md:py-32 border-t border-border">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
              <div className="text-center mb-10 sm:mb-16">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4">
                 Proces schvaľovania
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
                   Otázky o <span className="text-gold">financovaní</span>
                 </h2>
               </div>
 
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                 {faqs.map((faq, index) => (
                   <AccordionItem 
                     key={index} 
                     value={`item-${index}`}
                      className="border border-border bg-card px-4 sm:px-6 shadow-sm"
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
         <section id="kontakt" className="py-12 sm:py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <div className="max-w-5xl mx-auto">
               <div className="text-center mb-8 sm:mb-12">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4 sm:mb-6">
                 Potrebujete financovanie?
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm mb-6 sm:mb-8">
                 Kontaktujte <span className="text-gold">nás</span>
               </h2>
                 <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                   Opíšte váš projekt a my vám pripravíme nezáväznú ponuku financovania do 5 pracovných dní.
               </p>
               </div>
 
               <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                 {/* Contact Form */}
                  <div className="bg-charcoal p-6 md:p-8 lg:p-10">
                    <h3 className="font-serif text-xl md:text-2xl mb-6 md:mb-8 text-white">
                      Žiadosť o financovanie
                    </h3>
                   
                   <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                     <div>
                       <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                         Meno a priezvisko *
                       </label>
                       <Input
                         {...register("name")}
                         placeholder="Ján Novák"
                         className="bg-background border-border focus:border-gold h-11 md:h-12"
                       />
                       {errors.name && (
                         <p className="text-destructive text-xs md:text-sm mt-1">{errors.name.message}</p>
                       )}
                     </div>
 
                     <div>
                       <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                         Email *
                       </label>
                       <Input
                         {...register("email")}
                         type="email"
                         placeholder="jan.novak@email.sk"
                         className="bg-background border-border focus:border-gold h-11 md:h-12"
                       />
                       {errors.email && (
                         <p className="text-destructive text-xs md:text-sm mt-1">{errors.email.message}</p>
                       )}
                     </div>
 
                     <div>
                       <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                         Telefón
                       </label>
                       <Input
                         {...register("phone")}
                         type="tel"
                         placeholder="+421 900 000 000"
                         className="bg-background border-border focus:border-gold h-11 md:h-12"
                       />
                       {errors.phone && (
                         <p className="text-destructive text-xs md:text-sm mt-1">{errors.phone.message}</p>
                       )}
                     </div>
 
                     <div>
                       <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                         Názov spoločnosti *
                       </label>
                       <Input
                         {...register("companyName")}
                         placeholder="Vaša spoločnosť s.r.o."
                         className="bg-background border-border focus:border-gold h-11 md:h-12"
                       />
                       {errors.companyName && (
                         <p className="text-destructive text-xs md:text-sm mt-1">{errors.companyName.message}</p>
                       )}
                     </div>
 
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                           Požadovaná suma
                         </label>
                         <select
                           {...register("loanAmount")}
                           className="flex h-11 md:h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                         >
                           <option value="">Vyberte</option>
                           <option value="50-100k">50 – 100 tis. €</option>
                           <option value="100-300k">100 – 300 tis. €</option>
                           <option value="300-500k">300 – 500 tis. €</option>
                           <option value="500k-1m">500 tis. – 1 mil. €</option>
                           <option value="nad-1m">Nad 1 mil. €</option>
                         </select>
                       </div>
 
                       <div>
                         <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                           Typ projektu
                         </label>
                         <select
                           {...register("projectType")}
                           className="flex h-11 md:h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                         >
                           <option value="">Vyberte</option>
                           <option value="realitny">Realitný projekt</option>
                           <option value="podnikatelsky">Podnikateľský úver</option>
                           <option value="akvizicia">Akvizičné financovanie</option>
                           <option value="iny">Iný</option>
                         </select>
                       </div>
                     </div>
 
                     <div>
                       <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                         Popis projektu *
                       </label>
                       <Textarea
                         {...register("message")}
                         placeholder="Opíšte váš projekt, účel financovania a dostupné zabezpečenie..."
                         rows={4}
                         className="bg-background border-border focus:border-gold resize-none"
                       />
                       {errors.message && (
                         <p className="text-destructive text-xs md:text-sm mt-1">{errors.message.message}</p>
                       )}
                     </div>
 
                     <Button
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full bg-gold hover:bg-gold/90 text-background font-medium tracking-wide uppercase h-12 md:h-14 text-sm md:text-base"
                     >
                       {isSubmitting ? "Odosielam..." : "Odoslať žiadosť"}
                     </Button>
                   </form>
                 </div>
 
                 {/* Contact Info */}
                 <div className="flex flex-col justify-between">
                   <div>
                     <h3 className="font-serif text-xl md:text-2xl mb-6 md:mb-8">
                       Priamy kontakt
                     </h3>
                     
                     <div className="space-y-6 md:space-y-8">
                       <div>
                         <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                           Email
                         </p>
                         <a 
                           href="mailto:credit@assetra.sk" 
                           className="text-lg md:text-xl text-foreground hover:text-gold transition-colors"
                         >
                           credit@assetra.sk
                         </a>
                       </div>
                       
                       <div>
                         <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                           Kancelária
                         </p>
                         <p className="text-lg md:text-xl text-foreground">
                           Bratislava, Slovensko
                         </p>
                       </div>
                     </div>
                   </div>
 
                   <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-border">
                     <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
                       Parametre financovania
                     </p>
                     <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                       <div>
                         <p className="font-serif text-xl md:text-2xl text-gold mb-1">50k – 2M €</p>
                         <p className="text-xs text-muted-foreground">Výška úveru</p>
                       </div>
                       <div>
                         <p className="font-serif text-xl md:text-2xl text-gold mb-1">10–18%</p>
                         <p className="text-xs text-muted-foreground">Úrok p.a.</p>
                       </div>
                       <div>
                         <p className="font-serif text-xl md:text-2xl text-gold mb-1">6–36</p>
                         <p className="text-xs text-muted-foreground">Mesiacov</p>
                       </div>
                     </div>
                   </div>
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
 
 export default PrivateCredit;