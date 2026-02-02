import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is the 10% annual return generated?",
    answer: "Our return comes from the profit margin on real estate transactions. We acquire properties at least 20% below market value, renovate them, and resell at fair market price. The margin between acquisition cost and sale price covers your fixed return, renovation costs, and operational expenses. This is real profit from real transactions, not interest from lending or returns from financial markets."
  },
  {
    question: "Is my investment secured by real estate?",
    answer: "Yes. Every euro you invest is deployed into physical property acquisition. While your investment is not a direct ownership stake in a specific property, the entire capital pool is secured by the real estate assets we hold during each transaction cycle. The tangible nature of these assets provides fundamental security for your capital."
  },
  {
    question: "What is the typical investment horizon?",
    answer: "Standard investment terms range from 12 to 18 months. This aligns with our typical property cycle—acquisition, renovation, and resale. At the end of each term, your full principal is returned along with all earned returns. You may then choose to reinvest in a new cycle or withdraw your capital entirely."
  },
  {
    question: "How and when are payouts made?",
    answer: "Returns are paid monthly, directly to your designated bank account. Payments are made on the same date each month throughout your investment term. Your monthly payout is calculated as 1/12th of your annual return (10% ÷ 12 = 0.833% monthly on your principal)."
  },
  {
    question: "What are the risks involved?",
    answer: "The primary risk is tied to real estate market conditions. However, we mitigate this through conservative acquisition—only purchasing properties significantly below market value. We also limit exposure through short investment cycles and diversification across multiple properties. While no investment is without risk, our model is designed to protect capital even in adverse market conditions."
  },
  {
    question: "What is the minimum investment amount?",
    answer: "The minimum investment is €10,000. This threshold ensures meaningful participation in our property transactions while remaining accessible to individual investors. Larger investments may qualify for additional terms—contact us for details."
  },
  {
    question: "Can I withdraw my investment early?",
    answer: "Investments are committed for the agreed term to ensure capital is available for property transactions. Early withdrawal is generally not possible. However, in exceptional circumstances, we may accommodate requests subject to availability and a early exit fee. We recommend only investing capital you can commit for the full term."
  },
  {
    question: "How is Omega Capital regulated?",
    answer: "Omega Capital s.r.o. is a registered Slovak company operating under Slovak commercial law. Our investment contracts are governed by Slovak law and enforceable in Slovak courts. We maintain full financial records and provide regular reporting to all investors."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-32 lg:py-48 bg-charcoal">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
              Common Questions
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md mb-8">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border px-6 data-[state=open]:border-gold transition-colors"
              >
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline hover:text-gold py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
