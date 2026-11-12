import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Twitter, Phone, MapPin, UserPlus, PenSquare } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { useData } from '../lib/data';
import { useSocials } from '../lib/socials';

export default function Contact() {
  const { site } = useData();
  const so = useSocials();
  const rows = [
    { href: `mailto:${so.email}`, icon: Mail, t: so.email },
    ...so.phones.map((p) => ({ href: `tel:${p.replace(/\s/g, '')}`, icon: Phone, t: p })),
    { href: so.instagram, icon: Instagram, t: `Instagram · ${so.igHandle}` },
    { href: so.facebook, icon: Facebook, t: 'Facebook · EduMotive Trimonthly' },
    { href: so.x, icon: Twitter, t: 'X · EduMotive Trimonthly' },
  ];
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold">Join us &amp; Contact</h1>
        <p className="text-muted-foreground">Write for EduMotive, or just say hello.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-strong rounded-[2rem] p-8 space-y-4">
          <UserPlus className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold">Join as student or author</h2>
          <p className="text-muted-foreground">Create your profile with your class and institution, then submit essays, poems and reports for the editors to publish.</p>
          <div className="flex gap-2 flex-wrap">
            <Button asChild className="rounded-full"><Link to="/profile">Join now</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/write"><PenSquare className="h-4 w-4" />Submit work</Link></Button>
          </div>
        </div>
        <div className="glass-strong rounded-[2rem] p-8 space-y-3">
          <h2 className="text-2xl font-bold">Reach us</h2>
          {rows.map((r) => (
            <a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border bg-background/50 p-3 hover:border-primary transition-colors">
              <span className="h-9 w-9 shrink-0 rounded-full bg-accent text-accent-foreground grid place-items-center"><r.icon className="h-4 w-4" /></span>
              <span className="font-medium break-all">{r.t}</span>
            </a>
          ))}
          <p className="flex items-start gap-3 p-3 text-sm text-muted-foreground"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{site?.settings.address}</p>
        </div>
      </div>
    </div>
  );
}
