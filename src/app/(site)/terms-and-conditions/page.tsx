import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Terms & Conditions | HABB",
};

export default function Page() {
    return (
        <section>
            <div className="relative w-full pt-28 pb-20">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="md:text-5xl text-3xl font-semibold">Terms & Conditions</h1>
                        <p className="mt-4 text-lg text-dark_black/70 dark:text-white/70">A clear, fair summary of the terms that govern use of HABB services.</p>
                        <p className="mt-2 text-sm text-dark_black/50 dark:text-white/50">Last updated: January 2026</p>
                    </div>

                    <div className="mt-10 bg-white dark:bg-dark_black p-8 rounded-2xl shadow-sm">
                        <h2 className="text-2xl font-medium">Quick summary</h2>
                        <p className="mt-4 text-dark_black/70 dark:text-white/70">
                            These Terms describe how you may use our services, your rights and responsibilities,
                            and HABB's obligations. They include licensing, account management, and limitations of liability.
                        </p>

                        <div className="mt-8 grid gap-6">
                            <article>
                                <h3 className="font-semibold">1. Definitions</h3>
                                <p className="mt-2 text-dark_black/60 dark:text-white/60">Key terms used in this agreement such as "Services", "User", "Order Form" and "Documentation" are defined to ensure clarity.</p>
                            </article>

                            <article>
                                <h3 className="font-semibold">2. License & use rights</h3>
                                <p className="mt-2 text-dark_black/60 dark:text-white/60">HABB grants a limited license to use the Services as described; customers are responsible for managing their users and complying with account rules.</p>
                            </article>

                            <article>
                                <h3 className="font-semibold">3. Payment & billing</h3>
                                <p className="mt-2 text-dark_black/60 dark:text-white/60">Pricing and billing terms are defined in each Order Form. Payments are processed securely via third-party providers.</p>
                            </article>

                            <article>
                                <h3 className="font-semibold">4. Liability & warranties</h3>
                                <p className="mt-2 text-dark_black/60 dark:text-white/60">This section outlines warranty disclaimers and limits on liability to keep the agreement fair and predictable.</p>
                            </article>
                        </div>

                        <p className="mt-6 text-sm text-dark_black/60 dark:text-white/60">For the full legal text, please consult the complete Terms & Conditions or contact legal@habblanka.com for clarifications.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
