import { useState } from 'react';

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File): Promise<{ url: string }> => {
    setIsUploading(true);
    try {
      const dataUrl = await readAsDataUrl(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, type: file.type, dataUrl }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.url) return { url: new URL(json.url, window.location.origin).toString() };
      }
      return { url: dataUrl };
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
}
