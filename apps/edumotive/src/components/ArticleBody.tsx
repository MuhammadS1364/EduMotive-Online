import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';

export const headingId = (t: string) => t.toLowerCase().replace(/[*_`[\]()]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function extractToc(md: string) {
  return md.split('\n').map((l) => /^(#{1,3})\s+(.+?)\s*#*$/.exec(l)).filter(Boolean)
    .map((m) => ({ level: m![1].length, text: m![2].replace(/[*_`]/g, ''), id: headingId(m![2]) }));
}

const text = (c: ReactNode): string => Array.isArray(c) ? c.map(text).join('') : typeof c === 'string' || typeof c === 'number' ? String(c) : (c as { props?: { children?: ReactNode } })?.props ? text((c as { props: { children?: ReactNode } }).props.children) : '';

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none font-serif prose-headings:font-display prose-headings:scroll-mt-40 prose-a:text-foreground prose-a:decoration-accent prose-blockquote:border-accent prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:not-italic dropcap">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h2 id={headingId(text(children))}>{children}</h2>,
          h2: ({ children }) => <h2 id={headingId(text(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={headingId(text(children))}>{children}</h3>,
          img: ({ src, alt }) => (
            <span className="block my-8 not-prose">
              <img src={src} alt={alt ?? ''} className="w-full rounded-2xl shadow-lg" />
              {alt && <span className="block mt-2 text-sm text-muted-foreground font-sans border-l-2 border-accent pl-3">{alt}</span>}
            </span>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
