import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";

const useContactSchema = () => {
  const { t } = useTranslation("validation");

  return useMemo(
    () =>
      z.object({
        name: z
          .string()
          .trim()
          .min(1, { message: t("name.required") })
          .max(100, { message: t("name.max") }),
        email: z
          .string()
          .trim()
          .email({ message: t("email.invalid") })
          .max(255, { message: t("email.max") }),
        phone: z
          .string()
          .trim()
          .max(20, { message: t("phone.max") })
          .optional()
          .or(z.literal("")),
        investmentAmount: z
          .string()
          .trim()
          .max(50, { message: t("amount.max") })
          .optional()
          .or(z.literal("")),
        message: z
          .string()
          .trim()
          .min(1, { message: t("message.required") })
          .max(1000, { message: t("message.max") }),
      }),
    [t]
  );
};

type ContactFormData = z.infer<ReturnType<typeof useContactSchema>>;

const Contact = () => {
  const { t } = useTranslation("forInvestors");
  const { t: tv } = useTranslation("validation");
  const contactSchema = useContactSchema();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Contact form submitted:", {
      name: data.name,
      email: data.email,
      hasPhone: !!data.phone,
      hasInvestmentAmount: !!data.investmentAmount,
      messageLength: data.message.length,
    });

    toast.success(tv("toast.messageSent"), {
      description: tv("toast.messageSentDesc"),
    });

    reset();
    setIsSubmitting(false);
  };

  return (
    <section id="kontakt" className="py-12 sm:py-20 md:py-32 lg:py-48">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-8 sm:mb-12 md:mb-16">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              {t("contact.label")}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md mb-4 sm:mb-6 md:mb-8">
              {t("contact.title")} <span className="text-gold">{t("contact.titleAccent")}</span>
            </h2>
            <p className="text-muted-foreground font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
              {t("contact.description")}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form */}
            <AnimatedSection delay={0.1}>
              <motion.div
                className="bg-card p-5 sm:p-6 md:p-8 lg:p-10 border border-border shadow-sm"
                whileHover={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-xl md:text-2xl mb-6 md:mb-8">
                  {t("contact.formTitle")}
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      {t("contact.fullName")}
                    </label>
                    <Input
                      {...register("name")}
                      placeholder={t("contact.namePlaceholder")}
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      {t("contact.email")}
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      {t("contact.phone")}
                    </label>
                    <Input
                      {...register("phone")}
                      type="tel"
                      placeholder={t("contact.phonePlaceholder")}
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      {t("contact.investmentAmount")}
                    </label>
                    <Input
                      {...register("investmentAmount")}
                      placeholder={t("contact.amountPlaceholder")}
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.investmentAmount && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.investmentAmount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      {t("contact.message")}
                    </label>
                    <Textarea
                      {...register("message")}
                      placeholder={t("contact.messagePlaceholder")}
                      rows={4}
                      className="bg-background border-border focus:border-gold resize-none transition-all duration-200"
                    />
                    {errors.message && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold/90 text-background font-medium tracking-wide uppercase h-12 md:h-14 text-sm md:text-base transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? t("contact.submitting") : t("contact.submit")}
                  </Button>
                </form>
              </motion.div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2} className="flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-6 md:mb-8">
                  {t("directContact.title")}
                </h3>

                <StaggerContainer className="space-y-6 md:space-y-8" staggerDelay={0.1}>
                  <StaggerItem>
                    <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                      {t("directContact.email")}
                    </p>
                    <a
                      href="mailto:info@assetrainvestments.com"
                      className="text-lg md:text-xl text-foreground hover:text-gold transition-colors"
                    >
                      info@assetrainvestments.com
                    </a>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                      {t("directContact.phone")}
                    </p>
                    <a
                      href="tel:+421911860788"
                      className="text-lg md:text-xl text-foreground hover:text-gold transition-colors"
                    >
                      +421 911 860 788
                    </a>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                      {t("directContact.office")}
                    </p>
                    <p className="text-lg md:text-xl text-foreground">
                      {t("directContact.officeValue")}
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </div>

              <AnimatedSection delay={0.4} className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-border">
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
                  {t("directContact.conditions")}
                </p>
                <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                  <div>
                    <p className="font-serif text-xl md:text-2xl text-gold mb-1">
                      <AnimatedCounter value={10000} formatValue={(v) => `${v.toLocaleString("sk-SK")} \u20AC`} />
                    </p>
                    <p className="text-xs text-muted-foreground">{t("directContact.minInvestment")}</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl md:text-2xl text-gold mb-1">
                      <AnimatedCounter value={12} suffix="%" />
                    </p>
                    <p className="text-xs text-muted-foreground">{t("directContact.annualReturn")}</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl md:text-2xl text-gold mb-1">12–24</p>
                    <p className="text-xs text-muted-foreground">{t("directContact.months")}</p>
                  </div>
                </div>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
