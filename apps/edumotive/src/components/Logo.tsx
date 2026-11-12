import { Link } from 'react-router-dom';
import { cn } from '@project/components/lib/utils';
import { useData } from '../lib/data';

export const DEFAULT_LOGO = 'https://images.fillout.com/orgid-886933/flowpublicid-g9mcbthowz/widgetid-default/vJUKs187fWTMbvnC9QkcLg/pasted-image-1791520031939-sk6cjd3r.png';

export function LogoImg({ className, onDark }: { className?: string; onDark?: boolean }) {
  const { site } = useData();
  return (
    <span className={cn('inline-block aspect-[3.4/1] overflow-hidden', className)}>
      <img src={site?.settings.logo || DEFAULT_LOGO} alt="EduMotive" draggable={false}
        className={cn('w-full h-full object-cover object-center', onDark ? 'logo-on-dark' : 'logo-img')} />
    </span>
  );
}

export default function Logo({ className }: { compact?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('flex items-center shrink-0 select-none', className)} aria-label="EduMotive home">
      <LogoImg className="h-11 md:h-14" />
    </Link>
  );
}
