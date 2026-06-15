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
                        CRM &amp; Client Management
                    </span>
                    <h1 className="mb-6">
                        Connect. Manage. <span className="premium-gradient-text">Grow.</span>
                    </h1>
                    <p className="text-xl mb-10">
                        A powerful CRM platform by HABB that helps businesses manage client relationships, track leads, automate follow-ups, and drive revenue growth—all from one unified dashboard.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="premium-button">
                            Request a Demo
                        </Link>
                        <Link href="/contact" className="premium-button-secondary">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* About Section */}
                <div className="mb-24 glass-card p-10 md:p-16 rounded-3xl">
                    <div className="max-w-3xl border-l-[3px] border-orange pl-6 md:pl-10">
                        <h2 className="mb-6">Your Clients, Fully Connected</h2>
                        <p className="text-lg mb-6">
                            HABB Connect is a cloud-based CRM solution developed by HABB GLOBAL (PVT) LTD. It centralizes all your client data, communication history, lead tracking, and sales pipeline into one intelligent platform.
                        </p>
                        <p className="text-lg mb-8">
                            Designed for service businesses, agencies, and growing teams, HABB Connect replaces scattered spreadsheets and disconnected tools with a streamlined system that keeps every client interaction at your fingertips.
                        </p>
                        <div className="inline-flex items-center gap-4 bg-orange/10 dark:bg-orange/20 border border-orange/20 px-6 py-4 rounded-xl">
                            <div className="font-bold text-3xl text-orange">360°</div>
                            <div className="text-sm font-medium">Complete client view<br/>across all touchpoints</div>
                        </div>
                    </div>
                </div>

                {/* Core Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-24 relative">
                    {[
                        { title: 'Lead Management', desc: 'Capture, qualify, and nurture leads through customizable pipelines with automated scoring.' },
                        { title: 'Client Communication', desc: 'Unified inbox for emails, calls, and messages—never lose track of a conversation.' },
                        { title: 'Sales Pipeline', desc: 'Visual deal tracking with drag-and-drop stages, forecasting, and revenue insights.' }
                    ].map((feature, i) => (
                        <div key={i} className="glass-card p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="w-14 h-14 rounded-2xl bg-purple_blue/10 flex items-center justify-center mb-8 border border-purple_blue/20 group-hover:bg-purple_blue transition-colors">
                                <span className="text-purple_blue text-xl font-bold group-hover:text-white transition-colors">0{i + 1}</span>
                            </div>
                            <h4 className="mb-4">{feature.title}</h4>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* How It Works Section */}
                <div className="mb-24 glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="lanka-hero-blob w-80 h-80 bg-orange/40 right-20 top-20"></div>
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="mb-4">Simple. Organized. Effective.</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            From first contact to closed deal—here&apos;s how HABB Connect streamlines your client journey.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {[
                            { step: '01', title: 'Capture Leads', desc: 'Leads flow in from forms, emails, and integrations—automatically organized.' },
                            { step: '02', title: 'Qualify & Assign', desc: 'Smart scoring and routing ensures leads reach the right team member instantly.' },
                            { step: '03', title: 'Nurture & Follow Up', desc: 'Automated reminders, email sequences, and task scheduling keep deals moving.' },
                            { step: '04', title: 'Close & Retain', desc: 'Convert leads to clients, track revenue, and build lasting relationships.' }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 glass-card p-6 rounded-2xl border-t-2 border-t-purple_blue text-center flex flex-col items-center">
                                <div className="text-2xl font-bold font-instrument italic text-purple_blue mb-4">Step {step.step}</div>
                                <h4 className="mb-3">{step.title}</h4>
                                <p className="text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Features */}
                <div className="mb-24 py-16">
                    <div className="text-center mb-16">
                        <span className="lanka-accent-pill mb-4">Platform Features</span>
                        <h2 className="mb-4">Everything You Need to Manage Clients</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            A comprehensive CRM suite designed to centralize client data, automate workflows, and accelerate growth.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                        <div className="lanka-hero-blob w-72 h-72 bg-purple_blue/20 -left-10 top-20 mix-blend-multiply filter blur-3xl"></div>
                        {[
                            { title: 'Contact Management', desc: 'Centralized database with complete client profiles, history, and interaction timeline.' },
                            { title: 'Pipeline Automation', desc: 'Automate deal stages, task creation, and follow-up sequences to save time.' },
                            { title: 'Email Integration', desc: 'Sync your inbox, send tracked emails, and manage templates—all within the CRM.' },
                            { title: 'Activity Tracking', desc: 'Log calls, meetings, and notes. Never miss a follow-up with smart reminders.' },
                            { title: 'Reports & Analytics', desc: 'Real-time dashboards showing sales performance, pipeline health, and team productivity.' },
                            { title: 'Team Collaboration', desc: 'Shared notes, task assignments, and deal visibility keep everyone aligned.' },
                            { title: 'Custom Fields & Tags', desc: 'Tailor the CRM to your workflow with custom properties, tags, and filters.' },
                            { title: 'Multi-Channel Communication', desc: 'Reach clients via email, SMS, WhatsApp, and calls from one unified platform.' }
                        ].map((feature, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl hover:border-purple_blue/50 transition-colors z-10 group">
                                <h4 className="text-xl text-purple_blue mb-3 group-hover:pl-2 transition-all">{feature.title}</h4>
                                <p className="text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lanka-premium-divider !my-20"></div>

                {/* Why HABB Connect */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="mb-4">The Smarter Way to Manage Relationships</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            See why growing businesses trust HABB Connect to power their client relationships.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { stat: '3x', title: 'Faster Follow-ups', desc: 'Automated reminders and sequences ensure no lead goes cold.' },
                            { stat: '60%', title: 'Less Admin Work', desc: 'Automate data entry, task assignment, and routine communication.' },
                            { stat: '100%', title: 'Client Visibility', desc: 'Complete interaction history for every contact at your fingertips.' },
                            { stat: '∞', title: 'Scalability', desc: 'Cloud-native platform grows with your team and client base.' }
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-8 rounded-2xl text-center">
                                <div className="text-5xl font-bold font-instrument text-orange mb-4 italic">{stat.stat}</div>
                                <h4 className="mb-3">{stat.title}</h4>
                                <p className="text-sm">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modules Section */}
                <div className="mb-24 bg-dark_black relative text-white rounded-[3rem] p-10 md:p-16 overflow-hidden">
                    <div className="absolute w-full h-[500px] bg-gradient-to-b from-purple_blue/20 to-transparent top-0 left-0 pointer-events-none"></div>
                    <div className="text-center mb-12 relative z-10">
                        <span className="lanka-accent-pill border-white/20 text-white/90 bg-white/5 mb-4">CRM Modules</span>
                        <h2 className="mb-4 text-white">Built for Every Team</h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Modular architecture lets you activate only what you need—sales, support, marketing, or all three.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {[
                            { title: 'Sales Module', subtitle: 'Close more deals', desc: 'Pipeline management, deal tracking, quotations, and revenue forecasting.', items: ['Visual Pipeline', 'Deal Scoring', 'Quote Generation', 'Revenue Forecasting', 'Win/Loss Analysis'] },
                            { title: 'Support Module', subtitle: 'Delight your clients', desc: 'Ticket management, SLA tracking, and client satisfaction scoring.', items: ['Ticket System', 'SLA Management', 'Knowledge Base', 'Client Portal', 'Satisfaction Surveys'] },
                            { title: 'Marketing Module', subtitle: 'Grow your reach', desc: 'Campaign management, email marketing, and lead nurturing workflows.', items: ['Email Campaigns', 'Landing Pages', 'Lead Scoring', 'A/B Testing', 'Campaign Analytics'] }
                        ].map((mod, i) => (
                            <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-purple_blue/70 transition-all hover:bg-white/10 group backdrop-blur-sm">
                                <h4 className="text-purple_blue mb-1 text-xl">{mod.title}</h4>
                                <p className="text-sm font-semibold text-orange mb-4 uppercase tracking-wider">{mod.subtitle}</p>
                                <p className="text-white/80 text-sm mb-6">{mod.desc}</p>
                                <div className="h-px w-full bg-white/10 mb-6 group-hover:bg-purple_blue/30 transition-colors"></div>
                                <ul className="space-y-3">
                                    {mod.items.map((item, j) => (
                                        <li key={j} className="text-sm text-white/70 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-r from-purple_blue/20 to-orange/10 border border-white/10 rounded-2xl p-8 relative z-10">
                        <h4 className="text-white mb-4">Real-World Example</h4>
                        <p className="text-white/80 leading-relaxed text-lg">
                            <strong>Typical Client Journey:</strong> A lead fills out a contact form on your website. HABB Connect captures the lead, scores it based on your criteria, and assigns it to the right sales rep. Automated emails nurture the lead while the rep receives task reminders. Once the deal closes, the client is seamlessly transitioned to your support module for ongoing service.
                        </p>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Every Business</h2>
                        <p className="text-lg text-dark_black/70 dark:text-white/70 max-w-2xl mx-auto">
                            From startups to enterprises, HABB Connect adapts to your unique client management needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            { title: 'Agencies & Consultancies', desc: 'Manage multiple clients, projects, and retainers in one place. Track deliverables, communications, and billing effortlessly.', list: ['Client project tracking', 'Retainer management', 'Time & billing integration'] },
                            { title: 'Service Businesses', desc: 'From salons to repair shops—manage appointments, client history, and follow-ups to drive repeat business.', list: ['Appointment scheduling', 'Service history', 'Loyalty tracking'] },
                            { title: 'Sales Teams', desc: 'Empower your reps with pipeline visibility, automated outreach, and performance tracking that drives results.', list: ['Lead routing', 'Sales automation', 'Commission tracking'] },
                            { title: 'Growing Startups', desc: 'Start lean and scale up. HABB Connect grows with your team, adding features as your needs evolve.', list: ['Flexible workflows', 'Team onboarding', 'Integration ecosystem'] }
                        ].map((facility, i) => (
                            <div key={i} className="flex flex-col p-8 rounded-2xl border border-dark_black/10 dark:border-white/10 hover:border-purple_blue/50 transition-colors">
                                <h3 className="text-2xl font-bold mb-4 text-purple_blue dark:text-pale-yellow">{facility.title}</h3>
                                <p className="text-dark_black/70 dark:text-white/70 mb-6">{facility.desc}</p>
                                <ul className="space-y-3 mt-auto border-t border-dark_black/10 dark:border-white/10 pt-6">
                                    {facility.list.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange block"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Manage Clients <br/><span className="text-orange">Smarter?</span></h2>
                            <p className="text-lg text-white/80 mb-8 max-w-xl">
                                Join the growing number of businesses using HABB Connect for intelligent client relationship management. Let&apos;s discuss your needs.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'No commitment required',
                                    'Free consultation',
                                    'Custom pricing available'
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
                                Request a Demo
                            </Link>
                            <Link href="/contact" className="premium-button text-white border border-white/20 hover:bg-white/10 !bg-transparent">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
