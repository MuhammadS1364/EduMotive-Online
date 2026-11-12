import { useEffect, useState } from 'react';
import { ListTree, ChevronDown } from 'lucide-react';
import { cn } from '@project/components/lib/utils';

type Item = { level: number; text: string; id: string };

function useActive(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      const v = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (v) setActive(v.target.id);
    }, { rootMargin: '-140px 0px -60% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids.join('|')]);
  return active;
}

const jump = (id: string) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
};

function List({ items, active, onPick }: { items: Item[]; active: string; onPick?: () => void }) {
  return (
    <ol className="space-y-1 border-l border-foreground/10">
      {items.map((i, n) => (
        <li key={i.id + n}>
          <button onClick={() => { jump(i.id); onPick?.(); }} className={cn(
            '-ml-px border-l-2 pl-3 py-1 text-left text-sm leading-snug transition-colors w-full',
            i.level === 3 && 'pl-6 text-[13px]',
            active === i.id ? 'border-accent font-semibold text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
          )}>{i.text}</button>
        </li>
      ))}
    </ol>
  );
}

export function TocDesktop({ items }: { items: Item[] }) {
  const active = useActive(items.map((i) => i.id));
  if (!items.length) return null;
  return (
    <nav className="glass rounded-3xl p-5">
      <p className="kicker text-muted-foreground mb-3 flex items-center gap-2"><ListTree className="h-3.5 w-3.5" />Contents</p>
      <List items={items} active={active} />
    </nav>
  );
}

export function TocMobile({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const active = useActive(items.map((i) => i.id));
  if (!items.length) return null;
  return (
    <div className="lg:hidden sticky top-[118px] z-20 glass-strong rounded-2xl mb-6">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold">
        <span className="flex items-center gap-2"><ListTree className="h-4 w-4" />Jump to section</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="px-4 pb-4 max-h-[50vh] overflow-auto"><List items={items} active={active} onPick={() => setOpen(false)} /></div>}
    </div>
  );
}
