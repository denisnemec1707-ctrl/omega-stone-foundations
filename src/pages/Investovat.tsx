import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Coins,
  Loader2,
  Phone,
  ShieldCheck,
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
      title="9–12 % ročne | Investície kryté nehnuteľnosťami | ASSETRA Investments"
      description="Súkromná investícia s fixným výnosom 9–12 % ročne. Krytá záložným právom na konkrétnu slovenskú nehnuteľnosť. Minimum 50 000 €. Nezáväzná konzultácia."
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-20 sm:py-28 md:py-36 lg:py-44">
          <div className="max-w-4xl">
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary/80 mb-6 sm:mb-8">
              Pre súkromných investorov
            </span>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-5 sm:mb-7 tracking-tight">
              9 – 12 % ročne
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground/85 leading-tight mb-8 sm:mb-10">
              Investície kryté nehnuteľnosťami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
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
          </div>
        </div>
      </section>

      {/* KĽÚČOVÉ BODY */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Záložné právo na nehnuteľnosť",
                text: "Vašu pôžičku zabezpečíme záložným právom zapísaným v katastri.",
              },
              {
                icon: Coins,
                title: "Mesačná renta + bonus",
                text: "Časť výnosu mesačne na účet, zvyšok ako bonus pri vrátení istiny.",
              },
              {
                icon: CalendarClock,
                title: "Doba viazanosti 3 – 5 rokov",
                text: "Fixný úrok na celú dobu, dohodnutý v zmluve.",
              },
              {
                icon: Banknote,
                title: "Minimum 50 000 €",
                text: "Výnimočne aj od 10 000 € (bez záložného práva, individuálne).",
              },
            ].map((b) => (
              <AnimatedSection key={b.title}>
                <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <b.icon className="w-5 h-5 text-primary" />
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
                  </strong>
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
                              placeholder="Napr. otázky alebo konkrétne očakávania…"
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
