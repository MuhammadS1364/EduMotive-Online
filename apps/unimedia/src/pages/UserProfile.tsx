import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sun, Moon, Monitor, LogOut, Settings, Pencil, Heart } from 'lucide-react';
import { useAuth, logout } from 'zitejs/auth';
import { getFeed, type GetFeedOutputType } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Skeleton } from '@project/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@project/components/ui/dialog';
import { cn } from '@project/components/lib/utils';
import Avatar from '../components/Avatar';
import ProfileForm from '../components/ProfileForm';
import PostCard, { type Post } from '../components/PostCard';
import { getTheme, setTheme, type ThemeMode } from '../lib/theme';

function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<ThemeMode>(getTheme());
  const opts = [{ v: 'light', i: Sun, l: 'Light' }, { v: 'dark', i: Moon, l: 'Dark' }, { v: 'system', i: Monitor, l: 'System' }] as const;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass-strong max-w-sm">
        <DialogHeader><DialogTitle>Settings</DialogTitle></DialogHeader>
        <p className="text-sm font-semibold">Appearance</p>
        <div className="grid grid-cols-3 gap-2">{opts.map((o) => <button key={o.v} onClick={() => { setTheme(o.v); setMode(o.v); }} className={cn('glass rounded-2xl p-3 flex flex-col items-center gap-1 text-sm', mode === o.v && 'ring-2 ring-accent')}><o.i className="h-5 w-5" />{o.l}</button>)}</div>
        <Button variant="outline" onClick={() => logout()}><LogOut className="h-4 w-4 mr-1" />Sign out</Button>
      </DialogContent>
    </Dialog>
  );
}

export default function UserProfile({ version }: { version: number }) {
  const { userId = '' } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState<GetFeedOutputType | null>(null);
  const [open, setOpen] = useState<Post | null>(null);
  const [edit, setEdit] = useState(false);
  const [settings, setSettings] = useState(false);
  useEffect(() => { setData(null); getFeed({ userId }).then(setData).catch(console.error); }, [userId, version, edit]);
  const isMe = user?.id === userId;
  const p = data?.person;
  if (!data) return <div className="container mx-auto px-4 py-8 max-w-4xl"><Skeleton className="h-40 rounded-3xl" /></div>;
  return (
    <div className="container mx-auto px-3 md:px-4 py-6 max-w-4xl space-y-6">
      <section className="glass-strong rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
        <Avatar src={p?.avatar} size={120} ring />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
            <h1 className="text-2xl font-black">{p?.username || p?.name || 'Student'}</h1>
            {isMe && <><Button size="sm" variant="outline" onClick={() => setEdit(true)}><Pencil className="h-3.5 w-3.5 mr-1" />Edit profile</Button><Button size="icon" variant="ghost" onClick={() => setSettings(true)} aria-label="Settings"><Settings className="h-5 w-5" /></Button></>}
          </div>
          <p className="font-semibold">{p?.name}</p>
          <p className="text-sm text-muted-foreground">{[p?.className, p?.institution].filter(Boolean).join(' · ')}</p>
          {p?.bio && <p className="text-sm">{p.bio}</p>}
          <p className="text-sm"><b>{data.posts.length}</b> posts</p>
        </div>
      </section>
      {isMe && !p && <div className="glass rounded-3xl p-6"><ProfileForm /></div>}
      <div className="grid grid-cols-3 gap-1 md:gap-3">
        {data.posts.map((x) => (
          <button key={x.id} onClick={() => setOpen(x)} className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-muted">
            {x.mediaType === 'Video' ? <video src={x.media} muted className="h-full w-full object-cover" /> : <img src={x.media} alt="" className="h-full w-full object-cover" />}
            <span className="absolute inset-0 bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition grid place-items-center font-bold"><span className="flex items-center gap-1"><Heart className="h-4 w-4 fill-current" />{x.likes}</span></span>
          </button>
        ))}
      </div>
      {!data.posts.length && <p className="text-center text-muted-foreground py-10">No posts yet.</p>}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-lg p-0 bg-transparent border-0 shadow-none">{open && <PostCard p={open} onDeleted={() => { setOpen(null); getFeed({ userId }).then(setData); }} />}</DialogContent>
      </Dialog>
      <Dialog open={edit} onOpenChange={setEdit}><DialogContent className="glass-strong max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Edit profile</DialogTitle></DialogHeader><ProfileForm onDone={() => setEdit(false)} /></DialogContent></Dialog>
      <SettingsDialog open={settings} onClose={() => setSettings(false)} />
    </div>
  );
}
