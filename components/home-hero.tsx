"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/site";
import { images } from "@/lib/site-config";

const INTERVAL = 6500;

const slides = [
  {
    image: images.hero1,
    kicker: "Automotive components · Since 1998",
    heading: ["Precision in", "every connection."],
    description: "We engineer the components that bring vehicles to life. Made with care. Trusted to perform.",
  },
  {
    image: images.hero2,
    kicker: "Engineered around your application",
    heading: ["Made to fit.", "Made to move."],
    description: "Wire harnesses, cables and precision components, designed for the demands of automotive manufacturing.",
  },
  {
    image: images.hero3,
    kicker: "Built on experience · Built together",
    heading: ["A legacy of care.", "Ready for what’s next."],
    description: "More than 25 years of automotive manufacturing experience, with quality at the heart of every connection.",
  },
  {
    image: images.hero4,
    kicker: "Quality in every step",
    heading: ["Details that matter.", "Quality that lasts."],
    description: "Thoughtful engineering and careful manufacturing for every part of your vehicle.",
  },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, paused, reduced]);

  return (
    <section
      className={`hero${paused ? " is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Deep Auto Electricals highlights"
    >
      {slides.map((s, i) => (
        <div key={s.image} aria-hidden="true" className={`hero-photo${i === active ? " is-active" : ""}`} style={{ backgroundImage: `url("${s.image}")` }} />
      ))}
      <div className="hero-scrim" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 className="sr-only">Deep Auto Electricals — automotive wire harness, terminal and component manufacturer in Delhi since 1998</h1>

          {/* All slides share one grid cell, so the block keeps the height of the tallest slide (no layout jump). */}
          <div className="hero-slides" aria-live={paused ? "polite" : "off"}>
            {slides.map((s, i) => (
              <div
                key={s.kicker}
                className={`hero-slide${i === active ? " is-active" : ""}`}
                aria-hidden={i !== active}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                <span className="hero-pill"><span className="pill-dot" />{s.kicker}</span>
                <h2 className="hero-title">
                  {s.heading.map((line, li) => (
                    <span key={line} className={`hero-line${li === 1 ? " text-gradient" : ""}`}>
                      {line.split(" ").map((word, wi) => (
                        <span key={wi} className="hw" style={{ animationDelay: `${120 + (li * 3 + wi) * 70}ms` }}>
                          {word}&nbsp;
                        </span>
                      ))}
                    </span>
                  ))}
                </h2>
                <p className="hero-desc">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <Link href="/rfq" className="btn btn-primary btn-lg">Request a Quote <ArrowIcon /></Link>
            <Link href="/products" className="btn btn-glass btn-lg">Explore Products</Link>
          </div>
          <ul className="hero-trust">
            <li><strong>IATF 16949</strong><span>Automotive QMS</span></li>
            <li><strong>ISO 9001</strong><span>Quality management</span></li>
            <li><strong>25+ yrs</strong><span>Manufacturing</span></li>
          </ul>
        </div>

        <aside className="hero-card" aria-label="Capability snapshot">
          <div className="hero-card-head">
            <span className="kicker kicker-light">Capability snapshot</span>
            <span className="live-dot">In production</span>
          </div>
          <div className="hero-card-stats">
            <div><strong>44</strong><span>Crimping machines</span></div>
            <div><strong>35–180<small>T</small></strong><span>Injection moulding</span></div>
            <div><strong>03</strong><span>Plants · Delhi &amp; Haryana</span></div>
            <div><strong>01</strong><span>In-house tool room</span></div>
          </div>
          <div className="hero-card-foot">
            <span>Internal lab</span><span>Terminal stamping</span><span>Drawing-to-part</span>
          </div>
        </aside>
      </div>

      <div className="container hero-bottom">
        <div className="hero-nav">
          <span className="hero-count"><strong>{String(active + 1).padStart(2, "0")}</strong> / {String(slides.length).padStart(2, "0")}</span>
          <div className="hero-dots" role="tablist" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.kicker}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}: ${s.heading.join(" ")}`}
                className={i === active ? "is-active" : i < active ? "is-done" : ""}
                onClick={() => setActive(i)}
              >
                <span style={{ animationDuration: `${INTERVAL}ms` }} />
              </button>
            ))}
          </div>
          <div className="hero-arrows">
            <button type="button" aria-label="Previous slide" onClick={() => setActive((active - 1 + slides.length) % slides.length)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 5 7 10l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" aria-label="Next slide" onClick={() => setActive((active + 1) % slides.length)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        <span className="hero-scroll">Scroll to explore</span>
      </div>
    </section>
  );
}
