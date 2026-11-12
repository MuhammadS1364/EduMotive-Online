import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from 'zitejs/auth';
import { myProfile } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Label } from '@project/components/ui/label';
import { useMe } from '../lib/me';
import ImageUpload from './ImageUpload';

export default function ProfileForm({ onDone }: { onDone?: () => void }) {
  const { me, refresh } = useMe();
  const { user } = useAuth();
  const p = me?.profile;
  const [f, setF] = useState({ displayName: user?.name ?? '', role: 'Student', className: '', institution: '', username: '', bio: '', avatar: '' });
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (p) setF(p); }, [p?.username, p?.displayName]);
  const valid = f.displayName.trim() && f.className.trim() && f.institution.trim();
  const save = async () => {
    setBusy(true);
    try { await myProfile({ save: f }); await refresh(); toast.success('Profile saved'); onDone?.(); } catch { toast.error('Could not save'); } finally { setBusy(false); }
  };
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="space-y-4">
      <div><Label className="block mb-2">Profile photo</Label><ImageUpload value={f.avatar} onChange={(u) => setF({ ...f, avatar: u })} label="Upload photo" /></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>Name *</Label><Input value={f.displayName} onChange={set('displayName')} /></div>
        <div><Label>Username</Label><Input value={f.username} onChange={(e) => setF({ ...f, username: e.target.value.replace(/[^a-z0-9_.]/gi, '').toLowerCase() })} /></div>
        <div><Label>Class / Course *</Label><Input value={f.className} onChange={set('className')} /></div>
        <div><Label>Institution / Campus *</Label><Input value={f.institution} onChange={set('institution')} /></div>
      </div>
      <div><Label>Bio</Label><Textarea rows={2} value={f.bio} onChange={set('bio')} /></div>
      <Button className="w-full" disabled={!valid || busy} onClick={save}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Save profile</Button>
    </div>
  );
}
