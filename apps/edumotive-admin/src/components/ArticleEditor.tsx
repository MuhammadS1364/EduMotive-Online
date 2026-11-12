import { useState } from 'react';
import { useUpload } from 'zitejs/upload';
import { ImagePlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { MarkdownEditor } from '@project/components/markdown-editor';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';

/** Rich article editor with figure-image insertion (images stored as markdown ![caption](url)). */
export default function ArticleEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [key, setKey] = useState(0);
  const [caption, setCaption] = useState('');
  const { upload, isUploading } = useUpload();
  const insert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const { url } = await upload(f);
      onChange(`${value.trimEnd()}\n\n![${caption || 'Figure'}](${url})\n\n`);
      setCaption(''); setKey((k) => k + 1);
    } catch { toast.error('Image upload failed'); }
    e.target.value = '';
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 items-center glass rounded-xl p-2">
        <Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Figure caption (optional)" className="h-9 max-w-xs bg-background/60" />
        <Button type="button" size="sm" variant="outline" disabled={isUploading} asChild>
          <label className="cursor-pointer">
            {isUploading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <ImagePlus className="h-4 w-4 mr-1" />}Insert figure image
            <input type="file" accept="image/*" hidden onChange={insert} />
          </label>
        </Button>
        <span className="text-xs text-muted-foreground">Use H2/H3 headings — they become the table of contents.</span>
      </div>
      <MarkdownEditor key={key} content={value} onChange={onChange} height="dynamic-lg" />
    </div>
  );
}
