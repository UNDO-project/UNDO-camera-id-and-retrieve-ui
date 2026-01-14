'use client';
import { useState } from 'react';
import { useImageStore } from '@/container/hooks';
import type { Image } from '@/primitives';

export function useImageUpload() {
  const imageStore = useImageStore();
  const [image, setImage] = useState<Image | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (file: File) => {
    try {
      setError(null);
      const storedImage = await imageStore.store(file);
      setImage(storedImage);
    } catch (err) {
      console.error('Failed to store image', err);
      setError('Failed to process image file.');
    }
  };

  const clearImage = () => {
    if (image) {
      imageStore.release(image);
    }
    setImage(null);
    setError(null);
  };

  return {
    image,
    error,
    handleImageSelected,
    clearImage,
  };
}
