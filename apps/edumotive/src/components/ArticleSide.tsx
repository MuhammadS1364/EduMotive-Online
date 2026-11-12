import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Send } from 'lucide-react';
import { submitLetter } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@project/components/ui/tabs';
import { AuthorAvatar, BadgeIcons, TierPill, PenName, type Author } from './AuthorBits';

export function AuthorCard({ a }: { a: Author }) {
  return (
    <div className="glass rounded-3xl p-5 space-y-3">
      <p className="kicker text-muted-foreground">About the author</p>
      <Link to={`/authors/${a.id}`} className="flex items-center gap-3 group">
        <AuthorAvatar a={a} size={64} />
        <div>
          <p className="font-display text-lg font-bold group-hover:underline decoration-accent">{a.name}</p><PenName a={a} />
          <p className="text-xs text-muted-foreground">{[a.post, a.institution].filter(Boolean).join(' · ')}</p>
        </div>
      </Link>
      <div className="flex items-center gap-2 flex-wrap"><TierPill tier={a.tier} /><span className="text-xs text-muted-foreground">{a.count} published</span></div>
      <BadgeIcons badges={a.badges} />
      {a.bio && <p className="text-sm text-muted-foreground leading-relaxed">{a.bio}</p>}
    </div>
  );
}

export function LetterBox({ articleId, authorName }: { articleId: string; authorName: string }) {
  const [to, setTo] = useState<'Author' | 'Public'>('Author');
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const [busy, setBusy] = useState(false);
  const valid = f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.message.trim().length >= 5;
  const send = async () => {
    setBusy(true);
    try {
      await submitLetter({ articleId, recipient: to, ...f });
      toast.success(to === 'Author' ? `Your letter was sent to ${authorName || 'the author'}.` : 'Thanks! Your letter will appear after editorial review.');
      setF({ name: '', email: '', message: '' });
    } catch { toast.error('Could not send your letter.'); } finally { setBusy(false); }
  };
  return (
    <div className="glass rounded-3xl p-5 space-y-3">
      <p className="kicker text-muted-foreground flex items-center gap-2"><Mail className="h-3.5 w-3.5" />Write a letter</p>
      <Tabs value={to} onValueChange={(v) => setTo(v as 'Author' | 'Public')}>
        <TabsList className="grid grid-cols-2 w-full"><TabsTrigger value="Author">To Author</TabsTrigger><TabsTrigger value="Public">To Public</TabsTrigger></TabsList>
      </Tabs>
      <Input placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <Input placeholder="Email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <Textarea placeholder={to === 'Author' ? 'Dear author…' : 'Dear readers…'} rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      <Button className="w-full" disabled={!valid || busy} onClick={send}><Send className="h-4 w-4 mr-1" />Send letter</Button>
    </div>
  );
}
