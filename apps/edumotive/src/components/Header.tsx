import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, loginWithRedirect } from 'zitejs/auth';
import { UserRound, PenLine, Search } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import { cn } from '@project/components/lib/utils';
import Logo from './Logo';
import { useData } from '../lib/data';

export function useNavItems() {
  const { site } = useData();
  const s = site?.settings;
  return [
    { to: '/', label: 'Home' },
    { to: '/articles', label: 'Articles' },
    { to: '/magazine', label: 'Magazine' },
    { to: '/authors', label: 'Authors' },
    ...(s?.showPrograms ? [{ to: '/programs', label: 'Programs' }] : []),
    ...(s?.showResults ? [{ to: '/results', label: 'Results' }] : []),
    ...(s?.showSubscribe ? [{ to: '/subscribe', label: 'Subscribe' }] : []),
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Join & Contact' },
  ];
}

function SearchBox({ className }: { className?: string }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  return (
    <form onSubmit={(e) => { e.preventDefault(); nav(`/articles?q=${encodeURIComponent(q)}`); }}
      className={cn('items-center gap-2 rounded-full border bg-background/50 px-3 h-10', className)}>
      <Search className="h-4 w-4 text-muted-foreground" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="bg-transparent outline-none text-sm flex-1 min-w-0" />
    </form>
  );
}

export default function Header() {
  const items = useNavItems();
  const { user } = useAuth();
  const { me, site } = useData();
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace(/ (\d{4})$/, ', $1');
  const navCls = 'snap-start whitespace-nowrap px-3 py-2.5 text-[12.5px] font-bold uppercase tracking-wider border-b-2 transition-colors';

  return (
    <>
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="container mx-auto px-4 h-8 flex items-center justify-between gap-3">
          <span>{today}</span>
          <span className="hidden sm:inline opacity-80 italic">{site?.settings.motto || 'Empowering Minds, Shaping Future'}</span>
        </div>
      </div>
      <header className="glass-strong rounded-none border-x-0 border-t-0 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Logo />
          <SearchBox className="ml-auto hidden md:flex w-64" />
          <div className="ml-auto md:ml-0 flex items-center gap-2">
            {user && <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex rounded-full"><Link to="/write"><PenLine className="h-4 w-4 mr-1" />Write</Link></Button>}
            {user ? (
              <Link to="/profile" className="h-9 w-9 rounded-full overflow-hidden border-2 border-accent grid place-items-center bg-muted">
                {me?.profile?.avatar ? <img src={me.profile.avatar} className="h-full w-full object-cover" alt="" /> : <UserRound className="h-4 w-4" />}
              </Link>
            ) : (
              <Button size="sm" className="h-8 px-3 text-xs rounded-full font-semibold" onClick={() => loginWithRedirect()}>Sign in</Button>
            )}
          </div>
        </div>
        <nav className="border-t border-border/60">
          <div className="container mx-auto px-2 flex items-center gap-1 overflow-x-auto no-scrollbar snap-x lg:justify-center">
            {items.map((i) => (
              <NavLink key={i.to} to={i.to} end={i.to === '/'} className={({ isActive }) => cn(navCls, isActive ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>{i.label}</NavLink>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
