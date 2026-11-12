import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';
import { cn } from '@project/components/lib/utils';
import type { GetCatalogOutputType } from 'zitejs/api';
import { fmtDate } from '../lib/data';

export type Card = GetCatalogOutputType['articles'][number];

export function SectionTag({ name }: { name: string }) {
  if (!name) return null;
  return <span className="kicker text-[10px] rounded-full bg-accent text-accent-foreground px-2.5 py-1">{name}</span>;
}

export default function ArticleCard({ a, variant = 'default' }: { a: Card; variant?: 'default' | 'hero' | 'row' }) {
  const img = a.mainImage || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200';
  if (variant === 'row') {
    return (
      <Link to={`/article/${a.slug}`} className="group flex gap-4 items-start">
        <img src={img} alt="" className="h-20 w-24 rounded-xl object-cover shrink-0" />
        <div className="min-w-0">
          <p className="kicker text-muted-foreground text-[10px]">{a.section}</p>
          <h4 className="font-display font-bold leading-snug line-clamp-2 group-hover:underline decoration-accent decoration-2 underline-offset-4">{a.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{a.authorName}</p>
        </div>
      </Link>
    );
  }
  const hero = variant === 'hero';
  return (
    <Link to={`/article/${a.slug}`} className={cn('group block rounded-3xl overflow-hidden glass glass-hover', hero && 'md:grid md:grid-cols-5')}>
      <div className={cn('relative overflow-hidden', hero ? 'aspect-[16/10] md:aspect-auto md:col-span-3' : 'aspect-[16/10]')}>
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {a.premium && <span className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[11px] font-bold flex items-center gap-1"><Crown className="h-3 w-3 text-accent" />Premium</span>}
      </div>
      <div className={cn('p-5 space-y-3', hero && 'md:col-span-2 md:p-8 md:flex md:flex-col md:justify-center')}>
        <SectionTag name={a.section} />
        <h3 className={cn('font-display font-bold leading-tight group-hover:underline decoration-accent decoration-2 underline-offset-4', hero ? 'text-2xl md:text-4xl' : 'text-xl')}>{a.title}</h3>
        {a.excerpt && <p className={cn('text-muted-foreground', hero ? 'line-clamp-4' : 'text-sm line-clamp-2')}>{a.excerpt}</p>}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
          {a.authorPhoto && <img src={a.authorPhoto} className="h-6 w-6 rounded-full object-cover" alt="" />}
          <span className="font-semibold text-foreground">{a.authorName}</span>
          <span>·</span><span>{fmtDate(a.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
