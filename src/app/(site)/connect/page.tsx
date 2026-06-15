import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WatermarkLogo from "../../components/shared/watermark-logo";

export default function HabbConnectPage() {
    return (
        <main className="pt-24 pb-16 min-h-screen relative overflow-hidden">
            <WatermarkLogo size={1200} opacity={0.02} rotate={-10} className="-right-40 top-0" />
            <div className="lanka-hero-blob w-96 h-96 bg-purple_blue -left-48 top-20"></div>
            <div className="container relative z-10 py-10">

                {/* Hero Section */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <span className="lanka-accent-pill mb-6">
                        Invite-only. Built for serious teams.
                    </span>
                    <h1 className="mb-6">
                        The CRM your revenue team <span className="premium-gradient-text">will actually use.</span>
                    </h1>
                    <p className="text-xl mb-10">
                        Leads, deals, quotes, e-signatures, calls, WhatsApp, automation, and AI insights — unified in one workspace, on infrastructure you control.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="premium-button">
                            Request Access
                        </Link>
                        <Link href="/contact" className="premium-button-secondary">
                            Contact Sales
                        </Link>
                    </div>
                </div>

                {/* Feature Highlights Grid */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="lanka-accent-pill mb-4">Platform Features</span>
                        <h2 className="mb-4">Everything in One Workspace</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            A unified CRM that covers your entire revenue operation — from first touch to closed deal and beyond.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                        <div className="lanka-hero-blob w-72 h-72 bg-purple_blue/20 -left-10 top-20 mix-blend-multiply filter blur-3xl"></div>
                        {[
                            { title: 'Leads & Pipeline', desc: 'Visual Kanban boards, lead scoring, merge duplicates, and automated status workflows.' },
                            { title: 'Deals & Forecasting', desc: 'Drag-and-drop pipeline, weighted forecasting, win rate analytics, and sales velocity tracking.' },
                            { title: 'Quotes & E-Signatures', desc: 'Generate branded PDF proposals, send for digital signature, and track acceptance in real time.' },
                            { title: 'Invoices & Payments', desc: 'Auto-calculations, payment recording, aging reports, and collection rate dashboards.' },
                            { title: 'Automation Engine', desc: 'Visual workflow builder with triggers, conditions, delays, and actions — no code required.' },
                            { title: 'AI Assistant', desc: 'Draft emails, score leads, forecast revenue, and summarize deals with built-in AI.' },
                            { title: 'Calls & Telephony', desc: 'Click-to-call via Twilio, call logging, duration tracking, and outcome recording.' },
                            { title: 'WhatsApp Business', desc: 'Two-way messaging, message templates, and link conversations to deals and contacts.' },
                            { title: 'Marketing Campaigns', desc: 'Email, SMS, and WhatsApp outreach with audience segmentation and open/click analytics.' },
                            { title: 'Reports & Dashboards', desc: 'Real-time charts, conversion funnels, pipeline breakdowns, and CSV exports.' },
                            { title: 'Product Catalog', desc: 'SKUs, categories, pricing, inventory, and images — directly linked to quotes and invoices.' },
                            { title: 'Knowledge Base', desc: 'Internal documentation, categorized articles, and team-wide search.' }
                        ].map((feature, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl hover:border-purple_blue/50 transition-colors z-10 group">
                                <h4 className="text-xl text-purple_blue mb-3 group-hover:pl-2 transition-all">{feature.title}</h4>
                                <p className="text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lanka-premium-divider !my-20"></div>

                {/* Detailed Feature Sections */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="mb-4">Deep Dive: Feature Breakdown</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            Every tool your revenue team needs, built into a single platform.
                        </p>
                    </div>

                    {/* Sales & Pipeline */}
                    <div className="mb-12 glass-card p-10 md:p-12 rounded-3xl">
                        <div className="border-l-[3px] border-purple_blue pl-6 md:pl-10">
                            <h3 className="text-2xl font-bold mb-6 text-purple_blue">Sales &amp; Pipeline</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Unified lead-to-deal pipeline with 5 stages',
                                    'Drag-and-drop Kanban boards',
                                    'Lead scoring and priority assignment',
                                    'Deal probability and weighted forecasting',
                                    'Win rate and sales velocity analytics',
                                    'Revenue forecast by expected close month',
                                    'Bulk merge duplicate leads',
                                    'Contact 360° view with full activity history'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></div>
                                        <p className="text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quotes, Invoices & Products */}
                    <div className="mb-12 glass-card p-10 md:p-12 rounded-3xl">
                        <div className="border-l-[3px] border-orange pl-6 md:pl-10">
                            <h3 className="text-2xl font-bold mb-6 text-orange">Quotes, Invoices &amp; Products</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Auto-numbered quotes and invoices',
                                    'Line items from product catalog or custom',
                                    'Tax and discount calculations',
                                    'Branded PDF generation (quotes, proposals, invoices)',
                                    'Digital e-signature flow with signing links',
                                    'Payment recording (bank, card, cash, PayPal, check)',
                                    'Auto status transitions (draft → sent → paid → overdue)',
                                    'Aging reports and collection analytics',
                                    'Product catalog with SKU, pricing, inventory, and images'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple_blue mt-2 shrink-0"></div>
                                        <p className="text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Communication */}
                    <div className="mb-12 glass-card p-10 md:p-12 rounded-3xl">
                        <div className="border-l-[3px] border-purple_blue pl-6 md:pl-10">
                            <h3 className="text-2xl font-bold mb-6 text-purple_blue">Communication</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Click-to-call with Twilio integration',
                                    'Call logging with duration, direction, and outcome',
                                    'Two-way WhatsApp messaging via Business API',
                                    'WhatsApp message templates',
                                    'Email compose with HTML templates',
                                    'Sent email log with open tracking',
                                    'Marketing campaigns (Email, SMS, WhatsApp)',
                                    'Audience segmentation with custom filters'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></div>
                                        <p className="text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Automation & AI */}
                    <div className="mb-12 glass-card p-10 md:p-12 rounded-3xl">
                        <div className="border-l-[3px] border-orange pl-6 md:pl-10">
                            <h3 className="text-2xl font-bold mb-6 text-orange">Automation &amp; AI</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Visual drag-and-drop workflow builder',
                                    'Event triggers: lead created, deal won, task overdue, invoice paid, and more',
                                    'Actions: send email, create task, assign user, fire webhook, add tag',
                                    'Logic nodes: IF/ELSE conditions, delays, split branches',
                                    'AI-powered email drafting and summarization',
                                    'AI lead scoring and revenue forecasting',
                                    'Bring your own AI provider (OpenAI, Anthropic, Gemini, or self-hosted Ollama)'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple_blue mt-2 shrink-0"></div>
                                        <p className="text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Platform & Admin */}
                    <div className="mb-12 glass-card p-10 md:p-12 rounded-3xl">
                        <div className="border-l-[3px] border-purple_blue pl-6 md:pl-10">
                            <h3 className="text-2xl font-bold mb-6 text-purple_blue">Platform &amp; Admin</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Role-based access (Super Admin / User)',
                                    'Feature flags — toggle any module on or off',
                                    'Full audit log with actor, action, entity, and timestamp',
                                    'Customizable dashboard with drag-to-reorder widgets',
                                    'Multi-currency support (13 currencies)',
                                    'Localization (timezone, date format, number format, language)',
                                    'Custom branding (logos, colors, apply to CRM, PDFs, emails, portal)',
                                    'REST API with API key management',
                                    'Outbound webhooks with delivery tracking',
                                    'Swagger API documentation'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></div>
                                        <p className="text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security & Infrastructure */}
                <div className="mb-24 bg-dark_black relative text-white rounded-[3rem] p-10 md:p-16 overflow-hidden">
                    <div className="absolute w-full h-[500px] bg-gradient-to-b from-purple_blue/20 to-transparent top-0 left-0 pointer-events-none"></div>
                    <div className="text-center mb-12 relative z-10">
                        <span className="lanka-accent-pill border-white/20 text-white/90 bg-white/5 mb-4">Security &amp; Infrastructure</span>
                        <h2 className="mb-4 text-white">Enterprise-Grade Security</h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Self-hosted on your own Supabase infrastructure — you own your data.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {[
                            'Row-level security on every table',
                            'Encrypted in transit and at rest',
                            'SOC-grade access controls',
                            'Session timeout and password policy configuration',
                            'Two-factor authentication support',
                            'Edge-deployed worldwide',
                            'Real-time updates via WebSocket subscriptions',
                            'Self-hosted on your own Supabase infrastructure'
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple_blue/70 transition-all hover:bg-white/10 backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange mt-1.5 shrink-0"></div>
                                    <p className="text-sm text-white/80">{item}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-16 relative z-10">
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                '✓ Row-level secured',
                                '✓ Edge-fast worldwide',
                                '✓ Full audit logging',
                                '✓ Encrypted in transit & at rest',
                                '✓ SOC-grade controls',
                                '✓ Multi-currency',
                                '✓ You own your data'
                            ].map((badge, i) => (
                                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/80 font-medium">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-24 glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="lanka-hero-blob w-80 h-80 bg-orange/40 right-20 top-20"></div>
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="mb-4">How It Works</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            Three simple steps to transform your revenue operations.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-8 relative z-10">
                        {[
                            { step: '01', title: 'Get Invited', desc: 'Request access from your HABB Global team or admin.' },
                            { step: '02', title: 'Set Up Your Workspace', desc: 'Configure branding, currency, integrations, and invite your team.' },
                            { step: '03', title: 'Start Closing Deals', desc: 'Manage your entire revenue pipeline from one place.' }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 glass-card p-8 rounded-2xl border-t-2 border-t-purple_blue text-center flex flex-col items-center">
                                <div className="text-3xl font-bold font-instrument italic text-purple_blue mb-4">Step {step.step}</div>
                                <h4 className="mb-3 text-xl">{step.title}</h4>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Teaser */}
                <div className="mb-24">
                    <div className="glass-card p-10 md:p-16 rounded-3xl text-center">
                        <span className="lanka-accent-pill mb-6">Pricing</span>
                        <h2 className="mb-4">Growth Plan</h2>
                        <p className="text-xl mb-4 font-semibold">Everything your team needs.</p>
                        <p className="text-lg max-w-2xl mx-auto mb-8">
                            Leads, deals, automation, AI, and all communication channels included. Invite-only access.
                        </p>
                        <Link href="/contact" className="premium-button">
                            Contact Us for Enterprise Pricing
                        </Link>
                    </div>
                </div>

                {/* Product Gallery */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Product Gallery</h2>
                        <p className="text-lg text-dark_black/70 dark:text-white/70 max-w-2xl mx-auto">
                            Explore the powerful features and intuitive interface of HABB Connect.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110223.png', alt: 'Dashboard Overview', title: 'Dashboard Overview' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110324.png', alt: 'Contact Management', title: 'Contact Management' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110338.png', alt: 'Pipeline View', title: 'Pipeline View' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110352.png', alt: 'Client Profile', title: 'Client Profile' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110405.png', alt: 'Activity Timeline', title: 'Activity Timeline' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110431.png', alt: 'Reports Dashboard', title: 'Reports Dashboard' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110448.png', alt: 'Email Integration', title: 'Email Integration' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110500.png', alt: 'Team View', title: 'Team View' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110522.png', alt: 'Automation Rules', title: 'Automation Rules' },
                            { src: '/screenshots_habbconnect/Screenshot 2026-06-15 110533.png', alt: 'Settings Panel', title: 'Settings Panel' }
                        ].map((image, i) => (
                            <div key={i} className="group relative rounded-2xl overflow-hidden border border-dark_black/10 dark:border-white/10 aspect-video shadow-md hover:shadow-xl transition-all duration-300">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark_black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <h4 className="text-white font-semibold">{image.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call To Action */}
                <div className="mb-24 bg-gradient-to-r from-purple_blue/90 via-blue/90 to-purple_blue/90 text-white rounded-3xl p-10 md:p-16 shadow-premium_card relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/home/creative/bg.png')] opacity-10 bg-cover bg-center"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Close Deals <br/><span className="text-orange">Smarter?</span></h2>
                            <p className="text-lg text-white/80 mb-8 max-w-xl">
                                Join the invite-only teams using HABB Connect to unify their entire revenue operation. Let&apos;s discuss your needs.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Invite-only access',
                                    'Free consultation',
                                    'Enterprise pricing available'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-orange flex items-center justify-center text-dark_black text-xs font-bold">✓</div>
                                        <span className="font-semibold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4 min-w-[200px]">
                            <Link href="/contact" className="premium-button !bg-orange !text-dark_black hover:!bg-white">
                                Request Access
                            </Link>
                            <Link href="/contact" className="premium-button text-white border border-white/20 hover:bg-white/10 !bg-transparent">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center text-sm opacity-60">
                    <p>© 2026 HABB Connect — A product by HABB GLOBAL (PVT) LTD</p>
                </div>

            </div>
        </main>
    );
}
