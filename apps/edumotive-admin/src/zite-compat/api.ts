import type { z } from 'zod';
import type adminLoginEndpoint from '../api/adminLogin';
import type adminListEndpoint from '../api/adminList';
import type adminSaveEndpoint from '../api/adminSave';
import type adminStatsEndpoint from '../api/adminStats';

type Out<T extends { outputSchema: z.ZodTypeAny }> = z.infer<T['outputSchema']>;
type In<T extends { inputSchema: z.ZodTypeAny }> = z.infer<T['inputSchema']>;

export type AdminLoginInputType = In<typeof adminLoginEndpoint>;
export type AdminLoginOutputType = Out<typeof adminLoginEndpoint>;
export type AdminListInputType = In<typeof adminListEndpoint>;
export type AdminListOutputType = Out<typeof adminListEndpoint>;
export type AdminSaveInputType = In<typeof adminSaveEndpoint>;
export type AdminSaveOutputType = Out<typeof adminSaveEndpoint>;
export type AdminStatsInputType = In<typeof adminStatsEndpoint>;
export type AdminStatsOutputType = Out<typeof adminStatsEndpoint>;

async function call<TIn, TOut>(name: string, input: TIn): Promise<TOut> {
  const res = await fetch(`/api/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input ?? {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Request failed (${res.status})`);
  }
  return data as TOut;
}

export const adminLogin = (input: AdminLoginInputType) =>
  call<AdminLoginInputType, AdminLoginOutputType>('adminLogin', input);

export const adminList = (input: AdminListInputType) =>
  call<AdminListInputType, AdminListOutputType>('adminList', input);

export const adminSave = (input: AdminSaveInputType) =>
  call<AdminSaveInputType, AdminSaveOutputType>('adminSave', input);

export const adminStats = (input: AdminStatsInputType) =>
  call<AdminStatsInputType, AdminStatsOutputType>('adminStats', input);
