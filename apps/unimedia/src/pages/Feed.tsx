import { useEffect, useState } from 'react';
import { Plus, Rows3, Grid2x2, Grid3x3 } from 'lucide-react';
import { useAuth, loginWithRedirect } from 'zitejs/auth';
import { getFeed, type GetFeedOutputType } from 'zitejs/api';
import { Skeleton } from '@project/components/ui/skeleton';
import { cn } from '@project/components/lib/utils';
import PostCard from '../components/PostCard';
import StoryViewer from '../components/StoryViewer';
import Avatar from '../components/Avatar';
import { useMe } from '../lib/me';

const COLS = [{ n: 1, i: Rows3, c: 'columns-1 max-w-xl mx-auto' }, { n: 2, i: Grid2x2, c: 'columns-1 sm:columns-2' }, { n: 3, i: Grid3x3, c: 'columns-2 lg:columns-3' }];

export default function Feed({ version, onCompose }: { version: number; onCompose: (k: 'post' | 'story') => void }) {
  const { user } = useAuth();
  const { me } = useMe();
  const [data, setData] = useState<GetFeedOutputType | null>(null);
  const [campus, setCampus] = useState('');
  const [cols, setCols] = useState(() => Number(localStorage.getItem('um-cols') || 1));
  const [story, setStory] = useState<number | null>(null);
  useEffect(() => { getFeed({}).then(setData).catch(console.error); }, [version]);
  useEffect(() => { localStorage.setItem('um-cols', String(cols)); }, [cols]);
  const posts = (data?.posts ?? []).filter((p) => !campus || p.campus === campus);

  return (
    <div className="container mx-auto px-3 md:px-4 py-5 max-w-5xl space-y-5">
      <section className="glass rounded-3xl p-3 flex gap-4 overflow-x-auto no-scrollbar">
        <button onClick={() => (user ? onCompose('story') : loginWithRedirect())} className="flex flex-col items-center gap-1 shrink-0 w-16">
          <span className="relative"><Avatar src={me?.profile?.avatar} size={60} /><span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-accent text-accent-foreground grid place-items-center border-2 border-background"><Plus className="h-3 w-3" /></span></span>
          <span className="text-[11px] font-semibold">Your story</span>
        </button>
        {(data?.stories ?? []).map((g, n) => (
          <button key={g.owner.userId} onClick={() => setStory(n)} className="flex flex-col items-center gap-1 shrink-0 w-16">
            <Avatar src={g.owner.avatar} size={60} ring />
            <span className="text-[11px] font-semibold truncate w-full text-center">{g.owner.username || g.owner.name.split(' ')[0]}</span>
          </button>
        ))}
      </section>
      <div className="glass-strong rounded-2xl p-2 flex items-center gap-2 sticky top-[68px] z-20">
        <div className="flex gap-1 overflow-x-auto no-scrollbar flex-1">
          {['', ...(data?.campuses ?? [])].map((c) => (
            <button key={c || 'all'} onClick={() => setCampus(c)} className={cn('shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold', campus === c ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5')}>{c || 'All campuses'}</button>
          ))}
        </div>
        <div className="flex gap-0.5 shrink-0">{COLS.map((x) => <button key={x.n} onClick={() => setCols(x.n)} className={cn('p-1.5 rounded-lg', cols === x.n ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')} aria-label={`${x.n} columns`}><x.i className="h-4 w-4" /></button>)}</div>
      </div>
      {!data ? <div className="max-w-xl mx-auto space-y-4">{[1, 2].map((i) => <Skeleton key={i} className="h-96 rounded-3xl" />)}</div>
        : posts.length === 0 ? <div className="glass rounded-3xl p-12 text-center"><p className="text-xl font-bold">No campus posts yet</p><p className="text-muted-foreground text-sm mt-1">Be the first to share what's happening.</p></div>
        : <div className={cn('gap-4', COLS.find((x) => x.n === cols)!.c)}>{posts.map((p) => <PostCard key={p.id} p={p} onDeleted={(id) => setData({ ...data, posts: data.posts.filter((x) => x.id !== id) })} />)}</div>}
      {story !== null && data && <StoryViewer groups={data.stories} start={story} onClose={() => setStory(null)} />}
    </div>
  );
}
