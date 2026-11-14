import { useState } from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter, UserRound, Eye, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@project/components/ui/dialog';
import { Skeleton } from '@project/components/ui/skeleton';
import { useData } from '../lib/data';
import type { GetSiteOutputType } from 'zitejs/api';

type Member = GetSiteOutputType['team'][number];

function MemberCard({ m, onOpen }: { m: Member; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group relative aspect-[3/4] rounded-[1.75rem] overflow-hidden text-left shadow-lg">
      {m.photo ? <img src={m.photo} alt={m.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        : <div className="absolute inset-0 bg-muted grid place-items-center"><UserRound className="h-16 w-16 text-muted-foreground" /></div>}
      <div className="absolute inset-x-2 bottom-2 glass-strong rounded-2xl p-3">
        <p className="font-display font-bold leading-tight">{m.name}</p>
        <p className="text-xs text-muted-foreground">{m.post}</p>
      </div>
    </button>
  );
}

export default function About() {
  const { site } = useData();
  const [open, setOpen] = useState<Member | null>(null);
  if (!site) return <div className="container mx-auto px-4 py-10"><Skeleton className="h-64 rounded-3xl" /></div>;
  const s = site.settings;
  const links = open ? [
    open.email && { href: `mailto:${open.email}`, icon: Mail, label: open.email },
    open.phone && { href: `tel:${open.phone}`, icon: Phone, label: open.phone },
    open.instagram && { href: open.instagram, icon: Instagram, label: 'Instagram' },
    open.facebook && { href: open.facebook, icon: Facebook, label: 'Facebook' },
    open.xLink && { href: open.xLink, icon: Twitter, label: 'X' },
  ].filter(Boolean) as { href: string; icon: typeof Mail; label: string }[] : [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-14">
      <section className="text-center space-y-5 max-w-3xl mx-auto">
        <p className="kicker text-muted-foreground">Who we are</p>
        <h1 className="text-4xl md:text-6xl font-black">About Us</h1>
        <p className="font-serif text-lg md:text-xl leading-relaxed whitespace-pre-line">{s.aboutText}</p>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        {[{ t: 'Our Vision', b: s.vision, i: Eye }, { t: 'Our Mission', b: s.mission, i: Target }].map((x) => (
          <div key={x.t} className="glass-strong rounded-[2rem] p-8 space-y-3">
            <span className="h-12 w-12 rounded-2xl bg-accent text-accent-foreground grid place-items-center"><x.i className="h-6 w-6" /></span>
            <h2 className="text-3xl font-black">{x.t}</h2>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{x.b}</p>
          </div>
        ))}
      </section>
      {site.initiatives.length > 0 && (
        <section className="text-center space-y-6">
          <p className="kicker text-muted-foreground">An initiative of</p>
          <div className="flex flex-wrap justify-center gap-6">
            {site.initiatives.map((o) => {
              const inner = <>{o.logo && <img src={o.logo} alt={o.name} className="h-20 w-20 mx-auto object-contain" />}<p className="font-bold mt-3">{o.name}</p>{o.description && <p className="text-sm text-muted-foreground mt-1">{o.description}</p>}</>;
              const cls = "glass glass-hover rounded-3xl p-6 w-60 hover:-translate-y-1 transition-transform";
              return o.link ? <a key={o.id} href={o.link} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <div key={o.id} className={cls}>{inner}</div>;
            })}
          </div>
        </section>
      )}
      {s.teamPhoto && <figure><img src={s.teamPhoto} alt="EduMotive team" className="w-full rounded-[2rem] shadow-2xl object-cover max-h-[560px]" /><figcaption className="text-center text-sm text-muted-foreground mt-3">Team EduMotive</figcaption></figure>}
      {site.team.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">{site.team.map((m) => <MemberCard key={m.id} m={m} onOpen={() => setOpen(m)} />)}</div>
        </section>
      )}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="glass-strong max-w-lg p-0 overflow-hidden">
          {open && (<>
            {open.photo && <img src={open.photo} alt={open.name} className="w-full aspect-[4/3] object-cover" />}
            <div className="p-6 space-y-4">
              <DialogHeader><DialogTitle className="font-display text-3xl">{open.name}</DialogTitle><p className="kicker text-muted-foreground">{open.post}</p></DialogHeader>
              {open.about && <p className="text-sm leading-relaxed whitespace-pre-line">{open.about}</p>}
              <div className="flex flex-wrap gap-2">{links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="glass rounded-full px-3 py-1.5 text-sm flex items-center gap-1.5 hover:bg-accent hover:text-accent-foreground"><l.icon className="h-4 w-4" />{l.label}</a>)}</div>
            </div>
          </>)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
