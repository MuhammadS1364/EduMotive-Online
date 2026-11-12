import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@project/components/ui/input';
import { Button } from '@project/components/ui/button';
import { Skeleton } from '@project/components/ui/skeleton';
import { cn } from '@project/components/lib/utils';
import { useData } from '../lib/data';
import ArticleCard from '../components/ArticleCard';

const PAGE = 12;

export default function Articles() {
  const { catalog, site } = useData();
  const [params, setParams] = useSearchParams();
  const section = params.get('section') ?? '';
  const [q, setQ] = useState(params.get('q') ?? '');
  useEffect(() => { setQ(params.get('q') ?? ''); }, [params]);
  const [limit, setLimit] = useState(PAGE);
  const list = useMemo(() => (catalog?.articles ?? []).filter((a) =>
    (!section || a.section === section) &&
    (!q || `${a.title} ${a.excerpt} ${a.authorName}`.toLowerCase().includes(q.toLowerCase()))), [catalog, section, q]);
  const sections = site?.sections ?? [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="text-center space-y-3 mb-8">
        <p className="kicker text-muted-foreground">EduMotive</p>
        <h1 className="text-4xl md:text-6xl font-black">{section || 'Articles'}</h1>
        {section && <p className="text-muted-foreground max-w-xl mx-auto">{sections.find((s) => s.name === section)?.description}</p>}
      </div>
      <div className="glass-strong rounded-3xl p-3 md:p-4 mb-8 sticky top-[118px] md:top-[120px] z-20 space-y-3">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, authors…" className="pl-9 rounded-full bg-background/60" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar md:justify-center">
          {['', ...sections.map((s) => s.name)].map((n) => (
            <button key={n || 'all'} onClick={() => { setParams(n ? { section: n } : {}); setLimit(PAGE); }}
              className={cn('shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors', section === n ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5')}>
              {n || 'All'}
            </button>
          ))}
        </div>
      </div>
      {!catalog ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-80 rounded-3xl" />)}</div>
      ) : list.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">No articles found.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{list.slice(0, limit).map((a) => <ArticleCard key={a.id} a={a} />)}</div>
          {list.length > limit && <div className="text-center mt-10"><Button variant="outline" className="rounded-full" onClick={() => setLimit(limit + PAGE)}>Load more</Button></div>}
        </>
      )}
    </div>
  );
}
