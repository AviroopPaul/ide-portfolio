/**
 * Single source of truth for portfolio data.
 * - profile: used on Home, About, Contact, Layout
 * - skills: used on About (grouped by category) and LLM
 * - fullStackCapabilities: used on Home "Full Stack Capabilities" section (parseable list)
 * - aiLlmExpertise: used on Home "AI / LLM Expertise" section (parseable list)
 * - experience, education: used on About and LLM
 * - projects: used on Projects page ("projects.json"), Admin, and LLM
 */
export const initialData = {
  profile: {
    name: "Aviroop Paul",
    role: "Applied AI + Full Stack Engineer",
    bio: "Senior Software Engineer specializing in scalable backend systems and LLM-powered applications. Experienced building agentic products, RAG pipelines, and AI at production.",
    email: "apavirooppaul10@gmail.com",
    phone: "+91-9831894596",
    website: "avirooppaul.online",
    github: "github.com/AviroopPaul",
    linkedin: "linkedin.com/in/avirooppaul",
    location: "Bengaluru, India",
    resume: "https://drive.google.com/file/d/1OnxrfVIUY-qNO3RPxEjoWrRXcExte4wT/view?usp=drive_link",
  },
  /** Display labels for Home "Full Stack Capabilities" – parseable array, no category filtering */
  fullStackCapabilities: [
    "React.js",
    "Next.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Google Cloud Platform",
  ],
  /** Display labels for Home "AI / LLM Expertise" – parseable array, no category filtering */
  aiLlmExpertise: [
    "LangChain",
    "LangGraph",
    "Google ADK",
    "Gemini API",
    "OpenAI API",
    "LiteLLM",
    "LiveKit",
    "LLMs",
  ],
  skills: [
    { name: "Python", level: 95, category: "Languages" },
    { name: "TypeScript", level: 90, category: "Languages" },
    { name: "FastAPI", level: 90, category: "Backend & AI" },
    { name: "Django", level: 85, category: "Backend & AI" },
    { name: "LangChain", level: 88, category: "Backend & AI" },
    { name: "LiveKit", level: 82, category: "Backend & AI" },
    { name: "Google ADK", level: 80, category: "Backend & AI" },
    { name: "LLMs", level: 85, category: "Backend & AI" },
    { name: "React.js", level: 85, category: "Frontend" },
    { name: "Next.js", level: 82, category: "Frontend" },
    { name: "PostgreSQL", level: 85, category: "Data & Infra" },
    { name: "MongoDB", level: 80, category: "Data & Infra" },
    { name: "Firestore", level: 78, category: "Data & Infra" },
    { name: "Docker", level: 88, category: "Data & Infra" },
    { name: "Kubernetes", level: 80, category: "Data & Infra" },
    { name: "Google Cloud Platform", level: 82, category: "Data & Infra" },
  ],
  experience: [
    {
      company: "Think41",
      location: "Bengaluru, India",
      title: "Senior Software Development Engineer",
      period: "May 2025 – Present",
      highlights: [
        "Led a 5-member engineering team to build a full-context contract evaluation system for SpotDraft (Series A, $50M funded), enabling clause compliance detection and deviation analysis, increasing accuracy from 65% to 85% compared to previous RAG pipeline.",
        "Built and productionized a scalable LLM evaluation framework using golden datasets (1000+ data points), deployed as a GitHub Actions pipeline to run randomized evaluations on every prompt and model change, enabling continuous validation, regression detection, and high-confidence PR merges for releases.",
        "Built a scalable obligation extraction system using LangChain to parse and analyze 100+ page contracts, leveraging intelligent chunking, fault-tolerant retries, and context preservation to reliably extract contractual obligations, directly enabling new client acquisitions.",
      ],
    },
    {
      company: "Think41",
      location: "Bengaluru, India",
      title: "Software Development Engineer - 1 (Founding Team)",
      period: "Jul 2024 – Apr 2025",
      highlights: [
        "Built a state-of-the-art agentic Chrome extension for Atomicwork (Series A, $25M funded), bringing AI agents directly onto the web with page-level context awareness.",
        "Enabled live voice calling (via LiveKit and Deepgram), screen sharing, and real-time agent collaboration, significantly improving IT issue resolution speed and opening new enterprise revenue opportunities.",
      ],
    },
    {
      company: "Nokia",
      location: "Bengaluru, India",
      title: "Software Development Intern",
      period: "Sept 2023 – Jun 2024",
      highlights: [
        "Developed scalable Django REST APIs for multi-tenant internal platforms, automating complex clone operations and improving operational efficiency by 2x.",
        "Implemented production-grade CI/CD pipelines using Docker and Kubernetes, ensuring zero-downtime deployments and strengthening system reliability across environments.",
      ],
    },
  ],
  education: [
    {
      institution: "Kalinga Institute of Industrial Technology (KIIT-DU)",
      location: "Bhubaneswar, India",
      degree: "B.Tech in Computer Science Engineering",
      details: "CGPA: 9.36/10",
      period: "2020 – 2024",
    },
    {
      institution: "Delhi Public School, Ruby Park",
      location: "Kolkata, India",
      degree: "CBSE (Science + Computer Science)",
      details: "94.2%",
      period: "2018 – 2020",
    },
  ],
  /** Used by Projects page ("projects.json"), Admin, and LLM. Each item: id, title, description, tech[], link, github */
  projects: [
    {
      id: 1,
      title: "Travel Lust",
      description: "Multi-agent travel app for finding everything when traveling to a place. Agentic travel assistant built with Google ADK—flights, hotels, visa rules, and optimized itineraries.",
      tech: ["Google ADK", "JavaScript", "LLM Agents"],
      link: "https://travel-lust-taxnvq53va-uc.a.run.app/trip",
      github: "https://github.com/AviroopPaul/travel-lust",
    },
    {
      id: 2,
      title: "Atlas AI",
      description: "Personal chatbot with all my files, built using RAG and intent-based query detection with Groq LLM. Private document retrieval with FastAPI, React, ChromaDB, BackBlaze, and Supabase.",
      tech: ["FastAPI", "React", "ChromaDB", "BackBlaze", "Supabase", "Groq"],
      link: "https://atlas-ai-production.up.railway.app/login",
      github: "https://github.com/AviroopPaul/atlas-ai",
    },
    {
      id: 3,
      title: "Best CV",
      description: "Curate your resume. Resume builder and curator app deployed on Cloud Run.",
      tech: ["TypeScript", "React", "Google Cloud Run"],
      link: "https://resumate-ai-820256992821.us-central1.run.app/",
      github: "https://github.com/AviroopPaul/best-cv",
    },
    {
      id: 4,
      title: "Noted",
      description: "Minimal notes. Lightweight note-taking app.",
      tech: ["TypeScript", "React", "Vercel"],
      link: "https://inoted.vercel.app",
      github: "https://github.com/AviroopPaul/noted",
    },
    {
      id: 5,
      title: "Fintrac",
      description: "Finances Tracking Platform. Track and manage your finances.",
      tech: ["TypeScript", "React", "Vercel"],
      link: "https://financetrac.vercel.app",
      github: "https://github.com/AviroopPaul/fintrac",
    },
  ],
};
