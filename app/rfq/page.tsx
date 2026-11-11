import { Metadata } from "next";
import { RfqPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell Deep Auto Electricals about an automotive part, drawing or manufacturing requirement.",
};

export default async function RequestQuote({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product = "" } = await searchParams;
  return <RfqPage product={product} />;
}
