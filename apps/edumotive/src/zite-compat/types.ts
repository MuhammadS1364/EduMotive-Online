export type BaseRecord = { id: string; [key: string]: unknown };

export type FindAllArgs<T> = {
  filters?: Partial<Record<keyof T | string, unknown>>;
  limit?: number;
};

export type FindOneArgs<T> = {
  id?: string;
  filters?: Partial<Record<keyof T | string, unknown>>;
};

export function matchesFilters<T extends Record<string, unknown>>(
  row: T,
  filters?: Partial<Record<keyof T | string, unknown>>,
): boolean {
  if (!filters) return true;
  for (const [key, expected] of Object.entries(filters)) {
    if (expected === undefined) continue;
    const actual = row[key];
    if (Array.isArray(actual)) {
      if (!actual.includes(expected)) return false;
    } else if (actual !== expected) {
      return false;
    }
  }
  return true;
}

export interface SiteSettingsRecord extends BaseRecord {
  name?: string;
  aboutText?: string;
  vision?: string;
  mission?: string;
  teamPhoto?: string;
  logo?: string;
  paymentQr?: string;
  upiId?: string;
  showPrograms?: boolean;
  showResults?: boolean;
  showSubscribe?: boolean;
  contactEmail?: string;
  instagram?: string;
  facebook?: string;
  xLink?: string;
  googleVerificationCode?: string;
  freePdfPages?: number;
  phone?: string;
  address?: string;
  motto?: string;
  phones?: string;
}

export interface SectionRecord extends BaseRecord {
  name?: string;
  description?: string;
  visible?: boolean;
  sortOrder?: number;
}

export interface TierRecord extends BaseRecord {
  name?: string;
  minArticles?: number;
  color?: string;
}

export interface BadgeRecord extends BaseRecord {
  name?: string;
  description?: string;
  icon?: string;
}

export interface AuthorRecord extends BaseRecord {
  name?: string;
  post?: string;
  photo?: string | null;
  bio?: string | null;
  email?: string;
  instagram?: string;
  institution?: string;
  manualTier?: string;
  badges?: string[];
  account?: string;
  penName?: string;
  showPenName?: boolean;
}

export interface IssueRecord extends BaseRecord {
  title?: string;
  issueDate?: string;
  volume?: string;
  cover?: string;
  pdf?: string;
  description?: string;
  published?: boolean;
}

export interface ArticleRecord extends BaseRecord {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  mainImage?: string | null;
  imageCaption?: string;
  section?: string | null;
  author?: string;
  issue?: string;
  status?: 'Draft' | 'Pending' | 'Published' | 'Rejected' | string;
  premium?: boolean;
  featured?: boolean;
  publishedAt?: string;
  submittedBy?: string;
  adminNote?: string;
}

export interface LetterRecord extends BaseRecord {
  name?: string;
  email?: string;
  message?: string;
  recipient?: 'Author' | 'Public';
  article?: string;
  approved?: boolean;
  created?: string;
}

export interface ProgramRecord extends BaseRecord {
  title?: string;
  image?: string;
  fee?: string;
  description?: string;
  eligibility?: string;
  mode?: string;
  registrationLink?: string;
  date?: string;
  visible?: boolean;
}

export interface ResultRecord extends BaseRecord {
  studentName?: string;
  program?: string;
  event?: string;
  position?: string;
  grade?: string;
  institution?: string;
  photo?: string;
  visible?: boolean;
}

export interface TeamMemberRecord extends BaseRecord {
  name?: string;
  post?: string;
  photo?: string;
  phone?: string;
  email?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  xLink?: string;
  about?: string;
  sortOrder?: number;
}

export interface PlanRecord extends BaseRecord {
  name?: string;
  price?: number;
  durationMonths?: number;
  features?: string;
  premiumArticles?: boolean;
  pdfReading?: boolean;
  hardCopy?: boolean;
  active?: boolean;
}

export interface SubscriptionRecord extends BaseRecord {
  fullName?: string;
  plan?: string;
  subscriber?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  paymentProof?: string;
  transactionId?: string;
  status?: 'Pending' | 'Active' | 'Rejected' | 'Expired';
  trackingNumber?: string;
  startDate?: string;
  endDate?: string;
  created?: string;
  deliveryStage?: string;
}

export interface AdRecord extends BaseRecord {
  title?: string;
  advertiser?: string;
  email?: string;
  phone?: string;
  media?: string;
  mediaType?: 'Image' | 'Video';
  targetLink?: string | null;
  status?: 'Pending' | 'Approved' | 'Rejected';
  plan?: string[];
  paymentProof?: { url: string }[];
  transactionId?: string | null;
  startDate?: string;
  endDate?: string;
}

export interface ProfileRecord extends BaseRecord {
  displayName?: string;
  account?: string;
  role?: 'Student' | 'Author';
  className?: string;
  institution?: string;
  username?: string;
  bio?: string;
  avatar?: string;
}

export interface AdPlanRecord extends BaseRecord {
  name?: string;
  mediaType?: string;
  period?: string;
  price?: number;
  details?: string;
  active?: boolean;
}

export interface HeroSlideRecord extends BaseRecord {
  title?: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  link?: string;
  sortOrder?: number;
  active?: boolean;
}

export interface NewsRecord extends BaseRecord {
  title?: string;
  summary?: string;
  body?: string;
  image?: string;
  publishedDate?: string;
  published?: boolean;
}

export interface InitiativeRecord extends BaseRecord {
  name?: string;
  logo?: string;
  description?: string;
  link?: string;
  sortOrder?: number;
}
