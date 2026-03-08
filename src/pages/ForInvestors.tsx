import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { AnimatedCounter, AnimatedValue } from "@/components/AnimatedCounter";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroMountains from "@/assets/hero-mountains.jpg";

const faqs = [
  { question: "Ako sa generuje 12% ročný výnos?", answer: "Náš výnos pochádza zo ziskovej marže na realitných transakciách. Akvizujeme nehnuteľnosti minimálne 20% pod trhovou hodnotou, rekonštruujeme ich a predávame za férovú trhovú cenu." },
  { question: "Je moja investícia zabezpečená?", answer: "Áno. Každé euro, ktoré investujete, je nasadené do akvizície fyzických nehnuteľností. Celý kapitálový fond je zabezpečený realitnými aktívami." },
  { question: "Aký je typický investičný horizont?", answer: "Štandardné investičné obdobia sa pohybujú od 12 do 24 mesiacov. Na konci každého obdobia sa vám vráti celá istina spolu so všetkými získanými výnosmi." },
  { question: "Ako a kedy sa vyplácajú výnosy?", answer: "Výnosy sa vyplácajú mesačne, priamo na váš bankový účet. Vaša mesačná výplata sa vypočíta ako 1/12 vášho ročného výnosu." },
  { question: "Aká je minimálna výška investície?", answer: "Minimálna investícia je 10 000 €. Väčšie investície môžu kvalifikovať na individuálne podmienky." },
  { question: "Môžem vybrať investíciu predčasne?", answer: "Investície sú viazané na dohodnuté obdobie. V mimoriadnych prípadoch môžeme vyhovieť žiadostiam s poplatkom za predčasný výstup." },
  { question: "Do akých sektorov investujete?", answer: "Investujeme do troch hlavných oblastí – nehnuteľnosti (realitný flipping), akvizície zabehnutých firiem (private equity) a zabezpečené úvery (private credit)." },
];

const testimonials = [
  {
    quote: "S ASSETRA som začal investovať pred rokom. Mesačné výplaty prichádzajú presne a spoľahlivo, presne ako bolo dohodnuté v zmluve.",
    author: "Investor z Bratislavy",
    detail: "Investícia od 50 000 €",
  },
  {
    quote: "Oceňujem transparentnosť a profesionálny prístup. Vždy presne viem, do čoho sú moje peniaze investované a aký výnos môžem očakávať.",
    author: "Investor z Košíc",
    detail: "Investícia od 100 000 €",
  },
  {
    quote: "Po rokoch hľadania spoľahlivého zhodnotenia kapitálu som našiel riešenie, ktoré skutočne funguje. Reálne aktíva, reálne výnosy.",
    author: "Investor z Prahy",
    detail: "Investícia od 25 000 €",
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Meno je povinné" }).max(100),
  email: z.string().trim().email({ message: "Neplatná emailová adresa" }).max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  investmentAmount: z.string().trim().max(50).optional().or(z.literal("")),
  investmentInterest: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ForInvestors = () => {
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
    try {
      const { error } = await supabase.from("investor_inquiries").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        investment_amount: data.investmentAmount || null,
        investment_interest: data.investmentInterest || null,
        message: data.message || null,
      });

      if (error) throw error;

      toast.success("Žiadosť bola odoslaná", { description: "Budeme vás kontaktovať do 24 hodín." });
      reset();
    } catch {
      toast.error("Nepodarilo sa odoslať žiadosť", { description: "Skúste to prosím znova neskôr." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Pre investorov | ASSETRA Investments"
        description="Investujte s istotou. Fixný 10% ročný výnos vyplácaný mesačne. Váš kapitál je zabezpečený reálnymi aktívami."
      />
      <Header />
      <main>
        <SubpageHero
          label="Pre investorov"
          title="Investujte"
          titleAccent="s istotou"
          description="Fixný 10% ročný výnos vyplácaný mesačne. Váš kapitál je zabezpečený reálnymi aktívami."
          image={heroMountains}
        />

        {/* Value Proposition */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                ASSETRA investments ponúka investorom jednoduchý a transparentný spôsob, ako zhodnotiť kapitál. Predvídateľné výnosy podporené reálnymi aktívami, bez zbytočnej komplexity.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Key Numbers - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
              {[
                { value: "10%", label: "Fixný ročný výnos", desc: "Zmluvne garantovaný výnos na celé investičné obdobie." },
                { value: "Mesačne", label: "Výplata výnosov", desc: "Pravidelný pasívny príjem každý mesiac." },
                { value: "10 000 €", label: "Minimálna investícia", desc: "Začnite investovať od 10 000 eur." },
                { value: "Reálne", label: "Zabezpečenie aktívami", desc: "Každá investícia je krytá fyzickými nehnuteľnosťami." },
              ].map((item, i) => (
                <StaggerItem key={i} className="text-center">
                  <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mb-2 sm:mb-3">{item.value}</p>
                  <h3 className="font-serif text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-primary-foreground/80">{item.label}</h3>
                  <p className="text-primary-foreground/40 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start mb-10 sm:mb-14 md:mb-20">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Ako to funguje
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Jednoduchý a transparentný proces od prvého kontaktu po pravidelnú výplatu výnosov.
                </p>
              </div>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                {[
                  { step: "01", title: "Kontaktujte nás", desc: "Vyplňte formulár nižšie. Ozveme sa vám do 24 hodín s konkrétnymi podmienkami." },
                  { step: "02", title: "Konzultácia", desc: "Osobné stretnutie, kde vysvetlíme detaily a zodpovieme všetky otázky." },
                  { step: "03", title: "Podpis zmluvy", desc: "Transparentné zmluvné podmienky s fixovaným výnosom a zabezpečením." },
                  { step: "04", title: "Mesačné výnosy", desc: "Od prvého mesiaca dostávate pravidelné výplaty priamo na účet." },
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <span className="font-serif text-5xl sm:text-6xl text-foreground/10 block mb-2">{item.step}</span>
                    <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </AnimatedSection>

        {/* Calculator */}
        <section id="kalkulacka" className="py-16 sm:py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                Vypočítajte si svoje výnosy
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
                <div className="space-y-8 sm:space-y-10">
                  <div>
                    <div className="flex justify-between mb-3 sm:mb-4">
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">Výška investície</label>
                      <span className="font-serif text-base sm:text-lg"><AnimatedValue value={investment} formatValue={formatCurrency} /></span>
                    </div>
                    <Slider value={[investment]} onValueChange={(v) => setInvestment(v[0])} min={10000} max={500000} step={5000}
                      className="[&_[role=slider]]:bg-foreground [&_[role=slider]]:border-foreground [&_.bg-primary]:bg-foreground [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground"><span>10 000 €</span><span>500 000 €</span></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3 sm:mb-4">
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">Doba investície</label>
                      <span className="font-serif text-base sm:text-lg"><AnimatedValue value={duration} /> mesiacov</span>
                    </div>
                    <Slider value={[duration]} onValueChange={(v) => setDuration(v[0])} min={6} max={24} step={6}
                      className="[&_[role=slider]]:bg-foreground [&_[role=slider]]:border-foreground [&_.bg-primary]:bg-foreground [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground"><span>6 mesiacov</span><span>24 mesiacov</span></div>
                  </div>
                </div>

                <motion.div className="bg-charcoal p-5 sm:p-8 md:p-10 rounded-2xl" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h3 className="font-serif text-lg sm:text-xl mb-6 sm:mb-8 text-center text-primary-foreground">Vaše výnosy</h3>
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center pb-6 border-b border-primary-foreground/10">
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">Mesačná výplata</p>
                      <p className="font-serif text-2xl sm:text-3xl text-primary-foreground"><AnimatedValue value={calculations.monthlyPayout} formatValue={formatCurrency} /></p>
                    </div>
                    <div className="text-center pb-6 border-b border-primary-foreground/10">
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">Celkový výnos</p>
                      <p className="font-serif text-2xl sm:text-3xl text-primary-foreground"><AnimatedValue value={calculations.totalReturn} formatValue={formatCurrency} /></p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">Celkom na konci</p>
                      <p className="font-serif text-2xl sm:text-3xl text-primary-foreground"><AnimatedValue value={calculations.totalAtEnd} formatValue={formatCurrency} /></p>
                      <p className="text-xs text-primary-foreground/30 mt-1">(Istina + Výnosy)</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Trust - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground max-w-3xl">
                Prečo investovať s ASSETRA
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {[
                { title: "Konzervatívna akvizícia", desc: "Kupujeme iba nehnuteľnosti s cenou 20% alebo viac pod trhovou hodnotou." },
                { title: "Zabezpečenie reálnymi aktívami", desc: "Každá investícia je krytá fyzickými nehnuteľnosťami v nadhodnote." },
                { title: "Krátke investičné cykly", desc: "Investičné obdobia 12–24 mesiacov limitujú expozíciu voči trhovým zmenám." },
                { title: "Transparentné podmienky", desc: "Žiadne skryté poplatky. Jasná zmluva s fixným výnosom od prvého dňa." },
              ].map((item, i) => (
                <StaggerItem key={i} className="border-l-2 border-primary-foreground/20 pl-5 sm:pl-6">
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground/40 font-light text-xs sm:text-sm md:text-base leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Social Proof / Testimonials */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-10 sm:mb-14 md:mb-20">
                Čo hovoria naši investori
              </h2>
              <StaggerContainer className="grid md:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((t, i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      className="border-l-2 border-foreground/15 pl-5 sm:pl-6 py-2 h-full hover:border-foreground/40 transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-serif text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed mb-4 sm:mb-6 italic">
                        "{t.quote}"
                      </p>
                      <p className="text-sm font-medium text-foreground">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.detail}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-10 sm:mb-14 md:mb-20">
                Často kladené otázky
              </h2>
              <div className="max-w-3xl">
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-border px-4 sm:px-6 data-[state=open]:border-foreground/30 transition-colors hover:border-foreground/20">
                      <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-foreground py-4 sm:py-5 text-foreground/70">
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
        </AnimatedSection>

        {/* Contact Form - Dark block - THE conversion section */}
        <section id="kontakt" className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                  Začnite investovať
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-primary-foreground/50 font-light leading-relaxed md:pt-2 lg:pt-4">
                  Vyplňte formulár a ozveme sa vám do 24 hodín s konkrétnymi podmienkami spolupráce.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <AnimatedSection delay={0.1}>
                <div className="bg-charcoal-light p-5 sm:p-8 md:p-10 rounded-2xl">
                  <h3 className="font-serif text-xl mb-6 sm:mb-8 text-primary-foreground">Žiadosť o investíciu</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Meno a priezvisko *</label>
                      <Input {...register("name")} placeholder="Ján Novák" className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Email *</label>
                      <Input {...register("email")} type="email" placeholder="jan.novak@email.sk" className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Telefón</label>
                      <Input {...register("phone")} type="tel" placeholder="+421 900 000 000" className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12" />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Plánovaná investícia</label>
                      <select {...register("investmentAmount")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm">
                        <option value="">Vyberte rozsah</option>
                        <option value="10-25k">10 000 – 25 000 €</option>
                        <option value="25-50k">25 000 – 50 000 €</option>
                        <option value="50-100k">50 000 – 100 000 €</option>
                        <option value="100-250k">100 000 – 250 000 €</option>
                        <option value="250k+">250 000 € a viac</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Oblasť záujmu</label>
                      <select {...register("investmentInterest")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm">
                        <option value="">Vyberte oblasť</option>
                        <option value="real-estate">Real Estate – nehnuteľnosti</option>
                        <option value="private-equity">Private Equity – akvizície firiem</option>
                        <option value="private-credit">Private Credit – zabezpečené úvery</option>
                        <option value="vsetko">Zaujíma ma všetko</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Správa</label>
                      <Textarea {...register("message")} placeholder="Vaše investičné ciele alebo otázky..." rows={4} className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 resize-none" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-charcoal font-medium tracking-wide uppercase h-12 md:h-14 text-sm">
                      {isSubmitting ? "Odosielam..." : "Odoslať žiadosť"}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl mb-6 sm:mb-8 text-primary-foreground">Priamy kontakt</h3>
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2">Email</p>
                      <a href="mailto:invest@assetra.sk" className="text-lg sm:text-xl text-primary-foreground hover:text-primary-foreground/70 transition-colors">invest@assetra.sk</a>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2">Kancelária</p>
                      <p className="text-lg sm:text-xl text-primary-foreground">Bratislava, Slovensko</p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-primary-foreground/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-serif text-xl sm:text-2xl mb-1 text-primary-foreground"><AnimatedCounter value={10000} formatValue={(v) => `${v.toLocaleString("sk-SK")} €`} /></p>
                      <p className="text-xs text-primary-foreground/40">Min. investícia</p>
                    </div>
                    <div>
                      <p className="font-serif text-xl sm:text-2xl mb-1 text-primary-foreground"><AnimatedCounter value={10} suffix="%" /></p>
                      <p className="text-xs text-primary-foreground/40">Ročný výnos</p>
                    </div>
                    <div>
                      <p className="font-serif text-xl sm:text-2xl mb-1 text-primary-foreground">12–24</p>
                      <p className="text-xs text-primary-foreground/40">Mesiacov</p>
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

export default ForInvestors;
