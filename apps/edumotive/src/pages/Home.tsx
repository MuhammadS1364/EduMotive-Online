import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Crown } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Skeleton } from '@project/components/ui/skeleton';
import { useData, fmtDate } from '../lib/data';
import ArticleCard from '../components/ArticleCard';
import HeroSlider from '../components/HeroSlider';
import { useState } from 'react';
import Reveal from '../components/Reveal';
import { useNews, NewsCard, NewsDialog, type NewsItem } from './News';
import { AuthorAvatar, TierPill, PenName } from '../components/AuthorBits';

function SectionHead({ title, to }: { title: string; to?: string }) {
  return (
    <Reveal className="flex items-end justify-between border-b-2 border-foreground pb-2 mb-6">
      <h2 className="text-2xl md:text-3xl font-black">{title}</h2>
      {to && <Link to={to} className="text-sm font-semibold flex items-center gap-1 hover:text-foreground/70">View all<ArrowRight className="h-4 w-4" /></Link>}
    </Reveal>
  );
}

export default function Home() {
  const { catalog, site } = useData();
  const news = useNews();
  const [open, setOpen] = useState<NewsItem | null>(null);
  if (!catalog) return <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3"><Skeleton className="h-96 md:col-span-2 rounded-3xl" /><Skeleton className="h-96 rounded-3xl" /></div>;
  const arts = catalog.articles;
  const hero = arts.find((a) => a.featured) ?? arts[0];
  const rest = arts.filter((a) => a.id !== hero?.id);
  const issue = catalog.issues[0];
  const sections = site?.sections ?? [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-16 max-w-7xl">
      <HeroSlider slides={site?.heroSlides ?? []} />
      {hero ? (
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"><ArticleCard a={hero} variant="hero" /></div>
          <div className="glass glass-hover rounded-3xl p-6">
            <p className="kicker text-muted-foreground mb-4">Latest</p>
            <div className="space-y-5">{rest.slice(0, 4).map((a) => <ArticleCard key={a.id} a={a} variant="row" />)}</div>
          </div>
        </section>
      ) : (
        <div className="glass glass-hover rounded-3xl p-12 text-center"><h2 className="text-3xl font-bold">Stories are on their way</h2><p className="text-muted-foreground mt-2">The first articles will appear here once published.</p></div>
      )}

      <section className="flex gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center">
        {sections.map((s) => <Link key={s.id} to={`/articles?section=${encodeURIComponent(s.name)}`} className="shrink-0 glass rounded-full px-5 py-2 font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-colors">{s.name}</Link>)}
      </section>

      {rest.length > 4 && (
        <section><SectionHead title="Top Stories" to="/articles" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{rest.slice(4, 10).map((a) => <ArticleCard key={a.id} a={a} />)}</div>
        </section>
      )}

      {sections.slice(0, 4).map((s) => {
        const list = arts.filter((a) => a.section === s.name).slice(0, 3);
        if (!list.length) return null;
        return <section key={s.id}><SectionHead title={s.name} to={`/articles?section=${encodeURIComponent(s.name)}`} /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{list.map((a) => <ArticleCard key={a.id} a={a} />)}</div></section>;
      })}

      {catalog.authors.length > 0 && (
        <section><SectionHead title="Our Authors" to="/authors" />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {catalog.authors.slice(0, 12).map((a) => (
              <Link key={a.id} to={`/authors/${a.id}`} className="glass glass-hover rounded-3xl p-5 w-44 shrink-0 text-center space-y-2 hover:-translate-y-1 transition-transform">
                <div className="flex justify-center"><AuthorAvatar a={a} size={84} /></div>
                <p className="font-bold leading-tight">{a.name}</p><PenName a={a} className="text-xs" /><TierPill tier={a.tier} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {issue && (
        <Reveal><section className="glass-strong rounded-[2rem] p-6 md:p-10 grid md:grid-cols-[240px_1fr] gap-8 items-center">
          <img src={issue.cover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600'} alt={issue.title} className="w-48 md:w-full mx-auto rounded-xl shadow-2xl rotate-[-2deg]" />
          <div className="space-y-4">
            <p className="kicker text-muted-foreground">Current Issue · {fmtDate(issue.issueDate)}</p>
            <h2 className="text-3xl md:text-5xl font-black">{issue.title}</h2>
            {issue.description && <p className="text-muted-foreground max-w-2xl">{issue.description}</p>}
            <div className="flex gap-3 flex-wrap">
              <Button asChild size="lg" className="rounded-full"><Link to={`/magazine/${issue.id}`}><BookOpen className="h-4 w-4 mr-2" />Read issue</Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full"><Link to="/magazine">All issues</Link></Button>
            </div>
          </div>
        </section></Reveal>
      )}

      {news && news.length > 0 && (
        <section><SectionHead title="News & Updates" to="/news" />
          <div className="grid gap-6 md:grid-cols-3">{news.slice(0, 3).map((n, i) => <NewsCard key={n.id} n={n} i={i} onOpen={() => setOpen(n)} />)}</div>
          <NewsDialog n={open} onClose={() => setOpen(null)} />
        </section>
      )}

      {site?.settings.showSubscribe && (
        <section className="rounded-[2rem] bg-primary text-primary-foreground p-8 md:p-14 text-center space-y-4">
          <Crown className="h-10 w-10 mx-auto text-accent" />
          <h2 className="text-3xl md:text-5xl font-black">Get EduMotive at your doorstep</h2>
          <p className="opacity-80 max-w-xl mx-auto">Printed magazine, premium articles and full digital issues — plans from ₹{Math.min(...(site.plans.map((p) => p.price).concat([300])))}.</p>
          <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/subscribe">Subscribe now</Link></Button>
        </section>
      )}
    </div>
  );
}
