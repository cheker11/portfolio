export const PERSONAL_INFO = {
  name: "Arina Chekotun",
  title: "IT Developer, Startup Founder & Web Designer",
  location: "Kherson / Odesa, Ukraine",
  birthDate: "April 11, 2008",
  gender: "Female",
  nationality: "Ukrainian",
  email: "11cheker11@gmail.com",
  phone: "Available upon request",
  github: "https://github.com/cheker11",
  linkedin: "https://www.linkedin.com/in/arinachekotun/",
  instagram: "https://www.instagram.com/11_cheker_11/",
  instagramHandle: "11_cheker_11",
  bio: "Purposeful, persistent, open to new knowledge, proactive, and creative. IT Developer, Founder, and Designer building innovative products in the EdTech and PetTech sectors. Creator of educational computer science courses, interactive learning platforms, and pet care tech solutions alongside custom web design, ad banners, and logos.",
  availability: "Open for EdTech & PetTech Collaborations, Startups & Tech Projects",
  experienceYears: "3+ Years",
  shippedProjects: "15+ Projects",
  targetEmail: "11cheker11@gmail.com",
  languages: [
    { name: "Ukrainian", level: "Native / Carrier" },
    { name: "English", level: "B1 Confirmed (Moving to B2)" }
  ],
  traits: [
    "EdTech & PetTech Founder",
    "IT Developer & Web Designer",
    "Proactive & Leadership-Oriented",
    "Creative & Innovative Mindset"
  ]
};

export const MISSION_PILLARS = [
  {
    number: "01",
    title: "Innovating in EdTech & PetTech",
    description: "Developing modern web products, interactive educational platforms, and smart pet care technology solutions that solve real everyday problems."
  },
  {
    number: "02",
    title: "Empowering Beginners in IT",
    description: "Authoring accessible courses and learning platforms for computer science newcomers to build confidence, practical skills, and tech literacy."
  },
  {
    number: "03",
    title: "Creating High-Impact Design",
    description: "Combining technical logic with visual art—crafting responsive UIs in Figma, engaging presentations, ad banners, and cohesive brand identities."
  }
];

export const SKILL_CATEGORIES = [
  {
    id: "programming-dev",
    number: "01",
    title: "PROGRAMMING & WEB DEVELOPMENT",
    subtitle: "Software, Web Systems & Code Quality",
    description: "Building functional web platforms, algorithms, and interactive applications.",
    skills: [
      {
        name: "Python",
        level: 60,
        experienceYears: "Active Development",
        description: "Bot development, script automation, data processing, and beginner course creation.",
        highlight: "Built custom Telegram chatbots and automated workflows."
      },
      {
        name: "HTML5 & CSS3",
        level: 95,
        experienceYears: "Core Specialty",
        description: "Semantic HTML layout structure, responsive flexbox/grid styling, cross-browser compatibility.",
        highlight: "Engineered responsive websites and interactive learning pages."
      },
      {
        name: "JavaScript (JS)",
        level: 40,
        experienceYears: "Ongoing Mastery",
        description: "DOM manipulation, dynamic UI logic, API integration, and algorithmic problem solving.",
        highlight: "FreeCodeCamp JS Certification in active progress."
      },
      {
        name: "Tailwind CSS & Bootstrap",
        level: 88,
        experienceYears: "Modern Styling",
        description: "Utility-first CSS, rapid UI prototyping, mobile-responsive grid frameworks.",
        highlight: "Designed clean, high-contrast web interfaces."
      },
      {
        name: "Git & GitHub",
        level: 82,
        experienceYears: "Version Control",
        description: "Repository management, code commits, branch workflow, open-source hosting.",
        highlight: "Active project portfolio hosted on GitHub."
      },
      {
        name: "C++",
        level: 30,
        experienceYears: "Foundational Logic",
        description: "Object-oriented concepts, algorithmic logic, data structures.",
        highlight: "Studied core software engineering foundations."
      }
    ]
  },
  {
    id: "design-creative",
    number: "02",
    title: "DESIGN & CREATIVE TOOLKIT",
    subtitle: "UI/UX, Visual Branding & Media",
    description: "Translating ideas into beautiful visual designs, presentations, and marketing banners.",
    skills: [
      {
        name: "Figma (UI/UX)",
        level: 92,
        experienceYears: "Primary Design Tool",
        description: "Wireframing, interactive prototyping, web layout architecture, design system basics.",
        highlight: "Created full website mockups and startup pitch decks."
      },
      {
        name: "Canva & Graphics Design",
        level: 100,
        experienceYears: "Graphic Production",
        description: "Advertising banners, social media marketing assets, presentation decks, logo design.",
        highlight: "Delivered 50+ banners and presentations for freelance clients."
      },
      {
        name: "AI Instruments & Tools",
        level: 90,
        experienceYears: "AI Integration",
        description: "Prompt engineering, Gemini, ChatGPT, AI image & copy generation tools.",
        highlight: "Google Artificial Intelligence Professional Certificate in progress."
      },
      {
        name: "CapCut (Video Editing)",
        level: 85,
        experienceYears: "Media Production",
        description: "Short-form video editing, visual effects, social media content creation.",
        highlight: "Produced promotional videos for SMM and startups."
      },
      {
        name: "Microsoft Office Suite (Word / Excel / PowerPoint)",
        level: 92,
        experienceYears: "Document Mastery",
        description: "Structured document preparation, spreadsheet analytics, custom presentation design.",
        highlight: "Assisted clients with complex document formatting."
      }
    ]
  }
];

export const PROJECT_CATEGORIES_CONFIG = [
  {
    id: "github",
    title: "1. GitHub Web Sites",
    titleRu: "Сайты с GitHub",
    icon: "code-2",
    description: "Live interactive websites, educational platforms, and Python services hosted on GitHub."
  },
  {
    id: "figma",
    title: "2. Figma Designs",
    titleRu: "Работы в Figma",
    icon: "figma",
    description: "UI/UX prototypes, mobile/web interfaces, presentation pitch decks, and ad banner graphics."
  },
  {
    id: "startups",
    title: "3. Startups & Innovations",
    titleRu: "Стартапы & Проекты",
    icon: "rocket",
    description: "Tech startup innovations, PetTech ecosystems, and EdTech ventures presented at national competitions."
  }
];

export const PROJECTS = [
  // ----------------------------------------------------
  // CATEGORY 1: GITHUB WEB SITES
  // ----------------------------------------------------
  {
    id: "github-cs-platform",
    title: "IT CS & Web Learning Platform",
    subtitle: "Interactive Educational Website",
    category: "github",
    categoryLabel: "GitHub Web Sites",
    description: "An original website and structured curriculum created to teach computer science and web development fundamentals to beginners.",
    longDescription: "Engineered from scratch using HTML5, CSS3, JavaScript, and Python backend scripts. Includes modular lessons, code practice environments, and responsive interactive design.",
    image: "./projects/github_site_1.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Code Base", value: "HTML/JS/Py" },
      { label: "Target Audience", value: "IT Beginners" },
      { label: "Repository", value: "GitHub Public" }
    ],
    tags: ["HTML5/CSS3", "JavaScript", "Python", "Educational Web"],
    githubUrl: "https://github.com/cheker11",
    liveUrl: "https://cheker11.github.io/portfolio/",
    highlights: [
      "Authored original curriculum for computer science newcomers.",
      "Designed high-contrast readable UI tailored for learning.",
      "Published and version-controlled on GitHub Pages."
    ]
  },
  {
    id: "github-portfolio-app",
    title: "Personal Interactive Web Portfolio",
    subtitle: "High-Performance SPA & Dual-Mode Hub",
    category: "github",
    categoryLabel: "GitHub Web Sites",
    description: "Responsive portfolio hub featuring dual View Modes (Interactive Website & Slide Deck), built with modern web technologies.",
    longDescription: "Custom built with vanilla JS and Vite, featuring editorial typographic hierarchy, dynamic filtering, server communication endpoints, and adaptive mobile layout.",
    image: "./projects/github_site_2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Tech Stack", value: "Vite + JS + CSS" },
      { label: "Responsiveness", value: "Mobile/Desktop" },
      { label: "Deployment", value: "GitHub Pages" }
    ],
    tags: ["Vite", "JavaScript", "Tailwind CSS", "GitHub Actions"],
    githubUrl: "https://github.com/cheker11",
    liveUrl: "https://cheker11.github.io/portfolio/",
    highlights: [
      "Engineered responsive layout adapted for mobile and desktop screens.",
      "Configured automated GitHub Actions workflow for continuous deployment.",
      "Integrated direct contact inbox logging and consultation booking."
    ]
  },
  {
    id: "github-python-bots",
    title: "Python Automation & Telegram Bot Suite",
    subtitle: "Smart Automation & Chat Systems",
    category: "github",
    categoryLabel: "GitHub Web Sites",
    description: "Custom Python bots and automation scripts for community management, SMM operations, and client interactions.",
    longDescription: "Developed to automate client communication and content pipelines. Features custom trigger logic, inline menus, and integration with AI generative models.",
    image: "./projects/github_site_3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Language", value: "Python 3" },
      { label: "Platform", value: "Telegram API" },
      { label: "Focus", value: "Bot Automation" }
    ],
    tags: ["Python", "Telegram API", "AI Instruments", "Automation"],
    githubUrl: "https://github.com/cheker11",
    liveUrl: "https://github.com/cheker11",
    highlights: [
      "Built interactive conversational logic for automated user flows.",
      "Integrated social media management pipelines for client projects.",
      "Utilized prompt engineering and AI assistant workflows."
    ]
  },

  // ----------------------------------------------------
  // CATEGORY 2: FIGMA DESIGNS
  // ----------------------------------------------------
  {
    id: "figma-edtech-ui",
    title: "EdTech Learning Platform Design System",
    subtitle: "UI/UX Prototype & Layout Architecture",
    category: "figma",
    categoryLabel: "Figma Designs",
    description: "Complete Figma design system and UI/UX layout for an interactive computer science learning platform.",
    longDescription: "Crafted in Figma with component variants, auto-layout cards, custom iconography, and responsive grid guidelines for desktop and mobile devices.",
    image: "./projects/figma_design_1.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Design Tool", value: "Figma" },
      { label: "Deliverables", value: "UI/UX & Components" },
      { label: "Design Style", value: "Modern & Clean" }
    ],
    tags: ["Figma", "UI/UX Design", "Wireframing", "Design System"],
    figmaUrl: "https://www.figma.com",
    liveUrl: "https://www.figma.com",
    highlights: [
      "Designed full web app wireframes and interactive user flows.",
      "Created consistent typographic hierarchy and accessible color palettes.",
      "Built reusable component library with interactive button states."
    ]
  },
  {
    id: "figma-pettech-app",
    title: "PetTech Smart App UI/UX Concept",
    subtitle: "Mobile Application Interface & Branding",
    category: "figma",
    categoryLabel: "Figma Designs",
    description: "High-fidelity mobile app design concept for a smart pet care platform, pet health tracking, and community connection.",
    longDescription: "Focuses on user-friendly mobile navigation, visual pet profile dashboards, notification cards, and seamless booking for pet care services.",
    image: "./projects/figma_design_2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Focus", value: "PetTech Sector" },
      { label: "Target", value: "Mobile iOS/Android" },
      { label: "Format", value: "Interactive Prototype" }
    ],
    tags: ["Figma", "Mobile UI", "PetTech", "App Prototype"],
    figmaUrl: "https://www.figma.com",
    liveUrl: "https://www.figma.com",
    highlights: [
      "Engineered intuitive mobile navigation for quick pet health logging.",
      "Crafted custom vector illustrations and pet status indicator badges.",
      "Prepared developer-ready handoff specs with pixel-perfect layouts."
    ]
  },
  {
    id: "figma-graphics-suite",
    title: "Freelance Ad Banners, Decks & SMM Suite",
    subtitle: "Graphic Production & Marketing Assets",
    category: "figma",
    categoryLabel: "Figma Designs",
    description: "Collection of 50+ delivered advertising banners, social media assets, presentation pitch decks, and custom logos.",
    longDescription: "Delivered for freelance clients across Ukraine and internationally. Combines Figma visual precision with Canva graphics for high-converting marketing campaigns.",
    image: "./projects/figma_design_3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Volume", value: "50+ Assets" },
      { label: "Client Rating", value: "100% Satisfaction" },
      { label: "Tools", value: "Figma + Canva" }
    ],
    tags: ["Figma", "Canva", "Graphic Design", "Ad Banners", "Logos"],
    figmaUrl: "https://www.figma.com",
    liveUrl: "https://www.figma.com",
    highlights: [
      "Created eye-catching advertising banners for social media campaigns.",
      "Designed professional pitch decks for startups and commercial proposals.",
      "Crafted unique logo concepts and visual brand identity guidelines."
    ]
  },

  // ----------------------------------------------------
  // CATEGORY 3: STARTUPS & INNOVATIONS
  // ----------------------------------------------------
  {
    id: "startup-infomatrix",
    title: "Infomatrix Ukraine National Startup Project",
    subtitle: "National Competition Stage 2 Finalist",
    category: "startups",
    categoryLabel: "Startups & Innovations",
    description: "An innovative IT startup presented at the 2nd stage of the prestigious Infomatrix Ukraine National Competition in 2024 and 2025.",
    longDescription: "Engineered for the International Infomatrix competition. Demonstrates technical prototype execution, social value, and market feasibility. Supported by the Ukrainian Future (UF) Business Incubator.",
    image: "./projects/startup_1.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Competition", value: "Infomatrix Stage 2" },
      { label: "Timeline", value: "2024 — 2025" },
      { label: "Incubator", value: "UF Incubator" }
    ],
    tags: ["Startup", "Infomatrix", "UF Incubator", "Pitch Deck", "Python"],
    githubUrl: "https://github.com/cheker11",
    liveUrl: "https://cheker11.github.io/portfolio/",
    highlights: [
      "Qualified for Stage 2 of National Competition of Projects 'Infomatrix Ukraine'.",
      "Accelerated through Ukrainian Future (UF) Business Incubator.",
      "Presented technical prototype and pitch deck to national jury."
    ]
  },
  {
    id: "startup-upshift-unicef",
    title: "UPSHIFT Youth Innovation Program Project",
    subtitle: "Supported by UNICEF Ukraine",
    category: "startups",
    categoryLabel: "Startups & Innovations",
    description: "Social innovation initiative developed within the UNICEF-supported UPSHIFT youth empowerment program.",
    longDescription: "Focuses on solving community challenges through team leadership, human-centered design methodology, budget planning, and IT web solution creation.",
    image: "./projects/startup_2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Program", value: "UPSHIFT Ukraine" },
      { label: "Partner", value: "UNICEF" },
      { label: "Role", value: "Project Lead" }
    ],
    tags: ["UPSHIFT", "UNICEF", "Social Startup", "Leadership"],
    githubUrl: "https://github.com/cheker11",
    liveUrl: "https://cheker11.github.io/portfolio/",
    highlights: [
      "Selected for UNICEF UPSHIFT youth innovation program.",
      "Mastered human-centered design, team budgeting, and project implementation.",
      "Delivered high-impact community product."
    ]
  },
  {
    id: "startup-pettech-venture",
    title: "PetTech Smart Ecosystem Venture",
    subtitle: "Pet Care Tech Innovation",
    category: "startups",
    categoryLabel: "Startups & Innovations",
    description: "An emerging startup venture focused on smart technology solutions for pet health, owner assistance, and digital pet care services.",
    longDescription: "Combines web dashboards, automated notifications, and UI design to deliver a seamless experience for pet lovers and veterinary services.",
    image: "./projects/startup_3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Sector", value: "PetTech" },
      { label: "Stage", value: "Prototype & Deck" },
      { label: "Founder", value: "Arina Chekotun" }
    ],
    tags: ["PetTech", "Startup", "Web App", "Founder"],
    githubUrl: "https://github.com/cheker11",
    liveUrl: "https://cheker11.github.io/portfolio/",
    highlights: [
      "Formulated core value proposition and market architecture for PetTech.",
      "Designed full prototype UI and pitch presentation deck.",
      "Actively seeking collaborators and startup ecosystem partners."
    ]
  }
];


export const EDUCATION = [
  {
    id: "international-university",
    institution: "International University",
    role: "1st Year Student — Higher Education",
    period: "2024 — Present",
    description: "Pursuing higher education studies with focus on information technology, modern software development, and academic projects."
  },
  {
    id: "kherson-lyceum",
    institution: "Kherson Scientific Lyceum of Kherson Regional Council",
    role: "Lyceum Student — Specialized STEM Curriculum",
    period: "Graduated",
    description: "Specialized secondary education emphasizing mathematics, computer science, physics, and scientific project research."
  }
];

export const ACHIEVEMENTS = [
  {
    id: "infomatrix",
    title: "Infomatrix Ukraine 2024 & 2025 National Participant",
    organization: "National Competition of Projects",
    year: "2024, 2025",
    description: "Selected participant of the second stage of the National Competition of Projects 'Infomatrix Ukraine', showcasing innovative IT startups."
  },
  {
    id: "upshift",
    title: "UPSHIFT Project Participant",
    organization: "Supported by UNICEF & Wanted Here",
    year: "2024",
    description: "Collaborated in the global UPSHIFT youth innovation program to create social tech solutions supported by UNICEF."
  },
  {
    id: "uf-incubator",
    title: "UF Incubator Collaboration",
    organization: "Ukrainian Future Business Incubator",
    year: "2024 — Present",
    description: "Active collaboration with the Junior Academy of Sciences of Ukraine business incubator to develop startup methodology."
  },
  {
    id: "erasmus",
    title: "Erasmus+ Youth Exchange",
    organization: "European Union Erasmus+ Program",
    year: "2024",
    description: "Participant in international youth exchange program focused on cross-cultural collaboration and youth empowerment."
  },
  {
    id: "esteam",
    title: "Dive in ESTEAM Camp",
    organization: "ESTEAM Youth Initiative",
    year: "2024",
    description: "Participant in immersive camp covering Entrepreneurship, Science, Technology, Engineering, Arts, and Mathematics."
  },
  {
    id: "iron-change",
    title: "Iron Change Project",
    organization: "Youth Transformation Program",
    year: "Repeated Participant",
    description: "Active engagement in community development, team building, and personal growth workshops."
  }
];

export const CERTIFICATIONS = [
  {
    id: "google-ai-cert",
    title: "Google Artificial Intelligence Professional Certificate",
    issuer: "Google",
    issuerLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=120&q=80",
    issueDate: "In Progress",
    credentialId: "G-AI-2025-ARINA",
    verificationUrl: "https://coursera.org",
    description: "Professional certificate covering generative AI fundamentals, machine learning concepts, AI prompt design, and practical AI applications.",
    skillsCovered: ["Artificial Intelligence", "Generative AI", "Prompt Engineering", "Google AI Tools", "Machine Learning Basics"]
  },
  {
    id: "genius-space-frontend-ai",
    title: "Frontend & AI Specialization Course",
    issuer: "Genius Space",
    issuerLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80",
    issueDate: "2024",
    credentialId: "GS-FA-2024",
    verificationUrl: "https://genius.space",
    description: "Comprehensive training on modern frontend web technologies combined with artificial intelligence workflows and tools.",
    skillsCovered: ["Frontend Development", "AI Tooling", "Web Architecture", "UI Design"]
  },
  {
    id: "man-web-dev",
    title: "WEB & Frontend Development Certification",
    issuer: "Junior Academy of Sciences of Ukraine (MAN)",
    issuerLogo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=120&q=80",
    issueDate: "2023 - 2024",
    credentialId: "MAN-WEB-2024",
    verificationUrl: "https://man.gov.ua",
    description: "Academic certification in Web Development and Frontend Technologies issued by the Junior Academy of Sciences.",
    skillsCovered: ["HTML & CSS", "JavaScript Basics", "Web Architecture", "Project Management"]
  },
  {
    id: "freecodecamp-js",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "FreeCodeCamp",
    issuerLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80",
    issueDate: "In Progress",
    credentialId: "FCC-JS-ARINA",
    verificationUrl: "https://freecodecamp.org",
    description: "Deep dive into JavaScript fundamentals, OOP, functional programming, data structures, and algorithm scripting.",
    skillsCovered: ["JavaScript ES6+", "Algorithms", "Data Structures", "Functional Programming"]
  },
  {
    id: "python-beginner",
    title: "Python Beginner Course Certification",
    issuer: "MAN & Certified Academy",
    issuerLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80",
    issueDate: "2023",
    credentialId: "PY-BEG-2023",
    verificationUrl: "https://example.com",
    description: "Foundational training in Python programming syntax, control structures, basic data analysis, and script authoring.",
    skillsCovered: ["Python Syntax", "Data Structures", "Control Flow", "Scripting"]
  }
];

export const METRICS = [
  {
    value: "2024/25",
    label: "INFOMATRIX FINALIST",
    description: "Stage 2 participant of National Competition of Projects 'Infomatrix Ukraine'."
  },
  {
    value: "100%",
    label: "DEDICATION TO IT",
    description: "Author of CS courses, web platforms, and active startup founder."
  },
  {
    value: "15+",
    label: "PROJECTS DELIVERED",
    description: "Web platforms, chatbots, ad banners, logo branding, and pitch decks."
  }
];

export const RESUME_SLIDES = [
  {
    number: "01",
    title: "Personal Identity & Contact Info",
    subtitle: "Arina Chekotun — Kherson / Odesa, Ukraine",
    content: "Arina Chekotun is a purposeful, proactive IT Developer, Startup Founder, and Web Designer born April 11, 2008. Originally from Kherson city and currently based in Odesa, Ukraine. Direct contact email: 11cheker11@gmail.com."
  },
  {
    number: "02",
    title: "Core Philosophy & Personal Traits",
    subtitle: "Purposeful, Persistent, Proactive & Creative",
    content: "Passionate about information technologies and visual web design. Author of courses and an authorial website for IT beginners. Strives for continuous development, social impact, and innovative startup creation."
  },
  {
    number: "03",
    title: "Programming & Web Stack",
    subtitle: "Python, HTML/CSS, JavaScript, C++, Tailwind, Git",
    content: "Strong foundation in Python development (chatbots, automation), responsive web layout (HTML/CSS, Tailwind CSS, Bootstrap), JavaScript algorithms, C++ fundamentals, and version control via Git/GitHub."
  },
  {
    number: "04",
    title: "Design & Creative Tools",
    subtitle: "Figma, Canva, AI Instruments, CapCut, MS Office",
    content: "Proficient in UI/UX wireframing with Figma, graphic design with Canva, video production in CapCut, prompt engineering with generative AI tools, and professional document design in MS Word/Excel/PowerPoint."
  },
  {
    number: "05",
    title: "Higher Education & Academic Roots",
    subtitle: "International University & Kherson Scientific Lyceum",
    content: "Currently a 1st year student at International University. Graduated from Kherson Scientific Lyceum of Kherson Regional Council with specialized research in computer science and STEM fields."
  },
  {
    number: "06",
    title: "National & International Achievements",
    subtitle: "Infomatrix, UPSHIFT UNICEF, UF Incubator, Erasmus+",
    content: "Participant of Infomatrix Ukraine 2024 & 2025 National Stage 2, UPSHIFT supported by UNICEF, UF Incubator collaborator, Erasmus+ Youth Exchange in Europe, and Dive in ESTEAM Camp."
  },
  {
    number: "07",
    title: "Experience & Freelance Track",
    subtitle: "Startup Leadership, Authorial Courses, SMM & Design",
    content: "Lead developer for personal IT startups, creator of beginner CS courses, Python chatbot developer, social media manager, and freelance designer delivering custom banners, logos, and presentations."
  },
  {
    number: "08",
    title: "Courses & Qualifications",
    subtitle: "Google AI, Genius Space, MAN, FreeCodeCamp",
    content: "Enrolled in Google Artificial Intelligence Professional Certificate and FreeCodeCamp JS Certification. Certified in Frontend & AI by Genius Space, Web & Frontend by MAN, and Python Beginner Course."
  }
];
