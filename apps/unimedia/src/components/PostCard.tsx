import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, Trash2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth, loginWithRedirect } from 'zitejs/auth';
import { act, type GetFeedOutputType } from 'zitejs/api';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@project/components/ui/alert-dialog';
import { cn } from '@project/components/lib/utils';
import Avatar from './Avatar';
import { timeAgo } from '../lib/me';

export type Post = GetFeedOutputType['posts'][number];
const ratio: Record<string, string> = { Square: 'aspect-square', Portrait: 'aspect-[4/5]', Landscape: 'aspect-video' };

export default function PostCard({ p, onDeleted }: { p: Post; onDeleted: (id: string) => void }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(p.liked);
  const [likes, setLikes] = useState(p.likes);
  const [confirm, setConfirm] = useState(false);
  const [pop, setPop] = useState(false);

  const like = async () => {
    if (!user) return loginWithRedirect();
    setLiked(!liked); setLikes(likes + (liked ? -1 : 1));
    if (!liked) { setPop(true); setTimeout(() => setPop(false), 600); }
    try { await act({ action: 'like', postId: p.id }); } catch { setLiked(liked); setLikes(likes); toast.error('Could not update like'); }
  };
  const share = async () => {
    const url = `${window.location.origin}/u/${p.owner.userId}`;
    if (navigator.share) await navigator.share({ title: `${p.owner.name} on UniMedia`, text: p.caption, url }).catch(() => {});
    else { await navigator.clipboard.writeText(url); toast.success('Link copied'); }
  };
  const del = async () => {
    try { await act({ action: 'delete', postId: p.id }); onDeleted(p.id); toast.success('Post deleted'); } catch { toast.error('Could not delete'); }
  };

  return (
    <article className="glass rounded-3xl overflow-hidden break-inside-avoid mb-4">
      <header className="flex items-center gap-3 p-3">
        <Link to={`/u/${p.owner.userId}`}><Avatar src={p.owner.avatar} size={38} ring /></Link>
        <div className="min-w-0 flex-1">
          <Link to={`/u/${p.owner.userId}`} className="font-bold text-sm hover:underline">{p.owner.username || p.owner.name}</Link>
          {p.campus && <p className="text-xs text-muted-foreground flex items-center gap-1 truncate"><MapPin className="h-3 w-3" />{p.campus}</p>}
        </div>
        <span className="text-xs text-muted-foreground">{timeAgo(p.created)}</span>
        {user?.id === p.owner.userId && <button onClick={() => setConfirm(true)} className="p-1 text-muted-foreground hover:text-destructive" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>}
      </header>
      <div className={cn('relative bg-muted', ratio[p.aspect] ?? 'aspect-square')} onDoubleClick={() => !liked && like()}>
        {p.mediaType === 'Video'
          ? <video src={p.media} controls playsInline className="absolute inset-0 h-full w-full object-cover" />
          : <img src={p.media} alt={p.caption} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
        {pop && <Heart className="absolute inset-0 m-auto h-24 w-24 fill-accent text-accent animate-ping" />}
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-center gap-4">
          <button onClick={like} className="flex items-center gap-1.5 text-sm font-semibold" aria-label="Like"><Heart className={cn('h-6 w-6 transition-transform active:scale-125', liked && 'fill-accent text-accent')} />{likes}</button>
          <button onClick={share} aria-label="Share"><Share2 className="h-5 w-5" /></button>
        </div>
        {p.caption && <p className="text-sm"><Link to={`/u/${p.owner.userId}`} className="font-bold mr-1.5">{p.owner.username || p.owner.name}</Link>{p.caption}</p>}
      </div>
      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this post?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={del}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </article>
  );
}
