import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  Handshake,
  KeyRound,
  Loader2,
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
        description: "Ozveme sa Vám do 2 pracovných dní.",
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
      title="Zhodnotenie kapitálu 9–12 % p.a. | Zabezpečené nehnuteľnosťou | ASSETRA Investments"
      description="Pôžičkový vzťah s ASSETRA Investments — fixný výnos 9–12 % p.a. zabezpečený záložným právom na slovenskú nehnuteľnosť. Mesačná renta + bonus na konci doby viazanosti."
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-16 sm:py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary/80 mb-5 sm:mb-7">
              Pre súkromných investorov
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 sm:mb-8">
              Zhodnotenie kapitálu 9 – 12 % p.a. zabezpečené nehnuteľnosťou.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/70 leading-relaxed max-w-3xl mb-8 sm:mb-10">
              Pôžičkový vzťah so súkromnou investičnou skupinou ASSETRA
              Investments. Mesačná renta + bonus na konci doby viazanosti.
              Investovaný kapitál sa používa výlučne na obchod s nehnuteľnosťami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8 sm:mb-10">
              <a
                href="#formular"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base font-medium"
              >
                Nezáväzná konzultácia
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
                9 – 12 % p.a. fixne
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Záložné právo na nehnuteľnosť
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Mesačná renta + bonus na konci
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
                Štyri kroky od prvého kontaktu po pripísanie výnosu
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
                text: "Vyplníte formulár alebo zavoláte. Žiadne osobné údaje navyše, žiadny záväzok.",
              },
              {
                icon: Phone,
                step: "2",
                title: "Osobná konzultácia",
                duration: "30 minút",
                text: "Prejdeme spolu vaše ciele, výšku kapitálu, horizont a očakávania. V tejto fáze ešte nič nepodpisujete.",
              },
              {
                icon: KeyRound,
                step: "3",
                title: "Krycia nehnuteľnosť + zmluvy",
                duration: "1–2 týždne",
                text: "Vyberieme konkrétnu nehnuteľnosť na zabezpečenie. Pripravíme zmluvu o pôžičke a záložnú zmluvu, ktorú overí notár.",
              },
              {
                icon: Banknote,
                step: "4",
                title: "Pripis kapitálu a výplaty",
                duration: "priebežne",
                text: "Po vklade kapitálu začínajú mesačné výplaty renty. Bonus dostávate na konci dohodnutej doby viazanosti spolu s istinou.",
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
                Štyri dôvody, prečo má váš kapitál pevné základy
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Záložné právo na konkrétnu nehnuteľnosť",
                text: "Vaša pôžička je zabezpečená záložným právom na konkrétnu nehnuteľnosť v našom portfóliu. Záložná zmluva je notársky overená a zapísaná v katastri.",
              },
              {
                icon: Coins,
                title: "Mesačná renta + bonus na konci",
                text: "Časť dohodnutého výnosu vám vyplácame mesačne ako pravidelnú rentu. Zostávajúci bonus dostanete spolu s istinou na konci doby viazanosti.",
              },
              {
                icon: TrendingUp,
                title: "Účel kapitálu jasne definovaný",
                text: "Investovaný kapitál sa používa výlučne na obchod s nehnuteľnosťami — kúpa, rekonštrukcia, prenájom, predaj. Žiadne špekulatívne projekty mimo tohto rámca.",
              },
              {
                icon: Handshake,
                title: "Priamy princípal, nie sprostredkovateľ",
                text: "Komunikujete priamo s nami — investorom, ktorý kapitál nasadí. Žiadny brokerský medzistupeň, žiadne provízie z vášho výnosu.",
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
                    Súkromný investor s voľným kapitálom
                  </h2>
                </div>
                <ul className="lg:col-span-2 space-y-4 sm:space-y-5">
                  {[
                    <>
                      Súkromní investori s voľným kapitálom <strong>od 50 000 €</strong> (so zabezpečením záložným právom)
                    </>,
                    <>
                      Tí, ktorí hľadajú <strong>vyšší výnos ako termínovaný vklad</strong>, ale s reálnym zabezpečením
                    </>,
                    <>
                      Tí, ktorí oceňujú <strong>pravidelný cashflow</strong> formou mesačnej renty
                    </>,
                    <>
                      Pre kapitál <strong>od 300 000 €</strong> — možnosť spoluinvestičnej spolupráce na konkrétnom projekte
                    </>,
                    <>
                      Výnimočne aj <strong>od 10 000 €</strong> (bez zabezpečenia záložným právom — riešime individuálne)
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

      {/* FAQ */}
      <section className="pb-16 sm:pb-24 md:pb-32">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Časté otázky
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
                Odpovede na to, čo si investori najčastejšie pýtajú
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  {
                    q: "Aký výnos môžem reálne očakávať?",
                    a: "Fixný úrok v rozsahu 9 – 12 % p.a. Konkrétna sadzba závisí od výšky vkladu, doby viazanosti a krycej nehnuteľnosti. Časť výnosu vyplácame mesačne ako rentu, zvyšok dostávate ako bonus na konci doby viazanosti spolu s istinou.",
                  },
                  {
                    q: "Ako presne funguje záložné právo?",
                    a: "Pri investícii od 50 000 € k vám priraďujeme konkrétnu nehnuteľnosť z nášho portfólia po celom Slovensku. Záložná zmluva je notársky overená a záložné právo zapísané v katastri nehnuteľností. Ak by sme nedodržali záväzky, máte právo realizovať záloh na uspokojenie pohľadávky.",
                  },
                  {
                    q: "Ako sú vyplácané peniaze?",
                    a: "Mesačne dostávate na účet rentu (časť dohodnutého výnosu). Zvyšok výnosu — bonus — dostávate spolu s pôvodnou istinou na konci dohodnutej doby viazanosti (3 – 5 rokov). Presný harmonogram výplat je súčasťou zmluvy.",
                  },
                  {
                    q: "Kde sa moje peniaze používajú?",
                    a: "Investovaný kapitál ide výlučne na obchod s nehnuteľnosťami — kúpa, rekonštrukcia, prenájom a následný predaj. Naše nehnuteľnosti sú prenajaté a generujú cashflow, ktorý umožňuje pravidelnú výplatu vašej renty.",
                  },
                  {
                    q: "Aká je minimálna a maximálna investícia?",
                    a: "Štandardná minimálna investícia je 50 000 € (so záložným právom na nehnuteľnosť). Výnimočne vieme prijať aj nižšie sumy od 10 000 €, ale bez zabezpečenia záložným právom. Maximum nemáme — od 300 000 € otvárame aj možnosť priamej spoluinvestičnej spolupráce na konkrétnom deal-e.",
                  },
                  {
                    q: "Čo ak budem chcieť skončiť skôr?",
                    a: "Doba viazanosti je dohodnutá v zmluve (3 – 5 rokov). Predčasné ukončenie zo strany investora rieši zmluva individuálne — väčšinou je možné po dohode s úpravou výnosovej časti. Detaily prejdeme v rámci konzultácie pred podpisom.",
                  },
                  {
                    q: "Aké sú riziká?",
                    a: "Každá investícia nesie riziko. Hlavné riziká pri tomto type produktu: pokles hodnoty krycej nehnuteľnosti, omeškanie cashflowu z prenájmu, výnimočné situácie na realitnom trhu. Záložné právo na konkrétnu nehnuteľnosť toto riziko významne tlmí, ale úplne ho neeliminuje. Konkrétne riziká vždy diskutujeme pri konzultácii.",
                  },
                  {
                    q: "Ako je to so zdanením úrokov?",
                    a: "Výnosy z pôžičky podliehajú dani z príjmu fyzických osôb. Konkrétny daňový režim závisí od vášho statusu (FO/PO, rezident/nerezident). Odporúčame konzultovať s vlastným daňovým poradcom; my poskytujeme všetky podklady potrebné pre správne priznanie.",
                  },
                  {
                    q: "Čo zahŕňa spoluinvestičná spolupráca od 300 000 €?",
                    a: "Pri kapitáli od 300 000 € otvárame partnerský model — namiesto pôžičkového vzťahu vstupujete priamo do konkrétneho realitného alebo akvizičného projektu ako spoluinvestor. Štruktúru, výnosové pomery a exit dohodneme deal-by-deal podľa parametrov daného projektu.",
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
                Ak máte otázky alebo chcete prediskutovať konkrétne parametre
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
                  Nezáväzná konzultácia
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mt-3 mb-4 leading-tight">
                  Prediskutujme váš zámer
                </h2>
                <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                  Vyplnenie zaberie 2–3 minúty. Ozveme sa Vám do 2 pracovných
                  dní. Vaše údaje sú dôverné a slúžia výlučne na komunikáciu
                  ohľadom investičnej spolupráce.
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
                              placeholder="Napr. zdroj kapitálu, otázky, alebo špecifické očakávania…"
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
                          Odoslať nezáväznú žiadosť
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
