import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import type { GetSiteOutputType } from 'zitejs/api';

type Slide = GetSiteOutputType['heroSlides'][number];

function SlideButton({ s }: { s: Slide }) {
  if (!s.link) return null;
  const label = s.buttonText || 'Read more';
  return /^https?:/.test(s.link)
    ? <Button asChild size="lg" className="rounded-full"><a href={s.link} target="_blank" rel="noreferrer">{label}</a></Button>
    : <Button asChild size="lg" className="rounded-full"><Link to={s.link}>{label}</Link></Button>;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n, i]);
  if (!n) return null;
  const s = slides[i % n];
  return (
    <section className="relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
      <AnimatePresence initial={false}>
        <motion.div key={s.id} className="absolute inset-0" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.6 }}>
          <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 text-white space-y-3 max-w-3xl">
            {s.title && <h2 className="text-3xl md:text-5xl font-black leading-tight">{s.title}</h2>}
            {s.subtitle && <p className="text-white/85 md:text-lg">{s.subtitle}</p>}
            <SlideButton s={s} />
          </div>
        </motion.div>
      </AnimatePresence>
      {n > 1 && (<>
        <button aria-label="Previous slide" onClick={() => setI((i - 1 + n) % n)} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/40"><ChevronLeft className="h-5 w-5" /></button>
        <button aria-label="Next slide" onClick={() => setI((i + 1) % n)} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/40"><ChevronRight className="h-5 w-5" /></button>
        <div className="absolute bottom-4 right-6 flex gap-1.5">
          {slides.map((x, k) => <button key={x.id} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i % n ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} />)}
        </div>
      </>)}
    </section>
  );
}
