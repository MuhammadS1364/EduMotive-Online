import { UserRound } from 'lucide-react';
import { cn } from '@project/components/lib/utils';

export default function Avatar({ src, size = 40, ring = false, className }: { src?: string; size?: number; ring?: boolean; className?: string }) {
  return (
    <span className={cn('inline-block shrink-0 rounded-full', ring ? 'p-[2.5px] bg-accent' : '', className)} style={{ width: size, height: size }}>
      <span className="block h-full w-full rounded-full overflow-hidden bg-muted border-2 border-background grid place-items-center">
        {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-1/2 w-1/2 text-muted-foreground" />}
      </span>
    </span>
  );
}
