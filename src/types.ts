export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Applications' | 'Design Systems' | 'AI Interfaces' | 'Performance';
  description: string;
  longDescription: string;
  image: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  codeSnippet?: string;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0-100
    experienceYears: string;
    description: string;
    highlight: string;
    codeSample?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
  description: string;
  skillsCovered: string[];
  badgeColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  relationship: string;
}

export interface Metric {
  value: string;
  label: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
}
