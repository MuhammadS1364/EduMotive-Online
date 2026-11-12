import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Send, Save } from 'lucide-react';
import { saveSubmission } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Label } from '@project/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';
import { useData } from '../lib/data';
import ImageUpload from '../components/ImageUpload';
import ArticleEditor from '../components/ArticleEditor';

export default function Write() {
  const { id } = useParams();
  const { site, me, refreshMe } = useData();
  const nav = useNavigate();
  const existing = me?.submissions.find((s) => s.id === id);
  const [f, setF] = useState({ title: '', excerpt: '', content: '', mainImage: '', imageCaption: '', sectionId: '' });
  const [busy, setBusy] = useState<'' | 'draft' | 'submit'>('');
  useEffect(() => { if (existing) setF({ title: existing.title, excerpt: existing.excerpt, content: existing.content, mainImage: existing.mainImage, imageCaption: existing.imageCaption, sectionId: existing.sectionId }); }, [existing?.id]);

  if (!me) return <div className="py-24 grid place-items-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!me.profile) return <div className="container mx-auto px-4 py-24 text-center space-y-4"><h1 className="text-3xl font-bold">Create your profile first</h1><Button asChild><Link to="/profile">Go to profile</Link></Button></div>;
  if (existing?.status === 'Published') return <p className="text-center py-24">This article is published and can only be edited by the editors.</p>;

  const valid = f.title.trim().length >= 3 && f.content.trim().length >= 20;
  const save = async (submit: boolean) => {
    setBusy(submit ? 'submit' : 'draft');
    try {
      const r = await saveSubmission({ id, ...f, submit });
      toast.success(submit ? 'Submitted for review! The editors will get back to you.' : 'Draft saved');
      await refreshMe();
      if (submit) nav('/profile'); else if (!id) nav(`/write/${r.id}`, { replace: true });
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Could not save'); } finally { setBusy(''); }
  };
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl space-y-6">
      <div><p className="kicker text-muted-foreground">{me.profile.role === 'Author' ? 'Author desk' : 'Student desk'}</p><h1 className="text-3xl md:text-5xl font-black">{id ? 'Edit your article' : 'Write an article'}</h1></div>
      {existing?.adminNote && <div className="glass rounded-2xl p-4 text-sm"><b>Editor's note:</b> {existing.adminNote}</div>}
      <div className="glass-strong rounded-[2rem] p-5 md:p-8 space-y-5">
        <div><Label>Headline</Label><Input className="text-xl font-display font-bold h-12" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="A compelling headline" />{f.title && f.title.trim().length < 3 && <p className="text-xs text-destructive mt-1">Headline is too short</p>}</div>
        <div><Label>Standfirst / summary</Label><Textarea rows={2} value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} /></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Section</Label>
            <Select value={f.sectionId || undefined} onValueChange={(v) => setF({ ...f, sectionId: v })}>
              <SelectTrigger><SelectValue placeholder="Choose a section" /></SelectTrigger>
              <SelectContent>{(site?.sections ?? []).map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Main image caption</Label><Input value={f.imageCaption} onChange={(e) => setF({ ...f, imageCaption: e.target.value })} /></div>
        </div>
        <div><Label className="block mb-2">Main image</Label><ImageUpload value={f.mainImage} onChange={(u) => setF({ ...f, mainImage: u })} label="Upload main image" /></div>
        <div><Label className="block mb-2">Article</Label><ArticleEditor value={f.content} onChange={(v) => setF((p) => ({ ...p, content: v }))} /></div>
        <div className="flex flex-wrap gap-3 justify-end">
          <Button variant="outline" disabled={!f.title || !!busy} onClick={() => save(false)}>{busy === 'draft' ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}Save draft</Button>
          <Button disabled={!valid || !!busy} onClick={() => save(true)}>{busy === 'submit' ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Send className="h-4 w-4 mr-1" />}Submit for review</Button>
        </div>
      </div>
    </div>
  );
}
