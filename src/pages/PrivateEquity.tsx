 import { Link } from "react-router-dom";
 import { ArrowLeft, CheckCircle2, Building, Users, TrendingUp } from "lucide-react";
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
     .min(1, { message: "Názov firmy je povinný" })
     .max(200, { message: "Názov firmy môže mať maximálne 200 znakov" }),
   companyTurnover: z
     .string()
     .trim()
     .optional()
     .or(z.literal("")),
   message: z
     .string()
     .trim()
     .max(1000, { message: "Správa môže mať maximálne 1000 znakov" })
     .optional()
     .or(z.literal("")),
 });
 
 type ContactFormData = z.infer<typeof contactSchema>;
 
 const PrivateEquity = () => {
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
     
     console.log("Private Equity form submitted:", {
       name: data.name,
       email: data.email,
       hasPhone: !!data.phone,
       companyName: data.companyName,
       companyTurnover: data.companyTurnover,
       messageLength: data.message?.length || 0,
     });
     
     toast.success("Žiadosť bola odoslaná", {
       description: "Budeme vás kontaktovať do 48 hodín.",
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
         <section id="kontakt" className="py-12 sm:py-20 md:py-32 border-t border-border">
           <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
             <div className="max-w-5xl mx-auto">
               <div className="text-center mb-8 sm:mb-12">
                <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-4 sm:mb-6">
                 Predávate firmu?
               </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm mb-6 sm:mb-8">
                 Kontaktujte <span className="text-gold">nás</span>
               </h2>
                 <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                   Vyplňte formulár a náš tím sa vám ozve do 48 hodín. Všetky informácie sú prísne dôverné.
               </p>
               </div>
 
               <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                 {/* Contact Form */}
                 <div className="bg-charcoal p-6 md:p-8 lg:p-10 border border-border">
                   <h3 className="font-serif text-xl md:text-2xl mb-6 md:mb-8">
                     Žiadosť o konzultáciu
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
                         Názov firmy *
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
 
                     <div>
                       <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                         Ročný obrat firmy
                       </label>
                       <select
                         {...register("companyTurnover")}
                         className="flex h-11 md:h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                       >
                         <option value="">Vyberte rozsah</option>
                         <option value="do-1m">Do 1 mil. €</option>
                         <option value="1-3m">1 – 3 mil. €</option>
                         <option value="3-5m">3 – 5 mil. €</option>
                         <option value="5-10m">5 – 10 mil. €</option>
                         <option value="nad-10m">Nad 10 mil. €</option>
                       </select>
                       {errors.companyTurnover && (
                         <p className="text-destructive text-xs md:text-sm mt-1">{errors.companyTurnover.message}</p>
                       )}
                     </div>
 
                     <div>
                       <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                         Správa
                       </label>
                       <Textarea
                         {...register("message")}
                         placeholder="Opíšte vašu firmu a dôvod predaja..."
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
                           href="mailto:equity@assetra.sk" 
                           className="text-lg md:text-xl text-foreground hover:text-gold transition-colors"
                         >
                           equity@assetra.sk
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
                       Akvizičné kritériá
                     </p>
                     <div className="grid grid-cols-2 gap-4 md:gap-6 text-center">
                       <div>
                         <p className="font-serif text-xl md:text-2xl text-gold mb-1">1–10 mil. €</p>
                         <p className="text-xs text-muted-foreground">Ročný obrat</p>
                       </div>
                       <div>
                         <p className="font-serif text-xl md:text-2xl text-gold mb-1">2+ roky</p>
                         <p className="text-xs text-muted-foreground">Ziskovosť</p>
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
 
 export default PrivateEquity;