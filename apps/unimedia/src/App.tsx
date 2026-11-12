import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, UserRound, BookOpen } from 'lucide-react';
import { useAuth, loginWithRedirect } from 'zitejs/auth';
import { Toaster } from '@project/components/ui/sonner';
import { Button } from '@project/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@project/components/ui/dialog';
import { cn } from '@project/components/lib/utils';
import { MeProvider, useMe } from './lib/me';
import { applyTheme, watchSystemTheme } from './lib/theme';
import Feed from './pages/Feed';
import UserProfile from './pages/UserProfile';
import Composer from './components/Composer';
import ProfileForm from './components/ProfileForm';
import Avatar from './components/Avatar';

const EDUMOTIVE = 'https://edumotiveonline.zite.so/';

function Shell() {
  const { user } = useAuth();
  const { me } = useMe();
  const nav = useNavigate();
  const [compose, setCompose] = useState<'post' | 'story' | null>(null);
  const [version, setVersion] = useState(0);
  const openCompose = (k: 'post' | 'story') => {
    if (!user) return loginWithRedirect();
    if (!me?.profile) return;
    setCompose(k);
  };
  const needsProfile = !!user && !!me && !me.profile;

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <header className="sticky top-0 z-30 glass-strong rounded-none border-x-0 border-t-0">
        <div className="container mx-auto max-w-5xl px-4 h-[68px] flex items-center gap-3">
          <Link to="/" className="font-display text-3xl md:text-4xl font-black tracking-tight">Uni<span className="text-accent [text-shadow:0_1px_0_hsl(var(--foreground)/0.3)]">Media</span></Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex"><a href={EDUMOTIVE} target="_blank" rel="noreferrer"><BookOpen className="h-4 w-4 mr-1" />EduMotive</a></Button>
            <Button size="sm" className="hidden md:inline-flex rounded-full" onClick={() => openCompose('post')}><PlusSquare className="h-4 w-4 mr-1" />Create</Button>
            {user ? <button onClick={() => nav(`/u/${user.id}`)} aria-label="Profile"><Avatar src={me?.profile?.avatar} size={38} ring /></button>
              : <Button size="sm" variant="outline" className="rounded-full" onClick={() => loginWithRedirect()}>Sign in</Button>}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Feed version={version} onCompose={openCompose} />} />
          <Route path="/u/:userId" element={<UserProfile version={version} />} />
          <Route path="*" element={<Feed version={version} onCompose={openCompose} />} />
        </Routes>
      </main>
      <footer className="text-center text-xs text-muted-foreground py-6">
        UniMedia · Powered by <a href={EDUMOTIVE} target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:underline">EduMotive</a>
      </footer>
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-30 glass-strong rounded-2xl grid grid-cols-4 py-2">
        <NavLink to="/" end className={({ isActive }) => cn('grid place-items-center py-1', isActive && 'text-accent')}><Home className="h-6 w-6" /></NavLink>
        <button onClick={() => openCompose('post')} className="grid place-items-center py-1" aria-label="Create"><PlusSquare className="h-6 w-6" /></button>
        <a href={EDUMOTIVE} target="_blank" rel="noreferrer" className="grid place-items-center py-1" aria-label="EduMotive"><BookOpen className="h-6 w-6" /></a>
        <button onClick={() => (user ? nav(`/u/${user.id}`) : loginWithRedirect())} className="grid place-items-center py-1" aria-label="Profile"><UserRound className="h-6 w-6" /></button>
      </nav>
      <Composer open={!!compose} kind={compose ?? 'post'} onClose={() => setCompose(null)} onDone={() => setVersion((v) => v + 1)} />
      <Dialog open={needsProfile}>
        <DialogContent className="glass-strong max-h-[90vh] overflow-y-auto [&>button]:hidden">
          <DialogHeader><DialogTitle className="font-display text-2xl">Create your profile</DialogTitle><DialogDescription>Tell us your class and institution to join UniMedia. This profile is shared with EduMotive.</DialogDescription></DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}

export default function App() {
  useEffect(() => { applyTheme(); document.title = 'UniMedia — Campus life'; return watchSystemTheme(); }, []);
  return (
    <MeProvider>
      <BrowserRouter><Shell /></BrowserRouter>
    </MeProvider>
  );
}
