import { useState } from 'react';
import { Check, Crown, Package, Loader2, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth, loginWithRedirect } from 'zitejs/auth';
import { createSubscription, type GetSiteOutputType } from 'zitejs/api';
import { Link } from 'react-router-dom';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Label } from '@project/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@project/components/ui/dialog';
import { useData } from '../lib/data';
import ImageUpload from '../components/ImageUpload';
import { MyOrders } from '../components/Tracking';

type Plan = GetSiteOutputType['plans'][number];

function OrderDialog({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const { site, me, refreshMe } = useData();
  const [f, setF] = useState({ fullName: me?.profile?.displayName ?? '', phone: '', address: '', pincode: '', paymentProof: '', transactionId: '' });
  const [busy, setBusy] = useState(false);
  const errs = {
    phone: f.phone && !/^\+?\d{10,13}$/.test(f.phone.replace(/\s/g, '')) ? 'Enter a valid phone number' : '',
    pincode: f.pincode && !/^\d{6}$/.test(f.pincode) ? 'Enter a 6-digit pincode' : '',
  };
  const valid = f.fullName.length > 1 && f.address.length > 7 && f.paymentProof && f.transactionId.length > 3 && f.phone && f.pincode && !errs.phone && !errs.pincode;
  const submit = async () => {
    setBusy(true);
    try { await createSubscription({ planId: plan.id, ...f }); toast.success('Order placed! We will confirm after verifying your payment.'); await refreshMe(); onClose(); }
    catch (e) { toast.error(e instanceof Error ? e.message : 'Could not place order'); } finally { setBusy(false); }
  };
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <DialogContent className="glass-strong max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader><DialogTitle className="font-display text-2xl">{plan.name} · ₹{plan.price}</DialogTitle><DialogDescription>Scan the QR to pay, then upload your payment screenshot.</DialogDescription></DialogHeader>
      <div className="grid md:grid-cols-[200px_1fr] gap-6">
        <div className="text-center space-y-2">
          {site?.settings.paymentQr ? <img src={site.settings.paymentQr} alt="Payment QR" className="w-full rounded-2xl bg-white p-2" /> : <div className="aspect-square rounded-2xl bg-muted grid place-items-center text-xs text-muted-foreground p-4">QR will be added soon</div>}
          {site?.settings.upiId && <button onClick={() => { navigator.clipboard.writeText(site.settings.upiId); toast.success('UPI ID copied'); }} className="text-xs font-semibold flex items-center gap-1 mx-auto"><Copy className="h-3 w-3" />{site.settings.upiId}</button>}
          <p className="text-2xl font-black font-display">₹{plan.price}</p>
        </div>
        <div className="space-y-3">
          <div><Label>Full name</Label><Input value={f.fullName} onChange={set('fullName')} /></div>
          <div><Label>Phone</Label><Input value={f.phone} onChange={set('phone')} />{errs.phone && <p className="text-xs text-destructive mt-1">{errs.phone}</p>}</div>
          <div><Label>Delivery address</Label><Textarea rows={3} value={f.address} onChange={set('address')} /></div>
          <div><Label>Pincode</Label><Input value={f.pincode} onChange={set('pincode')} />{errs.pincode && <p className="text-xs text-destructive mt-1">{errs.pincode}</p>}</div>
          <div><Label>Transaction ID / UTR</Label><Input value={f.transactionId} onChange={set('transactionId')} /></div>
          <div><Label className="block mb-1">Payment screenshot</Label><ImageUpload value={f.paymentProof} onChange={(u) => setF({ ...f, paymentProof: u })} label="Upload screenshot" /></div>
          <Button className="w-full" disabled={!valid || busy} onClick={submit}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Submit order</Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function Subscribe() {
  const { site, me } = useData();
  const { user } = useAuth();
  const [plan, setPlan] = useState<Plan | null>(null);
  const choose = (p: Plan) => {
    if (!user) return loginWithRedirect();
    if (!me?.profile) { toast.info('Please create your profile first.'); return; }
    setPlan(p);
  };
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-14">
      <div className="text-center space-y-3"><Crown className="h-10 w-10 mx-auto text-accent" /><h1 className="text-4xl md:text-6xl font-black">Subscribe to EduMotive</h1><p className="text-muted-foreground max-w-xl mx-auto">The printed magazine at your doorstep, plus premium stories and the full digital edition.</p></div>
      {user && !me?.profile && <div className="glass rounded-2xl p-4 text-center text-sm">Create your <Link to="/profile" className="font-bold underline">profile</Link> before ordering.</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {(site?.plans ?? []).map((p, i) => (
          <div key={p.id} className={`rounded-[2rem] p-7 flex flex-col gap-5 ${i === 0 ? 'bg-primary text-primary-foreground shadow-2xl' : 'glass-strong'}`}>
            <div><p className="kicker opacity-70">{p.durationMonths} months</p><h2 className="text-3xl font-black mt-1">{p.name}</h2></div>
            <p className="font-display text-5xl font-black">₹{p.price}<span className="text-base font-sans font-medium opacity-70"> / {p.durationMonths >= 12 ? 'year' : `${p.durationMonths} mo`}</span></p>
            <ul className="space-y-2 text-sm flex-1">
              {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />{f}</li>)}
            </ul>
            <div className="flex gap-1.5 flex-wrap text-[11px] font-bold">
              {p.hardCopy && <span className="rounded-full bg-accent text-accent-foreground px-2 py-0.5">Hard copy</span>}
              {p.premiumArticles && <span className="rounded-full bg-accent text-accent-foreground px-2 py-0.5">Premium articles</span>}
              {p.pdfReading && <span className="rounded-full bg-accent text-accent-foreground px-2 py-0.5">Digital magazine</span>}
            </div>
            <Button size="lg" variant={i === 0 ? 'secondary' : 'default'} className="rounded-full" onClick={() => choose(p)}>Choose {p.name}</Button>
          </div>
        ))}
      </div>
      {me && me.subscriptions.length > 0 && <MyOrders />}
      <Dialog open={!!plan} onOpenChange={(o) => !o && setPlan(null)}>{plan && <OrderDialog plan={plan} onClose={() => setPlan(null)} />}</Dialog>
      <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1"><Package className="h-3.5 w-3.5" />Shipped via India Post Speed Post · <a className="underline inline-flex items-center gap-0.5" href="https://myspeedpost.com/" target="_blank" rel="noreferrer">track<ExternalLink className="h-3 w-3" /></a></p>
    </div>
  );
}
