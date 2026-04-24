import { Metadata } from "next";
import Innovation from "../../components/home/innovation";
import Solutions from "../../components/home/solution";
import Brand from "../../components/home/brand";
import WatermarkLogo from "../../components/shared/watermark-logo";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";

export const metadata: Metadata = {
    title: "Premium Digital Services | HABB",
    description: "Explore our world-class digital engineering services from Web & Mobile development to AI and Cloud solutions.",
};

export default function ServicesPage() {
    return (
        <main className="pt-24 min-h-screen relative overflow-hidden">
                        <WatermarkLogo size={1000} opacity={0.02} rotate={10} className="-left-40 top-20" />
                        <div className='relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10'>
                            <div className="container relative z-10">
                                <div className="text-center max-w-4xl mx-auto">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                        <TextGenerateEffect words="Expertise, Solutions" />
                                        <TextGenerateEffect
                                            words="Services"
                                            delay={0.5}
                                            className="italic font-normal instrument-font"
                                        />
                                    </h1>
                                    <p className="max-w-3xl mx-auto text-lg text-dark_black/60 dark:text-white/60">
                                        We combine global precision with expert engineering talent to deliver high-performance software solutions that scale globally.
                                    </p>
                                </div>
                            </div>
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
