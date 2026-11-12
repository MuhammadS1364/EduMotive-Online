import { useState } from 'react';
import { toast } from 'sonner';
import { Megaphone, Loader2, CheckCircle2, Image as ImageIcon, Video } from 'lucide-react';
import { submitAd } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Label } from '@project/components/ui/label';
import { cn } from '@project/components/lib/utils';
import ImageUpload from '../components/ImageUpload';
import { useData } from '../lib/data';

type Kind = 'Image' | 'Video';

function PlanPicker({ kind, setKind, planId, setPlanId }: { kind: Kind; setKind: (k: Kind) => void; planId: string; setPlanId: (id: string) => void }) {
  const { site } = useData();
  const plans = (site?.adPlans ?? []).filter((p) => p.mediaType === kind);
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(['Image', 'Video'] as Kind[]).map((k) => (
          <Button key={k} type="button" variant={kind === k ? 'default' : 'outline'} className="rounded-full" onClick={() => { setKind(k); setPlanId(''); }}>
            {k === 'Image' ? <ImageIcon className="h-4 w-4 mr-1" /> : <Video className="h-4 w-4 mr-1" />}{k} ad
          </Button>
        ))}
      </div>
      {plans.length === 0 ? <p className="text-sm text-muted-foreground">No {kind.toLowerCase()} ad plans available right now.</p> : (
        <div className="grid sm:grid-cols-3 gap-3">
          {plans.map((p) => (
            <button key={p.id} type="button" onClick={() => setPlanId(p.id)}
              className={cn('glass rounded-2xl p-4 text-left border-2 transition-all', planId === p.id ? 'border-primary shadow-lg' : 'border-transparent')}>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Per {p.period.toLowerCase()}</p>
              <p className="text-2xl font-black mt-1">₹{p.price}</p>
              <p className="text-sm font-semibold">{p.name}</p>
              {p.details && <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{p.details}</p>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Advertise() {
  const { site } = useData();
  const [f, setF] = useState({ title: '', advertiser: '', email: '', phone: '', media: '', targetLink: '', transactionId: '', paymentProof: '' });
  const [kind, setKind] = useState<Kind>('Image');
  const [planId, setPlanId] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const plan = site?.adPlans.find((p) => p.id === planId);
  const emailOk = /\S+@\S+\.\S+/.test(f.email);
  const valid = f.title && f.advertiser && emailOk && f.media && planId && f.paymentProof;
  const send = async () => {
    setBusy(true);
    try { await submitAd({ ...f, mediaType: kind, planId }); setDone(true); } catch { toast.error('Could not submit your ad'); } finally { setBusy(false); }
  };
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  if (done) return <div className="container mx-auto px-4 py-24 max-w-lg text-center space-y-3"><CheckCircle2 className="h-12 w-12 mx-auto text-accent" /><h1 className="text-3xl font-black">Ad submitted!</h1><p className="text-muted-foreground">We'll verify your payment screenshot and publish your ad. We'll contact you at {f.email}.</p></div>;
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl space-y-6">
      <div className="text-center space-y-3"><Megaphone className="h-10 w-10 mx-auto text-accent" /><h1 className="text-4xl md:text-5xl font-black">Advertise with EduMotive</h1><p className="text-muted-foreground">Pick a weekly, monthly or yearly plan for an image or video ad, pay, and upload the payment screenshot. Ads go live after admin approval.</p></div>
      <div className="glass-strong rounded-[2rem] p-6 md:p-8 space-y-6">
        <div><Label className="block mb-2 text-base font-bold">1. Choose a plan *</Label><PlanPicker kind={kind} setKind={setKind} planId={planId} setPlanId={setPlanId} /></div>
        <div className="space-y-4">
          <Label className="block text-base font-bold">2. Ad details</Label>
          <div><Label>Ad title *</Label><Input value={f.title} onChange={set('title')} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Business / your name *</Label><Input value={f.advertiser} onChange={set('advertiser')} /></div>
            <div><Label>Phone</Label><Input value={f.phone} onChange={set('phone')} /></div>
            <div><Label>Email *</Label><Input type="email" value={f.email} onChange={set('email')} />{f.email && !emailOk && <p className="text-xs text-destructive mt-1">Enter a valid email</p>}</div>
            <div><Label>Link (optional)</Label><Input value={f.targetLink} onChange={set('targetLink')} placeholder="https://" /></div>
          </div>
          <div><Label className="block mb-2">Ad {kind.toLowerCase()} *</Label>
            <ImageUpload value={f.media} accept={kind === 'Video' ? 'video/*' : 'image/*'} label={`Upload ${kind.toLowerCase()}`} onChange={(u) => setF({ ...f, media: u })} />
          </div>
        </div>
        <div className="space-y-4">
          <Label className="block text-base font-bold">3. Pay {plan ? `₹${plan.price}` : ''} & upload screenshot</Label>
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            {site?.settings.paymentQr && <img src={site.settings.paymentQr} alt="Payment QR" className="h-44 w-44 rounded-2xl bg-white p-2 object-contain" />}
            <div className="flex-1 w-full space-y-3">
              {site?.settings.upiId && <p className="text-sm">UPI ID: <b className="font-mono">{site.settings.upiId}</b></p>}
              <div><Label>Transaction ID (optional)</Label><Input value={f.transactionId} onChange={set('transactionId')} /></div>
              <div><Label className="block mb-2">Payment screenshot *</Label><ImageUpload value={f.paymentProof} accept="image/*" label="Upload screenshot" onChange={(u) => setF({ ...f, paymentProof: u })} /></div>
            </div>
          </div>
        </div>
        <Button className="w-full" disabled={!valid || busy} onClick={send}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Submit for approval</Button>
      </div>
    </div>
  );
}
