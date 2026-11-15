import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { Lock, LogOut, Menu, Sun, Moon, Monitor, ExternalLink } from 'lucide-react';
import { Toaster } from '@project/components/ui/sonner';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Label } from '@project/components/ui/label';
import { Sheet, SheetContent } from '@project/components/ui/sheet';
import { cn } from '@project/components/lib/utils';
import { RESOURCES, NAV } from './config';
import ResourcePage from './components/ResourcePage';
import Dashboard from './pages/Dashboard';
import SettingsPage from './pages/Settings';
import Planner from './pages/Planner';
import { applyTheme, getTheme, setTheme, watchSystemTheme, type ThemeMode } from './lib/theme';

import { adminLogin } from 'zitejs/api';
import { SESSION_KEY } from './lib/session';

function Login({ onOk }: { onOk: () => void }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try { const r = await adminLogin({ email, password: code }); sessionStorage.setItem(SESSION_KEY, r.key); onOk(); }
    catch { setErr('Incorrect email or password'); } finally { setBusy(false); }
  };
  return (
    <div className="min-h-screen grid place-items-center p-4 bg-primary">
      <form onSubmit={submit} className="glass-strong rounded-[2rem] p-8 w-full max-w-sm space-y-5">
        <div className="text-center space-y-2">
          <span className="font-display text-4xl font-black">Edu<span className="text-accent">Motive</span></span>
          <p className="kicker text-muted-foreground flex items-center justify-center gap-1"><Lock className="h-3 w-3" />Admin panel</p>
        </div>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(''); }} autoFocus placeholder="you@example.com" /></div>
        <div className="space-y-1.5"><Label>Password</Label><Input type="password" value={code} onChange={(e) => { setCode(e.target.value); setErr(''); }} placeholder="Password" /></div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="submit" className="w-full" disabled={!email || !code || busy}>Sign in</Button>
        <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => { setEmail('edumotive4@gmail.com'); setCode('edu4motive@tri'); setErr(''); }}>
          Use editorial admin account
        </Button>
      </form>
    </div>
  );
}

function SideNav({ onPick, onLogout }: { onPick?: () => void; onLogout: () => void }) {
  const [mode, setMode] = useState<ThemeMode>(getTheme());
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5"><span className="font-display text-3xl font-black">Edu<span className="text-accent">Motive</span></span><p className="kicker text-muted-foreground text-[10px]">Admin</p></div>
      <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {NAV.map((n) => (
          <NavLink key={n.path} to={`/${n.path}`} end onClick={onPick} className={({ isActive }) => cn('flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors', isActive ? 'bg-primary text-primary-foreground' : 'text-foreground/75 hover:bg-foreground/5')}>
            <n.icon className="h-4 w-4" />{n.title}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 space-y-2 border-t">
        <div className="grid grid-cols-3 gap-1">
          {([['light', Sun], ['dark', Moon], ['system', Monitor]] as const).map(([v, I]) => (
            <button key={v} onClick={() => { setTheme(v); setMode(v); }} className={cn('rounded-lg py-1.5 grid place-items-center', mode === v ? 'bg-accent text-accent-foreground' : 'hover:bg-foreground/5')} aria-label={v}><I className="h-4 w-4" /></button>
          ))}
        </div>
        <a
          href={import.meta.env.VITE_PUBLIC_SITE_URL || '/'}
          target={import.meta.env.VITE_PUBLIC_SITE_URL ? '_blank' : undefined}
          rel={import.meta.env.VITE_PUBLIC_SITE_URL ? 'noreferrer' : undefined}
          className="flex items-center justify-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold hover:bg-foreground/5 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />View website
        </a>
        <Button variant="outline" size="sm" className="w-full" onClick={onLogout}><LogOut className="h-4 w-4 mr-1" />Log out</Button>
      </div>
    </div>
  );
}

function Shell({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen glass rounded-none border-y-0 border-l-0"><SideNav onLogout={onLogout} /></aside>
      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-30 glass-strong rounded-none border-x-0 border-t-0 flex items-center gap-3 px-4 py-3">
          <Button size="icon" variant="ghost" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></Button>
          <span className="font-display text-xl font-black">Edu<span className="text-accent">Motive</span> Admin</span>
        </header>
        <main className="p-4 md:p-8 max-w-7xl mx-auto"><Outlet /></main>
      </div>
      <Sheet open={open} onOpenChange={setOpen}><SheetContent side="left" className="p-0 w-72 glass-strong"><SideNav onPick={() => setOpen(false)} onLogout={onLogout} /></SheetContent></Sheet>
      <Toaster />
    </div>
  );
}

export default function App() {
  const [ok, setOk] = useState(() => !!sessionStorage.getItem(SESSION_KEY));
  useEffect(() => { applyTheme(); return watchSystemTheme(); }, []);
  if (!ok) return <Login onOk={() => setOk(true)} />;
  const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route element={<Shell onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setOk(false); }} />}>
          <Route path="/" element={<Dashboard />} />
          {RESOURCES.map((r) => <Route key={r.path} path={`/${r.path}`} element={<ResourcePage r={r} />} />)}
          <Route path="/planner" element={<Planner />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
