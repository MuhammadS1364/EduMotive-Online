import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from 'zitejs/auth';
import { myProfile, type MyProfileOutputType } from 'zitejs/api';

type Ctx = { me: MyProfileOutputType | null; refresh: () => Promise<void> };
const C = createContext<Ctx>({ me: null, refresh: async () => {} });

export function MeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [me, setMe] = useState<MyProfileOutputType | null>(null);
  const refresh = useCallback(async () => {
    if (!user) { setMe(null); return; }
    try { setMe(await myProfile({})); } catch (e) { console.error(e); }
  }, [user]);
  useEffect(() => { refresh(); }, [refresh]);
  return <C.Provider value={{ me, refresh }}>{children}</C.Provider>;
}

export const useMe = () => useContext(C);

export const timeAgo = (iso: string) => {
  const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s`; if (s < 3600) return `${Math.floor(s / 60)}m`; if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};
