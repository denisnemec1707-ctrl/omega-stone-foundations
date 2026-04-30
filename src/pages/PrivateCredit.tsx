import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/i18n/hooks";
import { getLocalizedPath } from "@/i18n/routes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { submitForm } from "@/lib/submitForm";
import verticalCredit from "@/assets/vertical-credit.jpg";

type FinancingFormData = {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  loanAmount?: string;
  message?: string;
  website?: string;
};

const useFinancingSchema = () => {
  const { t } = useTranslation("validation");
  return useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, { message: t("name.required") }).max(100),
        email: z.string().trim().email({ message: t("email.invalid") }).max(255),
        phone: z.string().trim().max(20).optional().or(z.literal("")),
        projectType: z.string().trim().max(100).optional().or(z.literal("")),
        loanAmount: z.string().trim().max(50).optional().or(z.literal("")),
        message: z.string().trim().max(1000).optional().or(z.literal("")),
        website: z.string().optional(),
      }),
    [t]
  );
};

const PrivateCredit = () => {
  const { t } = useTranslation("privateCredit");
  const { t: tValidation } = useTranslation("validation");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const financingSchema = useFinancingSchema();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FinancingFormData>({
    resolver: zodResolver(financingSchema),
  });

  const faqItems = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  const onSubmit = async (data: FinancingFormData) => {
    if (data.website) {
      reset();
      toast.success(tValidation("toast.success"), { description: tValidation("toast.successDesc") });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitForm(import.meta.env.VITE_WEBHOOK_BRAND_CONTACT, {
        form_source: "uvery",
        inquiry_type: "financing",
        submitted_at: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
        project_type: data.projectType || null,
        loan_amount: data.loanAmount || null,
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : null,
        landing_page:
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : null,
      });
      toast.success(tValidation("toast.success"), { description: tValidation("toast.successDesc") });
      reset();
    } catch {
      toast.error(tValidation("toast.error"), { description: tValidation("toast.errorDesc") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const financingTypes = [
    {
      title: t("whatWeFinance.realEstate.title"),
      desc: t("whatWeFinance.realEstate.text"),
      params: [t("whatWeFinance.realEstate.amount"), t("whatWeFinance.realEstate.term"), t("whatWeFinance.realEstate.ltv")],
    },
    {
      title: t("whatWeFinance.business.title"),
      desc: t("whatWeFinance.business.text"),
      params: [t("whatWeFinance.business.amount"), t("whatWeFinance.business.term"), t("whatWeFinance.business.collateral")],
    },
  ];

  const benefits = [
    { value: t("benefits.fast.value"), label: t("benefits.fast.title"), desc: t("benefits.fast.text") },
    { value: t("benefits.flexible.value"), label: t("benefits.flexible.title"), desc: t("benefits.flexible.text") },
    { value: t("benefits.noFees.value"), label: t("benefits.noFees.title"), desc: t("benefits.noFees.text") },
    { value: t("benefits.minBureaucracy.value"), label: t("benefits.minBureaucracy.title"), desc: t("benefits.minBureaucracy.text") },
  ];

  const processSteps = [
    { step: "01", title: t("process.steps.request.title"), desc: t("process.steps.request.text") },
    { step: "02", title: t("process.steps.analysis.title"), desc: t("process.steps.analysis.text") },
    { step: "03", title: t("process.steps.offer.title"), desc: t("process.steps.offer.text") },
    { step: "04", title: t("process.steps.funding.title"), desc: t("process.steps.funding.text") },
  ];

  const projectTypeOptions = [
    { value: "realitny-projekt", label: t("projectTypes.realEstate") },
    { value: "podnikatelsky-uver", label: t("projectTypes.business") },
    { value: "akvizicia", label: t("projectTypes.acquisition") },
    { value: "iny", label: t("projectTypes.other") },
  ];

  const loanAmountOptions = [
    { value: "10-50k", label: t("loanAmounts.10to50k") },
    { value: "50-100k", label: t("loanAmounts.50to100k") },
    { value: "100-250k", label: t("loanAmounts.100to250k") },
    { value: "250-500k", label: t("loanAmounts.250to500k") },
    { value: "500k+", label: t("loanAmounts.over500k") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        routeKey="loans"
      />
      <Header />
      <main>
        <SubpageHero
          label={t("hero.label")}
          title={t("hero.title")}
          titleAccent={t("hero.titleAccent")}
          description={t("hero.description")}
          image={verticalCredit}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                {t("intro")}
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Financing Types */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  {t("whatWeFinance.label")}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  {t("whatWeFinance.description")}
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Financing Types - Dark block */}
        <section className="bg-charcoal rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <StaggerContainer className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl">
              {financingTypes.map((type, i) => (
                <StaggerItem key={i}>
                  <div className="border border-primary-foreground/10 p-4 sm:p-6 md:p-8 h-full rounded-lg sm:rounded-xl">
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4 text-primary-foreground">{type.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-primary-foreground/40 font-light leading-relaxed mb-3 sm:mb-4">{type.desc}</p>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {type.params.map((p, j) => <li key={j} className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/60">• {p}</li>)}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Benefits */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start mb-10 sm:mb-14 md:mb-20">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  {t("benefits.label")}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  {t("benefits.description")}
                </p>
              </div>
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {benefits.map((item, i) => (
                  <StaggerItem key={i} className="text-center">
                    <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 sm:mb-3">{item.value}</p>
                    <h3 className="font-serif text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{item.label}</h3>
                    <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </AnimatedSection>

        {/* Process - Dark block */}
        <section className="bg-charcoal rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <AnimatedSection className="mb-8 sm:mb-10 md:mb-14 lg:mb-20">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-primary-foreground max-w-3xl">
                {t("process.label")}
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
              {processSteps.map((item, i) => (
                <StaggerItem key={i}>
                  <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary-foreground/10 block mb-2">{item.step}</span>
                  <h3 className="font-serif text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground/40 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

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
                    <AccordionItem key={i} value={`item-${i}`} className="border border-border px-4 sm:px-6 data-[state=open]:border-foreground/30 transition-colors">
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

        {/* Financing Form + Investor CTA - Dark block */}
        <section id="financovanie" className="bg-charcoal rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-12 sm:py-16 md:py-24 lg:py-32">
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
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.projectType")}</label>
                      <select {...register("projectType")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm sm:text-base appearance-none">
                        <option value="">{t("form.projectTypePlaceholder")}</option>
                        {projectTypeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.loanAmount")}</label>
                      <select {...register("loanAmount")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm sm:text-base appearance-none">
                        <option value="">{t("form.loanAmountPlaceholder")}</option>
                        {loanAmountOptions.map((opt) => (
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
                  <h4 className="font-serif text-base sm:text-lg mb-3 sm:mb-4 text-primary-foreground">{t("investCta.heading")}</h4>
                  <p className="text-xs sm:text-sm text-primary-foreground/40 font-light mb-4">
                    {t("investCta.text")}
                  </p>
                  <div className="flex flex-col items-start gap-2">
                    <Link
                      to={getLocalizedPath("forInvestors", locale)}
                      className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm sm:text-base"
                    >
                      {t("investCta.button")}
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <Link
                      to={getLocalizedPath("club", locale)}
                      className="text-xs sm:text-sm text-primary-foreground/50 hover:text-primary-foreground/80 underline underline-offset-4 transition-colors"
                    >
                      {t("investCta.clubLink")}
                    </Link>
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

export default PrivateCredit;
