import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  formatValue?: (value: number) => string;
}

export const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
  formatValue,
}: AnimatedCounterProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) => {
    if (formatValue) {
      return formatValue(Math.round(current));
    }
    return Math.round(current).toLocaleString("sk-SK");
  });

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isVisible, value, spring, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

interface AnimatedValueProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  formatValue?: (value: number) => string;
}

export const AnimatedValue = ({
  value,
  suffix = "",
  prefix = "",
  className = "",
  formatValue,
}: AnimatedValueProps) => {
  const spring = useSpring(value, {
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) => {
    if (formatValue) {
      return formatValue(Math.round(current));
    }
    return Math.round(current).toLocaleString("sk-SK");
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};
