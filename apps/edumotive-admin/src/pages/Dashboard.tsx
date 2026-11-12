import { k } from '../lib/session';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminStats } from 'zitejs/api';
import { Skeleton } from '@project/components/ui/skeleton';

const CARDS = [
  { k: 'pending', l: 'Articles awaiting review', to: '/articles', hot: true },
  { k: 'subsPending', l: 'Subscriptions to verify', to: '/subscriptions', hot: true },
  { k: 'adsPending', l: 'Ads to approve', to: '/ads', hot: true },
  { k: 'letters', l: 'Letters to review', to: '/letters', hot: true },
  { k: 'published', l: 'Published articles', to: '/articles' },
  { k: 'subsActive', l: 'Active subscribers', to: '/subscriptions' },
  { k: 'authors', l: 'Authors', to: '/authors' },
  { k: 'profiles', l: 'Registered students & authors', to: '/members' },
];

export default function Dashboard() {
  const [s, setS] = useState<Record<string, number> | null>(null);
  useEffect(() => { adminStats({ key: k(), }).then((r) => setS(r.stats)).catch(() => setS({})); }, []);
  return (
    <div className="space-y-6">
      <div><p className="kicker text-muted-foreground">EduMotive Admin</p><h1 className="text-4xl font-black">Dashboard</h1></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map((c) => (
          <Link key={c.k} to={c.to} className={`rounded-3xl p-5 transition-transform hover:-translate-y-0.5 ${c.hot && (s?.[c.k] ?? 0) > 0 ? 'bg-accent text-accent-foreground shadow-lg' : 'glass'}`}>
            {s ? <p className="font-display text-4xl font-black">{s[c.k] ?? 0}</p> : <Skeleton className="h-10 w-16" />}
            <p className="text-sm font-semibold mt-1 opacity-80">{c.l}</p>
          </Link>
        ))}
      </div>
      <div className="glass rounded-3xl p-6 text-sm text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">Quick guide</p>
        <p>• Approve student submissions in Articles → Pending: pick the author, set status to Published.</p>
        <p>• Hide Programs, Results or Subscribe from the website in Site Settings.</p>
        <p>• Verify subscription payments, mark them Active, then add the Speed Post tracking number.</p>
      </div>
    </div>
  );
}
