import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";

const Calculator = () => {
  const [investment, setInvestment] = useState(50000);
  const [duration, setDuration] = useState(12);
  const annualRate = 0.10;
  
  const calculations = useMemo(() => {
    const monthlyRate = annualRate / 12;
    const monthlyPayout = investment * monthlyRate;
    const totalReturn = monthlyPayout * duration;
    const totalAtEnd = investment + totalReturn;
    
    return {
      monthlyPayout: Math.round(monthlyPayout),
      totalReturn: Math.round(totalReturn),
      totalAtEnd: Math.round(totalAtEnd),
    };
  }, [investment, duration]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="calculator" className="py-32 lg:py-48">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-ultra-wide uppercase text-gold-muted mb-6">
              Investment Calculator
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md mb-8">
              Calculate Your <span className="text-gold">Returns</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed">
              See exactly what you would earn with Omega Capital's fixed 10% annual return.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm tracking-wide uppercase text-muted-foreground">
                    Investment Amount
                  </label>
                  <span className="font-serif text-xl text-gold">{formatCurrency(investment)}</span>
                </div>
                <Slider
                  value={[investment]}
                  onValueChange={(value) => setInvestment(value[0])}
                  min={10000}
                  max={500000}
                  step={5000}
                  className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>€10,000</span>
                  <span>€500,000</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm tracking-wide uppercase text-muted-foreground">
                    Investment Duration
                  </label>
                  <span className="font-serif text-xl text-gold">{duration} months</span>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  min={6}
                  max={24}
                  step={6}
                  className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>6 months</span>
                  <span>24 months</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Annual Return Rate</span>
                  <span className="text-gold">10% fixed</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Payout Frequency</span>
                  <span className="text-gold">Monthly</span>
                </div>
              </div>
            </div>
            
            <div className="bg-charcoal p-8 lg:p-12">
              <h3 className="font-serif text-2xl mb-8 text-center">Your Returns</h3>
              
              <div className="space-y-8">
                <div className="text-center pb-8 border-b border-border">
                  <p className="text-sm tracking-wide uppercase text-muted-foreground mb-2">
                    Monthly Payout
                  </p>
                  <p className="font-serif text-display-sm text-gold">
                    {formatCurrency(calculations.monthlyPayout)}
                  </p>
                </div>
                
                <div className="text-center pb-8 border-b border-border">
                  <p className="text-sm tracking-wide uppercase text-muted-foreground mb-2">
                    Total Return Over {duration} Months
                  </p>
                  <p className="font-serif text-display-sm text-foreground">
                    {formatCurrency(calculations.totalReturn)}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm tracking-wide uppercase text-muted-foreground mb-2">
                    Total at End of Term
                  </p>
                  <p className="font-serif text-display-sm text-gold">
                    {formatCurrency(calculations.totalAtEnd)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    (Principal + Returns)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
