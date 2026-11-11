"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const containers = document.querySelectorAll<HTMLElement>(
      "main .section > .container",
    );
    const targets: HTMLElement[] = [];

    containers.forEach((container) => {
      if (container.querySelector(".scroll-reveal")) return;
      Array.from(container.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        child.classList.add("motion-scroll-target");
        child.style.setProperty("--motion-order", String(index));
        targets.push(child);
      });
    });

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      targets.forEach((target) => target.classList.add("motion-scroll-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    document.documentElement.classList.add("motion-ready");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
