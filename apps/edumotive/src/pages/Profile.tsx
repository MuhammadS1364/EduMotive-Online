import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Monitor, LogOut, PenLine, Loader2 } from 'lucide-react';
import { logout } from 'zitejs/auth';
import { Button } from '@project/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@project/components/ui/tabs';
import { cn } from '@project/components/lib/utils';
import { useData } from '../lib/data';
import { getTheme, setTheme, type ThemeMode } from '../lib/theme';
import ProfileForm from '../components/ProfileForm';
import { MyOrders } from '../components/Tracking';
import { AuthorAvatar, BadgeIcons, TierPill } from '../components/AuthorBits';

function ThemeSetting() {
  const [mode, setMode] = useState<ThemeMode>(getTheme());
  const opts = [{ v: 'light', i: Sun, l: 'Light' }, { v: 'dark', i: Moon, l: 'Dark' }, { v: 'system', i: Monitor, l: 'System' }] as const;
  return (
    <div className="grid grid-cols-3 gap-3 max-w-md">
      {opts.map((o) => (
        <button key={o.v} onClick={() => { setTheme(o.v); setMode(o.v); }} className={cn('glass rounded-2xl p-4 flex flex-col items-center gap-2 text-sm font-semibold', mode === o.v && 'ring-2 ring-accent')}>
          <o.i className="h-5 w-5" />{o.l}
        </button>
      ))}
    </div>
  );
}

const statusCls: Record<string, string> = { Published: 'bg-accent text-accent-foreground', Pending: 'bg-muted', Draft: 'border', Rejected: 'bg-destructive text-destructive-foreground' };

export default function Profile() {
  const { me, meLoading } = useData();
  if (!me) return <div className="py-24 grid place-items-center">{meLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Please sign in.'}</div>;
  const p = me.profile;
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl space-y-8">
      <section className="glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <AuthorAvatar a={{ photo: p?.avatar ?? '', name: p?.displayName ?? '', tier: me.author?.tier ?? null }} size={110} />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start"><h1 className="text-3xl font-black" style={me.author?.tier ? { color: me.author.tier.color } : undefined}>{p?.displayName || 'Your profile'}</h1><TierPill tier={me.author?.tier ?? null} /></div>
          {p && <p className="text-muted-foreground text-sm">{p.username && `@${p.username} · `}{p.role} · {p.className} · {p.institution}</p>}
          {me.author && <BadgeIcons badges={me.author.badges} className="justify-center sm:justify-start" />}
        </div>
        <div className="flex sm:flex-col gap-2">
          <Button asChild size="sm"><Link to="/write"><PenLine className="h-4 w-4 mr-1" />Write</Link></Button>
          <Button size="sm" variant="outline" onClick={() => logout()}><LogOut className="h-4 w-4 mr-1" />Sign out</Button>
        </div>
      </section>
      <Tabs defaultValue={p ? 'work' : 'profile'}>
        <TabsList className="w-full overflow-x-auto no-scrollbar justify-start"><TabsTrigger value="work">My work</TabsTrigger><TabsTrigger value="profile">Edit profile</TabsTrigger><TabsTrigger value="orders">Subscriptions</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>
        <TabsContent value="work" className="space-y-3 mt-6">
          {me.submissions.length === 0 ? <div className="glass rounded-3xl p-8 text-center"><p className="text-muted-foreground mb-3">You haven't written anything yet.</p><Button asChild><Link to="/write">Start writing</Link></Button></div> :
            me.submissions.map((s) => (
              <div key={s.id} className="glass rounded-2xl p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0"><p className="font-bold truncate">{s.title}</p>{s.adminNote && <p className="text-xs text-muted-foreground truncate">Editor: {s.adminNote}</p>}</div>
                <span className={cn('text-xs font-bold rounded-full px-2.5 py-0.5', statusCls[s.status])}>{s.status}</span>
                {s.status === 'Published' ? <Button asChild size="sm" variant="ghost"><Link to={`/article/${s.slug}`}>View</Link></Button> : <Button asChild size="sm" variant="outline"><Link to={`/write/${s.id}`}>Edit</Link></Button>}
              </div>
            ))}
        </TabsContent>
        <TabsContent value="profile" className="mt-6 glass rounded-3xl p-6"><ProfileForm /></TabsContent>
        <TabsContent value="orders" className="mt-6">{me.subscriptions.length ? <MyOrders /> : <div className="glass rounded-3xl p-8 text-center"><p className="text-muted-foreground mb-3">No subscriptions yet.</p><Button asChild><Link to="/subscribe">See plans</Link></Button></div>}</TabsContent>
        <TabsContent value="settings" className="mt-6 glass rounded-3xl p-6 space-y-3"><h3 className="text-xl font-bold">Appearance</h3><ThemeSetting /></TabsContent>
      </Tabs>
    </div>
  );
}
