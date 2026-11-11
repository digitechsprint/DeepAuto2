import { Metadata } from "next";
import { ProductOverview } from "@/components/pages";

export const metadata: Metadata = {
  title: "Automotive Products",
  description:
    "Explore wire harnesses, cables, automotive terminals, PVC sleeves, sheet metal and moulded parts.",
};

export default function Products() {
  return <ProductOverview />;
}
