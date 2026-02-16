'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onImagesChange, maxImages = 5 }: ImageUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const readFileAsDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const compressImage = (src: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 1280;
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.72);
        resolve(compressed);
      };
      img.onerror = reject;
      img.src = src;
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setIsLoading(true);

    try {
      const availableSlots = Math.max(0, maxImages - images.length);
      const selected = Array.from(files).slice(0, availableSlots);

      const processed = await Promise.all(
        selected.map(async (file) => {
          const raw = await readFileAsDataUrl(file);
          return compressImage(raw);
        })
      );

      onImagesChange([...images, ...processed]);
    } catch (error) {
      alert('No se pudieron procesar algunas imágenes. Intenta con archivos más pequeños.');
    } finally {
      setIsLoading(false);
    }

    e.currentTarget.value = '';
  };

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-3">
          Imágenes ({images.length}/{maxImages})
        </label>

        {/* Upload Area */}
        <label className="relative border-2 border-dashed border-primary rounded-lg p-6 hover:bg-primary/5 cursor-pointer transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={images.length >= maxImages || isLoading}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-primary" />
            <span className="font-semibold text-foreground">
              {isLoading ? 'Cargando...' : 'Selecciona imágenes'}
            </span>
            <span className="text-sm text-muted-foreground">
              {images.length >= maxImages
                ? 'Límite de imágenes alcanzado'
                : 'Arrastra o haz clic para seleccionar'}
            </span>
          </div>
        </label>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, idx) => (
            <Card key={idx} className="overflow-hidden">
              <CardContent className="p-2 relative group">
                <div className="relative w-full h-24 bg-muted rounded">
                  <Image
                    src={image}
                    alt={`Imagen ${idx + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="text-xs text-muted-foreground mt-1 block text-center">
                  Imagen {idx + 1}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
