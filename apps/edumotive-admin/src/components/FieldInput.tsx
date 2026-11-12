import { useRef } from 'react';
import { useUpload } from 'zitejs/upload';
import { FileUp, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Switch } from '@project/components/ui/switch';
import { Button } from '@project/components/ui/button';
import { Badge } from '@project/components/ui/badge';
import { DatePicker } from '@project/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';
import type { Field } from '../config';
import { useOptions, ids } from '../lib/options';
import ImageUpload from './ImageUpload';
import ArticleEditor from './ArticleEditor';

function FileField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { upload, isUploading } = useUpload();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {value && <a href={value} target="_blank" rel="noreferrer" className="text-sm underline truncate max-w-xs">Current file</a>}
      {value && <Button type="button" size="icon" variant="ghost" onClick={() => onChange('')}><X className="h-4 w-4" /></Button>}
      <input ref={ref} type="file" accept="application/pdf" hidden onChange={async (e) => {
        const f = e.target.files?.[0]; if (!f) return;
        try { onChange((await upload(f)).url); } catch { toast.error('Upload failed'); }
      }} />
      <Button type="button" variant="outline" size="sm" disabled={isUploading} onClick={() => ref.current?.click()}>
        {isUploading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <FileUp className="h-4 w-4 mr-1" />}Upload PDF
      </Button>
    </div>
  );
}

function LinkField({ f, value, onChange }: { f: Field; value: unknown; onChange: (v: unknown) => void }) {
  const opts = useOptions(f.link?.table, f.link?.label);
  if (f.type === 'multilink') {
    const cur = ids(value);
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">{cur.map((id) => <Badge key={id} variant="secondary" className="gap-1">{opts.find((o) => o.id === id)?.label ?? '…'}<button type="button" onClick={() => onChange(cur.filter((x) => x !== id))}><X className="h-3 w-3" /></button></Badge>)}</div>
        <Select value="" onValueChange={(v) => onChange([...cur, v])}>
          <SelectTrigger><SelectValue placeholder="Add…" /></SelectTrigger>
          <SelectContent>{opts.filter((o) => !cur.includes(o.id)).map((o) => <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    );
  }
  const cur = ids(value)[0];
  return (
    <div className="flex gap-2">
      <Select value={cur || undefined} onValueChange={(v) => onChange(v)}>
        <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
        <SelectContent>{opts.map((o) => <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>)}</SelectContent>
      </Select>
      {cur && <Button type="button" size="icon" variant="ghost" onClick={() => onChange(null)}><X className="h-4 w-4" /></Button>}
    </div>
  );
}

export default function FieldInput({ f, value, onChange }: { f: Field; value: unknown; onChange: (v: unknown) => void }) {
  const str = value == null ? '' : String(value);
  switch (f.type) {
    case 'textarea': return <Textarea rows={4} value={str} onChange={(e) => onChange(e.target.value)} />;
    case 'number': return <Input type="number" value={str} onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />;
    case 'bool': return <Switch checked={!!value} onCheckedChange={onChange} />;
    case 'image': return <ImageUpload value={str} accept="image/*,video/*" onChange={(u) => onChange(u)} />;
    case 'file': return <FileField value={str} onChange={onChange} />;
    case 'markdown': return <ArticleEditor value={str} onChange={onChange} />;
    case 'date': return <DatePicker value={str ? new Date(str) : undefined} onChange={(d) => onChange(d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : null)} />;
    case 'select': return (
      <Select value={str || undefined} onValueChange={onChange}>
        <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
        <SelectContent>{f.options!.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
    );
    case 'link': case 'multilink': return <LinkField f={f} value={value} onChange={onChange} />;
    default: return <Input value={str} onChange={(e) => onChange(e.target.value)} placeholder={f.type === 'url' ? 'https://' : undefined} />;
  }
}
