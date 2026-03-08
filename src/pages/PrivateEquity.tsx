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
import verticalEquity from "@/assets/vertical-equity.jpg";

const faqs = [
  { question: "Aké typy firiem hľadáte?", answer: "Hľadáme zabehnuté, ziskové firmy s obratom 1–10 mil. € v rôznych odvetviach – výroba, služby, e-commerce, IT." },
  { question: "Ako dlho trvá celý proces akvizície?", answer: "Štandardne 3–6 mesiacov od prvého kontaktu po uzavretie transakcie." },
  { question: "Čo sa stane so zamestnancami po akvizícii?", answer: "Zamestnanci sú kľúčovou hodnotou. Naším cieľom je zachovať stabilný tím a ďalej ho rozvíjať." },
  { question: "Môžem ostať vo firme po predaji?", answer: "Áno, ponúkame rôzne modely spolupráce – od úplného odchodu až po pokračovanie v manažérskej pozícii." },
  { question: "Ako stanovujete cenu firmy?", answer: "Používame kombináciu metód – násobok EBITDA, diskontované cash flow a porovnanie s podobnými transakciami." },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Meno je povinné" }).max(100),
  email: z.string().trim().email({ message: "Neplatná emailová adresa" }).max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  companyName: z.string().trim().min(1, { message: "Názov firmy je povinný" }).max(200),
  companyTurnover: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;

const PrivateEquity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("PE form:", { name: data.name, email: data.email });
    toast.success("Žiadosť bola odoslaná", { description: "Budeme vás kontaktovať do 48 hodín." });
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SubpageHero
          label="Private Equity"
          title="Akvizície"
          titleAccent="zabehnutých firiem"
          description="Hľadáme fungujúce, ziskové firmy na slovenskom a českom trhu. Ponúkame férovú cenu a diskrétny proces."
          image={verticalEquity}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                Vyhľadávame fungujúce, zabehnuté firmy na slovenskom a českom trhu vhodné na odkúpenie. Investujeme prostredníctvom dlhodobých partnerstiev s dôrazom na rast hodnoty.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Criteria */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Investičné kritériá
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Zameriavame sa na zabehnuté firmy s jasným potenciálom rastu a stabilným tímom.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Criteria stats - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: "1–10 mil. €", label: "Obrat", desc: "Hľadáme firmy s ročným obratom v rozmedzí 1 až 10 miliónov eur." },
                { value: "2+ roky", label: "Ziskovosť", desc: "Firma musí byť zisková minimálne 2 roky po sebe." },
                { value: "SK/CZ", label: "Trh", desc: "Zameriavame sa na slovenský a český trh s potenciálom expanzie." },
                { value: "Stabilný", label: "Tím", desc: "Preferujeme firmy so zabehnutým manažmentom a lojálnym tímom." },
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

        {/* Process */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start mb-10 sm:mb-14 md:mb-20">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Ako to funguje
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Od prvého kontaktu po uzavretie transakcie.
                </p>
              </div>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                {[
                  { step: "01", title: "Prvotný kontakt", desc: "Nezáväzná konzultácia o vašej firme. Podpíšeme NDA." },
                  { step: "02", title: "Due diligence", desc: "Detailná analýza finančných výkazov a obchodného modelu." },
                  { step: "03", title: "Ocenenie a ponuka", desc: "Férová ponuka na základe trhového ocenenia." },
                  { step: "04", title: "Uzavretie transakcie", desc: "Finalizácia dokumentov a prevod vlastníctva." },
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

        {/* FAQ - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
                Často kladené otázky
              </h2>
            </AnimatedSection>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-primary-foreground/10 px-4 sm:px-6 data-[state=open]:border-primary-foreground/30 transition-colors">
                    <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-primary-foreground py-4 sm:py-5 text-primary-foreground/70">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-primary-foreground/40 font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="kontakt" className="py-16 sm:py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-10 sm:mb-14 md:mb-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  Kontaktujte nás
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Zvažujete predaj firmy? Radi sa s vami porozprávame o možnostiach spolupráce.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <AnimatedSection delay={0.1}>
                <div className="bg-charcoal p-5 sm:p-8 md:p-10 rounded-2xl">
                  <h3 className="font-serif text-xl mb-6 sm:mb-8 text-primary-foreground">Žiadosť o konzultáciu</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Meno *</label>
                      <Input {...register("name")} placeholder="Ján Novák" className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Email *</label>
                      <Input {...register("email")} type="email" placeholder="jan.novak@email.sk" className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Telefón</label>
                      <Input {...register("phone")} type="tel" placeholder="+421 900 000 000" className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12" />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Názov firmy *</label>
                      <Input {...register("companyName")} placeholder="Vaša spoločnosť s.r.o." className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12" />
                      {errors.companyName && <p className="text-destructive text-xs mt-1">{errors.companyName.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Ročný obrat</label>
                      <select {...register("companyTurnover")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal-light text-primary-foreground px-3 py-2 text-sm">
                        <option value="">Vyberte rozsah</option>
                        <option value="do-1m">Do 1 mil. €</option>
                        <option value="1-3m">1 – 3 mil. €</option>
                        <option value="3-5m">3 – 5 mil. €</option>
                        <option value="5-10m">5 – 10 mil. €</option>
                        <option value="nad-10m">Nad 10 mil. €</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-primary-foreground/40 mb-2 block">Správa</label>
                      <Textarea {...register("message")} placeholder="Opíšte vašu firmu..." rows={4} className="bg-charcoal-light border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 resize-none" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-charcoal font-medium tracking-wide uppercase h-12 md:h-14 text-sm">
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
                      <a href="mailto:equity@assetra.sk" className="text-lg sm:text-xl hover:text-muted-foreground transition-colors">equity@assetra.sk</a>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground mb-2">Kancelária</p>
                      <p className="text-lg sm:text-xl">Bratislava, Slovensko</p>
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="font-serif text-xl sm:text-2xl mb-1">1–10 mil. €</p>
                        <p className="text-xs text-muted-foreground">Ročný obrat</p>
                      </div>
                      <div>
                        <p className="font-serif text-xl sm:text-2xl mb-1">2+ roky</p>
                        <p className="text-xs text-muted-foreground">Ziskovosť</p>
                      </div>
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

export default PrivateEquity;
