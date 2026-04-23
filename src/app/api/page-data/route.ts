import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'

const avatarList = [
  {
    image: '/images/home/avatar_1.jpg',
    title: 'Sarah Johnson',
  },
  {
    image: '/images/home/avatar_2.jpg',
    title: 'Olivia Miller',
  },
  {
    image: '/images/home/avatar_3.jpg',
    title: 'Sophia Roberts',
  },
  {
    image: '/images/home/avatar_4.jpg',
    title: 'Isabella Clark',
  },
]

const brandList = [
  {
    image: '/images/home/brand/brand-icon-1.svg',
    darkImg: '/images/home/brand/brand-darkicon-1.svg',
    title: 'Adobe',
  },
  {
    image: '/images/home/brand/brand-icon-2.svg',
    darkImg: '/images/home/brand/brand-darkicon-2.svg',
    title: 'Figma',
  },
  {
    image: '/images/home/brand/brand-icon-3.svg',
    darkImg: '/images/home/brand/brand-darkicon-3.svg',
    title: 'Shopify',
  },
  {
    image: '/images/home/brand/brand-icon-4.svg',
    darkImg: '/images/home/brand/brand-darkicon-4.svg',
    title: 'Dribble',
  },
  {
    image: '/images/home/brand/brand-icon-5.png',
    darkImg: '/images/home/brand/brand-darkicon-5.png',
    title: 'Webflow',
  },
]

const innovationList = [
  {
    image: '/images/home/innovation/brand.svg',
    title: 'Custom Web\nApplications',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/innovation/digitalmarketing.svg',
    title: 'Mobile App\nDevelopment',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/innovation/uiux.svg',
    title: 'UI/UX\nEngineering',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
  {
    image: '/images/home/innovation/analitics.svg',
    title: 'Cloud &\nInfrastructure',
    bg_color: 'bg-green/20',
    txt_color: 'text-green',
  },
  {
    image: '/images/home/innovation/webdevp.svg',
    title: 'AI\nSolutions',
    bg_color: 'bg-pink/20',
    txt_color: 'text-pink',
  },
]

const onlinePresenceList = [
  {
    image: '/images/home/onlinePresence/online_img_1.jpg',
    title: 'FlowBank',
    tag: ['FinTech Platform', 'Cloud Infrastructure'],
    link: '#',
  },
  {
    image: '/images/home/onlinePresence/online_img_2.jpg',
    title: 'Academy.co',
    tag: ['EdTech SaaS', 'Full-Stack Development'],
    link: '#',
  },
  {
    image: '/images/home/onlinePresence/online_img_3.jpg',
    title: 'Genome',
    tag: ['Healthcare System', 'AI Integration'],
    link: '#',
  },
  {
    image: '/images/home/onlinePresence/online_img_4.jpg',
    title: 'Hotto',
    tag: ['Mobile Commerce', 'Real-time Analytics'],
    link: '#',
  },
]

const WebResultTagList = [
  {
    image: '/images/home/result/creativity.svg',
    name: 'Reliability',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/result/innovation.svg',
    name: 'Innovation',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/result/strategy.svg',
    name: 'Scalability',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
]

const startupPlanList = [
  {
    plan_bg_color: 'bg-pale-yellow',
    text_color: 'text-dark_black',
    descp_color: 'dark_black/60',
    border_color: 'border-dark_black/10',
    plan_name: 'Foundation',
    plan_descp: 'For startups needing core development support. Focused execution, predictable delivery',
    plan_price: 'Custom',
    icon_img: '/images/home/startupPlan/white_tick.svg',
    plan_feature: [
      'Bi-weekly Sprint Deliveries',
      'Mid-Senior Engineers',
      'Technical Architecture Planning',
      'Quality Assurance & Testing',
      'Weekly Progress Reviews',
      'Cloud Deployment Support',
    ],
  },
  {
    plan_bg_color: 'bg-purple_blue',
    text_color: 'text-white',
    descp_color: 'white/60',
    border_color: 'border-white/10',
    plan_name: 'Enterprise',
    plan_descp: 'Accelerated delivery for MVPs, SaaS platforms and scalable systems',
    plan_price: 'Custom',
    icon_img: '/images/home/startupPlan/black_tick.svg',
    plan_feature: [
      'Continuous Development & Deployment',
      'Senior Engineers & Architects',
      'AI/ML Integration Capabilities',
      'Full-Stack Development Team',
      'Daily Stand-ups & Reviews',
      'DevOps & Security Optimization',
    ],
  },
]

const achievementsList = [
  {
    icon: '/images/home/achievement/framer_award.svg',
    dark_icon: '/images/home/achievement/dark_framer_award.svg',
    sub_title: 'Technical Excellence',
    title:
      'Recognized for delivering mission-critical software systems with exceptional reliability and performance.',
    year: '2024',
    url: '#',
  },
  {
    icon: '/images/home/achievement/dribble_award.svg',
    dark_icon: '/images/home/achievement/dribble_award.svg',
    sub_title: 'Innovation Leadership',
    title: 'Awarded for pioneering AI-driven solutions and scalable cloud architectures',
    year: '2023',
    url: '#',
  },
  {
    icon: '/images/home/achievement/awward_award.svg',
    dark_icon: '/images/home/achievement/dark_awward_award.svg',
    sub_title: 'Client Success',
    title:
      'Honored for outstanding technical delivery, client satisfaction, and long-term partnership excellence.',
    year: '2025',
    url: '#',
  },
]

const mapDocs = (docs: any[] = []) =>
  docs.map((doc) => ({
    ...doc,
    id: doc._id?.toString?.(),
    _id: undefined,
  }))

export const GET = async () => {
  try {
    const db = await getDb()
    const [creativeMindDocs, faqDocs, eventDocs, careerDocs] = await Promise.all([
      db.collection('teamMembers').find({}).sort({ order: 1, createdAt: -1 }).toArray(),
      db.collection('faqs').find({}).sort({ order: 1, createdAt: -1 }).toArray(),
      db.collection('events').find({}).sort({ order: 1, createdAt: -1 }).toArray(),
      db.collection('careers').find({}).sort({ order: 1, createdAt: -1 }).toArray(),
    ])

    return NextResponse.json({
      avatarList,
      brandList,
      innovationList,
      onlinePresenceList,
      creativeMindList: mapDocs(creativeMindDocs),
      WebResultTagList,
      startupPlanList,
      faqList: mapDocs(faqDocs),
      achievementsList,
      events: mapDocs(eventDocs),
      careers: mapDocs(careerDocs),
    })
  } catch (error) {
    console.error('page-data error', error)
    return NextResponse.json({ error: 'Failed to load page data' }, { status: 500 })
  }
}
