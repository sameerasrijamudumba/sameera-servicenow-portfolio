"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

/** CSS owns animation so reduced motion also works before hydration. Content is always visible. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.15 });
  return <div ref={ref} className={`reveal ${className}`} data-visible={visible}>{children}</div>;
}
