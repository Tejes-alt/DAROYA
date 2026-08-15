'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Download, Info } from 'lucide-react';

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  caption: string;
  credit: string;
  date?: string;
  alt?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

/**
 * Image Gallery Strip - Horizontal scrollable gallery
 */
export function ImageGalleryStrip({ images }: ImageGalleryProps) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-64 cursor-pointer group"
            >
              <div className="relative h-48 rounded-lg overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={image.src}
                  alt={image.alt || image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xs font-semibold text-white mb-1">{image.title}</h4>
                  <p className="text-xs text-white/60">{image.credit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Lightbox Gallery - Full-screen image viewer
 */
export function ImageGalleryLightbox({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const current = images[currentIndex];

  const nextImage = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setShowInfo(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          {title && <h2 className="text-lg font-light text-white">{title}</h2>}
          <p className="text-xs text-white/50">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
        <button
          onClick={() => setShowInfo(false)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="relative max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id}
              src={current.src}
              alt={current.alt || current.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-auto rounded-lg"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-black/80 border-t border-white/10 px-6 py-4"
          >
            <h3 className="text-sm font-semibold text-white mb-1">{current.title}</h3>
            <p className="text-sm text-white/70 mb-2">{current.caption}</p>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span>Credit: {current.credit}</span>
              {current.date && <span>Date: {current.date}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
        <button
          onClick={prevImage}
          className="p-2 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            title="Toggle info"
          >
            <Info size={20} />
          </button>
        </div>

        <button
          onClick={nextImage}
          className="p-2 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
}

/**
 * Grid Gallery - Multiple images in grid layout
 */
export function ImageGalleryGrid({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative h-40 rounded-lg overflow-hidden group"
          >
            <img
              src={image.src}
              alt={image.alt || image.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-xs font-semibold text-white line-clamp-1">{image.title}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <ImageGalleryLightbox
          images={images}
          title={undefined}
        />
      )}
    </>
  );
}
