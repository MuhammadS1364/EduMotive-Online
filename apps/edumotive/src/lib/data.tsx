import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSite, getCatalog, getMe, type GetSiteOutputType, type GetCatalogOutputType, type GetMeOutputType } from 'zitejs/api';
import { useAuth } from 'zitejs/auth';

type Ctx = {
  site: GetSiteOutputType | null;
  catalog: GetCatalogOutputType | null;
  me: GetMeOutputType | null;
  meLoading: boolean;
  refreshMe: () => Promise<void>;
};

const DataCtx = createContext<Ctx>({ site: null, catalog: null, me: null, meLoading: false, refreshMe: async () => {} });

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [site, setSite] = useState<GetSiteOutputType | null>(null);
  const [catalog, setCatalog] = useState<GetCatalogOutputType | null>(null);
  const [me, setMe] = useState<GetMeOutputType | null>(null);
  const [meLoading, setMeLoading] = useState(false);

  useEffect(() => {
    getSite({}).then(setSite).catch(console.error);
    getCatalog({}).then(setCatalog).catch(console.error);
  }, []);

  const refreshMe = useCallback(async () => {
    if (!user) { setMe(null); return; }
    setMeLoading(true);
    try { setMe(await getMe({})); } catch (e) { console.error(e); } finally { setMeLoading(false); }
  }, [user]);

  useEffect(() => { refreshMe(); }, [refreshMe]);

  return <DataCtx.Provider value={{ site, catalog, me, meLoading, refreshMe }}>{children}</DataCtx.Provider>;
}

export const useData = () => useContext(DataCtx);

export const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
