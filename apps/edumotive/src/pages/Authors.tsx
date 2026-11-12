import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, Instagram, Search } from 'lucide-react';
import { Input } from '@project/components/ui/input';
import { Skeleton } from '@project/components/ui/skeleton';
import { useData } from '../lib/data';
import { AuthorAvatar, BadgeIcons, TierPill, PenName } from '../components/AuthorBits';
import ArticleCard from '../components/ArticleCard';

export function AuthorsList() {
  const { catalog } = useData();
  const [q, setQ] = useState('');
  const list = (catalog?.authors ?? []).filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-8 space-y-3"><p className="kicker text-muted-foreground">The voices of EduMotive</p><h1 className="text-4xl md:text-6xl font-black">Authors</h1></div>
      <div className="relative max-w-md mx-auto mb-8"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search authors" className="pl-9 rounded-full" /></div>
      {!catalog ? <Skeleton className="h-64 rounded-3xl" /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((a) => (
            <Link key={a.id} to={`/authors/${a.id}`} className="glass glass-hover rounded-3xl p-5 text-center space-y-3 hover:-translate-y-1 transition-transform">
              <div className="flex justify-center"><AuthorAvatar a={a} size={96} /></div>
              <div><p className="font-display text-lg font-bold leading-tight">{a.name}</p><PenName a={a} /><p className="text-xs text-muted-foreground">{a.post}</p></div>
              <div className="flex justify-center gap-2 items-center"><TierPill tier={a.tier} /><span className="text-xs text-muted-foreground">{a.count} articles</span></div>
              <BadgeIcons badges={a.badges} className="justify-center" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AuthorProfile() {
  const { id } = useParams();
  const { catalog } = useData();
  const a = catalog?.authors.find((x) => x.id === id);
  if (!catalog) return <div className="container mx-auto px-4 py-10"><Skeleton className="h-64 rounded-3xl" /></div>;
  if (!a) return <p className="text-center py-24">Author not found.</p>;
  const arts = catalog.articles.filter((x) => x.authorId === a.id);
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-10">
      <section className="glass-strong rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <AuthorAvatar a={a} size={150} />
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start"><h1 className="text-3xl md:text-5xl font-black" style={a.tier ? { color: a.tier.color } : undefined}>{a.name}</h1><TierPill tier={a.tier} /></div><PenName a={a} className="text-lg" />
          <p className="text-muted-foreground">{[a.post, a.institution].filter(Boolean).join(' · ')}</p>
          {a.bio && <p className="font-serif text-lg max-w-2xl">{a.bio}</p>}
          <BadgeIcons badges={a.badges} className="justify-center md:justify-start" />
          <div className="flex gap-4 justify-center md:justify-start text-sm">
            {a.email && <a href={`mailto:${a.email}`} className="flex items-center gap-1 hover:underline"><Mail className="h-4 w-4" />Email</a>}
            {a.instagram && <a href={a.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><Instagram className="h-4 w-4" />Instagram</a>}
          </div>
        </div>
        <div className="glass glass-hover rounded-2xl px-6 py-4 text-center"><p className="text-4xl font-black font-display">{a.count}</p><p className="kicker text-muted-foreground">Published</p></div>
      </section>
      <section><h2 className="text-2xl font-black border-b-2 border-foreground pb-2 mb-6">Articles by {a.name}</h2>
        {arts.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{arts.map((x) => <ArticleCard key={x.id} a={x} />)}</div> : <p className="text-muted-foreground">No articles yet.</p>}
      </section>
    </div>
  );
}
