import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Lock, Share2, ArrowLeft, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { getArticle, type GetArticleOutputType } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Skeleton } from '@project/components/ui/skeleton';
import ArticleBody, { extractToc } from '../components/ArticleBody';
import { TocDesktop, TocMobile } from '../components/Toc';
import { AuthorCard, LetterBox } from '../components/ArticleSide';
import { AuthorAvatar } from '../components/AuthorBits';
import ArticleCard, { SectionTag } from '../components/ArticleCard';
import { fmtDate } from '../lib/data';

export default function ArticlePage() {
  const { slug = '' } = useParams();
  const [data, setData] = useState<GetArticleOutputType | null>(null);
  useEffect(() => { setData(null); getArticle({ slug }).then(setData).catch(() => toast.error('Could not load article')); }, [slug]);
  const toc = useMemo(() => extractToc(data?.article?.content ?? ''), [data]);

  if (!data) return <div className="container mx-auto px-4 py-10 max-w-4xl space-y-4"><Skeleton className="h-12 w-3/4" /><Skeleton className="h-96 w-full rounded-3xl" /></div>;
  const { article: a, author } = data;
  if (!a) return <div className="container mx-auto px-4 py-24 text-center"><h1 className="text-3xl font-bold">Article not found</h1><Button asChild className="mt-6"><Link to="/articles">Browse articles</Link></Button></div>;

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: a.title, url }).catch(() => {});
    else { await navigator.clipboard.writeText(url); toast.success('Link copied'); }
  };

  return (
    <div className="relative">
      {/* Blurred photographic backdrop — content floats on glass above it */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {a.mainImage && <img src={a.mainImage} alt="" className="h-full w-full object-cover scale-110 blur-3xl opacity-60" />}
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-10">
        <Link to="/articles" className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="h-4 w-4" />All articles</Link>
        <article className="glass-strong rounded-[2rem] p-5 md:p-10 lg:p-14">
          <header className="max-w-4xl mx-auto text-center space-y-5">
            <SectionTag name={a.section} />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05]">{a.title}</h1>
            {a.excerpt && <p className="text-lg md:text-xl text-muted-foreground font-serif italic max-w-3xl mx-auto">{a.excerpt}</p>}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {author && <Link to={`/authors/${author.id}`} className="flex items-center gap-2"><AuthorAvatar a={author} size={40} /><span className="font-semibold">{author.name}</span></Link>}
              <span className="text-sm text-muted-foreground">{fmtDate(a.publishedAt)}</span>
              {a.premium && <span className="text-xs font-bold flex items-center gap-1"><Crown className="h-3.5 w-3.5 text-accent" />Premium</span>}
              <Button size="sm" variant="outline" className="rounded-full" onClick={share}><Share2 className="h-3.5 w-3.5 mr-1" />Share</Button>
            </div>
          </header>
          {a.mainImage && (
            <figure className="my-8 md:my-12 max-w-5xl mx-auto">
              <img src={a.mainImage} alt={a.title} className="w-full rounded-3xl shadow-xl max-h-[70vh] object-cover" />
              {a.imageCaption && <figcaption className="mt-3 text-sm text-muted-foreground text-center">{a.imageCaption}</figcaption>}
            </figure>
          )}
          <div className="grid lg:grid-cols-[230px_minmax(0,1fr)_290px] gap-8 xl:gap-12">
            <aside className="hidden lg:block"><div className="sticky top-40"><TocDesktop items={toc} /></div></aside>
            <div className="min-w-0">
              <TocMobile items={toc} />
              <ArticleBody content={a.content} />
              {a.locked && (
                <div className="relative mt-6">
                  <div className="glass rounded-3xl p-8 text-center space-y-3">
                    <Lock className="h-8 w-8 mx-auto text-accent" />
                    <h3 className="text-2xl font-bold">Continue reading with a subscription</h3>
                    <p className="text-muted-foreground">This is a premium article. Subscribe to unlock the full story.</p>
                    <Button asChild><Link to="/subscribe">See plans</Link></Button>
                  </div>
                </div>
              )}
            </div>
            <aside className="space-y-5">
              <div className="lg:sticky lg:top-40 space-y-5">
                {author && <AuthorCard a={author} />}
                <LetterBox articleId={a.id} authorName={author?.name ?? ''} />
              </div>
            </aside>
          </div>
        </article>
        {data.letters.length > 0 && (
          <section className="glass rounded-3xl p-6 md:p-10 mt-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-5">Letters from readers</h2>
            <div className="space-y-5">{data.letters.map((l) => (
              <blockquote key={l.id} className="border-l-4 border-accent pl-4"><p className="font-serif">{l.message}</p><footer className="text-sm text-muted-foreground mt-1">— {l.name}, {fmtDate(l.created)}</footer></blockquote>
            ))}</div>
          </section>
        )}
        {data.related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-5">Read next</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{data.related.map((r) => <ArticleCard key={r.id} a={{ ...r, issueId: '' }} />)}</div>
          </section>
        )}
      </div>
    </div>
  );
}
