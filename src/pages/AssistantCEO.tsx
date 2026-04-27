import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubpageHero from "@/components/sections/SubpageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import PageMeta from "@/components/PageMeta";
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
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileText,
  Loader2,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
} from "lucide-react";

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
  expectedSalary: z.string().min(1, { message: "Vyberte mzdové očakávanie" }),
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
});

type FormValues = z.infer<typeof formSchema>;

const responsibilities = [
  {
    icon: ClipboardList,
    title: "Koordinácia portfólia",
    text: "Komunikácia naprieč našimi firmami — Ensola, Woodsteel, EUROSCAFF, History Caffe — a koordinácia úloh medzi tímami.",
  },
  {
    icon: CalendarClock,
    title: "Kalendár a logistika",
    text: "Správa kalendára CEO, plánovanie meetingov, ciest a operatívna agenda každého pracovného dňa.",
  },
  {
    icon: FileText,
    title: "Príprava podkladov",
    text: "Príprava prezentácií, reportov a materiálov pre rokovania s partnermi a investormi.",
  },
  {
    icon: ShieldCheck,
    title: "Diskrétnosť",
    text: "Práca s citlivými informáciami investičnej skupiny — vyžadujeme absolútnu spoľahlivosť.",
  },
];

const profile = [
  "Skúsenosť s asistentskou alebo office management pozíciou (výhodou C-level)",
  "Výborná komunikácia v slovenčine a angličtine, nemčina je plus",
  "Samostatnosť, organizovanosť a schopnosť pracovať pod tlakom",
  "Pokročilá práca s MS Office / Google Workspace",
  "Vodičský preukaz skupiny B a ochota cestovať",
  "Diskrétnosť a profesionálne vystupovanie",
];

const offer = [
  "Priamy kontakt s CEO a vedením investičnej skupiny",
  "Vhľad do reálnych investičných a akvizičných procesov",
  "Flexibilná forma spolupráce — úväzok aj miesto výkonu doladíme podľa kandidáta",
  "Konkurencieschopné finančné ohodnotenie",
  "Priestor na osobný a profesijný rast",
];

const salaryOptions = [
  "1 200 – 1 600 € hrubého",
  "1 600 – 2 200 € hrubého",
  "2 200 – 3 000 € hrubého",
  "3 000 € a viac",
  "Dohodou",
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
      expectedSalary: "",
      earliestStart: "",
      consent: false as unknown as true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const file = values.cv;
      const ext = file.name.split(".").pop() ?? "pdf";
      const safeName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ""));
      const path = `assistant-ceo/${crypto.randomUUID()}-${safeName}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("cv-uploads")
        .upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase
        .from("assistant_applications")
        .insert({
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          city: values.city,
          motivation: values.motivation,
          expected_salary: values.expectedSalary,
          earliest_start: values.earliestStart,
          cv_path: path,
          consent_given: values.consent,
        });
      if (insertError) throw insertError;

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
          "Prihlášku sa nepodarilo odoslať. Skúste to znova alebo nás kontaktujte na kariera@assetra.sk.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Asistent/ka CEO | Kariéra | ASSETRA investments"
        description="Hľadáme asistenta/asistentku CEO pre investičnú skupinu ASSETRA. Práca priamo s vedením, koordinácia portfólia, príprava podkladov."
      />
      <Header />
      <main>
        <SubpageHero
          label="Kariéra · Executive"
          title="Asistent/ka"
          titleAccent="CEO"
          description="Pracujte priamo s CEO investičnej skupiny ASSETRA. Koordinujte portfólio firiem, pripravujte podklady a buďte pravou rukou pri každodenných rozhodnutiach."
        />

        {/* About the role */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <AnimatedSection>
              <div className="max-w-3xl mb-10 sm:mb-14">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  O úlohe
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4 sm:mb-6 leading-tight">
                  Pravá ruka CEO investičnej skupiny
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                  Budete súčasťou každodenného fungovania ASSETRA investments —
                  od portfólia firiem cez akvizície až po rokovania s investormi.
                  Hľadáme niekoho, kto vie udržať prehľad a posunúť veci vpred.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {responsibilities.map((r) => (
                <AnimatedSection key={r.title}>
                  <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <r.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
                      {r.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Profile + Offer */}
        <section className="pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <AnimatedSection>
                <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <UserRound className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground">
                      Koho hľadáme
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {profile.map((p) => (
                      <li
                        key={p}
                        className="text-sm sm:text-base text-foreground/80 flex items-start gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="bg-secondary/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground">
                      Čo ponúkame
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {offer.map((o) => (
                      <li
                        key={o}
                        className="text-sm sm:text-base text-foreground/80 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id="prihlaska" className="pb-16 sm:pb-24 md:pb-32">
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
                    Vyplňte formulár a priložte aktuálne CV. Ozveme sa Vám
                    v najbližších pracovných dňoch.
                  </p>
                </div>

                {submitted ? (
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-8 text-center">
                    <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
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
                                  placeholder="Jana Nováková"
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
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
                                  placeholder="jana@email.sk"
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
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
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
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
                                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
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
                                className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="expectedSalary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-foreground/80">
                                Očakávaná hrubá mzda *
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
                                    <SelectValue placeholder="Vyberte rozsah" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {salaryOptions.map((s) => (
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
                                  <SelectTrigger className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground focus:ring-primary">
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
                      </div>

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
                                className="flex items-center gap-3 cursor-pointer bg-primary-foreground/5 border border-dashed border-primary-foreground/30 hover:border-primary/60 hover:bg-primary-foreground/10 transition-colors rounded-md px-4 py-4"
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
                                  className="mt-1 border-primary-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                              </FormControl>
                              <FormLabel className="text-primary-foreground/70 text-sm font-normal leading-relaxed cursor-pointer">
                                Súhlasím so spracovaním osobných údajov pre účely
                                výberového konania v zmysle{" "}
                                <Link
                                  to="/ochrana-udajov"
                                  className="text-primary underline underline-offset-2"
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
                        className="w-full sm:w-auto group rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-6 text-base"
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
      </main>
      <Footer />
    </>
  );
};

export default AssistantCEO;