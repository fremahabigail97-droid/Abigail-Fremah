import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Download, Info } from 'lucide-react';
import { Photo } from '../types';
import { useState } from 'react';

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function Lightbox({ photo, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Controls Header */}
          <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center text-white z-20 pointer-events-none">
            <div className="flex items-center gap-4">
               <button 
                onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
                id="btn-toggle-info"
              >
                <Info size={24} />
              </button>
            </div>
            
            <div className="flex items-center gap-4 pointer-events-auto">
               <button 
                disabled={!hasPrev}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-30"
                id="btn-prev"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                disabled={!hasNext}
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-30"
                id="btn-next"
              >
                <ChevronRight size={24} />
              </button>
              <div className="w-px h-6 bg-white/20 mx-2" />
              <button 
                onClick={onClose}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                id="btn-close-lightbox"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <motion.div
            key={photo.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
              id="lightbox-img"
            />

            {/* Info Overlay */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg"
                >
                  <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
                  <p className="text-white/70 max-w-2xl">{photo.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
