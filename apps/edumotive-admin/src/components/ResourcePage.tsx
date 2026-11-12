import { k } from '../lib/session';
import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, ArrowUpDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { adminList, adminSave } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Label } from '@project/components/ui/label';
import { Skeleton } from '@project/components/ui/skeleton';
import { Switch } from '@project/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@project/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@project/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@project/components/ui/table';
import { cn } from '@project/components/lib/utils';
import type { Resource, Field } from '../config';
import FieldInput from './FieldInput';
import { useOptions, ids, invalidate } from '../lib/options';

type Rec = Record<string, unknown> & { id: string };
const PAGE = 15;

function Cell({ f, v }: { f: Field; v: unknown }) {
  const opts = useOptions(f.type === 'link' || f.type === 'multilink' ? f.link?.table : undefined, f.link?.label);
  if (f.type === 'image') return v ? <img src={String(v)} alt="" className="h-10 w-10 rounded-lg object-cover" /> : <span className="text-muted-foreground">—</span>;
  if (f.type === 'link' || f.type === 'multilink') return <span>{ids(v).map((id) => opts.find((o) => o.id === id)?.label ?? '…').join(', ') || '—'}</span>;
  if (f.type === 'date') return <span>{v ? new Date(String(v)).toLocaleDateString('en-IN') : '—'}</span>;
  if (f.type === 'select') return v ? <span className="text-xs font-bold rounded-full px-2 py-0.5 bg-muted">{String(v)}</span> : <span>—</span>;
  return <span className="line-clamp-2">{v == null || v === '' ? '—' : String(v)}</span>;
}

export default function ResourcePage({ r }: { r: Resource }) {
  const [rows, setRows] = useState<Rec[] | null>(null);
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('');
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 }>({ key: 'created', dir: -1 });
  const [page, setPage] = useState(0);
  const [edit, setEdit] = useState<Record<string, unknown> | null>(null);
  const [del, setDel] = useState<Rec | null>(null);
  const [busy, setBusy] = useState(false);

  const load = () => adminList({ key: k(), table: r.table }).then((x) => setRows(x.records as Rec[])).catch(() => toast.error('Failed to load'));
  useEffect(() => { setRows(null); setTab(''); setQ(''); setPage(0); load(); }, [r.table]);

  const listFields = r.fields.filter((f) => f.list);
  const filtered = useMemo(() => {
    const list = (rows ?? []).filter((x) => (!tab || x[r.filterTabs!.key] === tab) && (!q || JSON.stringify(x).toLowerCase().includes(q.toLowerCase())));
    return list.sort((a, b) => String(a[sort.key] ?? '').localeCompare(String(b[sort.key] ?? ''), undefined, { numeric: true }) * sort.dir);
  }, [rows, q, tab, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));

  const save = async () => {
    if (!edit) return;
    const missing = r.fields.find((f) => f.required && !edit[f.key]);
    if (missing) return toast.error(`${missing.label} is required`);
    setBusy(true);
    try {
      const { id, ...record } = edit;
      await adminSave({ key: k(), table: r.table, id: id as string | undefined, record });
      invalidate(r.table); toast.success('Saved'); setEdit(null); load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Save failed'); } finally { setBusy(false); }
  };
  const quickToggle = async (row: Rec, key: string, v: boolean) => {
    setRows((rs) => rs!.map((x) => (x.id === row.id ? { ...x, [key]: v } : x)));
    try { await adminSave({ key: k(), table: r.table, id: row.id, record: { [key]: v } }); } catch { toast.error('Update failed'); load(); }
  };
  const remove = async () => {
    if (!del) return;
    try { await adminSave({ key: k(), table: r.table, deleteId: del.id, record: {} }); invalidate(r.table); toast.success('Deleted'); load(); } catch { toast.error('Delete failed'); }
    setDel(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-3xl font-black">{r.title}</h1>{r.description && <p className="text-sm text-muted-foreground max-w-2xl mt-1">{r.description}</p>}</div>
        <Button onClick={() => setEdit({ ...(r.defaults ?? {}) })}><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>
      <div className="glass rounded-2xl p-3 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search…" className="pl-9 bg-background/60" /></div>
        {r.filterTabs && (
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {['', ...r.filterTabs.values].map((v) => (
              <button key={v || 'all'} onClick={() => { setTab(v); setPage(0); }} className={cn('rounded-full px-3 py-1 text-sm font-semibold shrink-0', tab === v ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground/5')}>
                {v || 'All'} <span className="opacity-60">{(rows ?? []).filter((x) => !v || x[r.filterTabs!.key] === v).length}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        {!rows ? <div className="p-4 space-y-2">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-10" />)}</div> : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                {listFields.map((f) => <TableHead key={f.key}><button className="flex items-center gap-1" onClick={() => setSort({ key: f.key, dir: sort.key === f.key ? (-sort.dir as 1 | -1) : 1 })}>{f.label}<ArrowUpDown className="h-3 w-3" /></button></TableHead>)}
                <TableHead className="w-24" />
              </TableRow></TableHeader>
              <TableBody>
                {filtered.slice(page * PAGE, page * PAGE + PAGE).map((row) => (
                  <TableRow key={row.id} className="cursor-pointer" onClick={() => setEdit({ ...row })}>
                    {listFields.map((f) => (
                      <TableCell key={f.key} className="max-w-[260px]" onClick={f.type === 'bool' ? (e) => e.stopPropagation() : undefined}>
                        {f.type === 'bool' ? <Switch checked={!!row[f.key]} onCheckedChange={(v) => quickToggle(row, f.key, v)} /> : <Cell f={f} v={row[f.key]} />}
                      </TableCell>
                    ))}
                    <TableCell onClick={(e) => e.stopPropagation()}><div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setEdit({ ...row })}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setDel(row)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div></TableCell>
                  </TableRow>
                ))}
                {!filtered.length && <TableRow><TableCell colSpan={listFields.length + 1} className="text-center py-10 text-muted-foreground">Nothing here yet.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        )}
        {pages > 1 && <div className="flex items-center justify-end gap-2 p-3 border-t text-sm"><Button size="sm" variant="outline" disabled={!page} onClick={() => setPage(page - 1)}>Prev</Button><span>{page + 1} / {pages}</span><Button size="sm" variant="outline" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Next</Button></div>}
      </div>

      <Sheet open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <SheetContent className={cn('glass-strong overflow-y-auto w-full', r.table === 'articles' ? 'sm:max-w-4xl' : 'sm:max-w-xl')}>
          <SheetHeader><SheetTitle className="font-display text-2xl">{edit?.id ? 'Edit' : 'New'} {r.title.replace(/s$/, '')}</SheetTitle></SheetHeader>
          {edit && <div className="space-y-4 py-4">
            {r.fields.map((f) => (
              <div key={f.key} className={f.type === 'bool' ? 'flex items-center justify-between glass rounded-xl px-3 py-2' : 'space-y-1.5'}>
                <Label>{f.label}{f.required && ' *'}</Label>
                <FieldInput f={f} value={edit[f.key]} onChange={(v) => setEdit((p) => ({ ...p!, [f.key]: v }))} />
              </div>
            ))}
            <div className="flex gap-2 justify-end sticky bottom-0 py-3 bg-background/70 backdrop-blur-xl">
              <Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button>
              <Button onClick={save} disabled={busy}>{busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Save</Button>
            </div>
          </div>}
        </SheetContent>
      </Sheet>
      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this item?</AlertDialogTitle><AlertDialogDescription>"{String(del?.[r.titleKey] ?? '')}" will be removed permanently.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={remove}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
