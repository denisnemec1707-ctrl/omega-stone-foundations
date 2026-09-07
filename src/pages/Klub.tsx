import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  FileText,
  Handshake,
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
import { useLocale } from "@/i18n/hooks";
import { getLocalizedPath } from "@/i18n/routes";

const useFormSchema = () => {
  const { t } = useTranslation("validation");
  return useMemo(
    () =>
      z.object({
        fullName: z
          .string()
          .trim()
          .min(2, { message: t("fullName.min") })
          .max(120, { message: t("fullName.max") }),
        email: z.string().trim().email({ message: t("email.invalid") }).max(255),
        phone: z
          .string()
          .trim()
          .min(6, { message: t("phone.min") })
          .max(40),
        allocation: z.string().min(1, { message: t("select.clubAmount") }),
        assets: z.string().min(1, { message: t("select.clubAmount") }),
        ticket: z.string().min(1, { message: t("select.clubAmount") }),
        categories: z
          .array(z.string())
          .min(1, { message: t("select.interests") }),
        occupation: z.string().min(1, { message: t("select.clubAmount") }),
        timeHorizon: z.string().min(1, { message: t("select.clubHorizon") }),
        consent: z.literal(true, {
          errorMap: () => ({ message: t("consent.required") }),
        }),
        website: z.string().optional(),
      }),
    [t],
  );
};

type FormValues = z.infer<ReturnType<typeof useFormSchema>>;

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

const selectFieldClass =
  "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary-foreground";
const inputFieldClass =
  "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary-foreground";

const Klub = () => {
  const { t } = useTranslation("klub");
  const { t: tVal } = useTranslation("validation");
  const locale = useLocale();
  const formSchema = useFormSchema();
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

  const categoryOptions = [
    { code: "private_credit", label: t("interestOptions.privateCredit") },
    { code: "re_co_investment", label: t("interestOptions.coInvestment") },
    { code: "off_market_real_estate", label: t("interestOptions.offMarket") },
    { code: "acquisitions", label: t("interestOptions.acquisitions") },
  ];

  const allocationOptions = [
    { value: "under100k", label: t("allocationOptions.under100k") },
    { value: "100to250k", label: t("allocationOptions.100to250k") },
    { value: "250to500k", label: t("allocationOptions.250to500k") },
    { value: "500kto1m", label: t("allocationOptions.500kto1m") },
    { value: "over1m", label: t("allocationOptions.over1m") },
  ];

  const assetsOptions = [
    { value: "under100k", label: t("assetsOptions.under100k") },
    { value: "100to250k", label: t("assetsOptions.100to250k") },
    { value: "250to500k", label: t("assetsOptions.250to500k") },
    { value: "500kto1m", label: t("assetsOptions.500kto1m") },
    { value: "1to5m", label: t("assetsOptions.1to5m") },
    { value: "over5m", label: t("assetsOptions.over5m") },
  ];

  const ticketOptions = [
    { value: "25k", label: t("ticketOptions.25k") },
    { value: "50k", label: t("ticketOptions.50k") },
    { value: "100k", label: t("ticketOptions.100k") },
    { value: "250k", label: t("ticketOptions.250k") },
    { value: "over500k", label: t("ticketOptions.over500k") },
  ];

  const occupationOptions = [
    { value: "founder", label: t("occupationOptions.founder") },
    { value: "executive", label: t("occupationOptions.executive") },
    { value: "professional", label: t("occupationOptions.professional") },
    { value: "re_investor", label: t("occupationOptions.reInvestor") },
    { value: "family_office", label: t("occupationOptions.familyOffice") },
    { value: "other", label: t("occupationOptions.other") },
  ];

  const timeHorizonOptions = [
    { value: "short", label: t("horizonOptions.short") },
    { value: "medium", label: t("horizonOptions.medium") },
    { value: "long", label: t("horizonOptions.long") },
    { value: "flexible", label: t("horizonOptions.flexible") },
  ];

  const processSteps = [
    t("process.steps.sourcing"),
    t("process.steps.underwriting"),
    t("process.steps.valuation"),
    t("process.steps.dd"),
    t("process.steps.decision"),
    t("process.steps.member"),
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      allocation: "",
      assets: "",
      ticket: "",
      categories: [],
      occupation: "",
      timeHorizon: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) {
      setSubmitted(true);
      form.reset();
      return;
    }
    setSubmitting(true);
    try {
      await submitForm(import.meta.env.VITE_WEBHOOK_KLUB, {
        form_source: "klub_private_investors",
        submitted_at: new Date().toISOString(),
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        allocation_24m: values.allocation,
        investable_assets: values.assets,
        typical_ticket: values.ticket,
        categories: values.categories.join(", "),
        occupation: values.occupation,
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
        title: t("success.title"),
        description: t("success.text"),
      });
    } catch (err) {
      console.error("Klub application submit error", err);
      toast({
        title: tVal("toast.error"),
        description: tVal("toast.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const consentText = t("consent");
  const consentLinkText = t("consentLinkText");
  const consentParts = consentText.split(consentLinkText);

  return (
    <LandingLayout
      title={t("meta.title")}
      description={t("meta.description")}
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
              {t("hero.label")}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-5 sm:mb-7 tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground/85 leading-tight mb-8 sm:mb-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a
                href="#ziadost"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary-foreground text-charcoal hover:bg-primary-foreground/90 transition-colors text-base font-medium"
              >
                {t("hero.cta")}
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

      {/* MANIFESTO */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 sm:mb-8">
                {t("manifesto.label")}
              </span>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug mb-6 sm:mb-8">
                {t("manifesto.p1")}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed mb-6 sm:mb-8">
                {t("manifesto.p2")}
              </p>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug mb-8 sm:mb-10">
                {t("manifesto.p3")}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-lg sm:text-xl text-foreground">
                  {t("manifesto.signature")}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground">
                  — {t("manifesto.role")}
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PILLARS */}
      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5 sm:mb-6">
                {t("pillarsLabel")}
              </span>
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
                {t("intro")}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                icon: Building2,
                title: t("keyPoints.offMarket.title"),
                text: t("keyPoints.offMarket.text"),
              },
              {
                icon: ShieldCheck,
                title: t("keyPoints.privateCredit.title"),
                text: t("keyPoints.privateCredit.text"),
              },
              {
                icon: Handshake,
                title: t("keyPoints.coInvest.title"),
                text: t("keyPoints.coInvest.text"),
              },
              {
                icon: FileText,
                title: t("keyPoints.memos.title"),
                text: t("keyPoints.memos.text"),
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

      {/* DEAL EXAMPLE */}
      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 sm:mb-10">
              {t("deal.label")}
            </span>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <AnimatedSection>
              <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                  <span className="font-serif text-xl sm:text-2xl text-primary-foreground">
                    {t("deal.cardTitle")}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/50 border border-primary-foreground/20 rounded-full px-3 py-1.5">
                    {t("deal.cardTag")}
                  </span>
                </div>
                <dl>
                  {[
                    { label: t("deal.rows.type.label"), value: t("deal.rows.type.value") },
                    { label: t("deal.rows.price.label"), value: t("deal.rows.price.value") },
                    { label: t("deal.rows.market.label"), value: t("deal.rows.market.value") },
                    { label: t("deal.rows.discount.label"), value: t("deal.rows.discount.value") },
                    { label: t("deal.rows.strategy.label"), value: t("deal.rows.strategy.value") },
                    { label: t("deal.rows.horizon.label"), value: t("deal.rows.horizon.value") },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-3.5 sm:py-4 border-t border-primary-foreground/10 first:border-t-0"
                    >
                      <dt className="text-xs sm:text-sm text-primary-foreground/50 flex-shrink-0">
                        {row.label}
                      </dt>
                      <dd className="text-sm sm:text-base text-primary-foreground sm:text-right">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-primary-foreground/40 mt-5 sm:mt-6">
                  {t("deal.disclaimer")}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="lg:pt-2">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-5 sm:mb-6 leading-tight">
                  {t("deal.whyTitle")}
                </h2>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-5 sm:mb-6">
                  {t("deal.whyText")}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("deal.memoNote")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ALIGNMENT */}
      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: t("alignment.skin.title"),
                text: t("alignment.skin.text"),
              },
              {
                title: t("alignment.direct.title"),
                text: t("alignment.direct.text"),
              },
              {
                title: t("alignment.discretion.title"),
                text: t("alignment.discretion.text"),
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <div className="border-t border-foreground/15 pt-6 sm:pt-7 h-full">
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTION PROCESS */}
      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12">
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-8 leading-tight">
                {t("process.heading")}
              </h2>
              <ol className="flex flex-wrap items-center gap-y-4 mb-8">
                {processSteps.map((step, i) => (
                  <li key={step} className="flex items-center">
                    <span className="inline-flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-foreground/5 text-foreground text-xs font-medium flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm sm:text-base text-foreground/80">
                        {step}
                      </span>
                    </span>
                    {i < processSteps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mx-4 sm:mx-5 text-muted-foreground/50"
                      >
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                {t("process.note")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="ziadost" className="pb-16 sm:pb-24 md:pb-32 scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16">
              <div className="max-w-2xl mb-8 sm:mb-12">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/50">
                  {t("form.heading")}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mt-3 mb-4 leading-tight">
                  {t("form.title")}
                </h2>
                <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                  {t("form.description")}
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-primary-foreground/30 bg-primary-foreground/10 p-6 sm:p-8 text-center max-w-2xl">
                  <CheckCircle2 className="w-10 h-10 text-primary-foreground mx-auto mb-4" />
                  <h3 className="font-serif text-xl sm:text-2xl text-primary-foreground mb-2">
                    {t("success.title")}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm sm:text-base">
                    {t("success.text")}
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Honeypot */}
                    <input
                      {...form.register("website")}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] w-px h-px opacity-0"
                    />

                    <FormField
                      control={form.control}
                      name="allocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            {t("form.allocation")}
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={selectFieldClass}>
                                <SelectValue placeholder={t("form.allocationPlaceholder")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {allocationOptions.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="assets"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              {t("form.assets")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={selectFieldClass}>
                                  <SelectValue placeholder={t("form.assetsPlaceholder")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {assetsOptions.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
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
                        name="ticket"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              {t("form.ticket")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={selectFieldClass}>
                                  <SelectValue placeholder={t("form.ticketPlaceholder")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {ticketOptions.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
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
                      name="categories"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            {t("form.interests")}
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
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              {t("form.occupation")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={selectFieldClass}>
                                  <SelectValue placeholder={t("form.occupationPlaceholder")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {occupationOptions.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
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
                              {t("form.horizon")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className={selectFieldClass}>
                                  <SelectValue placeholder={t("form.horizonPlaceholder")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeHorizonOptions.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    {s.label}
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
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              {t("form.fullName")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Jan Novak"
                                className={inputFieldClass}
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
                              {t("form.email")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="jan@email.sk"
                                className={inputFieldClass}
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
                            {t("form.phone")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="+421 900 000 000"
                              className={inputFieldClass}
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
                                onCheckedChange={(v) => field.onChange(v === true)}
                                className="mt-1 border-primary-foreground/40 data-[state=checked]:bg-primary-foreground data-[state=checked]:border-primary-foreground"
                              />
                            </FormControl>
                            <FormLabel className="text-primary-foreground/70 text-sm font-normal leading-relaxed cursor-pointer">
                              {consentParts[0]}
                              <Link
                                to={getLocalizedPath("privacy", locale)}
                                className="text-primary-foreground underline underline-offset-2"
                              >
                                {consentLinkText}
                              </Link>
                              {consentParts[1] ?? ""}
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto group rounded-full bg-primary-foreground text-charcoal hover:bg-primary-foreground/90 px-8 py-6 text-base"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {t("form.submitting")}
                          </>
                        ) : (
                          <>
                            {t("form.submit")}
                            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </Button>
                      <p className="text-primary-foreground/50 text-xs sm:text-sm mt-4">
                        {t("form.note")}
                      </p>
                    </div>
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
