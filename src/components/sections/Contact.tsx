import { useState } from "react";
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

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Meno je povinné" })
    .max(100, { message: "Meno môže mať maximálne 100 znakov" }),
  email: z
    .string()
    .trim()
    .email({ message: "Neplatná emailová adresa" })
    .max(255, { message: "Email môže mať maximálne 255 znakov" }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "Telefón môže mať maximálne 20 znakov" })
    .optional()
    .or(z.literal("")),
  investmentAmount: z
    .string()
    .trim()
    .max(50, { message: "Suma môže mať maximálne 50 znakov" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, { message: "Správa je povinná" })
    .max(1000, { message: "Správa môže mať maximálne 1000 znakov" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
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

    toast.success("Správa bola odoslaná", {
      description: "Budeme vás kontaktovať do 24 hodín.",
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
              Začnite investovať
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md mb-4 sm:mb-6 md:mb-8">
              Kontaktujte <span className="text-gold">nás</span>
            </h2>
            <p className="text-muted-foreground font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
              Vyplňte formulár a náš investičný tím sa vám ozve do 24 hodín s kompletnými informáciami o investičných možnostiach.
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
                  Žiadosť o informácie
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      Meno a priezvisko *
                    </label>
                    <Input
                      {...register("name")}
                      placeholder="Ján Novák"
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      Email *
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="jan.novak@email.sk"
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      Telefón
                    </label>
                    <Input
                      {...register("phone")}
                      type="tel"
                      placeholder="+421 900 000 000"
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      Plánovaná výška investície
                    </label>
                    <Input
                      {...register("investmentAmount")}
                      placeholder="napr. 50 000 €"
                      className="bg-background border-border focus:border-gold h-11 md:h-12 transition-all duration-200"
                    />
                    {errors.investmentAmount && (
                      <p className="text-destructive text-xs md:text-sm mt-1">{errors.investmentAmount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-2 block">
                      Správa *
                    </label>
                    <Textarea
                      {...register("message")}
                      placeholder="Opíšte vaše investičné ciele alebo otázky..."
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
                    {isSubmitting ? "Odosielam..." : "Odoslať žiadosť"}
                  </Button>
                </form>
              </motion.div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2} className="flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-6 md:mb-8">
                  Priamy kontakt
                </h3>

                <StaggerContainer className="space-y-6 md:space-y-8" staggerDelay={0.1}>
                  <StaggerItem>
                    <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                      Email
                    </p>
                    <a
                      href="mailto:invest@assetra.sk"
                      className="text-lg md:text-xl text-foreground hover:text-gold transition-colors"
                    >
                      invest@assetra.sk
                    </a>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                      Telefón
                    </p>
                    <a
                      href="tel:+421212345678"
                      className="text-lg md:text-xl text-foreground hover:text-gold transition-colors"
                    >
                      +421 2 123 456 78
                    </a>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="text-xs md:text-sm tracking-wide uppercase text-gold-muted mb-2">
                      Kancelária
                    </p>
                    <p className="text-lg md:text-xl text-foreground">
                      Bratislava, Slovensko
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </div>

              <AnimatedSection delay={0.4} className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-border">
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
                  Investičné podmienky
                </p>
                <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                  <div>
                    <p className="font-serif text-xl md:text-2xl text-gold mb-1">
                      <AnimatedCounter value={10000} formatValue={(v) => `${v.toLocaleString("sk-SK")} €`} />
                    </p>
                    <p className="text-xs text-muted-foreground">Min. investícia</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl md:text-2xl text-gold mb-1">
                      <AnimatedCounter value={12} suffix="%" />
                    </p>
                    <p className="text-xs text-muted-foreground">Ročný výnos</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl md:text-2xl text-gold mb-1">12–24</p>
                    <p className="text-xs text-muted-foreground">Mesiacov</p>
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
