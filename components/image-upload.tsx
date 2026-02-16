'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageChange: (base64: string) => void;
  currentImage?: string;
  label?: string;
}

export function ImageUpload({ onImageChange, currentImage, label = 'Subir Imagen' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPreview(base64);
      onImageChange(base64);
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onImageChange('');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-foreground">{label}</label>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer bg-transparent"
              disabled={loading}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading ? 'Cargando...' : 'Seleccionar Imagen'}
            </Button>
          </label>
        </div>

        {preview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {preview && (
        <div className="relative w-32 h-32 rounded-lg border-2 border-border overflow-hidden">
          <Image
            src={preview || "/placeholder.svg"}
            alt="Vista previa"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
