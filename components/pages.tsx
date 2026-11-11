import Link from "next/link";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/site";
import { EnquiryForm } from "@/components/forms";
import { HomeHero } from "@/components/home-hero";
import { CareersBoard } from "@/components/careers-board";
import {
  categories,
  certificates,
  company,
  customers,
  images,
  jobs,
  plants,
  stats,
  type Category,
  type Product,
} from "@/lib/site-config";

/* ================= Shared building blocks ================= */

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`kicker${light ? " kicker-light" : ""}`}>{children}</span>;
}

function SectionHead({
  kicker,
  title,
  text,
  center = false,
  light = false,
  action,
}: {
  kicker: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
  light?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className={`section-head${center ? " is-center" : ""}${action ? " has-action" : ""}`}>
      <div>
        <Kicker light={light}>{kicker}</Kicker>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

type Crumb = { href?: string; label: string };

export function PageHero({ kicker, title, lead, image, crumbs = [] }: { kicker: string; title: React.ReactNode; lead: string; image?: string; crumbs?: Crumb[] }) {
  return (
    <section className="page-hero">
      {image && <div className="page-hero-img" style={{ backgroundImage: `url("${image}")` }} aria-hidden="true" />}
      <div className="page-hero-scrim" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container page-hero-inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <i>/</i>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <Kicker light>{kicker}</Kicker>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}

function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <div className={`img ${className}`} role="img" aria-label={alt} style={{ backgroundImage: `url("${src}")` }} />;
}

function CtaBanner({ title, text, href = "/rfq", label = "Request a Quote" }: { title: string; text: string; href?: string; label?: string }) {
  return (
    <div className="cta-banner">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="cta-banner-actions">
        <Link href={href} className="btn btn-primary">{label} <ArrowIcon /></Link>
        <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-outline-light"><WhatsAppIcon /> WhatsApp</a>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link className="cat-card" href={`/products/${category.slug}`}>
      <div className="cat-card-img" style={{ backgroundImage: `url("${category.image}")` }}>
        <span className="cat-num">{category.number}</span>
      </div>
      <div className="cat-card-body">
        <h3>{category.name}</h3>
        <p>{category.summary}</p>
        <ul className="cat-items">
          {category.products.slice(0, 3).map((p) => <li key={p.slug}>{p.name}</li>)}
        </ul>
        <span className="link-arrow">View range <ArrowIcon /></span>
      </div>
    </Link>
  );
}

function PriceTag({ product }: { product: Product }) {
  if (!product.showPrice) return <span className="price price-rfq">Price on request</span>;
  return (
    <span className="price">
      {product.price != null ? (
        <>
          <strong>₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
          <small>{product.priceUnit} · excl. GST</small>
        </>
      ) : (
        <>
          <strong>Price list</strong>
          <small>{product.priceUnit} · updating soon</small>
        </>
      )}
    </span>
  );
}

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="check"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ================= Home ================= */

export function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Stats band */}
      <section className="stats-band">
        <div className="container stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="trust-strip">
        <div className="container trust-inner">
          <span className="trust-label">Trusted by leading automotive OEMs &amp; Tier-1 suppliers</span>
          <div className="marquee" aria-label="Customers and industries">
            <div className="marquee-track">
              {[0, 1].map((k) => (
                <div key={k} className="marquee-set" aria-hidden={k === 1}>
                  {[...customers, "Two-Wheelers", "Passenger Vehicles", "Automotive Lighting", "Commercial Vehicles", "EV Platforms"].map((n) => (
                    <span key={n} className="wordmark">{n}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container split">
          <div className="about-visual">
            <Img src={images.production} alt="Wire harness design drawing" className="about-img-main" />
            <Img src={images.lab} alt="Quality inspection in the internal lab" className="about-img-sub" />
            <div className="years-badge">
              <strong>25<span>+</span></strong>
              <small>Years of<br />manufacturing</small>
            </div>
          </div>
          <div className="split-copy">
            <Kicker>About DAEPL</Kicker>
            <h2>Built on a simple promise — <span className="accent">Trust On Quality.</span></h2>
            <p className="lead">
              Since {company.since}, Deep Auto Electricals has grown from a single unit in Samaypur into a multi-plant
              manufacturer supplying wire harnesses and precision components to the automotive industry.
            </p>
            <ul className="check-list">
              <li><Check />Drawing-to-part manufacturing under one roof</li>
              <li><Check />In-house tool room for terminals, press tools and moulds</li>
              <li><Check />Internal lab for incoming, in-process and final checks</li>
              <li><Check />Plants in Delhi with Unit-2 coming up in Kharkhoda, Haryana</li>
            </ul>
            <div className="btn-row">
              <Link href="/about" className="btn btn-dark">Our story <ArrowIcon /></Link>
              <Link href="/infrastructure" className="btn btn-outline">Infrastructure</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section section-tint">
        <div className="container">
          <SectionHead
            kicker="What we manufacture"
            title={<>Six product lines. <span className="accent">One accountable supplier.</span></>}
            text="From harness assembly to the terminals, sleeves, brackets and housings that go into it — consolidated with one IATF-certified partner."
            action={<Link href="/products" className="btn btn-outline">All products <ArrowIcon /></Link>}
          />
          <div className="cat-grid">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>

      {/* Capability — dark */}
      <section className="section section-dark">
        <div className="container">
          <SectionHead
            light
            kicker="Manufacturing capability"
            title={<>Engineered in-house, <span className="text-gradient">from tool to test.</span></>}
            text="Controlling every step — tooling, crimping, moulding, assembly and testing — is how we hold quality and delivery on every batch."
          />
          <div className="process">
            {[
              ["01", "Tool room", "Press tools, terminal dies and injection moulds designed and maintained in-house."],
              ["02", "Cutting & crimping", "44 automatic and semi-automatic crimping machines with crimp-height monitoring."],
              ["03", "Moulding & pressing", "Injection moulding from 35 to 180 ton plus power presses for sheet metal."],
              ["04", "Assembly & testing", "Harness boards, electrical testing and final inspection before dispatch."],
            ].map(([n, t, d]) => (
              <div key={n} className="process-step">
                <span className="process-num">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="dark-gallery">
            <Img src={images.factory} alt="Production floor" className="dg-1" />
            <Img src={images.engineering} alt="Tool room" className="dg-2" />
            <Img src={images.assembly} alt="Assembly work" className="dg-3" />
            <Link href="/infrastructure" className="dg-link">
              <span>Inside our plants</span>
              <strong>Machines, tool room &amp; lab</strong>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section">
        <div className="container split split-reverse">
          <div className="split-copy">
            <Kicker>Quality &amp; certifications</Kicker>
            <h2>Certified systems. <span className="accent">Zero-defect mindset.</span></h2>
            <p className="lead">
              Our processes are certified to IATF 16949 — the global automotive quality standard — and ISO 9001,
              backed by an internal lab and documented controls at every stage.
            </p>
            <div className="cert-row">
              {certificates.map((c) => (
                <div key={c.code} className="cert-mini">
                  <span className="cert-seal">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </span>
                  <div><strong>{c.code}</strong><small>{c.title}</small></div>
                </div>
              ))}
            </div>
            <Link href="/quality" className="btn btn-dark">View certificates <ArrowIcon /></Link>
          </div>
          <div className="quality-visual">
            <Img src={images.lab} alt="Quality testing equipment" className="quality-img" />
            <div className="quality-float">
              <span className="kicker">Certified</span>
              <strong>IATF</strong>
              <small>16949 automotive quality system</small>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section section-tint">
        <div className="container">
          <SectionHead
            kicker="Plant locations"
            title={<>Close to North India&apos;s <span className="accent">automotive hubs.</span></>}
            action={<Link href="/locations" className="btn btn-outline">View on map <ArrowIcon /></Link>}
          />
          <div className="plant-strip">
            {plants.map((p, i) => (
              <Link href="/locations" key={p.city} className="plant-tile">
                <span className="plant-no">0{i + 1}</span>
                <div>
                  <span className={`status${p.status === "Operational" ? "" : " status-soon"}`}>{p.status}</span>
                  <h3>{p.city}</h3>
                  <p>{p.label} · {p.state}</p>
                </div>
                <PinIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Careers + RFQ duo */}
      <section className="section">
        <div className="container duo">
          <div className="duo-card duo-careers" style={{ backgroundImage: `linear-gradient(180deg,rgba(7,20,38,.25),rgba(7,20,38,.92)),url("${images.factory}")` }}>
            <Kicker light>Careers</Kicker>
            <h3>Build your career with a growing manufacturer.</h3>
            <p>Openings across production, quality, tool room and engineering.</p>
            <Link href="/careers" className="btn btn-light">See open roles <ArrowIcon /></Link>
          </div>
          <div className="duo-card duo-rfq">
            <Kicker light>Request for Quote</Kicker>
            <h3>Send your drawing. Get a feasibility review and quote.</h3>
            <p>Upload PDF, DWG, DXF or images — our sales engineering team responds with a reference number.</p>
            <Link href="/rfq" className="btn btn-light">Start an RFQ <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= Products ================= */

export function ProductOverview() {
  return (
    <>
      <PageHero
        kicker="Products"
        title={<>Automotive components, <span className="text-gradient">built to your drawing.</span></>}
        lead="Wire harnesses, cables, terminals, PVC sleeves, sheet metal and plastic moulded parts — manufactured under IATF 16949."
        image={images.wiring}
        crumbs={[{ label: "Products" }]}
      />
      <section className="section">
        <div className="container">
          <div className="cat-grid">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
          <CtaBanner title="Don't see your part?" text="Most of our work is built to customer drawings. Share yours and we'll confirm feasibility." />
        </div>
      </section>
    </>
  );
}

export function ProductCategoryPage({ slug }: { slug: string }) {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return <NotFoundPage />;
  const priced = category.products.some((p) => p.showPrice);
  return (
    <>
      <PageHero
        kicker={`Category ${category.number}`}
        title={category.name}
        lead={category.summary}
        image={category.image}
        crumbs={[{ href: "/products", label: "Products" }, { label: category.name }]}
      />
      <section className="section">
        <div className="container">
          <div className="cat-layout">
            <aside className="cat-sidebar">
              <span className="sidebar-label">All categories</span>
              {categories.map((c) => (
                <Link key={c.slug} href={`/products/${c.slug}`} className={c.slug === slug ? "is-active" : undefined}>
                  <span>{c.number}</span>{c.name}
                </Link>
              ))}
            </aside>
            <div>
              <div className="cat-toolbar">
                <span>{category.products.length} products</span>
                {priced && <span className="gst-note">Prices exclude GST · last updated by DAEPL sales</span>}
              </div>
              <div className="product-grid">
                {category.products.map((p) => (
                  <Link key={p.slug} href={`/products/${category.slug}/${p.slug}`} className="product-card">
                    <div className="product-img" style={{ backgroundImage: `url("${category.image}")` }} />
                    <div className="product-body">
                      <h3>{p.name}</h3>
                      <p>{p.application}</p>
                      <div className="product-foot">
                        <PriceTag product={p} />
                        <span className="icon-btn"><ArrowIcon /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <CtaBanner title={`Need a custom ${category.name.toLowerCase().replace(/s$/, "")}?`} text="Send your drawing and volumes — we'll respond with feasibility and pricing." href={`/rfq?product=${category.slug}`} />
        </div>
      </section>
    </>
  );
}

export function ProductDetailPage({ categorySlug, productSlug }: { categorySlug: string; productSlug: string }) {
  const category = categories.find((c) => c.slug === categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  if (!category || !product) return <NotFoundPage />;
  const gallery = [category.image, images.lab, images.production, images.assembly];
  return (
    <>
      <section className="pd-top">
        <div className="container">
          <nav className="breadcrumbs breadcrumbs-dark" aria-label="Breadcrumb">
            <Link href="/">Home</Link><i>/</i><Link href="/products">Products</Link><i>/</i>
            <Link href={`/products/${category.slug}`}>{category.name}</Link><i>/</i><span aria-current="page">{product.name}</span>
          </nav>
          <div className="pd-grid">
            <div className="pd-gallery">
              <Img src={gallery[0]} alt={product.name} className="pd-main" />
              <div className="pd-thumbs">
                {gallery.map((g, i) => <Img key={i} src={g} alt={`${product.name} view ${i + 1}`} className={`pd-thumb${i === 0 ? " is-active" : ""}`} />)}
              </div>
            </div>
            <div className="pd-info">
              <span className="tag">{category.name}</span>
              <h1>{product.name}</h1>
              <p className="lead">{product.description}</p>
              <div className="pd-price-box">
                <PriceTag product={product} />
                {product.moq && <span className="moq">MOQ: {product.moq}</span>}
              </div>
              <dl className="pd-facts">
                <div><dt>Application</dt><dd>{product.application}</dd></div>
                <div><dt>Quality</dt><dd>IATF 16949 · ISO 9001</dd></div>
              </dl>
              <div className="btn-row">
                <Link href={`/rfq?product=${encodeURIComponent(product.name)}`} className="btn btn-primary btn-lg">Request a Quote <ArrowIcon /></Link>
                <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg"><WhatsAppIcon /> Enquire on WhatsApp</a>
              </div>
              <p className="pd-datasheet">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><path d="M7 3h7l5 5v13H7z M14 3v5h5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                Datasheet available on request
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <div className="spec-wrap">
            <h2>Specifications</h2>
            <table className="spec-table">
              <tbody>
                {product.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
                <tr><th scope="row">Customisation</th><td>Built to customer drawing and approved samples</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHead kicker="Explore more" title="Related product lines" />
          <div className="cat-grid cat-grid-3">
            {categories.filter((c) => c.slug !== categorySlug).slice(0, 3).map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= Company ================= */

export function AboutPage() {
  const milestones = [
    ["1998", "Founded in Samaypur, Delhi", "Deep Auto Electricals begins manufacturing automotive electrical components."],
    ["Growth", "Wire harness & terminals", "Capabilities expand into harness assembly and in-house terminal stamping."],
    ["Certified", "IATF 16949 & ISO 9001", "Quality management systems certified to global automotive standards."],
    ["Expansion", "Bawana plant", "Additional manufacturing capacity in Bawana Industrial Area, Delhi."],
    ["Next", "Unit-2, Kharkhoda", "New plant in Kharkhoda, Haryana — close to the region's automotive cluster."],
  ];
  return (
    <>
      <PageHero
        kicker="About us"
        title={<>Over 25 years of <span className="text-gradient">trusted manufacturing.</span></>}
        lead="An automotive component manufacturer that has grown with India's automotive industry since 1998."
        image={images.production}
        crumbs={[{ label: "About Us" }]}
      />
      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <Kicker>Our story</Kicker>
            <h2>Growing with the industry we <span className="accent">serve.</span></h2>
            <p className="lead">Deep Auto Electricals Pvt. Ltd. (DAEPL) has been part of the automotive supply chain since 1998, making the components that connect, protect and power vehicles.</p>
            <p>What started as a focused electrical-components unit has grown into a multi-plant operation covering wire harnesses, cables, terminals, PVC sleeves, sheet metal and plastic moulded parts. Our customers include leading OEMs and Tier-1 lighting and component makers.</p>
            <p>Our approach hasn&apos;t changed: understand the requirement, control the process and deliver consistently. That is what <strong>Trust On Quality</strong> means to us.</p>
          </div>
          <div className="about-visual">
            <Img src={images.factory} alt="DAEPL manufacturing facility" className="about-img-main" />
            <Img src={images.engineering} alt="Engineering team" className="about-img-sub" />
            <div className="years-badge"><strong>1998</strong><small>Established<br />in Delhi</small></div>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="vm-grid">
            <div className="vm-card vm-dark">
              <Kicker light>Vision</Kicker>
              <h3>To be the most trusted partner for automotive wiring and precision components in India.</h3>
            </div>
            <div className="vm-card">
              <Kicker>Mission</Kicker>
              <h3>Deliver defect-free products on time through skilled people, in-house engineering and continual improvement.</h3>
            </div>
            <div className="vm-card">
              <Kicker>Quality policy</Kicker>
              <h3>Meet customer and statutory requirements every time, and continually improve our quality management system.</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Milestones" title={<>The road <span className="accent">so far.</span></>} text="Key milestones — exact dates to be confirmed by DAEPL." />
          <ol className="timeline">
            {milestones.map(([y, t, d]) => (
              <li key={t}>
                <span className="tl-year">{y}</span>
                <span className="tl-dot" />
                <div><h3>{t}</h3><p>{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHead kicker="Leadership" title="The people behind DAEPL" text="Leadership profiles will be added once photos and titles are shared." />
          <div className="leader-grid">
            {["Managing Director", "Director — Operations", "Head — Quality"].map((role) => (
              <div key={role} className="leader-card">
                <div className="leader-photo"><span>DA</span></div>
                <h3>Name to be confirmed</h3>
                <p>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function InfrastructurePage() {
  const machines = [
    { process: "Wire processing", items: [["Automatic cut-strip-crimp machines", "Included in 44"], ["Semi-automatic crimping presses", "Included in 44"], ["Crimp-height & pull-force testers", "In-line"]] },
    { process: "Injection moulding", items: [["Injection moulding machines", "35 – 180 ton"], ["Mould maintenance", "In-house"]] },
    { process: "Press shop & tool room", items: [["Power presses", "Sheet metal & terminals"], ["Tool room — CNC / EDM / grinding", "In-house"], ["Terminal & press-tool design", "In-house"]] },
    { process: "Assembly & testing", items: [["Harness assembly boards", "Product-specific"], ["Continuity / circuit testers", "Electrical testing"], ["Internal lab", "Incoming & final QC"]] },
  ];
  return (
    <>
      <PageHero kicker="Infrastructure" title={<>Capability you can <span className="text-gradient">audit.</span></>} lead="Tool room, crimping, moulding, press shop and testing — under one roof across our Delhi plants." image={images.factory} crumbs={[{ label: "Infrastructure" }]} />
      <section className="stats-band stats-band-flat">
        <div className="container stats-grid">
          {[["44", "Crimping machines"], ["35–180T", "Moulding range"], ["01", "In-house tool room"], ["01", "Internal test lab"]].map(([v, l]) => (
            <div key={l} className="stat"><strong>{v}</strong><span>{l}</span></div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead kicker="Machine list" title={<>Equipment by <span className="accent">process.</span></>} text="Detailed machine counts and makes will be updated from DAEPL's plant records." />
          <div className="machine-grid">
            {machines.map((m) => (
              <div key={m.process} className="machine-card">
                <h3>{m.process}</h3>
                <table>
                  <tbody>{m.items.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHead kicker="Inside the plant" title="Shop floor, tool room & storage" />
          <div className="gallery">
            <Img src={images.factory} alt="Shop floor" className="g-a" />
            <Img src={images.engineering} alt="Tool room" className="g-b" />
            <Img src={images.assembly} alt="Assembly area" className="g-c" />
            <Img src={images.lab} alt="Testing lab" className="g-d" />
            <Img src={images.production} alt="Production line" className="g-e" />
          </div>
        </div>
      </section>
    </>
  );
}

export function QualityPage() {
  return (
    <>
      <PageHero kicker="Quality & certifications" title={<>Quality is built in, <span className="text-gradient">not inspected in.</span></>} lead="Certified quality systems, an internal lab and controls at every stage of manufacturing." image={images.lab} crumbs={[{ label: "Quality & Certifications" }]} />
      <section className="section">
        <div className="container">
          <SectionHead kicker="Certificates" title={<>Certified to global <span className="accent">automotive standards.</span></>} text="Certificate copies can be viewed or downloaded below once uploaded through the admin panel." />
          <div className="cert-grid">
            {certificates.map((c) => (
              <article key={c.code} className="cert-card">
                <div className="cert-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </div>
                <h3>{c.code}</h3>
                <p>{c.title}</p>
                <dl>
                  <div><dt>Issued by</dt><dd>{c.body}</dd></div>
                  <div><dt>Valid until</dt><dd>{c.validity}</dd></div>
                </dl>
                <div className="btn-row">
                  <Link href="/contact" className="btn btn-outline btn-sm">Request copy</Link>
                </div>
              </article>
            ))}
            <article className="cert-card cert-card-dark">
              <Kicker light>Supplier audits</Kicker>
              <h3>Planning a supplier audit or PPAP?</h3>
              <p>Our quality team supports customer audits, PPAP documentation and process reviews.</p>
              <Link href="/contact" className="btn btn-light btn-sm">Contact quality team <ArrowIcon /></Link>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHead light kicker="Quality approach" title={<>Controls at <span className="text-gradient">every stage.</span></>} />
          <div className="process">
            {[
              ["01", "Incoming inspection", "Raw material, cable and component checks against specification."],
              ["02", "In-process control", "Crimp-height monitoring, first-piece approval and patrol inspection."],
              ["03", "Electrical testing", "Continuity and circuit testing of harness assemblies."],
              ["04", "Final audit & CAPA", "Final inspection, traceability and corrective action on any deviation."],
            ].map(([n, t, d]) => (
              <div key={n} className="process-step"><span className="process-num">{n}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Img src={images.lab} alt="Internal laboratory" className="split-img" />
          <div className="split-copy">
            <Kicker>Internal lab</Kicker>
            <h2>Testing that <span className="accent">backs every batch.</span></h2>
            <ul className="check-list">
              <li><Check />Crimp cross-section and pull-force testing</li>
              <li><Check />Continuity, insulation and circuit testing</li>
              <li><Check />Dimensional inspection of terminals and moulded parts</li>
              <li><Check />Material and incoming quality verification</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export function CustomersPage() {
  const industries = ["Two-wheelers", "Passenger vehicles", "Automotive lighting", "Instrument clusters", "Commercial vehicles", "EV platforms"];
  return (
    <>
      <PageHero kicker="Our customers" title={<>Trusted by the names <span className="text-gradient">that move India.</span></>} lead="Long-standing relationships with OEMs and Tier-1 suppliers across the automotive industry." image={images.vehicles} crumbs={[{ label: "Our Customers" }]} />
      <section className="section">
        <div className="container">
          <SectionHead kicker="Customers & OEMs" title="Who we supply" center text="Customer logos are displayed with permission and managed through the admin panel." />
          <div className="logo-grid">
            {customers.map((c) => <div key={c} className="logo-tile"><span className="wordmark wordmark-lg">{c}</span></div>)}
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="logo-tile logo-tile-empty"><span>Logo slot</span></div>)}
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHead kicker="Industries served" title="Where our parts go" />
          <div className="industry-grid">
            {industries.map((n, i) => <div key={n} className="industry"><span>0{i + 1}</span>{n}</div>)}
          </div>
          <CtaBanner title="Become our next long-term partner." text="Register DAEPL as a vendor or send us an RFQ — our team will get back to you promptly." />
        </div>
      </section>
    </>
  );
}

export function LocationsPage() {
  const states = [...new Set(plants.map((p) => p.state))];
  return (
    <>
      <PageHero kicker="Plant locations" title={<>Three plants. <span className="text-gradient">Two states.</span></>} lead="Strategically located in Delhi and Haryana — close to North India's automotive manufacturing clusters." image={images.factory} crumbs={[{ label: "Plant Locations" }]} />
      <section className="section">
        <div className="container">
          {states.map((state) => (
            <div key={state} className="state-group">
              <h2 className="state-title"><span>{state}</span><i /></h2>
              <div className="plant-grid">
                {plants.filter((p) => p.state === state).map((p) => (
                  <article key={p.city} className="plant-card">
                    <div className="plant-map">
                      <iframe title={`Map of ${p.city}`} src={`https://maps.google.com/maps?q=${encodeURIComponent(p.query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                    <div className="plant-body">
                      <span className={`status${p.status === "Operational" ? "" : " status-soon"}`}>{p.status}</span>
                      <h3>{p.city}</h3>
                      <p className="plant-label">{p.label}</p>
                      <p className="plant-addr"><PinIcon />{p.address}</p>
                      <p className="plant-addr"><PhoneIcon /><a href={company.phoneHref}>{company.phoneDisplay}</a></p>
                      <a className="btn btn-outline btn-sm" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.query)}`} target="_blank" rel="noreferrer">Get directions <ArrowIcon diagonal /></a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function LifePage() {
  return (
    <>
      <PageHero kicker="CSR & Life at DAEPL" title={<>People are our <span className="text-gradient">strongest connection.</span></>} lead="Women empowerment, skill development and community responsibility — the culture behind our quality." image={images.factory} crumbs={[{ label: "CSR & Life at DAEPL" }]} />
      <section className="section">
        <div className="container">
          <div className="pillar-grid">
            {[
              ["Women empowerment", "Creating opportunities for women in precision assembly, inspection and quality roles."],
              ["Skill development", "On-the-job training for ITI and diploma candidates, building careers in automotive manufacturing."],
              ["Community & safety", "Safe workplaces, health initiatives and support for the communities around our plants."],
            ].map(([t, d], i) => (
              <div key={t} className="pillar">
                <span className="pillar-num">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <p className="placeholder-note">Write-up and figures to be confirmed by DAEPL.</p>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHead kicker="Life at DAEPL" title="Moments from our plants" />
          <div className="gallery">
            <Img src={images.factory} alt="Team on the shop floor" className="g-a" />
            <Img src={images.assembly} alt="Assembly team" className="g-b" />
            <Img src={images.engineering} alt="Engineering team" className="g-c" />
            <Img src={images.lab} alt="Quality team" className="g-d" />
            <Img src={images.production} alt="Production team" className="g-e" />
          </div>
          <CtaBanner title="Want to be part of the team?" text="See current openings across our plants." href="/careers" label="View careers" />
        </div>
      </section>
    </>
  );
}

/* ================= Careers ================= */

export function CareersPage() {
  return (
    <>
      <PageHero kicker="Careers" title={<>Build what moves <span className="text-gradient">India forward.</span></>} lead="Join a 25-year-old manufacturer that invests in skills, safety and growth." image={images.factory} crumbs={[{ label: "Careers" }]} />
      <section className="section section-tight">
        <div className="container">
          <div className="why-grid">
            {[
              ["Learn on real machines", "Hands-on training on crimping, moulding and tool-room equipment."],
              ["Grow with us", "We promote from within as new lines and plants come up."],
              ["Safe & inclusive", "Safe workplaces and equal opportunity for women on the shop floor."],
              ["Stable employer", "Serving the automotive industry continuously since 1998."],
            ].map(([t, d]) => <div key={t} className="why"><Check /><div><h3>{t}</h3><p>{d}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHead kicker="Open positions" title={<>Current <span className="accent">openings.</span></>} action={<Link href="/careers/apply" className="btn btn-outline">Send general CV <ArrowIcon /></Link>} />
          <CareersBoard />
        </div>
      </section>
    </>
  );
}

export function JobDetailPage({ slug }: { slug: string }) {
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return <NotFoundPage />;
  const url = `https://deepautoelectricals.com/careers/${job.slug}`;
  return (
    <>
      <PageHero kicker={`${job.department} · ${job.plant}`} title={job.title} lead={job.description} crumbs={[{ href: "/careers", label: "Careers" }, { label: job.title }]} />
      <section className="section">
        <div className="container form-layout">
          <aside className="job-detail">
            <dl className="job-facts">
              <div><dt>Department</dt><dd>{job.department}</dd></div>
              <div><dt>Plant</dt><dd>{job.plant}</dd></div>
              <div><dt>Experience</dt><dd>{job.experience}</dd></div>
              <div><dt>Qualification</dt><dd>{job.qualification}</dd></div>
              <div><dt>Openings</dt><dd>{job.openings}</dd></div>
              <div><dt>Last date</dt><dd>{new Date(job.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</dd></div>
            </dl>
            <div className="share">
              <span>Share this job</span>
              <a className="btn btn-whatsapp btn-sm" href={`https://wa.me/?text=${encodeURIComponent(`${job.title} at DAEPL — ${url}`)}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>
              <a className="btn btn-outline btn-sm" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </aside>
          <EnquiryForm kind="apply" job={job.title} />
        </div>
      </section>
    </>
  );
}

export function ApplicationPage() {
  return (
    <>
      <PageHero kicker="General application" title="Send us your CV" lead="No suitable opening right now? Share your details and we'll contact you when a matching role opens." crumbs={[{ href: "/careers", label: "Careers" }, { label: "Apply" }]} />
      <section className="section">
        <div className="container form-layout">
          <div className="side-info">
            <Kicker>Shop-floor roles</Kicker>
            <h2>Operators, ITI &amp; diploma candidates</h2>
            <p>You can also send your name, qualification and preferred plant on WhatsApp — our HR team will call you back.</p>
            <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><WhatsAppIcon /> Apply on WhatsApp</a>
          </div>
          <EnquiryForm kind="apply" />
        </div>
      </section>
    </>
  );
}

/* ================= Contact & RFQ ================= */

function ContactCards() {
  return (
    <div className="contact-cards">
      <a href={company.phoneHref} className="contact-card"><span className="cc-icon"><PhoneIcon /></span><div><small>Call us</small><strong>{company.phoneDisplay}</strong><span>{company.hours}</span></div></a>
      <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="contact-card"><span className="cc-icon cc-wa"><WhatsAppIcon /></span><div><small>WhatsApp</small><strong>Chat with sales</strong><span>Quick replies, 24×7 assistant</span></div></a>
      <a href={`mailto:${company.salesEmail}`} className="contact-card"><span className="cc-icon"><MailIcon /></span><div><small>Email</small><strong>{company.salesEmail}</strong><span>RFQs &amp; enquiries</span></div></a>
    </div>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact us" title={<>Let&apos;s talk about <span className="text-gradient">your requirement.</span></>} lead="Reach our sales, quality or HR team — by phone, WhatsApp, email or the form below." crumbs={[{ label: "Contact" }]} />
      <section className="section section-tight">
        <div className="container"><ContactCards /></div>
      </section>
      <section className="section section-tint">
        <div className="container form-layout">
          <div className="side-info">
            <Kicker>Our plants</Kicker>
            <h2>Visit us</h2>
            {plants.map((p) => (
              <div key={p.city} className="addr">
                <PinIcon />
                <div><strong>{p.city}, {p.state}</strong><span>{p.address}</span></div>
              </div>
            ))}
            <div className="contact-map">
              <iframe title="Map of DAEPL Samaypur" src={`https://maps.google.com/maps?q=${encodeURIComponent(plants[0].query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}

export function RfqPage({ product = "" }: { product?: string }) {
  const prefilled = product
    ? (categories.flatMap((c) => c.products).find((p) => p.slug === product)?.name ??
      categories.find((c) => c.slug === product)?.name ??
      product.replace(/-/g, " "))
    : "";
  return (
    <>
      <PageHero kicker="Request a Quote" title={<>Get a quote for <span className="text-gradient">your part.</span></>} lead="Share part details, quantities and drawings. Every RFQ receives a reference number and a response from our sales engineering team." crumbs={[{ label: "Request a Quote" }]} />
      <section className="section">
        <div className="container form-layout">
          <div className="side-info">
            <Kicker>How it works</Kicker>
            <h2>From drawing to quote</h2>
            <ol className="steps">
              <li><span>1</span><div><strong>Submit your RFQ</strong><p>Part details, volumes and up to 5 drawings.</p></div></li>
              <li><span>2</span><div><strong>Engineering review</strong><p>We check feasibility, tooling and material.</p></div></li>
              <li><span>3</span><div><strong>Receive your quote</strong><p>Our sales team responds with pricing and lead time.</p></div></li>
            </ol>
            <div className="side-note">
              <WhatsAppIcon />
              <p>Prefer WhatsApp? <a href={company.whatsappHref} target="_blank" rel="noreferrer">Send your drawing on WhatsApp</a> and we&apos;ll log the RFQ for you.</p>
            </div>
          </div>
          <EnquiryForm key={product} kind="rfq" product={prefilled} />
        </div>
      </section>
    </>
  );
}

/* ================= Legal, thanks, 404, admin ================= */

export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return (
    <>
      <PageHero kicker={privacy ? "Privacy Policy" : "Terms of Use"} title={privacy ? "Privacy Policy" : "Terms of Use"} lead={privacy ? "How we collect and use information shared through this website, WhatsApp and forms — in line with the DPDP Act 2023." : "Terms that apply when you use this website."} crumbs={[{ label: privacy ? "Privacy Policy" : "Terms of Use" }]} />
      <section className="section">
        <article className="container prose">
          <p className="prose-note">Draft copy — final wording to be reviewed and approved by DAEPL&apos;s legal counsel before publication.</p>
          {privacy ? (
            <>
              <h2>Information you share</h2>
              <p>When you use our contact, RFQ or careers forms, or message us on WhatsApp, you may share your name, company, email, phone number, drawings, project details or CV. Please do not share information restricted by a customer NDA unless you are authorised to do so.</p>
              <h2>How we use it</h2>
              <p>We use this information only to respond to your enquiry, prepare a quotation, or assess your job application. Drawings and CVs are used only for the purpose they were shared for.</p>
              <h2>WhatsApp conversations</h2>
              <p>Messages sent to our WhatsApp Business number may be answered by an automated assistant and stored so our team can follow up. WhatsApp&apos;s own privacy terms also apply.</p>
              <h2>Storage, retention &amp; security</h2>
              <p>Data is stored on servers in India, protected by encryption in transit and access controls, and kept only as long as needed for its purpose or as required by law.</p>
              <h2>Your rights</h2>
              <p>Under the Digital Personal Data Protection Act, 2023 you may ask to access, correct or erase your personal data. Use our <Link href="/contact">contact form</Link> to make a request.</p>
            </>
          ) : (
            <>
              <h2>Use of this website</h2>
              <p>Content on this website is for general business information. Product availability, specifications, prices and lead times are confirmed only in a written quotation from Deep Auto Electricals Pvt. Ltd.</p>
              <h2>Prices</h2>
              <p>Where prices are shown, they exclude GST and may change without notice. The price on a written quotation or purchase order prevails.</p>
              <h2>Intellectual property</h2>
              <p>Website text, images and design belong to Deep Auto Electricals or their respective owners. Customer names and logos are shown with permission for identification only.</p>
              <h2>Third-party services</h2>
              <p>Maps, WhatsApp and other embedded services are provided by third parties whose terms apply.</p>
            </>
          )}
        </article>
      </section>
    </>
  );
}

export function ThankYouPage() {
  return (
    <section className="center-page">
      <div className="container center-inner">
        <span className="success-icon success-icon-lg">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <Kicker>Submission received</Kicker>
        <h1>Thank you for contacting DAEPL.</h1>
        <p>Our team will review your message and get back to you shortly. For anything urgent, call or WhatsApp us.</p>
        <div className="btn-row btn-row-center">
          <Link href="/" className="btn btn-dark">Back to home</Link>
          <Link href="/products" className="btn btn-outline">Explore products</Link>
        </div>
      </div>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className="center-page">
      <div className="container center-inner">
        <span className="big-404">404</span>
        <h1>This page has taken a different route.</h1>
        <p>The page you&apos;re looking for may have moved or no longer exists. Try one of these instead:</p>
        <div className="btn-row btn-row-center">
          <Link href="/" className="btn btn-dark">Home</Link>
          <Link href="/products" className="btn btn-outline">Products</Link>
          <Link href="/rfq" className="btn btn-primary">Request a Quote <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  );
}

export function AdminPreview() {
  const modules = [
    ["Products & categories", "Add, edit, hide, reorder · up to 8 photos"],
    ["Price list", "Terminal prices · show/hide per product"],
    ["Certificates", "IATF 16949 · ISO 9001 · validity dates"],
    ["Customer logos", "Add, replace, reorder"],
    ["Home banners", "Images and headline text"],
    ["Careers & applications", "Vacancies · CVs · status · Excel export"],
    ["Enquiries & RFQs", "New / Quoted / Won / Lost · Excel export"],
    ["WhatsApp chats", "AI agent conversations & FAQs"],
    ["Users & roles", "Up to 5 logins · HR / Sales / MD"],
  ];
  return (
    <>
      <PageHero kicker="Admin · preview" title="Content management" lead="A visual preview of the admin modules described in the proposal." crumbs={[{ label: "Admin preview" }]} />
      <section className="section">
        <div className="container">
          <div className="notice"><strong>Visual preview only.</strong> Not connected to a database or protected by login. Do not enter real data.</div>
          <div className="admin-grid">
            {modules.map(([t, d], i) => (
              <div key={t} className="admin-card"><span>{String(i + 1).padStart(2, "0")}</span><div><strong>{t}</strong><small>{d}</small></div><ArrowIcon /></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
