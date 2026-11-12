import { k } from '../lib/session';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, CalendarDays, Loader2 } from 'lucide-react';
import { adminList, adminSave } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Textarea } from '@project/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@project/components/ui/tabs';
import { DatePicker } from '@project/components/ui/date-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@project/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';

type Note = { id?: string; title?: string; content?: string; kind?: string; stage?: string; dueDate?: string };
const STAGES = ['Idea', 'Planned', 'In Progress', 'Done'];

export default function Planner() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [kind, setKind] = useState('Content Plan');
  const [edit, setEdit] = useState<Note | null>(null);
  const [busy, setBusy] = useState(false);
  const load = () => adminList({ key: k(), table: 'notes' }).then((r) => setNotes(r.records as Note[]));
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!edit?.title?.trim()) return toast.error('Title is required');
    setBusy(true);
    try { const { id, ...record } = edit; await adminSave({ key: k(), table: 'notes', id, record }); setEdit(null); load(); } catch { toast.error('Save failed'); } finally { setBusy(false); }
  };
  const move = async (n: Note, stage: string) => {
    setNotes((ns) => ns!.map((x) => (x.id === n.id ? { ...x, stage } : x)));
    await adminSave({ key: k(), table: 'notes', id: n.id, record: { stage } }).catch(() => { toast.error('Update failed'); load(); });
  };
  const remove = async (n: Note) => { await adminSave({ key: k(), table: 'notes', deleteId: n.id, record: {} }); setEdit(null); load(); };
  const list = (notes ?? []).filter((n) => (n.kind ?? 'Note') === kind);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-3xl font-black">Notes & Content Planning</h1><p className="text-sm text-muted-foreground">Plan upcoming stories and issues, and keep editorial notes.</p></div>
        <Button onClick={() => setEdit({ kind, stage: 'Idea' })}><Plus className="h-4 w-4 mr-1" />New</Button>
      </div>
      <Tabs value={kind} onValueChange={setKind}><TabsList><TabsTrigger value="Content Plan">Content plan</TabsTrigger><TabsTrigger value="Note">Notes</TabsTrigger></TabsList></Tabs>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAGES.map((st) => (
          <div key={st} className="glass rounded-3xl p-3 space-y-3 min-h-[200px]">
            <p className="kicker text-muted-foreground px-1">{st} · {list.filter((n) => (n.stage ?? 'Idea') === st).length}</p>
            {list.filter((n) => (n.stage ?? 'Idea') === st).map((n) => (
              <div key={n.id} className="rounded-2xl bg-card p-3 shadow-sm space-y-2 cursor-pointer" onClick={() => setEdit(n)}>
                <p className="font-semibold">{n.title}</p>
                {n.content && <p className="text-xs text-muted-foreground line-clamp-3 whitespace-pre-line">{n.content}</p>}
                <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  {n.dueDate ? <span className="text-xs flex items-center gap-1"><CalendarDays className="h-3 w-3" />{new Date(n.dueDate).toLocaleDateString('en-IN')}</span> : <span />}
                  <Select value={n.stage ?? 'Idea'} onValueChange={(v) => move(n, v)}><SelectTrigger className="h-7 w-28 text-xs"><SelectValue /></SelectTrigger><SelectContent>{STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="glass-strong">
          <DialogHeader><DialogTitle>{edit?.id ? 'Edit' : 'New'} {kind === 'Note' ? 'note' : 'plan item'}</DialogTitle></DialogHeader>
          {edit && <div className="space-y-3">
            <Input placeholder="Title" value={edit.title ?? ''} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
            <Textarea rows={6} placeholder="Details" value={edit.content ?? ''} onChange={(e) => setEdit({ ...edit, content: e.target.value })} />
            <DatePicker value={edit.dueDate ? new Date(edit.dueDate) : undefined} onChange={(d) => setEdit({ ...edit, dueDate: d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : undefined })} />
            <div className="flex justify-between">
              {edit.id ? <Button variant="ghost" onClick={() => remove(edit)}><Trash2 className="h-4 w-4 mr-1 text-destructive" />Delete</Button> : <span />}
              <Button onClick={save} disabled={busy}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Save</Button>
            </div>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
