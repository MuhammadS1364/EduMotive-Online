import { useState } from 'react';
import { Package, Copy, ExternalLink, ChevronDown, ClipboardCheck, PackageCheck, Send, Truck, MapPin, Home } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@project/components/ui/button';
import { Slider } from '@project/components/ui/slider';
import { cn } from '@project/components/lib/utils';
import { useData, fmtDate } from '../lib/data';

const statusStyle: Record<string, string> = {
  Active: 'bg-accent text-accent-foreground', Pending: 'bg-muted text-foreground',
  Rejected: 'bg-destructive text-destructive-foreground', Expired: 'bg-muted text-muted-foreground',
};

const STAGES = [
  { k: 'Ordered', icon: ClipboardCheck }, { k: 'Packed', icon: PackageCheck }, { k: 'Dispatched', icon: Send },
  { k: 'In Transit', icon: Truck }, { k: 'Out for Delivery', icon: MapPin }, { k: 'Delivered', icon: Home },
];

function Stepper({ stage }: { stage: string }) {
  const cur = Math.max(0, STAGES.findIndex((x) => x.k === stage));
  return (
    <div className="flex items-start overflow-x-auto pb-1">
      {STAGES.map((x, i) => (
        <div key={x.k} className="flex-1 min-w-[72px] flex flex-col items-center relative">
          {i > 0 && <div className={cn('absolute top-4 right-1/2 w-full h-1 rounded', i <= cur ? 'bg-primary' : 'bg-border')} />}
          <div className={cn('relative z-10 h-8 w-8 rounded-full grid place-items-center', i <= cur ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}><x.icon className="h-4 w-4" /></div>
          <span className={cn('mt-1.5 text-[11px] text-center leading-tight', i === cur ? 'font-bold' : 'text-muted-foreground')}>{x.k}</span>
        </div>
      ))}
    </div>
  );
}

function TrackFrame({ number }: { number: string }) {
  const [h, setH] = useState(420);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span>Tracking no. <b className="font-mono">{number}</b></span>
        <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(number); toast.success('Tracking number copied — paste it below'); }}><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
        <Button size="sm" variant="ghost" asChild><a href="https://myspeedpost.com/" target="_blank" rel="noreferrer">Open in new tab<ExternalLink className="h-3.5 w-3.5 ml-1" /></a></Button>
        <div className="flex items-center gap-2 w-40 ml-auto"><span className="text-xs text-muted-foreground">Size</span><Slider min={260} max={800} step={20} value={[h]} onValueChange={([v]) => setH(v)} /></div>
      </div>
      <iframe src="https://myspeedpost.com/" title="Speed Post tracking" className="w-full rounded-2xl border bg-white" style={{ height: h }} />
      <p className="text-xs text-muted-foreground">If the tracker doesn't load here, use "Open in new tab".</p>
    </div>
  );
}

export function MyOrders() {
  const { me } = useData();
  const [open, setOpen] = useState<string | null>(null);
  if (!me) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2"><Package className="h-6 w-6" />My subscriptions</h2>
      {me.subscriptions.map((s) => (
        <div key={s.id} className="glass rounded-3xl p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-bold text-lg">{s.plan} · ₹{s.price}</p>
            <span className={cn('text-xs font-bold rounded-full px-2.5 py-0.5', statusStyle[s.status])}>{s.status}</span>
            <span className="text-xs text-muted-foreground">Ordered {fmtDate(s.created)}</span>
            {s.endDate && <span className="text-xs text-muted-foreground">Valid till {fmtDate(s.endDate)}</span>}
            {s.hardCopy && s.trackingNumber && (
              <Button size="sm" className="ml-auto rounded-full" onClick={() => setOpen(open === s.id ? null : s.id)}>Track parcel<ChevronDown className={cn('h-4 w-4 ml-1 transition-transform', open === s.id && 'rotate-180')} /></Button>
            )}
          </div>
          {s.status === 'Pending' && <p className="text-sm text-muted-foreground">We're verifying your payment.{s.hardCopy ? " You'll see your tracking number here once the magazine ships." : ' Online access unlocks once approved.'}</p>}
          {s.status === 'Active' && s.hardCopy && <Stepper stage={s.deliveryStage || 'Ordered'} />}
          {s.hardCopy && open === s.id && <TrackFrame number={s.trackingNumber} />}
        </div>
      ))}
    </section>
  );
}
