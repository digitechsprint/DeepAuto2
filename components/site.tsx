"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, company, navLinks, plants } from "@/lib/site-config";

/* ---------- Icons ---------- */

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" className={diagonal ? "arrow-icon arrow-diagonal" : "arrow-icon"} viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11.5m-4.5-4.5L15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="icon">
      <path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="icon">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="icon">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.83-3-.2-.31a8.22 8.22 0 1 1 6.95 3.83Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.73 6.73 0 0 1-3.37-2.94c-.25-.44.25-.41.73-1.36.08-.16.04-.31-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.8 4.8 0 0 0 1 2.56 11 11 0 0 0 4.21 3.72c1.57.68 2.18.74 2.97.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

/* ---------- Brand ---------- */

export function LogoMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
      <defs>
        <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFB020" />
          <stop offset=".55" stopColor="#F26B1D" />
          <stop offset="1" stopColor="#D7263D" />
        </linearGradient>
      </defs>
      <path d="M8 30a16 16 0 0 0 30 6" fill="none" stroke="#1E9E5A" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M12 33a12 12 0 0 0 22 3" fill="none" stroke="#1D5FD1" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 3c2 6 10 11 10 20a10 10 0 0 1-20 0c0-6 4-9 5-13 1 3 2 4 3 5 1-4 2-8 2-12Z" fill="url(#flame)" />
      <path d="M24 20c1.5 3 4 4.5 4 8a4 4 0 0 1-8 0c0-2.5 2-4 4-8Z" fill="#fff" opacity=".9" />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand${light ? " brand-light" : ""}`} aria-label="Deep Auto Electricals — home">
      <LogoMark />
      <span className="brand-copy">
        <strong>DEEP AUTO<em>®</em></strong>
        <span>Electricals Pvt. Ltd.</span>
      </span>
    </Link>
  );
}

/* ---------- Header ---------- */

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <span className="topbar-badges">
          <span className="pill-dot" /> IATF 16949 &amp; ISO 9001 certified · Since {company.since}
        </span>
        <div className="topbar-links">
          <a href={company.phoneHref}><PhoneIcon />{company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}><MailIcon />{company.email}</a>
          <Link href="/locations"><PinIcon />Delhi · Haryana</Link>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <TopBar />
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container nav-row">
          <Brand />
          <nav className="primary-nav" aria-label="Primary">
            {navLinks.map((link) =>
              link.href === "/products" ? (
                <div className="nav-item has-mega" key={link.href}>
                  <Link href={link.href} className={isActive(link.href) ? "is-active" : undefined}>
                    {link.label}
                    <svg viewBox="0 0 12 12" aria-hidden="true" className="chev"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </Link>
                  <div className="mega">
                    <div className="mega-grid">
                      {categories.map((c) => (
                        <Link key={c.slug} href={`/products/${c.slug}`} className="mega-link">
                          <span className="mega-thumb" style={{ backgroundImage: `url("${c.image}")` }} />
                          <span>
                            <strong>{c.name}</strong>
                            <small>{c.short}</small>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mega-aside">
                      <span className="kicker">Custom requirement?</span>
                      <p>Send your drawing — our engineering team responds with feasibility and a quote.</p>
                      <Link href="/rfq" className="btn btn-primary btn-sm">Request a quote <ArrowIcon /></Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={isActive(link.href) ? "is-active" : undefined} aria-current={isActive(link.href) ? "page" : undefined}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <div className="header-actions">
            <Link href="/rfq" className="btn btn-primary header-cta">Request a Quote <ArrowIcon /></Link>
            <button type="button" className={`menu-toggle${open ? " is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
          <div className="container mobile-menu-inner">
            <nav aria-label="Mobile">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={isActive(link.href) ? "is-active" : undefined}>
                  {link.label}<ArrowIcon />
                </Link>
              ))}
              <Link href="/locations">Plant Locations<ArrowIcon /></Link>
              <Link href="/life-at-daepl">CSR &amp; Life at DAEPL<ArrowIcon /></Link>
            </nav>
            <div className="mobile-menu-cta">
              <Link href="/rfq" className="btn btn-primary">Request a Quote <ArrowIcon /></Link>
              <a href={company.phoneHref} className="btn btn-ghost"><PhoneIcon /> Call us</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/* ---------- Footer ---------- */

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-cta-band">
        <div>
          <span className="kicker kicker-light">Start a project</span>
          <h2>Have a drawing or part number? <span className="text-gradient">Get a quote from our engineers.</span></h2>
        </div>
        <div className="footer-cta-actions">
          <Link href="/rfq" className="btn btn-primary btn-lg">Request a Quote <ArrowIcon /></Link>
          <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg"><WhatsAppIcon /> WhatsApp us</a>
        </div>
      </div>
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand light />
          <p>IATF 16949 &amp; ISO 9001 certified manufacturer of automotive wire harnesses, cables, terminals, PVC sleeves, sheet metal and moulded parts — since {company.since}.</p>
          <span className="footer-tagline">{company.tagline}</span>
        </div>
        <div className="footer-col">
          <span className="footer-label">Products</span>
          {categories.map((c) => <Link key={c.slug} href={`/products/${c.slug}`}>{c.name}</Link>)}
        </div>
        <div className="footer-col">
          <span className="footer-label">Company</span>
          <Link href="/about">About Us</Link>
          <Link href="/infrastructure">Infrastructure</Link>
          <Link href="/quality">Quality &amp; Certifications</Link>
          <Link href="/customers">Our Customers</Link>
          <Link href="/life-at-daepl">CSR &amp; Life at DAEPL</Link>
          <Link href="/careers">Careers</Link>
        </div>
        <div className="footer-col footer-contact">
          <span className="footer-label">Get in touch</span>
          <a href={company.phoneHref}><PhoneIcon />{company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}><MailIcon />{company.email}</a>
          {plants.map((p) => (
            <Link key={p.city} href="/locations"><PinIcon />{p.city}, {p.state}{p.status !== "Operational" ? ` · ${p.status}` : ""}</Link>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {company.name} All rights reserved.</span>
        <div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}

/* ---------- Floating contact (every page) ---------- */

export function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="Quick contact">
      <a href={company.phoneHref} className="fab fab-call" aria-label={`Call ${company.phoneDisplay}`}>
        <PhoneIcon /><span className="fab-label">Call us</span>
      </a>
      <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="fab fab-whatsapp" aria-label="Chat on WhatsApp">
        <WhatsAppIcon /><span className="fab-label">WhatsApp</span>
      </a>
    </div>
  );
}
