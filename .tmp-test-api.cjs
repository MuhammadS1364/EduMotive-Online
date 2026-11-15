var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// apps/edumotive/api/index.ts
var index_exports = {};
__export(index_exports, {
  config: () => config,
  default: () => handler
});
module.exports = __toCommonJS(index_exports);

// apps/edumotive/apiApp.ts
var import_express = __toESM(require("express"), 1);
var import_zod17 = require("zod");
var import_pdf_lib = require("pdf-lib");

// apps/edumotive/src/api/getSite.ts
var import_zod = require("zod");

// apps/edumotive/src/zite-compat/backend.ts
var ZiteError = class extends Error {
  code;
  userFacingMessage;
  constructor(opts) {
    super(opts.userFacingMessage || opts.message);
    this.name = "ZiteError";
    this.code = opts.code ?? "BAD_REQUEST";
    this.userFacingMessage = opts.userFacingMessage ?? opts.message;
  }
};
function createEndpoint(def) {
  return def;
}

// apps/edumotive/src/zite-compat/seed.ts
var INITIAL_SEED = {
  siteSettings: [
    {
      id: "site_1",
      name: "EduMotive Trimonthly",
      aboutText: "EduMotive Trimonthly is the official student magazine of Darul Huda Islamic University \u2014 a meeting ground for rigorous scholarship, literary craft, campus reportage, and visionary student voices across disciplines.\n\nFounded to nurture thoughtful writing and intellectual dialogue, every quarterly print and digital issue brings together essays, poetry, technology dispatches, and cultural reflections shaped by young minds.",
      vision: "To cultivate an articulate, compassionate generation of student thinkers and storytellers whose ideas bridge heritage and modernity.",
      mission: "To publish fearless student journalism, creative literature, and interdisciplinary research in print and digital editions accessible to every campus.",
      teamPhoto: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop",
      logo: "",
      paymentQr: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=upi://pay?pa=edumotive@upi&pn=EduMotive",
      upiId: "edumotive@upi",
      showPrograms: true,
      showResults: true,
      showSubscribe: true,
      contactEmail: "edumotive4@gmail.com",
      instagram: "https://instagram.com/edumotive.in",
      facebook: "https://facebook.com/search/top?q=EduMotive%20Trimonthly",
      xLink: "https://x.com/search?q=EduMotive%20Trimonthly",
      freePdfPages: 2,
      phone: "+91 82505 83682",
      phones: "+91 82505 83682\n+91 94460 12345",
      address: "Darul Huda Islamic University, Chemmad, Kerala, India",
      motto: "Empowering Minds, Shaping Future"
    }
  ],
  sections: [
    { id: "sec_digizone", name: "DigiZone", description: "AI, open-source tools, digital ethics, and campus tech.", visible: true, sortOrder: 1 },
    { id: "sec_litvilla", name: "LitVilla", description: "Short fiction, poetry, translations, and literary criticism.", visible: true, sortOrder: 2 },
    { id: "sec_blueprint", name: "Blueprint", description: "Architecture, pedagogy, research essays, and academic craft.", visible: true, sortOrder: 3 },
    { id: "sec_bizbuzz", name: "BizBuzz", description: "Student entrepreneurship, ethical finance, and social startups.", visible: true, sortOrder: 4 },
    { id: "sec_universe", name: "UniVerse", description: "Campus chronicles, debates, and voices from the courtyard.", visible: true, sortOrder: 5 },
    { id: "sec_soulsteps", name: "SoulSteps", description: "Reflections on purpose, ethics, and inner resilience.", visible: true, sortOrder: 6 },
    { id: "sec_pixelplay", name: "PixelPlay", description: "Visual arts, cinema reviews, and student photography.", visible: true, sortOrder: 7 }
  ],
  tiers: [
    { id: "tier_1", name: "Laureate", minArticles: 3, color: "#FFD369" },
    { id: "tier_2", name: "Fellow", minArticles: 2, color: "#94D82D" },
    { id: "tier_3", name: "Contributor", minArticles: 1, color: "#74C0FC" }
  ],
  badges: [
    { id: "badge_1", name: "Editor\u2019s Pick", description: "Selected for cover-story distinction.", icon: "" },
    { id: "badge_2", name: "Campus Chronicler", description: "Recognized for outstanding campus reporting.", icon: "" }
  ],
  authors: [
    {
      id: "auth_1",
      name: "Muhammad Shafee",
      post: "Senior Editor",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
      bio: "Writes on digital culture, Arabic-Malayalam print heritage, and student journalism.",
      email: "shafee@edumotive.in",
      instagram: "https://instagram.com/edumotive.in",
      institution: "Darul Huda Islamic University",
      badges: ["badge_1", "badge_2"],
      penName: "Al-Qalam",
      showPenName: true
    },
    {
      id: "auth_2",
      name: "Aysha Rahman",
      post: "Literary Columnist",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
      bio: "Explores postcolonial fiction, translated poetry, and memory in South Asian literature.",
      email: "aysha@edumotive.in",
      institution: "University of Calicut",
      badges: ["badge_1"],
      penName: "Noora",
      showPenName: true
    },
    {
      id: "auth_3",
      name: "Zainul Abideen",
      post: "Tech & Policy Writer",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
      bio: "Focuses on ethical AI, open educational resources, and low-bandwidth learning tools.",
      email: "zain@edumotive.in",
      institution: "Darul Huda Islamic University",
      badges: ["badge_2"]
    },
    {
      id: "auth_4",
      name: "Fathima Nihala",
      post: "Visual Arts & Culture",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
      bio: "Documents vernacular architecture, calligraphy, and documentary photography.",
      email: "nihala@edumotive.in",
      institution: "Jamia Millia Islamia"
    }
  ],
  issues: [
    {
      id: "issue_1",
      title: "Horizons of Thought",
      issueDate: "2026-10-01",
      volume: "Vol. 14 \xB7 Issue 3",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop",
      pdf: "/api/issues/issue_1.pdf",
      description: "Our autumn trimonthly examines how open knowledge, quiet libraries, and student-led presses are reshaping academic life.",
      published: true
    },
    {
      id: "issue_2",
      title: "Voices from the Courtyard",
      issueDate: "2026-07-01",
      volume: "Vol. 14 \xB7 Issue 2",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
      pdf: "/api/issues/issue_2.pdf",
      description: "Monsoon essays, campus debates, and conversations with young scholars building sustainable cooperatives.",
      published: true
    }
  ],
  articles: [
    {
      id: "art_1",
      title: "The Quiet Architecture of Campus Libraries",
      slug: "quiet-architecture-campus-libraries",
      excerpt: "Why physical reading rooms remain irreplaceable spaces for deep attention in an age of algorithmic distraction.",
      mainImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&auto=format&fit=crop",
      imageCaption: "Afternoon light across the central reading hall during exam week.",
      section: "sec_blueprint",
      author: "auth_1",
      issue: "issue_1",
      status: "Published",
      premium: false,
      featured: true,
      publishedAt: "2026-10-18T10:00:00Z",
      content: `Walking into a university reading hall at dawn feels like stepping outside the clock of notifications. Shelves of annotated volumes stand in patient rows, holding centuries of dialogue across languages and continents.

## Attention as a Shared Civic Space

When students gather around long timber tables, concentration becomes contagious. Unlike a solo screen glowing at midnight, a library turns quiet study into a communal ritual.

### Designing for Light and Silence

Great campus architecture never treats silence as emptiness. High clerestory windows, acoustic plaster, and warm reading lamps invite sustained inquiry without fatigue.

> \u201CA library is not merely a warehouse of answers; it is a sanctuary where better questions learn to breathe.\u201D

## Building Digital Mirrors Without Losing Soil

Digital archives expand reach to remote colleges, yet physical print magazines and library tables anchor memory in place. The future belongs to campuses that cherish both.`
    },
    {
      id: "art_2",
      title: "Open-Source AI Tools in Rural Classrooms",
      slug: "open-source-ai-rural-classrooms",
      excerpt: "How lightweight offline models and bilingual study companions are bridging resource gaps across regional colleges.",
      mainImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop",
      imageCaption: "Student developers testing local language translation tools in the lab.",
      section: "sec_digizone",
      author: "auth_3",
      issue: "issue_1",
      status: "Published",
      premium: false,
      featured: false,
      publishedAt: "2026-10-15T09:00:00Z",
      content: `Technology only fulfills its educational promise when it works where bandwidth is scarce and hardware is modest. Across campuses in Kerala and beyond, student collectives are packaging open textbooks and compact language assistants onto shared lab machines.

## Offline-First Pedagogy

Instead of locking notes behind expensive cloud subscriptions, open repositories let teachers customize syllabi in Malayalam, Arabic, Urdu, and English.

### Community Governance

Students themselves act as maintainers, verifying citations and curating problem sets for incoming cohorts.`
    },
    {
      id: "art_3",
      title: "Letters Across Monsoon Verandas",
      slug: "letters-across-monsoon-verandas",
      excerpt: "A short story about two friends trading annotated paperbacks between hostel corridors during July rains.",
      mainImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop",
      imageCaption: "Handwritten margins often outlive the cover.",
      section: "sec_litvilla",
      author: "auth_2",
      issue: "issue_1",
      status: "Published",
      premium: true,
      featured: false,
      publishedAt: "2026-10-12T08:30:00Z",
      content: `Every July, the red laterite path outside the eastern hostel turned into a ribbon of rain-washed clay. Inside, the corridor smelled of wet chalk, cardamom tea, and damp binding glue.

## Margins That Remember

Before leaving for semester break, Tariq slipped a folded postcard between pages eighty-four and eighty-five of a worn anthology. No dates, only a question penciled in neat script.

### What Print Carries

Years later, long after group chats scrolled into oblivion, those pencil notes still held the exact cadence of a monsoon afternoon.

## The Epilogue in the Archive

When the alumni shelf was catalogued in autumn, three generations of students had added their own replies to that single margin.`
    },
    {
      id: "art_4",
      title: "Student Cooperatives and Ethical Campus Commerce",
      slug: "student-cooperatives-ethical-commerce",
      excerpt: "From campus bookshops to zero-waste stationery studios, young founders are rethinking profit and stewardship.",
      mainImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop",
      imageCaption: "Cooperative bookstore ledgers prepared by commerce undergraduates.",
      section: "sec_bizbuzz",
      author: "auth_1",
      issue: "issue_1",
      status: "Published",
      premium: false,
      featured: false,
      publishedAt: "2026-10-08T11:00:00Z",
      content: `Student-run cooperatives are quietly outperforming commercial vendors on affordability and trust. By pooling bulk textbook orders and reinvesting margins into scholarship stipends, campus collectives keep value circulating locally.

## Transparency on One Page

Every semester opens with a public balance sheet pinned to the student notice board.`
    },
    {
      id: "art_5",
      title: "Debates Under the Banyan Tree",
      slug: "debates-under-the-banyan-tree",
      excerpt: "Inside the Friday evening rhetoric circle where humanities and science students test ideas without slides.",
      mainImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop",
      imageCaption: "Weekly open-air dialogue session on campus.",
      section: "sec_universe",
      author: "auth_1",
      issue: "issue_2",
      status: "Published",
      premium: false,
      featured: false,
      publishedAt: "2026-09-28T14:00:00Z",
      content: `No microphones, no slide decks \u2014 just a semi-circle of notebooks and twenty minutes of uninterrupted argument followed by cross-examination.

## Learning to Listen Before Rebutting

The first rule of the circle requires every speaker to restate their opponent\u2019s strongest point before offering a counterpoint.`
    },
    {
      id: "art_6",
      title: "Slowing Down the Semester",
      slug: "slowing-down-the-semester",
      excerpt: "How daily journaling and unhurried evening walks restore clarity amid crowded academic calendars.",
      mainImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop",
      imageCaption: "Morning notes before first lecture.",
      section: "sec_soulsteps",
      author: "auth_2",
      issue: "issue_2",
      status: "Published",
      premium: false,
      featured: false,
      publishedAt: "2026-09-20T07:00:00Z",
      content: `Urgency often disguises itself as productivity. When every hour is booked, reflection is the first casualty.

## Keeping a Commonplace Notebook

Setting aside fifteen quiet minutes each evening turns scattered impressions into lasting insight.`
    },
    {
      id: "art_7",
      title: "Monochrome Frames of Chemmad",
      slug: "monochrome-frames-of-chemmad",
      excerpt: "A visual essay capturing timber shutters, brass lanterns, and morning light around university lanes.",
      mainImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop",
      imageCaption: "35mm street study from the campus photography walk.",
      section: "sec_pixelplay",
      author: "auth_4",
      issue: "issue_2",
      status: "Published",
      premium: false,
      featured: false,
      publishedAt: "2026-09-12T12:00:00Z",
      content: `Shooting without color forces the eye to negotiate with shadow, texture, and geometry.

## Patience Over Burst Mode

Restricting a morning walk to twelve frames teaches restraint and sharper composition.`
    },
    {
      id: "art_8",
      title: "Why Student Print Magazines Still Matter",
      slug: "why-student-print-magazines-matter",
      excerpt: "When an essay is typeset on paper, writers edit with a different standard of care and permanence.",
      mainImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&auto=format&fit=crop",
      imageCaption: "Proof sheets on the editorial desk before press run.",
      section: "sec_litvilla",
      author: "auth_3",
      issue: "issue_2",
      status: "Published",
      premium: false,
      featured: false,
      publishedAt: "2026-09-02T10:00:00Z",
      content: `Digital feeds reward speed; print rewards endurance. Passing a bound trimonthly issue across a tea table starts conversations that outlast the week.

## From Manuscript to Typeset Page

Every issue passes through three rounds of student copy-editing before ink meets paper.`
    }
  ],
  letters: [
    {
      id: "let_1",
      name: "Salman Faris",
      email: "salman@example.com",
      message: "This reflection on physical reading halls captures exactly what I miss most after graduating. Wonderful opening essay!",
      recipient: "Public",
      article: "art_1",
      approved: true,
      created: "2026-10-20T12:00:00Z"
    },
    {
      id: "let_2",
      name: "Nadia P.",
      email: "nadia@example.com",
      message: "Would love to see a follow-up piece interviewing the campus library archivists.",
      recipient: "Public",
      article: "art_1",
      approved: true,
      created: "2026-10-22T15:30:00Z"
    }
  ],
  programs: [
    {
      id: "prog_1",
      title: "All-India Student Essay Conclave 2026",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop",
      fee: "Free",
      description: "Annual national essay writing and editorial symposium inviting undergraduate and postgraduate voices on ethics, technology, and society.",
      eligibility: "Open to all university and higher-secondary students",
      mode: "Hybrid",
      registrationLink: "https://edumotive.in/programs/essay-conclave",
      date: "2026-12-10",
      visible: true
    },
    {
      id: "prog_2",
      title: "Campus Zine & Documentary Photography Workshop",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop",
      fee: "\u20B9150",
      description: "Hands-on weekend studio on editorial layout, photo essays, and independent student publishing.",
      eligibility: "Registered students & aspiring contributors",
      mode: "Offline",
      registrationLink: "https://edumotive.in/programs/zine-workshop",
      date: "2026-11-28",
      visible: true
    }
  ],
  results: [
    {
      id: "res_1",
      studentName: "Hadiya K.",
      program: "prog_1",
      event: "English Essay Writing",
      position: "1st",
      grade: "A",
      institution: "Darul Huda Islamic University",
      visible: true
    },
    {
      id: "res_2",
      studentName: "Riyan Ahmed",
      program: "prog_1",
      event: "English Essay Writing",
      position: "2nd",
      grade: "A",
      institution: "University of Calicut",
      visible: true
    },
    {
      id: "res_3",
      studentName: "Mariyam S.",
      program: "prog_2",
      event: "Photo Essay Portfolio",
      position: "1st",
      grade: "A",
      institution: "Jamia Millia Islamia",
      visible: true
    },
    {
      id: "res_4",
      studentName: "Ibrahim N.",
      program: "prog_1",
      event: "Policy Critique",
      position: "3rd",
      grade: "B",
      institution: "Aligarh Muslim University",
      visible: true
    }
  ],
  teamMembers: [
    {
      id: "tm_1",
      name: "Muhammad Shafee",
      post: "Editor-in-Chief",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
      email: "edumotive4@gmail.com",
      about: "Oversees editorial direction, quarterly print curation, and student mentorship.",
      sortOrder: 1
    },
    {
      id: "tm_2",
      name: "Aysha Rahman",
      post: "Managing Editor",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop",
      email: "aysha@edumotive.in",
      about: "Coordinates section editors, manuscript reviews, and literary supplements.",
      sortOrder: 2
    },
    {
      id: "tm_3",
      name: "Zainul Abideen",
      post: "Digital & Tech Lead",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop",
      email: "zain@edumotive.in",
      about: "Maintains the online reading archive, e-magazine flipbook, and DigiZone column.",
      sortOrder: 3
    },
    {
      id: "tm_4",
      name: "Fathima Nihala",
      post: "Art & Design Director",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop",
      email: "nihala@edumotive.in",
      about: "Leads print typography, cover art, and visual storytelling.",
      sortOrder: 4
    }
  ],
  plans: [
    {
      id: "plan_annual",
      name: "Annual Print + Digital",
      price: 500,
      durationMonths: 12,
      features: "4 printed trimonthly issues delivered via Speed Post\nFull digital e-magazine archive access\nAll premium essays and literary specials",
      premiumArticles: true,
      pdfReading: true,
      hardCopy: true,
      active: true
    },
    {
      id: "plan_half",
      name: "Half-Yearly Print + Digital",
      price: 300,
      durationMonths: 6,
      features: "2 printed trimonthly issues at your doorstep\nFull digital e-magazine reading\nAccess to premium articles",
      premiumArticles: true,
      pdfReading: true,
      hardCopy: true,
      active: true
    }
  ],
  subscriptions: [
    {
      id: "sub_demo",
      fullName: "Amina Student",
      plan: "plan_annual",
      subscriber: "user_student_demo",
      phone: "+91 98765 43210",
      address: "Hostel Block B, Darul Huda Campus, Chemmad",
      pincode: "676306",
      paymentProof: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      transactionId: "UTR948271645",
      status: "Active",
      trackingNumber: "EL847291034IN",
      startDate: "2026-09-01",
      endDate: "2027-09-01",
      created: "2026-09-01T10:00:00Z",
      deliveryStage: "In Transit"
    }
  ],
  ads: [
    {
      id: "ad_1",
      title: "DHIU Book Fair \u2014 20% Student Discount",
      advertiser: "Campus Books Collective",
      email: "books@example.com",
      media: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop",
      mediaType: "Image",
      targetLink: "/programs",
      status: "Approved",
      endDate: "2027-12-31"
    }
  ],
  profiles: [
    {
      id: "prof_student_demo",
      displayName: "Amina Student",
      account: "user_student_demo",
      role: "Student",
      className: "BA English, 2nd Year",
      institution: "Darul Huda Islamic University",
      username: "amina_r",
      bio: "Avid reader of campus essays and poetry.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop"
    },
    {
      id: "prof_author_demo",
      displayName: "Muhammad Shafee",
      account: "user_author_demo",
      role: "Author",
      className: "MA Literature",
      institution: "Darul Huda Islamic University",
      username: "shafee_ed",
      bio: "Senior Editor at EduMotive Trimonthly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
    }
  ],
  notes: [],
  posts: [],
  postLikes: [],
  stories: [],
  adPlans: [
    { id: "ap_week", name: "Weekly Spotlight", mediaType: "Image", period: "Week", price: 250, details: "7 days sidebar & mobile spotlight", active: true },
    { id: "ap_month", name: "Monthly Campus Banner", mediaType: "Image", period: "Month", price: 800, details: "30 days across all articles", active: true },
    { id: "ap_video", name: "Monthly Video Feature", mediaType: "Video", period: "Month", price: 1500, details: "30 days autoplay muted video card", active: true }
  ],
  heroSlides: [
    {
      id: "slide_1",
      title: "Horizons of Thought \u2014 Autumn Issue Out Now",
      subtitle: "Essays, campus voices, literature, and open-source dispatches from Darul Huda Islamic University.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&auto=format&fit=crop",
      buttonText: "Read Issue",
      link: "/magazine",
      sortOrder: 1,
      active: true
    },
    {
      id: "slide_2",
      title: "Write for the Next Trimonthly Edition",
      subtitle: "Students and young scholars across campuses are invited to submit essays, poetry, and visual portfolios.",
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1600&auto=format&fit=crop",
      buttonText: "Submit Work",
      link: "/write",
      sortOrder: 2,
      active: true
    },
    {
      id: "slide_3",
      title: "Get Print & Digital Access at \u20B9300",
      subtitle: "Delivered straight to your campus or home via Speed Post, with full online archive access.",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&auto=format&fit=crop",
      buttonText: "Subscribe",
      link: "/subscribe",
      sortOrder: 3,
      active: true
    }
  ],
  news: [
    {
      id: "news_1",
      title: "Call for Manuscripts: Winter 2026 Edition",
      summary: "Submissions are now open for essays, book reviews, and short fiction on campus resilience and digital craft.",
      body: "The editorial board of EduMotive Trimonthly welcomes original submissions from students and researchers for our upcoming Winter 2026 print and digital edition.\n\nSign in with your student or author profile and head to the Write desk to draft and submit your manuscript for review.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop",
      publishedDate: "2026-10-25",
      published: true
    },
    {
      id: "news_2",
      title: "Speed Post Dispatch Completed for Issue 3 Subscribers",
      summary: "All active annual and half-yearly print subscriptions have been dispatched; tracking numbers are live in your profile.",
      body: "Subscribers can view their live parcel stage and copy their India Post Speed Post tracking number directly from the Subscriptions tab under Profile.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&auto=format&fit=crop",
      publishedDate: "2026-10-14",
      published: true
    },
    {
      id: "news_3",
      title: "All-India Student Essay Conclave Dates Announced",
      summary: "Registration opens for undergraduate and postgraduate writers across hybrid and campus tracks.",
      body: "Join student essayists, editors, and faculty mentors this December at Chemmad and online. Check the Programs page for full eligibility and registration details.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop",
      publishedDate: "2026-10-03",
      published: true
    }
  ],
  initiatives: [
    {
      id: "ini_1",
      name: "Darul Huda Students Union",
      logo: "",
      description: "Student leadership & cultural collective",
      link: "https://dhiu.in",
      sortOrder: 1
    },
    {
      id: "ini_2",
      name: "UniMedia Campus Network",
      logo: "",
      description: "Sister campus social media network",
      link: "/about",
      sortOrder: 2
    }
  ]
};

// apps/edumotive/src/zite-compat/turso.ts
var import_client = require("@libsql/client");
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_path = __toESM(require("node:path"), 1);

// apps/edumotive/src/zite-compat/types.ts
function matchesFilters(row, filters) {
  if (!filters) return true;
  for (const [key, expected] of Object.entries(filters)) {
    if (expected === void 0) continue;
    const actual = row[key];
    if (Array.isArray(actual)) {
      if (!actual.includes(expected)) return false;
    } else if (actual !== expected) {
      return false;
    }
  }
  return true;
}

// apps/edumotive/src/zite-compat/turso.ts
function loadDotEnvIfNeeded() {
  if (process.env.TURSO_DATABASE_URL) return;
  const candidates = [
    import_node_path.default.resolve(process.cwd(), ".env"),
    import_node_path.default.resolve(process.cwd(), "../.env"),
    import_node_path.default.resolve(process.cwd(), "../../.env")
  ];
  for (const filePath of candidates) {
    try {
      if (!import_node_fs.default.existsSync(filePath)) continue;
      const raw = import_node_fs.default.readFileSync(filePath, "utf8");
      for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq <= 0) continue;
        const key = trimmed.slice(0, eq).trim();
        let val = trimmed.slice(eq + 1).trim();
        if (val.startsWith('"') && val.endsWith('"') || val.startsWith("'") && val.endsWith("'")) {
          val = val.slice(1, -1);
        }
        if (key && process.env[key] === void 0) {
          process.env[key] = val;
        }
      }
      if (process.env.TURSO_DATABASE_URL) break;
    } catch {
    }
  }
}
loadDotEnvIfNeeded();
var TABLE_SCHEMAS = {
  siteSettings: {
    sqlTable: "SiteSettings",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "upiId", type: "TEXT" },
      { name: "showPrograms", type: "INTEGER" },
      { name: "showResults", type: "INTEGER" },
      { name: "showSubscribe", type: "INTEGER" },
      { name: "contactEmail", type: "TEXT" }
    ]
  },
  sections: {
    sqlTable: "Sections",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "visible", type: "INTEGER" },
      { name: "sortOrder", type: "INTEGER" }
    ]
  },
  tiers: {
    sqlTable: "Tiers",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "minArticles", type: "INTEGER" },
      { name: "color", type: "TEXT" }
    ]
  },
  badges: {
    sqlTable: "Badges",
    cols: [{ name: "name", type: "TEXT" }]
  },
  authors: {
    sqlTable: "Authors",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "post", type: "TEXT" },
      { name: "email", type: "TEXT" },
      { name: "institution", type: "TEXT" },
      { name: "account", type: "TEXT" },
      { name: "manualTier", type: "TEXT" }
    ]
  },
  issues: {
    sqlTable: "Issues",
    cols: [
      { name: "title", type: "TEXT" },
      { name: "volume", type: "TEXT" },
      { name: "issueDate", type: "TEXT" },
      { name: "published", type: "INTEGER" }
    ]
  },
  articles: {
    sqlTable: "Articles",
    cols: [
      { name: "title", type: "TEXT" },
      { name: "slug", type: "TEXT" },
      { name: "section", type: "TEXT" },
      { name: "author", type: "TEXT" },
      { name: "issue", type: "TEXT" },
      { name: "status", type: "TEXT" },
      { name: "premium", type: "INTEGER" },
      { name: "featured", type: "INTEGER" },
      { name: "publishedAt", type: "TEXT" },
      { name: "submittedBy", type: "TEXT" }
    ]
  },
  letters: {
    sqlTable: "Letters",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "email", type: "TEXT" },
      { name: "recipient", type: "TEXT" },
      { name: "article", type: "TEXT" },
      { name: "approved", type: "INTEGER" }
    ]
  },
  programs: {
    sqlTable: "Programs",
    cols: [
      { name: "title", type: "TEXT" },
      { name: "date", type: "TEXT" },
      { name: "mode", type: "TEXT" },
      { name: "visible", type: "INTEGER" }
    ]
  },
  results: {
    sqlTable: "Results",
    cols: [
      { name: "studentName", type: "TEXT" },
      { name: "program", type: "TEXT" },
      { name: "event", type: "TEXT" },
      { name: "visible", type: "INTEGER" }
    ]
  },
  teamMembers: {
    sqlTable: "TeamMembers",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "post", type: "TEXT" },
      { name: "sortOrder", type: "INTEGER" }
    ]
  },
  plans: {
    sqlTable: "Plans",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "price", type: "REAL" },
      { name: "durationMonths", type: "INTEGER" },
      { name: "active", type: "INTEGER" }
    ]
  },
  subscriptions: {
    sqlTable: "Subscriptions",
    cols: [
      { name: "fullName", type: "TEXT" },
      { name: "plan", type: "TEXT" },
      { name: "subscriber", type: "TEXT" },
      { name: "status", type: "TEXT" },
      { name: "trackingNumber", type: "TEXT" },
      { name: "startDate", type: "TEXT" },
      { name: "endDate", type: "TEXT" },
      { name: "deliveryStage", type: "TEXT" }
    ]
  },
  ads: {
    sqlTable: "Ads",
    cols: [
      { name: "title", type: "TEXT" },
      { name: "advertiser", type: "TEXT" },
      { name: "email", type: "TEXT" },
      { name: "status", type: "TEXT" },
      { name: "endDate", type: "TEXT" }
    ]
  },
  profiles: {
    sqlTable: "Profiles",
    cols: [
      { name: "displayName", type: "TEXT" },
      { name: "account", type: "TEXT" },
      { name: "role", type: "TEXT" },
      { name: "username", type: "TEXT" }
    ]
  },
  notes: {
    sqlTable: "Notes",
    cols: [
      { name: "title", type: "TEXT" },
      { name: "status", type: "TEXT" },
      { name: "kind", type: "TEXT" }
    ]
  },
  posts: {
    sqlTable: "Posts",
    cols: [{ name: "author", type: "TEXT" }]
  },
  postLikes: {
    sqlTable: "PostLikes",
    cols: [
      { name: "post", type: "TEXT" },
      { name: "user", type: "TEXT" }
    ]
  },
  stories: {
    sqlTable: "Stories",
    cols: [{ name: "author", type: "TEXT" }]
  },
  adPlans: {
    sqlTable: "AdPlans",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "mediaType", type: "TEXT" },
      { name: "price", type: "REAL" },
      { name: "active", type: "INTEGER" }
    ]
  },
  heroSlides: {
    sqlTable: "HeroSlides",
    cols: [
      { name: "title", type: "TEXT" },
      { name: "sortOrder", type: "INTEGER" },
      { name: "active", type: "INTEGER" }
    ]
  },
  news: {
    sqlTable: "News",
    cols: [
      { name: "title", type: "TEXT" },
      { name: "publishedDate", type: "TEXT" },
      { name: "published", type: "INTEGER" }
    ]
  },
  initiatives: {
    sqlTable: "Initiatives",
    cols: [
      { name: "name", type: "TEXT" },
      { name: "sortOrder", type: "INTEGER" }
    ]
  }
};
function isTursoEnabled() {
  loadDotEnvIfNeeded();
  return Boolean(process.env.TURSO_DATABASE_URL?.trim());
}
var cachedClient = null;
var readyPromise = null;
function getTursoClient() {
  if (cachedClient) return cachedClient;
  loadDotEnvIfNeeded();
  const url = process.env.TURSO_DATABASE_URL?.trim();
  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not configured");
  }
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
  cachedClient = (0, import_client.createClient)({
    url,
    ...authToken ? { authToken } : {}
  });
  return cachedClient;
}
function toSqlValue(val, colType) {
  if (val === void 0 || val === null) return null;
  if (colType === "INTEGER") {
    if (typeof val === "boolean") return val ? 1 : 0;
    if (typeof val === "number" && Number.isFinite(val)) return Math.trunc(val);
    const n = Number(val);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  }
  if (colType === "REAL") {
    if (typeof val === "number" && Number.isFinite(val)) return val;
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
  }
  if (Array.isArray(val) || typeof val === "object") {
    return JSON.stringify(val);
  }
  return String(val);
}
function buildInsertStatement(tableKey, rec, orIgnore = false) {
  const def = TABLE_SCHEMAS[tableKey];
  const colNames = ["id", "created", ...def.cols.map((c) => c.name), "_doc"];
  const quotedCols = colNames.map((c) => `"${c}"`).join(", ");
  const placeholders = colNames.map(() => "?").join(", ");
  const args = [
    String(rec.id),
    typeof rec.created === "string" ? rec.created : (/* @__PURE__ */ new Date()).toISOString(),
    ...def.cols.map((c) => toSqlValue(rec[c.name], c.type)),
    JSON.stringify(rec)
  ];
  const verb = orIgnore ? "INSERT OR IGNORE" : "INSERT";
  return {
    sql: `${verb} INTO "${def.sqlTable}" (${quotedCols}) VALUES (${placeholders})`,
    args
  };
}
function buildUpdateStatement(tableKey, rec) {
  const def = TABLE_SCHEMAS[tableKey];
  const setCols = ["created", ...def.cols.map((c) => c.name), "_doc"];
  const setSql = setCols.map((c) => `"${c}" = ?`).join(", ");
  const args = [
    typeof rec.created === "string" ? rec.created : (/* @__PURE__ */ new Date()).toISOString(),
    ...def.cols.map((c) => toSqlValue(rec[c.name], c.type)),
    JSON.stringify(rec),
    String(rec.id)
  ];
  return {
    sql: `UPDATE "${def.sqlTable}" SET ${setSql} WHERE "id" = ?`,
    args
  };
}
async function ensureTursoReady() {
  if (!isTursoEnabled()) return;
  if (readyPromise) return readyPromise;
  readyPromise = (async () => {
    const client = getTursoClient();
    const ddlStatements = [
      `CREATE TABLE IF NOT EXISTS "_meta" ("key" TEXT PRIMARY KEY, "value" TEXT NOT NULL)`,
      `CREATE TABLE IF NOT EXISTS "Uploads" ("id" TEXT PRIMARY KEY, "mime" TEXT NOT NULL, "data_base64" TEXT NOT NULL, "created" TEXT NOT NULL)`
    ];
    for (const def of Object.values(TABLE_SCHEMAS)) {
      const extraCols = def.cols.map((c) => `"${c.name}" ${c.type}`).join(", ");
      const colList = ['"id" TEXT PRIMARY KEY', '"created" TEXT', extraCols, '"_doc" TEXT NOT NULL'].filter(Boolean).join(", ");
      ddlStatements.push(`CREATE TABLE IF NOT EXISTS "${def.sqlTable}" (${colList})`);
    }
    await client.batch(ddlStatements, "write");
    const metaRes = await client.execute({
      sql: `SELECT "value" FROM "_meta" WHERE "key" = 'seeded_v1' LIMIT 1`,
      args: []
    });
    if (metaRes.rows.length === 0) {
      const seedStatements = [];
      for (const key of Object.keys(INITIAL_SEED)) {
        for (const record of INITIAL_SEED[key]) {
          seedStatements.push(
            buildInsertStatement(
              key,
              {
                created: record.created ?? "2026-09-01T00:00:00Z",
                ...record
              },
              true
            )
          );
        }
      }
      seedStatements.push({
        sql: `INSERT OR REPLACE INTO "_meta" ("key", "value") VALUES ('seeded_v1', ?)`,
        args: [(/* @__PURE__ */ new Date()).toISOString()]
      });
      await client.batch(seedStatements, "write");
    }
  })().catch((err) => {
    readyPromise = null;
    throw err;
  });
  return readyPromise;
}
var seqCounter = 1;
function createTursoTable(tableKey, prefix) {
  const def = TABLE_SCHEMAS[tableKey];
  return {
    async findAll(args = {}) {
      await ensureTursoReady();
      const client = getTursoClient();
      const limit = args.limit ?? 1e3;
      const res = await client.execute({
        sql: `SELECT "_doc" FROM "${def.sqlTable}" ORDER BY rowid ASC`,
        args: []
      });
      const out = [];
      for (const row of res.rows) {
        const parsed = JSON.parse(String(row._doc));
        if (matchesFilters(parsed, args.filters)) {
          out.push(parsed);
          if (out.length >= limit) break;
        }
      }
      return { records: out };
    },
    async findOne(args) {
      await ensureTursoReady();
      const client = getTursoClient();
      if (args.id) {
        const res2 = await client.execute({
          sql: `SELECT "_doc" FROM "${def.sqlTable}" WHERE "id" = ? LIMIT 1`,
          args: [args.id]
        });
        if (!res2.rows.length) return null;
        return JSON.parse(String(res2.rows[0]._doc));
      }
      const res = await client.execute({
        sql: `SELECT "_doc" FROM "${def.sqlTable}" ORDER BY rowid ASC`,
        args: []
      });
      for (const row of res.rows) {
        const parsed = JSON.parse(String(row._doc));
        if (matchesFilters(parsed, args.filters)) {
          return parsed;
        }
      }
      return null;
    },
    async create(args) {
      await ensureTursoReady();
      const client = getTursoClient();
      const id = args.record.id || `${prefix}_${Date.now().toString(36)}_${seqCounter++}`;
      const rec = {
        created: (/* @__PURE__ */ new Date()).toISOString(),
        ...structuredClone(args.record),
        id
      };
      await client.execute(buildInsertStatement(tableKey, rec));
      return structuredClone(rec);
    },
    async update(args) {
      await ensureTursoReady();
      const client = getTursoClient();
      const existingRes = await client.execute({
        sql: `SELECT "_doc" FROM "${def.sqlTable}" WHERE "id" = ? LIMIT 1`,
        args: [args.id]
      });
      if (!existingRes.rows.length) {
        throw new Error(`Record ${args.id} not found in ${prefix}`);
      }
      const prev = JSON.parse(String(existingRes.rows[0]._doc));
      const next = { ...prev, ...structuredClone(args.record), id: args.id };
      await client.execute(buildUpdateStatement(tableKey, next));
      return structuredClone(next);
    },
    async delete(args) {
      await ensureTursoReady();
      const client = getTursoClient();
      await client.execute({
        sql: `DELETE FROM "${def.sqlTable}" WHERE "id" = ?`,
        args: [args.id]
      });
      return { id: args.id };
    }
  };
}
async function executeTursoSql(query) {
  await ensureTursoReady();
  const client = getTursoClient();
  const res = await client.execute(query);
  return {
    rows: res.rows.map((r) => ({ ...r }))
  };
}
async function saveTursoUpload(id, mime, buffer) {
  await ensureTursoReady();
  const client = getTursoClient();
  await client.execute({
    sql: `INSERT OR REPLACE INTO "Uploads" ("id", "mime", "data_base64", "created") VALUES (?, ?, ?, ?)`,
    args: [id, mime, buffer.toString("base64"), (/* @__PURE__ */ new Date()).toISOString()]
  });
}
async function getTursoUpload(id) {
  await ensureTursoReady();
  const client = getTursoClient();
  const res = await client.execute({
    sql: `SELECT "mime", "data_base64" FROM "Uploads" WHERE "id" = ? LIMIT 1`,
    args: [id]
  });
  if (!res.rows.length) return null;
  return {
    mime: String(res.rows[0].mime),
    buffer: Buffer.from(String(res.rows[0].data_base64), "base64")
  };
}

// apps/edumotive/src/zite-compat/db.ts
function createTable(prefix, initial = []) {
  const rows = new Map(initial.map((r) => [r.id, structuredClone(r)]));
  let seq = initial.length + 1;
  return {
    async findAll(args = {}) {
      const limit = args.limit ?? 1e3;
      const out = [];
      for (const row of rows.values()) {
        if (matchesFilters(row, args.filters)) {
          out.push(structuredClone(row));
          if (out.length >= limit) break;
        }
      }
      return { records: out };
    },
    async findOne(args) {
      if (args.id) {
        const hit = rows.get(args.id);
        return hit ? structuredClone(hit) : null;
      }
      for (const row of rows.values()) {
        if (matchesFilters(row, args.filters)) {
          return structuredClone(row);
        }
      }
      return null;
    },
    async create(args) {
      const id = args.record.id || `${prefix}_${Date.now().toString(36)}_${seq++}`;
      const rec = {
        created: (/* @__PURE__ */ new Date()).toISOString(),
        ...structuredClone(args.record),
        id
      };
      rows.set(id, rec);
      return structuredClone(rec);
    },
    async update(args) {
      const prev = rows.get(args.id);
      if (!prev) {
        throw new Error(`Record ${args.id} not found in ${prefix}`);
      }
      const next = { ...prev, ...structuredClone(args.record), id: args.id };
      rows.set(args.id, next);
      return structuredClone(next);
    },
    async delete(args) {
      rows.delete(args.id);
      return { id: args.id };
    }
  };
}
function makeTable(key, prefix) {
  if (isTursoEnabled()) {
    return createTursoTable(key, prefix);
  }
  return createTable(prefix, INITIAL_SEED[key]);
}
var memoryUploads = /* @__PURE__ */ new Map();
async function ensureDbReady() {
  if (isTursoEnabled()) {
    await ensureTursoReady();
  }
}
async function saveUpload(id, mime, buffer) {
  if (isTursoEnabled()) {
    await saveTursoUpload(id, mime, buffer);
    return;
  }
  memoryUploads.set(id, { mime, buffer });
}
async function getUpload(id) {
  if (isTursoEnabled()) {
    return getTursoUpload(id);
  }
  return memoryUploads.get(id) ?? null;
}
var zite = {
  siteSettings: makeTable("siteSettings", "site"),
  sections: makeTable("sections", "sec"),
  tiers: makeTable("tiers", "tier"),
  badges: makeTable("badges", "badge"),
  authors: makeTable("authors", "auth"),
  issues: makeTable("issues", "issue"),
  articles: makeTable("articles", "art"),
  letters: makeTable("letters", "let"),
  programs: makeTable("programs", "prog"),
  results: makeTable("results", "res"),
  teamMembers: makeTable("teamMembers", "team"),
  plans: makeTable("plans", "plan"),
  subscriptions: makeTable("subscriptions", "sub"),
  ads: makeTable("ads", "ad"),
  profiles: makeTable("profiles", "prof"),
  notes: makeTable("notes", "note"),
  posts: makeTable("posts", "post"),
  postLikes: makeTable("postLikes", "like"),
  stories: makeTable("stories", "story"),
  adPlans: makeTable("adPlans", "adplan"),
  heroSlides: makeTable("heroSlides", "slide"),
  news: makeTable("news", "news"),
  initiatives: makeTable("initiatives", "ini"),
  async sql({ query }) {
    if (isTursoEnabled()) {
      return executeTursoSql(query);
    }
    const tableMatch = /FROM\s+"?([A-Za-z0-9_]+)"?/i.exec(query);
    if (!tableMatch) return { rows: [{ n: 0 }] };
    const rawTable = tableMatch[1];
    const tableKey = rawTable.charAt(0).toLowerCase() + rawTable.slice(1);
    const client = zite[tableKey];
    if (!client || typeof client.findAll !== "function") {
      return { rows: [{ n: 0 }] };
    }
    const { records } = await client.findAll({ limit: 5e3 });
    const eqMatch = /WHERE\s+"?([A-Za-z0-9_]+)"?\s*=\s*'([^']*)'/i.exec(query);
    if (eqMatch) {
      const [, col, val] = eqMatch;
      return { rows: [{ n: records.filter((r) => r[col] === val).length }] };
    }
    const notTrueMatch = /WHERE\s+"?([A-Za-z0-9_]+)"?\s+IS\s+NOT\s+TRUE/i.exec(query);
    if (notTrueMatch) {
      const [, col] = notTrueMatch;
      return { rows: [{ n: records.filter((r) => r[col] !== true).length }] };
    }
    return { rows: [{ n: records.length }] };
  }
};

// apps/edumotive/src/lib/server.ts
var one = (v) => Array.isArray(v) ? v[0] : typeof v === "string" && v ? v : void 0;
async function getAccess(userId) {
  const { records: st } = await zite.siteSettings.findAll({ limit: 1 });
  if (!st[0]?.showSubscribe) return { premiumArticles: true, pdfReading: true, hardCopy: false };
  const res = { premiumArticles: false, pdfReading: false, hardCopy: false };
  if (!userId) return res;
  const { records: subs } = await zite.subscriptions.findAll({ filters: { subscriber: userId, status: "Active" }, limit: 50 });
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const planIds = subs.filter((s3) => !s3.endDate || s3.endDate.slice(0, 10) >= today).map((s3) => one(s3.plan));
  if (!planIds.length) return res;
  const { records: plans } = await zite.plans.findAll({ limit: 200 });
  for (const p of plans) {
    if (!planIds.includes(p.id)) continue;
    res.premiumArticles ||= !!p.premiumArticles;
    res.pdfReading ||= !!p.pdfReading;
    res.hardCopy ||= !!p.hardCopy;
  }
  return res;
}
async function loadDirectory() {
  const [a, b, t, s3, arts] = await Promise.all([
    zite.authors.findAll({ limit: 2e3 }),
    zite.badges.findAll({ limit: 500 }),
    zite.tiers.findAll({ limit: 100 }),
    zite.sections.findAll({ limit: 200 }),
    zite.articles.findAll({ filters: { status: "Published" }, limit: 2e3 })
  ]);
  const counts = {};
  for (const ar of arts.records) {
    const id = one(ar.author);
    if (id) counts[id] = (counts[id] ?? 0) + 1;
  }
  const tiers = [...t.records].sort((x, y) => (y.minArticles ?? 0) - (x.minArticles ?? 0));
  const badgeMap = new Map(b.records.map((x) => [x.id, x]));
  const authors = /* @__PURE__ */ new Map();
  for (const r of a.records) {
    const count = counts[r.id] ?? 0;
    const manual = r.manualTier ? tiers.find((x) => x.name === r.manualTier) : void 0;
    const tier = manual ?? tiers.find((x) => count >= (x.minArticles ?? 0) && (x.minArticles ?? 0) > 0);
    const bIds = Array.isArray(r.badges) ? r.badges : r.badges ? [r.badges] : [];
    authors.set(r.id, {
      id: r.id,
      name: r.name ?? "Unknown",
      post: r.post ?? "",
      photo: r.photo ?? "",
      bio: r.bio ?? "",
      email: r.email ?? "",
      instagram: r.instagram ?? "",
      institution: r.institution ?? "",
      count,
      penName: r.showPenName ? r.penName ?? "" : "",
      tier: tier ? { name: tier.name ?? "", color: tier.color ?? "#FFD369" } : null,
      badges: bIds.map((id) => badgeMap.get(id)).filter(Boolean).map((x) => ({ name: x.name ?? "", icon: x.icon ?? "", description: x.description ?? "" }))
    });
  }
  const sections = new Map(s3.records.map((x) => [x.id, x]));
  const published = [...arts.records].sort((x, y) => (y.publishedAt ?? "").localeCompare(x.publishedAt ?? ""));
  return { authors, sections, published };
}
function toCard(ar, dir) {
  const au = dir.authors.get(one(ar.author) ?? "");
  return {
    id: ar.id,
    title: ar.title ?? "",
    slug: ar.slug || ar.id,
    excerpt: ar.excerpt ?? "",
    mainImage: ar.mainImage ?? "",
    section: dir.sections.get(one(ar.section) ?? "")?.name ?? "",
    authorName: au?.name ?? "",
    authorPhoto: au?.photo ?? "",
    authorId: au?.id ?? "",
    publishedAt: ar.publishedAt ?? "",
    premium: !!ar.premium,
    featured: !!ar.featured
  };
}
function slugify(s3) {
  return s3.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}
var fail = (msg) => new ZiteError({ code: "BAD_REQUEST", message: msg, userFacingMessage: msg });

// apps/edumotive/src/api/getSite.ts
var s = import_zod.z.string();
var getSite_default = createEndpoint({
  description: "Loads site settings, sections, plans, team, programs and results",
  inputSchema: import_zod.z.object({}),
  outputSchema: import_zod.z.object({
    settings: import_zod.z.object({
      aboutText: s,
      vision: s,
      mission: s,
      teamPhoto: s,
      logo: s,
      paymentQr: s,
      upiId: s,
      showPrograms: import_zod.z.boolean(),
      showResults: import_zod.z.boolean(),
      showSubscribe: import_zod.z.boolean(),
      contactEmail: s,
      instagram: s,
      facebook: s,
      xLink: s,
      freePdfPages: import_zod.z.number(),
      googleVerificationCode: s,
      phone: s,
      phones: import_zod.z.array(s),
      address: s,
      motto: s
    }),
    initiatives: import_zod.z.array(import_zod.z.object({ id: s, name: s, logo: s, link: s })),
    heroSlides: import_zod.z.array(import_zod.z.object({ id: s, title: s, subtitle: s, image: s, buttonText: s, link: s })),
    sections: import_zod.z.array(import_zod.z.object({ id: s, name: s, description: s })),
    plans: import_zod.z.array(import_zod.z.object({ id: s, name: s, price: import_zod.z.number(), durationMonths: import_zod.z.number(), features: import_zod.z.array(s), premiumArticles: import_zod.z.boolean(), pdfReading: import_zod.z.boolean(), hardCopy: import_zod.z.boolean() })),
    adPlans: import_zod.z.array(import_zod.z.object({ id: s, name: s, mediaType: s, period: s, price: import_zod.z.number(), details: s })),
    team: import_zod.z.array(import_zod.z.object({ id: s, name: s, post: s, photo: s, phone: s, email: s, address: s, instagram: s, facebook: s, xLink: s, about: s })),
    programs: import_zod.z.array(import_zod.z.object({ id: s, title: s, image: s, fee: s, description: s, eligibility: s, mode: s, registrationLink: s, date: s })),
    results: import_zod.z.array(import_zod.z.object({ id: s, studentName: s, program: s, event: s, position: s, grade: s, institution: s, photo: s }))
  }),
  execute: async () => {
    const [st, sec, pl, tm, pr, rs, ap, hs, ini] = await Promise.all([
      zite.siteSettings.findAll({ limit: 1 }),
      zite.sections.findAll({ limit: 200 }),
      zite.plans.findAll({ limit: 100 }),
      zite.teamMembers.findAll({ limit: 500 }),
      zite.programs.findAll({ limit: 500 }),
      zite.results.findAll({ limit: 2e3 }),
      zite.adPlans.findAll({ limit: 200 }),
      zite.heroSlides.findAll({ limit: 50 }),
      zite.initiatives.findAll({ limit: 50 })
    ]);
    const x = st.records[0] ?? {};
    const settings = {
      aboutText: x.aboutText ?? "",
      vision: x.vision ?? "",
      mission: x.mission ?? "",
      teamPhoto: x.teamPhoto ?? "",
      logo: x.logo ?? "",
      paymentQr: x.paymentQr ?? "",
      upiId: x.upiId ?? "",
      showPrograms: !!x.showPrograms,
      showResults: !!x.showResults,
      showSubscribe: !!x.showSubscribe,
      contactEmail: x.contactEmail || "edumotive4@gmail.com",
      instagram: x.instagram || "https://instagram.com/edumotive.in",
      facebook: x.facebook || "https://facebook.com/search/top?q=EduMotive%20Trimonthly",
      xLink: x.xLink || "https://x.com/search?q=EduMotive%20Trimonthly",
      freePdfPages: x.freePdfPages ?? 3,
      googleVerificationCode: x.googleVerificationCode ?? "",
      phone: x.phone || "+91 82505 83682",
      phones: (x.phones || x.phone || "+91 82505 83682").split("\n").map((p) => p.trim()).filter(Boolean),
      address: x.address || "Darul Huda Islamic University, Chemmad, Kerala, India",
      motto: x.motto || "Empowering Minds, Shaping Future"
    };
    const progTitle = new Map(pr.records.map((p) => [p.id, p.title ?? ""]));
    const periodOrder = { Week: 0, Month: 1, Year: 2 };
    return {
      settings,
      initiatives: ini.records.filter((r) => r.name || r.logo).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((r) => ({ id: r.id, name: r.name ?? "", logo: r.logo ?? "", link: r.link ?? "" })),
      heroSlides: hs.records.filter((h) => h.active && h.image).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((h) => ({
        id: h.id,
        title: h.title ?? "",
        subtitle: h.subtitle ?? "",
        image: h.image ?? "",
        buttonText: h.buttonText ?? "",
        link: h.link ?? ""
      })),
      sections: sec.records.filter((r) => r.visible).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((r) => ({ id: r.id, name: r.name ?? "", description: r.description ?? "" })),
      plans: settings.showSubscribe ? pl.records.filter((p) => p.active).sort((a, b) => (b.price ?? 0) - (a.price ?? 0)).map((p) => ({
        id: p.id,
        name: p.name ?? "",
        price: p.price ?? 0,
        durationMonths: p.durationMonths ?? 12,
        features: (p.features ?? "").split("\n").map((f) => f.trim()).filter(Boolean),
        premiumArticles: !!p.premiumArticles,
        pdfReading: !!p.pdfReading,
        hardCopy: !!p.hardCopy
      })) : [],
      adPlans: ap.records.filter((p) => p.active).sort((a, b) => (periodOrder[a.period ?? ""] ?? 9) - (periodOrder[b.period ?? ""] ?? 9)).map((p) => ({
        id: p.id,
        name: p.name ?? "",
        mediaType: p.mediaType ?? "Image",
        period: p.period ?? "Month",
        price: p.price ?? 0,
        details: p.details ?? ""
      })),
      team: tm.records.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((m) => ({
        id: m.id,
        name: m.name ?? "",
        post: m.post ?? "",
        photo: m.photo ?? "",
        phone: m.phone ?? "",
        email: m.email ?? "",
        address: m.address ?? "",
        instagram: m.instagram ?? "",
        facebook: m.facebook ?? "",
        xLink: m.xLink ?? "",
        about: m.about ?? ""
      })),
      programs: settings.showPrograms ? pr.records.filter((p) => p.visible).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")).map((p) => ({
        id: p.id,
        title: p.title ?? "",
        image: p.image ?? "",
        fee: p.fee ?? "",
        description: p.description ?? "",
        eligibility: p.eligibility ?? "",
        mode: p.mode ?? "",
        registrationLink: p.registrationLink ?? "",
        date: p.date ?? ""
      })) : [],
      results: settings.showResults ? rs.records.filter((r) => r.visible).map((r) => ({
        id: r.id,
        studentName: r.studentName ?? "",
        program: progTitle.get(one(r.program) ?? "") ?? "",
        event: r.event ?? "",
        position: r.position ?? "",
        grade: r.grade ?? "",
        institution: r.institution ?? "",
        photo: r.photo ?? ""
      })) : []
    };
  }
});

// apps/edumotive/src/api/getCatalog.ts
var import_zod3 = require("zod");

// apps/edumotive/src/lib/schemas.ts
var import_zod2 = require("zod");
var authorZ = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string(),
  post: import_zod2.z.string(),
  photo: import_zod2.z.string(),
  bio: import_zod2.z.string(),
  email: import_zod2.z.string(),
  instagram: import_zod2.z.string(),
  institution: import_zod2.z.string(),
  count: import_zod2.z.number(),
  penName: import_zod2.z.string(),
  tier: import_zod2.z.object({ name: import_zod2.z.string(), color: import_zod2.z.string() }).nullable(),
  badges: import_zod2.z.array(import_zod2.z.object({ name: import_zod2.z.string(), icon: import_zod2.z.string(), description: import_zod2.z.string() }))
});
var cardZ = import_zod2.z.object({
  id: import_zod2.z.string(),
  title: import_zod2.z.string(),
  slug: import_zod2.z.string(),
  excerpt: import_zod2.z.string(),
  mainImage: import_zod2.z.string(),
  section: import_zod2.z.string(),
  authorName: import_zod2.z.string(),
  authorPhoto: import_zod2.z.string(),
  authorId: import_zod2.z.string(),
  publishedAt: import_zod2.z.string(),
  premium: import_zod2.z.boolean(),
  featured: import_zod2.z.boolean()
});
var issueZ = import_zod2.z.object({
  id: import_zod2.z.string(),
  title: import_zod2.z.string(),
  issueDate: import_zod2.z.string(),
  volume: import_zod2.z.string(),
  cover: import_zod2.z.string(),
  pdf: import_zod2.z.string(),
  description: import_zod2.z.string()
});
var accessZ = import_zod2.z.object({ premiumArticles: import_zod2.z.boolean(), pdfReading: import_zod2.z.boolean(), hardCopy: import_zod2.z.boolean() });
var profileZ = import_zod2.z.object({
  id: import_zod2.z.string(),
  displayName: import_zod2.z.string(),
  role: import_zod2.z.string(),
  className: import_zod2.z.string(),
  institution: import_zod2.z.string(),
  username: import_zod2.z.string(),
  bio: import_zod2.z.string(),
  avatar: import_zod2.z.string()
});

// apps/edumotive/src/api/getCatalog.ts
var getCatalog_default = createEndpoint({
  description: "Loads published articles, authors and magazine issues",
  inputSchema: import_zod3.z.object({}),
  outputSchema: import_zod3.z.object({
    articles: import_zod3.z.array(cardZ.extend({ issueId: import_zod3.z.string() })),
    authors: import_zod3.z.array(authorZ),
    issues: import_zod3.z.array(issueZ)
  }),
  execute: async () => {
    const dir = await loadDirectory();
    const { records: iss } = await zite.issues.findAll({ filters: { published: true }, limit: 500 });
    return {
      articles: dir.published.slice(0, 600).map((a) => ({ ...toCard(a, dir), issueId: one(a.issue) ?? "" })),
      authors: [...dir.authors.values()].sort((a, b) => b.count - a.count),
      issues: iss.sort((a, b) => (b.issueDate ?? "").localeCompare(a.issueDate ?? "")).map((i) => ({
        id: i.id,
        title: i.title ?? "",
        issueDate: i.issueDate ?? "",
        volume: i.volume ?? "",
        cover: i.cover ?? "",
        pdf: i.pdf ?? "",
        description: i.description ?? ""
      }))
    };
  }
});

// apps/edumotive/src/api/getMe.ts
var import_zod4 = require("zod");
var s2 = import_zod4.z.string();
var getMe_default = createEndpoint({
  description: "Loads the signed-in user profile, subscriptions and submissions",
  authenticated: true,
  inputSchema: import_zod4.z.object({}),
  outputSchema: import_zod4.z.object({
    profile: profileZ.nullable(),
    access: accessZ,
    author: authorZ.nullable(),
    subscriptions: import_zod4.z.array(import_zod4.z.object({ id: s2, plan: s2, price: import_zod4.z.number(), status: s2, trackingNumber: s2, startDate: s2, endDate: s2, created: s2, address: s2, deliveryStage: s2, hardCopy: import_zod4.z.boolean() })),
    submissions: import_zod4.z.array(import_zod4.z.object({ id: s2, title: s2, slug: s2, status: s2, adminNote: s2, excerpt: s2, content: s2, mainImage: s2, imageCaption: s2, sectionId: s2 }))
  }),
  execute: async ({ context }) => {
    const uid = context.user.id;
    const [p, subs, plans, arts, access, dir] = await Promise.all([
      zite.profiles.findOne({ filters: { account: uid } }),
      zite.subscriptions.findAll({ filters: { subscriber: uid }, limit: 100 }),
      zite.plans.findAll({ limit: 100 }),
      zite.articles.findAll({ filters: { submittedBy: uid }, limit: 500 }),
      getAccess(uid),
      loadDirectory()
    ]);
    const { records: au } = await zite.authors.findAll({ filters: { account: uid }, limit: 1 });
    const planMap = new Map(plans.records.map((x) => [x.id, x]));
    return {
      profile: p ? { id: p.id, displayName: p.displayName ?? "", role: p.role ?? "Student", className: p.className ?? "", institution: p.institution ?? "", username: p.username ?? "", bio: p.bio ?? "", avatar: p.avatar ?? "" } : null,
      access,
      author: au[0] ? dir.authors.get(au[0].id) ?? null : null,
      subscriptions: subs.records.sort((a, b) => (b.created ?? "").localeCompare(a.created ?? "")).map((x) => {
        const pl = planMap.get(one(x.plan) ?? "");
        return { id: x.id, plan: pl?.name ?? "", price: pl?.price ?? 0, status: x.status ?? "Pending", trackingNumber: x.trackingNumber ?? "", startDate: x.startDate ?? "", endDate: x.endDate ?? "", created: x.created ?? "", address: x.address ?? "", deliveryStage: x.deliveryStage ?? "", hardCopy: !!pl?.hardCopy };
      }),
      submissions: arts.records.map((a) => ({ id: a.id, title: a.title ?? "", slug: a.slug || a.id, status: a.status ?? "Draft", adminNote: a.adminNote ?? "", excerpt: a.excerpt ?? "", content: a.content ?? "", mainImage: a.mainImage ?? "", imageCaption: a.imageCaption ?? "", sectionId: one(a.section) ?? "" }))
    };
  }
});

// apps/edumotive/src/api/getArticle.ts
var import_zod5 = require("zod");
var getArticle_default = createEndpoint({
  description: "Loads a single article with its author, letters and access status",
  inputSchema: import_zod5.z.object({ slug: import_zod5.z.string() }),
  outputSchema: import_zod5.z.object({
    article: cardZ.extend({ content: import_zod5.z.string(), imageCaption: import_zod5.z.string(), locked: import_zod5.z.boolean() }).nullable(),
    author: authorZ.nullable(),
    letters: import_zod5.z.array(import_zod5.z.object({ id: import_zod5.z.string(), name: import_zod5.z.string(), message: import_zod5.z.string(), created: import_zod5.z.string() })),
    related: import_zod5.z.array(cardZ)
  }),
  execute: async ({ input, context }) => {
    const dir = await loadDirectory();
    const ar = dir.published.find((a) => a.slug === input.slug || a.id === input.slug);
    if (!ar) return { article: null, author: null, letters: [], related: [] };
    let content = ar.content ?? "";
    let locked = false;
    if (ar.premium) {
      const access = await getAccess(context.user?.id);
      if (!access.premiumArticles) {
        locked = true;
        content = content.split(/\n\s*\n/).slice(0, 3).join("\n\n");
      }
    }
    const { records: letters } = await zite.letters.findAll({ filters: { article: ar.id, approved: true, recipient: "Public" }, limit: 200 });
    const authorId = one(ar.author) ?? "";
    const sec = one(ar.section);
    return {
      article: { ...toCard(ar, dir), content, imageCaption: ar.imageCaption ?? "", locked },
      author: dir.authors.get(authorId) ?? null,
      letters: letters.map((l) => ({ id: l.id, name: l.name ?? "", message: l.message ?? "", created: l.created ?? "" })),
      related: dir.published.filter((a) => a.id !== ar.id && (one(a.section) === sec || one(a.author) === authorId)).slice(0, 4).map((a) => toCard(a, dir))
    };
  }
});

// apps/edumotive/src/api/getNews.ts
var import_zod6 = require("zod");
var getNews_default = createEndpoint({
  description: "Lists published news and updates",
  inputSchema: import_zod6.z.object({}),
  outputSchema: import_zod6.z.object({
    news: import_zod6.z.array(import_zod6.z.object({ id: import_zod6.z.string(), title: import_zod6.z.string(), summary: import_zod6.z.string(), body: import_zod6.z.string(), image: import_zod6.z.string(), date: import_zod6.z.string() }))
  }),
  execute: async () => {
    const { records } = await zite.news.findAll({ limit: 200 });
    const news = records.filter((r) => r.published && r.title).map((r) => ({ id: r.id, title: r.title ?? "", summary: r.summary ?? "", body: r.body ?? "", image: r.image ?? "", date: r.publishedDate ?? "" })).sort((a, b) => b.date.localeCompare(a.date));
    return { news };
  }
});

// apps/edumotive/src/api/getAds.ts
var import_zod7 = require("zod");
var getAds_default = createEndpoint({
  description: "Lists approved advertisements",
  inputSchema: import_zod7.z.object({}),
  outputSchema: import_zod7.z.object({ ads: import_zod7.z.array(import_zod7.z.object({ id: import_zod7.z.string(), title: import_zod7.z.string(), media: import_zod7.z.string(), mediaType: import_zod7.z.string(), targetLink: import_zod7.z.string() })) }),
  execute: async () => {
    const { records } = await zite.ads.findAll({ filters: { status: "Approved" }, limit: 100 });
    return { ads: records.filter((a) => a.media && (!a.endDate || a.endDate >= (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))).map((a) => ({ id: a.id, title: a.title ?? "", media: a.media ?? "", mediaType: a.mediaType ?? "Image", targetLink: a.targetLink ?? "" })) };
  }
});

// apps/edumotive/src/api/saveProfile.ts
var import_zod8 = require("zod");
var saveProfile_default = createEndpoint({
  description: "Creates or updates the signed-in user profile",
  authenticated: true,
  inputSchema: import_zod8.z.object({
    displayName: import_zod8.z.string().min(1),
    role: import_zod8.z.enum(["Student", "Author"]),
    className: import_zod8.z.string().min(1),
    institution: import_zod8.z.string().min(1),
    username: import_zod8.z.string(),
    bio: import_zod8.z.string(),
    avatar: import_zod8.z.string()
  }),
  outputSchema: import_zod8.z.object({ ok: import_zod8.z.boolean() }),
  execute: async ({ input, context }) => {
    const uid = context.user.id;
    const existing = await zite.profiles.findOne({ filters: { account: uid } });
    if (existing) await zite.profiles.update({ id: existing.id, record: input });
    else await zite.profiles.create({ record: { ...input, account: uid } });
    if (input.role === "Author") {
      const au = await zite.authors.findOne({ filters: { account: uid } });
      const rec = { name: input.displayName, institution: input.institution, bio: input.bio || null, photo: input.avatar || null };
      if (au) await zite.authors.update({ id: au.id, record: rec });
      else await zite.authors.create({ record: { ...rec, post: "Author", email: context.user.email, account: uid } });
    }
    return { ok: true };
  }
});

// apps/edumotive/src/api/saveSubmission.ts
var import_zod9 = require("zod");
var saveSubmission_default = createEndpoint({
  description: "Saves a draft or submits an article for admin review",
  authenticated: true,
  inputSchema: import_zod9.z.object({
    id: import_zod9.z.string().optional(),
    title: import_zod9.z.string().min(3),
    excerpt: import_zod9.z.string(),
    content: import_zod9.z.string().min(20),
    mainImage: import_zod9.z.string(),
    imageCaption: import_zod9.z.string(),
    sectionId: import_zod9.z.string(),
    submit: import_zod9.z.boolean()
  }),
  outputSchema: import_zod9.z.object({ id: import_zod9.z.string() }),
  execute: async ({ input, context }) => {
    const uid = context.user.id;
    const profile = await zite.profiles.findOne({ filters: { account: uid } });
    if (!profile) throw fail("Please complete your profile first.");
    let author = await zite.authors.findOne({ filters: { account: uid } });
    if (!author) author = await zite.authors.create({ record: { name: profile.displayName, institution: profile.institution, photo: profile.avatar || null, post: "Contributor", email: context.user.email, account: uid } });
    const record = {
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      mainImage: input.mainImage || null,
      imageCaption: input.imageCaption,
      section: input.sectionId || null,
      author: author.id,
      status: input.submit ? "Pending" : "Draft",
      submittedBy: uid
    };
    if (input.id) {
      const ex = await zite.articles.findOne({ id: input.id });
      if (!ex || one(ex.submittedBy) !== uid) throw fail("Article not found.");
      if (ex.status === "Published") throw fail("Published articles can only be edited by the editorial team.");
      await zite.articles.update({ id: input.id, record });
      return { id: input.id };
    }
    const created = await zite.articles.create({ record: { ...record, slug: `${slugify(input.title)}-${Date.now().toString(36)}` } });
    return { id: created.id };
  }
});

// apps/edumotive/src/api/createSubscription.ts
var import_zod10 = require("zod");
var createSubscription_default = createEndpoint({
  description: "Places a magazine subscription order with payment proof",
  authenticated: true,
  inputSchema: import_zod10.z.object({
    planId: import_zod10.z.string(),
    fullName: import_zod10.z.string().min(2),
    phone: import_zod10.z.string().min(8),
    address: import_zod10.z.string().min(8),
    pincode: import_zod10.z.string().min(6),
    paymentProof: import_zod10.z.string().url(),
    transactionId: import_zod10.z.string().min(4)
  }),
  outputSchema: import_zod10.z.object({ id: import_zod10.z.string() }),
  execute: async ({ input, context }) => {
    const profile = await zite.profiles.findOne({ filters: { account: context.user.id } });
    if (!profile) throw fail("Please create your profile before subscribing.");
    const { planId, ...rest } = input;
    const r = await zite.subscriptions.create({ record: { ...rest, plan: planId, subscriber: context.user.id, status: "Pending" } });
    return { id: r.id };
  }
});

// apps/edumotive/src/api/submitAd.ts
var import_zod11 = require("zod");
var submitAd_default = createEndpoint({
  description: "Submits a paid advertisement subscription for admin approval",
  inputSchema: import_zod11.z.object({
    title: import_zod11.z.string().min(1),
    advertiser: import_zod11.z.string().min(1),
    email: import_zod11.z.string().email(),
    phone: import_zod11.z.string(),
    media: import_zod11.z.string().url(),
    mediaType: import_zod11.z.enum(["Image", "Video"]),
    targetLink: import_zod11.z.string(),
    planId: import_zod11.z.string().min(1),
    paymentProof: import_zod11.z.string().url(),
    transactionId: import_zod11.z.string()
  }),
  outputSchema: import_zod11.z.object({ ok: import_zod11.z.boolean() }),
  execute: async ({ input }) => {
    const { planId, paymentProof, transactionId, ...rest } = input;
    await zite.ads.create({
      record: {
        ...rest,
        targetLink: rest.targetLink || null,
        status: "Pending",
        plan: [planId],
        paymentProof: [{ url: paymentProof }],
        transactionId: transactionId || null
      }
    });
    return { ok: true };
  }
});

// apps/edumotive/src/api/submitLetter.ts
var import_zod12 = require("zod");
var submitLetter_default = createEndpoint({
  description: "Sends a letter to an author or a public letter about an article",
  inputSchema: import_zod12.z.object({
    articleId: import_zod12.z.string(),
    name: import_zod12.z.string().min(1),
    email: import_zod12.z.string().email(),
    message: import_zod12.z.string().min(5),
    recipient: import_zod12.z.enum(["Author", "Public"])
  }),
  outputSchema: import_zod12.z.object({ ok: import_zod12.z.boolean() }),
  execute: async ({ input }) => {
    await zite.letters.create({ record: { name: input.name, email: input.email, message: input.message, recipient: input.recipient, article: input.articleId, approved: false } });
    return { ok: true };
  }
});

// apps/edumotive-admin/src/api/adminLogin.ts
var import_zod13 = require("zod");

// apps/edumotive-admin/src/lib/adminAuth.ts
var ADMIN_EMAILS = ["edumotive4@gmail.com", "shafeealam1364@gmail.com"];
var ADMIN_PASSWORD = "edu4motive@tri";
function assertAdmin(key) {
  const i = (key ?? "").indexOf(":");
  const email = (key ?? "").slice(0, i).trim().toLowerCase();
  const pass = (key ?? "").slice(i + 1);
  if (i < 0 || !ADMIN_EMAILS.includes(email) || pass !== ADMIN_PASSWORD) {
    throw new ZiteError({ code: "UNAUTHORIZED", message: "Invalid admin login", userFacingMessage: "Please sign in to the admin panel again." });
  }
}

// apps/edumotive-admin/src/api/adminLogin.ts
var adminLogin_default = createEndpoint({
  description: "Checks the admin email and password",
  inputSchema: import_zod13.z.object({ email: import_zod13.z.string(), password: import_zod13.z.string() }),
  outputSchema: import_zod13.z.object({ key: import_zod13.z.string() }),
  execute: async ({ input }) => {
    const key = `${input.email.trim().toLowerCase()}:${input.password}`;
    assertAdmin(key);
    return { key };
  }
});

// apps/edumotive-admin/src/api/adminList.ts
var import_zod14 = require("zod");
var TABLES = ["siteSettings", "sections", "tiers", "badges", "authors", "issues", "articles", "letters", "programs", "results", "teamMembers", "plans", "subscriptions", "ads", "notes", "profiles", "adPlans", "heroSlides", "news", "initiatives"];
var adminList_default = createEndpoint({
  description: "Lists every record of a table for the admin panel",
  inputSchema: import_zod14.z.object({ key: import_zod14.z.string(), table: import_zod14.z.enum(TABLES) }),
  outputSchema: import_zod14.z.object({ records: import_zod14.z.array(import_zod14.z.record(import_zod14.z.string(), import_zod14.z.any())) }),
  execute: async ({ input }) => {
    assertAdmin(input.key);
    const client = zite[input.table];
    const { records } = await client.findAll({ limit: 2e3 });
    if (input.table === "ads") {
      return { records: records.map((r) => ({ ...r, paymentProof: Array.isArray(r.paymentProof) ? r.paymentProof[0]?.url ?? "" : r.paymentProof ?? "" })) };
    }
    return { records };
  }
});

// apps/edumotive-admin/src/api/adminSave.ts
var import_zod15 = require("zod");
var TABLES2 = ["siteSettings", "sections", "tiers", "badges", "authors", "issues", "articles", "letters", "programs", "results", "teamMembers", "plans", "subscriptions", "ads", "notes", "profiles", "adPlans", "heroSlides", "news", "initiatives"];
var one2 = (v) => Array.isArray(v) ? v[0] : v;
var slugify2 = (s3) => s3.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
var adminSave_default = createEndpoint({
  description: "Creates or updates a record from the admin panel",
  inputSchema: import_zod15.z.object({ key: import_zod15.z.string(), table: import_zod15.z.enum(TABLES2), id: import_zod15.z.string().optional(), record: import_zod15.z.record(import_zod15.z.string(), import_zod15.z.any()), deleteId: import_zod15.z.string().optional() }),
  outputSchema: import_zod15.z.object({ id: import_zod15.z.string() }),
  execute: async ({ input }) => {
    assertAdmin(input.key);
    const client = zite[input.table];
    if (input.deleteId) {
      await client.delete({ id: input.deleteId });
      return { id: input.deleteId };
    }
    const rec = { ...input.record };
    delete rec.id;
    delete rec.created;
    for (const k of Object.keys(rec)) if (rec[k] === "") rec[k] = null;
    if (input.table === "articles") {
      if (!rec.slug && rec.title) rec.slug = `${slugify2(String(rec.title))}-${Date.now().toString(36).slice(-4)}`;
      if (rec.status === "Published" && !rec.publishedAt) rec.publishedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    if (input.table === "subscriptions" && rec.status === "Active" && !rec.startDate) {
      const planId = one2(rec.plan);
      const plan = planId ? await zite.plans.findOne({ id: planId }) : void 0;
      const start = /* @__PURE__ */ new Date();
      const end = new Date(start);
      end.setMonth(end.getMonth() + (plan?.durationMonths ?? 12));
      rec.startDate = start.toISOString().slice(0, 10);
      rec.endDate = end.toISOString().slice(0, 10);
    }
    if (input.table === "ads" && "paymentProof" in rec) {
      rec.paymentProof = typeof rec.paymentProof === "string" && rec.paymentProof ? [{ url: rec.paymentProof }] : null;
    }
    if (input.table === "ads" && rec.status === "Approved" && !rec.startDate) {
      const planId = one2(rec.plan);
      const plan = planId ? await zite.adPlans.findOne({ id: planId }) : void 0;
      const start = /* @__PURE__ */ new Date();
      const end = new Date(start);
      if (plan?.period === "Week") end.setDate(end.getDate() + 7);
      else if (plan?.period === "Year") end.setFullYear(end.getFullYear() + 1);
      else end.setMonth(end.getMonth() + 1);
      rec.startDate = start.toISOString().slice(0, 10);
      rec.endDate = end.toISOString().slice(0, 10);
    }
    if (input.id) {
      await client.update({ id: input.id, record: rec });
      return { id: input.id };
    }
    const created = await client.create({ record: rec });
    return { id: created.id };
  }
});

// apps/edumotive-admin/src/api/adminStats.ts
var import_zod16 = require("zod");
var adminStats_default = createEndpoint({
  description: "Counts items needing attention for the admin dashboard",
  inputSchema: import_zod16.z.object({ key: import_zod16.z.string() }),
  outputSchema: import_zod16.z.object({ stats: import_zod16.z.record(import_zod16.z.string(), import_zod16.z.number()) }),
  execute: async ({ input }) => {
    assertAdmin(input.key);
    const q = async (sql) => Number((await zite.sql({ query: sql })).rows[0]?.n ?? 0);
    const [published, pending, subsPending, subsActive, adsPending, letters, authors, profiles] = await Promise.all([
      q(`SELECT COUNT(*) AS n FROM "Articles" WHERE "status" = 'Published'`),
      q(`SELECT COUNT(*) AS n FROM "Articles" WHERE "status" = 'Pending'`),
      q(`SELECT COUNT(*) AS n FROM "Subscriptions" WHERE "status" = 'Pending'`),
      q(`SELECT COUNT(*) AS n FROM "Subscriptions" WHERE "status" = 'Active'`),
      q(`SELECT COUNT(*) AS n FROM "Ads" WHERE "status" = 'Pending'`),
      q(`SELECT COUNT(*) AS n FROM "Letters" WHERE "approved" IS NOT TRUE`),
      q(`SELECT COUNT(*) AS n FROM "Authors"`),
      q(`SELECT COUNT(*) AS n FROM "Profiles"`)
    ]);
    return { stats: { published, pending, subsPending, subsActive, adsPending, letters, authors, profiles } };
  }
});

// apps/edumotive/apiApp.ts
var endpoints = {
  getSite: getSite_default,
  getCatalog: getCatalog_default,
  getMe: getMe_default,
  getArticle: getArticle_default,
  getNews: getNews_default,
  getAds: getAds_default,
  saveProfile: saveProfile_default,
  saveSubmission: saveSubmission_default,
  createSubscription: createSubscription_default,
  submitAd: submitAd_default,
  submitLetter: submitLetter_default,
  adminLogin: adminLogin_default,
  adminList: adminList_default,
  adminSave: adminSave_default,
  adminStats: adminStats_default
};
var pdfCache = /* @__PURE__ */ new Map();
async function buildIssuePdf(issueId) {
  const cached = pdfCache.get(issueId);
  if (cached) return cached;
  const issue = await zite.issues.findOne({ id: issueId });
  const { records: allArticles } = await zite.articles.findAll({
    filters: { status: "Published" },
    limit: 50
  });
  const issueArticles = allArticles.filter((a) => a.issue === issueId);
  const stories = issueArticles.length ? issueArticles : allArticles.slice(0, 3);
  const doc = await import_pdf_lib.PDFDocument.create();
  const serifBold = await doc.embedFont(import_pdf_lib.StandardFonts.TimesRomanBold);
  const serif = await doc.embedFont(import_pdf_lib.StandardFonts.TimesRoman);
  const sans = await doc.embedFont(import_pdf_lib.StandardFonts.Helvetica);
  const cover = doc.addPage([595, 842]);
  cover.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: (0, import_pdf_lib.rgb)(0.133, 0.157, 0.192) });
  cover.drawRectangle({ x: 42, y: 740, width: 120, height: 6, color: (0, import_pdf_lib.rgb)(1, 0.827, 0.412) });
  cover.drawText("EDUMOTIVE TRIMONTHLY", { x: 42, y: 760, size: 13, font: sans, color: (0, import_pdf_lib.rgb)(1, 0.827, 0.412) });
  cover.drawText(issue?.title || "Student Magazine Edition", {
    x: 42,
    y: 660,
    size: 32,
    font: serifBold,
    color: (0, import_pdf_lib.rgb)(0.95, 0.95, 0.95),
    maxWidth: 510
  });
  cover.drawText(`${issue?.volume || "Vol. 14"}  \u2022  ${issue?.issueDate || "2026"}`, {
    x: 42,
    y: 600,
    size: 14,
    font: sans,
    color: (0, import_pdf_lib.rgb)(0.8, 0.82, 0.85)
  });
  cover.drawText(issue?.description || "Stories, essays, and ideas from students and scholars.", {
    x: 42,
    y: 520,
    size: 13,
    font: serif,
    color: (0, import_pdf_lib.rgb)(0.88, 0.88, 0.9),
    maxWidth: 500,
    lineHeight: 20
  });
  cover.drawText("Darul Huda Islamic University, Chemmad", {
    x: 42,
    y: 60,
    size: 11,
    font: sans,
    color: (0, import_pdf_lib.rgb)(0.75, 0.77, 0.8)
  });
  for (let idx = 0; idx < Math.max(3, stories.length); idx++) {
    const story = stories[idx % stories.length];
    const page = doc.addPage([595, 842]);
    page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: (0, import_pdf_lib.rgb)(0.97, 0.96, 0.94) });
    page.drawText(`PAGE ${idx + 2}  \u2022  EDUMOTIVE`, {
      x: 48,
      y: 790,
      size: 10,
      font: sans,
      color: (0, import_pdf_lib.rgb)(0.45, 0.48, 0.52)
    });
    page.drawLine({
      start: { x: 48, y: 778 },
      end: { x: 547, y: 778 },
      thickness: 1,
      color: (0, import_pdf_lib.rgb)(0.85, 0.83, 0.8)
    });
    page.drawText(story?.title || "Editorial Essay", {
      x: 48,
      y: 730,
      size: 22,
      font: serifBold,
      color: (0, import_pdf_lib.rgb)(0.13, 0.15, 0.19),
      maxWidth: 499,
      lineHeight: 28
    });
    const cleanBody = (story?.content || story?.excerpt || "").replace(/^#+\s*/gm, "").replace(/[>*_`]/g, "").slice(0, 1400);
    page.drawText(cleanBody, {
      x: 48,
      y: 640,
      size: 12,
      font: serif,
      color: (0, import_pdf_lib.rgb)(0.2, 0.22, 0.25),
      maxWidth: 499,
      lineHeight: 19
    });
  }
  const bytes = await doc.save();
  pdfCache.set(issueId, bytes);
  return bytes;
}
function parseUser(req) {
  const raw = req.header("x-auth-user");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.id === "string" && parsed.id) {
      return {
        id: parsed.id,
        email: typeof parsed.email === "string" ? parsed.email : "reader@edumotive.in",
        name: typeof parsed.name === "string" ? parsed.name : "Reader"
      };
    }
  } catch {
    return null;
  }
  return null;
}
function createApiApp() {
  const app = (0, import_express.default)();
  app.use((req, _res, next) => {
    const r = req;
    if (r.body !== void 0) {
      if (typeof r.body === "string") {
        try {
          r.body = r.body ? JSON.parse(r.body) : {};
        } catch {
        }
      }
      if (typeof r.body === "object" && r.body !== null) {
        r._body = true;
      }
    }
    next();
  });
  app.use(import_express.default.json({ limit: "15mb" }));
  app.get("/api/health", async (_req, res) => {
    try {
      await ensureDbReady();
      return res.json({ ok: true, database: isTursoEnabled() ? "turso" : "memory" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Database connection error";
      console.error("Health check database error:", err);
      return res.status(500).json({ ok: false, database: isTursoEnabled() ? "turso" : "memory", error: msg });
    }
  });
  app.get("/api/issues/:id.pdf", async (req, res) => {
    try {
      await ensureDbReady();
      const pdf = await buildIssuePdf(req.params.id);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Cache-Control", "public, max-age=300");
      res.send(Buffer.from(pdf));
    } catch (err) {
      console.error("PDF generation error:", err);
      res.status(500).json({ error: "Could not generate issue PDF" });
    }
  });
  app.post("/api/upload", async (req, res) => {
    try {
      await ensureDbReady();
      const { dataUrl, type } = req.body ?? {};
      if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.includes(",")) {
        return res.status(400).json({ error: "Invalid upload payload" });
      }
      const [meta, base64] = dataUrl.split(",", 2);
      const mimeMatch = /^data:([^;]+);base64$/.exec(meta);
      const mime = mimeMatch?.[1] || type || "application/octet-stream";
      const id = `up_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      await saveUpload(id, mime, Buffer.from(base64, "base64"));
      return res.json({ url: `/api/uploads/${id}` });
    } catch (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Failed to store uploaded file" });
    }
  });
  app.get("/api/uploads/:id", async (req, res) => {
    try {
      await ensureDbReady();
      const item = await getUpload(req.params.id);
      if (!item) return res.status(404).send("Not found");
      res.setHeader("Content-Type", item.mime);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.send(item.buffer);
    } catch (err) {
      console.error("Upload read error:", err);
      return res.status(500).send("Error reading uploaded file");
    }
  });
  app.post("/api/:endpoint", async (req, res) => {
    const name = req.params.endpoint;
    const ep = endpoints[name];
    if (!ep) {
      return res.status(404).json({ error: `Unknown endpoint: ${name}` });
    }
    try {
      await ensureDbReady();
      const user = parseUser(req);
      if (ep.authenticated && !user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const input = ep.inputSchema.parse(req.body ?? {});
      const result = await ep.execute({
        input,
        context: { user }
      });
      const validated = ep.outputSchema.parse(result);
      return res.json(validated);
    } catch (err) {
      if (err instanceof ZiteError) {
        return res.status(400).json({ error: err.userFacingMessage || err.message });
      }
      if (err instanceof import_zod17.ZodError) {
        return res.status(400).json({ error: err.errors.map((e) => e.message).join(", ") });
      }
      console.error(`Endpoint error (${name}):`, err);
      const detail = err instanceof Error ? err.message : "Internal server error";
      return res.status(500).json({ error: detail });
    }
  });
  return app;
}
var cachedApp = null;
async function getApiApp() {
  if (!cachedApp) {
    cachedApp = createApiApp();
  }
  return cachedApp;
}

// apps/edumotive/api/index.ts
var config = {
  maxDuration: 30
};
async function handler(req, res) {
  try {
    const rawPath = req.query?.__path;
    const pathParts = Array.isArray(rawPath) ? rawPath : typeof rawPath === "string" && rawPath ? [rawPath] : [];
    if (pathParts.length > 0 && (!req.url || req.url.startsWith("/api/index"))) {
      const qs = new URLSearchParams();
      for (const [k, v] of Object.entries(req.query ?? {})) {
        if (k === "__path") continue;
        if (typeof v === "string") qs.set(k, v);
        else if (Array.isArray(v)) v.forEach((item) => qs.append(k, item));
      }
      const suffix = qs.toString() ? `?${qs.toString()}` : "";
      req.url = `/api/${pathParts.join("/")}${suffix}`;
    }
    const app = await getApiApp();
    await new Promise((resolve) => {
      res.once("finish", resolve);
      res.once("close", resolve);
      app(req, res);
    });
  } catch (err) {
    console.error("Serverless handler error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: err instanceof Error ? err.message : "Serverless API error" }));
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config
});
