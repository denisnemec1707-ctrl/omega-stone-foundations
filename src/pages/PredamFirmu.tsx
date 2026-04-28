import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HandCoins,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import {
  LandingLayout,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/components/landing/LandingLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const industryOptions = [
  "Výroba",
  "Služby",
  "E-commerce",
  "Gastronómia",
  "Real estate",
  "Stavebníctvo",
  "IT",
  "Iné",
];

const turnoverOptions = [
  "200 000 – 500 000 €",
  "500 000 – 1 mil. €",
  "1 – 3 mil. €",
  "3 – 10 mil. €",
  "10 mil. € a viac",
  "Pod 200 000 € (mimo nášho zamerania)",
];

const ebitdaOptions = [
  "120 – 250 tis. €",
  "250 – 500 tis. €",
  "500 tis. – 1 mil. €",
  "1 mil. € a viac",
  "Pod 120 tis. € (mimo nášho zamerania)",
  "Nepoviem zatiaľ",
];

const reasonOptions = [
  "Odchod do dôchodku",
  "Generačná výmena",
  "Zdravotné dôvody",
  "Strategické rozhodnutie",
  "Finančné dôvody",
  "Iné — uvediem v správe",
];

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Zadajte celé meno" })
    .max(120, { message: "Meno je príliš dlhé" }),
  email: z.string().trim().email({ message: "Neplatný email" }).max(255),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Zadajte telefónne číslo" })
    .max(40),
  companyName: z
    .string()
    .trim()
    .min(2, { message: "Zadajte názov firmy alebo IČO" })
    .max(200),
  industry: z.string().min(1, { message: "Vyberte odvetvie" }),
  annualTurnover: z.string().min(1, { message: "Vyberte ročný obrat" }),
  annualEbitda: z.string().min(1, { message: "Vyberte rozsah EBITDA" }),
  saleReason: z.string().min(1, { message: "Vyberte dôvod predaja" }),
  message: z
    .string()
    .trim()
    .max(2000, { message: "Maximálne 2000 znakov" })
    .optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Musíte súhlasiť so spracovaním údajov" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

type UtmData = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
};

function readUtmFromUrl(): UtmData {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      referrer: null,
    };
  }
  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k) || null;
  return {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),
    referrer: document.referrer || null,
  };
}

const PredamFirmu = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [utm, setUtm] = useState<UtmData>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    referrer: null,
  });

  useEffect(() => {
    setUtm(readUtmFromUrl());
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      industry: "",
      annualTurnover: "",
      annualEbitda: "",
      saleReason: "",
      message: "",
      consent: false as unknown as true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("company_sale_inquiries")
        .insert({
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          company_name: values.companyName,
          industry: values.industry,
          annual_turnover: values.annualTurnover,
          annual_ebitda: values.annualEbitda,
          sale_reason: values.saleReason,
          message: values.message || null,
          consent_given: values.consent,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
          utm_term: utm.utm_term,
          referrer: utm.referrer,
          user_agent:
            typeof navigator !== "undefined" ? navigator.userAgent : null,
          landing_page:
            typeof window !== "undefined"
              ? window.location.pathname + window.location.search
              : null,
        });
      if (error) throw error;

      setSubmitted(true);
      form.reset();
      toast({
        title: "Žiadosť odoslaná",
        description: "Ozveme sa Vám do 2 pracovných dní.",
      });
    } catch (err) {
      console.error("Company sale inquiry submit error", err);
      toast({
        title: "Niečo sa pokazilo",
        description:
          "Žiadosť sa nepodarilo odoslať. Skúste to znova alebo nám zavolajte na " +
          PHONE_DISPLAY +
          ".",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LandingLayout
      title="Predáte svoju firmu? | Férová ponuka do 7 dní | ASSETRA Investments"
      description="Súkromná investičná skupina ASSETRA hľadá funkčné slovenské firmy s obratom od 200 000 €. Priamy odkup, bez sprostredkovateľov, bez provízií."
    >
        {/* HERO */}
        <section className="relative overflow-hidden bg-charcoal text-primary-foreground">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="max-w-4xl">
              <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary/80 mb-5 sm:mb-7">
                Pre majiteľov zabehnutých firiem
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 sm:mb-8">
                Predávate svoju firmu? Pripravíme férovú ponuku do 7 dní.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-primary-foreground/70 leading-relaxed max-w-3xl mb-8 sm:mb-10">
                Súkromná investičná skupina ASSETRA Investments hľadá funkčné
                slovenské firmy s obratom od 200 000 € a EBITDA od 120 000 €.
                Priamy odkup. Bez sprostredkovateľov, bez provízií.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8 sm:mb-10">
                <a
                  href="#formular"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base font-medium"
                >
                  Získať predbežnú ponuku
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-base font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  NDA pred prvou hodnotou
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Bez provízií
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Diskrétnosť garantovaná
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AKO TO FUNGUJE */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="max-w-3xl mb-10 sm:mb-14">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Ako to funguje
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                  Štyri jasné kroky od oslovenia po férovú ponuku
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {[
                {
                  icon: ClipboardCheck,
                  step: "1",
                  title: "Vyplníte formulár",
                  duration: "5 minút",
                  text: "Stačia základné údaje o firme. Detailné výkazy ešte netreba.",
                },
                {
                  icon: Phone,
                  step: "2",
                  title: "Krátky telefonát",
                  duration: "15 minút",
                  text: "Bez záväzku. Pozrieme sa, či sa hľadáme.",
                },
                {
                  icon: ShieldCheck,
                  step: "3",
                  title: "NDA a obhliadka",
                  duration: "1–2 týždne",
                  text: "Po podpise NDA detailne preveríme finančnú aj prevádzkovú stránku.",
                },
                {
                  icon: HandCoins,
                  step: "4",
                  title: "Ponuka a uzavretie",
                  duration: "30–60 dní",
                  text: "Pošleme férovú cenovú ponuku. Ak ju prijmete, riešime prevod.",
                },
              ].map((s) => (
                <AnimatedSection key={s.step}>
                  <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <s.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-serif text-2xl sm:text-3xl text-muted-foreground/40">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl text-foreground mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary uppercase tracking-wider mb-3">
                      {s.duration}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* PRE KOHO JE TO URČENÉ */}
        <section className="pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                  <div>
                    <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      Pre koho je to určené
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mt-3 leading-tight">
                      Hľadáme firmy ako tá vaša
                    </h2>
                  </div>
                  <ul className="lg:col-span-2 space-y-4 sm:space-y-5">
                    {[
                      <>Funkčné <strong>slovenské firmy</strong> s ročným obratom <strong>od 200 000 €</strong></>,
                      <>Ročná <strong>EBITDA od 120 000 €</strong></>,
                      <>Stabilné odvetvia: <strong>výroba, služby, e-commerce, gastronómia, real estate, stavebníctvo, IT</strong></>,
                      <>Majitelia, ktorí hľadajú odchod, generačnú výmenu alebo strategického partnera</>,
                    ].map((line, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-base sm:text-lg text-foreground/80 leading-relaxed"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* PREČO PREDAŤ CEZ NÁS */}
        <section className="pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="max-w-3xl mb-10 sm:mb-14">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Prečo predať cez ASSETRA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                  Štyri rozdiely oproti maklérom a sprostredkovateľom
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {[
                {
                  icon: HandCoins,
                  title: "Priamy investor, nie sprostredkovateľ",
                  text: "Sme samotný kupujúci. Z vašej ceny si neberieme žiadnu províziu ani sprostredkovateľský poplatok.",
                },
                {
                  icon: ShieldCheck,
                  title: "Diskrétnosť ako štandard",
                  text: "NDA podpisujeme ešte predtým, ako od vás dostaneme akékoľvek konkrétne čísla. Vašu firmu, klientov ani úmysel predaja s nikým nezdieľame.",
                },
                {
                  icon: Timer,
                  title: "Rýchle a jasné rozhodnutie",
                  text: "Po prvej obhliadke do 7 dní viete, či máme záujem a v akom rozsahu. Žiadne mesiace neistoty.",
                },
                {
                  icon: TrendingUp,
                  title: "Investujeme s víziou dlhodobého rastu",
                  text: "Nekupujeme na rozdelenie a ďalší predaj. Hľadáme partnerov a značky, ktoré vieme rozvíjať.",
                },
              ].map((r) => (
                <AnimatedSection key={r.title}>
                  <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <r.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
                      {r.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="max-w-3xl mb-10 sm:mb-14">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Časté otázky
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                  Odpovede na to, čo si majitelia firiem najčastejšie pýtajú
                </h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="max-w-4xl">
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "Akú firmu vykupujete?",
                      a: "Funkčné slovenské spoločnosti s ročným obratom od 200 000 € a EBITDA od 120 000 €. Sústredíme sa na výrobu, služby, e-commerce, gastronómiu, real estate, stavebníctvo a IT. Sektor pre nás nie je rozhodujúci — kľúčová je stabilita a perspektíva rastu.",
                    },
                    {
                      q: "Ako stanovujete cenu?",
                      a: "Cena vychádza z viacnásobku EBITDA a hodnoty aktív, upravená o riziká odvetvia, kvalitu zmlúv s odberateľmi a stabilitu cashflow. Konkrétny rozsah dohodneme po obhliadke firmy.",
                    },
                    {
                      q: "Čo sa stane s mojimi zamestnancami?",
                      a: "Vo väčšine prípadov firmu rozvíjame ďalej a zamestnancov potrebujeme. Pri predaji prechádzajú na nového majiteľa s pôvodnými pracovnými zmluvami v zmysle Zákonníka práce.",
                    },
                    {
                      q: "Ako zaručujete diskrétnosť?",
                      a: "NDA podpisujeme predtým, ako nám oznámite akékoľvek interné čísla — obrat, klientov, zmluvy. Celá komunikácia prebieha priamo medzi nami a vami, nie cez tretie strany.",
                    },
                    {
                      q: "Koľko ma to bude stáť?",
                      a: "Nič. Sme priamy investor, neúčtujeme si províziu, sprostredkovateľský poplatok ani náhradu nákladov. Ak po obhliadke nedôjde k dohode, nemáte voči nám žiadny záväzok.",
                    },
                    {
                      q: "Aký je celý proces?",
                      a: "Vyplníte formulár → krátky telefonát → podpis NDA → obhliadka → predbežná ponuka → due diligence → finálna ponuka → uzavretie. Celý proces od vyplnenia formulára po prevod firmy zvyčajne trvá 6–10 týždňov.",
                    },
                  ].map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="bg-secondary/40 rounded-xl sm:rounded-2xl px-5 sm:px-6 border-0"
                    >
                      <AccordionTrigger className="text-left font-serif text-base sm:text-lg md:text-xl text-foreground hover:no-underline py-5 sm:py-6">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5 sm:pb-6">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* SEKUNDÁRNY TELEFÓNNY CTA */}
        <section className="pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-5 sm:mb-6" />
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mb-4 sm:mb-5 leading-tight">
                  Radšej zavolajte priamo
                </h3>
                <p className="text-primary-foreground/60 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto">
                  Ak máte otázky alebo chcete prediskutovať váš prípad ešte
                  pred vyplnením formulára, sme dostupní v pracovných dňoch
                  od 9:00 do 18:00.
                </p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-lg sm:text-xl font-medium"
                >
                  <Phone className="w-5 h-5" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* FORMULÁR */}
        <section id="formular" className="pb-16 sm:pb-24 md:pb-32 scroll-mt-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16">
                <div className="max-w-2xl mb-8 sm:mb-12">
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/50">
                    Predbežná žiadosť
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mt-3 mb-4 leading-tight">
                    Pošlite nám predbežnú žiadosť
                  </h2>
                  <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                    Vyplnenie zaberie 3–5 minút. Ozveme sa Vám do 2 pracovných
                    dní. Vaše údaje sú dôverné. Zaviažeme sa NDA pred
                    akoukoľvek ďalšou komunikáciou.
                  </p>
                </div>

                {submitted ? (
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-8 text-center max-w-2xl">
                    <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-serif text-xl sm:text-2xl text-primary-foreground mb-2">
                      Ďakujeme
                    </h3>
                    <p className="text-primary-foreground/70 text-sm sm:text-base">
                      Vaša žiadosť bola úspešne odoslaná. Ozveme sa Vám
                      v najbližších 2 pracovných dňoch.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Meno a priezvisko *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Ján Novák"
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Email *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="jan@firma.sk"
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Telefón *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="+421 900 000 000"
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Názov firmy / IČO *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Moja firma s.r.o. / 12345678"
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Odvetvie *
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
                                    <SelectValue placeholder="Vyberte odvetvie" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {industryOptions.map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="saleReason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Dôvod predaja *
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
                                    <SelectValue placeholder="Vyberte dôvod" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {reasonOptions.map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="annualTurnover"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Ročný obrat *
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
                                    <SelectValue placeholder="Vyberte rozsah" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {turnoverOptions.map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="annualEbitda"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Ročná EBITDA / čistý zisk *
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
                                    <SelectValue placeholder="Vyberte rozsah" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {ebitdaOptions.map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              Krátka správa (voliteľné)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={4}
                                placeholder="Čo by ste nám chceli povedať o vašej firme alebo situácii…"
                                className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start gap-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value as unknown as boolean}
                                  onCheckedChange={(v) =>
                                    field.onChange(v === true)
                                  }
                                  className="mt-1 border-primary-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                              </FormControl>
                              <FormLabel className="text-primary-foreground/70 text-sm font-normal leading-relaxed cursor-pointer">
                                Súhlasím so spracovaním osobných údajov pre
                                účely komunikácie ohľadom predaja firmy
                                v zmysle{" "}
                                <Link
                                  to="/ochrana-udajov"
                                  className="text-primary underline underline-offset-2"
                                >
                                  zásad ochrany osobných údajov
                                </Link>
                                .
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto group rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Odosielam…
                          </>
                        ) : (
                          <>
                            Odoslať predbežnú žiadosť
                            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
    </LandingLayout>
  );
};

export default PredamFirmu;
