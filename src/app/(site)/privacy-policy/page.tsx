import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Privacy Policy | HABB",
};

export default function Page() {
    return (
        <section>
            <div className="relative w-full pt-28 pb-20">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="md:text-5xl text-3xl font-semibold">Privacy Policy</h1>
                        <p className="mt-4 text-lg text-dark_black/70 dark:text-white/70">
                            We value your privacy. This page explains what information we collect,
                            why we collect it, and how you can control it.
                        </p>
                        <p className="mt-2 text-sm text-dark_black/50 dark:text-white/50">Last updated: January 2026</p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-dark_black p-8 rounded-2xl shadow-sm">
                            <h2 className="text-2xl font-medium">Overview</h2>
                            <p className="mt-4 text-dark_black/70 dark:text-white/70">
                                This Privacy Statement explains how Personal Information about our
                                customers and users is collected, used and disclosed by HABB and its affiliates.
                                It covers the information we collect through our websites, services and
                                communications, and the choices you have.
                            </p>

                            <div className="mt-8 space-y-6">
                                <section id="what-we-collect">
                                    <h3 className="font-semibold">What we collect</h3>
                                    <p className="mt-2 text-dark_black/60 dark:text-white/60">
                                        We collect basic identifying information (name, email, phone),
                                        usage data, and information you provide directly (support requests,
                                        profile data). We do not store full payment card details — payments
                                        are handled by secure third-party providers.
                                    </p>
                                </section>

                                <section id="how-we-use">
                                    <h3 className="font-semibold">How we use information</h3>
                                    <p className="mt-2 text-dark_black/60 dark:text-white/60">
                                        We use data to provide and improve services, personalize your experience,
                                        communicate updates, and for security and fraud prevention.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="font-semibold">Your rights</h3>
                                    <p className="mt-2 text-dark_black/60 dark:text-white/60">
                                        You may request access, correction or deletion of personal data we hold
                                        about you. Contact us using the details below to exercise these rights.
                                    </p>
                                </section>

                                <section id="cookies">
                                    <h3 className="font-semibold">Cookies & tracking</h3>
                                    <p className="mt-2 text-dark_black/60 dark:text-white/60">
                                        We use cookies and similar technologies for analytics and to enhance
                                        site functionality. You can manage cookie preferences in your browser.
                                    </p>
                                </section>
                            </div>
                        </div>

                        <aside className="bg-white dark:bg-dark_black p-6 rounded-2xl shadow-sm">
                            <h4 className="font-semibold">Contact</h4>
                            <p className="mt-2 text-dark_black/60 dark:text-white/60">
                                For privacy enquiries, email <a href="mailto:info@habblanka.com" className="underline">info@habblanka.com</a>
                            </p>
                            <div className="mt-6">
                                <h5 className="font-medium">Quick links</h5>
                                <ul className="mt-3 space-y-2 text-dark_black/60 dark:text-white/60">
                                    <li><a href="#what-we-collect" className="hover:underline">What we collect</a></li>
                                    <li><a href="#how-we-use" className="hover:underline">How we use information</a></li>
                                    <li><a href="#cookies" className="hover:underline">Cookies & tracking</a></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
};
