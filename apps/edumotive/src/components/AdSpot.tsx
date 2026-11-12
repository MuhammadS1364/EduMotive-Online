import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { getAds, type GetAdsOutputType } from 'zitejs/api';
import { useIsMobile } from '@project/components/hooks/use-mobile';

type Ad = GetAdsOutputType['ads'][number];

function AdMedia({ ad }: { ad: Ad }) {
  const media = ad.mediaType === 'Video'
    ? <video src={ad.media} autoPlay muted loop playsInline className="w-full rounded-xl" />
    : <img src={ad.media} alt={ad.title} className="w-full rounded-xl object-cover" />;
  return ad.targetLink ? <a href={ad.targetLink} target="_blank" rel="noreferrer sponsored">{media}</a> : media;
}

export default function AdSpot() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [closed, setClosed] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [delay, setDelay] = useState(5000);
  const isMobile = useIsMobile();
  useEffect(() => { getAds({}).then((r) => setAds(r.ads)).catch(() => {}); }, []);
  const ad = useMemo(() => ads[Math.floor(Math.random() * ads.length)], [ads, showMobile]);

  useEffect(() => {
    if (!isMobile || !ads.length || showMobile) return;
    const t = setTimeout(() => setShowMobile(true), delay);
    return () => clearTimeout(t);
  }, [isMobile, ads.length, showMobile, delay]);
  const closeMobile = () => { setShowMobile(false); setDelay(5 * 60 * 1000); };

  if (!ad) return null;
  if (isMobile) {
    if (!showMobile) return null;
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-background/40 backdrop-blur-md p-6">
        <div className="glass-strong rounded-3xl p-3 w-full max-w-sm relative">
          <button onClick={closeMobile} className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg" aria-label="Close ad"><X className="h-4 w-4" /></button>
          <p className="kicker text-muted-foreground mb-2 px-1">Sponsored</p>
          <AdMedia ad={ad} />
        </div>
      </div>
    );
  }
  if (closed) return null;
  return (
    <aside className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-30 w-56">
      <div className="glass rounded-2xl p-2.5 relative">
        <button onClick={() => setClosed(true)} className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center shadow" aria-label="Close ad"><X className="h-3.5 w-3.5" /></button>
        <p className="kicker text-muted-foreground mb-2 px-1 text-[10px]">Sponsored</p>
        <AdMedia ad={ad} />
        {ad.title && <p className="text-xs font-semibold mt-2 px-1 line-clamp-2">{ad.title}</p>}
      </div>
    </aside>
  );
}
