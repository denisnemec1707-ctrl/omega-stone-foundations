import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { useLocale } from "@/i18n/hooks";
import { getLocalizedPath } from "@/i18n/routes";

const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB

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
        email: z
          .string()
          .trim()
          .email({ message: t("email.invalid") })
          .max(255),
        phone: z
          .string()
          .trim()
          .min(6, { message: t("phone.min") })
          .max(40),
        city: z.string().trim().min(2, { message: t("city.min") }).max(120),
        motivation: z
          .string()
          .trim()
          .min(30, { message: t("motivation.min") })
          .max(2000, { message: t("message.max2000") }),
        earliestStart: z.string().min(1, { message: t("select.availability") }),
        cv: z
          .instanceof(File, { message: t("cv.required") })
          .refine((f) => f.size > 0, { message: t("cv.required") })
          .refine((f) => f.size <= MAX_CV_SIZE, {
            message: t("cv.size"),
          })
          .refine((f) => ACCEPTED_CV_TYPES.includes(f.type), {
            message: t("cv.format"),
          }),
        consent: z.literal(true, {
          errorMap: () => ({ message: t("consent.required") }),
        }),
        website: z.string().optional(),
      }),
    [t],
  );
};

type FormValues = z.infer<ReturnType<typeof useFormSchema>>;

function sanitizeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 80);
}

const AssistantCEO = () => {
  const { t } = useTranslation("assistantCeo");
  const { t: tVal } = useTranslation("validation");
  const locale = useLocale();
  const formSchema = useFormSchema();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const keyPoints = [
    {
      icon: UserRound,
      title: t("keyPoints.ceo.title"),
      text: t("keyPoints.ceo.text"),
    },
    {
      icon: TrendingUp,
      title: t("keyPoints.bonus.title"),
      text: t("keyPoints.bonus.text"),
    },
    {
      icon: Sparkles,
      title: t("keyPoints.junior.title"),
      text: t("keyPoints.junior.text"),
    },
  ];

  const startOptions = [
    { value: "immediately", label: t("startOptions.immediately") },
    { value: "2weeks", label: t("startOptions.2weeks") },
    { value: "1month", label: t("startOptions.1month") },
    { value: "2months", label: t("startOptions.2months") },
    { value: "other", label: t("startOptions.other") },
  ];

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
        title: tVal("toast.applicationSent"),
        description: tVal("toast.applicationSentDesc"),
      });
    } catch (err) {
      console.error("Application submit error", err);
      toast({
        title: tVal("toast.error"),
        description: tVal("toast.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-5 sm:mb-7 tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground/85 leading-tight mb-8 sm:mb-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a
                href="#prihlaska"
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

      {/* KEY POINTS */}
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

      {/* FORM */}
      <section id="prihlaska" className="pb-16 sm:pb-24 md:pb-32 scroll-mt-20">
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
                              <Input
                                {...field}
                                placeholder="Jan Novak"
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
                              {t("form.email")}
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
                              {t("form.phone")}
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
                              {t("form.city")}
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
                            {t("form.motivation")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder={t("form.motivationPlaceholder")}
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
                            {t("form.availability")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary-foreground">
                                <SelectValue placeholder={t("form.availabilityPlaceholder")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {startOptions.map((s) => (
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
                      name="cv"
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                          <FormLabel className="text-primary-foreground/80">
                            {t("form.cv")}
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
                                  : t("form.cvPlaceholder")}
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
                              {t("consent").split("zásad ochrany osobných údajov")[0]}
                              <Link
                                to={getLocalizedPath("privacy", locale)}
                                className="text-primary-foreground underline underline-offset-2"
                              >
                                {t("consent").match(/zásad ochrany osobných údajov/)?.[0] ?? "zásad ochrany osobných údajov"}
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
                          {t("form.submitting")}
                        </>
                      ) : (
                        <>
                          {t("form.submit")}
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
