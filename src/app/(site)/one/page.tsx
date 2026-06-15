import React from 'react';
import Link from 'next/link';
import WatermarkLogo from "../../components/shared/watermark-logo";

export default function HabbOnePage() {
    return (
        <main className="pt-24 pb-16 min-h-screen relative overflow-hidden">
            <WatermarkLogo size={1200} opacity={0.02} rotate={-10} className="-right-40 top-0" />
            <div className="lanka-hero-blob w-96 h-96 bg-purple_blue -left-48 top-20"></div>
            <div className="container relative z-10 py-10">

                {/* Hero Section */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <span className="lanka-accent-pill mb-6">
                        Modular ERP for SME Workshops
                    </span>
                    <h1 className="mb-6">
                        From Quote to <span className="premium-gradient-text">QR Invoice.</span>
                    </h1>
                    <p className="text-xl mb-6">
                        HABB One is a cloud-based, all-in-one business management platform built specifically for small and medium-sized surface treatment, coating, and manufacturing workshops.
                    </p>
                    <p className="text-lg mb-10 opacity-80">
                        It covers the entire workflow from customer inquiry to paid invoice — with real-time workshop tracking, intelligent scheduling, and Swiss QR-Bill invoicing built in.
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

                {/* Key Differentiators */}
                <div className="mb-24">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            { icon: '🏭', title: 'Workshop-first', desc: 'Built for the shop floor, not retrofitted from generic ERP.' },
                            { icon: '📱', title: 'QR Scan Workflow', desc: 'Workers interact via mobile phone, no training needed.' },
                            { icon: '🇨🇭', title: 'Swiss Compliance', desc: 'QR-Bill invoicing, AHV integration, FADP/GDPR.' },
                            { icon: '🔗', title: 'One System', desc: 'No separate tools for time tracking, scheduling, and invoicing.' },
                            { icon: '⚡', title: 'Real-time', desc: 'Live dashboard updates every 15 seconds, kiosk auto-refreshes.' }
                        ].map((diff, i) => (
                            <div key={i} className="glass-card p-5 rounded-2xl text-center hover:-translate-y-1 transition-transform">
                                <div className="text-3xl mb-3">{diff.icon}</div>
                                <h4 className="text-sm font-bold mb-1">{diff.title}</h4>
                                <p className="text-xs opacity-80">{diff.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Modules Overview */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="lanka-accent-pill mb-4">Core Modules</span>
                        <h2 className="mb-4">Everything Your Workshop Needs</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            Eight powerful modules covering the full lifecycle — from staff arrival to customer payment.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        <div className="lanka-hero-blob w-72 h-72 bg-purple_blue/20 -left-10 top-20 mix-blend-multiply filter blur-3xl"></div>
                        {[
                            { title: 'Time Tracking & Attendance', desc: 'PIN-based clock-in/out, live dashboard, automatic break detection, and monthly timesheets.' },
                            { title: 'Staff Scheduling', desc: 'Visual schedule matrix, drag-and-click planning, auto-plan by capacity, and publish workflow.' },
                            { title: 'Quotes & Orders', desc: 'Quote wizard, process templates, intelligent step recommendations, and one-click order conversion.' },
                            { title: 'Workshop Process Tracking', desc: 'QR code job travelers, mobile scan UI, live stopwatch, and machine assignment.' },
                            { title: 'Invoicing & QR-Bill', desc: 'Swiss QR-Bill generation (ISO 20022), PDF export, payment tracking, and overdue detection.' },
                            { title: 'Customer CRM', desc: 'Company/private distinction, multiple addresses, VAT validation, and full history.' },
                            { title: 'Reporting & Export', desc: 'Monthly time reports, payroll exports, productivity analysis, and ERP calculation reports.' },
                            { title: 'Intelligent Scheduling', desc: 'Gantt-style job scheduler, machine availability, drying/curing times, and conflict resolution.' }
                        ].map((mod, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl hover:border-purple_blue/50 transition-colors z-10 group">
                                <div className="w-10 h-10 rounded-xl bg-purple_blue/10 flex items-center justify-center mb-4 border border-purple_blue/20 group-hover:bg-purple_blue transition-colors">
                                    <span className="text-purple_blue text-sm font-bold group-hover:text-white transition-colors">0{i + 1}</span>
                                </div>
                                <h4 className="text-lg text-purple_blue mb-2 group-hover:pl-1 transition-all">{mod.title}</h4>
                                <p className="text-sm">{mod.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lanka-premium-divider !my-20"></div>

                {/* Detailed Module: Time Tracking */}
                <div className="mb-16 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-purple_blue pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-purple_blue">Time Tracking &amp; Attendance</h3>
                        <p className="text-sm opacity-70 mb-6">Personal PIN-based kiosk system</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Personal PIN-based clock-in/out via workshop kiosk tablet',
                                'Live attendance dashboard with real-time status (clocked in, on break, absent)',
                                'Automatic break detection and overtime warnings',
                                'Monthly timesheets with target vs. actual hours, running balance',
                                'Admin override for missed punches with full audit trail',
                                'Home office support'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Module: Staff Scheduling */}
                <div className="mb-16 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-orange pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-orange">Staff Scheduling</h3>
                        <p className="text-sm opacity-70 mb-6">Visual planning for your whole team</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Monthly visual schedule matrix (employee × day grid)',
                                'Drag-and-click shift planning with work areas',
                                'Bulk planning across date ranges',
                                'Auto-plan based on workshop capacity and employee skills',
                                'Publish/draft workflow — employees see only published plans',
                                'Area-based filtering and color-coded visualization'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple_blue mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Module: Quotes & Orders */}
                <div className="mb-16 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-purple_blue pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-purple_blue">Quotes &amp; Orders</h3>
                        <p className="text-sm opacity-70 mb-6">From inquiry to confirmed order in minutes</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Full quote wizard with customer selection, line items, and process steps',
                                'Process template library (e.g. standard powder coating, wet painting 2K)',
                                'Intelligent step recommendations based on material + application area',
                                'One-click convert quote to order',
                                'Order confirmation PDF generation',
                                'Parameter-based pricing — frozen on confirmation for price integrity',
                                'Priority handling (Normal, High, Express with surcharge)'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Module: Workshop Process Tracking */}
                <div className="mb-16 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-orange pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-orange">Workshop Process Tracking</h3>
                        <p className="text-sm opacity-70 mb-6">QR-powered shop floor visibility</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'QR code on each job traveler (printed label per process step)',
                                'Mobile scan UI — workers scan, enter PIN, start/pause/end steps',
                                'Live stopwatch with estimated vs. actual time',
                                'Full event history per step',
                                'Machine assignment and skill-based routing'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple_blue mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Module: Invoicing & QR-Bill */}
                <div className="mb-16 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-purple_blue pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-purple_blue">Invoicing &amp; QR-Bill</h3>
                        <p className="text-sm opacity-70 mb-6">Swiss QR-Bill compliant invoicing</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Swiss QR-Bill generation (ISO 20022 compliant)',
                                'Create invoices from completed orders or manually',
                                'PDF export with embedded QR payment slip',
                                'Payment tracking (mark as paid, partial payments)',
                                'Overdue detection and dashboard warnings'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Module: Customer CRM */}
                <div className="mb-16 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-orange pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-orange">Customer Management (CRM)</h3>
                        <p className="text-sm opacity-70 mb-6">Complete customer database</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Customer database with company/private distinction',
                                'Multiple addresses (billing, shipping) and contacts per customer',
                                'Swiss VAT number validation (CHE format)',
                                'Payment terms and credit limits',
                                'Full order/quote/invoice history per customer'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple_blue mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Module: Reporting */}
                <div className="mb-16 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-purple_blue pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-purple_blue">Reporting &amp; Export</h3>
                        <p className="text-sm opacity-70 mb-6">Insights for management and compliance</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Monthly time reports (PDF, Excel, CSV)',
                                'Payroll reports with signature fields for HR compliance',
                                'Employee productivity analysis',
                                'Machine utilization reports',
                                'Schedule plan exports (PDF landscape, Excel with area view)',
                                'ERP calculation reports (estimated vs. actual vs. billed)'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Module: Intelligent Scheduling */}
                <div className="mb-24 glass-card p-10 md:p-12 rounded-3xl">
                    <div className="border-l-[3px] border-orange pl-6 md:pl-10">
                        <h3 className="text-2xl font-bold mb-2 text-orange">Intelligent Scheduling Engine</h3>
                        <p className="text-sm opacity-70 mb-6">Automated job planning</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Gantt-style automated job scheduler',
                                'Considers machine availability, employee skills, and process dependencies',
                                'Respects drying/curing wait times between steps',
                                'Conflict detection and resolution'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple_blue mt-2 shrink-0"></div>
                                    <p className="text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Platform Features - Dark Section */}
                <div className="mb-24 bg-dark_black relative text-white rounded-[3rem] p-10 md:p-16 overflow-hidden">
                    <div className="absolute w-full h-[500px] bg-gradient-to-b from-purple_blue/20 to-transparent top-0 left-0 pointer-events-none"></div>
                    <div className="text-center mb-12 relative z-10">
                        <span className="lanka-accent-pill border-white/20 text-white/90 bg-white/5 mb-4">Platform Features</span>
                        <h2 className="mb-4 text-white">Enterprise-Grade Infrastructure</h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Multi-tenant architecture, role-based access, and Swiss compliance — built for serious workshops.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {[
                            {
                                title: 'Multi-Tenant Architecture',
                                subtitle: 'Isolated & secure',
                                items: ['Each company gets isolated data (row-level security)', 'Owner portal for platform administration', 'Tenant provisioning with module-based plans']
                            },
                            {
                                title: 'Role-Based Access Control',
                                subtitle: 'Granular permissions',
                                items: ['Configurable permission matrix (Super Admin, CEO, Secretary, Employee)', 'Per-user permission overrides', 'Kiosk operator role for workshop tablets']
                            },
                            {
                                title: 'Vacation & Absence Management',
                                subtitle: 'Complete leave system',
                                items: ['Configurable absence types (vacation, sickness, accident, military, etc.)', 'Approval workflows (request → approve)', 'Vacation balance tracking (entitlement, carry-over, used, remaining)', 'Visual display in schedule matrix']
                            },
                            {
                                title: 'Holiday Management',
                                subtitle: 'Swiss calendar built-in',
                                items: ['Company-specific holiday calendar', 'Swiss public holidays auto-seeded', 'Fraction support (half-day holidays)', 'Target hours automatically adjusted']
                            },
                            {
                                title: 'System Parameters',
                                subtitle: 'Centralized configuration',
                                items: ['Centralized calculation parameters (labor rates, surcharges, VAT rates)', 'Machine cycle times and throughput settings', 'Version history with audit trail']
                            },
                            {
                                title: 'Security & Compliance',
                                subtitle: 'Bank-grade protection',
                                items: ['Passkey authentication for platform owners', 'Session management with impersonation (consent-based, OTP-verified)', 'Full audit log of all data changes', 'FADP/GDPR compliant data handling', 'TLS 1.3 encrypted']
                            }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-purple_blue/70 transition-all hover:bg-white/10 group backdrop-blur-sm">
                                <h4 className="text-purple_blue mb-1 text-xl">{feat.title}</h4>
                                <p className="text-sm font-semibold text-orange mb-5 uppercase tracking-wider">{feat.subtitle}</p>
                                <div className="h-px w-full bg-white/10 mb-5 group-hover:bg-purple_blue/30 transition-colors"></div>
                                <ul className="space-y-3">
                                    {feat.items.map((item, j) => (
                                        <li key={j} className="text-sm text-white/70 flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technical Stack */}
                <div className="mb-24 glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="lanka-hero-blob w-80 h-80 bg-orange/40 right-20 top-20"></div>
                    <div className="text-center mb-12 relative z-10">
                        <span className="lanka-accent-pill mb-4">Technical Stack</span>
                        <h2 className="mb-4">Modern. Performant. Secure.</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {[
                            { label: 'Frontend', value: 'Next.js 15 (App Router), React Server Components, Tailwind CSS' },
                            { label: 'Backend', value: 'Next.js Server Actions, Prisma ORM, PostgreSQL' },
                            { label: 'Auth', value: 'NextAuth.js with credential + passkey providers' },
                            { label: 'PDF', value: 'pdf-lib (invoices, quotes, orders, reports, QR-Bills)' },
                            { label: 'Excel', value: 'ExcelJS + SheetJS for rich spreadsheet exports' },
                            { label: 'i18n', value: 'next-intl (English + German)' },
                            { label: 'Hosting', value: 'Securely hosted in Europe' },
                            { label: 'Real-time', value: 'Live updates every 15 seconds' }
                        ].map((tech, i) => (
                            <div key={i} className="glass-card p-5 rounded-2xl z-10">
                                <p className="text-xs font-bold uppercase tracking-wider text-purple_blue mb-2">{tech.label}</p>
                                <p className="text-sm">{tech.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Plans */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="lanka-accent-pill mb-4">Plans</span>
                        <h2 className="mb-4">Choose Your Plan</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            Start with time tracking and grow into full workshop management as your needs evolve.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Time Tracking',
                                desc: 'Essential time & attendance',
                                features: ['Time tracking & kiosk', 'Staff scheduling', 'Vacation & absences', 'Reports & exports'],
                                missing: ['Customer CRM', 'Quotes & orders', 'QR-Bill invoicing', 'Process templates', 'Workshop QR scanning', 'Automated scheduling', 'Machine management', 'Productivity reports'],
                                highlight: false
                            },
                            {
                                name: 'Starter',
                                desc: 'Full business management',
                                features: ['Time tracking & kiosk', 'Staff scheduling', 'Vacation & absences', 'Reports & exports', 'Customer CRM', 'Quotes & orders', 'QR-Bill invoicing', 'Process templates'],
                                missing: ['Workshop QR scanning', 'Automated scheduling', 'Machine management', 'Productivity reports'],
                                highlight: false
                            },
                            {
                                name: 'Pro',
                                desc: 'Complete workshop ERP',
                                features: ['Time tracking & kiosk', 'Staff scheduling', 'Vacation & absences', 'Reports & exports', 'Customer CRM', 'Quotes & orders', 'QR-Bill invoicing', 'Process templates', 'Workshop QR scanning', 'Automated scheduling', 'Machine management', 'Productivity reports'],
                                missing: [],
                                highlight: true
                            }
                        ].map((plan, i) => (
                            <div key={i} className={`rounded-3xl p-8 border ${plan.highlight ? 'border-purple_blue bg-purple_blue/5 dark:bg-purple_blue/10 shadow-xl relative' : 'border-dark_black/10 dark:border-white/10'}`}>
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple_blue text-white text-xs font-bold px-4 py-1.5 rounded-full">
                                        RECOMMENDED
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm opacity-70 mb-6">{plan.desc}</p>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm">
                                            <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                                            {f}
                                        </li>
                                    ))}
                                    {plan.missing.map((f, j) => (
                                        <li key={`m-${j}`} className="flex items-center gap-3 text-sm opacity-40">
                                            <span className="w-5 h-5 rounded-full bg-dark_black/5 dark:bg-white/5 flex items-center justify-center text-xs shrink-0">—</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact" className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors ${plan.highlight ? 'bg-purple_blue text-white hover:bg-purple_blue/90' : 'border border-dark_black/20 dark:border-white/20 hover:border-purple_blue'}`}>
                                    Contact Us
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Who Is It For */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Who Is It For?</h2>
                        <p className="text-lg text-dark_black/70 dark:text-white/70 max-w-2xl mx-auto">
                            HABB One is purpose-built for workshops that need real tools, not generic software.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            { title: 'Surface Treatment Workshops', desc: 'Sandblasting, powder coating, wet painting — manage every process step with QR scanning and real-time tracking.', list: ['Process-aware scheduling', 'Drying/curing time handling', 'Material tracking'] },
                            { title: 'Metal Fabrication Shops', desc: 'From cutting to finishing — track jobs across machines and workers with full visibility and accurate costing.', list: ['Machine utilization', 'Job costing', 'Quality checkpoints'] },
                            { title: 'Small Manufacturers (5–50 employees)', desc: 'The right size of ERP — powerful enough for real operations, simple enough for small teams.', list: ['No complex setup', 'Kiosk-ready', 'Mobile-first'] },
                            { title: 'Any Job-Based Workshop', desc: 'If you need time tracking + job management in one tool, HABB One replaces your spreadsheets and sticky notes.', list: ['Combined time & job tracking', 'Integrated invoicing', 'One login for everything'] }
                        ].map((target, i) => (
                            <div key={i} className="flex flex-col p-8 rounded-2xl border border-dark_black/10 dark:border-white/10 hover:border-purple_blue/50 transition-colors">
                                <h3 className="text-2xl font-bold mb-4 text-purple_blue dark:text-pale-yellow">{target.title}</h3>
                                <p className="text-dark_black/70 dark:text-white/70 mb-6">{target.desc}</p>
                                <ul className="space-y-3 mt-auto border-t border-dark_black/10 dark:border-white/10 pt-6">
                                    {target.list.map((item, idx) => (
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

                {/* How It Works */}
                <div className="mb-24 glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="lanka-hero-blob w-80 h-80 bg-orange/40 right-20 top-20"></div>
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="mb-4">How a Typical Day Works</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            From morning clock-in to end-of-day reports — seamless and automatic.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {[
                            { step: '01', title: 'Clock In', desc: 'Workers enter PIN on kiosk tablet. Attendance dashboard updates in real time.' },
                            { step: '02', title: 'Scan & Work', desc: 'Pick up job traveler, scan QR code, start timer. System tracks who does what.' },
                            { step: '03', title: 'Complete Steps', desc: 'End step, machine moves to next. Drying times respected. Conflicts flagged.' },
                            { step: '04', title: 'Invoice & Report', desc: 'Job done → invoice generated with QR-Bill. Management sees productivity reports.' }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 glass-card p-6 rounded-2xl border-t-2 border-t-purple_blue text-center flex flex-col items-center">
                                <div className="text-2xl font-bold font-instrument italic text-purple_blue mb-4">Step {step.step}</div>
                                <h4 className="mb-3">{step.title}</h4>
                                <p className="text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call To Action */}
                <div className="mb-24 bg-gradient-to-r from-purple_blue/90 via-blue/90 to-purple_blue/90 text-white rounded-3xl p-10 md:p-16 shadow-premium_card relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/home/creative/bg.png')] opacity-10 bg-cover bg-center"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Run Your Workshop <br/><span className="text-orange">Smarter?</span></h2>
                            <p className="text-lg text-white/80 mb-8 max-w-xl">
                                Replace spreadsheets, whiteboards, and disconnected tools with one system built for your shop floor.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'No commitment required',
                                    'Free consultation & demo',
                                    'Module-based pricing'
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

                {/* Footer Note */}
                <div className="text-center text-sm opacity-60">
                    <p>A product by HABB GLOBAL (PVT) LTD</p>
                </div>

            </div>
        </main>
    );
}
