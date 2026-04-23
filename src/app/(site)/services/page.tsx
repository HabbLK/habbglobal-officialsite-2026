import { Metadata } from "next";
import Innovation from "../../components/home/innovation";
import Solutions from "../../components/home/solution";
import Brand from "../../components/home/brand";
import WatermarkLogo from "../../components/shared/watermark-logo";

export const metadata: Metadata = {
    title: "Premium Digital Services | HABB",
    description: "Explore our world-class digital engineering services from Web & Mobile development to AI and Cloud solutions.",
};

export default function ServicesPage() {
    return (
        <main className="pt-24 min-h-screen relative overflow-hidden">
            <WatermarkLogo size={1000} opacity={0.02} rotate={10} className="-left-40 top-20" />
            <div className="container py-20 text-center relative z-10">
                <h1 className="premium-gradient-text mb-6">Our Services</h1>
                <p className="max-w-3xl mx-auto text-lg text-dark_black/60 dark:text-white/60">
                    We combine Swiss precision with Sri Lankan engineering talent to deliver high-performance software solutions that scale globally.
                </p>
            </div>

            <Innovation />
            <div className="bg-blue_gradient/30 dark:bg-dark_blue_gradient/20 py-10">
                <Solutions />
            </div>

            <div className="py-20">
                <div className="container text-center mb-10">
                    <h2 className="mb-4">Trusted by Industry Leaders</h2>
                    <p className="text-dark_black/60 dark:text-white/60">Our track record speaks for itself through the partnerships we've built.</p>
                </div>
                <Brand />
            </div>
        </main>
    );
}
