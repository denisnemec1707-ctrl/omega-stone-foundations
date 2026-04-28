import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Banknote,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  FileCheck,
  Handshake,
  KeyRound,
  Loader2,
  Lock,
  Phone,
  ShieldCheck,
  Sparkles,
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

const investmentAmountOptions = [
  "10 000 – 49 000 € (bez záložného práva, len výnimkou)",
  "50 000 – 99 000 €",
  "100 000 – 299 000 €",
  "300 000 € a viac (možnosť spoluinvestičnej spolupráce)",
];

const investmentHorizonOptions = [
  "3 roky",
  "4 roky",
  "5 rokov",
  "Flexibilné — dohodneme individuálne",
];

const contactPreferenceOptions = ["Telefón", "Email"];

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
  investmentAmount: z
    .string()
    .min(1, { message: "Vyberte plánovanú výšku investície" }),
  investmentHorizon: z
    .string()
    .min(1, { message: "Vyberte plánovaný horizont" }),
  contactPreference: z
    .string()
    .min(1, { message: "Vyberte preferovaný spôsob kontaktu" }),
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

const Investovat = () => {
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
      investmentAmount: "",
      investmentHorizon: "",
      contactPreference: "",
      message: "",
      consent: false as unknown as true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("investment_inquiries")
        .insert({
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          investment_amount: values.investmentAmount,
          investment_horizon: values.investmentHorizon,
          contact_preference: values.contactPreference,
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
        description: "Ozveme sa Vám do 24 hodín v pracovných dňoch.",
      });
    } catch (err) {
      console.error("Investment inquiry submit error", err);
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
      title="Pravidelný príjem 9–12 % p.a. zo zabezpečenej pôžičky | ASSETRA Investments"
      description="Investujte od 50 000 € do pôžičky zabezpečenej záložným právom na konkrétnu slovenskú nehnuteľnosť. Mesačná renta od prvého mesiaca, bonus pri vrátení istiny. 9–12 % p.a. fixne."
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-16 sm:py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary/80 mb-5 sm:mb-7">
              Pre súkromných investorov od 50 000 €
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 sm:mb-8">
              Z vášho kapitálu pravidelný mesačný príjem. Zabezpečený nehnuteľnosťou.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/70 leading-relaxed max-w-3xl mb-8 sm:mb-10">
              Pôžička súkromnej investičnej skupine ASSETRA Investments s fixným
              úrokom <strong className="text-primary-foreground">9 – 12 % p.a.</strong>{" "}
              Zabezpečená záložným právom na konkrétnu slovenskú nehnuteľnosť.
              Mesačnú rentu Vám vyplácame priebežne;{" "}
              <strong className="text-primary-foreground">istinu späť plus bonus</strong>{" "}
              dostávate na konci dohodnutej doby viazanosti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8 sm:mb-10">
              <a
                href="#formular"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base font-medium"
              >
                Chcem nezáväznú konzultáciu
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
                9 – 12 % p.a. fixne (termák ~2 %)
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Notársky overené zmluvy + kataster
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Mesačná renta od 1. mesiaca
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRÍKLAD VÝNOSU */}
      <section className="py-16 sm:py-20 md:py-24 bg-charcoal text-primary-foreground border-t border-primary-foreground/10">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-10 sm:mb-12">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary">
                Príklad výnosu
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground mt-3 mb-4 leading-tight">
                Koľko Vám reálne pribudne na účte
              </h2>
              <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                Ilustratívne hodnoty pri 5-ročnej dobe viazanosti a fixnom úroku
                9 – 12 % p.a. Presné parametre — vrátane podielu mesačná
                renta / koncový bonus — dohodneme individuálne.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                label: "Investícia 50 000 €",
                monthly: "225 – 300 €",
                bonus: "9 000 – 12 000 €",
                total: "22 500 – 30 000 €",
              },
              {
                label: "Investícia 100 000 €",
                monthly: "450 – 600 €",
                bonus: "18 000 – 24 000 €",
                total: "45 000 – 60 000 €",
                highlight: true,
              },
              {
                label: "Investícia 300 000 €",
                monthly: "1 350 – 1 800 €",
                bonus: "54 000 – 72 000 €",
                total: "135 000 – 180 000 €",
              },
            ].map((row) => (
              <AnimatedSection key={row.label}>
                <div
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full ${
                    row.highlight
                      ? "bg-primary/15 border border-primary/40"
                      : "bg-primary-foreground/5 border border-primary-foreground/10"
                  }`}
                >
                  <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-5">
                    {row.label}
                  </p>
                  <div className="space-y-4 mb-5">
                    <div>
                      <p className="text-primary-foreground/50 text-xs mb-1">
                        Mesačná renta na účet
                      </p>
                      <p className="font-serif text-xl sm:text-2xl text-primary-foreground">
                        {row.monthly}
                      </p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/50 text-xs mb-1">
                        Bonus pri vrátení istiny
                      </p>
                      <p className="font-serif text-xl sm:text-2xl text-primary-foreground">
                        {row.bonus}
                      </p>
                    </div>
                  </div>
                  <div className="pt-5 border-t border-primary-foreground/10">
                    <p className="text-primary text-xs uppercase tracking-wider mb-1">
                      Celkový výnos za 5 rokov
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl text-primary-foreground">
                      {row.total}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-primary-foreground/5 rounded-2xl p-5 sm:p-6 border border-primary-foreground/10">
              <p className="text-primary-foreground/70 text-sm sm:text-base">
                Chcete vedieť, koľko by ste reálne dostali pri{" "}
                <strong className="text-primary-foreground">Vašej</strong>{" "}
                konkrétnej výške a horizonte?
              </p>
              <a
                href="#formular"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm sm:text-base font-medium whitespace-nowrap"
              >
                Spočítajme Vám to
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MECHANIZMUS — AKO VZNIKÁ VÁŠ VÝNOS */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Mechanizmus výnosu
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                Odkiaľ sa berie 9 – 12 % a prečo je to udržateľné
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Žiadne špekulácie. Vaša pôžička sa nasadzuje do reálnych
                nehnuteľností, ktoré generujú reálny cashflow. Z toho sa platí
                Vaša renta.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
              {[
                {
                  icon: Coins,
                  title: "Vy poskytnete kapitál",
                  text: "Pôžičkou na základe individuálnej zmluvy.",
                },
                {
                  icon: Building2,
                  title: "Nasadíme ho do nehnuteľnosti",
                  text: "Kúpa, rekonštrukcia, prenájom — výlučne real estate.",
                },
                {
                  icon: TrendingUp,
                  title: "Nehnuteľnosť generuje príjem",
                  text: "Z prenájmu a postupného zhodnotenia.",
                },
                {
                  icon: Banknote,
                  title: "Mesačná renta na Váš účet",
                  text: "Časť výnosu Vám vyplácame priebežne.",
                },
                {
                  icon: Sparkles,
                  title: "Istina späť + bonus",
                  text: "Po dohodnutej dobe viazanosti.",
                },
              ].map((s, i) => (
                <div
                  key={s.title}
                  className="bg-secondary/50 rounded-2xl p-5 sm:p-6 h-full relative"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-serif text-sm text-muted-foreground/60">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-foreground mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-5 sm:p-6">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                <strong>Po celú dobu</strong> je Vaša pôžička zabezpečená
                záložným právom na konkrétnu nehnuteľnosť — overiteľné na liste
                vlastníctva v katastri.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AKO TO FUNGUJE — PROCES */}
      <section className="pb-16 sm:pb-24 md:pb-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Ako sa začne spolupráca
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                Štyri kroky od Vášho prvého kliknutia po prvú rentu
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                icon: ClipboardCheck,
                step: "1",
                title: "Nezáväzný kontakt",
                duration: "5 minút",
                text: "Vyplníte formulár alebo zavoláte. Žiadne osobné údaje navyše, žiadny záväzok, žiadna automatická CRM reťaz.",
              },
              {
                icon: Phone,
                step: "2",
                title: "Osobná konzultácia",
                duration: "30 – 45 minút",
                text: "Prejdeme spolu Váš zámer, výšku kapitálu, horizont a očakávania. V tejto fáze ešte nič nepodpisujete.",
              },
              {
                icon: KeyRound,
                step: "3",
                title: "Krycia nehnuteľnosť + zmluvy",
                duration: "1 – 2 týždne",
                text: "Vyberieme konkrétnu nehnuteľnosť na zabezpečenie. Pripravíme zmluvu o pôžičke a záložnú zmluvu. Notár overí, kataster zapíše.",
              },
              {
                icon: Banknote,
                step: "4",
                title: "Pripis kapitálu, štart výplat",
                duration: "od 1. mesiaca",
                text: "Po vklade kapitálu Vám začínajú chodiť mesačné výplaty renty. Bonus dostávate spolu s istinou na konci dohodnutej doby.",
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

      {/* PREČO ASSETRA */}
      <section className="pb-16 sm:pb-24 md:pb-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Prečo investovať cez ASSETRA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                Čím sa líšime od fondov, dlhopisov a bankových produktov
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Záložné právo na konkrétnu nehnuteľnosť",
                text: "Nie pool aktív, nie diverzifikovaný fond. Konkrétna nehnuteľnosť priradená k Vašej pôžičke, zapísaná v katastri, overiteľná na liste vlastníctva.",
              },
              {
                icon: Coins,
                title: "Mesačný cashflow + záverečný bonus",
                text: "Časť výnosu dostávate priebežne — od prvého mesiaca po posledný. Bonus dostávate spolu s istinou na konci. Žiadne čakanie 5 rokov na všetky peniaze naraz.",
              },
              {
                icon: TrendingUp,
                title: "Účel kapitálu jasne definovaný",
                text: "Investovaný kapitál ide výlučne na obchod s nehnuteľnosťami — kúpa, rekonštrukcia, prenájom, predaj. Nie krypto, nie startupy, nie marketingové kampane.",
              },
              {
                icon: Handshake,
                title: "Priamy princípal, žiadny medzistupeň",
                text: "Komunikujete priamo s nami — investorom, ktorý kapitál nasadí. Žiadny brokerský poradca, žiadne provízie z Vášho výnosu, žiadne vrstvy poplatkov.",
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

      {/* PRE KOHO JE TO VHODNÉ */}
      <section className="pb-16 sm:pb-24 md:pb-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                <div>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    Pre koho je to vhodné
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mt-3 leading-tight">
                    Spoznáte sa v niektorom z týchto bodov?
                  </h2>
                </div>
                <ul className="lg:col-span-2 space-y-4 sm:space-y-5">
                  {[
                    <>
                      Máte voľný kapitál <strong>od 50 000 €</strong>, ktorý
                      v termáku stráca s infláciou
                    </>,
                    <>
                      Hľadáte <strong>vyšší výnos ako termínovaný vklad</strong>
                      , ale chcete reálne zabezpečenie — nie sľuby
                    </>,
                    <>
                      Oceňujete <strong>pravidelný mesačný cashflow</strong>{" "}
                      namiesto čakania na výplatu o 5 rokov
                    </>,
                    <>
                      Pri kapitáli <strong>od 300 000 €</strong> Vás zaujíma aj
                      možnosť spoluinvestičnej spolupráce na konkrétnom projekte
                    </>,
                    <>
                      Máte <strong>výnimočne aj 10 – 49 000 €</strong>?
                      Posúdime individuálne — bez záložného práva
                    </>,
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

      {/* RISK REVERSAL — VAŠE PENIAZE CHRÁNIME TAKTO */}
      <section className="pb-16 sm:pb-24 md:pb-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Vaše peniaze chránime takto
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                Päť konkrétnych právnych zábezpek — nie marketingových sľubov
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                icon: FileCheck,
                title: "Notársky overené zmluvy",
                text: "Zmluvu o pôžičke aj záložnú zmluvu overuje notár. Nezávislý subjekt potvrdí identitu, vôľu a obsah. Vašu kópiu zmluvy si môžete dať skontrolovať aj vlastnému advokátovi.",
              },
              {
                icon: Lock,
                title: "Záložné právo zapísané v katastri",
                text: "Zápis záložného práva v katastri nehnuteľností je verifikovateľný kýmkoľvek na liste vlastníctva. Nezáleží na našom slove — záznam je verejný a nezávislý.",
              },
              {
                icon: Building2,
                title: "Konkrétna nehnuteľnosť, nie pool aktív",
                text: "K Vašej pôžičke priraďujeme konkrétnu nehnuteľnosť (ulica, parcelné číslo, list vlastníctva). Nie ste „jeden z mnohých“ vo fonde, kde nikto nevie, čo presne zabezpečuje jeho vklad.",
              },
              {
                icon: ShieldCheck,
                title: "Pri omeškaní môžete realizovať záloh",
                text: "Ak by sme nedodržali záväzky zo zmluvy, máte zákonné právo realizovať záloh a získať peniaze priamo z predaja nehnuteľnosti. Bez súdneho ťahania a bez prerozdeľovania medzi iných veriteľov.",
              },
              {
                icon: Handshake,
                title: "Individuálna zmluva, nie štandardizovaný produkt",
                text: "Zmluva sa pripravuje na mieru — výška, doba viazanosti, rozdelenie renta/bonus, podmienky predčasného ukončenia. Vítame, ak si zmluvu nechá pred podpisom skontrolovať Váš advokát.",
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
                Otázky, ktoré dostávame najčastejšie — a úprimné odpovede
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  {
                    q: "Aké sú reálne riziká?",
                    a: "Každá investícia nesie riziko a my Vás nebudeme presviedčať o opaku. Hlavné riziká pri tomto produkte: pokles hodnoty krycej nehnuteľnosti, omeškanie cashflowu z prenájmu, výnimočné situácie na realitnom trhu. Záložné právo na konkrétnu nehnuteľnosť toto riziko významne tlmí — dáva Vám priamy nárok na predaj nehnuteľnosti, ak by sme nedodržali záväzky. Konkrétne riziká vždy diskutujeme pri konzultácii a navrhujeme, ako ich ošetriť v zmluve.",
                  },
                  {
                    q: "Ako presne funguje záložné právo? Ako sa to dá overiť?",
                    a: "Pri investícii od 50 000 € k Vám priraďujeme konkrétnu nehnuteľnosť z nášho portfólia po celom Slovensku — viete adresu, parcelné číslo a list vlastníctva. Záložná zmluva sa notársky overí, záložné právo sa zapíše do katastra nehnuteľností. List vlastníctva je verejný — kedykoľvek si môžete (aj cez kataster online) overiť, že záložné právo na Vašu pohľadávku tam skutočne je. Ak by sme nedodržali záväzky, máte zákonné právo realizovať záloh.",
                  },
                  {
                    q: "Aký výnos môžem reálne očakávať?",
                    a: "Fixný úrok v rozsahu 9 – 12 % p.a. Konkrétna sadzba závisí od výšky vkladu, doby viazanosti (3 – 5 rokov) a parametrov krycej nehnuteľnosti. Pri 50 000 € a 5-ročnej viazanosti je celkový výnos typicky 22 500 – 30 000 € (mesačná renta + bonus pri vrátení istiny). Konkrétne číslo dohodneme v zmluve a tam je ako fixný záväzok — nie ako „očakávaný výnos“.",
                  },
                  {
                    q: "Ako a kedy sú vyplácané peniaze?",
                    a: "Mesačne dostávate na účet rentu — časť dohodnutého výnosu — a to od prvého mesiaca po pripísaní kapitálu. Zvyšok výnosu (bonus) Vám vyplácame spolu s pôvodnou istinou na konci dohodnutej doby viazanosti. Presný harmonogram výplat — dátumy, sumy — je súčasťou zmluvy a je fixný.",
                  },
                  {
                    q: "Aká je minimálna a maximálna výška?",
                    a: "Štandardná minimálna investícia so záložným právom je 50 000 €. Výnimočne vieme prijať aj nižšie sumy od 10 000 €, ale bez zabezpečenia záložným právom (riešime individuálne, väčšinou pri klientoch, ktorých už dlhšie poznáme). Maximum nemáme — od 300 000 € otvárame aj možnosť priamej spoluinvestičnej spolupráce na konkrétnom deal-e.",
                  },
                  {
                    q: "Čo ak budem chcieť skončiť skôr?",
                    a: "Doba viazanosti je dohodnutá v zmluve (typicky 3 – 5 rokov) a tam patrí — kratšia viazanosť by neumožnila plánovať obchod s nehnuteľnosťou. Predčasné ukončenie zo strany investora rieši zmluva individuálne — väčšinou je možné po dohode s úpravou výnosovej časti. Ak vopred viete, že potrebujete vyššiu likviditu, povedzte nám to — nastavíme kratšiu viazanosť alebo iný produkt.",
                  },
                  {
                    q: "Kde sa moje peniaze konkrétne používajú?",
                    a: "Investovaný kapitál ide výlučne na obchod s nehnuteľnosťami — kúpa, rekonštrukcia, prenájom a následný predaj. Naše nehnuteľnosti sú prenajaté a generujú cashflow, z ktorého sa vypláca Vaša renta. Žiadne mimo-realitné projekty, žiadne krížové financovanie iných investícií, žiadne marketingové výdavky.",
                  },
                  {
                    q: "Ako je to so zdanením úrokov?",
                    a: "Výnosy z pôžičky podliehajú dani z príjmu fyzických osôb. Konkrétny daňový režim závisí od Vášho statusu (FO/PO, rezident/nerezident). Odporúčame konzultovať s vlastným daňovým poradcom; my Vám poskytujeme všetky podklady (zmluva, prehľad výplat) potrebné pre správne priznanie.",
                  },
                  {
                    q: "Čo zahŕňa spoluinvestičná spolupráca od 300 000 €?",
                    a: "Pri kapitáli od 300 000 € otvárame partnerský model — namiesto pôžičkového vzťahu vstupujete priamo do konkrétneho realitného alebo akvizičného projektu ako spoluinvestor. Štruktúru, výnosové pomery a exit dohodneme deal-by-deal podľa parametrov daného projektu. Vyšší upside ale aj viac angažovanosti — nie pre každého.",
                  },
                  {
                    q: "Prečo by som Vám mal veriť?",
                    a: "Žiadne sľuby, len fakty. (1) Komunikujete priamo s CEO. (2) Záložné právo je verejne overiteľné v katastri — nezáleží na našom slove. (3) Zmluvy sú notársky overené a ak chcete, prejde ich aj Váš advokát. (4) Nie sme broker s províziami — sme princípal s vlastným kapitálom v hre. (5) Žiadne fake credibility na našej stránke (X klientov, Y rokov skúseností) — len mechanizmus a zmluva, ktoré buď fungujú alebo nie. Najlepší spôsob, ako sa rozhodnúť: vypočujte si nás na 30-minútovej nezáväznej konzultácii.",
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
                Ak chcete prediskutovať konkrétne čísla — výšku, dobu, krycie
                nehnuteľnosti — bez vyplnenia formulára, sme dostupní v
                pracovných dňoch od 9:00 do 18:00.
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
                  Nezáväzná konzultácia
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mt-3 mb-4 leading-tight">
                  Spočítajme Váš konkrétny výnos
                </h2>
                <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                  Vyplnenie zaberie 2 minúty.{" "}
                  <strong className="text-primary-foreground">
                    Ozveme sa Vám do 24 hodín v pracovných dňoch.
                  </strong>{" "}
                  Bez automatickej CRM reťaze, bez ďalšieho marketingu — len
                  jeden osobný telefonát alebo email od nás. Vaše údaje sú
                  dôverné.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-8 text-center max-w-2xl">
                  <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl sm:text-2xl text-primary-foreground mb-2">
                    Ďakujeme
                  </h3>
                  <p className="text-primary-foreground/70 text-sm sm:text-base">
                    Vaša žiadosť bola úspešne odoslaná. Ozveme sa Vám do 24
                    hodín v pracovných dňoch.
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
                                placeholder="jan@email.sk"
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
                        name="contactPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              Preferovaný kontakt *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
                                  <SelectValue placeholder="Telefón / Email" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {contactPreferenceOptions.map((s) => (
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
                        name="investmentAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              Plánovaná výška investície *
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
                                {investmentAmountOptions.map((s) => (
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
                        name="investmentHorizon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              Plánovaný horizont *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
                                  <SelectValue placeholder="Vyberte horizont" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {investmentHorizonOptions.map((s) => (
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
                              placeholder="Napr. zdroj kapitálu, kedy chcete začať, špecifické otázky…"
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
                              účely komunikácie ohľadom investičnej spolupráce
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
                          Odoslať — ozveme sa do 24 h
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

export default Investovat;
