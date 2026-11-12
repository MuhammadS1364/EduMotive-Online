import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Skeleton } from '@project/components/ui/skeleton';
import { useData, fmtDate } from '../lib/data';
import Flipbook from '../components/Flipbook';
import ArticleCard from '../components/ArticleCard';

const COVER = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600';

export default function Magazine() {
  const { id } = useParams();
  const { catalog, site, me } = useData();
  const readerRef = useRef<HTMLDivElement>(null);
  if (!catalog || !site) return <div className="container mx-auto px-4 py-10"><Skeleton className="h-[500px] rounded-3xl" /></div>;
  const issues = catalog.issues;
  if (!issues.length) return <div className="container mx-auto px-4 py-24 text-center"><h1 className="text-4xl font-black">Magazine</h1><p className="text-muted-foreground mt-3">No issues published yet.</p></div>;
  const idx = Math.max(0, id ? issues.findIndex((i) => i.id === id) : 0);
  const issue = issues[idx];
  const newer = issues[idx - 1];
  const older = issues[idx + 1];
  const inIssue = catalog.articles.filter((a) => a.issueId === issue.id);
  const subsOn = site.settings.showSubscribe;
  const canReadAll = !subsOn || !!me?.access.pdfReading;
  const toReader = () => readerRef.current?.scrollIntoView({ behavior: 'smooth' });
  const navCls = 'flex items-center gap-1.5';

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-10">
      <Button asChild variant="ghost" size="sm"><Link to="/magazine"><ArrowLeft className="h-4 w-4" />All issues</Link></Button>
      <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
        <aside className="glass-strong rounded-[2rem] p-6 space-y-5 lg:sticky lg:top-28">
          <button onClick={toReader} className="group block w-full overflow-hidden rounded-lg shadow-2xl">
            <img src={issue.cover || COVER} alt={issue.title} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
          <div className="flex items-center justify-between gap-3">
            <button onClick={toReader} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary"><BookOpen className="h-4 w-4" />Read e-magazine</button>
            {subsOn && <Button asChild size="sm" className="rounded-md"><Link to="/subscribe">Subscribe</Link></Button>}
          </div>
          <div className="flex items-center gap-5 border-t pt-4 text-sm">
            <span className="font-semibold">{[issue.volume, fmtDate(issue.issueDate)].filter(Boolean).join(' · ')}</span>
            <span className="font-bold uppercase tracking-wider text-primary">{inIssue.length} stories</span>
          </div>
        </aside>
        <section className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 pb-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">{issue.title}</p>
              <h1 className="text-4xl md:text-5xl font-black text-primary underline decoration-2 underline-offset-8">In this issue</h1>
            </div>
            <div className="flex gap-4 text-sm font-bold uppercase tracking-wider">
              {older ? <Link to={`/magazine/${older.id}`} className={`${navCls} hover:text-primary`}><ArrowLeft className="h-4 w-4" />Previous issue</Link> : <span className={`${navCls} text-muted-foreground/50`}><ArrowLeft className="h-4 w-4" />Previous issue</span>}
              {newer ? <Link to={`/magazine/${newer.id}`} className={`${navCls} hover:text-primary`}>Next issue<ArrowRight className="h-4 w-4" /></Link> : <span className={`${navCls} text-muted-foreground/50`}>Next issue<ArrowRight className="h-4 w-4" /></span>}
            </div>
          </div>
          {issue.description && <p className="text-muted-foreground">{issue.description}</p>}
          {inIssue.length ? <div className="glass rounded-3xl p-5 space-y-5">{inIssue.map((a) => <ArticleCard key={a.id} a={a} variant="row" />)}</div>
            : <p className="glass rounded-3xl p-8 text-center text-muted-foreground">Stories from this issue will be listed here soon.</p>}
        </section>
      </div>
      <div ref={readerRef} className="scroll-mt-28">
        {issue.pdf ? (
          <section className="glass-strong rounded-[2rem] p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2"><BookOpen className="h-6 w-6" />Read the e-magazine</h2>
            <Flipbook key={issue.id} url={issue.pdf} freePages={site.settings.freePdfPages ?? 3} canReadAll={canReadAll} />
          </section>
        ) : <p className="text-center text-muted-foreground">The digital edition for this issue is coming soon.</p>}
      </div>
      <section>
        <h2 className="text-2xl md:text-3xl font-black border-b-2 border-foreground pb-2 mb-6">All issues</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {issues.map((i) => (
            <Link key={i.id} to={`/magazine/${i.id}`} className={`group space-y-2 ${i.id === issue.id ? '' : 'opacity-85'}`}>
              <img src={i.cover || COVER} alt={i.title} className="aspect-[3/4] w-full object-cover rounded-xl shadow-lg group-hover:-translate-y-1 transition-transform" />
              <p className="font-bold text-sm leading-tight">{i.title}</p><p className="text-xs text-muted-foreground">{fmtDate(i.issueDate)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
