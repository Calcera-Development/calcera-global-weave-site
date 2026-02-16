import { PhoneCall, BookOpen, LucideIcon, Target, Cpu, Layers, Sparkles } from "lucide-react";

export interface ProjectDetail {
    id: string;
    title: string;
    category: string;
    description: string;
    fullDescription: string;
    icon: LucideIcon;
    gradient: string;
    tag: string;
    technologies: string[];
    features: {
        title: string;
        description: string;
        icon: LucideIcon;
    }[];
    challenge: string;
    solution: string;
    impact: string[];
    images: {
        url: string;
        alt: string;
    }[];
}

export const projects: ProjectDetail[] = [
    {
        id: "callqa-insight",
        title: "CallQA Insight",
        category: "AI Customer Service QA",
        description: "An AI-driven web platform that analyzes and scores customer service calls.",
        fullDescription: "CallQA Insight is a cutting-edge enterprise solution designed to revolutionize quality assurance in high-volume call centers. By leveraging advanced Natural Language Processing (NLP) and Sentiment Analysis, the platform automatically transcribes, analyzes, and scores 100% of customer interactions. This eliminates the bottleneck of manual sampling and provides management with a comprehensive view of CSR performance, compliance adherence, and customer sentiment trends.",
        icon: PhoneCall,
        gradient: "from-orange-500 to-rose-500",
        tag: "AI / Analytics",
        technologies: ["React", "TypeScript", "Python (FastAPI)", "OpenAI GPT-4", "Whisper v3", "Supabase", "Tailwind CSS"],
        features: [
            {
                title: "Automated Scoring",
                description: "AI evaluates every call against custom compliance and quality metrics, providing instant feedback.",
                icon: Target
            },
            {
                title: "Sentiment Mapping",
                description: "Visualizes the emotional journey of the customer throughout the conversation to identify pain points.",
                icon: Sparkles
            },
            {
                title: "Real-time Alerts",
                description: "Triggers immediate notifications for compliance breaches or high-priority escalations.",
                icon: Cpu
            },
            {
                title: "Trend Analytics",
                description: "Heatmaps and performance dashboards showing long-term improvements in CSAT scores.",
                icon: Layers
            }
        ],
        challenge: "Traditional QA teams could only listen to 1-2% of calls manually, leading to missed insights, biased performance reviews, and undetected compliance risks in high-stress financial and healthcare environments.",
        solution: "We built a scalable pipeline that ingests raw audio, applies noise reduction, transcribes using fine-tuned Whisper models, and uses LLMs to perform multi-dimensional scoring based on proprietary call-scripts.",
        impact: [
            "95% reduction in manual QA labor costs",
            "100% coverage of all customer interactions",
            "12% increase in average CSAT within 3 months",
            "Instant identification of training gaps for CSRs"
        ],
        images: [
            { url: "/placeholder.svg", alt: "CallQA Dashboard Overview" },
            { url: "/placeholder.svg", alt: "AI Analysis Detail View" }
        ]
    },
    {
        id: "ai-comic-book",
        title: "AI Comic Book",
        category: "AI Storybook for Kids",
        description: "A playful AI-powered storybook app where children become the main hero.",
        fullDescription: "AI Comic Book is a revolutionary edutainment platform that turns every child into the protagonist of their own epic adventure. By integrating facial recognition and generative AI, the app allows parents to upload a single photo of their child, which is then magically transformed into a consistent character across a range of beautifully illustrated stories. It's not just a book; it's a personalized digital legacy that encourages reading through deep personal engagement.",
        icon: BookOpen,
        gradient: "from-pink-500 to-purple-500",
        tag: "AI / E-commerce",
        technologies: ["Next.js", "Stable Diffusion XL", "FaceSwap API", "Stripe Connect", "React Three Fiber", "Tailwind CSS"],
        features: [
            {
                title: "Character Consistency",
                description: "Proprietary AI training ensures the child's likeness remains consistent across different artistic styles.",
                icon: Target
            },
            {
                title: "Interactive Storytelling",
                description: "Branching narratives where children can make choices that affect the outcome of their adventure.",
                icon: Sparkles
            },
            {
                title: "Print-on-Demand",
                description: "Seamless integration with global print partners to order high-quality physical copies.",
                icon: Cpu
            },
            {
                title: "AR Integration",
                description: "Augmented Reality features that bring the characters to life when viewing the physical book.",
                icon: Layers
            }
        ],
        challenge: "Existing personalized books only changed the name of the character. Creating a book that actually looks like the child required overcoming massive hurdles in AI character consistency and high-resolution rendering for print.",
        solution: "We developed a custom LoRA-based pipeline that trains a temporary model on the user's photo to generate high-fidelity, stylistically consistent images that meet 300 DPI print standards.",
        impact: [
            "Over 50,000 custom stories generated in year one",
            "4.9/5 Average User Rating on App Store",
            "Featured in 'Best Apps for Kids' 2024",
            "70% repeat purchase rate for seasonal story packs"
        ],
        images: [
            { url: "/placeholder.svg", alt: "AI Comic Book Mobile App" },
            { url: "/placeholder.svg", alt: "Personalized Story Preview" }
        ]
    }
];
