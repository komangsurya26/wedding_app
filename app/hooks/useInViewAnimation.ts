// ini untuk menajalankan animasi ketika elemen masuk ke dalam viewport.

import { useEffect, useState, RefObject } from "react";

export default function useInViewAnimation<T extends HTMLElement>(
  ref: RefObject<T | null>,
  threshold: number = 0.3
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}
