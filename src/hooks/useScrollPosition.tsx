import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  isScrolled: boolean;
  scrollDirection: "up" | "down" | null;
}

export const useScrollPosition = (threshold: number = 50): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    isScrolled: false,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      setScrollPosition({
        scrollY: currentScrollY,
        isScrolled: currentScrollY > threshold,
        scrollDirection: direction,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    // Initial check
    updateScrollPosition();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrollPosition;
};
