import { Metadata } from "next";
import CreativeMind from "../../components/home/creative-mind";
import Achievements from "../../components/home/achievements";
import Branches from "../../components/home/branches";
import Faq from "../../components/home/faq";
import WatermarkLogo from "../../components/shared/watermark-logo";

export const metadata: Metadata = {
    title: "About HABB | Bridging Vision and Reality",
    description: "Learn about HABB's mission, our creative team, and the milestones that define our excellence in digital engineering.",
};

export default function AboutPage() {
    return (
        <main className="pt-24 min-h-screen relative overflow-hidden">
            <WatermarkLogo size={1200} opacity={0.02} rotate={-10} className="-right-40 top-0" />
            <div className="container py-20 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <span className="lanka-accent-pill mb-4 px-4 py-2 uppercase">Our Story</span>
                        <h1 className="mb-6">Bridging Vision & Reality</h1>
                        <p className="text-lg mb-8 text-dark_black/70 dark:text-white/70">
                            HABB was founded on the principle that geographical boundaries should never limit technological innovation. We serve as the bridge between global ideas and technical execution.
                        </p>
                    </div>
                    <div className="flex-1 relative">
                        <div className="lanka-hero-blob w-72 h-72 bg-purple_blue right-0 top-0"></div>
                        <div className="glass-card p-10 rounded-3xl relative z-10">
                            <h3 className="text-purple_blue mb-2 italic">49+</h3>
                            <p className="font-bold">Global Projects Delivered</p>
                            <div className="lanka-premium-divider !my-6"></div>
                            <h3 className="text-orange mb-2 italic">20+</h3>
                            <p className="font-bold">Engineering Experts</p>
                        </div>
                    </div>
                </div>
            </div>

            <CreativeMind />
            <Achievements />

            <Branches />

            <Faq />
        </main>
    );
}
