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
import { submitForm } from "@/lib/submitForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { useLocale, useFormatCurrency } from "@/i18n/hooks";
import heroMountains from "@/assets/hero-mountains.jpg";

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  investmentAmount?: string;
  investmentInterest?: string;
  message?: string;
  website?: string;
};

const useContactSchema = () => {
  const { t } = useTranslation("validation");
  return useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, { message: t("name.required") }).max(100),
        email: z.string().trim().email({ message: t("email.invalid") }).max(255),
        phone: z.string().trim().max(20).optional().or(z.literal("")),
        investmentAmount: z.string().trim().max(50).optional().or(z.literal("")),
        investmentInterest: z.string().trim().optional().or(z.literal("")),
        message: z.string().trim().max(1000).optional().or(z.literal("")),
        website: z.string().optional(),
      }),
    [t]
  );
};

const ForInvestors = () => {
  const { t } = useTranslation("forInvestors");
  const { t: tValidation } = useTranslation("validation");
  const locale = useLocale();
  const formatCurrency = useFormatCurrency();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [investment, setInvestment] = useState(50000);
  const [duration, setDuration] = useState(12);
  const contactSchema = useContactSchema();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const calculations = useMemo(() => {
    const monthlyRate = 0.12 / 12;
    const monthlyPayout = investment * monthlyRate;
    const totalReturn = monthlyPayout * duration;
    return {
      monthlyPayout: Math.round(monthlyPayout),
      totalReturn: Math.round(totalReturn),
      totalAtEnd: Math.round(investment + totalReturn),
    };
  }, [investment, duration]);

  const onSubmit = async (data: ContactFormData) => {
    if (data.website) {
      reset();
      toast.success(tValidation("toast.success24h"), { description: tValidation("toast.success24hDesc") });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitForm(import.meta.env.VITE_WEBHOOK_INVESTOR_INQUIRY, {
        form_source: "pre-investorov",
        submitted_at: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        investment_amount: data.investmentAmount || null,
        investment_interest: data.investmentInterest || null,
        message: data.message || null,
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : null,
        landing_page:
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : null,
      });

      toast.success(tValidation("toast.success24h"), { description: tValidation("toast.success24hDesc") });
      reset();
    } catch {
      toast.error(tValidation("toast.error"), { description: tValidation("toast.errorDesc") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { value: t("stats.return.value"), label: t("stats.return.label"), desc: t("stats.return.text") },
    { value: t("stats.payout.value"), label: t("stats.payout.label"), desc: t("stats.payout.text") },
    { value: t("stats.minInvestment.value"), label: t("stats.minInvestment.label"), desc: t("stats.minInvestment.text") },
    { value: t("stats.collateral.value"), label: t("stats.collateral.label"), desc: t("stats.collateral.text") },
  ];

  const howItWorksSteps = [
    { step: "01", title: t("howItWorks.steps.contact.title"), desc: t("howItWorks.steps.contact.text") },
    { step: "02", title: t("howItWorks.steps.consultation.title"), desc: t("howItWorks.steps.consultation.text") },
    { step: "03", title: t("howItWorks.steps.contract.title"), desc: t("howItWorks.steps.contract.text") },
    { step: "04", title: t("howItWorks.steps.returns.title"), desc: t("howItWorks.steps.returns.text") },
  ];

  const whyInvestItems = [
    { title: t("whyInvest.items.return.title"), desc: t("whyInvest.items.return.text") },
    { title: t("whyInvest.items.assets.title"), desc: t("whyInvest.items.assets.text") },
    { title: t("whyInvest.items.cycles.title"), desc: t("whyInvest.items.cycles.text") },
    { title: t("whyInvest.items.fullReturn.title"), desc: t("whyInvest.items.fullReturn.text") },
  ];

  const testimonials = t("testimonials.items", { returnObjects: true }) as Array<{ text: string; author: string; amount: string }>;
  const faqItems = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  const investmentAmountOptions = [
    { value: "10-25k", label: t("investmentAmounts.10to25k") },
    { value: "25-50k", label: t("investmentAmounts.25to50k") },
    { value: "50-100k", label: t("investmentAmounts.50to100k") },
    { value: "100-250k", label: t("investmentAmounts.100to250k") },
    { value: "250k+", label: t("investmentAmounts.over250k") },
  ];

  const investmentAreaOptions = [
    { value: "real-estate", label: t("investmentAreas.realEstate") },
    { value: "private-equity", label: t("investmentAreas.equity") },
    { value: "private-credit", label: t("investmentAreas.credit") },
    { value: "vsetko", label: t("investmentAreas.all") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        routeKey="forInvestors"
      />
      <Header />
      <main>
        <SubpageHero
          label={t("hero.label")}
          title={t("hero.title")}
          titleAccent={t("hero.titleAccent")}
          description={t("hero.description")}
          image={heroMountains}
        />

        {/* Value Proposition */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                {t("intro")}
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Key Numbers - Dark block */}
        <section className="bg-charcoal rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-16 sm:py-24 md:py-32">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
              {stats.map((item, i) => (
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
                  {t("howItWorks.label")}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  {t("howItWorks.description")}
                </p>
              </div>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                {howItWorksSteps.map((item, i) => (
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
        <section id="kalkulacka" className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection className="mb-8 sm:mb-10 md:mb-14 lg:mb-20">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight">
                {t("calculator.title")}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
                <div className="space-y-6 sm:space-y-8 md:space-y-10">
                  <div>
                    <div className="flex justify-between mb-3 sm:mb-4">
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">{t("calculator.investmentAmount")}</label>
                      <span className="font-serif text-sm sm:text-base md:text-lg"><AnimatedValue value={investment} formatValue={formatCurrency} /></span>
                    </div>
                    <Slider value={[investment]} onValueChange={(v) => setInvestment(v[0])} min={10000} max={500000} step={5000}
                      className="[&_[role=slider]]:bg-foreground [&_[role=slider]]:border-foreground [&_.bg-primary]:bg-foreground [&_[role=slider]]:h-7 [&_[role=slider]]:w-7 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5"
                    />
                    <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-muted-foreground"><span>{t("calculator.min")}</span><span>{t("calculator.max")}</span></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3 sm:mb-4">
                      <label className="text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">{t("calculator.investmentDuration")}</label>
                      <span className="font-serif text-sm sm:text-base md:text-lg"><AnimatedValue value={duration} /> {t("calculator.months")}</span>
                    </div>
                    <Slider value={[duration]} onValueChange={(v) => setDuration(v[0])} min={6} max={24} step={6}
                      className="[&_[role=slider]]:bg-foreground [&_[role=slider]]:border-foreground [&_.bg-primary]:bg-foreground [&_[role=slider]]:h-7 [&_[role=slider]]:w-7 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5"
                    />
                    <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-muted-foreground"><span>{t("calculator.minMonths")}</span><span>{t("calculator.maxMonths")}</span></div>
                  </div>
                </div>

                <motion.div className="bg-charcoal p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h3 className="font-serif text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 text-center text-primary-foreground">{t("calculator.results")}</h3>
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    <div className="text-center pb-4 sm:pb-6 border-b border-primary-foreground/10">
                      <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">{t("calculator.monthlyPayout")}</p>
                      <p className="font-serif text-xl sm:text-2xl md:text-3xl text-primary-foreground"><AnimatedValue value={calculations.monthlyPayout} formatValue={formatCurrency} /></p>
                    </div>
                    <div className="text-center pb-4 sm:pb-6 border-b border-primary-foreground/10">
                      <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">{t("calculator.totalReturn")}</p>
                      <p className="font-serif text-xl sm:text-2xl md:text-3xl text-primary-foreground"><AnimatedValue value={calculations.totalReturn} formatValue={formatCurrency} /></p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1">{t("calculator.totalEnd")}</p>
                      <p className="font-serif text-xl sm:text-2xl md:text-3xl text-primary-foreground"><AnimatedValue value={calculations.totalAtEnd} formatValue={formatCurrency} /></p>
                      <p className="text-[10px] sm:text-xs text-primary-foreground/30 mt-1">{t("calculator.totalEndNote")}</p>
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
                {t("whyInvest.title")}
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {whyInvestItems.map((item, i) => (
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
                {t("testimonials.label")}
              </h2>
              <StaggerContainer className="grid md:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((item, i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      className="border-l-2 border-foreground/15 pl-5 sm:pl-6 py-2 h-full hover:border-foreground/40 transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-serif text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed mb-4 sm:mb-6 italic">
                        "{item.text}"
                      </p>
                      <p className="text-sm font-medium text-foreground">{item.author}</p>
                      <p className="text-xs text-muted-foreground">{item.amount}</p>
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
                {t("faq.label")}
              </h2>
              <div className="max-w-3xl">
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                  {faqItems.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-border px-4 sm:px-6 data-[state=open]:border-foreground/30 transition-colors hover:border-foreground/20">
                      <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-foreground py-4 sm:py-5 text-foreground/70">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-5">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Form - Dark block - THE conversion section */}
        <section id="kontakt" className="bg-charcoal rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <AnimatedSection className="mb-8 sm:mb-10 md:mb-14 lg:mb-20">
              <div className="flex flex-col gap-4 sm:gap-5 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-primary-foreground">
                  {t("form.heading")}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/50 font-light leading-relaxed md:pt-2 lg:pt-4">
                  {t("form.description")}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
              <AnimatedSection delay={0.1}>
                <div className="bg-charcoal-light p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl">
                  <h3 className="font-serif text-lg sm:text-xl mb-5 sm:mb-6 md:mb-8 text-primary-foreground">{t("form.title")}</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                    <input
                      {...register("website")}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] w-px h-px opacity-0"
                    />
                    <div>
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.fullName")}</label>
                      <Input {...register("name")} placeholder={t("form.namePlaceholder")} className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                      {errors.name && <p className="text-destructive text-[10px] sm:text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.email")}</label>
                      <Input {...register("email")} type="email" placeholder={t("form.emailPlaceholder")} className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                      {errors.email && <p className="text-destructive text-[10px] sm:text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.phone")}</label>
                      <Input {...register("phone")} type="tel" placeholder={t("form.phonePlaceholder")} className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.investmentAmount")}</label>
                      <select {...register("investmentAmount")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm sm:text-base appearance-none">
                        <option value="">{t("form.investmentAmountPlaceholder")}</option>
                        {investmentAmountOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.investmentArea")}</label>
                      <select {...register("investmentInterest")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm sm:text-base appearance-none">
                        <option value="">{t("form.investmentAreaPlaceholder")}</option>
                        {investmentAreaOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.message")}</label>
                      <Textarea {...register("message")} placeholder={t("form.messagePlaceholder")} rows={3} className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 resize-none text-base" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-charcoal font-medium tracking-wide uppercase h-12 md:h-14 text-xs sm:text-sm">
                      {isSubmitting ? tValidation("form.submitting") : t("form.submit")}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-5 sm:mb-6 md:mb-8 text-primary-foreground">{t("directContact.title")}</h3>
                  <div className="space-y-5 sm:space-y-6 md:space-y-8">
                    <div>
                      <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2">{t("directContact.email")}</p>
                      <a href="mailto:info@assetrainvestments.com" className="text-base sm:text-lg md:text-xl text-primary-foreground hover:text-primary-foreground/70 transition-colors break-all">info@assetrainvestments.com</a>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2">{t("directContact.office")}</p>
                      <p className="text-base sm:text-lg md:text-xl text-primary-foreground">{t("directContact.officeValue")}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-primary-foreground/10">
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div>
                      <p className="font-serif text-lg sm:text-xl md:text-2xl mb-1 text-primary-foreground"><AnimatedCounter value={10000} formatValue={(v) => `${v.toLocaleString("sk-SK")} \u20AC`} /></p>
                      <p className="text-[10px] sm:text-xs text-primary-foreground/40">{t("directContact.minInvestment")}</p>
                    </div>
                    <div>
                      <p className="font-serif text-lg sm:text-xl md:text-2xl mb-1 text-primary-foreground"><AnimatedCounter value={12} suffix="%" /></p>
                      <p className="text-[10px] sm:text-xs text-primary-foreground/40">{t("directContact.annualReturn")}</p>
                    </div>
                    <div>
                      <p className="font-serif text-lg sm:text-xl md:text-2xl mb-1 text-primary-foreground">12–24</p>
                      <p className="text-[10px] sm:text-xs text-primary-foreground/40">{t("directContact.months")}</p>
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
