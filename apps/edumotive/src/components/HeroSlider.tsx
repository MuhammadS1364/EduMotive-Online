import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@project/components/ui/button';
import type { GetSiteOutputType } from 'zitejs/api';

type Slide = GetSiteOutputType['heroSlides'][number];
const DELAY = 5000;

function SlideButton({ s }: { s: Slide }) {
  if (!s.link) return null;
  const label = s.buttonText || 'Read more';
  return /^https?:/.test(s.link)
    ? <Button asChild size="lg" className="rounded-full"><a href={s.link} target="_blank" rel="noreferrer">{label}</a></Button>
    : <Button asChild size="lg" className="rounded-full"><Link to={s.link}>{label}</Link></Button>;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  useEffect(() => {
    if (n < 2 || paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), DELAY);
    return () => clearTimeout(t);
  }, [n, i, paused]);
  if (!n) return null;
  const cur = i % n;
  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
      <div className="flex h-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)]" style={{ transform: `translateX(-${cur * 100}%)` }}>
        {slides.map((s, k) => (
          <div key={s.id} className="relative h-full w-full shrink-0 overflow-hidden">
            <img src={s.image} alt={s.title} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${k === cur ? 'scale-110' : 'scale-100'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            {k === cur && (
              <motion.div key={`t${i}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 p-6 md:p-12 text-white space-y-3 max-w-3xl">
                {s.title && <h2 className="text-3xl md:text-5xl font-black leading-tight">{s.title}</h2>}
                {s.subtitle && <p className="text-white/85 md:text-lg">{s.subtitle}</p>}
                <SlideButton s={s} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      {n > 1 && (<>
        <button aria-label="Previous slide" onClick={() => setI((cur - 1 + n) % n)} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/40 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
        <button aria-label="Next slide" onClick={() => setI((cur + 1) % n)} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/40 transition-colors"><ChevronRight className="h-5 w-5" /></button>
        <div className="absolute bottom-5 right-6 flex gap-1.5">
          {slides.map((x, k) => (
            <button key={x.id} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`relative h-1.5 rounded-full overflow-hidden bg-white/40 transition-all duration-500 ${k === cur ? 'w-10' : 'w-3'}`}>
              {k === cur && !paused && <motion.span key={i} className="absolute inset-y-0 left-0 bg-white" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: DELAY / 1000, ease: 'linear' }} />}
              {k === cur && paused && <span className="absolute inset-0 bg-white" />}
            </button>
          ))}
        </div>
      </>)}
    </section>
  );
}
