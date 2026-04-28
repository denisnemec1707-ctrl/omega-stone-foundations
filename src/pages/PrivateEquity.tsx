import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
import { useState } from "react";
import { toast } from "sonner";
import { submitForm } from "@/lib/submitForm";
import verticalEquity from "@/assets/vertical-equity.jpg";

const companySaleSchema = z.object({
  name: z.string().trim().min(1, { message: "Meno je povinné" }).max(100),
  email: z.string().trim().email({ message: "Neplatná emailová adresa" }).max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  companyName: z.string().trim().max(200).optional().or(z.literal("")),
  annualTurnover: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  website: z.string().optional(),
});

type CompanySaleFormData = z.infer<typeof companySaleSchema>;

const PrivateEquity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanySaleFormData>({
    resolver: zodResolver(companySaleSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = async (data: CompanySaleFormData) => {
    if (data.website) {
      reset();
      toast.success("Žiadosť bola odoslaná", { description: "Ozveme sa vám v najbližších dňoch." });
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
      toast.success("Žiadosť bola odoslaná", { description: "Ozveme sa vám v najbližších dňoch." });
      reset();
    } catch {
      toast.error("Nepodarilo sa odoslať žiadosť", { description: "Skúste to prosím znova neskôr." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Akvizície firiem | ASSETRA Investments"
        description="Vyhľadávame fungujúce, zabehnuté firmy na slovenskom a českom trhu vhodné na odkúpenie. Férovú cenu a diskrétny proces."
      />
      <Header />
      <main>
        <SubpageHero
          label="Náš sektor"
          title="Akvizície"
          titleAccent="zabehnutých firiem"
          description="Hľadáme fungujúce, ziskové firmy na slovenskom a českom trhu. Ponúkame férovú cenu a diskrétny proces."
          image={verticalEquity}
        />

        {/* About Statement */}
        <AnimatedSection>
          <section className="py-16 sm:py-24 md:py-32 lg:py-40">
            <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-foreground max-w-5xl">
                Vyhľadávame fungujúce, zabehnuté firmy na slovenskom a českom trhu vhodné na odkúpenie. Investujeme prostredníctvom dlhodobých partnerstiev s dôrazom na rast hodnoty.
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
                  Investičné kritériá
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Zameriavame sa na zabehnuté firmy s jasným potenciálom rastu a stabilným tímom.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Criteria stats - Dark block */}
        <section className="bg-charcoal rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 md:mx-6 my-4 sm:my-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { value: "1–10 mil. €", label: "Obrat", desc: "Hľadáme firmy s ročným obratom v rozmedzí 1 až 10 miliónov eur." },
                { value: "2+ roky", label: "Ziskovosť", desc: "Firma musí byť zisková minimálne 2 roky po sebe." },
                { value: "SK/CZ", label: "Trh", desc: "Zameriavame sa na slovenský a český trh s potenciálom expanzie." },
                { value: "Stabilný", label: "Tím", desc: "Preferujeme firmy so zabehnutým manažmentom a lojálnym tímom." },
              ].map((item, i) => (
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
                  Ako to funguje
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed md:pt-2 lg:pt-4">
                  Od prvého kontaktu po uzavretie transakcie.
                </p>
              </div>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                {[
                  { step: "01", title: "Prvotný kontakt", desc: "Nezáväzná konzultácia o vašej firme. Podpíšeme NDA." },
                  { step: "02", title: "Due diligence", desc: "Detailná analýza finančných výkazov a obchodného modelu." },
                  { step: "03", title: "Ocenenie a ponuka", desc: "Férová ponuka na základe trhového ocenenia." },
                  { step: "04", title: "Uzavretie transakcie", desc: "Finalizácia dokumentov a prevod vlastníctva." },
                ].map((item, i) => (
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
                    Máte záujem investovať?
                  </h2>
                  <p className="text-primary-foreground/50 font-light text-sm sm:text-base md:text-lg leading-relaxed">
                    Investujte do akvizícií firiem s fixným ročným výnosom. Vyplňte nezáväzný formulár.
                  </p>
                  <div className="flex flex-col items-start gap-2 mt-1 sm:mt-2">
                    <Link
                      to="/investovat"
                      className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm sm:text-base md:text-lg"
                    >
                      Chcem investovať
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <Link
                      to="/klub"
                      className="text-xs sm:text-sm text-primary-foreground/50 hover:text-primary-foreground/80 underline underline-offset-4 transition-colors"
                    >
                      alebo sa pridajte do ASSETRA Klubu
                    </Link>
                  </div>
                </div>

                {/* For business owners - Form */}
                <div className="border-t md:border-t-0 md:border-l border-primary-foreground/10 pt-8 md:pt-0 md:pl-12 lg:pl-16">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-primary-foreground mb-3 sm:mb-4">
                    Predávate firmu?
                  </h2>
                  <p className="text-primary-foreground/50 font-light text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                    Vyplňte formulár a ozveme sa vám s nezáväznou ponukou.
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
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">Meno a priezvisko *</label>
                        <Input {...register("name")} placeholder="Ján Novák" className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                        {errors.name && <p className="text-destructive text-[10px] sm:text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">Email *</label>
                        <Input {...register("email")} type="email" placeholder="jan.novak@email.sk" className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                        {errors.email && <p className="text-destructive text-[10px] sm:text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">Telefón</label>
                        <Input {...register("phone")} type="tel" placeholder="+421 900 000 000" className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">Názov firmy</label>
                        <Input {...register("companyName")} placeholder="Názov vašej firmy" className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 h-11 md:h-12 text-base" />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">Ročný obrat</label>
                        <select {...register("annualTurnover")} className="flex h-11 md:h-12 w-full rounded-md border border-primary-foreground/10 bg-charcoal text-primary-foreground px-3 py-2 text-sm sm:text-base appearance-none">
                          <option value="">Vyberte rozsah</option>
                          <option value="pod-1m">Pod 1 mil. €</option>
                          <option value="1-3m">1 – 3 mil. €</option>
                          <option value="3-5m">3 – 5 mil. €</option>
                          <option value="5-10m">5 – 10 mil. €</option>
                          <option value="nad-10m">Nad 10 mil. €</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-primary-foreground/40 mb-1.5 sm:mb-2 block">Správa</label>
                        <Textarea {...register("message")} placeholder="Stručný popis vašej firmy a dôvod predaja..." rows={3} className="bg-charcoal border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/40 resize-none text-base" />
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-charcoal font-medium tracking-wide uppercase h-12 md:h-14 text-xs sm:text-sm">
                        {isSubmitting ? "Odosielam..." : "Odoslať žiadosť"}
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
