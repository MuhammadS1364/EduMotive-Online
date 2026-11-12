import { useRef } from 'react';
import { useUpload } from 'zitejs/upload';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@project/components/ui/button';

export default function ImageUpload({ value, onChange, accept = 'image/*', label = 'Upload image' }: {
  value: string; onChange: (url: string, file?: File) => void; accept?: string; label?: string;
}) {
  const { upload, isUploading } = useUpload();
  const ref = useRef<HTMLInputElement>(null);
  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try { const { url } = await upload(f); onChange(url, f); } catch { toast.error('Upload failed, please try again.'); }
    e.target.value = '';
  };
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(value);
  return (
    <div className="flex items-center gap-3">
      {value && (
        <div className="relative">
          {isVideo ? <video src={value} className="h-16 w-16 rounded-lg object-cover" /> : <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover" />}
          <button type="button" onClick={() => onChange('')} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground grid place-items-center"><X className="h-3 w-3" /></button>
        </div>
      )}
      <input ref={ref} type="file" accept={accept} hidden onChange={pick} />
      <Button type="button" variant="outline" size="sm" disabled={isUploading} onClick={() => ref.current?.click()}>
        {isUploading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <ImagePlus className="h-4 w-4 mr-1" />}{value ? 'Replace' : label}
      </Button>
    </div>
  );
}
