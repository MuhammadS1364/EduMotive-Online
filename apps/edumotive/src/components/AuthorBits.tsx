import { UserRound } from 'lucide-react';
import { cn } from '@project/components/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@project/components/ui/tooltip';
import type { GetCatalogOutputType } from 'zitejs/api';

export type Author = GetCatalogOutputType['authors'][number];

export function AuthorAvatar({ a, size = 56 }: { a: Pick<Author, 'photo' | 'name' | 'tier'>; size?: number }) {
  const color = a.tier?.color;
  return (
    <div className="relative shrink-0 rounded-full p-[3px]" style={{ width: size, height: size, background: color ?? 'hsl(var(--border))', boxShadow: color ? `0 0 0 3px ${color}33, 0 0 18px ${color}66` : undefined }}>
      <div className="h-full w-full rounded-full overflow-hidden bg-muted grid place-items-center border-2 border-background">
        {a.photo ? <img src={a.photo} alt={a.name} className="h-full w-full object-cover" /> : <UserRound className="h-1/2 w-1/2 text-muted-foreground" />}
      </div>
    </div>
  );
}

export function TierPill({ tier }: { tier: Author['tier'] }) {
  if (!tier) return null;
  return <span className="kicker text-[10px] rounded-full px-2.5 py-1 text-[#222831]" style={{ background: tier.color }}>{tier.name}</span>;
}

export function BadgeIcons({ badges, className }: { badges: Author['badges']; className?: string }) {
  if (!badges.length) return null;
  return (
    <TooltipProvider>
      <div className={cn('flex flex-wrap items-center gap-3', className)}>
        {badges.map((b) => (
          <Tooltip key={b.name}>
            <TooltipTrigger asChild>
              {b.icon ? (
                <span className="inline-flex items-center gap-1.5">
                  <img src={b.icon} alt={b.name} className="h-10 w-10 object-contain drop-shadow" />
                  <span className="text-xs font-semibold">{b.name}</span>
                </span>
              ) : (
                <span className="glass rounded-full px-2.5 py-1 text-xs font-semibold">{b.name}</span>
              )}
            </TooltipTrigger>
            <TooltipContent><p className="font-semibold">{b.name}</p>{b.description && <p className="text-xs opacity-80 max-w-48">{b.description}</p>}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function PenName({ a, className }: { a: { penName?: string; tier: { color: string } | null }; className?: string }) {
  if (!a.penName) return null;
  return <p className={cn('italic font-semibold text-sm', className)} style={a.tier ? { color: a.tier.color } : undefined}>“{a.penName}”</p>;
}
