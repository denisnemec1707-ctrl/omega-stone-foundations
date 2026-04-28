import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Phone,
  Sparkles,
  TrendingUp,
  Upload,
  UserRound,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { submitFormWithFile } from "@/lib/submitForm";

const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Zadajte celé meno" })
    .max(120, { message: "Meno je príliš dlhé" }),
  email: z
    .string()
    .trim()
    .email({ message: "Neplatný email" })
    .max(255),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Zadajte telefónne číslo" })
    .max(40),
  city: z.string().trim().min(2, { message: "Zadajte mesto" }).max(120),
  motivation: z
    .string()
    .trim()
    .min(30, { message: "Napíšte aspoň pár viet (min. 30 znakov)" })
    .max(2000, { message: "Maximálne 2000 znakov" }),
  earliestStart: z.string().min(1, { message: "Vyberte dostupnosť" }),
  cv: z
    .instanceof(File, { message: "Priložte CV" })
    .refine((f) => f.size > 0, { message: "Priložte CV" })
    .refine((f) => f.size <= MAX_CV_SIZE, {
      message: "Súbor je väčší ako 5 MB",
    })
    .refine((f) => ACCEPTED_CV_TYPES.includes(f.type), {
      message: "Povolené formáty: PDF, DOC, DOCX",
    }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Musíte súhlasiť so spracovaním údajov" }),
  }),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const keyPoints = [
  {
    icon: UserRound,
    title: "Priamo pri konateľovi",
    text: "Reálny vhľad do vedenia, akvizícií a rozhodnutí.",
  },
  {
    icon: TrendingUp,
    title: "Výkonnostné bonusy",
    text: "K základnej mzde bonusy a odmeny naviazané na reálne výsledky práce.",
  },
  {
    icon: Sparkles,
    title: "Junior pozícia",
    text: "Hľadáme spoľahlivosť a chuť učiť sa. Vhodné aj pre študenta VŠ. Prax na C-level nie je podmienka.",
  },
];

const startOptions = [
  "Ihneď",
  "Do 2 týždňov",
  "Do 1 mesiaca",
  "Do 2 mesiacov",
  "Iné — uvediem v motivácii",
];

function sanitizeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 80);
}

const AssistantCEO = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      motivation: "",
      earliestStart: "",
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
      const file = values.cv;
      const ext = file.name.split(".").pop() ?? "pdf";
      const safeName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ""));
      const renamedFile = new File(
        [file],
        `${crypto.randomUUID()}-${safeName}.${ext}`,
        { type: file.type },
      );

      await submitFormWithFile(
        import.meta.env.VITE_WEBHOOK_ASISTENT_CEO,
        {
          form_source: "asistent-ceo",
          submitted_at: new Date().toISOString(),
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          city: values.city,
          motivation: values.motivation,
          earliest_start: values.earliestStart,
          cv_filename: renamedFile.name,
          cv_size_bytes: renamedFile.size,
          cv_mime_type: renamedFile.type,
          consent_given: values.consent,
          user_agent:
            typeof navigator !== "undefined" ? navigator.userAgent : null,
          landing_page:
            typeof window !== "undefined"
              ? window.location.pathname + window.location.search
              : null,
        },
        renamedFile,
        "cv",
      );

      setSubmitted(true);
      form.reset();
      toast({
        title: "Prihláška odoslaná",
        description: "Ďakujeme. Ozveme sa Vám v najbližších dňoch.",
      });
    } catch (err) {
      console.error("Application submit error", err);
      toast({
        title: "Niečo sa pokazilo",
        description:
          "Prihlášku sa nepodarilo odoslať. Skúste to znova alebo nás kontaktujte na info@assetrainvestments.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LandingLayout
      title="Asistent CEO — junior pozícia | ASSETRA Investments"
      description="Junior asistent konateľa investičnej skupiny ASSETRA. Práca priamo pri CEO, koordinácia portfólia firiem, príprava podkladov."
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
              Kariéra · Junior pozícia
            </span>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-5 sm:mb-7 tracking-tight">
              Asistent CEO.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground/85 leading-tight mb-8 sm:mb-10">
              Pracujte priamo pri konateľovi spoločnosti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a
                href="#prihlaska"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary-foreground text-charcoal hover:bg-primary-foreground/90 transition-colors text-base font-medium"
              >
                Poslať prihlášku
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {keyPoints.map((b) => (
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

      {/* PRIHLÁŠKA */}
      <section id="prihlaska" className="pb-16 sm:pb-24 md:pb-32 scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <AnimatedSection>
            <div className="bg-charcoal rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16">
              <div className="max-w-2xl mb-8 sm:mb-12">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-foreground/50">
                  Prihláška
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground mt-3 mb-4 leading-tight">
                  Pošlite nám svoju prihlášku
                </h2>
                <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">
                  Vyplňte formulár a priložte aktuálne CV.{" "}
                  <strong className="text-primary-foreground">
                    Ozveme sa Vám v najbližších pracovných dňoch.
                  </strong>
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-primary-foreground/30 bg-primary-foreground/10 p-6 sm:p-8 text-center max-w-2xl">
                  <CheckCircle2 className="w-10 h-10 text-primary-foreground mx-auto mb-4" />
                  <h3 className="font-serif text-xl sm:text-2xl text-primary-foreground mb-2">
                    Ďakujeme
                  </h3>
                  <p className="text-primary-foreground/70 text-sm sm:text-base">
                    Vaša prihláška bola úspešne odoslaná. Ozveme sa Vám
                    v najbližších dňoch.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 sm:space-y-6"
                  >
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
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-foreground/80">
                              Mesto / región *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Bratislava"
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
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            Prečo Vás táto pozícia zaujala? *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder="Napíšte nám pár viet o sebe a Vašej motivácii…"
                              className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="earliestStart"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            Najskorší možný nástup *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary-foreground">
                                <SelectValue placeholder="Vyberte termín" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {startOptions.map((s) => (
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
                      name="cv"
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            Životopis (PDF, DOC, DOCX, max 5 MB) *
                          </FormLabel>
                          <FormControl>
                            <label
                              htmlFor="cv-upload"
                              className="flex items-center gap-3 cursor-pointer bg-primary-foreground/5 border border-dashed border-primary-foreground/30 hover:border-primary-foreground/60 hover:bg-primary-foreground/10 transition-colors rounded-md px-4 py-4"
                            >
                              <Upload className="w-5 h-5 text-primary-foreground/60 flex-shrink-0" />
                              <span className="text-sm text-primary-foreground/70 truncate">
                                {value instanceof File
                                  ? value.name
                                  : "Kliknite pre nahratie CV"}
                              </span>
                              <input
                                {...rest}
                                id="cv-upload"
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className="sr-only"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) onChange(f);
                                }}
                              />
                            </label>
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
                              Súhlasím so spracovaním osobných údajov pre účely
                              výberového konania v zmysle{" "}
                              <Link
                                to="/ochrana-udajov"
                                className="text-primary-foreground underline underline-offset-2"
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
                      className="w-full sm:w-auto group rounded-full bg-primary-foreground text-charcoal hover:bg-primary-foreground/90 px-8 py-6 text-base"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Odosielam…
                        </>
                      ) : (
                        <>
                          Odoslať prihlášku
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

export default AssistantCEO;
