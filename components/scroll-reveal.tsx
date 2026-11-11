"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  stagger?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = false,
}: ScrollRevealProps) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = element.current;
    if (!node) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -35px 0px" },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={element}
      className={`scroll-reveal reveal-${direction}${stagger ? " reveal-stagger" : ""}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function AnimatedHeadline({
  lines,
  className = "",
}: {
  lines: { text: string; accent?: boolean }[];
  className?: string;
}) {
  const accessibleText = lines.map((line) => line.text).join(" ");
  let wordIndex = 0;

  return (
    <h1 className={`animated-headline ${className}`} aria-label={accessibleText}>
      {lines.map((line, lineIndex) => (
        <span className="animated-headline-line" key={`${lineIndex}-${line.text}`}>
          {line.text.split(/\s+/).filter(Boolean).map((word) => {
            const index = wordIndex++;
            return (
              <span
                className={`headline-word${line.accent ? " headline-word-accent" : ""}`}
                style={{ animationDelay: `${180 + index * 90}ms` }}
                aria-hidden="true"
                key={`${index}-${word}`}
              >
                {word}&nbsp;
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
