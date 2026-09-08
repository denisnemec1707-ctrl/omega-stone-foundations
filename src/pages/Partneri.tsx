import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  Loader2,
  Lock,
  Phone,
  TrendingUp,
  UserCheck,
  Users,
  CalendarClock,
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
        office: z
          .string()
          .trim()
          .min(2, { message: t("company.min") })
          .max(160),
        email: z.string().trim().email({ message: t("email.invalid") }).max(255),
        phone: z
          .string()
          .trim()
          .min(6, { message: t("phone.min") })
          .max(40),
        about: z
          .string()
          .trim()
          .min(30, { message: t("motivation.min") })
          .max(2000, { message: t("message.max2000") }),
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

const inputFieldClass =
  "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary-foreground";

const Partneri = () => {
  const { t } = useTranslation("partneri");
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      office: "",
      email: "",
      phone: "",
      about: "",
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
      await submitForm(import.meta.env.VITE_WEBHOOK_PARTNERI, {
        form_source: "partneri",
        submitted_at: new Date().toISOString(),
        full_name: values.fullName,
        office: values.office,
        email: values.email,
        phone: values.phone,
        about_company: values.about,
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
      console.error("Partneri submit error", err);
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

  const seekItems = [
    { icon: TrendingUp, title: t("whoWeSeek.items.turnover.title"), text: t("whoWeSeek.items.turnover.text") },
    { icon: CheckCircle2, title: t("whoWeSeek.items.profitable.title"), text: t("whoWeSeek.items.profitable.text") },
    { icon: Users, title: t("whoWeSeek.items.succession.title"), text: t("whoWeSeek.items.succession.text") },
  ];

  const getItems = [
    { icon: Banknote, title: t("partnerGets.items.fee.title"), text: t("partnerGets.items.fee.text") },
    { icon: CalendarClock, title: t("partnerGets.items.payment.title"), text: t("partnerGets.items.payment.text") },
    { icon: Lock, title: t("partnerGets.items.discretion.title"), text: t("partnerGets.items.discretion.text") },
    { icon: UserCheck, title: t("partnerGets.items.client.title"), text: t("partnerGets.items.client.text") },
  ];

  const steps = [
    { num: "1", title: t("process.steps.form.title"), text: t("process.steps.form.text") },
    { num: "2", title: t("process.steps.call.title"), text: t("process.steps.call.text") },
    { num: "3", title: t("process.steps.nda.title"), text: t("process.steps.nda.text") },
    { num: "4", title: t("process.steps.offer.title"), text: t("process.steps.offer.text") },
  ];

  return (
    <LandingLayout title={t("meta.title")} description={t("meta.description")}>
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
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-5 sm:mb-7 tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground/85 leading-tight mb-8 sm:mb-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a
                href="#formular"
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

      {/* WHO WE SEEK */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 sm:mb-10">
              {t("whoWeSeek.label")}
            </span>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {seekItems.map((b) => (
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

      {/* WHAT PARTNER GETS */}
      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 sm:mb-10">
              {t("partnerGets.label")}
            </span>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {getItems.map((b) => (
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

      {/* PROCESS */}
      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 sm:mb-10">
              {t("process.label")}
            </span>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
            {steps.map((s) => (
              <AnimatedSection key={s.num}>
                <div className="flex md:block items-start gap-5">
                  <span className="font-serif text-4xl sm:text-5xl text-foreground/15 leading-none flex-shrink-0 md:block md:mb-4">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2 leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="formular" className="pb-16 sm:pb-24 md:pb-32 scroll-mt-20">
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
                              <Input {...field} placeholder="Jan Novak" className={inputFieldClass} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="office"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              {t("form.office")}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} placeholder={t("form.officePlaceholder")} className={inputFieldClass} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              {t("form.email")}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="jan@email.sk" className={inputFieldClass} />
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
                              {t("form.phone")}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="+421 900 000 000" className={inputFieldClass} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="about"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            {t("form.about")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder={t("form.aboutPlaceholder")}
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

export default Partneri;
