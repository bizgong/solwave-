import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, Loader2, Check } from 'lucide-react';

interface ImageUploaderProps {
  sectionId: string;
  fieldKey: string;
  currentUrl: string;
  onUploadComplete: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ sectionId, fieldKey, currentUrl, onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // Compression Options
      const options = {
        maxSizeMB: 0.9,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.78,
      };

      let compressedFile = await imageCompression(file, options);
      
      // Retry if still too big
      if (compressedFile.size > 900 * 1024) {
        options.maxSizeMB = 0.8;
        options.initialQuality = 0.65;
        compressedFile = await imageCompression(file, options);
      }

      if (compressedFile.size > 1.5 * 1024 * 1024) {
        throw new Error("이미지 용량이 너무 큽니다. 다른 이미지를 사용해주세요.");
      }

      // Convert to Base64 for API
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async () => {
        const base64data = reader.result;

        // Upload to API
        const res = await fetch('/.netlify/functions/cms?action=upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64data,
            sectionId,
            filename: file.name
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Upload failed');

        onUploadComplete(data.url);
      };

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden border border-gray-300 group">
        <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <label className="cursor-pointer px-4 py-2 bg-white text-black text-sm font-medium rounded-sm flex items-center hover:bg-gray-100">
            <Upload size={16} className="mr-2" />
            이미지 교체
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      </div>
      {isUploading && (
        <div className="text-xs text-blue-500 flex items-center">
          <Loader2 size={12} className="animate-spin mr-1" />
          압축 및 업로드 중... (약간의 시간이 소요됩니다)
        </div>
      )}
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  );
};

export default ImageUploader;