/**
 * Central content + contact configuration.
 *
 * TODO(before launch): every value marked PLACEHOLDER must be replaced with
 * details confirmed by DAEPL (phone, WhatsApp, emails, addresses, prices, jobs).
 * In production this data will come from the admin panel.
 */

export const company = {
  name: "Deep Auto Electricals Pvt. Ltd.",
  shortName: "DAEPL",
  tagline: "Trust On Quality",
  since: 1998,
  // PLACEHOLDER — replace with the confirmed numbers.
  phoneDisplay: "+91 XXXXX XXXXX",
  phoneHref: "tel:+910000000000",
  whatsappHref: "https://wa.me/910000000000?text=Hello%20DAEPL%2C%20I%20have%20an%20enquiry.",
  email: "info@deepautoelectricals.com",
  salesEmail: "sales@deepautoelectricals.com",
  hrEmail: "hr@deepautoelectricals.com",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM",
};

export const images = {
  hero1: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=80",
  hero2: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2200&q=80",
  hero3: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=2200&q=80",
  hero4: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=2200&q=80",
  harness: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
  factory: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1600&q=80",
  production: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80",
  engineering: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
  component: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80",
  assembly: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  lab: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=1200&q=80",
  wiring: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80",
  metal: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
  vehicles: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1600&q=80",
};

export type Product = {
  name: string;
  slug: string;
  description: string;
  application: string;
  specs: [string, string][];
  /** Shown only when showPrice is true (terminals). Null = not yet published. */
  price?: number | null;
  priceUnit?: string;
  moq?: string;
  showPrice?: boolean;
};

export type Category = {
  name: string;
  slug: string;
  number: string;
  short: string;
  summary: string;
  image: string;
  products: Product[];
};

const harnessSpecs: [string, string][] = [
  ["Wire standard", "JASO / ISO 6722 automotive cable"],
  ["Conductor", "Annealed copper, 0.35 – 6.0 mm²"],
  ["Process", "Automatic cut-strip-crimp, continuity tested"],
  ["Protection", "PVC sleeve, corrugated tube or tape wrap"],
];

export const categories: Category[] = [
  {
    name: "Wire Harnesses",
    slug: "wire-harnesses",
    number: "01",
    short: "Lighting, instrumentation & ADAS",
    summary: "Application-specific harness assemblies for lighting, instrumentation and ADAS — built to drawing and electrically tested.",
    image: images.wiring,
    products: [
      { name: "Head Lamp Harness", slug: "head-lamp-harness", description: "Harness assembly connecting the head lamp unit to the vehicle electrical system.", application: "Two-wheeler and passenger-vehicle head lamps", specs: harnessSpecs },
      { name: "Tail Lamp Harness", slug: "tail-lamp-harness", description: "Compact harness for rear combination and tail lamp assemblies.", application: "Rear lamps, stop and indicator lamps", specs: harnessSpecs },
      { name: "Meter Harness", slug: "meter-harness", description: "Harness for instrument clusters and speedometer assemblies.", application: "Instrument clusters and digital meters", specs: harnessSpecs },
      { name: "ADAS Harness", slug: "adas-harness", description: "Harness for sensor and camera modules used in driver-assistance systems.", application: "Radar, camera and sensor modules", specs: harnessSpecs },
    ],
  },
  {
    name: "Cable Manufacturing",
    slug: "cables",
    number: "02",
    short: "Automotive & custom cables",
    summary: "In-house automotive cable manufacturing and custom cable assemblies made to your length, colour and termination requirement.",
    image: images.assembly,
    products: [
      { name: "Automotive Cables", slug: "automotive-cables", description: "Low-voltage PVC insulated automotive cables in standard sizes and colours.", application: "Vehicle wiring and harness manufacturing", specs: [["Conductor", "Bare annealed copper"], ["Insulation", "PVC, heat resistant grades"], ["Sizes", "0.35 – 6.0 mm²"], ["Supply", "Coils and reels, per metre"]] },
      { name: "Custom Cable Assemblies", slug: "custom-cable-assemblies", description: "Cut, stripped and terminated cable assemblies built to drawing.", application: "OEM and Tier-1 sub-assemblies", specs: [["Process", "Cut, strip, crimp and seal"], ["Testing", "Pull-force and continuity"], ["Packing", "As per customer standard"]] },
    ],
  },
  {
    name: "Automotive Terminals",
    slug: "terminals",
    number: "03",
    short: "Precision stamped terminals",
    summary: "Precision-stamped connector and battery terminals made in our own tool room — with published prices for standard parts.",
    image: images.production,
    products: [
      { name: "Connector Terminals", slug: "connector-terminals", description: "Stamped male and female connector terminals for automotive connectors.", application: "Lighting, switch and harness connectors", specs: [["Material", "Brass / phosphor bronze"], ["Finish", "Tin plated"], ["Supply", "Loose or reeled"]], price: null, priceUnit: "per 1,000 pcs", moq: "10,000 pcs", showPrice: true },
      { name: "Battery Terminals", slug: "battery-terminals", description: "Battery terminals and lugs for secure power connections.", application: "Battery and earth connections", specs: [["Material", "Copper / brass"], ["Finish", "Tin plated"], ["Termination", "Crimp type"]], price: null, priceUnit: "per 100 pcs", moq: "1,000 pcs", showPrice: true },
    ],
  },
  {
    name: "PVC Sleeves",
    slug: "pvc-sleeves",
    number: "04",
    short: "Insulation & protection",
    summary: "Extruded PVC sleeves that insulate and protect harness branches against abrasion, heat and moisture.",
    image: images.harness,
    products: [
      { name: "Protective PVC Sleeves", slug: "protective-pvc-sleeves", description: "Flexible PVC sleeving for harness insulation and protection.", application: "Harness branches and terminals", specs: [["Material", "Flexible PVC"], ["Colours", "Black and custom"], ["Supply", "Per metre / per kg"]] },
      { name: "Custom Sleeves", slug: "custom-sleeves", description: "Sleeves in custom diameters, wall thickness and colours.", application: "Customer-specific harness designs", specs: [["Sizing", "To drawing"], ["Colours", "Custom"], ["Supply", "Cut lengths or coils"]] },
    ],
  },
  {
    name: "Sheet Metal Components",
    slug: "sheet-metal",
    number: "05",
    short: "Pressed & formed parts",
    summary: "Accurately pressed and formed sheet metal parts, supported by in-house tool design and maintenance.",
    image: images.metal,
    products: [
      { name: "Precision Sheet Metal Parts", slug: "precision-sheet-metal-parts", description: "Brackets, clips and formed parts produced on power presses.", application: "Lamp, harness and body assemblies", specs: [["Process", "Blanking, piercing, forming"], ["Tooling", "In-house tool room"], ["Finish", "As per drawing"]] },
    ],
  },
  {
    name: "Plastic Moulded Parts",
    slug: "plastic-moulding",
    number: "06",
    short: "35 – 180 ton moulding",
    summary: "Injection-moulded components on machines from 35 to 180 ton, with moulds built and maintained in-house.",
    image: images.component,
    products: [
      { name: "Custom Plastic Mouldings", slug: "custom-plastic-mouldings", description: "Injection-moulded housings, covers and connector bodies.", application: "Connectors, grommets and housings", specs: [["Machines", "35 – 180 ton"], ["Moulds", "Built in our tool room"], ["Materials", "PP, PA, ABS, PBT and more"]] },
    ],
  },
];

export const plants = [
  { state: "Delhi", city: "Samaypur", label: "Unit 1 · Head Office & Plant", address: "Samaypur Industrial Area, Delhi", query: "Samaypur Industrial Area Delhi", status: "Operational" },
  { state: "Delhi", city: "Bawana", label: "Manufacturing Plant", address: "Bawana Industrial Area, Delhi", query: "Bawana Industrial Area Delhi", status: "Operational" },
  { state: "Haryana", city: "Kharkhoda", label: "Unit 2", address: "Kharkhoda, Haryana — full address to be confirmed", query: "Kharkhoda Haryana", status: "Coming soon" },
];

export const stats = [
  { value: "1998", label: "Manufacturing since" },
  { value: "44", label: "Crimping machines" },
  { value: "35–180T", label: "Moulding range" },
  { value: "03", label: "Plants in Delhi NCR" },
];

export const certificates = [
  { code: "IATF 16949", title: "Automotive Quality Management System", body: "Issuing body to be confirmed", validity: "Validity date to be updated" },
  { code: "ISO 9001", title: "Quality Management System", body: "Issuing body to be confirmed", validity: "Validity date to be updated" },
];

export const customers = ["Maruti Suzuki", "FIEM Industries"];

export type Job = {
  slug: string;
  title: string;
  department: string;
  plant: string;
  experience: string;
  qualification: string;
  openings: number;
  lastDate: string;
  description: string;
};

/** PLACEHOLDER vacancies for design preview — replace with HR-approved openings. */
export const jobs: Job[] = [
  { slug: "crimping-machine-operator", title: "Crimping Machine Operator", department: "Production", plant: "Samaypur", experience: "1 – 3 years", qualification: "ITI / 12th", openings: 6, lastDate: "2026-12-31", description: "Operate and set automatic cut-strip-crimp machines, follow work instructions and maintain crimp quality records." },
  { slug: "quality-inspector", title: "Quality Inspector", department: "Quality", plant: "Bawana", experience: "2 – 4 years", qualification: "Diploma (Electrical / Mechanical)", openings: 2, lastDate: "2026-12-31", description: "Carry out in-process and final inspection, maintain IATF documentation and support customer audits." },
  { slug: "tool-room-engineer", title: "Tool Room Engineer", department: "Tool Room", plant: "Samaypur", experience: "3 – 6 years", qualification: "Diploma / B.Tech (Mechanical)", openings: 1, lastDate: "2026-12-31", description: "Design, build and maintain press tools and moulds; drive tool-life and changeover improvements." },
];

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/quality", label: "Quality" },
  { href: "/customers", label: "Customers" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];
