import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import {
  LandingLayout,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/components/landing/LandingLayout";
import heroMountains from "@/assets/hero-mountains.jpg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { submitForm } from "@/lib/submitForm";

const categoryOptions: { code: string; label: string }[] = [
  { code: "real_estate", label: "Nehnuteľnosti" },
  { code: "private_equity", label: "Akvizície firiem" },
  { code: "secured_loans", label: "Zabezpečené úvery" },
  { code: "co_investment", label: "Spoluinvestície (deal-by-deal)" },
];

const investmentRangeOptions = [
  "10 000 – 49 000 €",
  "50 000 – 99 000 €",
  "100 000 – 299 000 €",
  "300 000 € a viac",
];

const timeHorizonOptions = [
  "Krátkodobo (do 12 mesiacov)",
  "Strednodobo (1 – 3 roky)",
  "Dlhodobo (3+ rokov)",
  "Flexibilné — podľa príležitosti",
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
  categories: z
    .array(z.string())
    .min(1, { message: "Vyberte aspoň jednu kategóriu" }),
  investmentRange: z
    .string()
    .min(1, { message: "Vyberte plánovanú výšku investície" }),
  timeHorizon: z.string().min(1, { message: "Vyberte časový horizont" }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Musíte súhlasiť so spracovaním údajov" }),
  }),
  website: z.string().optional(), // honeypot — must remain empty
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

const Klub = () => {
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
      categories: [],
      investmentRange: "",
      timeHorizon: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Honeypot: bots fill this hidden field. Silent reject (fake success).
    if (values.website) {
      setSubmitted(true);
      form.reset();
      return;
    }
    setSubmitting(true);
    try {
      await submitForm(import.meta.env.VITE_WEBHOOK_KLUB, {
        form_source: "klub",
        submitted_at: new Date().toISOString(),
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        categories: values.categories.join(", "),
        investment_range: values.investmentRange,
        time_horizon: values.timeHorizon,
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

      setSubmitted(true);
      form.reset();
      toast({
        title: "Ste v klube",
        description: "Ozveme sa Vám keď bude niečo zaujímavé.",
      });
    } catch (err) {
      console.error("Klub subscription submit error", err);
      toast({
        title: "Niečo sa pokazilo",
        description:
          "Registrácia sa nepodarila. Skúste to znova alebo nám zavolajte na " +
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
      title="ASSETRA Klub | Investičné príležitosti pred verejnou ponukou"
      description="Pridajte sa do ASSETRA Klubu a dostávajte informácie o vybraných investičných príležitostiach (nehnuteľnosti, akvizície firiem, zabezpečené úvery) skôr, než idú na verejnosť."
    >
      {/* HERO */}
      <section className="relative overflow-hidden text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroMountains}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-20 sm:py-28 md:py-36 lg:py-44">
          <div className="max-w-4xl">
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-6 sm:mb-8">
              Pre súkromných investorov
            </span>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-5 sm:mb-7 tracking-tight">
              ASSETRA Klub.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground/85 leading-tight mb-8 sm:mb-10">
              Investičné príležitosti pred verejnou ponukou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a
                href="#registracia"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary-foreground text-charcoal hover:bg-primary-foreground/90 transition-colors text-base font-medium"
              >
                Zaregistrovať sa
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
          </div>
        </div>
      </section>

      {/* KĽÚČOVÉ BODY */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
                Po bezplatnej registrácii Vám pošleme výber zaujímavých investičných príležitostí —
                <strong className="text-foreground"> výkupy nehnuteľností</strong>,
                <strong className="text-foreground"> úverovanie realitných projektov</strong> a
                <strong className="text-foreground"> akvizície fungujúcich slovenských spoločností</strong>.
                Vždy len keď je niečo, čo zodpovedá Vášmu profilu.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                icon: Bell,
                title: "Prednostný prístup",
                text: "Vybrané príležitosti Vám pošleme skôr, než idú na verejnosť.",
              },
              {
                icon: Sparkles,
                title: "Bez záväzkov",
                text: "Členstvo je bezplatné. Žiadne fees, žiadne provízie. Reagujete len keď chcete.",
              },
              {
                icon: SlidersHorizontal,
                title: "Vaše preferencie",
                text: "Posielame iba to, čo zodpovedá Vášmu profilu — typ, rozsah a horizont.",
              },
              {
                icon: ShieldCheck,
                title: "Diskrétnosť",
                text: "Konkrétne detaily zdieľame pod NDA. Vaše údaje nezdieľame s nikým.",
              },
            ].map((b) => (
              <AnimatedSection key={b.title}>
                <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-5">
                    <b.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {b.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRÁCIA */}
      <section id="registracia" className="pb-16 sm:pb-24 md:pb-32 scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16">
              <div className="max-w-2xl mb-8 sm:mb-12">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/50">
                  Registrácia
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mt-3 mb-4 leading-tight">
                  Pridajte sa do klubu
                </h2>
                <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                  Vyplnenie zaberie 2 minúty.{" "}
                  <strong className="text-primary-foreground">
                    Posielame iba keď je niečo zaujímavé — žiadny spam.
                  </strong>
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-primary-foreground/30 bg-primary-foreground/10 p-6 sm:p-8 text-center max-w-2xl">
                  <CheckCircle2 className="w-10 h-10 text-primary-foreground mx-auto mb-4" />
                  <h3 className="font-serif text-xl sm:text-2xl text-primary-foreground mb-2">
                    Ste v klube
                  </h3>
                  <p className="text-primary-foreground/70 text-sm sm:text-base">
                    Ďakujeme. Ozveme sa Vám keď bude niečo zaujímavé pre Váš profil.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Honeypot — hidden from real users */}
                    <input
                      {...form.register("website")}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] w-px h-px opacity-0"
                    />
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
                                className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary-foreground"
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
                                className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary-foreground"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                              className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categories"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            O aké príležitosti máte záujem? *
                          </FormLabel>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
                            {categoryOptions.map((opt) => (
                              <FormField
                                key={opt.code}
                                control={form.control}
                                name="categories"
                                render={({ field }) => {
                                  const checked = field.value?.includes(opt.code);
                                  return (
                                    <label
                                      htmlFor={`cat-${opt.code}`}
                                      className="flex items-start gap-3 cursor-pointer bg-primary-foreground/5 border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors rounded-md px-4 py-3"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          id={`cat-${opt.code}`}
                                          checked={checked}
                                          onCheckedChange={(v) => {
                                            const current = field.value || [];
                                            if (v === true) {
                                              field.onChange([
                                                ...current.filter((c) => c !== opt.code),
                                                opt.code,
                                              ]);
                                            } else {
                                              field.onChange(
                                                current.filter((c) => c !== opt.code)
                                              );
                                            }
                                          }}
                                          className="mt-0.5 border-primary-foreground/40 data-[state=checked]:bg-primary-foreground data-[state=checked]:border-primary-foreground"
                                        />
                                      </FormControl>
                                      <span className="text-sm sm:text-base text-primary-foreground/80 leading-snug">
                                        {opt.label}
                                      </span>
                                    </label>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="investmentRange"
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
                                <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary-foreground">
                                  <SelectValue placeholder="Vyberte rozsah" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {investmentRangeOptions.map((s) => (
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
                        name="timeHorizon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              Časový horizont *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary-foreground">
                                  <SelectValue placeholder="Vyberte horizont" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeHorizonOptions.map((s) => (
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
                      name="consent"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-start gap-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value as unknown as boolean}
                                onCheckedChange={(v) => field.onChange(v === true)}
                                className="mt-1 border-primary-foreground/40 data-[state=checked]:bg-primary-foreground data-[state=checked]:border-primary-foreground"
                              />
                            </FormControl>
                            <FormLabel className="text-primary-foreground/70 text-sm font-normal leading-relaxed cursor-pointer">
                              Súhlasím so spracovaním osobných údajov pre účely
                              zasielania investičných príležitostí v zmysle{" "}
                              <Link
                                to="/ochrana-udajov"
                                className="text-primary-foreground underline underline-offset-2"
                              >
                                zásad ochrany osobných údajov
                              </Link>
                              . Z odberu sa môžete kedykoľvek odhlásiť.
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto group rounded-full bg-primary-foreground text-charcoal hover:bg-primary-foreground/90 px-8 py-6 text-base"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Odosielam…
                        </>
                      ) : (
                        <>
                          Pridať sa do klubu
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

export default Klub;
