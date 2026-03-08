import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import verticalCredit from "@/assets/vertical-credit.jpg";

const faqs = [
  { question: "Aké zabezpečenie požadujete?", answer: "Záložné právo na nehnuteľnosť alebo záloh na obchodný podiel. Akceptujeme aj záloh na hnuteľný majetok firmy." },
  { question: "Aká je maximálna výška úveru?", answer: "Pre realitné projekty do 2 000 000 €, pre podnikateľské úvery do 1 000 000 €." },
  { question: "Ako rýchlo môžem získať financie?", answer: "Rozhodujeme do 5 pracovných dní. Čerpanie do 2 týždňov od schválenia." },
  { question: "Aké sú úrokové sadzby?", answer: "Od 10% do 18% p.a. v závislosti od typu projektu a kvality zabezpečenia." },
  { question: "Môžem splatiť úver predčasne?", answer: "Áno, kedykoľvek bez poplatkov. Úroky sa počítajú len za skutočné čerpanie." },
  { question: "Financujete aj fyzické osoby?", answer: "Nie, financujeme výlučne právnické osoby – s.r.o. a a.s." },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Meno je povinné" }).max(100),
  email: z.string().trim().email({ message: "Neplatná emailová adresa" }).max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  companyName: z.string().trim().min(1, { message: "Názov spoločnosti je povinný" }).max(200),
  loanAmount: z.string().trim().optional().or(z.literal("")),
  loanTerm: z.string().trim().optional().or(z.literal("")),
  projectType: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(1, { message: "Popis projektu je povinný" }).max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const PrivateCredit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("PC form:", { name: data.name, email: data.email });
    toast.success("Žiadosť bola odoslaná", { description: "Budeme vás kontaktovať do 5 pracovných dní." });
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SubpageHero
          label="Private Credit"
          title="Zabezpečené"
          titleAccent="úvery"
          description="Poskytujeme financovanie pre právnické osoby a realitné projekty. Rýchle schválenie, flexibilné podmienky."
          image={verticalCredit}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                Poskytujeme zabezpečené úvery pre právnické osoby a realitné projekty. Rýchle rozhodnutia, flexibilné podmienky a transparentné náklady.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Financing Types - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-primary-foreground/40">
                Typy financovania
              </p>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                  Čo <span className="text-primary">financujeme</span>
                </h2>
                <p className="text-base sm:text-lg font-light leading-relaxed md:pt-2 text-primary-foreground/60">
                  Ponúkame dva hlavné typy financovania pre právnické osoby.
                </p>
              </div>
            </AnimatedSection>
            <StaggerContainer className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
              {[
                { title: "Realitné projekty", desc: "Financovanie akvizícií, developmentu a rekonštrukcií nehnuteľností.", params: ["Výška: 10 000 – 500 000 €", "Splatnosť: 3–24 mesiacov", "LTV do 70%"] },
                { title: "Podnikateľské úvery", desc: "Financovanie prevádzkového kapitálu, akvizícií a expanzie.", params: ["Výška: 10 000 – 500 000 €", "Splatnosť: 3–24 mesiacov", "Zabezpečenie aktívami"] },
              ].map((type, i) => (
                <StaggerItem key={i}>
                  <div className="border border-primary-foreground/10 p-5 sm:p-8 h-full rounded-xl">
                    <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4 text-primary-foreground">{type.title}</h3>
                    <p className="text-sm sm:text-base text-primary-foreground/50 font-light leading-relaxed mb-4">{type.desc}</p>
                    <ul className="space-y-2">
                      {type.params.map((p, j) => <li key={j} className="text-xs sm:text-sm text-primary">• {p}</li>)}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-muted-foreground">
                Prečo my
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
                Výhody <span className="text-primary">spolupráce</span>
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: "5 dní", label: "Rýchle schválenie", desc: "Rozhodnutie do 5 pracovných dní." },
                { value: "Flexibilné", label: "Podmienky", desc: "Individuálny prístup ku každému projektu." },
                { value: "0 €", label: "Skryté poplatky", desc: "Jasná úroková sadzba od začiatku." },
                { value: "Min.", label: "Byrokracia", desc: "Zameriavame sa na podstatu projektu." },
              ].map((item, i) => (
                <StaggerItem key={i} className="text-center">
                  <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary mb-2 sm:mb-3">{item.value}</p>
                  <h3 className="font-serif text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{item.label}</h3>
                  <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Process - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-primary-foreground/40">
                Proces schvaľovania
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                Ako to <span className="text-primary">funguje</span>
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {[
                { step: "01", title: "Žiadosť", desc: "Kontaktujte nás s popisom projektu." },
                { step: "02", title: "Analýza", desc: "Vyhodnotíme projekt a zabezpečenie." },
                { step: "03", title: "Ponuka", desc: "Konkrétna ponuka s podmienkami." },
                { step: "04", title: "Čerpanie", desc: "Po podpise uvoľníme financie." },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <span className="font-serif text-5xl sm:text-6xl text-primary/20 block mb-2">{item.step}</span>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3 text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground/50 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-muted-foreground">
                Časté otázky
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
                Otázky o <span className="text-primary">financovaní</span>
              </h2>
            </AnimatedSection>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border px-4 sm:px-6 data-[state=open]:border-primary transition-colors">
                    <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-primary py-4 sm:py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="kontakt" className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase text-muted-foreground mb-3 sm:mb-4">Potrebujete financovanie?</p>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                  Kontaktujte <span className="text-primary">nás</span>
                </h2>
                <p className="text-base sm:text-lg font-light leading-relaxed md:pt-2 text-muted-foreground">
                  Máte projekt, ktorý potrebuje financovanie? Vyplňte formulár alebo nás kontaktujte priamo.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <AnimatedSection delay={0.1}>
                <div className="bg-charcoal p-5 sm:p-8 md:p-10 rounded-2xl">
                  <h3 className="font-serif text-xl mb-6 sm:mb-8 text-primary-foreground">Žiadosť o financovanie</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Meno *</label>
                      <Input {...register("name")} placeholder="Ján Novák" className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary h-11 md:h-12" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Email *</label>
                      <Input {...register("email")} type="email" placeholder="jan.novak@email.sk" className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary h-11 md:h-12" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Telefón</label>
                      <Input {...register("phone")} type="tel" placeholder="+421 900 000 000" className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary h-11 md:h-12" />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Spoločnosť *</label>
                      <Input {...register("companyName")} placeholder="Vaša spoločnosť s.r.o." className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary h-11 md:h-12" />
                      {errors.companyName && <p className="text-destructive text-xs mt-1">{errors.companyName.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Suma</label>
                        <select {...register("loanAmount")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal-light text-primary-foreground px-3 py-2 text-sm">
                          <option value="">Vyberte</option>
                          <option value="10-50k">10 – 50 tis. €</option>
                          <option value="50-100k">50 – 100 tis. €</option>
                          <option value="100-250k">100 – 250 tis. €</option>
                          <option value="250-500k">250 – 500 tis. €</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Splatnosť</label>
                        <select {...register("loanTerm")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal-light text-primary-foreground px-3 py-2 text-sm">
                          <option value="">Vyberte</option>
                          <option value="3-6m">3 – 6 mes.</option>
                          <option value="6-12m">6 – 12 mes.</option>
                          <option value="12-18m">12 – 18 mes.</option>
                          <option value="18-24m">18 – 24 mes.</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Typ projektu</label>
                      <select {...register("projectType")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal-light text-primary-foreground px-3 py-2 text-sm">
                        <option value="">Vyberte</option>
                        <option value="realitny">Realitný projekt</option>
                        <option value="podnikatelsky">Podnikateľský úver</option>
                        <option value="akvizicia">Akvizičné financovanie</option>
                        <option value="iny">Iný</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Popis projektu *</label>
                      <Textarea {...register("message")} placeholder="Opíšte váš projekt..." rows={4} className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary resize-none" />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide uppercase h-12 md:h-14 text-sm">
                      {isSubmitting ? "Odosielam..." : "Odoslať žiadosť"}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div>
                  <h3 className="font-serif text-xl mb-6 sm:mb-8">Priamy kontakt</h3>
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground mb-2">Email</p>
                      <a href="mailto:credit@assetra.sk" className="text-lg sm:text-xl hover:text-primary transition-colors">credit@assetra.sk</a>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground mb-2">Kancelária</p>
                      <p className="text-lg sm:text-xl">Bratislava, Slovensko</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <div className="h-8 sm:h-12" />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateCredit;
