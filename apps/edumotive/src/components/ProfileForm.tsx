import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { saveProfile } from 'zitejs/api';
import { useAuth } from 'zitejs/auth';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Label } from '@project/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@project/components/ui/radio-group';
import { useData } from '../lib/data';
import ImageUpload from './ImageUpload';

export default function ProfileForm({ onDone }: { onDone?: () => void }) {
  const { me, refreshMe } = useData();
  const { user } = useAuth();
  const p = me?.profile;
  const [f, setF] = useState({ displayName: user?.name ?? '', role: 'Student' as 'Student' | 'Author', className: '', institution: '', username: '', bio: '', avatar: '' });
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (p) setF({ displayName: p.displayName, role: p.role === 'Author' ? 'Author' : 'Student', className: p.className, institution: p.institution, username: p.username, bio: p.bio, avatar: p.avatar }); }, [p?.id]);
  const valid = f.displayName.trim() && f.className.trim() && f.institution.trim();
  const save = async () => {
    setBusy(true);
    try { await saveProfile(f); await refreshMe(); toast.success('Profile saved'); onDone?.(); }
    catch { toast.error('Could not save profile'); } finally { setBusy(false); }
  };
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="space-y-4">
      <div><Label className="block mb-2">Photo</Label><ImageUpload value={f.avatar} onChange={(u) => setF({ ...f, avatar: u })} label="Upload photo" /></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Full name *</Label><Input value={f.displayName} onChange={set('displayName')} /></div>
        <div><Label>Username</Label><Input value={f.username} onChange={(e) => setF({ ...f, username: e.target.value.replace(/[^a-z0-9_.]/gi, '').toLowerCase() })} placeholder="e.g. ayesha_k" /></div>
        <div><Label>Class / Course *</Label><Input value={f.className} onChange={set('className')} placeholder="e.g. BA English, 2nd year" /></div>
        <div><Label>Institution *</Label><Input value={f.institution} onChange={set('institution')} /></div>
      </div>
      <div><Label>Bio</Label><Textarea rows={3} value={f.bio} onChange={set('bio')} /></div>
      <div>
        <Label className="block mb-2">I am a</Label>
        <RadioGroup value={f.role} onValueChange={(v) => setF({ ...f, role: v as 'Student' | 'Author' })} className="flex gap-6">
          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="Student" />Student</label>
          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="Author" />Author</label>
        </RadioGroup>
        <p className="text-xs text-muted-foreground mt-1">Students can become authors anytime — authors get a public author profile.</p>
      </div>
      <Button disabled={!valid || busy} onClick={save}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Save profile</Button>
    </div>
  );
}
