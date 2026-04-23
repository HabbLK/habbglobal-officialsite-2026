
import ContactForm from "@/app/components/contact-form";
import Faq from "@/app/components/home/faq";
import { Metadata } from "next";
import WatermarkLogo from "@/app/components/shared/watermark-logo";
export const metadata: Metadata = {
    title: "Contact HABB | Sri Lanka's Digital Engineering Partner",
};

export default function Page() {
    return (
        <main className="relative overflow-hidden">
            <WatermarkLogo size={1200} opacity={0.02} rotate={-10} className="top-40 -right-20" />
            <ContactForm />
            <Faq />
        </main>
    );
};
