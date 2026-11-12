import { k as adminKey } from './session';
import { useEffect, useState } from 'react';
import { adminList } from 'zitejs/api';
import type { TableName } from '../config';

type Opt = { id: string; label: string };
const cache = new Map<string, Promise<Opt[]>>();

export function loadOptions(table: TableName, label: string, fresh = false) {
  const k = `${table}:${label}`;
  if (fresh || !cache.has(k)) {
    cache.set(k, adminList({ key: adminKey(), table }).then((r) => r.records.map((x) => ({ id: String(x.id), label: String(x[label] ?? 'Untitled') }))));
  }
  return cache.get(k)!;
}

export function invalidate(table: TableName) {
  for (const k of [...cache.keys()]) if (k.startsWith(`${table}:`)) cache.delete(k);
}

export function useOptions(table?: TableName, label?: string) {
  const [opts, setOpts] = useState<Opt[]>([]);
  useEffect(() => { if (table && label) loadOptions(table, label).then(setOpts).catch(() => {}); }, [table, label]);
  return opts;
}

export const ids = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : v ? [String(v)] : []);
