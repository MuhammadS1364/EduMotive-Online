import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GetFeedOutputType } from 'zitejs/api';
import Avatar from './Avatar';
import { timeAgo } from '../lib/me';

type Group = GetFeedOutputType['stories'][number];

export default function StoryViewer({ groups, start, onClose }: { groups: Group[]; start: number; onClose: () => void }) {
  const [g, setG] = useState(start);
  const [i, setI] = useState(0);
  const group = groups[g];
  const item = group?.items[i];
  const next = () => {
    if (i < group.items.length - 1) setI(i + 1);
    else if (g < groups.length - 1) { setG(g + 1); setI(0); } else onClose();
  };
  const prev = () => { if (i > 0) setI(i - 1); else if (g > 0) { setG(g - 1); setI(0); } };
  useEffect(() => {
    if (!item || item.mediaType === 'Video') return;
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [g, i]);
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-2xl grid place-items-center p-0 sm:p-6">
      <div className="relative h-full sm:h-[85vh] w-full sm:max-w-[420px] sm:rounded-3xl overflow-hidden bg-black">
        <div className="absolute top-2 inset-x-2 z-10 flex gap-1">
          {group.items.map((it, n) => (
            <div key={it.id} className="h-0.5 flex-1 rounded bg-white/30 overflow-hidden">
              {n < i ? <div className="h-full bg-white" /> : n === i ? <motion.div key={`${g}-${i}`} className="h-full bg-white" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: item.mediaType === 'Video' ? 15 : 5, ease: 'linear' }} /> : null}
            </div>
          ))}
        </div>
        <div className="absolute top-5 inset-x-3 z-10 flex items-center gap-2 text-white">
          <Avatar src={group.owner.avatar} size={32} />
          <span className="font-semibold text-sm">{group.owner.username || group.owner.name}</span>
          <span className="text-xs opacity-70">{timeAgo(item.created)}</span>
          <button onClick={onClose} className="ml-auto" aria-label="Close"><X className="h-6 w-6" /></button>
        </div>
        {item.mediaType === 'Video'
          ? <video key={item.id} src={item.media} autoPlay playsInline onEnded={next} className="h-full w-full object-contain" />
          : <img key={item.id} src={item.media} alt="" className="h-full w-full object-contain" />}
        {item.caption && <p className="absolute bottom-6 inset-x-4 text-center text-white text-sm glass rounded-2xl px-3 py-2 !bg-black/30">{item.caption}</p>}
        <button className="absolute left-0 top-16 bottom-16 w-1/3" onClick={prev} aria-label="Previous" />
        <button className="absolute right-0 top-16 bottom-16 w-1/3" onClick={next} aria-label="Next" />
      </div>
    </div>
  );
}
