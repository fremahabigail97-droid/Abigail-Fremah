import { AnimatePresence, motion } from 'motion/react';
import { Photo } from '../types';
import PhotoCard from './PhotoCard';
import { Plus } from 'lucide-react';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoOpen: (photo: Photo) => void;
  onPhotoDelete: (id: string) => void;
}

export default function PhotoGrid({ photos, onPhotoOpen, onPhotoDelete }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
          <Plus size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Album is empty</h3>
        <p className="text-slate-400 text-sm max-w-xs">Start adding some photos to populate this beautiful bento grid.</p>
      </div>
    );
  }

  // Helper to determine spans for the Bento look
  const getBentoSpan = (index: number) => {
    // A repeating 7-item pattern for a distinct Bento feel
    const pattern = index % 7;
    switch (pattern) {
      case 0: return 'col-span-2 row-span-2 aspect-auto'; // Large featured
      case 1: return 'row-span-2 aspect-auto'; // Vertical tall
      case 4: return 'col-span-2 aspect-auto'; // Horizontal wide
      default: return 'aspect-square'; // Standard square
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
      <AnimatePresence mode="popLayout">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={getBentoSpan(index)}
          >
            <PhotoCard
              photo={photo}
              onOpen={onPhotoOpen}
              onDelete={onPhotoDelete}
            />
          </motion.div>
        ))}
        
        {/* "Add Memory" Placeholder Slot */}
        <motion.div
          layout
          className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-100 hover:bg-white transition-all cursor-pointer aspect-square"
          whileHover={{ borderColor: 'var(--color-indigo-400)' }}
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
              <Plus size={24} />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-indigo-600">Add Memory</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
