import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Twitter, Phone, MapPin } from 'lucide-react';
import { LogoImg } from './Logo';
import { useData } from '../lib/data';
import { useSocials } from '../lib/socials';

const H = ({ children }: { children: string }) => <h4 className="text-xs uppercase tracking-widest text-accent mb-3 font-bold">{children}</h4>;

export default function Footer() {
  const { site } = useData();
  const s = site?.settings;
  const so = useSocials();
  const email = so.email;
  const insta = so.instagram;
  const handle = so.igHandle;
  const socials = [
    { href: `mailto:${email}`, icon: Mail, t: email },
    { href: insta, icon: Instagram, t: 'Instagram' },
    { href: so.facebook, icon: Facebook, t: 'Facebook' },
    { href: so.x, icon: Twitter, t: 'X' },
  ];
  const links = [
    { to: '/about', l: 'About us' }, { to: '/articles', l: 'Articles' }, { to: '/authors', l: 'Authors' },
    { to: '/magazine', l: 'Magazine' }, { to: '/contact', l: 'Join us' }, { to: '/write', l: 'Submit work' },
    { to: '/advertise', l: 'Advertise' },
  ];
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4 text-center md:text-left">
        <div>
          <LogoImg onDark className="h-12" />
          <p className="mt-3 text-sm opacity-75 max-w-xs mx-auto md:mx-0">Stories, essays and ideas from the students and scholars of Darul Huda Islamic University.</p>
          <div className="flex gap-2 mt-4 justify-center md:justify-start">
            {socials.map((x) => <a key={x.t} href={x.href} target="_blank" rel="noreferrer" title={x.t} className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"><x.icon className="h-4 w-4" /></a>)}
          </div>
        </div>
        <div>
          <H>Sections</H>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {(site?.sections ?? []).map((x) => <li key={x.id}><Link to={`/articles?section=${encodeURIComponent(x.name)}`} className="hover:text-accent">{x.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <H>EduMotive</H>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {links.map((x) => <li key={x.to + x.l}><Link to={x.to} className="hover:text-accent">{x.l}</Link></li>)}
            <li><a href="/admin/" className="hover:text-accent">Admin panel</a></li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <H>Contact</H>
          <a href={`mailto:${email}`} className="flex gap-2 justify-center md:justify-start hover:text-accent"><Mail className="h-4 w-4 mt-0.5 shrink-0" />{email}</a>
          <a href={insta} target="_blank" rel="noreferrer" className="flex gap-2 justify-center md:justify-start hover:text-accent"><Instagram className="h-4 w-4 mt-0.5 shrink-0" />{handle}</a>
          {so.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex gap-2 justify-center md:justify-start hover:text-accent"><Phone className="h-4 w-4 mt-0.5 shrink-0" />{p}</a>)}
          <p className="flex gap-2 justify-center md:justify-start opacity-85"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{s?.address || 'Darul Huda Islamic University, Chemmad, Kerala, India'}</p>
        </div>
      </div>
      <div className="border-t border-white/10 text-xs opacity-60 text-center py-4">© {new Date().getFullYear()} EduMotive Magazine. {s?.motto || 'Empowering Minds, Shaping Future'}.</div>
    </footer>
  );
}
