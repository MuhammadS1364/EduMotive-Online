import { forwardRef, useEffect, useRef, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Lock, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Button } from '@project/components/ui/button';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Book = HTMLFlipBook as unknown as ComponentType<any>;

function PageCanvas({ doc, n, width, show }: { doc: pdfjs.PDFDocumentProxy; n: number; width: number; show: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!show) return;
    let task: { cancel: () => void } | null = null;
    doc.getPage(n).then((page) => {
      const base = page.getViewport({ scale: 1 });
      const vp = page.getViewport({ scale: (width / base.width) * Math.min(2, window.devicePixelRatio || 1) });
      const c = ref.current; if (!c) return;
      c.width = vp.width; c.height = vp.height;
      const t = page.render({ canvasContext: c.getContext('2d')!, viewport: vp });
      task = t; t.promise.catch(() => {});
    });
    return () => task?.cancel();
  }, [doc, n, width, show]);
  return <canvas ref={ref} className="w-full h-full object-contain select-none" onContextMenu={(e) => e.preventDefault()} />;
}

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="bg-white overflow-hidden shadow-inner">{children}</div>
));
Page.displayName = 'Page';

export default function Flipbook({ url, freePages, canReadAll }: { url: string; freePages: number; canReadAll: boolean }) {
  const [doc, setDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [ratio, setRatio] = useState(1.414);
  const [cur, setCur] = useState(0);
  const [full, setFull] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const book = useRef<any>(null);

  useEffect(() => {
    pdfjs.getDocument({ url }).promise.then(async (d) => {
      const p = await d.getPage(1); const v = p.getViewport({ scale: 1 });
      setRatio(v.height / v.width); setDoc(d);
    }).catch(console.error);
  }, [url]);

  if (!doc) return <div className="h-96 grid place-items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  const total = doc.numPages;
  const limit = canReadAll ? total : Math.min(total, freePages);
  const count = limit < total ? limit + 1 : limit;
  const W = 500;

  return (
    <div className={full ? 'fixed inset-0 z-50 bg-background/90 backdrop-blur-2xl p-4 overflow-auto flex flex-col justify-center' : ''}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="rounded-full" onClick={() => book.current?.pageFlip().flipPrev()} disabled={cur <= 0}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm font-semibold tabular-nums">{Math.min(cur + 1, total)} / {total}</span>
          <Button size="icon" variant="outline" className="rounded-full" onClick={() => book.current?.pageFlip().flipNext()} disabled={cur >= count - 1}><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <Button size="icon" variant="ghost" onClick={() => setFull(!full)}>{full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</Button>
      </div>
      <div className="mx-auto w-full max-w-5xl drop-shadow-2xl">
        <Book key={`${count}-${full}`} ref={book} width={W} height={Math.round(W * ratio)} size="stretch" minWidth={260} maxWidth={900}
          minHeight={360} maxHeight={1400} showCover mobileScrollSupport maxShadowOpacity={0.5} drawShadow flippingTime={800}
          usePortrait startPage={0} className="mx-auto" onFlip={(e: { data: number }) => setCur(e.data)}>
          {Array.from({ length: count }, (_, i) => (
            <Page key={i}>
              {i < limit ? <PageCanvas doc={doc} n={i + 1} width={W} show={Math.abs(i - cur) <= 3} /> : (
                <div className="h-full grid place-items-center p-6 text-center text-neutral-800">
                  <div className="space-y-3">
                    <Lock className="h-10 w-10 mx-auto" />
                    <p className="text-xl font-black">Subscribe to keep reading</p>
                    <p className="text-sm opacity-70">You've reached the end of the free preview.</p>
                    <Button asChild className="rounded-full"><Link to="/subscribe">View plans</Link></Button>
                  </div>
                </div>
              )}
            </Page>
          ))}
        </Book>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">Click or drag a page corner to turn it</p>
      {!canReadAll && <p className="text-center text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1"><Lock className="h-3.5 w-3.5" />Preview: first {freePages} pages free</p>}
    </div>
  );
}
