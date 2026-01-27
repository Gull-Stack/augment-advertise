/**
 * Augment & Advertise - Site Configuration
 * Edit this file to update site content without touching HTML
 */

const siteConfig = {
    // Business Information
    business: {
        name: "Augment & Advertise",
        tagline: "More patients. Fewer cancellations. Predictable growth.",
        description: "A boutique agency helping plastic surgeons transform their digital presence into a patient-generating machine.",
        phone: "801-787-5294",
        phoneFormatted: "(801) 787-5294",
        email: "hello@augmentadvertise.com",
        textCTA: "Text Josh",
        calendarLink: "#", // Add Google Calendar link
    },

    // Team Members
    team: {
        josh: {
            name: "Josh Cohen",
            title: "Chief Revenue Officer",
            experience: "15+ years",
            bio: "Josh has led sales teams as a CRO for over 15 years, turning underperforming practices into revenue machines. He understands that growth isn't about vanity metrics—it's about consultations booked and procedures performed.",
            expertise: ["Sales Leadership", "Revenue Operations", "Practice Growth", "Client Relations"]
        },
        bryce: {
            name: "Bryce Morgan",
            title: "Chief Marketing Officer",
            experience: "12+ years",
            bio: "Bryce approaches marketing with a business operations mindset—every dollar spent must drive measurable, sustainable growth. He's built marketing engines that scale practices predictably, not just campaigns that look good on paper.",
            expertise: ["Growth Marketing", "Business Operations", "Digital Strategy", "SEO & Content"]
        }
    },

    // Key Statistics
    stats: {
        consultationIncrease: {
            value: 22,
            suffix: "%",
            label: "Increase in consultations",
            context: "in month 3"
        },
        pricingAdvantage: {
            value: 90,
            suffix: "%",
            label: "More competitive",
            context: "than traditional agencies"
        },
        ceoExperience: {
            value: 15,
            suffix: "+",
            label: "Years CRO experience",
            context: "Josh Cohen"
        },
        cmoExperience: {
            value: 12,
            suffix: "+",
            label: "Years CMO experience",
            context: "Bryce Morgan"
        }
    },

    // Services
    services: {
        websites: {
            title: "Website Design & Development",
            shortTitle: "Websites",
            description: "World-class websites that convert visitors into consultations. Built specifically for plastic surgeons who understand that first impressions matter.",
            features: [
                "Custom design tailored to your practice",
                "Mobile-first, lightning-fast performance",
                "SEO-optimized from the ground up",
                "Easy content updates with our proprietary tools",
                "Before/after galleries that showcase your work",
                "HIPAA-compliant contact forms"
            ],
            icon: "website"
        },
        seo: {
            title: "SEO & Search Rankings",
            shortTitle: "SEO",
            description: "Dominate local search results. We get your practice in front of patients actively searching for procedures in your area.",
            features: [
                "Weekly SEO performance reports",
                "Local search optimization",
                "Google Business Profile management",
                "Content strategy & creation",
                "Technical SEO audits",
                "First-page ranking guarantee"
            ],
            icon: "search"
        },
        listings: {
            title: "Listings Management",
            shortTitle: "Listings",
            description: "Your practice information, accurate and optimized across every platform that matters. Google, Yelp, Healthgrades, RealSelf—we manage them all.",
            features: [
                "Google Business Profile optimization",
                "Review management & response",
                "Directory consistency across 50+ platforms",
                "Reputation monitoring",
                "Citation building",
                "Monthly performance reports"
            ],
            icon: "location"
        },
        texting: {
            title: "Proprietary Texting Solution",
            shortTitle: "Texting",
            description: "Let patients and prospects text your practice directly. Our custom-built solution integrates seamlessly with your workflow.",
            features: [
                "Two-way text messaging",
                "Automated appointment reminders",
                "Reduce no-shows and cancellations",
                "Text-to-book functionality",
                "Team inbox for your staff",
                "HIPAA-compliant messaging"
            ],
            icon: "message"
        },
        payments: {
            title: "Credit Card Processing",
            shortTitle: "Payments",
            description: "Stop overpaying on payment processing. Our solutions save practices hundreds of thousands of dollars annually.",
            features: [
                "Competitive processing rates",
                "No hidden fees",
                "Next-day deposits",
                "Patient financing options",
                "Seamless POS integration",
                "Dedicated support"
            ],
            icon: "credit-card"
        },
        social: {
            title: "Social Media Management",
            shortTitle: "Social",
            description: "Build your practice's social presence with content that educates, engages, and converts followers into patients.",
            features: [
                "Content creation & scheduling",
                "Instagram & Facebook management",
                "Before/after post optimization",
                "Engagement & community management",
                "Paid social advertising",
                "Performance analytics"
            ],
            icon: "social",
            comingSoon: true,
            launchDate: "March 2026"
        }
    },

    // Case Studies
    caseStudies: {
        perimeter: {
            name: "Perimeter Plastic Surgery",
            location: "Atlanta, GA",
            doctor: "Dr. Mark Deutsch",
            urlBefore: "https://www.perimeterplasticsurgery.com/",
            urlAfter: "https://brycedmorgan.github.io/perimeter-plastic-surgery/",
            stat: "+22%",
            statLabel: "consultations in month 3",
            beforeIssues: [
                "Cluttered, outdated design from 2015",
                "Overwhelming navigation with 50+ links",
                "No clear call-to-action",
                "Poor mobile experience",
                "Slow page load times",
                "No SEO optimization"
            ],
            afterWins: [
                "Clean, modern luxury aesthetic",
                "Clear conversion pathways",
                "Mobile-first responsive design",
                "Sub-2-second load times",
                "SEO-optimized structure",
                "Before/after gallery showcase"
            ]
        }
    },

    // Process Steps
    process: [
        {
            step: 1,
            title: "Text Us",
            description: "Reach out via text and tell us about your practice. We'll schedule a quick discovery call to understand your goals.",
            icon: "message"
        },
        {
            step: 2,
            title: "Free Audit",
            description: "We'll analyze your current digital presence and show you exactly where the opportunities are—no strings attached.",
            icon: "search"
        },
        {
            step: 3,
            title: "Custom Proposal",
            description: "Receive a tailored plan with clear pricing, timeline, and expected results. No cookie-cutter packages.",
            icon: "document"
        },
        {
            step: 4,
            title: "Launch & Grow",
            description: "We build, launch, and continuously optimize. You focus on patients while we drive predictable growth.",
            icon: "rocket"
        }
    ],

    // Value Propositions
    whyUs: [
        {
            title: "CRO + CMO Leadership",
            description: "Not junior account managers. You work directly with executives who've scaled practices before."
        },
        {
            title: "Business Operations Mindset",
            description: "We measure success in consultations booked and revenue generated—not impressions and likes."
        },
        {
            title: "Proprietary Technology",
            description: "Tools built specifically for plastic surgeons, not repurposed enterprise software."
        },
        {
            title: "Guaranteed Results",
            description: "We guarantee improved digital performance. If we don't deliver, you don't pay."
        },
        {
            title: "90% More Competitive",
            description: "Premium service at a fraction of traditional agency pricing. No bloated overhead."
        },
        {
            title: "Plastic Surgery Specialists",
            description: "We only work with plastic surgeons. Your industry, your patients, your challenges—we get it."
        }
    ],

    // Social Links
    social: {
        instagram: "#",
        linkedin: "#",
        facebook: "#"
    },

    // SEO Settings
    seo: {
        titleSuffix: " | Augment & Advertise",
        defaultDescription: "Augment & Advertise helps plastic surgeons transform their digital presence into a patient-generating machine. More patients. Fewer cancellations. Predictable growth.",
        keywords: "plastic surgery marketing, plastic surgeon website design, medical SEO, healthcare marketing agency, plastic surgery SEO, cosmetic surgery marketing"
    },

    // Colors (for reference)
    colors: {
        navy: "#2B3A42",
        gold: "#C9A227",
        cream: "#F5F3EE",
        white: "#FFFFFF",
        darkGray: "#1a1a1a",
        lightGray: "#8c939e"
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteConfig;
}
