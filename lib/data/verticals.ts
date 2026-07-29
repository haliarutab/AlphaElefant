import {
  Building2,
  GraduationCap,
  Cpu,
  Globe2,
  Handshake,
  Fingerprint,
  Shield,
  Network,
  BookOpen,
  Layout,
  Briefcase,
  Zap,
  Brain,
  Code,
  Cloud,
  BarChart3,
  Palette,
  Megaphone,
  ShoppingBag,
  Coins,
  Heart,
  Users,
  MessageSquare,
  Lightbulb
} from 'lucide-react'

export interface SubCategory {
  slug: string
  name: string
  tagline: string
  description: string
  offerings: string[]
  processSteps?: { title: string; desc: string }[]
  caseStudies?: { title: string; client: string; result: string }[]
  contactPerson?: { name: string; role: string; email: string }
}

export interface Vertical {
  slug: string
  name: string
  shortLabel: string
  tagline: string
  description: string
  iconName: string
  color: string
  accentColor: string
  subcategories: SubCategory[]
  stats?: { value: string; label: string }[]
}

export const lucideIconMap: Record<string, any> = {
  Building2,
  GraduationCap,
  Cpu,
  Globe2,
  Handshake,
  Fingerprint,
  Shield,
  Network,
  BookOpen,
  Layout,
  Briefcase,
  Zap,
  Brain,
  Code,
  Cloud,
  BarChart3,
  Palette,
  Megaphone,
  ShoppingBag,
  Coins,
  Heart,
  Users,
  MessageSquare,
  Lightbulb
}

const rawVerticals = [
  {
    name: 'Advisory & Business Consultancy',
    slug: 'advisory-business-consultancy',
    shortLabel: 'Advisory',
    iconName: 'Briefcase',
    color: '#E8500A',
    tagline: 'Business advisory, banking support and trade consultancy',
    description: 'Practical advisory support for business account setup, financing, trade operations and banking relationship management.',
    items: [
      {
        name: 'Account Opening',
        tagline: 'Corporate & Business Account Opening Services',
        description: 'End-to-end support for opening current, corporate, and merchant accounts with local and international banks.',
        offerings: [
          'Bank selection & account structuring advisory',
          'Documentation preparation & KYC/AML compliance support',
          'Liaison with bank relationship managers',
          'Multi-currency & offshore account facilitation'
        ]
      },
      {
        name: 'Business Loans',
        tagline: 'Business Financing & Loan Advisory',
        description: 'Advisory on securing working capital, term loans, and trade finance facilities matched to your business profile.',
        offerings: [
          'Loan eligibility assessment & lender matching',
          'Financial documentation & business plan support',
          'Working capital & term loan structuring',
          'Negotiation support on rates & collateral terms'
        ]
      },
      {
        name: 'Trade Advisory',
        tagline: 'Import/Export & Trade Finance Advisory',
        description: 'Guidance on trade compliance, documentation, and finance instruments for cross-border transactions.',
        offerings: [
          'Letter of Credit (LC) & bank guarantee structuring',
          'Import/export documentation & compliance advisory',
          'Trade finance facility sourcing',
          'Risk mitigation for cross-border transactions'
        ]
      },
      {
        name: 'Banking Consultancy',
        tagline: 'General Banking & Relationship Consultancy',
        description: 'Ongoing consultancy for businesses managing multiple banking relationships and facility optimization.',
        offerings: [
          'Banking facility review & optimization',
          'Regulatory & compliance issue resolution',
          'Multi-bank relationship management',
          'Credit line & facility renewal support'
        ]
      }
    ]
  },
  {
    name: 'E‑Commerce & Marketplaces',
    slug: 'ecommerce-marketplaces',
    shortLabel: 'E‑Commerce',
    iconName: 'ShoppingBag',
    color: '#E8500A',
    tagline: 'Build, scale and operate online storefronts and marketplaces',
    description: 'Build, scale and operate online storefronts, marketplaces, payments and fulfillment for higher conversion and reliability.',
    items: [
      {
        name: 'Online Stores',
        tagline: 'Custom Online Store Development',
        description: 'We design, build, and launch branded online stores on platforms like Shopify, WooCommerce, and Magento, or fully custom builds — optimized for conversions and mobile shopping.',
        offerings: [
          'Conversion-focused storefront design',
          'Platform setup (Shopify / WooCommerce / Magento / custom)',
          'Catalog architecture & SEO-friendly product structuring',
          'Checkout experience & funnel optimization'
        ]
      },
      {
        name: 'CRM Integration',
        tagline: 'Customer Relationship Management Integration',
        description: 'We connect your store to CRM systems so customer data, orders, and support flow into one place — enabling better retention and personalized marketing.',
        offerings: [
          'CRM platform setup & data mapping',
          'Customer journey automation & retention flows',
          'Lifecycle segmentation & campaign orchestration',
          'Order and support data sync across systems'
        ]
      },
      {
        name: 'Logistics Solutions',
        tagline: 'Fulfillment & Shipping Logistics',
        description: 'We set up and manage shipping, courier integrations, and fulfillment workflows so orders move from cart to doorstep reliably and on time.',
        offerings: [
          'Courier & 3PL integration',
          'Shipping rules & rate configuration',
          'Order tracking & delivery notifications',
          'Returns & reverse logistics orchestration'
        ]
      },
      {
        name: 'Inventory Systems',
        tagline: 'Inventory Management Systems',
        description: 'We implement inventory tracking systems that sync stock across channels in real time, reducing overselling and stockouts.',
        offerings: [
          'Real-time stock synchronization',
          'Low-stock alerts & replenishment automation',
          'Warehouse & SKU management',
          'Inventory planning & reporting dashboards'
        ]
      },
      {
        name: 'Marketplace Integration',
        tagline: 'Marketplace Listing & Integration',
        description: 'We list and sync your products across marketplaces like Amazon, Daraz, and Noon so you can sell everywhere from one back-end.',
        offerings: [
          'Marketplace onboarding & listing setup',
          'Catalog sync & feed management',
          'Cross-platform order handling',
          'Marketplace policy & compliance support'
        ]
      },
      {
        name: 'Payment Integration',
        tagline: 'Payment Gateway Integration',
        description: 'We integrate secure, locally-relevant payment gateways into your store — covering cards, wallets, and cash-on-delivery workflows.',
        offerings: [
          'Gateway setup & local payment method support',
          'Multi-currency & wallet support',
          'Checkout security & PCI readiness',
          'Fraud rules & payment recovery workflows'
        ]
      }
    ]
  },
  {
    name: 'Digital Marketing & Growth',
    slug: 'digital-marketing-growth',
    shortLabel: 'Marketing',
    iconName: 'Megaphone',
    color: '#E8500A',
    tagline: 'Performance marketing, organic growth and brand strategy',
    description: 'Performance marketing, organic growth and brand strategy that scale acquisition and retention.',
    items: [
      {
        name: 'Paid Media & Performance',
        tagline: 'Paid Advertising & Performance Marketing',
        description: 'We plan and run paid campaigns across Google, Meta, and other platforms — optimized continuously for lower cost-per-acquisition and higher ROI.',
        offerings: [
          'Performance strategy & budget planning',
          'Google / Meta / LinkedIn campaign execution',
          'Creative testing & landing page optimization',
          'Attribution reporting & ROI analysis'
        ]
      },
      {
        name: 'Social & Community',
        tagline: 'Social Media Marketing & Community Growth',
        description: 'We manage content, engagement, and growth across your social channels to build brand presence and a loyal audience.',
        offerings: [
          'Content calendars & creative production',
          'Community engagement & moderation',
          'Creator & influencer coordination',
          'Social listening & audience growth strategy'
        ]
      },
      {
        name: 'SEO & Content',
        tagline: 'Search Engine Optimization',
        description: 'We improve your website\'s visibility on search engines through technical SEO, content strategy, and link building for sustainable organic growth.',
        offerings: [
          'Technical SEO audits & fixes',
          'Keyword mapping & editorial strategy',
          'On-page & off-page optimization',
          'Content performance reporting & iteration'
        ]
      },
      {
        name: 'Brand Strategy & Creative',
        tagline: 'Brand Strategy & Identity',
        description: 'We craft brand identities and positioning strategies that make your business memorable and consistent across every touchpoint.',
        offerings: [
          'Brand positioning & messaging',
          'Visual identity & design systems',
          'Campaign creative development',
          'Brand governance & consistency audits'
        ]
      }
    ]
  },
  {
    name: 'Energy & Power Solutions',
    slug: 'energy-power-solutions',
    shortLabel: 'Energy',
    iconName: 'Zap',
    color: '#E8500A',
    tagline: 'Solar, backup power, fuel and maintenance solutions',
    description: 'Solar, backup power, fuel and maintenance solutions to keep operations running reliably.',
    items: [
      {
        name: 'Diesel Supply',
        tagline: 'Diesel Fuel Supply Services',
        description: 'Reliable, scheduled diesel supply for generators and industrial equipment, with quality assurance and on-time delivery.',
        offerings: [
          'Scheduled fuel supply & refueling planning',
          'Fuel quality testing & assurance',
          'Bulk contracts & emergency dispatch',
          'Generator-ready delivery coordination'
        ]
      },
      {
        name: 'Solar System',
        tagline: 'Solar Power System Installation',
        description: 'Design, supply, and installation of solar power systems sized to your energy needs — reducing reliance on grid power and cutting long-term costs.',
        offerings: [
          'Site assessment & system sizing',
          'On-grid / off-grid / hybrid implementation',
          'Panel, inverter & battery integration',
          'Performance monitoring & maintenance'
        ]
      },
      {
        name: 'Battery Backup',
        tagline: 'Battery Backup & UPS Solutions',
        description: 'Battery backup systems that keep critical operations running through power outages, sized and configured for your load requirements.',
        offerings: [
          'Load analysis & battery sizing',
          'UPS / inverter installation',
          'Maintenance planning & monitoring',
          'Backup automation & resilience design'
        ]
      },
      {
        name: 'Generator Supply',
        tagline: 'Generator Supply & Installation',
        description: 'Supply and installation of diesel and gas generators sized for residential, commercial, and industrial power needs.',
        offerings: [
          'Load-based generator specification',
          'Delivery, installation & commissioning',
          'Automatic transfer switch setup',
          'Testing & performance validation'
        ]
      },
      {
        name: 'Annual Maintenance Contract',
        tagline: 'Annual Maintenance Contracts (AMC)',
        description: 'Scheduled maintenance contracts for generators, solar systems, and backup power equipment to maximize uptime and equipment lifespan.',
        offerings: [
          'Preventive maintenance scheduling',
          'Emergency breakdown response',
          'Spare parts planning',
          'Asset performance reporting'
        ]
      }
    ]
  },
  {
    name: 'Education & Training',
    slug: 'education-training',
    shortLabel: 'Education',
    iconName: 'GraduationCap',
    color: '#E8500A',
    tagline: 'Career-focused training programs',
    description: 'Career-focused training programs in tech, FinTech, design and professional skills.',
    items: [
      {
        name: 'FinTech Programs',
        tagline: 'Financial Technology Training Programs',
        description: 'Practical training in financial technology — covering digital banking, payments, and financial systems for careers in the fast-growing FinTech sector.',
        offerings: [
          'Digital banking & payments fundamentals',
          'FinTech regulatory & compliance basics',
          'Hands-on projects with real financial systems',
          'Career mentorship & industry connections'
        ]
      },
      {
        name: 'Soft Skills',
        tagline: 'Professional Soft Skills Training',
        description: 'Training in communication, leadership, and workplace skills that complement technical ability and prepare learners for professional environments.',
        offerings: [
          'Communication & presentation skills',
          'Leadership & team management training',
          'Interview preparation & professional etiquette',
          'Time management & workplace productivity'
        ]
      },
      {
        name: 'AI & Data Science',
        tagline: 'AI & Data Science Training',
        description: 'In-depth programs covering machine learning, data science, deep learning (computer vision & NLP), generative AI, and agentic AI systems.',
        offerings: [
          'Machine learning & data science fundamentals',
          'Deep learning specialization (Computer Vision & NLP)',
          'Generative AI & prompt engineering',
          'Agentic AI systems & applied projects'
        ]
      },
      {
        name: 'Graphic Designing',
        tagline: 'Graphic Design & UI/UX Training',
        description: 'Training in visual design, UI/UX principles, and branding — building portfolio-ready skills for design careers.',
        offerings: [
          'UI/UX design fundamentals & tools',
          'Branding & visual identity design',
          'Portfolio development & real-world projects',
          'Design tools mastery (Figma, Adobe Suite)'
        ]
      },
      {
        name: 'Full Stack Development',
        tagline: 'Full Stack Web Development Training',
        description: 'Comprehensive training covering both frontend and backend development, preparing learners to build complete, production-ready web applications.',
        offerings: [
          'Frontend development (HTML, CSS, JavaScript, frameworks)',
          'Backend development (APIs, databases, server logic)',
          'Full-stack project building & deployment',
          'Version control & collaborative workflows'
        ]
      },
      {
        name: 'AI Automation',
        tagline: 'AI Automation Training',
        description: 'Training focused on using AI tools and automation platforms to streamline business workflows and processes.',
        offerings: [
          'Workflow automation tools & platforms',
          'AI-powered process design',
          'Integration of AI agents into business operations',
          'Practical automation project building'
        ]
      },
      {
        name: 'E-Commerce Services',
        tagline: 'E-Commerce Store Development',
        description: 'End-to-end e-commerce services for building, optimizing, and managing online stores and marketplace operations.',
        offerings: [
          'E-Commerce Fundamentals',
          'Store Development & Architecture',
          'Shopify Development',
          'WooCommerce Development',
          'Custom E-Commerce Solutions',
          'Store Design & UI/UX',
          'Product & Catalog Management',
          'Payment & Checkout Systems',
          'Shipping & Logistics Management',
          'Marketplace Management',
          'Maintenance & Support'
        ]
      }
    ]
  },
  {
    name: 'Travel & Mobility',
    slug: 'travel-mobility',
    shortLabel: 'Mobility',
    iconName: 'Globe2',
    color: '#E8500A',
    tagline: 'Corporate travel, visa and mobility solutions',
    description: 'Corporate travel, visa and mobility solutions with reliable booking and policy controls.',
    items: [
      {
        name: 'Hotel Reservations',
        tagline: 'Hotel Booking & Reservation Services',
        description: 'We handle hotel reservations for individual travelers and corporate teams, negotiating rates and ensuring smooth check-in experiences.',
        offerings: [
          'Global hotel booking & rate negotiation',
          'Corporate rate agreements',
          'Group booking coordination',
          '24/7 booking support & itinerary changes'
        ]
      },
      {
        name: 'Corporate Travel Plans',
        tagline: 'Corporate Travel Management',
        description: 'End-to-end corporate travel management — from policy setup to booking and expense tracking — designed to keep business travel efficient and cost-controlled.',
        offerings: [
          'Travel policy design & approval control',
          'Centralized booking management',
          'Expense tracking & reporting',
          'Dedicated travel operations support'
        ]
      },
      {
        name: 'Visa Processing',
        tagline: 'Visa Application & Processing Services',
        description: 'We manage visa applications end-to-end — documentation, submission, and follow-up — to reduce delays and rejections.',
        offerings: [
          'Visa eligibility & documentation guidance',
          'Application submission & tracking',
          'Embassy liaison & appointment scheduling',
          'Business & tourist visa processing'
        ]
      },
      {
        name: 'International Flights',
        tagline: 'International Flight Booking',
        description: 'We source and book international flights at competitive fares, managing itineraries for individual and group travel.',
        offerings: [
          'Multi-city itinerary planning',
          'Competitive fare sourcing',
          'Corporate & group flight bookings',
          'Rebooking & disruption support'
        ]
      },
      {
        name: 'Domestic Air Tickets',
        tagline: 'Domestic Flight Booking',
        description: 'Fast, reliable domestic flight booking for individuals and businesses, with support for schedule changes and cancellations.',
        offerings: [
          'Fast domestic booking & search',
          'Travel account setup & approvals',
          'Schedule change handling',
          'Bulk booking support for teams & events'
        ]
      }
    ]
  },
  {
    name: 'Product Engineering & Cloud',
    slug: 'product-engineering-cloud',
    shortLabel: 'Digital Products',
    iconName: 'Cpu',
    color: '#E8500A',
    tagline: 'Product design, engineering, AI and cloud operations',
    description: 'Product design, engineering, AI and cloud operations for scalable software and SaaS.',
    items: [
      {
        name: 'Web & Mobile Apps',
        tagline: 'Custom Web Application Development',
        description: 'We design and build scalable, secure web applications tailored to your business processes and user needs.',
        offerings: [
          'Custom architecture & product strategy',
          'Responsive UI/UX implementation',
          'API integrations & third-party connectivity',
          'Testing, deployment & ongoing support'
        ]
      },
      {
        name: 'Mobile Application',
        tagline: 'Mobile App Development (iOS & Android)',
        description: 'We build native and cross-platform mobile apps that deliver smooth performance and a great user experience.',
        offerings: [
          'iOS / Android development',
          'Mobile UX & interface design',
          'Store submission & release management',
          'Analytics, updates & app maintenance'
        ]
      },
      {
        name: 'Game Development',
        tagline: 'Game Development Services',
        description: 'We develop 2D and 3D games across platforms, from concept and design through to launch and post-release support.',
        offerings: [
          'Game concept & design',
          '2D/3D development (Unity / Unreal)',
          'Multiplayer & backend integration',
          'Launch support & optimization'
        ]
      },
      {
        name: 'UI/UX Design',
        tagline: 'Product UI/UX Design',
        description: 'We design intuitive, user-centered interfaces for web and mobile products, backed by research and usability testing.',
        offerings: [
          'User research & journey mapping',
          'Wireframing & prototyping',
          'Visual design systems',
          'Usability testing & iteration'
        ]
      },
      {
        name: 'Backend Development',
        tagline: 'Backend & API Development',
        description: 'We build robust, scalable backend systems and APIs that power your applications reliably under real-world load.',
        offerings: [
          'Backend architecture & database design',
          'REST / GraphQL API development',
          'Authentication & security implementation',
          'Performance optimization & scaling'
        ]
      },
      {
        name: 'Cloud Solutions',
        tagline: 'Cloud Infrastructure & Solutions',
        description: 'We design and manage cloud infrastructure that is secure, scalable, and cost-optimized for your workloads.',
        offerings: [
          'Cloud architecture design (AWS / Azure / GCP)',
          'Migration & modernization',
          'CI/CD & infrastructure automation',
          'Monitoring, security & cost optimization'
        ]
      },
      {
        name: 'AI Bots & Agents',
        tagline: 'AI Bots & Autonomous Agents',
        description: 'We build AI-powered chatbots and autonomous agents that automate customer support, sales, and internal workflows.',
        offerings: [
          'Conversational bot design',
          'Agent workflow orchestration',
          'Business system integration',
          'Training & continuous improvement'
        ]
      },
      {
        name: 'SAAS Products',
        tagline: 'SaaS Product Development',
        description: 'We design, build, and launch multi-tenant SaaS products from idea to production, with billing, onboarding, and scaling built in.',
        offerings: [
          'SaaS platform architecture',
          'Subscription & billing integration',
          'Onboarding & account management',
          'Scalable infrastructure setup'
        ]
      },
      {
        name: 'AI Powered SAAS Products',
        tagline: 'AI-Powered SaaS Product Development',
        description: 'We build SaaS products with AI capabilities embedded at the core — from intelligent features to fully AI-driven product experiences.',
        offerings: [
          'AI feature design & model integration',
          'LLM & AI API integration',
          'Workflow automation within the product',
          'Scalable AI infrastructure & cost management'
        ]
      }
    ]
  },
  {
    name: 'Infrastructure & Engineering',
    slug: 'infrastructure-engineering',
    shortLabel: 'Infrastructure',
    iconName: 'Building2',
    color: '#E8500A',
    tagline: 'Construction, structural engineering and facility services',
    description: 'Construction, structural engineering and facility services to deliver durable, compliant spaces.',
    items: [
      {
        name: 'Building Construction',
        tagline: 'Building Construction Services',
        description: 'Full-scope construction services for residential, commercial, and industrial buildings, from ground-breaking to handover.',
        offerings: [
          'Project planning & site coordination',
          'Civil & structural delivery',
          'Material sourcing & quality control',
          'Compliance & handover documentation'
        ]
      },
      {
        name: 'Structural Engineering',
        tagline: 'Structural Engineering Services',
        description: 'Structural design and analysis services ensuring buildings are safe, code-compliant, and built to last.',
        offerings: [
          'Structural analysis & design',
          'Code-compliant engineering',
          'Drawings & documentation',
          'Site inspection & audits'
        ]
      },
      {
        name: 'Facility Maintenance',
        tagline: 'Facility Maintenance Services',
        description: 'Ongoing maintenance services that keep buildings and facilities operating safely, efficiently, and in good condition.',
        offerings: [
          'Preventive maintenance scheduling',
          'Electrical, plumbing & HVAC servicing',
          'Emergency repair response',
          'Asset reporting & planning'
        ]
      },
      {
        name: 'Interior Fit‑Out',
        tagline: 'Interior Fit-Out Services',
        description: 'Complete interior fit-out services for offices, retail, and commercial spaces — from design through to final finishing.',
        offerings: [
          'Space planning & fit-out design',
          'MEP & installation works',
          'Finishes, furniture & final detailing',
          'Project delivery & handover'
        ]
      },
      {
        name: 'Commercial Renovation',
        tagline: 'Commercial Renovation Services',
        description: 'Renovation and refurbishment of commercial spaces with minimal disruption to ongoing business operations.',
        offerings: [
          'Renovation planning & phased execution',
          'Structural & cosmetic upgrades',
          'Compliance updates & code alignment',
          'Minimal-disruption project delivery'
        ]
      }
    ]
  },
  {
    name: 'Blockchain & Web3',
    slug: 'blockchain-web3',
    shortLabel: 'Blockchain',
    iconName: 'Network',
    color: '#E8500A',
    tagline: 'Smart contracts, DApps, tokenization and blockchain strategy',
    description: 'Smart contracts, DApps, tokenization and blockchain strategy for real-world applications.',
    items: [
      {
        name: 'Smart Contract Development',
        tagline: 'Smart Contract Development Services',
        description: 'We design, develop, and test smart contracts for use cases like payments, escrow, and automated agreements — built to be secure and gas-efficient.',
        offerings: [
          'Custom contract design & implementation',
          'Multi-chain deployment',
          'Gas optimization & security tuning',
          'Testing & audit preparation'
        ]
      },
      {
        name: 'Blockchain Consulting',
        tagline: 'Blockchain Strategy & Consulting',
        description: 'We help businesses evaluate where blockchain genuinely adds value and design a practical roadmap for adoption.',
        offerings: [
          'Use-case evaluation & feasibility studies',
          'Architecture & platform selection',
          'Compliance advisory',
          'Implementation roadmap & vendor coordination'
        ]
      },
      {
        name: 'Web3 & DApp Development',
        tagline: 'Web3 & Decentralized Application Development',
        description: 'We build decentralized applications (DApps) with wallet integration and on-chain functionality for a range of industries.',
        offerings: [
          'DApp frontend & smart contract integration',
          'Wallet connectivity & onboarding',
          'Decentralized storage integration',
          'Cross-chain interoperability'
        ]
      },
      {
        name: 'Tokenization & NFT Solutions',
        tagline: 'Tokenization & NFT Development',
        description: 'We develop token and NFT solutions — from asset tokenization to NFT marketplaces — with standards-compliant, secure contracts.',
        offerings: [
          'Token & NFT development',
          'Asset tokenization strategy',
          'Marketplace development',
          'Minting, metadata & royalty configuration'
        ]
      },
      {
        name: 'Blockchain Security Audits',
        tagline: 'Smart Contract & Blockchain Security Audits',
        description: 'We audit smart contracts and blockchain systems to identify vulnerabilities before deployment, protecting funds and reputation.',
        offerings: [
          'Manual & automated smart contract audits',
          'Vulnerability analysis & remediation',
          'Security reporting & guidance',
          'Post-deployment monitoring setup'
        ]
      },
      {
        name: 'Crypto Wallet & Exchange Development',
        tagline: 'Crypto Wallet & Exchange Platform Development',
        description: 'We build secure custodial and non-custodial wallets, and exchange platforms with trading, liquidity, and compliance features.',
        offerings: [
          'Wallet architecture & development',
          'Exchange platform & matching engine',
          'KYC/AML compliance integration',
          'Liquidity & trading pair management'
        ]
      }
    ]
  }
]

export const verticalsData: Vertical[] = rawVerticals.map((v, index) => ({
  slug: v.slug,
  name: v.name,
  shortLabel: v.shortLabel,
  tagline: v.tagline,
  description: v.description,
  iconName: v.iconName,
  color: v.color,
  accentColor: `${v.color}1a`, // 10% opacity in hex
  stats: [
    { value: `${90 + (index % 10)}%`, label: "Client Satisfaction" },
    { value: `${5 + (index % 5)}x`, label: "Efficiency Boost" },
    { value: "24/7", label: "Operations Support" }
  ],
  subcategories: v.items.map((item: any) => {
    if (typeof item === 'string') {
      return {
        slug: item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name: item,
        tagline: `Enterprise-grade ${item} systems`,
        description: `Deploy custom, highly-scalable solutions for ${item} to streamline your operations and drive digital growth.`,
        offerings: [
          `Custom ${item} architecture & consulting`,
          `API integrations & custom pipelines`,
          `Performance optimization & support`,
          `Security-first deployment & compliance audits`
        ]
      }
    }

    // item is an object with richer fields
    return {
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: item.name,
      tagline: item.tagline || `Enterprise-grade ${item.name} systems`,
      description: item.description || `Detailed services for ${item.name}.`,
      offerings: item.offerings || [
        `Custom ${item.name} architecture & consulting`,
        `API integrations & custom pipelines`,
        `Performance optimization & support`,
        `Security-first deployment & compliance audits`
      ]
    }
  })
}))
