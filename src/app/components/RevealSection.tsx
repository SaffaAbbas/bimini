"use client";

import {
  createElement,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const REVEAL_TAGS = ["section", "article", "div"] as const;
export type RevealAs = (typeof REVEAL_TAGS)[number];

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Extra delay before animation starts (ms). */
  delayMs?: number;
  /** Root element — use `article` for tour rows, `div` for inner blocks. */
  as?: RevealAs;
};

export function RevealSection({
  children,
  className = "",
  id,
  delayMs = 0,
  as = "section",
}: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const cn = `reveal-section${visible ? " reveal-visible" : ""}${className ? ` ${className}` : ""}`;
  const style = {
    "--reveal-delay": `${delayMs}ms`,
  } as CSSProperties;

  return createElement(
    as,
    {
      ref,
      id,
      className: cn,
      style,
    },
    children
  );
}
