import * as React from "react"
/**
 * Hook untuk animasi progress loading (0 → 100%)
 * dengan easing cubic-out dan durasi tertentu.
 */
export function useLoadingProgress(minDuration: number = 5000) {
  const [progress, setProgress] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    function step(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / minDuration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setProgress(Math.floor(eased * 100));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else setProgress(100);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, []);

  return progress;
}
