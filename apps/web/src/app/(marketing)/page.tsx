import { Toaster } from "sonner";
import { DashboardPreview } from "@/src/components/marketing/DashboardPreview";
import { Features } from "@/src/components/marketing/Features";
import { Footer } from "@/src/components/marketing/Footer";
import { Hero } from "@/src/components/marketing/Hero";
import { HowItWorks } from "@/src/components/marketing/HowItWorks";
import { Navbar } from "@/src/components/marketing/Navbar";
import { Waitlist } from "@/src/components/marketing/Waitlist";

export default function MarketingPage() {
  return <main className="overflow-hidden bg-[#0b1220]"><Navbar /><Hero /><Features /><HowItWorks /><DashboardPreview /><Waitlist /><Footer /><Toaster theme="dark" position="bottom-right" /></main>;
}
