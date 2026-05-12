import { useEffect, useRef, useState } from "react";

/**
 * Triggers a one-time reveal when the element enters the viewport.
 * @param {number} threshold - IntersectionObserver threshold (0–1)
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
