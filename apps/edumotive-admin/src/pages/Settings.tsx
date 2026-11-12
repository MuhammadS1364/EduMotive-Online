import { k } from '../lib/session';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { adminList, adminSave } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Label } from '@project/components/ui/label';
import { Skeleton } from '@project/components/ui/skeleton';
import FieldInput from '../components/FieldInput';
import type { Field } from '../config';

const GROUPS: { title: string; fields: Field[] }[] = [
  { title: 'Website visibility', fields: [
    { key: 'showPrograms', label: 'Show Programs section', type: 'bool' },
    { key: 'showResults', label: 'Show Results section', type: 'bool' },
    { key: 'showSubscribe', label: 'Show Subscribe section', type: 'bool' },
  ] },
  { title: 'Brand', fields: [{ key: 'logo', label: 'Logo (transparent PNG works best)', type: 'image' }, { key: 'motto', label: 'Motto', type: 'text' }] },
  { title: 'About us', fields: [
    { key: 'aboutText', label: 'About us', type: 'textarea' }, { key: 'vision', label: 'Vision', type: 'textarea' },
    { key: 'mission', label: 'Mission', type: 'textarea' }, { key: 'teamPhoto', label: 'Team photo', type: 'image' },
  ] },
  { title: 'Payments & reading', fields: [
    { key: 'paymentQr', label: 'Payment QR code', type: 'image' }, { key: 'upiId', label: 'UPI ID', type: 'text' },
    { key: 'freePdfPages', label: 'Free magazine pages before subscribe pop-up', type: 'number' },
  ] },
  { title: 'Contact & social (Join us)', fields: [
    { key: 'contactEmail', label: 'Email', type: 'text' }, { key: 'instagram', label: 'Instagram', type: 'url' },
    { key: 'facebook', label: 'Facebook', type: 'url' }, { key: 'xLink', label: 'X', type: 'url' },
    { key: 'phones', label: 'Phone numbers (one per line)', type: 'textarea' }, { key: 'address', label: 'Address', type: 'textarea' },
  ] },
  { title: 'Google Search Console', fields: [{ key: 'googleVerificationCode', label: 'Verification code (content of the google-site-verification meta tag)', type: 'text' }] },
];

export default function SettingsPage() {
  const [rec, setRec] = useState<Record<string, unknown> | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { adminList({ key: k(), table: 'siteSettings' }).then((r) => setRec(r.records[0] ?? { name: 'Main' })); }, []);
  const save = async () => {
    if (!rec) return;
    setBusy(true);
    try { const { id, ...record } = rec; const r = await adminSave({ key: k(), table: 'siteSettings', id: id as string | undefined, record }); setRec({ ...rec, id: r.id }); toast.success('Settings saved'); }
    catch { toast.error('Save failed'); } finally { setBusy(false); }
  };
  if (!rec) return <Skeleton className="h-96 rounded-3xl" />;
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-end justify-between"><h1 className="text-3xl font-black">Site Settings</h1><Button onClick={save} disabled={busy}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Save changes</Button></div>
      {GROUPS.map((g) => (
        <section key={g.title} className="glass rounded-3xl p-6 space-y-4">
          <h2 className="text-xl font-bold">{g.title}</h2>
          {g.fields.map((f) => (
            <div key={f.key} className={f.type === 'bool' ? 'flex items-center justify-between' : 'space-y-1.5'}>
              <Label>{f.label}</Label>
              <FieldInput f={f} value={rec[f.key]} onChange={(v) => setRec((p) => ({ ...p!, [f.key]: v }))} />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
