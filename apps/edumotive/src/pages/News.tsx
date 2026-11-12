import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CalendarDays } from 'lucide-react';
import { Input } from '@project/components/ui/input';
import { Skeleton } from '@project/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@project/components/ui/dialog';
import { getNews, type GetNewsOutputType } from 'zitejs/api';
import { cn } from '@project/components/lib/utils';
import Reveal from '../components/Reveal';

export type NewsItem = GetNewsOutputType['news'][number];
const FALLBACK = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200';

export const fmtNewsDate = (d: string) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export function useNews() {
  const [news, setNews] = useState<NewsItem[] | null>(null);
  useEffect(() => { getNews({}).then((r) => setNews(r.news)).catch(() => setNews([])); }, []);
  return news;
}

export function NewsCard({ n, big, onOpen, i = 0 }: { n: NewsItem; big?: boolean; onOpen: () => void; i?: number }) {
  return (
    <motion.button onClick={onOpen} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08 }} whileHover={{ y: -4 }}
      className={cn('group text-left overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-shadow', big && 'md:col-span-2 md:grid md:grid-cols-2')}>
      <div className="aspect-video overflow-hidden"><img src={n.image || FALLBACK} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
      <div className="p-5 space-y-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{fmtNewsDate(n.date)}</span>
        <h3 className={cn('font-bold group-hover:text-primary transition-colors', big ? 'text-2xl' : 'text-lg')}>{n.title}</h3>
        {n.summary && <p className="text-sm text-muted-foreground line-clamp-3">{n.summary}</p>}
      </div>
    </motion.button>
  );
}

export function NewsDialog({ n, onClose }: { n: NewsItem | null; onClose: () => void }) {
  return (
    <Dialog open={!!n} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {n && <>
          {n.image && <img src={n.image} alt="" className="w-full aspect-video object-cover rounded-xl" />}
          <DialogHeader><p className="text-xs font-semibold text-muted-foreground">{fmtNewsDate(n.date)}</p><DialogTitle className="text-2xl">{n.title}</DialogTitle></DialogHeader>
          <p className="whitespace-pre-line text-foreground/85 leading-relaxed">{n.body || n.summary}</p>
        </>}
      </DialogContent>
    </Dialog>
  );
}

export default function News() {
  const news = useNews();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<NewsItem | null>(null);
  const list = useMemo(() => (news ?? []).filter((n) => `${n.title} ${n.summary}`.toLowerCase().includes(q.toLowerCase())), [news, q]);
  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-6 py-10 space-y-8">
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Latest</p><h1 className="text-4xl font-bold">News &amp; Updates</h1></div>
        <div className="relative md:w-72"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search updates" className="pl-9" /></div>
      </Reveal>
      {!news ? <div className="grid gap-6 md:grid-cols-3"><Skeleton className="h-72 md:col-span-2 rounded-2xl" /><Skeleton className="h-72 rounded-2xl" /></div>
        : list.length === 0 ? <p className="py-16 text-center text-muted-foreground">No updates found.</p>
        : <div className="grid gap-6 md:grid-cols-3">{list.map((n, i) => <NewsCard key={n.id} n={n} i={i} big={i === 0 && !q} onOpen={() => setOpen(n)} />)}</div>}
      <NewsDialog n={open} onClose={() => setOpen(null)} />
    </div>
  );
}
