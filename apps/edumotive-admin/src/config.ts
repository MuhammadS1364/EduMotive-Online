import {
  LayoutDashboard, FileText, Layers, Users, Award, BookOpen, GraduationCap, Trophy, UserSquare2,
  CreditCard, Package, Megaphone, Mail, StickyNote, Settings, UserCircle, GalleryHorizontal, Newspaper,
} from 'lucide-react';
import type { AdminListInputType } from 'zitejs/api';

export type TableName = AdminListInputType['table'];
export type FieldType = 'text' | 'textarea' | 'number' | 'bool' | 'image' | 'file' | 'select' | 'date' | 'link' | 'multilink' | 'markdown' | 'url';
export type Field = { key: string; label: string; type: FieldType; options?: string[]; link?: { table: TableName; label: string }; list?: boolean; required?: boolean };
export type Resource = {
  path: string; title: string; icon: typeof FileText; table: TableName; titleKey: string; fields: Field[];
  defaults?: Record<string, unknown>; filterTabs?: { key: string; values: string[] }; description?: string;
};

const YES = ['Draft', 'Pending', 'Published', 'Rejected'];

export const RESOURCES: Resource[] = [
  { path: 'hero-slides', title: 'Hero Slides', icon: GalleryHorizontal, table: 'heroSlides', titleKey: 'title', description: 'Slides that rotate at the top of the home page. Lower order shows first.', defaults: { active: true, sortOrder: 1 },
    fields: [
      { key: 'image', label: 'Image', type: 'image', list: true }, { key: 'title', label: 'Title', type: 'text', list: true, required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' }, { key: 'buttonText', label: 'Button text', type: 'text' },
      { key: 'link', label: 'Button link (e.g. /magazine or https://…)', type: 'text' },
      { key: 'sortOrder', label: 'Order', type: 'number', list: true }, { key: 'active', label: 'Active', type: 'bool', list: true },
    ] },
  { path: 'news', title: 'News', icon: Newspaper, table: 'news', titleKey: 'title', description: 'News & updates shown on the News page and home page.', defaults: { published: true },
    fields: [
      { key: 'image', label: 'Image', type: 'image', list: true }, { key: 'title', label: 'Title', type: 'text', list: true, required: true },
      { key: 'publishedDate', label: 'Date', type: 'date', list: true }, { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'body', label: 'Full story', type: 'textarea' }, { key: 'published', label: 'Published', type: 'bool', list: true },
    ] },
  { path: 'articles', title: 'Articles', icon: FileText, table: 'articles', titleKey: 'title', description: 'Write, edit, approve and publish articles. Pending = submitted by students/authors.',
    filterTabs: { key: 'status', values: YES }, defaults: { status: 'Draft' },
    fields: [
      { key: 'title', label: 'Title', type: 'text', list: true, required: true },
      { key: 'status', label: 'Status', type: 'select', options: YES, list: true },
      { key: 'section', label: 'Section', type: 'link', link: { table: 'sections', label: 'name' }, list: true },
      { key: 'author', label: 'Author', type: 'link', link: { table: 'authors', label: 'name' }, list: true },
      { key: 'issue', label: 'Magazine issue', type: 'link', link: { table: 'issues', label: 'title' } },
      { key: 'premium', label: 'Premium (subscribers only)', type: 'bool', list: true },
      { key: 'featured', label: 'Featured on home', type: 'bool' },
      { key: 'excerpt', label: 'Standfirst / summary', type: 'textarea' },
      { key: 'mainImage', label: 'Main image', type: 'image' },
      { key: 'imageCaption', label: 'Main image caption', type: 'text' },
      { key: 'content', label: 'Article', type: 'markdown' },
      { key: 'adminNote', label: 'Note to writer', type: 'textarea' },
      { key: 'slug', label: 'URL slug (auto)', type: 'text' },
    ] },
  { path: 'sections', title: 'Sections', icon: Layers, table: 'sections', titleKey: 'name', description: 'Article sub-sections. Hide a section to remove it from the website.', defaults: { visible: true },
    fields: [{ key: 'name', label: 'Name', type: 'text', list: true, required: true }, { key: 'visible', label: 'Visible', type: 'bool', list: true }, { key: 'sortOrder', label: 'Order', type: 'number', list: true }, { key: 'description', label: 'Description', type: 'textarea' }] },
  { path: 'authors', title: 'Authors', icon: Users, table: 'authors', titleKey: 'name', description: 'Authors appear in the article author picker and on author pages.',
    fields: [
      { key: 'name', label: 'Name', type: 'text', list: true, required: true }, { key: 'post', label: 'Post', type: 'text', list: true },
      { key: 'penName', label: 'Pen name', type: 'text', list: true }, { key: 'showPenName', label: 'Show pen name publicly', type: 'bool', list: true },
      { key: 'photo', label: 'Photo', type: 'image', list: true }, { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' }, { key: 'instagram', label: 'Instagram link', type: 'url' },
      { key: 'manualTier', label: 'Tier override (exact tier name)', type: 'text', list: true },
      { key: 'badges', label: 'Badges', type: 'multilink', link: { table: 'badges', label: 'name' } },
      { key: 'bio', label: 'Bio', type: 'textarea' },
    ] },
  { path: 'badges', title: 'Badges', icon: Award, table: 'badges', titleKey: 'name', description: 'Badge icons (PNG) shown on author profiles — e.g. "First Publication". Assign them from Authors.',
    fields: [{ key: 'icon', label: 'Icon (PNG)', type: 'image', list: true }, { key: 'name', label: 'Name', type: 'text', list: true, required: true }, { key: 'description', label: 'Description', type: 'textarea', list: true }] },
  { path: 'tiers', title: 'Author Tiers', icon: Trophy, table: 'tiers', titleKey: 'name', description: 'Authors automatically reach a tier at a number of published articles. The color tints their profile.',
    fields: [{ key: 'name', label: 'Name', type: 'text', list: true, required: true }, { key: 'minArticles', label: 'Published articles needed', type: 'number', list: true }, { key: 'color', label: 'Color (hex, e.g. #FFD369)', type: 'text', list: true }] },
  { path: 'issues', title: 'Magazine Issues', icon: BookOpen, table: 'issues', titleKey: 'title', description: 'Upload the PDF — readers see it as a flipbook without a download option.', defaults: { published: true },
    fields: [
      { key: 'cover', label: 'Cover', type: 'image', list: true }, { key: 'title', label: 'Title', type: 'text', list: true, required: true },
      { key: 'issueDate', label: 'Issue date', type: 'date', list: true }, { key: 'volume', label: 'Volume / No.', type: 'text' },
      { key: 'published', label: 'Published', type: 'bool', list: true }, { key: 'pdf', label: 'PDF', type: 'file' }, { key: 'description', label: 'Description', type: 'textarea' },
    ] },
  { path: 'programs', title: 'Programs', icon: GraduationCap, table: 'programs', titleKey: 'title', defaults: { visible: true, mode: 'Online' },
    fields: [
      { key: 'image', label: 'Image', type: 'image', list: true }, { key: 'title', label: 'Title', type: 'text', list: true, required: true },
      { key: 'mode', label: 'Mode', type: 'select', options: ['Online', 'Offline', 'Hybrid', 'Other'], list: true }, { key: 'fee', label: 'Fee', type: 'text', list: true },
      { key: 'date', label: 'Date', type: 'date' }, { key: 'visible', label: 'Visible on website', type: 'bool', list: true },
      { key: 'registrationLink', label: 'Registration link', type: 'url' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'eligibility', label: 'Eligibility', type: 'textarea' },
    ] },
  { path: 'results', title: 'Results', icon: Trophy, table: 'results', titleKey: 'studentName', defaults: { visible: true },
    fields: [
      { key: 'photo', label: 'Photo', type: 'image', list: true }, { key: 'studentName', label: 'Student', type: 'text', list: true, required: true },
      { key: 'program', label: 'Program', type: 'link', link: { table: 'programs', label: 'title' }, list: true }, { key: 'event', label: 'Event / item', type: 'text' },
      { key: 'position', label: 'Position', type: 'select', options: ['1st', '2nd', '3rd', 'None'], list: true }, { key: 'grade', label: 'Grade', type: 'select', options: ['A', 'B', 'C', 'None'], list: true },
      { key: 'institution', label: 'Institution', type: 'text' }, { key: 'visible', label: 'Visible', type: 'bool', list: true },
    ] },
  { path: 'team', title: 'Team (About Us)', icon: UserSquare2, table: 'teamMembers', titleKey: 'name',
    fields: [
      { key: 'photo', label: 'Photo', type: 'image', list: true }, { key: 'name', label: 'Name', type: 'text', list: true, required: true }, { key: 'post', label: 'Post', type: 'text', list: true },
      { key: 'sortOrder', label: 'Order', type: 'number', list: true }, { key: 'phone', label: 'Phone', type: 'text' }, { key: 'email', label: 'Email', type: 'text' },
      { key: 'instagram', label: 'Instagram', type: 'url' }, { key: 'facebook', label: 'Facebook', type: 'url' }, { key: 'xLink', label: 'X', type: 'url' },
      { key: 'address', label: 'Address', type: 'textarea' }, { key: 'about', label: 'About', type: 'textarea' },
    ] },
  { path: 'plans', title: 'Subscription Plans', icon: CreditCard, table: 'plans', titleKey: 'name', description: 'Choose what each plan unlocks: premium articles, digital magazine, hard copy.', defaults: { active: true, durationMonths: 12 },
    fields: [
      { key: 'name', label: 'Name', type: 'text', list: true, required: true }, { key: 'price', label: 'Price (₹)', type: 'number', list: true },
      { key: 'durationMonths', label: 'Duration (months)', type: 'number', list: true }, { key: 'active', label: 'Active', type: 'bool', list: true },
      { key: 'premiumArticles', label: 'Premium articles', type: 'bool', list: true }, { key: 'pdfReading', label: 'Full magazine PDF reading', type: 'bool', list: true },
      { key: 'hardCopy', label: 'Hard copy delivery', type: 'bool', list: true }, { key: 'features', label: 'Features (one per line)', type: 'textarea' },
    ] },
  { path: 'subscriptions', title: 'Subscriptions', icon: Package, table: 'subscriptions', titleKey: 'fullName', description: 'Verify payment proof, set Active, then add the Speed Post tracking number.',
    filterTabs: { key: 'status', values: ['Pending', 'Active', 'Rejected', 'Expired'] },
    fields: [
      { key: 'fullName', label: 'Name', type: 'text', list: true }, { key: 'plan', label: 'Plan', type: 'link', link: { table: 'plans', label: 'name' }, list: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Active', 'Rejected', 'Expired'], list: true },
      { key: 'paymentProof', label: 'Payment proof', type: 'image', list: true }, { key: 'transactionId', label: 'Transaction ID', type: 'text', list: true },
      { key: 'trackingNumber', label: 'Speed Post tracking no.', type: 'text', list: true },
      { key: 'deliveryStage', label: 'Delivery progress', type: 'select', options: ['Ordered', 'Packed', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'], list: true },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'address', label: 'Address', type: 'textarea' }, { key: 'pincode', label: 'Pincode', type: 'text' },
      { key: 'startDate', label: 'Start', type: 'date' }, { key: 'endDate', label: 'End', type: 'date', list: true },
    ] },
  { path: 'ad-plans', title: 'Ad Plans', icon: Megaphone, table: 'adPlans', titleKey: 'name', description: 'Weekly, monthly and yearly prices for image and video ads.', defaults: { active: true, mediaType: 'Image', period: 'Month' },
    fields: [
      { key: 'name', label: 'Name', type: 'text', list: true, required: true },
      { key: 'mediaType', label: 'Ad type', type: 'select', options: ['Image', 'Video'], list: true },
      { key: 'period', label: 'Period', type: 'select', options: ['Week', 'Month', 'Year'], list: true },
      { key: 'price', label: 'Price (₹)', type: 'number', list: true }, { key: 'active', label: 'Active', type: 'bool', list: true },
      { key: 'details', label: 'Details', type: 'textarea' },
    ] },
  { path: 'ads', title: 'Ads', icon: Megaphone, table: 'ads', titleKey: 'title', description: 'Check the payment screenshot, then set Approved — the run dates are set from the plan.', filterTabs: { key: 'status', values: ['Pending', 'Approved', 'Rejected'] }, defaults: { status: 'Approved', mediaType: 'Image' },
    fields: [
      { key: 'media', label: 'Media', type: 'image', list: true }, { key: 'title', label: 'Title', type: 'text', list: true, required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'], list: true }, { key: 'mediaType', label: 'Type', type: 'select', options: ['Image', 'Video'], list: true },
      { key: 'plan', label: 'Plan', type: 'link', link: { table: 'adPlans', label: 'name' }, list: true },
      { key: 'paymentProof', label: 'Payment screenshot', type: 'image', list: true }, { key: 'transactionId', label: 'Transaction ID', type: 'text' },
      { key: 'startDate', label: 'Start', type: 'date' }, { key: 'endDate', label: 'End', type: 'date', list: true },
      { key: 'advertiser', label: 'Advertiser', type: 'text', list: true }, { key: 'email', label: 'Email', type: 'text' }, { key: 'phone', label: 'Phone', type: 'text' }, { key: 'targetLink', label: 'Link', type: 'url' },
    ] },
  { path: 'letters', title: 'Letters', icon: Mail, table: 'letters', titleKey: 'name', description: 'Approve public letters to show them under the article. Letters to authors are private.',
    fields: [
      { key: 'name', label: 'From', type: 'text', list: true }, { key: 'recipient', label: 'To', type: 'select', options: ['Author', 'Public'], list: true },
      { key: 'article', label: 'Article', type: 'link', link: { table: 'articles', label: 'title' }, list: true }, { key: 'approved', label: 'Approved (public)', type: 'bool', list: true },
      { key: 'email', label: 'Email', type: 'text' }, { key: 'message', label: 'Message', type: 'textarea', list: true },
    ] },
  { path: 'members', title: 'Student & Author Profiles', icon: UserCircle, table: 'profiles', titleKey: 'displayName',
    fields: [
      { key: 'avatar', label: 'Photo', type: 'image', list: true }, { key: 'displayName', label: 'Name', type: 'text', list: true }, { key: 'role', label: 'Role', type: 'select', options: ['Student', 'Author'], list: true },
      { key: 'className', label: 'Class', type: 'text', list: true }, { key: 'institution', label: 'Institution', type: 'text', list: true }, { key: 'username', label: 'Username', type: 'text' }, { key: 'bio', label: 'Bio', type: 'textarea' },
    ] },
];

export const NAV = [
  { path: '', title: 'Dashboard', icon: LayoutDashboard },
  ...RESOURCES.map((r) => ({ path: r.path, title: r.title, icon: r.icon })),
  { path: 'planner', title: 'Notes & Planning', icon: StickyNote },
  { path: 'settings', title: 'Site Settings', icon: Settings },
];
