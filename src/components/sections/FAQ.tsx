import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const faqs = [
  {
    question: "Ako sa generuje 10% ročný výnos?",
    answer: "Náš výnos pochádza zo ziskovej marže na realitných transakciách. Akvizujeme nehnuteľnosti minimálne 20% pod trhovou hodnotou, rekonštruujeme ich a predávame za férovú trhovú cenu. Marža medzi akvizičnými nákladmi a predajnou cenou pokrýva váš fixný výnos, náklady na rekonštrukciu a prevádzkové výdavky. Ide o reálny zisk z reálnych transakcií, nie úroky z požičiavania ani výnosy z finančných trhov."
  },
  {
    question: "Je moja investícia zabezpečená nehnuteľnosťami?",
    answer: "Áno. Každé euro, ktoré investujete, je nasadené do akvizície fyzických nehnuteľností. Hoci vaša investícia nie je priamym vlastníckym podielom v konkrétnej nehnuteľnosti, celý kapitálový fond je zabezpečený realitnými aktívami, ktoré držíme počas každého transakčného cyklu. Hmatateľná povaha týchto aktív poskytuje základné zabezpečenie pre váš kapitál."
  },
  {
    question: "Aký je typický investičný horizont?",
    answer: "Štandardné investičné obdobia sa pohybujú od 12 do 18 mesiacov. To zodpovedá nášmu typickému cyklu nehnuteľnosti — akvizícia, rekonštrukcia a predaj. Na konci každého obdobia sa vám vráti celá istina spolu so všetkými získanými výnosmi. Potom si môžete vybrať, či reinvestujete do nového cyklu alebo kapitál kompletne vyberiete."
  },
  {
    question: "Ako a kedy sa vyplácajú výnosy?",
    answer: "Výnosy sa vyplácajú mesačne, priamo na váš určený bankový účet. Platby sa realizujú v rovnaký deň každý mesiac počas celého investičného obdobia. Vaša mesačná výplata sa vypočíta ako 1/12 vášho ročného výnosu (10% ÷ 12 = 0,833% mesačne z vašej istiny)."
  },
  {
    question: "Aké sú riziká investície?",
    answer: "Primárne riziko je spojené s podmienkami na realitnom trhu. Toto však zmierňujeme konzervatívnou akvizíciou — kupujeme iba nehnuteľnosti výrazne pod trhovou hodnotou. Expozíciu tiež limitujeme krátkymi investičnými cyklami a diverzifikáciou naprieč viacerými nehnuteľnosťami. Hoci žiadna investícia nie je bez rizika, náš model je navrhnutý tak, aby chránil kapitál aj v nepriaznivých trhových podmienkach."
  },
  {
    question: "Aká je minimálna výška investície?",
    answer: "Minimálna investícia je 10 000 €. Tento prah zabezpečuje zmysluplnú účasť na našich realitných transakciách a zároveň zostáva prístupný individuálnym investorom. Väčšie investície môžu kvalifikovať na dodatočné podmienky — kontaktujte nás pre detaily."
  },
  {
    question: "Môžem vybrať investíciu predčasne?",
    answer: "Investície sú viazané na dohodnuté obdobie, aby bol kapitál dostupný pre realitné transakcie. Predčasný výber vo všeobecnosti nie je možný. V mimoriadnych prípadoch však môžeme vyhovieť žiadostiam v závislosti od dostupnosti a s poplatkom za predčasný výstup. Odporúčame investovať iba kapitál, ktorý môžete viazať na celé obdobie."
  },
  {
    question: "Ako je ASSETRA investments regulovaná?",
    answer: "ASSETRA Investments s.r.o. je registrovaná slovenská spoločnosť pôsobiaca podľa slovenského obchodného práva. Naše investičné zmluvy sa riadia slovenským právom a sú vymáhateľné na slovenských súdoch. Vedieme kompletné finančné záznamy a poskytujeme pravidelné reporty všetkým investorom."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-12 sm:py-20 md:py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-8 sm:mb-10 md:mb-16">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide uppercase text-gold-muted mb-3 sm:mb-4 md:mb-6">
              Časté otázky
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-display-sm lg:text-display-md text-white">
              Často kladené <span className="text-gold">otázky</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.08}>
            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <StaggerItem key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border px-4 sm:px-4 md:px-6 data-[state=open]:border-gold transition-colors"
                  >
                    <AccordionTrigger className="text-left font-serif text-sm sm:text-base md:text-lg hover:no-underline hover:text-gold py-4 sm:py-4 md:py-6 text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light text-xs sm:text-sm md:text-base leading-relaxed pb-4 sm:pb-4 md:pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
