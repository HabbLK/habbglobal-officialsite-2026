import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WatermarkLogo from "../../components/shared/watermark-logo";

export default function HabbgatePage() {
    return (
        <main className="pt-24 pb-16 min-h-screen relative overflow-hidden">
            <WatermarkLogo size={1200} opacity={0.02} rotate={-10} className="-right-40 top-0" />
            <div className="lanka-hero-blob w-96 h-96 bg-purple_blue -left-48 top-20"></div>
            <div className="container relative z-10 py-10">
                
                {/* Hero Section */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <span className="lanka-accent-pill mb-6">
                        Enterprise-Grade Security
                    </span>
                    <h1 className="mb-6">
                        Smart Access. <span className="premium-gradient-text">Total Control.</span>
                    </h1>
                    <p className="text-xl mb-10">
                        Real-time access validation supporting RFID, NFC, biometrics, mobile credentials, PINs, and smart locks—combining membership verification, payment status, and permissions in one seamless flow.
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
                        <h2 className="mb-6">The Future of Access Control</h2>
                        <p className="text-lg mb-6">
                            HABBGate is a cloud-based access control and membership management system developed by HABB GLOBAL (PVT) LTD. It validates users, payments, and permissions in real time across multiple credential types (RFID, NFC, biometrics, mobile, PIN).
                        </p>
                        <p className="text-lg mb-8">
                            Designed for gyms, offices, schools, and secure facilities, HABBGate replaces manual verification with instant, intelligent access decisions that protect your space and streamline operations.
                        </p>
                        <div className="inline-flex items-center gap-4 bg-orange/10 dark:bg-orange/20 border border-orange/20 px-6 py-4 rounded-xl">
                             <div className="font-bold text-3xl text-orange">1,247</div>
                             <div className="text-sm font-medium">Current entries today<br/>across all our clients</div>
                        </div>
                    </div>
                </div>

                {/* Integration Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-24 relative">
                    {[
                        { title: 'Access Control', desc: 'Secure entry management supporting RFID, NFC, biometrics, mobile credentials, and PINs' },
                        { title: 'Payment Integration', desc: 'Real-time payment status verification seamlessly linked to user access.' },
                        { title: 'Membership Management', desc: 'Complete member lifecycle handling natively within the secure dashboard.' }
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
                        <h2 className="mb-4">Simple. Fast. Secure.</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            From tap to access decision in milliseconds—here's how HABBGate keeps your facility secure.
                        </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {[
                            { step: '01', title: 'Card Tap', desc: 'User taps their RFID card or scans barcode at the access point.' },
                            { step: '02', title: 'System Validation', desc: 'HABBGate instantly verifies membership status, payment, and permissions.' },
                            { step: '03', title: 'Access Decision', desc: 'Visual feedback shows Green (granted), Yellow (warning), or Red (denied).' },
                            { step: '04', title: 'Entry Logged', desc: 'Complete access attempt is recorded with timestamp and details.' }
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
                        <span className="lanka-accent-pill mb-4">Platform Toolkit</span>
                        <h2 className="mb-4">Everything You Need for Smart Access</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            A comprehensive suite of tools designed to make access control effortless, secure, and intelligent.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                        <div className="lanka-hero-blob w-72 h-72 bg-purple_blue/20 -left-10 top-20 mix-blend-multiply filter blur-3xl"></div>
                        {[
                            { title: 'Real-Time Access Decisions', desc: 'Instant validation of membership, permissions, and status in milliseconds.' },
                            { title: 'Payment-Aware Control', desc: 'Automatically restricts access when payments are overdue or pending.' },
                            { title: 'Color-Based Feedback', desc: 'Clear visual indicators—Green, Yellow, Red—for immediate understanding.' },
                            { title: 'Attendance & Access Logs', desc: 'Complete records of every entry attempt with timestamps and details.' },
                            { title: 'Multi-Company SaaS', desc: 'Manage multiple facilities, locations, and organizations from one platform.' },
                            { title: 'Permission Tiers', desc: 'Define access levels by zone, time, membership type, or custom rules.' },
                            { title: 'Cloud-Based Platform', desc: 'Access your dashboard anywhere. No local servers required.' },
                            { title: 'Analytics & Reports', desc: 'Insights into traffic patterns, peak hours, and member behavior.' }
                        ].map((feature, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl hover:border-purple_blue/50 transition-colors z-10 group">
                                <h4 className="text-xl text-purple_blue mb-3 group-hover:pl-2 transition-all">{feature.title}</h4>
                                <p className="text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lanka-premium-divider !my-20"></div>

                {/* Why HABBGate */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="mb-4">The Smarter Way to Control Access</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            See why forward-thinking facilities trust HABBGate for their access control needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { stat: '3-in-1', title: 'Unified Platform', desc: 'Combines access control, payment verification, and attendance tracking in a single platform.' },
                            { stat: '80%', title: 'Less Manual Work', desc: 'Eliminate manual membership checks and reduce front-desk workload by up to 80%.' },
                            { stat: '100%', title: 'Entry Verification', desc: 'Real-time validation stops expired memberships and defaulted payments at the door.' },
                            { stat: '∞', title: 'Scalability', desc: 'Cloud-native architecture grows with your business. Add locations and users anytime.' }
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-8 rounded-2xl text-center">
                                <div className="text-5xl font-bold font-instrument text-orange mb-4 italic">{stat.stat}</div>
                                <h4 className="mb-3">{stat.title}</h4>
                                <p className="text-sm">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hardware Section */}
                <div className="mb-24 bg-dark_black relative text-white rounded-[3rem] p-10 md:p-16 overflow-hidden">
                    <div className="absolute w-full h-[500px] bg-gradient-to-b from-purple_blue/20 to-transparent top-0 left-0 pointer-events-none"></div>
                    <div className="text-center mb-12 relative z-10">
                        <span className="lanka-accent-pill border-white/20 text-white/90 bg-white/5 mb-4">Hardware Integration</span>
                        <h2 className="mb-4 text-white">Access Control Devices</h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Four core categories—credentials, readers, controllers and locking hardware—that form the backbone of modern access control systems.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative z-10">
                        {[
                            { title: 'Credential Devices', subtitle: 'What the user has', desc: 'Physical or digital tokens that identify individuals.', items: ['RFID Cards / Tags', 'Key Fobs', 'Mobile Devices (NFC / BLE)', 'PIN Codes', 'Barcodes / QR Codes'] },
                            { title: 'Reader Devices', subtitle: 'What reads the credential', desc: 'Hardware that captures data for authentication.', items: ['RFID Readers', 'NFC Readers', 'Barcode / QR Scanners', 'Biometric Readers', 'Keypads'] },
                            { title: 'Controller Devices', subtitle: 'System Intelligence', desc: 'Central processing units that make access decisions.', items: ['Access Control Panels', 'RFID Controllers', 'Embedded Systems', 'Network Controllers'] },
                            { title: 'Locking Devices', subtitle: 'Physical Barrier Control', desc: 'Mechanical/electronic devices that secure access points.', items: ['Magnetic Locks', 'Electric Strike Locks', 'Drop Bolt Locks', 'Solenoid Locks', 'Smart Locks'] }
                        ].map((hw, i) => (
                            <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-purple_blue/70 transition-all hover:bg-white/10 group backdrop-blur-sm">
                                <h4 className="text-purple_blue mb-1 text-xl">{hw.title}</h4>
                                <p className="text-sm font-semibold text-orange mb-4 uppercase tracking-wider">{hw.subtitle}</p>
                                <p className="text-white/80 text-sm mb-6">{hw.desc}</p>
                                <div className="h-px w-full bg-white/10 mb-6 group-hover:bg-purple_blue/30 transition-colors"></div>
                                <ul className="space-y-3">
                                    {hw.items.map((item, j) => (
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
                            <strong>Typical Access Control Flow:</strong> When a user presents their RFID card (Credential Device) to a wall-mounted reader (Reader Device), the captured data is sent to a central controller (Controller Device). The controller validates the credential against access rules and schedules, then sends a signal to release the magnetic lock (Locking Device), granting secure entry to the authorized area.
                        </p>
                    </div>
                </div>
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Every Facility</h2>
                        <p className="text-lg text-dark_black/70 dark:text-white/70 max-w-2xl mx-auto">
                            From fitness centers to secure government facilities, HABBGate adapts to your unique access control needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            { title: 'Gyms & Fitness Centers', desc: 'Control member access based on active subscriptions, payment status, and class bookings. Prevent unauthorized entries and track attendance automatically.', list: ['Membership validation', 'Class booking integration', 'Peak hour analytics'] },
                            { title: 'Offices & Corporates', desc: 'Secure your workplace with employee access cards. Define zones, track attendance, and integrate with HR systems for seamless management.', list: ['Employee time tracking', 'Zone-based access', 'Visitor management'] },
                            { title: 'Schools & Institutions', desc: 'Protect students and staff with controlled entry points. Monitor campus access and maintain secure environments for learning.', list: ['Student ID integration', 'Parent pick-up verification', 'After-hours control'] },
                            { title: 'Secure Facilities', desc: 'Maximum security for sensitive locations. Multi-factor verification, strict logging, and real-time alerts for unauthorized attempts.', list: ['Multi-factor auth', 'Real-time alerts', 'Audit trail logging'] }
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
                            Explore the powerful features and intuitive interface of HABBGate.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203258.png', alt: 'Dashboard Overview', title: 'Dashboard Overview' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 202936.png', alt: 'Reports Panel', title: 'Reports Panel' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203004.png', alt: 'ID Tagging View', title: 'ID Tagging View' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203021.png', alt: 'Real-time Monitoring', title: 'Real-time Monitoring' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203312.png', alt: 'Authorized Entry', title: 'Authorized Entry' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203114.png', alt: 'Unauthorized Entry', title: 'Unauthorized Entry' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203131.png', alt: 'Exit ID View', title: 'Exit ID View' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203150.png', alt: 'Access Logs', title: 'Access Logs' },
                            { src: '/screenshots_habbgate/Screenshot 2026-01-08 203246.png', alt: 'Subscription Based', title: 'Subscription Management' }
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
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Control <br/><span className="text-orange">Access Smarter?</span></h2>
                            <p className="text-lg text-white/80 mb-8 max-w-xl">
                                Join the growing number of facilities using HABBGate for secure, intelligent access control. Let's discuss your needs.
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
