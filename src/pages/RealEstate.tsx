import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/sections/SubpageHero";
import SectionBlock from "@/components/sections/SectionBlock";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { AnimatedCounter, AnimatedValue } from "@/components/AnimatedCounter";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import verticalRealestate from "@/assets/vertical-realestate.jpg";

const faqs = [
  { question: "Ako sa generuje 10% ročný výnos?", answer: "Náš výnos pochádza zo ziskovej marže na realitných transakciách. Akvizujeme nehnuteľnosti minimálne 20% pod trhovou hodnotou, rekonštruujeme ich a predávame za férovú trhovú cenu." },
  { question: "Je moja investícia zabezpečená nehnuteľnosťami?", answer: "Áno. Každé euro, ktoré investujete, je nasadené do akvizície fyzických nehnuteľností. Celý kapitálový fond je zabezpečený realitnými aktívami." },
  { question: "Aký je typický investičný horizont?", answer: "Štandardné investičné obdobia sa pohybujú od 12 do 18 mesiacov. Na konci každého obdobia sa vám vráti celá istina spolu so všetkými získanými výnosmi." },
  { question: "Ako a kedy sa vyplácajú výnosy?", answer: "Výnosy sa vyplácajú mesačne, priamo na váš bankový účet. Vaša mesačná výplata sa vypočíta ako 1/12 vášho ročného výnosu." },
  { question: "Aké sú riziká investície?", answer: "Primárne riziko je spojené s podmienkami na realitnom trhu. Toto zmierňujeme konzervatívnou akvizíciou — kupujeme iba nehnuteľnosti výrazne pod trhovou hodnotou." },
  { question: "Aká je minimálna výška investície?", answer: "Minimálna investícia je 10 000 €. Väčšie investície môžu kvalifikovať na dodatočné podmienky." },
  { question: "Môžem vybrať investíciu predčasne?", answer: "Investície sú viazané na dohodnuté obdobie. V mimoriadnych prípadoch môžeme vyhovieť žiadostiam s poplatkom za predčasný výstup." },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Meno je povinné" }).max(100),
  email: z.string().trim().email({ message: "Neplatná emailová adresa" }).max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  investmentAmount: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1, { message: "Správa je povinná" }).max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const RealEstate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [investment, setInvestment] = useState(50000);
  const [duration, setDuration] = useState(12);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const calculations = useMemo(() => {
    const monthlyRate = 0.10 / 12;
    const monthlyPayout = investment * monthlyRate;
    const totalReturn = monthlyPayout * duration;
    return {
      monthlyPayout: Math.round(monthlyPayout),
      totalReturn: Math.round(totalReturn),
      totalAtEnd: Math.round(investment + totalReturn),
    };
  }, [investment, duration]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Real Estate form submitted:", { name: data.name, email: data.email });
    toast.success("Správa bola odoslaná", { description: "Budeme vás kontaktovať do 24 hodín." });
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SubpageHero
          label="Investícia s fixným výnosom"
          title="10% ročný výnos"
          titleAccent="vyplácaný mesačne"
          description="Váš kapitál je zabezpečený nehnuteľnosťami v nadhodnote. Predvídateľné výnosy podporené reálnymi aktívami."
          image={verticalRealestate}
        />

        {/* About Statement - matching homepage style */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                ASSETRA investments je slovenská investičná spoločnosť špecializujúca sa na akvizíciu, rekonštrukciu a predaj podhodnotených rezidenčných nehnuteľností.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Why Invest - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-primary-foreground/40">
                Výhody pre investorov
              </p>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                  Prečo investovať <span className="text-primary">s ASSETRA</span>
                </h2>
                <p className="text-base sm:text-lg font-light leading-relaxed md:pt-2 text-primary-foreground/60">
                  Ponúkame jednoduchý investičný model s jasnými podmienkami, predvídateľnými výnosmi a zabezpečením reálnymi aktívami.
                </p>
              </div>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {[
                { value: "10%", label: "Fixný ročný výnos", desc: "Váš výnos je vopred určený a zmluvne garantovaný." },
                { value: "Mesačne", label: "Pravidelný príjem", desc: "Dostávajte svoje výnosy každý mesiac." },
                { value: "Reálne", label: "Zabezpečenie aktívami", desc: "Každá investícia je viazaná na fyzické nehnuteľnosti." },
                { value: "12–36", label: "Mesačné cykly", desc: "Krátke investičné horizonty s definovanými výstupmi." },
                { value: "20%+", label: "Prevádzkové marže", desc: "Náš model cieli na minimálne 20% ziskové marže." },
                { value: "Plná", label: "Návratnosť kapitálu", desc: "Na konci cyklu dostanete späť celú istinu." },
              ].map((item, i) => (
                <StaggerItem key={i} className="text-center">
                  <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary mb-2 sm:mb-3">{item.value}</p>
                  <h3 className="font-serif text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-primary-foreground">{item.label}</h3>
                  <p className="text-primary-foreground/50 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-muted-foreground">
                Investičný model
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
                Ako váš kapitál <span className="text-primary">pracuje</span>
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
              {[
                { step: "01", title: "Investujete", desc: "Záväzujete kapitál na definované obdobie. Podmienky sú fixované pri podpise zmluvy." },
                { step: "02", title: "Kupujeme nehnuteľnosť", desc: "Váš kapitál financuje nákup nehnuteľností minimálne 20% pod trhovou hodnotou." },
                { step: "03", title: "Rekonštrukcia a predaj", desc: "Nehnuteľnosť rekonštruujeme a predávame za férovú trhovú cenu." },
                { step: "04", title: "Dostávate výnosy", desc: "Mesačné výplaty počas celého obdobia. Na konci sa vám vráti celá istina." },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <span className="font-serif text-5xl sm:text-6xl text-primary/15 block mb-2">{item.step}</span>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Trust - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-primary-foreground/40">
                Riadenie rizík
              </p>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                  Ochrana kapitálu <span className="text-primary">na prvom mieste</span>
                </h2>
                <p className="text-base sm:text-lg font-light leading-relaxed md:pt-2 text-primary-foreground/60">
                  Každú transakciu štruktúrujeme s bezpečnosťou vášho kapitálu ako primárnou prioritou.
                </p>
              </div>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {[
                { title: "Konzervatívna akvizícia", desc: "Kupujeme iba nehnuteľnosti s cenou 20% alebo viac pod trhovou hodnotou.", highlight: true },
                { title: "Zabezpečenie reálnymi aktívami", desc: "Každá investícia je krytá fyzickými nehnuteľnosťami.", highlight: false },
                { title: "Krátke cykly", desc: "Investičné obdobia 12–36 mesiacov limitujú expozíciu voči dlhodobým trhovým zmenám.", highlight: false },
                { title: "Prevádzkové skúsenosti", desc: "Náš tím dokončil desiatky akvizično-rekonštrukčno-predajných cyklov.", highlight: false },
              ].map((item, i) => (
                <StaggerItem key={i} className={`border-l-2 pl-5 sm:pl-6 ${item.highlight ? "border-primary" : "border-primary-foreground/20"}`}>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground/50 font-light text-xs sm:text-sm md:text-base leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Calculator */}
        <section id="kalkulacka" className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-muted-foreground">
                Investičná kalkulačka
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
                Vypočítajte si svoje <span className="text-primary">výnosy</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
                <div className="space-y-8 sm:space-y-10">
                  <div>
                    <div className="flex justify-between mb-3 sm:mb-4">
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">Výška investície</label>
                      <span className="font-serif text-base sm:text-lg text-primary"><AnimatedValue value={investment} formatValue={formatCurrency} /></span>
                    </div>
                    <Slider value={[investment]} onValueChange={(v) => setInvestment(v[0])} min={10000} max={500000} step={5000}
                      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground"><span>10 000 €</span><span>500 000 €</span></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3 sm:mb-4">
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">Doba investície</label>
                      <span className="font-serif text-base sm:text-lg text-primary"><AnimatedValue value={duration} /> mesiacov</span>
                    </div>
                    <Slider value={[duration]} onValueChange={(v) => setDuration(v[0])} min={6} max={24} step={6}
                      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground"><span>6 mesiacov</span><span>24 mesiacov</span></div>
                  </div>
                </div>

                <motion.div className="bg-charcoal p-5 sm:p-8 md:p-10 rounded-2xl" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h3 className="font-serif text-lg sm:text-xl mb-6 sm:mb-8 text-center text-primary-foreground">Vaše výnosy</h3>
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center pb-6 border-b border-primary-foreground/10">
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">Mesačná výplata</p>
                      <p className="font-serif text-2xl sm:text-3xl text-primary"><AnimatedValue value={calculations.monthlyPayout} formatValue={formatCurrency} /></p>
                    </div>
                    <div className="text-center pb-6 border-b border-primary-foreground/10">
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">Celkový výnos</p>
                      <p className="font-serif text-2xl sm:text-3xl text-primary-foreground"><AnimatedValue value={calculations.totalReturn} formatValue={formatCurrency} /></p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">Celkom na konci</p>
                      <p className="font-serif text-2xl sm:text-3xl text-primary"><AnimatedValue value={calculations.totalAtEnd} formatValue={formatCurrency} /></p>
                      <p className="text-xs text-primary-foreground/30 mt-1">(Istina + Výnosy)</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase mb-3 sm:mb-4 text-primary-foreground/40">
                Časté otázky
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                Často kladené <span className="text-primary">otázky</span>
              </h2>
            </AnimatedSection>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-primary-foreground/10 px-4 sm:px-6 data-[state=open]:border-primary transition-colors">
                    <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-primary py-4 sm:py-5 text-primary-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-primary-foreground/60 font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-5">
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
              <p className="text-xs sm:text-sm tracking-ultra-wide uppercase text-muted-foreground mb-3 sm:mb-4">Začnite investovať</p>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                  Kontaktujte <span className="text-primary">nás</span>
                </h2>
                <p className="text-base sm:text-lg font-light leading-relaxed md:pt-2 text-muted-foreground">
                  Máte záujem o investíciu alebo otázky? Vyplňte formulár alebo nás kontaktujte priamo.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <AnimatedSection delay={0.1}>
                <div className="bg-charcoal p-5 sm:p-8 md:p-10 rounded-2xl">
                  <h3 className="font-serif text-xl mb-6 sm:mb-8 text-primary-foreground">Žiadosť o informácie</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Meno a priezvisko *</label>
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
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Plánovaná investícia</label>
                      <Input {...register("investmentAmount")} placeholder="napr. 50 000 €" className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary h-11 md:h-12" />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Správa *</label>
                      <Textarea {...register("message")} placeholder="Vaše investičné ciele alebo otázky..." rows={4} className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary resize-none" />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide uppercase h-12 md:h-14 text-sm">
                      {isSubmitting ? "Odosielam..." : "Odoslať žiadosť"}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl mb-6 sm:mb-8">Priamy kontakt</h3>
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground mb-2">Email</p>
                      <a href="mailto:invest@assetra.sk" className="text-lg sm:text-xl hover:text-primary transition-colors">invest@assetra.sk</a>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground mb-2">Kancelária</p>
                      <p className="text-lg sm:text-xl">Bratislava, Slovensko</p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-serif text-xl sm:text-2xl text-primary mb-1"><AnimatedCounter value={10000} formatValue={(v) => `${v.toLocaleString("sk-SK")} €`} /></p>
                      <p className="text-xs text-muted-foreground">Min. investícia</p>
                    </div>
                    <div>
                      <p className="font-serif text-xl sm:text-2xl text-primary mb-1"><AnimatedCounter value={10} suffix="%" /></p>
                      <p className="text-xs text-muted-foreground">Ročný výnos</p>
                    </div>
                    <div>
                      <p className="font-serif text-xl sm:text-2xl text-primary mb-1">12–24</p>
                      <p className="text-xs text-muted-foreground">Mesiacov</p>
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

export default RealEstate;
