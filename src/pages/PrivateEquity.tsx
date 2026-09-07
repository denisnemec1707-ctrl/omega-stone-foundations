import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/i18n/hooks";
import { getLocalizedPath } from "@/i18n/routes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageMeta from "@/components/PageMeta";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { submitForm } from "@/lib/submitForm";
import verticalEquity from "@/assets/vertical-equity.jpg";

type CompanySaleFormData = {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  annualTurnover?: string;
  message?: string;
  website?: string;
};

const useCompanySaleSchema = () => {
  const { t } = useTranslation("validation");
  return useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, { message: t("name.required") }).max(100),
        email: z.string().trim().email({ message: t("email.invalid") }).max(255),
        phone: z.string().trim().max(20).optional().or(z.literal("")),
        companyName: z.string().trim().max(200).optional().or(z.literal("")),
        annualTurnover: z.string().trim().max(50).optional().or(z.literal("")),
        message: z.string().trim().max(1000).optional().or(z.literal("")),
        website: z.string().optional(),
      }),
    [t]
  );
};

const PrivateEquity = () => {
  const { t } = useTranslation("privateEquity");
  const { t: tValidation } = useTranslation("validation");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const companySaleSchema = useCompanySaleSchema();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanySaleFormData>({
    resolver: zodResolver(companySaleSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = async (data: CompanySaleFormData) => {
    if (data.website) {
      reset();
      toast.success(tValidation("toast.success"), { description: tValidation("toast.successDesc") });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitForm(import.meta.env.VITE_WEBHOOK_BRAND_CONTACT, {
        form_source: "akvizicie",
        inquiry_type: "company_sale",
        submitted_at: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
        company_name: data.companyName || null,
        annual_turnover: data.annualTurnover || null,
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

  const criteria = [
    { value: t("criteria.turnover.value"), label: t("criteria.turnover.label"), desc: t("criteria.turnover.text") },
    { value: t("criteria.profitability.value"), label: t("criteria.profitability.label"), desc: t("criteria.profitability.text") },
    { value: t("criteria.market.value"), label: t("criteria.market.label"), desc: t("criteria.market.text") },
    { value: t("criteria.team.value"), label: t("criteria.team.label"), desc: t("criteria.team.text") },
  ];

  const processSteps = [
    { step: "01", title: t("process.steps.contact.title"), desc: t("process.steps.contact.text") },
    { step: "02", title: t("process.steps.dueDiligence.title"), desc: t("process.steps.dueDiligence.text") },
    { step: "03", title: t("process.steps.valuation.title"), desc: t("process.steps.valuation.text") },
    { step: "04", title: t("process.steps.closing.title"), desc: t("process.steps.closing.text") },
  ];

  const turnoverOptions = [
    { value: "pod-1m", label: t("turnoverOptions.under1m") },
    { value: "1-3m", label: t("turnoverOptions.1to3m") },
    { value: "3-5m", label: t("turnoverOptions.3to5m") },
    { value: "5-10m", label: t("turnoverOptions.5to10m") },
    { value: "nad-10m", label: t("turnoverOptions.over10m") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={t("meta.title")}
        description={t("meta.description")}
        routeKey="acquisitions"
      />
      <Header />
      <main>
        <SubpageHero
          label={t("hero.label")}
          title={t("hero.title")}
          titleAccent={t("hero.titleAccent")}
          description={t("hero.description")}
          image={verticalEquity}
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

        {/* Criteria */}
        <AnimatedSection>
          <section className="pb-10 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <div className="flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  {t("criteria.label")}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  {t("criteria.description")}
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Criteria stats - Dark block */}
        <section className="bg-charcoal rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {criteria.map((item, i) => (
                <StaggerItem key={i} className="text-center">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary-foreground mb-1.5 sm:mb-2 md:mb-3">{item.value}</p>
                  <h3 className="font-serif text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2 text-primary-foreground/80">{item.label}</h3>
                  <p className="text-primary-foreground/40 font-light text-[10px] sm:text-xs md:text-sm leading-relaxed">{item.desc}</p>
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
                  {t("process.label")}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  {t("process.description")}
                </p>
              </div>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                {processSteps.map((item, i) => (
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

        {/* Dual CTA with Form */}
        <section className="bg-charcoal rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <AnimatedSection>
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                {/* For investors */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-primary-foreground">
                    {t("investCta.heading")}
                  </h2>
                  <p className="text-primary-foreground/50 font-light text-sm sm:text-base md:text-lg leading-relaxed">
                    {t("investCta.text")}
                  </p>
                  <div className="flex flex-col items-start gap-2 mt-1 sm:mt-2">
                    <Link
                      to={getLocalizedPath("club", locale)}
                      className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm sm:text-base md:text-lg"
                    >
                      {t("investCta.button")}
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* For business owners - Form */}
                <div className="border-t md:border-t-0 md:border-l border-primary-foreground/10 pt-8 md:pt-0 md:pl-12 lg:pl-16">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-primary-foreground mb-3 sm:mb-4">
                    {t("sellCta.heading")}
                  </h2>
                  <p className="text-primary-foreground/50 font-light text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                    {t("sellCta.text")}
                  </p>

                  <div className="bg-charcoal-light p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
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
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.companyName")}</label>
                        <Input {...register("companyName")} placeholder={t("form.companyNamePlaceholder")} className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">{t("form.turnover")}</label>
                        <select {...register("annualTurnover")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm sm:text-base appearance-none">
                          <option value="">{t("form.turnoverPlaceholder")}</option>
                          {turnoverOptions.map((opt) => (
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
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="h-8 sm:h-12" />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateEquity;
