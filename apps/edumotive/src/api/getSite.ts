import { z } from 'zod';
import { createEndpoint } from '../zite-compat/backend';
import { zite } from '../zite-compat/db';
import { one } from '../lib/server';

const s = z.string();
export default createEndpoint({
  description: 'Loads site settings, sections, plans, team, programs and results',
  inputSchema: z.object({}),
  outputSchema: z.object({
    settings: z.object({
      aboutText: s, vision: s, mission: s, teamPhoto: s, logo: s, paymentQr: s, upiId: s,
      showPrograms: z.boolean(), showResults: z.boolean(), showSubscribe: z.boolean(),
      contactEmail: s, instagram: s, facebook: s, xLink: s, freePdfPages: z.number(), googleVerificationCode: s,
      phone: s, phones: z.array(s), address: s, motto: s,
    }),
    initiatives: z.array(z.object({ id: s, name: s, logo: s, link: s })),
    heroSlides: z.array(z.object({ id: s, title: s, subtitle: s, image: s, buttonText: s, link: s })),
    sections: z.array(z.object({ id: s, name: s, description: s })),
    plans: z.array(z.object({ id: s, name: s, price: z.number(), durationMonths: z.number(), features: z.array(s), premiumArticles: z.boolean(), pdfReading: z.boolean(), hardCopy: z.boolean() })),
    adPlans: z.array(z.object({ id: s, name: s, mediaType: s, period: s, price: z.number(), details: s })),
    team: z.array(z.object({ id: s, name: s, post: s, photo: s, phone: s, email: s, address: s, instagram: s, facebook: s, xLink: s, about: s })),
    programs: z.array(z.object({ id: s, title: s, image: s, fee: s, description: s, eligibility: s, mode: s, registrationLink: s, date: s })),
    results: z.array(z.object({ id: s, studentName: s, program: s, event: s, position: s, grade: s, institution: s, photo: s })),
  }),
  execute: async () => {
    const [st, sec, pl, tm, pr, rs, ap, hs, ini] = await Promise.all([
      zite.siteSettings.findAll({ limit: 1 }), zite.sections.findAll({ limit: 200 }), zite.plans.findAll({ limit: 100 }),
      zite.teamMembers.findAll({ limit: 500 }), zite.programs.findAll({ limit: 500 }), zite.results.findAll({ limit: 2000 }),
      zite.adPlans.findAll({ limit: 200 }), zite.heroSlides.findAll({ limit: 50 }), zite.initiatives.findAll({ limit: 50 }),
    ]);
    const x = st.records[0] ?? ({} as Record<string, never>);
    const settings = {
      aboutText: x.aboutText ?? '', vision: x.vision ?? '', mission: x.mission ?? '', teamPhoto: x.teamPhoto ?? '',
      logo: x.logo ?? '', paymentQr: x.paymentQr ?? '', upiId: x.upiId ?? '', showPrograms: !!x.showPrograms,
      showResults: !!x.showResults, showSubscribe: !!x.showSubscribe, contactEmail: x.contactEmail || 'edumotive4@gmail.com',
      instagram: x.instagram || 'https://instagram.com/edumotive.in', facebook: x.facebook || 'https://facebook.com/search/top?q=EduMotive%20Trimonthly', xLink: x.xLink || 'https://x.com/search?q=EduMotive%20Trimonthly',
      freePdfPages: x.freePdfPages ?? 3, googleVerificationCode: x.googleVerificationCode ?? '',
      phone: x.phone || '+91 82505 83682',
      phones: (x.phones || x.phone || '+91 82505 83682').split('\n').map((p) => p.trim()).filter(Boolean), address: x.address || 'Darul Huda Islamic University, Chemmad, Kerala, India', motto: x.motto || 'Empowering Minds, Shaping Future',
    };
    const progTitle = new Map(pr.records.map((p) => [p.id, p.title ?? '']));
    const periodOrder: Record<string, number> = { Week: 0, Month: 1, Year: 2 };
    return {
      settings,
      initiatives: ini.records.filter((r) => r.name || r.logo).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((r) => ({ id: r.id, name: r.name ?? '', logo: r.logo ?? '', link: r.link ?? '' })),
      heroSlides: hs.records.filter((h) => h.active && h.image).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((h) => ({
        id: h.id, title: h.title ?? '', subtitle: h.subtitle ?? '', image: h.image ?? '', buttonText: h.buttonText ?? '', link: h.link ?? '',
      })),
      sections: sec.records.filter((r) => r.visible).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((r) => ({ id: r.id, name: r.name ?? '', description: r.description ?? '' })),
      plans: settings.showSubscribe ? pl.records.filter((p) => p.active).sort((a, b) => (b.price ?? 0) - (a.price ?? 0)).map((p) => ({
        id: p.id, name: p.name ?? '', price: p.price ?? 0, durationMonths: p.durationMonths ?? 12,
        features: (p.features ?? '').split('\n').map((f) => f.trim()).filter(Boolean),
        premiumArticles: !!p.premiumArticles, pdfReading: !!p.pdfReading, hardCopy: !!p.hardCopy,
      })) : [],
      adPlans: ap.records.filter((p) => p.active).sort((a, b) => (periodOrder[a.period ?? ''] ?? 9) - (periodOrder[b.period ?? ''] ?? 9)).map((p) => ({
        id: p.id, name: p.name ?? '', mediaType: p.mediaType ?? 'Image', period: p.period ?? 'Month', price: p.price ?? 0, details: p.details ?? '',
      })),
      team: tm.records.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((m) => ({
        id: m.id, name: m.name ?? '', post: m.post ?? '', photo: m.photo ?? '', phone: m.phone ?? '', email: m.email ?? '',
        address: m.address ?? '', instagram: m.instagram ?? '', facebook: m.facebook ?? '', xLink: m.xLink ?? '', about: m.about ?? '',
      })),
      programs: settings.showPrograms ? pr.records.filter((p) => p.visible).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')).map((p) => ({
        id: p.id, title: p.title ?? '', image: p.image ?? '', fee: p.fee ?? '', description: p.description ?? '',
        eligibility: p.eligibility ?? '', mode: p.mode ?? '', registrationLink: p.registrationLink ?? '', date: p.date ?? '',
      })) : [],
      results: settings.showResults ? rs.records.filter((r) => r.visible).map((r) => ({
        id: r.id, studentName: r.studentName ?? '', program: progTitle.get(one(r.program) ?? '') ?? '', event: r.event ?? '',
        position: r.position ?? '', grade: r.grade ?? '', institution: r.institution ?? '', photo: r.photo ?? '',
      })) : [],
    };
  },
});
