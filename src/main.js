import {
  PERSONAL_INFO,
  MISSION_PILLARS,
  SKILL_CATEGORIES,
  PROJECTS,
  PROJECT_CATEGORIES_CONFIG,
  EDUCATION,
  ACHIEVEMENTS,
  CERTIFICATIONS,
  METRICS,
  RESUME_SLIDES
} from './data.js';

// Application State
const state = {
  viewMode: 'website', // 'website' | 'deck'
  selectedCategoryTab: 'all', // 'all' | 'github' | 'figma' | 'startups'
  carouselIndices: {
    github: 0,
    figma: 0,
    startups: 0
  },
  selectedProject: null,
  showResumeModal: false,
  showConsultationModal: false,
  showInboxModal: false,
  currentSlide: 0,
  showDeckThumbnails: false,
  mobileMenuOpen: false,
  
  targetEmail: '11cheker11@gmail.com',
  
  // Contact Form State
  contactSubmitting: false,
  contactSuccess: false,
  contactNotice: null,
  contactError: null,
  
  // Consultation Form State
  bookingDate: new Date().toISOString().split('T')[0],
  bookingTime: '10:00 AM',
  bookingName: '',
  bookingEmail: '',
  bookingSubmitting: false,
  bookingSuccess: false,
  bookingError: null,
  
  // Server Inbox Log
  inboxMessages: [],
  inboxLoading: false
};

const TOTAL_SLIDES = 8;

// Initialize App
function initApp() {
  renderApp();
  setupKeyboardListeners();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function setupKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (state.viewMode === 'deck') {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    }
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function nextSlide() {
  state.currentSlide = (state.currentSlide + 1) % TOTAL_SLIDES;
  renderApp();
}

function prevSlide() {
  state.currentSlide = (state.currentSlide - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
  renderApp();
}

function closeAllModals() {
  state.selectedProject = null;
  state.showResumeModal = false;
  state.showConsultationModal = false;
  state.showInboxModal = false;
  renderApp();
}

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="min-h-screen bg-[#F4F1EA] text-[#1A1A1A] font-sans antialiased">
      ${renderHeader()}
      ${state.viewMode === 'website' ? renderWebsiteView() : renderDeckView()}
      ${renderFooter()}
      ${state.selectedProject ? renderProjectModal(state.selectedProject) : ''}
      ${state.showResumeModal ? renderResumeModal() : ''}
      ${state.showConsultationModal ? renderConsultationModal() : ''}
      ${state.showInboxModal ? renderInboxModal() : ''}
    </div>
  `;

  // Refresh Lucide Icons if available
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  attachEventListeners();
}

// --------------------------------------------------
// HEADER COMPONENT
// --------------------------------------------------
function renderHeader() {
  return `
    <header class="sticky top-0 z-40 bg-[#F4F1EA]/95 backdrop-blur-md border-b-2 border-[#1A1A1A] px-3 sm:px-6 py-2.5 transition-all w-full overflow-x-hidden">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-3 w-full">
        
        <!-- Logo / Name -->
        <a href="#hero" id="nav-logo" class="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div class="w-8 h-8 sm:w-9 sm:h-9 bg-[#1A1A1A] text-[#F4F1EA] font-serif italic text-lg sm:text-xl font-bold flex items-center justify-center border border-[#1A1A1A] group-hover:bg-[#D43F3A] group-hover:text-white transition-colors">
            AC
          </div>
          <div>
            <span class="font-serif italic text-sm sm:text-base font-bold tracking-tight text-[#1A1A1A] block leading-none">
              Arina Chekotun
            </span>
            <span class="text-[8px] sm:text-[9px] font-bold text-[#D43F3A] uppercase tracking-[0.15em] block mt-0.5">
              IT Developer | Founder | Designer
            </span>
          </div>
        </a>

        <!-- Desktop Navigation & Controls (Visible on lg: and above) -->
        <div class="hidden lg:flex items-center gap-1.5 xl:gap-3 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider shrink-0">
          
          ${state.viewMode === 'website' ? `
            <nav class="flex items-center gap-1.5 xl:gap-2 text-[#1A1A1A]/80">
              <a href="#about" class="px-1 py-0.5 hover:text-[#D43F3A] transition-colors">About</a>
              <a href="#skills" class="px-1 py-0.5 hover:text-[#D43F3A] transition-colors">Skills</a>
              <a href="#projects" class="px-1 py-0.5 hover:text-[#D43F3A] transition-colors">Projects</a>
              <a href="#achievements" class="px-1 py-0.5 hover:text-[#D43F3A] transition-colors">Achievements</a>
              <a href="#credentials" class="px-1 py-0.5 hover:text-[#D43F3A] transition-colors">Education</a>
              <a href="#contact" class="px-1 py-0.5 hover:text-[#D43F3A] transition-colors">Contact</a>
            </nav>
          ` : ''}

          <!-- Social Quick Links Bar -->
          <div class="flex items-center gap-1 pr-1 border-r border-[#1A1A1A]/20">
            <a
              href="${PERSONAL_INFO.linkedin}"
              target="_blank"
              rel="noreferrer"
              class="p-1.5 bg-[#E8E4D9] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              title="LinkedIn Profile: arinachekotun"
            >
              <i data-lucide="linkedin" class="w-3.5 h-3.5"></i>
            </a>
            <a
              href="${PERSONAL_INFO.instagram}"
              target="_blank"
              rel="noreferrer"
              class="p-1.5 bg-[#E8E4D9] border border-[#1A1A1A] text-[#D43F3A] hover:bg-[#D43F3A] hover:text-white transition-colors"
              title="Instagram: @11_cheker_11"
            >
              <i data-lucide="instagram" class="w-3.5 h-3.5"></i>
            </a>
            <a
              href="${PERSONAL_INFO.github}"
              target="_blank"
              rel="noreferrer"
              class="p-1.5 bg-[#E8E4D9] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              title="GitHub: cheker11"
            >
              <i data-lucide="github" class="w-3.5 h-3.5"></i>
            </a>
          </div>

          <!-- View Mode Switcher -->
          <div class="flex items-center p-0.5 bg-[#E8E4D9] border border-[#1A1A1A] shrink-0">
            <button
              id="btn-view-website"
              class="px-2 py-1 text-[9px] xl:text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                state.viewMode === 'website'
                  ? 'bg-[#1A1A1A] text-[#F4F1EA]'
                  : 'text-[#1A1A1A] hover:text-[#D43F3A]'
              }"
            >
              <i data-lucide="layout" class="w-3 h-3"></i>
              <span>Website</span>
            </button>
            <button
              id="btn-view-deck"
              class="px-2 py-1 text-[9px] xl:text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                state.viewMode === 'deck'
                  ? 'bg-[#1A1A1A] text-[#F4F1EA]'
                  : 'text-[#1A1A1A] hover:text-[#D43F3A]'
              }"
            >
              <i data-lucide="presentation" class="w-3 h-3"></i>
              <span>Slide Deck</span>
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-1.5 shrink-0">
            <button
              id="btn-open-inbox"
              class="px-2 py-1 border border-[#1A1A1A] bg-[#E8E4D9] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-all flex items-center gap-1 text-[9px] xl:text-[10px]"
              title="View received messages log"
            >
              <i data-lucide="inbox" class="w-3 h-3 text-[#D43F3A]"></i>
              <span class="hidden xl:inline">Inbox Log</span>
            </button>

            <button
              id="btn-open-resume"
              class="px-2.5 py-1 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-all flex items-center gap-1 text-[9px] xl:text-[10px]"
            >
              <i data-lucide="file-text" class="w-3 h-3"></i>
              <span>CV</span>
            </button>

            <button
              id="btn-open-consultation"
              class="px-3 py-1 bg-[#D43F3A] text-white hover:bg-[#1A1A1A] transition-all flex items-center gap-1 text-[9px] xl:text-[10px] shadow-[2px_2px_0px_0px_#1A1A1A]"
            >
              <i data-lucide="calendar" class="w-3 h-3"></i>
              <span>Contact</span>
            </button>
          </div>
        </div>

        <!-- Mobile Header Quick Links & Toggle -->
        <div class="flex lg:hidden items-center gap-1.5 shrink-0">
          <a
            href="${PERSONAL_INFO.linkedin}"
            target="_blank"
            rel="noreferrer"
            class="p-1.5 bg-[#E8E4D9] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            title="LinkedIn"
          >
            <i data-lucide="linkedin" class="w-4 h-4"></i>
          </a>
          <a
            href="${PERSONAL_INFO.instagram}"
            target="_blank"
            rel="noreferrer"
            class="p-1.5 bg-[#E8E4D9] border border-[#1A1A1A] text-[#D43F3A] hover:bg-[#D43F3A] hover:text-white transition-colors"
            title="Instagram: @11_cheker_11"
          >
            <i data-lucide="instagram" class="w-4 h-4"></i>
          </a>
          <button id="btn-mobile-menu" class="p-1.5 sm:p-2 border border-[#1A1A1A] bg-[#E8E4D9] hover:bg-[#1A1A1A] hover:text-white transition-colors shrink-0">
            <i data-lucide="${state.mobileMenuOpen ? 'x' : 'menu'}" class="w-5 h-5"></i>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Drawer -->
      ${state.mobileMenuOpen ? `
        <div class="lg:hidden pt-3 pb-3 border-t-2 border-[#1A1A1A] mt-2 space-y-3 text-xs font-bold uppercase tracking-wider bg-[#F4F1EA] px-2">
          
          <!-- Direct Social Connections Grid -->
          <div class="grid grid-cols-2 gap-2 p-2 bg-[#E8E4D9] border border-[#1A1A1A]">
            <a
              href="${PERSONAL_INFO.linkedin}"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-center gap-2 p-2 bg-[#F4F1EA] border border-[#1A1A1A] text-[11px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <i data-lucide="linkedin" class="w-4 h-4 text-[#D43F3A]"></i>
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="${PERSONAL_INFO.instagram}"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-center gap-2 p-2 bg-[#F4F1EA] border border-[#1A1A1A] text-[11px] text-[#D43F3A] hover:bg-[#D43F3A] hover:text-white transition-colors"
            >
              <i data-lucide="instagram" class="w-4 h-4 text-[#D43F3A]"></i>
              <span>@11_cheker_11</span>
            </a>
          </div>

          <!-- Nav Links -->
          <nav class="grid grid-cols-2 gap-2 pb-2 border-b border-[#1A1A1A]/20">
            <a href="#about" class="p-2 bg-[#E8E4D9] border border-[#1A1A1A] text-center hover:bg-[#1A1A1A] hover:text-white transition-colors">About</a>
            <a href="#skills" class="p-2 bg-[#E8E4D9] border border-[#1A1A1A] text-center hover:bg-[#1A1A1A] hover:text-white transition-colors">Skills</a>
            <a href="#projects" class="p-2 bg-[#E8E4D9] border border-[#1A1A1A] text-center hover:bg-[#1A1A1A] hover:text-white transition-colors">Projects</a>
            <a href="#achievements" class="p-2 bg-[#E8E4D9] border border-[#1A1A1A] text-center hover:bg-[#1A1A1A] hover:text-white transition-colors">Achievements</a>
            <a href="#credentials" class="p-2 bg-[#E8E4D9] border border-[#1A1A1A] text-center hover:bg-[#1A1A1A] hover:text-white transition-colors">Education</a>
            <a href="#contact" class="p-2 bg-[#E8E4D9] border border-[#1A1A1A] text-center hover:bg-[#1A1A1A] hover:text-white transition-colors">Contact</a>
          </nav>

          <!-- View Switcher -->
          <div class="flex items-center gap-2">
            <button id="mobile-view-website" class="flex-1 py-2 text-center border border-[#1A1A1A] ${state.viewMode === 'website' ? 'bg-[#1A1A1A] text-white font-bold' : 'bg-[#E8E4D9]'}">Website View</button>
            <button id="mobile-view-deck" class="flex-1 py-2 text-center border border-[#1A1A1A] ${state.viewMode === 'deck' ? 'bg-[#1A1A1A] text-white font-bold' : 'bg-[#E8E4D9]'}">Slide Deck</button>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-2">
            <button id="mobile-btn-inbox" class="py-2.5 px-2 border border-[#1A1A1A] bg-[#E8E4D9] flex items-center justify-center gap-1.5 text-center">
              <i data-lucide="inbox" class="w-4 h-4 text-[#D43F3A]"></i>
              <span>Inbox Log</span>
            </button>
            <button id="mobile-btn-resume" class="py-2.5 px-2 border border-[#1A1A1A] bg-[#E8E4D9] flex items-center justify-center gap-1.5 text-center">
              <i data-lucide="file-text" class="w-4 h-4"></i>
              <span>Resume CV</span>
            </button>
          </div>

          <button id="mobile-btn-call" class="w-full text-center py-3 bg-[#D43F3A] text-white font-bold tracking-widest uppercase shadow-[2px_2px_0px_0px_#1A1A1A] flex items-center justify-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4"></i>
            <span>Contact Me / Book Meeting</span>
          </button>
        </div>
      ` : ''}
    </header>
  `;
}

// --------------------------------------------------
// WEBSITE VIEW
// --------------------------------------------------
function renderWebsiteView() {
  return `
    <main class="space-y-16 py-8">
      ${renderHeroSection()}
      ${renderContentsSection()}
      ${renderAboutSection()}
      ${renderSkillsSection()}
      ${renderProjectsSection()}
      ${renderAchievementsSection()}
      ${renderEducationSection()}
      ${renderContactSection()}
    </main>
  `;
}

function renderHeroSection() {
  return `
    <section id="hero" class="max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-12 border-b-2 border-[#1A1A1A]">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#E8E4D9] border border-[#1A1A1A] text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#D43F3A]">
            <span class="w-2 h-2 rounded-full bg-[#D43F3A] animate-pulse"></span>
            <span>OPEN FOR COLLABORATIONS, STARTUPS & TECH PROJECTS</span>
          </div>

          <h1 class="font-serif italic font-normal text-4xl sm:text-6xl lg:text-8xl text-[#1A1A1A] leading-[0.95] tracking-tight">
            ${PERSONAL_INFO.name}
          </h1>

          <p class="font-sans font-bold text-base sm:text-xl text-[#1A1A1A]/90 uppercase tracking-widest">
            ${PERSONAL_INFO.title}
          </p>

          <p class="font-sans text-sm sm:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-2xl">
            ${PERSONAL_INFO.bio}
          </p>

          <!-- Key Resume Traits -->
          <div class="flex flex-wrap gap-2 pt-1">
            ${PERSONAL_INFO.traits.map(t => `
              <span class="px-2.5 sm:px-3 py-1 bg-[#E8E4D9] border border-[#1A1A1A] text-[11px] sm:text-xs font-bold text-[#1A1A1A]">
                ✓ ${t}
              </span>
            `).join('')}
          </div>

          <!-- Direct Social Networks Bar -->
          <div class="p-3 bg-[#E8E4D9] border-2 border-[#1A1A1A] space-y-2">
            <span class="text-[10px] font-mono font-bold text-[#D43F3A] uppercase tracking-widest block">
              SOCIAL & CONTACT NETWORKS
            </span>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold uppercase">
              <a
                href="${PERSONAL_INFO.linkedin}"
                target="_blank"
                rel="noreferrer"
                class="p-2 bg-[#F4F1EA] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center gap-2 text-[#1A1A1A]"
              >
                <i data-lucide="linkedin" class="w-4 h-4 text-[#D43F3A]"></i>
                <span class="truncate">LinkedIn</span>
              </a>
              <a
                href="${PERSONAL_INFO.instagram}"
                target="_blank"
                rel="noreferrer"
                class="p-2 bg-[#F4F1EA] border border-[#1A1A1A] hover:bg-[#D43F3A] hover:text-white transition-colors flex items-center gap-2 text-[#D43F3A]"
              >
                <i data-lucide="instagram" class="w-4 h-4"></i>
                <span class="truncate">@11_cheker_11</span>
              </a>
              <a
                href="${PERSONAL_INFO.github}"
                target="_blank"
                rel="noreferrer"
                class="p-2 bg-[#F4F1EA] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center gap-2 text-[#1A1A1A]"
              >
                <i data-lucide="github" class="w-4 h-4 text-[#D43F3A]"></i>
                <span class="truncate">GitHub</span>
              </a>
            </div>
          </div>

          <!-- Key Metrics Pills -->
          <div class="grid grid-cols-3 gap-2 sm:gap-3 pt-2 max-w-lg">
            <div class="p-2.5 sm:p-3 bg-[#E8E4D9] border border-[#1A1A1A] text-center">
              <span class="font-serif italic font-bold text-xl sm:text-2xl text-[#D43F3A] block">FOUNDER</span>
              <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">EdTech & PetTech</span>
            </div>
            <div class="p-2.5 sm:p-3 bg-[#E8E4D9] border border-[#1A1A1A] text-center">
              <span class="font-serif italic font-bold text-xl sm:text-2xl text-[#D43F3A] block">15+</span>
              <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Projects & Banners</span>
            </div>
            <div class="p-2.5 sm:p-3 bg-[#E8E4D9] border border-[#1A1A1A] text-center">
              <span class="font-serif italic font-bold text-xl sm:text-2xl text-[#D43F3A] block">100%</span>
              <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">IT Dedication</span>
            </div>
          </div>

          <!-- Hero CTAs -->
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              id="hero-btn-call"
              class="px-5 sm:px-6 py-3 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#D43F3A] transition-all text-xs font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#D43F3A] flex items-center gap-2"
            >
              <span>Send Message</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
            <a
              href="#projects"
              class="px-5 sm:px-6 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs font-bold uppercase tracking-[0.2em]"
            >
              Explore Projects
            </a>
          </div>
        </div>

        <!-- Profile Photo Frame - Uncropped on Mobile and Desktop -->
        <div class="lg:col-span-5 relative">
          <div class="border-2 border-[#1A1A1A] p-2 bg-[#E8E4D9] shadow-[8px_8px_0px_0px_#1A1A1A] lg:shadow-[12px_12px_0px_0px_#1A1A1A]">
            <img
              src="./profile.jpg"
              onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';"
              alt="Arina Chekotun — IT Developer, Founder & Web Designer"
              class="w-full h-[320px] xs:h-[380px] sm:h-[460px] lg:h-[500px] object-cover object-top border border-[#1A1A1A] photo-editorial-filter"
              referrerpolicy="no-referrer"
            />
            <div class="p-3 bg-[#F4F1EA] border-t border-[#1A1A1A] mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-[11px] sm:text-xs font-mono">
              <span class="font-bold text-[#D43F3A] uppercase">KHERSON / ODESA, UKRAINE</span>
              <span class="text-[#1A1A1A] font-bold uppercase tracking-wider">IT DEVELOPER | FOUNDER | WEB DESIGNER</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

function renderContentsSection() {
  return `
    <section id="contents" class="max-w-7xl mx-auto px-4 sm:px-8 py-8 border-b-2 border-[#1A1A1A]">
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
            RESUME PORTFOLIO INDEX
          </span>
          <h2 class="font-serif italic font-bold text-3xl sm:text-4xl text-[#1A1A1A]">
            Overview Sections
          </h2>
        </div>
        <span class="font-mono text-xs font-bold border border-[#1A1A1A] px-3 py-1 bg-[#E8E4D9]">
          01 — 06 SECTIONS
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${[
          { num: "01", title: "ABOUT ME & PERSONAL TRAITS", link: "#about", desc: "Purposeful, proactive developer from Kherson/Odesa with native Ukrainian and English B1->B2." },
          { num: "02", title: "TECHNICAL & DESIGN SKILLS", link: "#skills", desc: "Python, HTML/CSS, JS, C++, Tailwind CSS, Bootstrap, Git, Figma, Canva, AI instruments, CapCut." },
          { num: "03", title: "FEATURED PROJECTS", link: "#projects", desc: "Beginner CS Platform & Courses, Infomatrix Startup, Python AI Chatbots, Design Suite." },
          { num: "04", title: "NATIONAL & INT. ACHIEVEMENTS", link: "#achievements", desc: "Infomatrix Ukraine 2024/2025, UPSHIFT supported by UNICEF, UF Incubator, Erasmus+ Youth Exchange." },
          { num: "05", title: "EDUCATION & COURSES", link: "#credentials", desc: "International University, Kherson Scientific Lyceum, Google AI, Genius Space, MAN, freeCodeCamp." },
          { num: "06", title: "CONTACT & INQUIRIES", link: "#contact", desc: "Send direct inquiry to 11cheker11@gmail.com, social links, and consultation booking." }
        ].map(item => `
          <a href="${item.link}" class="group p-5 bg-[#E8E4D9] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-all flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-mono text-xs font-bold text-[#D43F3A] group-hover:text-white">${item.num}</span>
                <i data-lucide="arrow-up-right" class="w-4 h-4 text-[#1A1A1A] group-hover:text-white"></i>
              </div>
              <h3 class="font-serif italic font-bold text-xl group-hover:text-white mb-1">${item.title}</h3>
              <p class="font-sans text-xs text-[#1A1A1A]/80 group-hover:text-[#E8E4D9] leading-relaxed">${item.desc}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function renderAboutSection() {
  return `
    <section id="about" class="max-w-7xl mx-auto px-4 sm:px-8 py-12 border-b-2 border-[#1A1A1A]">
      <div class="space-y-8">
        <div>
          <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
            01 • ABOUT ARINA CHEKOTUN
          </span>
          <h2 class="font-serif italic font-bold text-4xl sm:text-5xl text-[#1A1A1A]">
            Personal Traits & Mission
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-6 space-y-4 text-sm text-[#1A1A1A]/85 leading-relaxed font-sans">
            <p class="font-medium text-base text-[#1A1A1A]">
              ${PERSONAL_INFO.bio}
            </p>
            
            <div class="p-4 bg-[#E8E4D9] border border-[#1A1A1A] space-y-2">
              <h4 class="font-serif italic font-bold text-lg text-[#1A1A1A]">Languages Spoken</h4>
              <div class="grid grid-cols-2 gap-2 text-xs font-sans">
                ${PERSONAL_INFO.languages.map(l => `
                  <div class="p-2 bg-[#F4F1EA] border border-[#1A1A1A]">
                    <span class="font-bold text-[#D43F3A] block">${l.name}</span>
                    <span class="text-[#1A1A1A]/80">${l.level}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="p-4 bg-[#E8E4D9] border border-[#1A1A1A] space-y-2">
              <h4 class="font-serif italic font-bold text-lg text-[#1A1A1A]">Location & Background</h4>
              <p class="text-xs text-[#1A1A1A]/80">
                Originally from <strong>Kherson city</strong>, currently residing and working in <strong>Odesa, Ukraine</strong>. Born April 11, 2008.
              </p>
            </div>
          </div>

          <!-- Mission Pillars -->
          <div class="lg:col-span-6 space-y-4">
            ${MISSION_PILLARS.map(p => `
              <div class="p-4 bg-[#E8E4D9] border-2 border-[#1A1A1A]">
                <div class="flex items-center gap-3 mb-1">
                  <span class="font-mono text-xs font-bold text-[#D43F3A]">${p.number}</span>
                  <h3 class="font-serif italic font-bold text-lg text-[#1A1A1A]">${p.title}</h3>
                </div>
                <p class="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed pl-7">${p.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSkillsSection() {
  return `
    <section id="skills" class="max-w-7xl mx-auto px-4 sm:px-8 py-12 border-b-2 border-[#1A1A1A]">
      <div class="space-y-8">
        <div>
          <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
            02 • TECHNICAL & DESIGN COMPETENCIES
          </span>
          <h2 class="font-serif italic font-bold text-4xl sm:text-5xl text-[#1A1A1A]">
            Skill Matrix from Resume
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          ${SKILL_CATEGORIES.map(cat => `
            <div class="p-6 bg-[#E8E4D9] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-6 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
                  <span class="font-mono text-xs font-bold text-[#D43F3A]">${cat.number}</span>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70">${cat.subtitle}</span>
                </div>

                <h3 class="font-serif italic font-bold text-2xl text-[#1A1A1A] mb-2">${cat.title}</h3>
                <p class="font-sans text-xs text-[#1A1A1A]/80 mb-6 leading-relaxed">${cat.description}</p>

                <div class="space-y-4">
                  ${cat.skills.map(s => `
                    <div class="space-y-1">
                      <div class="flex justify-between items-center text-xs font-bold">
                        <span class="text-[#1A1A1A]">${s.name}</span>
                        <span class="font-mono text-[#D43F3A]">${s.level}%</span>
                      </div>
                      <div class="w-full h-2 bg-[#F4F1EA] border border-[#1A1A1A] overflow-hidden">
                        <div class="h-full bg-[#1A1A1A]" style="width: ${s.level}%"></div>
                      </div>
                      <p class="text-[11px] text-[#1A1A1A]/70 font-sans">${s.description}</p>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-4 border-t border-[#1A1A1A]/20">
                <span class="text-[10px] font-mono font-bold text-[#D43F3A] uppercase tracking-wider block">KEY HIGHLIGHT</span>
                <p class="text-xs font-medium text-[#1A1A1A] mt-0.5">${cat.skills[0].highlight}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderProjectsSection() {
  const categoriesToShow = state.selectedCategoryTab === 'all'
    ? PROJECT_CATEGORIES_CONFIG
    : PROJECT_CATEGORIES_CONFIG.filter(c => c.id === state.selectedCategoryTab);

  return `
    <section id="projects" class="max-w-7xl mx-auto px-4 sm:px-8 py-12 border-b-2 border-[#1A1A1A]">
      <div class="space-y-10">
        
        <!-- Section Header & Category Selector Tabs -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div class="space-y-2">
            <span class="text-[10px] sm:text-xs font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
              03 • FEATURED WORKS & PROJECTS (ПРИМЕРЫ РАБОТ)
            </span>
            <h2 class="font-serif italic font-bold text-3xl sm:text-5xl text-[#1A1A1A]">
              GitHub Sites, Figma Designs & Startups
            </h2>
            <p class="font-sans text-xs sm:text-sm text-[#1A1A1A]/80 max-w-2xl leading-relaxed">
              Explore my projects divided into three dedicated categories. Use the carousel controls or click thumbnails to inspect each work. You can also add your own custom photos to <code class="bg-[#E8E4D9] px-1 font-mono text-[11px] border border-[#1A1A1A]">/public/projects/</code>.
            </p>
          </div>

          <!-- Category Selector Tabs -->
          <div class="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            <button
              class="btn-category-tab px-3.5 py-2 border-2 border-[#1A1A1A] transition-all flex items-center gap-1.5 ${
                state.selectedCategoryTab === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-[3px_3px_0px_0px_#D43F3A]'
                  : 'bg-[#E8E4D9] text-[#1A1A1A] hover:bg-[#D43F3A] hover:text-white'
              }"
              data-category="all"
            >
              <span>All 3 Categories</span>
            </button>
            ${PROJECT_CATEGORIES_CONFIG.map(cat => `
              <button
                class="btn-category-tab px-3.5 py-2 border-2 border-[#1A1A1A] transition-all flex items-center gap-1.5 ${
                  state.selectedCategoryTab === cat.id
                    ? 'bg-[#1A1A1A] text-white shadow-[3px_3px_0px_0px_#D43F3A]'
                    : 'bg-[#E8E4D9] text-[#1A1A1A] hover:bg-[#D43F3A] hover:text-white'
                }"
                data-category="${cat.id}"
              >
                <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
                <span>${cat.title}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Carousels for Selected Categories -->
        <div class="space-y-16">
          ${categoriesToShow.map(catConfig => {
            const catProjects = PROJECTS.filter(p => p.category === catConfig.id);
            if (!catProjects.length) return '';

            const activeIdx = state.carouselIndices[catConfig.id] || 0;
            const currentProj = catProjects[activeIdx] || catProjects[0];

            return `
              <div class="p-6 sm:p-8 bg-[#E8E4D9] border-2 border-[#1A1A1A] shadow-[10px_10px_0px_0px_#1A1A1A] space-y-6 relative">
                
                <!-- Category Banner Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1A1A1A] pb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center border border-[#1A1A1A]">
                      <i data-lucide="${catConfig.icon}" class="w-5 h-5 text-[#D43F3A]"></i>
                    </div>
                    <div>
                      <span class="text-[10px] font-mono font-bold text-[#D43F3A] uppercase tracking-widest block">
                        CATEGORY ${catConfig.badge}
                      </span>
                      <h3 class="font-serif italic font-bold text-2xl text-[#1A1A1A]">
                        ${catConfig.title}
                      </h3>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="font-mono text-xs font-bold px-3 py-1 bg-[#F4F1EA] border border-[#1A1A1A] text-[#1A1A1A]">
                      Project ${activeIdx + 1} of ${catProjects.length}
                    </span>
                  </div>
                </div>

                <!-- Featured Active Project Display -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  <!-- Left: Interactive Image Showcase -->
                  <div class="lg:col-span-7 flex flex-col justify-between space-y-3">
                    <div
                      class="btn-open-project relative aspect-video sm:aspect-[16/10] border-2 border-[#1A1A1A] bg-[#1A1A1A] overflow-hidden group cursor-pointer shadow-[4px_4px_0px_0px_#1A1A1A]"
                      data-id="${currentProj.id}"
                      title="Click to view full project breakdown"
                    >
                      <img
                        src="${currentProj.image}"
                        onerror="this.onerror=null; this.src='${currentProj.fallbackImage}';"
                        alt="${currentProj.title}"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 photo-editorial-filter"
                      />
                      <div class="absolute top-3 left-3 px-2.5 py-1 bg-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A] text-[10px] font-mono font-bold uppercase tracking-widest">
                        ${currentProj.subtitle}
                      </div>
                      <div class="absolute bottom-3 right-3 px-3 py-1 bg-[#D43F3A] text-white text-[11px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#1A1A1A] flex items-center gap-1">
                        <span>Inspect Full Modal</span>
                        <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                      </div>
                    </div>

                    <!-- Carousel Navigation Controls Bar -->
                    <div class="flex items-center justify-between bg-[#F4F1EA] p-3 border border-[#1A1A1A]">
                      <button
                        class="btn-carousel-prev px-3.5 py-2 bg-[#1A1A1A] text-white hover:bg-[#D43F3A] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                        data-category="${catConfig.id}"
                      >
                        <i data-lucide="chevron-left" class="w-4 h-4"></i>
                        <span>Previous</span>
                      </button>

                      <div class="flex items-center gap-1.5">
                        ${catProjects.map((_, dotIdx) => `
                          <button
                            class="btn-carousel-dot w-3 h-3 border border-[#1A1A1A] transition-all ${
                              activeIdx === dotIdx ? 'bg-[#D43F3A] w-6' : 'bg-[#E8E4D9] hover:bg-[#1A1A1A]'
                            }"
                            data-category="${catConfig.id}"
                            data-index="${dotIdx}"
                          ></button>
                        `).join('')}
                      </div>

                      <button
                        class="btn-carousel-next px-3.5 py-2 bg-[#1A1A1A] text-white hover:bg-[#D43F3A] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                        data-category="${catConfig.id}"
                      >
                        <span>Next Work</span>
                        <i data-lucide="chevron-right" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Right: Project Information & Action Buttons -->
                  <div class="lg:col-span-5 bg-[#F4F1EA] p-6 border-2 border-[#1A1A1A] flex flex-col justify-between space-y-4">
                    <div class="space-y-3">
                      <div class="flex items-center justify-between border-b border-[#1A1A1A]/30 pb-2">
                        <span class="text-[10px] font-mono font-bold text-[#D43F3A] uppercase tracking-widest">
                          ${currentProj.subtitle}
                        </span>
                        <span class="text-[10px] font-mono text-[#1A1A1A]/60">
                          ID: ${currentProj.id}
                        </span>
                      </div>

                      <h4 class="font-serif italic font-bold text-2xl text-[#1A1A1A]">
                        ${currentProj.title}
                      </h4>

                      <p class="font-sans text-xs text-[#1A1A1A]/85 leading-relaxed">
                        ${currentProj.description}
                      </p>

                      <!-- Key Performance Metrics -->
                      <div class="grid grid-cols-3 gap-2 p-3 bg-[#E8E4D9] border border-[#1A1A1A]">
                        ${currentProj.metrics.map(m => `
                          <div class="text-center">
                            <span class="font-serif italic font-bold text-base text-[#D43F3A] block">${m.value}</span>
                            <span class="text-[8px] font-bold uppercase tracking-wider text-[#1A1A1A] block">${m.label}</span>
                          </div>
                        `).join('')}
                      </div>

                      <!-- Tech Stack Tags -->
                      <div class="flex flex-wrap gap-1.5 pt-1">
                        ${currentProj.tags.map(t => `
                          <span class="px-2 py-0.5 bg-[#E8E4D9] border border-[#1A1A1A] text-[10px] font-mono font-medium text-[#1A1A1A]">
                            ${t}
                          </span>
                        `).join('')}
                      </div>
                    </div>

                    <!-- External Links & Action Row -->
                    <div class="space-y-2 pt-2 border-t border-[#1A1A1A]/20">
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        ${currentProj.githubUrl ? `
                          <a
                            href="${currentProj.githubUrl}"
                            target="_blank"
                            rel="noreferrer"
                            class="px-3 py-2 bg-[#1A1A1A] text-white hover:bg-[#D43F3A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <i data-lucide="github" class="w-3.5 h-3.5"></i>
                            <span>GitHub Repo</span>
                          </a>
                        ` : ''}

                        ${currentProj.figmaUrl ? `
                          <a
                            href="${currentProj.figmaUrl}"
                            target="_blank"
                            rel="noreferrer"
                            class="px-3 py-2 bg-[#1A1A1A] text-white hover:bg-[#D43F3A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <i data-lucide="figma" class="w-3.5 h-3.5"></i>
                            <span>Figma File</span>
                          </a>
                        ` : ''}

                        ${currentProj.liveUrl ? `
                          <a
                            href="${currentProj.liveUrl}"
                            target="_blank"
                            rel="noreferrer"
                            class="px-3 py-2 bg-[#D43F3A] text-white hover:bg-[#1A1A1A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-[2px_2px_0px_0px_#1A1A1A]"
                          >
                            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            <span>Live Site</span>
                          </a>
                        ` : ''}

                        <button
                          class="btn-open-project px-3 py-2 border border-[#1A1A1A] bg-[#E8E4D9] hover:bg-[#1A1A1A] hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                          data-id="${currentProj.id}"
                        >
                          <i data-lucide="info" class="w-3.5 h-3.5"></i>
                          <span>Full Modal</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                <!-- Category Thumbnail Strip -->
                <div class="space-y-2 pt-2">
                  <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">
                    <span>${catConfig.title} — All ${catProjects.length} Works:</span>
                    <span class="font-mono text-[11px] text-[#D43F3A]">Click any thumbnail to jump</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    ${catProjects.map((p, pIdx) => `
                      <button
                        class="btn-carousel-thumb text-left p-2 border-2 transition-all flex flex-col justify-between ${
                          activeIdx === pIdx
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[4px_4px_0px_0px_#D43F3A]'
                            : 'bg-[#F4F1EA] text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#E8E4D9]'
                        }"
                        data-category="${catConfig.id}"
                        data-index="${pIdx}"
                      >
                        <div class="aspect-video w-full overflow-hidden border border-[#1A1A1A] mb-2 bg-[#1A1A1A]">
                          <img
                            src="${p.image}"
                            onerror="this.onerror=null; this.src='${p.fallbackImage}';"
                            alt="${p.title}"
                            class="w-full h-full object-cover photo-editorial-filter"
                          />
                        </div>
                        <div class="space-y-0.5">
                          <span class="text-[9px] font-mono font-bold block opacity-80">0${pIdx + 1} • ${p.subtitle}</span>
                          <h5 class="font-serif italic font-bold text-xs truncate">${p.title}</h5>
                        </div>
                      </button>
                    `).join('')}
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>
    </section>
  `;
}

function renderAchievementsSection() {
  return `
    <section id="achievements" class="max-w-7xl mx-auto px-4 sm:px-8 py-12 border-b-2 border-[#1A1A1A]">
      <div class="space-y-8">
        <div>
          <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
            04 • RECOGNITION & PROJECTS
          </span>
          <h2 class="font-serif italic font-bold text-4xl sm:text-5xl text-[#1A1A1A]">
            Achievements & International Exchanges
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${ACHIEVEMENTS.map(ach => `
            <div class="p-6 bg-[#E8E4D9] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex justify-between items-start">
                  <span class="text-[10px] font-mono font-bold text-[#D43F3A] uppercase tracking-wider px-2 py-0.5 bg-[#F4F1EA] border border-[#1A1A1A]">${ach.year}</span>
                  <i data-lucide="trophy" class="w-5 h-5 text-[#D43F3A]"></i>
                </div>
                <h3 class="font-serif italic font-bold text-xl text-[#1A1A1A]">${ach.title}</h3>
                <span class="text-xs font-bold text-[#D43F3A] uppercase block">${ach.organization}</span>
                <p class="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed pt-1">${ach.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderEducationSection() {
  return `
    <section id="credentials" class="max-w-7xl mx-auto px-4 sm:px-8 py-12 border-b-2 border-[#1A1A1A]">
      <div class="space-y-8">
        <div>
          <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
            05 • EDUCATION & CERTIFICATIONS
          </span>
          <h2 class="font-serif italic font-bold text-4xl sm:text-5xl text-[#1A1A1A]">
            Academic Institutions & Courses
          </h2>
        </div>

        <!-- Education Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${EDUCATION.map(edu => `
            <div class="p-6 bg-[#E8E4D9] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-3">
              <div class="flex justify-between items-start border-b border-[#1A1A1A] pb-2">
                <div>
                  <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-widest block">EDUCATION</span>
                  <h3 class="font-serif italic font-bold text-xl text-[#1A1A1A]">${edu.institution}</h3>
                </div>
                <span class="font-mono text-xs font-bold px-2 py-1 bg-[#F4F1EA] border border-[#1A1A1A]">${edu.period}</span>
              </div>
              <p class="text-xs font-bold text-[#1A1A1A]">${edu.role}</p>
              <p class="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed">${edu.description}</p>
            </div>
          `).join('')}
        </div>

        <!-- Certifications & Courses Grid -->
        <div class="pt-4 space-y-4">
          <h3 class="font-serif italic font-bold text-2xl text-[#1A1A1A]">
            Courses & Specializations
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${CERTIFICATIONS.map(cert => `
              <div class="p-6 bg-[#E8E4D9] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_0px_#1A1A1A] space-y-4 flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">${cert.issuer}</span>
                      <h4 class="font-serif italic font-bold text-xl text-[#1A1A1A]">${cert.title}</h4>
                    </div>
                    <i data-lucide="award" class="w-6 h-6 text-[#D43F3A] shrink-0"></i>
                  </div>

                  <p class="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed">${cert.description}</p>

                  <div class="flex flex-wrap gap-1.5 pt-2">
                    ${cert.skillsCovered.map(s => `
                      <span class="px-2 py-0.5 bg-[#F4F1EA] border border-[#1A1A1A] text-[10px] font-sans font-medium">
                        ${s}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div class="pt-3 border-t border-[#1A1A1A] flex items-center justify-between text-xs font-mono">
                  <span class="text-[#1A1A1A]/70">Status: ${cert.issueDate}</span>
                  <span class="text-[#D43F3A] font-bold">Verified</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>
  `;
}

function renderContactSection() {
  return `
    <section id="contact" class="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <div class="bg-[#E8E4D9] border-2 border-[#1A1A1A] p-8 sm:p-12 shadow-[12px_12px_0px_0px_#1A1A1A] space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div class="lg:col-span-5 space-y-6">
            <div>
              <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
                06 • CONTACT ARINA CHEKOTUN
              </span>
              <h2 class="font-serif italic font-bold text-4xl sm:text-5xl text-[#1A1A1A]">
                Get In Touch
              </h2>
            </div>

            <p class="font-sans text-xs sm:text-sm text-[#1A1A1A]/85 leading-relaxed">
              Open for startup collaborations, web development projects, UI/UX design, or course consultations. Feel free to drop a message or reach out via social channels.
            </p>

            <div class="space-y-3 font-sans text-xs font-medium text-[#1A1A1A]">
              <div class="flex items-center gap-3 p-3 bg-[#F4F1EA] border border-[#1A1A1A]">
                <i data-lucide="mail" class="w-4 h-4 text-[#D43F3A]"></i>
                <span>Email: <strong>${PERSONAL_INFO.email}</strong></span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-[#F4F1EA] border border-[#1A1A1A]">
                <i data-lucide="map-pin" class="w-4 h-4 text-[#D43F3A]"></i>
                <span>Location: <strong>${PERSONAL_INFO.location}</strong></span>
              </div>
              <div class="flex items-center gap-3 p-3 bg-[#F4F1EA] border border-[#1A1A1A]">
                <i data-lucide="instagram" class="w-4 h-4 text-[#D43F3A]"></i>
                <span>Instagram: <a href="${PERSONAL_INFO.instagram}" target="_blank" rel="noreferrer" class="underline text-[#D43F3A]">@11_CHEKER_11</a></span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 bg-[#F4F1EA] border border-[#1A1A1A] p-6 space-y-4 relative">
            <div class="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
              <h3 class="font-serif italic font-bold text-2xl text-[#1A1A1A]">
                Send Direct Message
              </h3>
              <span class="text-[10px] font-mono font-bold bg-[#E8E4D9] px-2 py-1 border border-[#1A1A1A] text-[#D43F3A]">
                To: 11cheker11@gmail.com
              </span>
            </div>

            ${state.contactSuccess ? `
              <div class="p-6 bg-[#E8E4D9] border-2 border-[#1A1A1A] space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <div class="flex items-center gap-2 text-[#D43F3A]">
                  <i data-lucide="check-circle" class="w-6 h-6"></i>
                  <h4 class="font-serif italic font-bold text-xl text-[#1A1A1A]">Message Sent Successfully!</h4>
                </div>
                <p class="font-sans text-xs text-[#1A1A1A]/90 leading-relaxed">
                  Your inquiry has been processed and routed directly to <strong>11cheker11@gmail.com</strong>.
                </p>
                <div class="p-3 bg-[#F4F1EA] border border-[#1A1A1A] font-mono text-[11px] text-[#1A1A1A]/80">
                  ${state.contactNotice || 'Message processed and logged.'}
                </div>
                <button
                  id="btn-reset-contact"
                  class="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#D43F3A] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ` : `
              <form id="form-contact" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="input-contact-name"
                      required
                      placeholder="e.g. Alex"
                      class="w-full px-3.5 py-2.5 bg-[#E8E4D9] border border-[#1A1A1A] text-xs font-sans text-[#1A1A1A]"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="input-contact-email"
                      required
                      placeholder="e.g. alex@example.com"
                      class="w-full px-3.5 py-2.5 bg-[#E8E4D9] border border-[#1A1A1A] text-xs font-sans text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                    Message / Collaboration Inquiry *
                  </label>
                  <textarea
                    id="input-contact-message"
                    rows="4"
                    required
                    placeholder="Describe your project or inquiry for Arina..."
                    class="w-full px-3.5 py-2.5 bg-[#E8E4D9] border border-[#1A1A1A] text-xs font-sans text-[#1A1A1A]"
                  ></textarea>
                </div>

                ${state.contactError ? `
                  <div class="p-3 bg-[#D43F3A]/10 border border-[#D43F3A] text-[#D43F3A] text-xs font-bold">
                    ${state.contactError}
                  </div>
                ` : ''}

                <button
                  type="submit"
                  ${state.contactSubmitting ? 'disabled' : ''}
                  class="w-full py-3 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#D43F3A] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${state.contactSubmitting ? 'opacity-70 cursor-not-allowed' : ''}"
                >
                  ${state.contactSubmitting ? `
                    <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
                    <span>Sending to 11cheker11@gmail.com...</span>
                  ` : `
                    <i data-lucide="send" class="w-4 h-4"></i>
                    <span>Send Message to 11cheker11@gmail.com</span>
                  `}
                </button>
              </form>
            `}
          </div>

        </div>
      </div>
    </section>
  `;
}

// --------------------------------------------------
// SLIDE DECK VIEW MODE
// --------------------------------------------------
function renderDeckView() {
  return `
    <div class="py-8 bg-[#F4F1EA] min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div class="max-w-6xl mx-auto px-4 w-full flex-1 flex flex-col justify-center space-y-4">
        
        <!-- Deck Header Control Bar -->
        <div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#D43F3A] animate-pulse"></span>
            <span class="font-serif italic font-bold text-sm text-[#1A1A1A]">ARINA CHEKOTUN RESUME DECK</span>
            <span>•</span>
            <span class="text-[#D43F3A]">SLIDE PRESENTATION</span>
          </div>

          <div class="flex items-center gap-4">
            <button
              id="btn-toggle-deck-thumbnails"
              class="flex items-center gap-1.5 px-3 py-1 bg-[#F4F1EA] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#D43F3A] hover:text-white transition-all font-bold"
            >
              <i data-lucide="grid" class="w-3.5 h-3.5"></i>
              <span>${state.showDeckThumbnails ? 'Hide Index' : 'All Slides'}</span>
            </button>

            <span class="font-mono text-xs font-bold bg-[#E8E4D9] px-3 py-1 border border-[#1A1A1A] text-[#1A1A1A]">
              ${String(state.currentSlide + 1).padStart(2, '0')} / ${String(TOTAL_SLIDES).padStart(2, '0')}
            </span>
          </div>
        </div>

        <!-- Thumbnail Selector Grid -->
        ${state.showDeckThumbnails ? `
          <div class="grid grid-cols-4 sm:grid-cols-8 gap-2 p-3 bg-[#E8E4D9] border-2 border-[#1A1A1A]">
            ${Array.from({ length: TOTAL_SLIDES }).map((_, idx) => `
              <button
                class="btn-deck-jump py-2 px-1 text-center font-mono text-xs border transition-all ${
                  state.currentSlide === idx
                    ? 'bg-[#1A1A1A] text-[#F4F1EA] border-[#1A1A1A]'
                    : 'bg-[#F4F1EA] text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#D43F3A] hover:text-white'
                }"
                data-slide="${idx}"
              >
                SLIDE ${String(idx + 1).padStart(2, '0')}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- 16:9 Presentation Canvas Container -->
        <div class="relative aspect-[16/9] bg-[#F4F1EA] border-2 border-[#1A1A1A] p-6 sm:p-10 shadow-[12px_12px_0px_0px_#1A1A1A] overflow-y-auto flex flex-col justify-between">
          ${renderSlideContent(state.currentSlide)}
        </div>

        <!-- Deck Bottom Controls -->
        <div class="flex items-center justify-between">
          <button
            id="btn-deck-prev"
            class="px-5 py-2.5 bg-[#F4F1EA] border border-[#1A1A1A] text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:bg-[#D43F3A] hover:text-white transition-all flex items-center gap-2"
          >
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span>Previous Slide</span>
          </button>

          <div class="flex items-center gap-1.5">
            ${Array.from({ length: TOTAL_SLIDES }).map((_, idx) => `
              <button
                class="btn-deck-dot w-2.5 h-2.5 transition-all ${
                  state.currentSlide === idx ? 'bg-[#D43F3A] w-6' : 'bg-[#1A1A1A]/30 hover:bg-[#1A1A1A]'
                }"
                data-slide="${idx}"
              ></button>
            `).join('')}
          </div>

          <button
            id="btn-deck-next"
            class="px-5 py-2.5 bg-[#1A1A1A] text-[#F4F1EA] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D43F3A] transition-all flex items-center gap-2"
          >
            <span>Next Slide</span>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        </div>

      </div>
    </div>
  `;
}

function renderSlideContent(index) {
  const slide = RESUME_SLIDES[index] || RESUME_SLIDES[0];

  return `
    <div class="h-full flex flex-col justify-between space-y-6">
      <div class="flex justify-between items-center text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-3">
        <span class="text-[#D43F3A]">ARINA CHEKOTUN</span>
        <span>SLIDE ${slide.number} OF 08</span>
      </div>

      <div class="grid grid-cols-12 gap-6 items-center flex-1">
        <div class="col-span-8 space-y-4">
          <span class="text-xs font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
            ${slide.subtitle}
          </span>
          <h2 class="font-serif italic font-bold text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A1A] leading-tight">
            ${slide.title}
          </h2>
          <p class="font-sans text-sm sm:text-base text-[#1A1A1A]/90 leading-relaxed bg-[#E8E4D9] p-4 border border-[#1A1A1A]">
            ${slide.content}
          </p>
        </div>
        <div class="col-span-4 h-full max-h-[260px] border border-[#1A1A1A] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
            alt="Slide Visual"
            class="w-full h-full object-cover grayscale contrast-110"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>

      <div class="pt-3 border-t-2 border-[#1A1A1A] flex justify-between text-xs font-mono font-bold text-[#1A1A1A]/70">
        <span>KHERSON / ODESA, UKRAINE • 11CHEKER11@GMAIL.COM</span>
        <span>USE ARROW KEYS TO NAVIGATE</span>
      </div>
    </div>
  `;
}

// --------------------------------------------------
// FOOTER
// --------------------------------------------------
function renderFooter() {
  return `
    <footer class="bg-[#1A1A1A] text-[#F4F1EA] py-8 border-t-2 border-[#1A1A1A] mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans">
        <div class="flex items-center gap-3">
          <span class="font-serif italic font-bold text-lg text-white">Arina Chekotun</span>
          <span class="text-[#D43F3A]">|</span>
          <span class="text-[#E8E4D9]/80 font-mono">IT Developer & Startup Founder</span>
        </div>

        <div class="flex items-center gap-2 text-xs font-mono text-[#E8E4D9]">
          <i data-lucide="mail" class="w-3.5 h-3.5 text-[#D43F3A]"></i>
          <span>Direct Contact: <strong class="text-[#D43F3A]">11cheker11@gmail.com</strong></span>
        </div>

        <div class="text-[#E8E4D9]/60 text-center sm:text-right">
          Official Resume Portfolio • 2026
        </div>
      </div>
    </footer>
  `;
}

// --------------------------------------------------
// MODALS
// --------------------------------------------------
function renderProjectModal(project) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm overflow-y-auto">
      <div class="bg-[#F4F1EA] border-2 border-[#1A1A1A] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_0px_#1A1A1A] relative">
        
        <!-- Modal Top Bar -->
        <div class="sticky top-0 bg-[#E8E4D9] border-b-2 border-[#1A1A1A] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">
              PROJECT DETAILS • ${project.category}
            </span>
            <h3 class="font-serif italic font-bold text-xl text-[#1A1A1A]">
              ${project.title}
            </h3>
          </div>

          <button id="modal-project-close" class="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 sm:p-8 space-y-6">
          <div class="border border-[#1A1A1A] aspect-video relative overflow-hidden">
            <img
              src="${project.image}"
              alt="${project.title}"
              class="w-full h-full object-cover grayscale contrast-110"
              referrerpolicy="no-referrer"
            />
            <div class="absolute inset-0 bg-[#1A1A1A]/40 flex items-end p-6">
              <div class="text-[#F4F1EA]">
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#D43F3A] block bg-[#1A1A1A] px-2 py-0.5 inline-block mb-1 border border-[#1A1A1A]">
                  ${project.subtitle}
                </span>
                <h4 class="font-serif italic font-bold text-3xl text-white">
                  ${project.title}
                </h4>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 p-4 bg-[#E8E4D9] border border-[#1A1A1A]">
            ${project.metrics.map(m => `
              <div class="text-center">
                <span class="font-serif italic font-bold text-2xl text-[#D43F3A] block">${m.value}</span>
                <span class="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider block mt-0.5">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <div class="space-y-3">
            <h5 class="font-bold text-xs uppercase tracking-[0.2em] text-[#D43F3A]">Project Summary</h5>
            <p class="font-sans text-sm text-[#1A1A1A]/80 leading-relaxed">${project.longDescription}</p>
          </div>

          <div class="space-y-3">
            <h5 class="font-bold text-xs uppercase tracking-[0.2em] text-[#D43F3A]">Highlights & Implementation</h5>
            <ul class="space-y-2">
              ${project.highlights.map(h => `
                <li class="flex items-start gap-2 text-xs sm:text-sm text-[#1A1A1A]/80">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-[#D43F3A] shrink-0 mt-0.5"></i>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="sticky bottom-0 bg-[#E8E4D9] border-t-2 border-[#1A1A1A] px-6 py-4 flex items-center justify-end">
          <button id="modal-project-close-btn" class="px-5 py-2 border border-[#1A1A1A] bg-[#1A1A1A] text-white hover:bg-[#D43F3A] font-bold text-xs uppercase tracking-[0.2em]">
            Close
          </button>
        </div>

      </div>
    </div>
  `;
}

function renderResumeModal() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm overflow-y-auto">
      <div class="bg-[#F4F1EA] border-2 border-[#1A1A1A] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_0px_#1A1A1A] relative">
        
        <div class="sticky top-0 bg-[#E8E4D9] border-b-2 border-[#1A1A1A] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <span class="text-[10px] font-bold text-[#D43F3A] uppercase tracking-[0.2em] block">OFFICIAL RESUME</span>
            <h3 class="font-serif italic font-bold text-lg text-[#1A1A1A]">
              Arina Chekotun — Curriculum Vitae
            </h3>
          </div>

          <div class="flex items-center gap-2">
            <button
              id="btn-print-resume"
              class="px-3.5 py-1.5 border border-[#1A1A1A] text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A] bg-[#F4F1EA] hover:bg-[#D43F3A] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Print / Save PDF</span>
            </button>
            <button id="modal-resume-close" class="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F1EA]">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <div class="p-8 sm:p-12 space-y-8 bg-[#F4F1EA] text-[#1A1A1A] font-sans">
          
          <div class="border-b-2 border-[#1A1A1A] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 class="font-serif italic font-normal text-4xl uppercase tracking-tight text-[#1A1A1A]">
                ARINA CHEKOTUN
              </h1>
              <p class="font-sans font-bold text-xs text-[#D43F3A] uppercase tracking-[0.2em] mt-1">
                IT Developer, Startup Founder & Web Designer
              </p>
            </div>
            <div class="font-sans text-xs text-[#1A1A1A]/80 font-medium space-y-0.5 text-left sm:text-right">
              <div><strong>Email:</strong> 11cheker11@gmail.com</div>
              <div><strong>Location:</strong> Kherson city (currently in Odesa)</div>
              <div><strong>Birth Date:</strong> April 11, 2008 | Female | Ukrainian</div>
              <div><strong>Languages:</strong> Ukrainian (Native), English (B1->B2)</div>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="font-bold text-xs uppercase tracking-[0.2em] text-[#D43F3A] border-b border-[#1A1A1A] pb-1">
              PERSONAL TRAITS & SUMMARY
            </h2>
            <p class="font-sans text-xs text-[#1A1A1A]/85 leading-relaxed">
              ${PERSONAL_INFO.bio}
            </p>
          </div>

          <div class="space-y-2">
            <h2 class="font-bold text-xs uppercase tracking-[0.2em] text-[#D43F3A] border-b border-[#1A1A1A] pb-1">
              SKILLS MATRIX
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#1A1A1A]/85">
              <div>• <strong>Programming:</strong> Python, HTML & CSS, JavaScript, C++, Tailwind CSS, Bootstrap, Git & GitHub</div>
              <div>• <strong>Design & Tools:</strong> Figma, Canva, AI instruments, CapCut, MS Word/Excel/PowerPoint</div>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="font-bold text-xs uppercase tracking-[0.2em] text-[#D43F3A] border-b border-[#1A1A1A] pb-1">
              EXPERIENCE
            </h2>

            <div class="space-y-1">
              <div class="flex justify-between font-serif italic text-sm font-bold">
                <span>IT Startup Founder & Lead Developer</span>
                <span class="font-sans text-xs font-bold text-[#D43F3A]">Ongoing</span>
              </div>
              <ul class="list-disc list-inside text-xs text-[#1A1A1A]/85 space-y-1 pl-1">
                <li>Development of startups and own projects in the IT field.</li>
                <li>Creation of Python chatbots, management of social networks (SMM).</li>
                <li>Author of computer science courses and a dedicated learning platform for beginners.</li>
              </ul>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between font-serif italic text-sm font-bold">
                <span>Freelance IT Specialist & Designer</span>
                <span class="font-sans text-xs font-bold text-[#D43F3A]">Ongoing</span>
              </div>
              <ul class="list-disc list-inside text-xs text-[#1A1A1A]/85 space-y-1 pl-1">
                <li>Freelance creation of advertising banners, presentations, web design, and logos.</li>
                <li>Assistance with Word, Excel, and PowerPoint technical tasks.</li>
              </ul>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="font-bold text-xs uppercase tracking-[0.2em] text-[#D43F3A] border-b border-[#1A1A1A] pb-1">
              ACHIEVEMENTS & PROJECTS
            </h2>
            <ul class="list-disc list-inside text-xs text-[#1A1A1A]/85 space-y-1 pl-1">
              ${ACHIEVEMENTS.map(a => `
                <li><strong>${a.title}</strong> — ${a.organization} (${a.year})</li>
              `).join('')}
            </ul>
          </div>

          <div class="space-y-2">
            <h2 class="font-bold text-xs uppercase tracking-[0.2em] text-[#D43F3A] border-b border-[#1A1A1A] pb-1">
              EDUCATION & COURSES
            </h2>
            <div class="text-xs text-[#1A1A1A]/85 space-y-1">
              <div>• <strong>International University</strong> — 1st year student</div>
              <div>• <strong>Kherson Scientific Lyceum of Kherson Regional Council</strong></div>
              <div>• <strong>Courses:</strong> Google AI Professional Certificate (in process), Genius Space Frontend & AI, MAN Web & Frontend Development, FreeCodeCamp JS (in process), Python Beginner Course.</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

function renderConsultationModal() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm">
      <div class="bg-[#F4F1EA] border-2 border-[#1A1A1A] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-[12px_12px_0px_0px_#1A1A1A] relative">
        
        <div class="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
          <div class="flex items-center gap-2">
            <i data-lucide="sparkles" class="w-5 h-5 text-[#D43F3A]"></i>
            <h3 class="font-serif italic font-bold text-xl text-[#1A1A1A]">
              Contact Arina Chekotun
            </h3>
          </div>

          <button id="modal-consultation-close" class="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F1EA]">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        ${state.bookingSuccess ? `
          <div class="p-6 bg-[#E8E4D9] border border-[#1A1A1A] text-center space-y-4">
            <div class="w-12 h-12 bg-[#D43F3A] text-white flex items-center justify-center mx-auto border border-[#1A1A1A]">
              <i data-lucide="check" class="w-6 h-6"></i>
            </div>
            <h4 class="font-serif italic font-bold text-xl text-[#1A1A1A]">
              Message Dispatched!
            </h4>
            <p class="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed">
              Inquiry sent directly to <strong>11cheker11@gmail.com</strong>.
            </p>
            <button
              id="btn-done-booking"
              class="px-6 py-2 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#D43F3A] text-xs font-bold uppercase tracking-[0.2em]"
            >
              Done
            </button>
          </div>
        ` : `
          <form id="form-consultation" class="space-y-4">
            <p class="font-sans text-xs text-[#1A1A1A]/80">
              Schedule a meeting or send a quick proposal directly to Arina Chekotun (11cheker11@gmail.com).
            </p>

            <div class="space-y-1">
              <label class="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                Select Meeting Date
              </label>
              <input
                type="date"
                id="input-booking-date"
                value="${state.bookingDate}"
                class="w-full px-3.5 py-2.5 bg-[#E8E4D9] border border-[#1A1A1A] text-xs font-sans text-[#1A1A1A]"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="space-y-1">
                <label class="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  id="input-booking-name"
                  value="${state.bookingName}"
                  placeholder="e.g. Alex"
                  class="w-full px-3.5 py-2.5 bg-[#E8E4D9] border border-[#1A1A1A] text-xs font-sans text-[#1A1A1A]"
                />
              </div>

              <div class="space-y-1">
                <label class="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  id="input-booking-email"
                  value="${state.bookingEmail}"
                  placeholder="e.g. alex@example.com"
                  class="w-full px-3.5 py-2.5 bg-[#E8E4D9] border border-[#1A1A1A] text-xs font-sans text-[#1A1A1A]"
                />
              </div>
            </div>

            ${state.bookingError ? `
              <div class="p-3 bg-[#D43F3A]/10 border border-[#D43F3A] text-[#D43F3A] text-xs font-bold">
                ${state.bookingError}
              </div>
            ` : ''}

            <button
              type="submit"
              ${state.bookingSubmitting ? 'disabled' : ''}
              class="w-full py-3 bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#D43F3A] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${state.bookingSubmitting ? 'opacity-70 cursor-not-allowed' : ''}"
            >
              ${state.bookingSubmitting ? `
                <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
                <span>Sending to 11cheker11@gmail.com...</span>
              ` : `
                <span>Send Request to 11cheker11@gmail.com</span>
              `}
            </button>
          </form>
        `}

      </div>
    </div>
  `;
}

function renderInboxModal() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm overflow-y-auto">
      <div class="bg-[#F4F1EA] border-2 border-[#1A1A1A] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_0px_#1A1A1A] relative space-y-6 p-6 sm:p-8">
        
        <div class="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#D43F3A] text-white flex items-center justify-center border border-[#1A1A1A]">
              <i data-lucide="inbox" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="font-serif italic font-bold text-2xl text-[#1A1A1A]">
                Received Messages Log
              </h3>
              <span class="text-xs font-mono font-bold text-[#D43F3A]">
                Target Recipient: 11cheker11@gmail.com
              </span>
            </div>
          </div>

          <button id="modal-inbox-close" class="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F1EA]">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <p class="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed">
          All website inquiries are automatically routed to <strong>11cheker11@gmail.com</strong>. The real-time server activity log below displays all messages:
        </p>

        ${state.inboxLoading ? `
          <div class="p-8 text-center text-xs font-mono">
            Loading message log from server...
          </div>
        ` : state.inboxMessages.length === 0 ? `
          <div class="p-8 bg-[#E8E4D9] border border-[#1A1A1A] text-center text-xs font-mono space-y-2">
            <p class="font-bold text-[#1A1A1A]">The message log is currently empty.</p>
            <p class="text-[#1A1A1A]/70">Submit a message via the contact form to test live message routing to 11cheker11@gmail.com.</p>
          </div>
        ` : `
          <div class="space-y-4">
            ${state.inboxMessages.map(msg => `
              <div class="p-4 bg-[#E8E4D9] border-2 border-[#1A1A1A] space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A1A1A]/30 pb-2 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-[#1A1A1A] text-white font-mono text-[10px] font-bold uppercase">${msg.type}</span>
                    <span class="font-bold text-[#1A1A1A]">${msg.name}</span>
                    <span class="text-[#1A1A1A]/70">&lt;${msg.email}&gt;</span>
                  </div>
                  <span class="font-mono text-[10px] text-[#D43F3A] font-bold">${new Date(msg.timestamp).toLocaleString()}</span>
                </div>

                <div class="font-serif italic font-bold text-sm text-[#1A1A1A]">
                  ${msg.subject}
                </div>

                <p class="font-sans text-xs text-[#1A1A1A]/90 bg-[#F4F1EA] p-3 border border-[#1A1A1A] whitespace-pre-wrap">
                  ${msg.message}
                </p>

                <div class="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#1A1A1A]/80 border-t border-[#1A1A1A]/20 pt-2 gap-2">
                  <span>Ref ID: ${msg.id}</span>
                  <span class="text-[#2D5A27] font-bold">✓ Sent to: ${msg.recipientEmail}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}

        <div class="flex justify-end pt-2">
          <button id="modal-inbox-close-btn" class="px-6 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase">
            Close
          </button>
        </div>

      </div>
    </div>
  `;
}

// --------------------------------------------------
// EVENT LISTENERS & DELEGATION
// --------------------------------------------------
function attachEventListeners() {
  const btnViewWebsite = document.getElementById('btn-view-website');
  if (btnViewWebsite) {
    btnViewWebsite.addEventListener('click', () => {
      state.viewMode = 'website';
      renderApp();
    });
  }

  const btnViewDeck = document.getElementById('btn-view-deck');
  if (btnViewDeck) {
    btnViewDeck.addEventListener('click', () => {
      state.viewMode = 'deck';
      renderApp();
    });
  }

  const btnOpenResume = document.getElementById('btn-open-resume');
  if (btnOpenResume) {
    btnOpenResume.addEventListener('click', () => {
      state.showResumeModal = true;
      renderApp();
    });
  }

  const btnOpenConsultation = document.getElementById('btn-open-consultation');
  if (btnOpenConsultation) {
    btnOpenConsultation.addEventListener('click', () => {
      state.showConsultationModal = true;
      state.bookingSuccess = false;
      renderApp();
    });
  }

  const heroBtnCall = document.getElementById('hero-btn-call');
  if (heroBtnCall) {
    heroBtnCall.addEventListener('click', () => {
      state.showConsultationModal = true;
      state.bookingSuccess = false;
      renderApp();
    });
  }

  // Mobile Menu Toggle
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  if (btnMobileMenu) {
    btnMobileMenu.addEventListener('click', () => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      renderApp();
    });
  }

  const mobileViewWebsite = document.getElementById('mobile-view-website');
  if (mobileViewWebsite) {
    mobileViewWebsite.addEventListener('click', () => {
      state.viewMode = 'website';
      state.mobileMenuOpen = false;
      renderApp();
    });
  }

  const mobileViewDeck = document.getElementById('mobile-view-deck');
  if (mobileViewDeck) {
    mobileViewDeck.addEventListener('click', () => {
      state.viewMode = 'deck';
      state.mobileMenuOpen = false;
      renderApp();
    });
  }

  const mobileBtnInbox = document.getElementById('mobile-btn-inbox');
  if (mobileBtnInbox) {
    mobileBtnInbox.addEventListener('click', async () => {
      state.showInboxModal = true;
      state.inboxLoading = true;
      state.mobileMenuOpen = false;
      renderApp();

      try {
        const res = await fetch('/api/messages');
        const data = await res.json();
        state.inboxMessages = data.messages || [];
      } catch (err) {
        console.error('Error fetching inbox messages:', err);
      } finally {
        state.inboxLoading = false;
        renderApp();
      }
    });
  }

  const mobileBtnResume = document.getElementById('mobile-btn-resume');
  if (mobileBtnResume) {
    mobileBtnResume.addEventListener('click', () => {
      state.showResumeModal = true;
      state.mobileMenuOpen = false;
      renderApp();
    });
  }

  const mobileBtnCall = document.getElementById('mobile-btn-call');
  if (mobileBtnCall) {
    mobileBtnCall.addEventListener('click', () => {
      state.showConsultationModal = true;
      state.bookingSuccess = false;
      state.mobileMenuOpen = false;
      renderApp();
    });
  }

  // Close mobile drawer when clicking anchor links inside drawer
  document.querySelectorAll('header nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (state.mobileMenuOpen) {
        state.mobileMenuOpen = false;
        renderApp();
      }
    });
  });

  // Project Category Tab Filters
  document.querySelectorAll('.btn-category-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-category');
      state.selectedCategoryTab = cat;
      renderApp();
    });
  });

  // Carousel Prev Button
  document.querySelectorAll('.btn-carousel-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catId = e.currentTarget.getAttribute('data-category');
      const catProjects = PROJECTS.filter(p => p.category === catId);
      if (!catProjects.length) return;
      const currentIdx = state.carouselIndices[catId] || 0;
      const newIdx = (currentIdx - 1 + catProjects.length) % catProjects.length;
      state.carouselIndices[catId] = newIdx;
      renderApp();
    });
  });

  // Carousel Next Button
  document.querySelectorAll('.btn-carousel-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catId = e.currentTarget.getAttribute('data-category');
      const catProjects = PROJECTS.filter(p => p.category === catId);
      if (!catProjects.length) return;
      const currentIdx = state.carouselIndices[catId] || 0;
      const newIdx = (currentIdx + 1) % catProjects.length;
      state.carouselIndices[catId] = newIdx;
      renderApp();
    });
  });

  // Carousel Dot Jump
  document.querySelectorAll('.btn-carousel-dot').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catId = e.currentTarget.getAttribute('data-category');
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      state.carouselIndices[catId] = idx;
      renderApp();
    });
  });

  // Carousel Thumbnail Jump
  document.querySelectorAll('.btn-carousel-thumb').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catId = e.currentTarget.getAttribute('data-category');
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      state.carouselIndices[catId] = idx;
      renderApp();
    });
  });

  // Open Project Modal
  document.querySelectorAll('.btn-open-project').forEach(card => {
    card.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const found = PROJECTS.find(p => p.id === id);
      if (found) {
        state.selectedProject = found;
        renderApp();
      }
    });
  });

  // Modal Close Handlers
  const modalProjectClose = document.getElementById('modal-project-close');
  if (modalProjectClose) {
    modalProjectClose.addEventListener('click', () => {
      state.selectedProject = null;
      renderApp();
    });
  }

  const modalProjectCloseBtn = document.getElementById('modal-project-close-btn');
  if (modalProjectCloseBtn) {
    modalProjectCloseBtn.addEventListener('click', () => {
      state.selectedProject = null;
      renderApp();
    });
  }

  const modalResumeClose = document.getElementById('modal-resume-close');
  if (modalResumeClose) {
    modalResumeClose.addEventListener('click', () => {
      state.showResumeModal = false;
      renderApp();
    });
  }

  const btnPrintResume = document.getElementById('btn-print-resume');
  if (btnPrintResume) {
    btnPrintResume.addEventListener('click', () => {
      window.print();
    });
  }

  const modalConsultationClose = document.getElementById('modal-consultation-close');
  if (modalConsultationClose) {
    modalConsultationClose.addEventListener('click', () => {
      state.showConsultationModal = false;
      renderApp();
    });
  }

  const btnDoneBooking = document.getElementById('btn-done-booking');
  if (btnDoneBooking) {
    btnDoneBooking.addEventListener('click', () => {
      state.showConsultationModal = false;
      renderApp();
    });
  }

  // Deck Controls
  const btnToggleThumbnails = document.getElementById('btn-toggle-deck-thumbnails');
  if (btnToggleThumbnails) {
    btnToggleThumbnails.addEventListener('click', () => {
      state.showDeckThumbnails = !state.showDeckThumbnails;
      renderApp();
    });
  }

  const btnDeckPrev = document.getElementById('btn-deck-prev');
  if (btnDeckPrev) {
    btnDeckPrev.addEventListener('click', prevSlide);
  }

  const btnDeckNext = document.getElementById('btn-deck-next');
  if (btnDeckNext) {
    btnDeckNext.addEventListener('click', nextSlide);
  }

  document.querySelectorAll('.btn-deck-jump').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-slide'), 10);
      state.currentSlide = idx;
      state.showDeckThumbnails = false;
      renderApp();
    });
  });

  document.querySelectorAll('.btn-deck-dot').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-slide'), 10);
      state.currentSlide = idx;
      renderApp();
    });
  });

  // Inbox Modal Trigger
  const btnOpenInbox = document.getElementById('btn-open-inbox');
  if (btnOpenInbox) {
    btnOpenInbox.addEventListener('click', async () => {
      state.showInboxModal = true;
      state.inboxLoading = true;
      renderApp();

      try {
        const res = await fetch('/api/messages');
        const data = await res.json();
        state.inboxMessages = data.messages || [];
      } catch (err) {
        console.error('Error fetching inbox messages:', err);
      } finally {
        state.inboxLoading = false;
        renderApp();
      }
    });
  }

  const modalInboxClose = document.getElementById('modal-inbox-close');
  if (modalInboxClose) {
    modalInboxClose.addEventListener('click', () => {
      state.showInboxModal = false;
      renderApp();
    });
  }

  const modalInboxCloseBtn = document.getElementById('modal-inbox-close-btn');
  if (modalInboxCloseBtn) {
    modalInboxCloseBtn.addEventListener('click', () => {
      state.showInboxModal = false;
      renderApp();
    });
  }

  const btnResetContact = document.getElementById('btn-reset-contact');
  if (btnResetContact) {
    btnResetContact.addEventListener('click', () => {
      state.contactSuccess = false;
      state.contactNotice = null;
      state.contactError = null;
      renderApp();
    });
  }

  // Form Submissions
  const formContact = document.getElementById('form-contact');
  if (formContact) {
    formContact.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('input-contact-name');
      const emailInput = document.getElementById('input-contact-email');
      const messageInput = document.getElementById('input-contact-message');

      const nameVal = nameInput ? nameInput.value : '';
      const emailVal = emailInput ? emailInput.value : '';
      const messageVal = messageInput ? messageInput.value : '';

      state.contactSubmitting = true;
      state.contactSuccess = false;
      state.contactError = null;
      renderApp();

      try {
        let sent = false;
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'contact',
              name: nameVal,
              email: emailVal,
              subject: 'Direct Message to Arina Chekotun',
              message: messageVal,
              recipientEmail: '11cheker11@gmail.com'
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              state.contactSuccess = true;
              state.contactNotice = data.userNotice || `Message sent to 11cheker11@gmail.com`;
              sent = true;
            }
          }
        } catch (serverErr) {
          console.warn('Backend endpoint unavailable, falling back to direct static web3forms delivery');
        }

        if (!sent) {
          // Direct client-side submission for static hosting (GitHub Pages)
          const w3Res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: "07d6a5e1-8846-4c40-9a28-1edc1bf32662",
              to_email: "11cheker11@gmail.com",
              name: nameVal,
              email: emailVal,
              subject: `Direct Message to Arina Chekotun from ${nameVal}`,
              message: messageVal
            })
          });
          const w3Data = await w3Res.json();
          if (w3Data.success || w3Res.ok) {
            state.contactSuccess = true;
            state.contactNotice = `Message sent successfully to 11cheker11@gmail.com!`;
          } else {
            state.contactError = 'Could not send message. Please email 11cheker11@gmail.com directly.';
          }
        }
      } catch (err) {
        state.contactError = 'Network error while sending message. Please email 11cheker11@gmail.com.';
      } finally {
        state.contactSubmitting = false;
        renderApp();
      }
    });
  }

  const formConsultation = document.getElementById('form-consultation');
  if (formConsultation) {
    formConsultation.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('input-booking-name');
      const emailInput = document.getElementById('input-booking-email');
      const dateInput = document.getElementById('input-booking-date');

      const nameVal = nameInput ? nameInput.value : '';
      const emailVal = emailInput ? emailInput.value : '';
      const dateVal = dateInput ? dateInput.value : state.bookingDate;

      state.bookingName = nameVal;
      state.bookingEmail = emailVal;
      state.bookingDate = dateVal;

      state.bookingSubmitting = true;
      state.bookingError = null;
      renderApp();

      try {
        let sent = false;
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'consultation',
              name: nameVal,
              email: emailVal,
              subject: 'Meeting Request for Arina Chekotun',
              bookingDate: dateVal,
              bookingTime: state.bookingTime,
              message: `Meeting request regarding IT project on ${dateVal}`,
              recipientEmail: '11cheker11@gmail.com'
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              state.bookingSuccess = true;
              sent = true;
            }
          }
        } catch (serverErr) {
          console.warn('Backend unavailable, falling back to direct static web3forms delivery');
        }

        if (!sent) {
          const w3Res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: "07d6a5e1-8846-4c40-9a28-1edc1bf32662",
              to_email: "11cheker11@gmail.com",
              name: nameVal,
              email: emailVal,
              subject: `Meeting Request for Arina Chekotun from ${nameVal}`,
              message: `Meeting date: ${dateVal} at ${state.bookingTime}`
            })
          });
          if (w3Res.ok) {
            state.bookingSuccess = true;
          } else {
            state.bookingError = 'Could not submit meeting request. Please email 11cheker11@gmail.com directly.';
          }
        }
      } catch (err) {
        state.bookingError = 'Could not submit booking details. Please email 11cheker11@gmail.com.';
      } finally {
        state.bookingSubmitting = false;
        renderApp();
      }
    });
  }
}
