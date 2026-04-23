import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || '';
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}
const dbName = process.env.MONGODB_DB

const creativeMindSeed = [
  { image: '/images/home/creative/senth.png', name: 'Senthalan Vyravanathan', position: 'Software Engineer', linkedinLink: 'http://linkedin.com/in/senthvyra' },
  { image: '/images/home/creative/thenu.png', name: 'Thenujan Amirthanathan', position: 'Managing Director', linkedinLink: 'http://linkedin.com/in/thenujan-amirthanathan-52034a1b3' },
  { image: '/images/home/creative/thulaxan.png', name: 'Thulaxan Uthayakumar', position: 'Full Stack Developer', linkedinLink: 'http://linkedin.com/in/thulaxan' },
  { image: '/images/home/creative/andrew.png', name: 'Andrew Asher', position: 'Managing Director - UK Branch', linkedinLink: 'http://linkedin.com/in/andrew-asher' },
  { image: '/images/home/creative/sanje.png', name: 'Sanjeev Vijayaratnam', position: 'Human Resources Manager', linkedinLink: 'http://linkedin.com/in/sanjeevvijay' },
  { image: '/images/home/creative/thanu.png', name: 'Thanushan Vijayaratnam', position: 'DevOps Engineer - UK Branch', linkedinLink: 'http://linkedin.com/in/thanushanvijayaratnam' },
  { image: '/images/home/creative/thuve.png', name: 'Thuverakan Tharumakulasooriyan', position: 'Software Engineer', linkedinLink: 'https://www.linkedin.com/in/thuverakan10/' },
  { image: '/images/home/creative/niru.png', name: 'Niruthan Paranthaman', position: 'AI Software Engineer', linkedinLink: 'https://www.linkedin.com/in/niruthan-paranthaman/' },
  { image: '/images/home/creative/mithu.png', name: 'Mithunan Jeyamohan', position: 'Full-Stack & AI/ML Developer', linkedinLink: 'https://www.linkedin.com/in/mithunan-jeyamohan-26566328a/' },
  { image: '/images/home/creative/thiba.png', name: 'Thibakar Srisomaskanthan', position: 'AI/ML Engineer', linkedinLink: 'https://www.linkedin.com/in/thibakar-sri/' },
  { image: '/images/home/creative/pira.png', name: 'Pirakash Ravindran', position: 'UI/UX Designer', linkedinLink: 'https://www.linkedin.com/in/pirakash-ravindran-882a04315/' },
  { image: '/images/home/creative/abi.png', name: 'Abinaya Rajasekara', position: 'Software Engineer - UK Branch', linkedinLink: 'https://www.linkedin.com/in/abinaya-rajasekara-4905372a8/' },
  { image: '/images/home/creative/aji.png', name: 'Ajiththana Kalaiyarasan', position: 'Business Analyst', linkedinLink: 'https://www.linkedin.com/in/ak-agiththana/' },
  { image: '/images/home/creative/thiru.png', name: 'Thiruverakan Thirumal', position: 'AI/ML Engineer - UK Branch', linkedinLink: 'https://www.linkedin.com/in/thiruverakan-t-1877b52a8/' },
  { image: '/images/home/creative/kaja.png', name: 'Arunthavarajah Kajaraj', position: 'AI/ML Engineer - UK Branch', linkedinLink: 'https://www.linkedin.com/in/arunthavarajah-kajaraj/' },
  { image: '/images/home/creative/raj.png', name: 'Raj Puvan', position: 'Mentor', linkedinLink: 'http://linkedin.com/in/rajpuvan' },
]

const faqSeed = [
  { faq_que: 'What software development services does HABB offer?', faq_ans: 'HABB provides end-to-end software development including custom web applications, mobile apps (iOS/Android), cloud infrastructure, AI-driven solutions, UI/UX engineering, and cybersecurity implementation. We build scalable, production-ready systems tailored to your business needs.' },
  { faq_que: 'How long does a typical software project take?', faq_ans: 'Project timelines vary based on scope and complexity. An MVP typically takes 8-12 weeks, while enterprise-scale applications may require 4-6 months or more. We work in agile sprints to deliver incremental value and maintain flexibility throughout development.' },
  { faq_que: 'How is pricing structured at HABB?', faq_ans: 'We offer flexible engagement models including fixed-price projects, dedicated team arrangements, and time-and-materials contracts. Pricing is tailored to project scope, team composition, and delivery timeline. Contact us for a detailed proposal based on your requirements.' },
  { faq_que: 'Do you provide ongoing support after project delivery?', faq_ans: 'Yes, we provide comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements. We offer flexible maintenance packages to ensure your software remains secure, stable, and scalable as your business grows.' },
  { faq_que: 'What technologies and platforms does HABB work with?', faq_ans: 'We work with modern technology stacks including React, Next.js, Node.js, Python, cloud platforms (AWS, Azure, GCP), mobile frameworks (React Native, Flutter), and AI/ML tools. Our engineers select the optimal stack based on your project requirements and long-term scalability needs.' },
  { faq_que: 'How do you ensure software quality and security?', faq_ans: 'Quality is built into our process through code reviews, automated testing, continuous integration, and security audits. We follow industry best practices for secure development, implement data protection measures, and conduct thorough QA testing before every release.' },
]

const eventSeed = [
  {
    title: 'Jaffna Office Meetup 🚀',
    description: 'A great team meetup at our Jaffna office — unity, strategy, and fun!',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    link: 'https://habblanka.com/2025/06/25/habb-jaffna/',
  },
  {
    title: 'Vanta 25 Showcase 🚀',
    description: 'Proud to be part of Vanta 25 – celebrating innovation and tech!',
    image: 'https://images.unsplash.com/photo-1529333166433-4ddc0b5b9e9b',
    link: 'https://habblanka.com/2025/07/04/vanta-25-habb-phase-2-begins-a-new-era-of-product-driven-innovation/',
  },
  {
    title: 'Team HABB at SLIIT! 🚀',
    description: 'A productive discussion at SLIIT on our projects and growth!',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
    link: 'https://www.linkedin.com/company/habbinc',
  },
  {
    title: 'Exciting Beginnings! 🚀',
    description: 'Thrilled to announce the launch of HABB Software Company!',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    link: 'https://habblanka.com/2025/02/08/habb-launched/',
  },
  {
    title: 'Innovating at Northern Uni! 🚀',
    description: 'Discussing HABB’s vision and future impact with aspiring minds!',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
    link: 'https://habblanka.com/2025/02/16/habb-nothern-uni/',
  },
  {
    title: 'Guidance & mentorship 🚀',
    description: 'Guidance & mentorship shaping our journey at HABB!',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    link: 'https://www.linkedin.com/company/habbinc',
  },
]

const careerSeed = [
  {
    title: 'ML Engineer Internship',
    department: 'Habb AI Division',
    location: 'Hybrid',
    employmentType: 'Internship',
    summary: 'Hands-on exposure to AI/ML applications and client-driven projects with mentorship from experienced engineers.',
    applyLink: 'https://forms.gle/Dmn7ECe3vJv5TCz87',
    tags: ['Training-Oriented', 'Limited Slots'],
  },
  {
    title: 'Software Engineer Internship',
    department: 'Full-Stack Development',
    location: 'Hybrid',
    employmentType: 'Internship',
    summary: 'Designed for beginners and self-learners to understand how real-world web applications are built and deployed.',
    applyLink: 'https://forms.gle/QJk6WB7Gt8U1WNyJ6',
    tags: ['Training-Oriented', 'Limited Slots'],
  },
]

async function seed() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)

  await db.collection('teamMembers').deleteMany({})
  await db.collection('teamMembers').insertMany(creativeMindSeed.map((item) => ({ ...item, createdAt: new Date() })))

  await db.collection('faqs').deleteMany({})
  await db.collection('faqs').insertMany(faqSeed.map((item) => ({ ...item, createdAt: new Date() })))

  await db.collection('events').deleteMany({})
  await db.collection('events').insertMany(eventSeed.map((item) => ({ ...item, createdAt: new Date() })))

  await db.collection('careers').deleteMany({})
  await db.collection('careers').insertMany(careerSeed.map((item) => ({ ...item, createdAt: new Date() })))

  // eslint-disable-next-line no-console
  console.log('Seed complete')
  await client.close()
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
