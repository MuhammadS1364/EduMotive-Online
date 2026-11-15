import type {
  AdPlanRecord,
  AdRecord,
  ArticleRecord,
  AuthorRecord,
  BadgeRecord,
  BaseRecord,
  HeroSlideRecord,
  InitiativeRecord,
  IssueRecord,
  LetterRecord,
  NewsRecord,
  PlanRecord,
  ProfileRecord,
  ProgramRecord,
  ResultRecord,
  SectionRecord,
  SiteSettingsRecord,
  SubscriptionRecord,
  TeamMemberRecord,
  TierRecord,
} from './types';

export const INITIAL_SEED: {
  siteSettings: SiteSettingsRecord[];
  sections: SectionRecord[];
  tiers: TierRecord[];
  badges: BadgeRecord[];
  authors: AuthorRecord[];
  issues: IssueRecord[];
  articles: ArticleRecord[];
  letters: LetterRecord[];
  programs: ProgramRecord[];
  results: ResultRecord[];
  teamMembers: TeamMemberRecord[];
  plans: PlanRecord[];
  subscriptions: SubscriptionRecord[];
  ads: AdRecord[];
  profiles: ProfileRecord[];
  notes: BaseRecord[];
  posts: BaseRecord[];
  postLikes: BaseRecord[];
  stories: BaseRecord[];
  adPlans: AdPlanRecord[];
  heroSlides: HeroSlideRecord[];
  news: NewsRecord[];
  initiatives: InitiativeRecord[];
} = {
  siteSettings: [
    {
      id: 'site_1',
      name: 'EduMotive Trimonthly',
      aboutText:
        'EduMotive Trimonthly is the official student magazine of Darul Huda Islamic University — a meeting ground for rigorous scholarship, literary craft, campus reportage, and visionary student voices across disciplines.\n\nFounded to nurture thoughtful writing and intellectual dialogue, every quarterly print and digital issue brings together essays, poetry, technology dispatches, and cultural reflections shaped by young minds.',
      vision:
        'To cultivate an articulate, compassionate generation of student thinkers and storytellers whose ideas bridge heritage and modernity.',
      mission:
        'To publish fearless student journalism, creative literature, and interdisciplinary research in print and digital editions accessible to every campus.',
      teamPhoto:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop',
      logo: '',
      paymentQr:
        'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=upi://pay?pa=edumotive@upi&pn=EduMotive',
      upiId: 'edumotive@upi',
      showPrograms: true,
      showResults: true,
      showSubscribe: true,
      contactEmail: 'edumotive4@gmail.com',
      instagram: 'https://instagram.com/edumotive.in',
      facebook: 'https://facebook.com/search/top?q=EduMotive%20Trimonthly',
      xLink: 'https://x.com/search?q=EduMotive%20Trimonthly',
      freePdfPages: 2,
      phone: '+91 82505 83682',
      phones: '+91 82505 83682\n+91 94460 12345',
      address: 'Darul Huda Islamic University, Chemmad, Kerala, India',
      motto: 'Empowering Minds, Shaping Future',
    },
  ],

  sections: [
    { id: 'sec_digizone', name: 'DigiZone', description: 'AI, open-source tools, digital ethics, and campus tech.', visible: true, sortOrder: 1 },
    { id: 'sec_litvilla', name: 'LitVilla', description: 'Short fiction, poetry, translations, and literary criticism.', visible: true, sortOrder: 2 },
    { id: 'sec_blueprint', name: 'Blueprint', description: 'Architecture, pedagogy, research essays, and academic craft.', visible: true, sortOrder: 3 },
    { id: 'sec_bizbuzz', name: 'BizBuzz', description: 'Student entrepreneurship, ethical finance, and social startups.', visible: true, sortOrder: 4 },
    { id: 'sec_universe', name: 'UniVerse', description: 'Campus chronicles, debates, and voices from the courtyard.', visible: true, sortOrder: 5 },
    { id: 'sec_soulsteps', name: 'SoulSteps', description: 'Reflections on purpose, ethics, and inner resilience.', visible: true, sortOrder: 6 },
    { id: 'sec_pixelplay', name: 'PixelPlay', description: 'Visual arts, cinema reviews, and student photography.', visible: true, sortOrder: 7 },
  ],

  tiers: [
    { id: 'tier_1', name: 'Laureate', minArticles: 3, color: '#FFD369' },
    { id: 'tier_2', name: 'Fellow', minArticles: 2, color: '#94D82D' },
    { id: 'tier_3', name: 'Contributor', minArticles: 1, color: '#74C0FC' },
  ],

  badges: [
    { id: 'badge_1', name: 'Editor’s Pick', description: 'Selected for cover-story distinction.', icon: '' },
    { id: 'badge_2', name: 'Campus Chronicler', description: 'Recognized for outstanding campus reporting.', icon: '' },
  ],

  authors: [
    {
      id: 'auth_1',
      name: 'Muhammad Shafee',
      post: 'Senior Editor',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      bio: 'Writes on digital culture, Arabic-Malayalam print heritage, and student journalism.',
      email: 'shafee@edumotive.in',
      instagram: 'https://instagram.com/edumotive.in',
      institution: 'Darul Huda Islamic University',
      badges: ['badge_1', 'badge_2'],
      penName: 'Al-Qalam',
      showPenName: true,
    },
    {
      id: 'auth_2',
      name: 'Aysha Rahman',
      post: 'Literary Columnist',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
      bio: 'Explores postcolonial fiction, translated poetry, and memory in South Asian literature.',
      email: 'aysha@edumotive.in',
      institution: 'University of Calicut',
      badges: ['badge_1'],
      penName: 'Noora',
      showPenName: true,
    },
    {
      id: 'auth_3',
      name: 'Zainul Abideen',
      post: 'Tech & Policy Writer',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop',
      bio: 'Focuses on ethical AI, open educational resources, and low-bandwidth learning tools.',
      email: 'zain@edumotive.in',
      institution: 'Darul Huda Islamic University',
      badges: ['badge_2'],
    },
    {
      id: 'auth_4',
      name: 'Fathima Nihala',
      post: 'Visual Arts & Culture',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop',
      bio: 'Documents vernacular architecture, calligraphy, and documentary photography.',
      email: 'nihala@edumotive.in',
      institution: 'Jamia Millia Islamia',
    },
  ],

  issues: [
    {
      id: 'issue_1',
      title: 'Horizons of Thought',
      issueDate: '2026-10-01',
      volume: 'Vol. 14 · Issue 3',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop',
      pdf: '/api/issues/issue_1.pdf',
      description: 'Our autumn trimonthly examines how open knowledge, quiet libraries, and student-led presses are reshaping academic life.',
      published: true,
    },
    {
      id: 'issue_2',
      title: 'Voices from the Courtyard',
      issueDate: '2026-07-01',
      volume: 'Vol. 14 · Issue 2',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop',
      pdf: '/api/issues/issue_2.pdf',
      description: 'Monsoon essays, campus debates, and conversations with young scholars building sustainable cooperatives.',
      published: true,
    },
  ],

  articles: [
    {
      id: 'art_1',
      title: 'The Quiet Architecture of Campus Libraries',
      slug: 'quiet-architecture-campus-libraries',
      excerpt: 'Why physical reading rooms remain irreplaceable spaces for deep attention in an age of algorithmic distraction.',
      mainImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&auto=format&fit=crop',
      imageCaption: 'Afternoon light across the central reading hall during exam week.',
      section: 'sec_blueprint',
      author: 'auth_1',
      issue: 'issue_1',
      status: 'Published',
      premium: false,
      featured: true,
      publishedAt: '2026-10-18T10:00:00Z',
      content: `Walking into a university reading hall at dawn feels like stepping outside the clock of notifications. Shelves of annotated volumes stand in patient rows, holding centuries of dialogue across languages and continents.

## Attention as a Shared Civic Space

When students gather around long timber tables, concentration becomes contagious. Unlike a solo screen glowing at midnight, a library turns quiet study into a communal ritual.

### Designing for Light and Silence

Great campus architecture never treats silence as emptiness. High clerestory windows, acoustic plaster, and warm reading lamps invite sustained inquiry without fatigue.

> “A library is not merely a warehouse of answers; it is a sanctuary where better questions learn to breathe.”

## Building Digital Mirrors Without Losing Soil

Digital archives expand reach to remote colleges, yet physical print magazines and library tables anchor memory in place. The future belongs to campuses that cherish both.`,
    },
    {
      id: 'art_2',
      title: 'Open-Source AI Tools in Rural Classrooms',
      slug: 'open-source-ai-rural-classrooms',
      excerpt: 'How lightweight offline models and bilingual study companions are bridging resource gaps across regional colleges.',
      mainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop',
      imageCaption: 'Student developers testing local language translation tools in the lab.',
      section: 'sec_digizone',
      author: 'auth_3',
      issue: 'issue_1',
      status: 'Published',
      premium: false,
      featured: false,
      publishedAt: '2026-10-15T09:00:00Z',
      content: `Technology only fulfills its educational promise when it works where bandwidth is scarce and hardware is modest. Across campuses in Kerala and beyond, student collectives are packaging open textbooks and compact language assistants onto shared lab machines.

## Offline-First Pedagogy

Instead of locking notes behind expensive cloud subscriptions, open repositories let teachers customize syllabi in Malayalam, Arabic, Urdu, and English.

### Community Governance

Students themselves act as maintainers, verifying citations and curating problem sets for incoming cohorts.`,
    },
    {
      id: 'art_3',
      title: 'Letters Across Monsoon Verandas',
      slug: 'letters-across-monsoon-verandas',
      excerpt: 'A short story about two friends trading annotated paperbacks between hostel corridors during July rains.',
      mainImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop',
      imageCaption: 'Handwritten margins often outlive the cover.',
      section: 'sec_litvilla',
      author: 'auth_2',
      issue: 'issue_1',
      status: 'Published',
      premium: true,
      featured: false,
      publishedAt: '2026-10-12T08:30:00Z',
      content: `Every July, the red laterite path outside the eastern hostel turned into a ribbon of rain-washed clay. Inside, the corridor smelled of wet chalk, cardamom tea, and damp binding glue.

## Margins That Remember

Before leaving for semester break, Tariq slipped a folded postcard between pages eighty-four and eighty-five of a worn anthology. No dates, only a question penciled in neat script.

### What Print Carries

Years later, long after group chats scrolled into oblivion, those pencil notes still held the exact cadence of a monsoon afternoon.

## The Epilogue in the Archive

When the alumni shelf was catalogued in autumn, three generations of students had added their own replies to that single margin.`,
    },
    {
      id: 'art_4',
      title: 'Student Cooperatives and Ethical Campus Commerce',
      slug: 'student-cooperatives-ethical-commerce',
      excerpt: 'From campus bookshops to zero-waste stationery studios, young founders are rethinking profit and stewardship.',
      mainImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
      imageCaption: 'Cooperative bookstore ledgers prepared by commerce undergraduates.',
      section: 'sec_bizbuzz',
      author: 'auth_1',
      issue: 'issue_1',
      status: 'Published',
      premium: false,
      featured: false,
      publishedAt: '2026-10-08T11:00:00Z',
      content: `Student-run cooperatives are quietly outperforming commercial vendors on affordability and trust. By pooling bulk textbook orders and reinvesting margins into scholarship stipends, campus collectives keep value circulating locally.

## Transparency on One Page

Every semester opens with a public balance sheet pinned to the student notice board.`,
    },
    {
      id: 'art_5',
      title: 'Debates Under the Banyan Tree',
      slug: 'debates-under-the-banyan-tree',
      excerpt: 'Inside the Friday evening rhetoric circle where humanities and science students test ideas without slides.',
      mainImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop',
      imageCaption: 'Weekly open-air dialogue session on campus.',
      section: 'sec_universe',
      author: 'auth_1',
      issue: 'issue_2',
      status: 'Published',
      premium: false,
      featured: false,
      publishedAt: '2026-09-28T14:00:00Z',
      content: `No microphones, no slide decks — just a semi-circle of notebooks and twenty minutes of uninterrupted argument followed by cross-examination.

## Learning to Listen Before Rebutting

The first rule of the circle requires every speaker to restate their opponent’s strongest point before offering a counterpoint.`,
    },
    {
      id: 'art_6',
      title: 'Slowing Down the Semester',
      slug: 'slowing-down-the-semester',
      excerpt: 'How daily journaling and unhurried evening walks restore clarity amid crowded academic calendars.',
      mainImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop',
      imageCaption: 'Morning notes before first lecture.',
      section: 'sec_soulsteps',
      author: 'auth_2',
      issue: 'issue_2',
      status: 'Published',
      premium: false,
      featured: false,
      publishedAt: '2026-09-20T07:00:00Z',
      content: `Urgency often disguises itself as productivity. When every hour is booked, reflection is the first casualty.

## Keeping a Commonplace Notebook

Setting aside fifteen quiet minutes each evening turns scattered impressions into lasting insight.`,
    },
    {
      id: 'art_7',
      title: 'Monochrome Frames of Chemmad',
      slug: 'monochrome-frames-of-chemmad',
      excerpt: 'A visual essay capturing timber shutters, brass lanterns, and morning light around university lanes.',
      mainImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop',
      imageCaption: '35mm street study from the campus photography walk.',
      section: 'sec_pixelplay',
      author: 'auth_4',
      issue: 'issue_2',
      status: 'Published',
      premium: false,
      featured: false,
      publishedAt: '2026-09-12T12:00:00Z',
      content: `Shooting without color forces the eye to negotiate with shadow, texture, and geometry.

## Patience Over Burst Mode

Restricting a morning walk to twelve frames teaches restraint and sharper composition.`,
    },
    {
      id: 'art_8',
      title: 'Why Student Print Magazines Still Matter',
      slug: 'why-student-print-magazines-matter',
      excerpt: 'When an essay is typeset on paper, writers edit with a different standard of care and permanence.',
      mainImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&auto=format&fit=crop',
      imageCaption: 'Proof sheets on the editorial desk before press run.',
      section: 'sec_litvilla',
      author: 'auth_3',
      issue: 'issue_2',
      status: 'Published',
      premium: false,
      featured: false,
      publishedAt: '2026-09-02T10:00:00Z',
      content: `Digital feeds reward speed; print rewards endurance. Passing a bound trimonthly issue across a tea table starts conversations that outlast the week.

## From Manuscript to Typeset Page

Every issue passes through three rounds of student copy-editing before ink meets paper.`,
    },
  ],

  letters: [
    {
      id: 'let_1',
      name: 'Salman Faris',
      email: 'salman@example.com',
      message: 'This reflection on physical reading halls captures exactly what I miss most after graduating. Wonderful opening essay!',
      recipient: 'Public',
      article: 'art_1',
      approved: true,
      created: '2026-10-20T12:00:00Z',
    },
    {
      id: 'let_2',
      name: 'Nadia P.',
      email: 'nadia@example.com',
      message: 'Would love to see a follow-up piece interviewing the campus library archivists.',
      recipient: 'Public',
      article: 'art_1',
      approved: true,
      created: '2026-10-22T15:30:00Z',
    },
  ],

  programs: [
    {
      id: 'prog_1',
      title: 'All-India Student Essay Conclave 2026',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop',
      fee: 'Free',
      description: 'Annual national essay writing and editorial symposium inviting undergraduate and postgraduate voices on ethics, technology, and society.',
      eligibility: 'Open to all university and higher-secondary students',
      mode: 'Hybrid',
      registrationLink: 'https://edumotive.in/programs/essay-conclave',
      date: '2026-12-10',
      visible: true,
    },
    {
      id: 'prog_2',
      title: 'Campus Zine & Documentary Photography Workshop',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop',
      fee: '₹150',
      description: 'Hands-on weekend studio on editorial layout, photo essays, and independent student publishing.',
      eligibility: 'Registered students & aspiring contributors',
      mode: 'Offline',
      registrationLink: 'https://edumotive.in/programs/zine-workshop',
      date: '2026-11-28',
      visible: true,
    },
  ],

  results: [
    {
      id: 'res_1',
      studentName: 'Hadiya K.',
      program: 'prog_1',
      event: 'English Essay Writing',
      position: '1st',
      grade: 'A',
      institution: 'Darul Huda Islamic University',
      visible: true,
    },
    {
      id: 'res_2',
      studentName: 'Riyan Ahmed',
      program: 'prog_1',
      event: 'English Essay Writing',
      position: '2nd',
      grade: 'A',
      institution: 'University of Calicut',
      visible: true,
    },
    {
      id: 'res_3',
      studentName: 'Mariyam S.',
      program: 'prog_2',
      event: 'Photo Essay Portfolio',
      position: '1st',
      grade: 'A',
      institution: 'Jamia Millia Islamia',
      visible: true,
    },
    {
      id: 'res_4',
      studentName: 'Ibrahim N.',
      program: 'prog_1',
      event: 'Policy Critique',
      position: '3rd',
      grade: 'B',
      institution: 'Aligarh Muslim University',
      visible: true,
    },
  ],

  teamMembers: [
    {
      id: 'tm_1',
      name: 'Muhammad Shafee',
      post: 'Editor-in-Chief',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop',
      email: 'edumotive4@gmail.com',
      about: 'Oversees editorial direction, quarterly print curation, and student mentorship.',
      sortOrder: 1,
    },
    {
      id: 'tm_2',
      name: 'Aysha Rahman',
      post: 'Managing Editor',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop',
      email: 'aysha@edumotive.in',
      about: 'Coordinates section editors, manuscript reviews, and literary supplements.',
      sortOrder: 2,
    },
    {
      id: 'tm_3',
      name: 'Zainul Abideen',
      post: 'Digital & Tech Lead',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop',
      email: 'zain@edumotive.in',
      about: 'Maintains the online reading archive, e-magazine flipbook, and DigiZone column.',
      sortOrder: 3,
    },
    {
      id: 'tm_4',
      name: 'Fathima Nihala',
      post: 'Art & Design Director',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop',
      email: 'nihala@edumotive.in',
      about: 'Leads print typography, cover art, and visual storytelling.',
      sortOrder: 4,
    },
  ],

  plans: [
    {
      id: 'plan_annual',
      name: 'Annual Print + Digital',
      price: 500,
      durationMonths: 12,
      features: '4 printed trimonthly issues delivered via Speed Post\nFull digital e-magazine archive access\nAll premium essays and literary specials',
      premiumArticles: true,
      pdfReading: true,
      hardCopy: true,
      active: true,
    },
    {
      id: 'plan_half',
      name: 'Half-Yearly Print + Digital',
      price: 300,
      durationMonths: 6,
      features: '2 printed trimonthly issues at your doorstep\nFull digital e-magazine reading\nAccess to premium articles',
      premiumArticles: true,
      pdfReading: true,
      hardCopy: true,
      active: true,
    },
  ],

  subscriptions: [
    {
      id: 'sub_demo',
      fullName: 'Amina Student',
      plan: 'plan_annual',
      subscriber: 'user_student_demo',
      phone: '+91 98765 43210',
      address: 'Hostel Block B, Darul Huda Campus, Chemmad',
      pincode: '676306',
      paymentProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      transactionId: 'UTR948271645',
      status: 'Active',
      trackingNumber: 'EL847291034IN',
      startDate: '2026-09-01',
      endDate: '2027-09-01',
      created: '2026-09-01T10:00:00Z',
      deliveryStage: 'In Transit',
    },
  ],

  ads: [
    {
      id: 'ad_1',
      title: 'DHIU Book Fair — 20% Student Discount',
      advertiser: 'Campus Books Collective',
      email: 'books@example.com',
      media: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop',
      mediaType: 'Image',
      targetLink: '/programs',
      status: 'Approved',
      endDate: '2027-12-31',
    },
  ],

  profiles: [
    {
      id: 'prof_student_demo',
      displayName: 'Amina Student',
      account: 'user_student_demo',
      role: 'Student',
      className: 'BA English, 2nd Year',
      institution: 'Darul Huda Islamic University',
      username: 'amina_r',
      bio: 'Avid reader of campus essays and poetry.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop',
    },
    {
      id: 'prof_author_demo',
      displayName: 'Muhammad Shafee',
      account: 'user_author_demo',
      role: 'Author',
      className: 'MA Literature',
      institution: 'Darul Huda Islamic University',
      username: 'shafee_ed',
      bio: 'Senior Editor at EduMotive Trimonthly.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
    },
  ],

  notes: [],
  posts: [],
  postLikes: [],
  stories: [],

  adPlans: [
    { id: 'ap_week', name: 'Weekly Spotlight', mediaType: 'Image', period: 'Week', price: 250, details: '7 days sidebar & mobile spotlight', active: true },
    { id: 'ap_month', name: 'Monthly Campus Banner', mediaType: 'Image', period: 'Month', price: 800, details: '30 days across all articles', active: true },
    { id: 'ap_video', name: 'Monthly Video Feature', mediaType: 'Video', period: 'Month', price: 1500, details: '30 days autoplay muted video card', active: true },
  ],

  heroSlides: [
    {
      id: 'slide_1',
      title: 'Horizons of Thought — Autumn Issue Out Now',
      subtitle: 'Essays, campus voices, literature, and open-source dispatches from Darul Huda Islamic University.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&auto=format&fit=crop',
      buttonText: 'Read Issue',
      link: '/magazine',
      sortOrder: 1,
      active: true,
    },
    {
      id: 'slide_2',
      title: 'Write for the Next Trimonthly Edition',
      subtitle: 'Students and young scholars across campuses are invited to submit essays, poetry, and visual portfolios.',
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1600&auto=format&fit=crop',
      buttonText: 'Submit Work',
      link: '/write',
      sortOrder: 2,
      active: true,
    },
    {
      id: 'slide_3',
      title: 'Get Print & Digital Access at ₹300',
      subtitle: 'Delivered straight to your campus or home via Speed Post, with full online archive access.',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&auto=format&fit=crop',
      buttonText: 'Subscribe',
      link: '/subscribe',
      sortOrder: 3,
      active: true,
    },
  ],

  news: [
    {
      id: 'news_1',
      title: 'Call for Manuscripts: Winter 2026 Edition',
      summary: 'Submissions are now open for essays, book reviews, and short fiction on campus resilience and digital craft.',
      body: 'The editorial board of EduMotive Trimonthly welcomes original submissions from students and researchers for our upcoming Winter 2026 print and digital edition.\n\nSign in with your student or author profile and head to the Write desk to draft and submit your manuscript for review.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop',
      publishedDate: '2026-10-25',
      published: true,
    },
    {
      id: 'news_2',
      title: 'Speed Post Dispatch Completed for Issue 3 Subscribers',
      summary: 'All active annual and half-yearly print subscriptions have been dispatched; tracking numbers are live in your profile.',
      body: 'Subscribers can view their live parcel stage and copy their India Post Speed Post tracking number directly from the Subscriptions tab under Profile.',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&auto=format&fit=crop',
      publishedDate: '2026-10-14',
      published: true,
    },
    {
      id: 'news_3',
      title: 'All-India Student Essay Conclave Dates Announced',
      summary: 'Registration opens for undergraduate and postgraduate writers across hybrid and campus tracks.',
      body: 'Join student essayists, editors, and faculty mentors this December at Chemmad and online. Check the Programs page for full eligibility and registration details.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop',
      publishedDate: '2026-10-03',
      published: true,
    },
  ],

  initiatives: [
    {
      id: 'ini_1',
      name: 'Darul Huda Students Union',
      logo: '',
      description: 'Student leadership & cultural collective',
      link: 'https://dhiu.in',
      sortOrder: 1,
    },
    {
      id: 'ini_2',
      name: 'UniMedia Campus Network',
      logo: '',
      description: 'Sister campus social media network',
      link: '/about',
      sortOrder: 2,
    },
  ],
};
