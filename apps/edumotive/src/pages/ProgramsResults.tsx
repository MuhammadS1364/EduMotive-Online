import { ExternalLink, Trophy, Medal } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { Skeleton } from '@project/components/ui/skeleton';
import { useState } from 'react';
import { cn } from '@project/components/lib/utils';
import { useData, fmtDate } from '../lib/data';

export function Programs() {
  const { site } = useData();
  if (!site) return <div className="container mx-auto px-4 py-10"><Skeleton className="h-64 rounded-3xl" /></div>;
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-10 space-y-3"><p className="kicker text-muted-foreground">Learn · Compete · Grow</p><h1 className="text-4xl md:text-6xl font-black">Programs</h1></div>
      {!site.programs.length ? <p className="text-center text-muted-foreground">No programs open right now.</p> : (
        <div className="grid md:grid-cols-2 gap-6">
          {site.programs.map((p) => (
            <article key={p.id} className="glass glass-hover rounded-3xl overflow-hidden flex flex-col">
              {p.image && <img src={p.image} alt={p.title} className="aspect-[16/9] w-full object-cover" />}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex gap-2 flex-wrap">
                  {p.mode && <span className="kicker text-[10px] rounded-full bg-accent text-accent-foreground px-2.5 py-1">{p.mode}</span>}
                  {p.date && <span className="text-xs text-muted-foreground">{fmtDate(p.date)}</span>}
                </div>
                <h2 className="text-2xl font-bold">{p.title}</h2>
                <p className="text-muted-foreground whitespace-pre-line">{p.description}</p>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div className="glass glass-hover rounded-xl p-3"><dt className="kicker text-muted-foreground text-[10px]">Fee</dt><dd className="font-bold">{p.fee || 'Free'}</dd></div>
                  <div className="glass glass-hover rounded-xl p-3"><dt className="kicker text-muted-foreground text-[10px]">Eligibility</dt><dd className="font-semibold line-clamp-3">{p.eligibility || 'Open to all'}</dd></div>
                </dl>
                <div className="mt-auto pt-2">{p.registrationLink && <Button asChild className="rounded-full w-full"><a href={p.registrationLink} target="_blank" rel="noreferrer">Register now<ExternalLink className="h-4 w-4 ml-1" /></a></Button>}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

const medal: Record<string, string> = { '1st': '#FFD369', '2nd': '#C0C0C0', '3rd': '#CD7F32' };

export function Results() {
  const { site } = useData();
  const [prog, setProg] = useState('');
  if (!site) return <div className="container mx-auto px-4 py-10"><Skeleton className="h-64 rounded-3xl" /></div>;
  const programs = [...new Set(site.results.map((r) => r.program).filter(Boolean))];
  const list = site.results.filter((r) => !prog || r.program === prog);
  const order = (p: string) => ({ '1st': 1, '2nd': 2, '3rd': 3 } as Record<string, number>)[p] ?? 9;
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-8 space-y-3"><p className="kicker text-muted-foreground">Celebrating excellence</p><h1 className="text-4xl md:text-6xl font-black">Results</h1></div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar md:justify-center mb-8">
        {['', ...programs].map((p) => <button key={p || 'all'} onClick={() => setProg(p)} className={cn('shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold', prog === p ? 'bg-primary text-primary-foreground' : 'glass')}>{p || 'All programs'}</button>)}
      </div>
      {!list.length ? <p className="text-center text-muted-foreground">Results will be announced soon.</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...list].sort((a, b) => order(a.position) - order(b.position)).map((r) => (
            <div key={r.id} className="glass glass-hover rounded-3xl p-5 flex gap-4 items-center">
              <div className="h-16 w-16 rounded-2xl overflow-hidden bg-muted shrink-0 grid place-items-center">{r.photo ? <img src={r.photo} alt="" className="h-full w-full object-cover" /> : <Trophy className="h-7 w-7 text-muted-foreground" />}</div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-lg leading-tight">{r.studentName}</p>
                <p className="text-xs text-muted-foreground truncate">{[r.event || r.program, r.institution].filter(Boolean).join(' · ')}</p>
                <div className="flex gap-2 mt-2">
                  {r.position && r.position !== 'None' && <span className="text-xs font-bold rounded-full px-2.5 py-0.5 flex items-center gap-1 text-[#222831]" style={{ background: medal[r.position] }}><Medal className="h-3 w-3" />{r.position}</span>}
                  {r.grade && r.grade !== 'None' && <span className="text-xs font-bold rounded-full px-2.5 py-0.5 bg-primary text-primary-foreground">{r.grade} Grade</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
