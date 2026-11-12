import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { act } from 'zitejs/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@project/components/ui/dialog';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Label } from '@project/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@project/components/ui/tabs';
import { cn } from '@project/components/lib/utils';
import ImageUpload from './ImageUpload';
import { useMe } from '../lib/me';

type Kind = 'post' | 'story';
type Aspect = 'Square' | 'Portrait' | 'Landscape';

export default function Composer({ open, kind: initial, onClose, onDone }: { open: boolean; kind: Kind; onClose: () => void; onDone: () => void }) {
  const { me } = useMe();
  const [kind, setKind] = useState<Kind>(initial);
  const [media, setMedia] = useState('');
  const [type, setType] = useState<'Image' | 'Video'>('Image');
  const [caption, setCaption] = useState('');
  const [campus, setCampus] = useState('');
  const [aspect, setAspect] = useState<Aspect>('Square');
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (open) { setKind(initial); setMedia(''); setCaption(''); setCampus(me?.profile?.institution ?? ''); } }, [open]);

  const publish = async () => {
    setBusy(true);
    try {
      await act({ action: kind, media, mediaType: type, caption, campus, aspect });
      toast.success(kind === 'post' ? 'Posted!' : 'Story shared for 24 hours'); onDone(); onClose();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Could not publish'); } finally { setBusy(false); }
  };
  const ratio = { Square: 'aspect-square', Portrait: 'aspect-[4/5]', Landscape: 'aspect-video' }[aspect];
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass-strong max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-display text-2xl">Share to UniMedia</DialogTitle></DialogHeader>
        <Tabs value={kind} onValueChange={(v) => setKind(v as Kind)}><TabsList className="grid grid-cols-2"><TabsTrigger value="post">Post</TabsTrigger><TabsTrigger value="story">Story</TabsTrigger></TabsList></Tabs>
        {media && (
          <div className={cn('rounded-2xl overflow-hidden bg-muted', kind === 'post' ? ratio : 'aspect-[9/16] max-h-80 mx-auto')}>
            {type === 'Video' ? <video src={media} controls className="h-full w-full object-cover" /> : <img src={media} alt="" className="h-full w-full object-cover" />}
          </div>
        )}
        <ImageUpload value={media} accept="image/*,video/*" label="Choose photo or video" onChange={(u, f) => { setMedia(u); setType(f?.type.startsWith('video') ? 'Video' : 'Image'); }} />
        {kind === 'post' && (
          <div><Label className="block mb-1.5">Size</Label>
            <div className="grid grid-cols-3 gap-2">{(['Square', 'Portrait', 'Landscape'] as Aspect[]).map((a) => <button key={a} onClick={() => setAspect(a)} className={cn('rounded-xl py-2 text-sm font-semibold glass', aspect === a && 'ring-2 ring-accent')}>{a}</button>)}</div>
          </div>
        )}
        <div><Label>Caption</Label><Textarea rows={2} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="What's happening on campus?" /></div>
        {kind === 'post' && <div><Label>Campus</Label><Input value={campus} onChange={(e) => setCampus(e.target.value)} /></div>}
        <Button className="w-full" disabled={!media || busy} onClick={publish}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Share {kind}</Button>
      </DialogContent>
    </Dialog>
  );
}
