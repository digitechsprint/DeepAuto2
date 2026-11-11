import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  AboutPage,
  AdminPreview,
  ApplicationPage,
  CareersPage,
  ContactPage,
  CustomersPage,
  InfrastructurePage,
  JobDetailPage,
  LegalPage,
  LifePage,
  LocationsPage,
  ProductCategoryPage,
  ProductDetailPage,
  ProductOverview,
  QualityPage,
  ThankYouPage,
} from "@/components/pages";
import { categories, jobs } from "@/lib/site-config";

const pages: Record<string, { title: string; description: string }> = {
  about: { title: "About Us", description: "Deep Auto Electricals — automotive wire harness and component manufacturer in Delhi since 1998. Our story, milestones, vision and quality policy." },
  infrastructure: { title: "Infrastructure & Machines", description: "44 crimping machines, 35–180 ton injection moulding, in-house tool room and internal lab across DAEPL's Delhi plants." },
  quality: { title: "Quality & Certifications", description: "IATF 16949 and ISO 9001 certified quality management, internal lab and stage-wise quality controls." },
  customers: { title: "Our Customers", description: "OEMs and Tier-1 suppliers served by Deep Auto Electricals, including Maruti Suzuki and FIEM Industries." },
  locations: { title: "Plant Locations", description: "DAEPL plants in Samaypur and Bawana, Delhi, and Unit-2 in Kharkhoda, Haryana — with maps and directions." },
  "life-at-daepl": { title: "CSR & Life at DAEPL", description: "Women empowerment, skill development and community responsibility at Deep Auto Electricals." },
  careers: { title: "Careers", description: "Open jobs at Deep Auto Electricals in production, quality, tool room and engineering across Delhi and Haryana." },
  contact: { title: "Contact Us", description: "Contact Deep Auto Electricals by phone, WhatsApp or email. Plant addresses in Delhi and Haryana." },
  privacy: { title: "Privacy Policy", description: "How Deep Auto Electricals uses information shared through forms, CV uploads and WhatsApp, under the DPDP Act 2023." },
  terms: { title: "Terms of Use", description: "Terms for using the Deep Auto Electricals website." },
  "thank-you": { title: "Thank You", description: "Thank you for contacting Deep Auto Electricals." },
  admin: { title: "Admin Preview", description: "Preview of the DAEPL content management modules." },
};

export function generateStaticParams() {
  return [
    ...Object.keys(pages).map((slug) => ({ slug: [slug] })),
    ...categories.flatMap((c) => [{ slug: ["products", c.slug] }, ...c.products.map((p) => ({ slug: ["products", c.slug, p.slug] }))]),
    { slug: ["careers", "apply"] },
    ...jobs.map((j) => ({ slug: ["careers", j.slug] })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const [first, second, third] = slug;
  const data = pages[slug.join("/")];
  if (data) return data;
  if (first === "products" && second) {
    const c = categories.find((x) => x.slug === second);
    const p = c?.products.find((x) => x.slug === third);
    if (p && c) return { title: `${p.name} — ${c.name}`, description: `${p.description} Manufactured by Deep Auto Electricals, IATF 16949 certified. Request a quote.` };
    if (c && !third) return { title: `${c.name} Manufacturer`, description: c.summary };
  }
  if (first === "careers" && second) {
    if (second === "apply") return { title: "Apply — Careers", description: "Send your CV to Deep Auto Electricals." };
    const j = jobs.find((x) => x.slug === second);
    if (j) return { title: `${j.title} — ${j.plant}`, description: j.description };
  }
  return {};
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const [first, second, third, ...rest] = slug;
  if (rest.length) notFound();

  if (first === "products") {
    if (!second) return <ProductOverview />;
    const c = categories.find((x) => x.slug === second);
    if (!c) notFound();
    if (!third) return <ProductCategoryPage slug={second} />;
    if (!c.products.some((p) => p.slug === third)) notFound();
    return <ProductDetailPage categorySlug={second} productSlug={third} />;
  }
  if (first === "careers" && second) {
    if (third) notFound();
    if (second === "apply") return <ApplicationPage />;
    if (!jobs.some((j) => j.slug === second)) notFound();
    return <JobDetailPage slug={second} />;
  }
  if (second) notFound();
  switch (first) {
    case "about": return <AboutPage />;
    case "infrastructure": return <InfrastructurePage />;
    case "quality": return <QualityPage />;
    case "customers": return <CustomersPage />;
    case "locations": return <LocationsPage />;
    case "life-at-daepl": return <LifePage />;
    case "careers": return <CareersPage />;
    case "contact": return <ContactPage />;
    case "privacy": return <LegalPage type="privacy" />;
    case "terms": return <LegalPage type="terms" />;
    case "thank-you": return <ThankYouPage />;
    case "admin": return <AdminPreview />;
    default: notFound();
  }
}
