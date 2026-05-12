import { motion } from 'motion/react';
import { Trash2, Maximize2 } from 'lucide-react';
import { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  onOpen: (photo: Photo) => void;
  onDelete: (id: string) => void;
}

export default function PhotoCard({ photo, onOpen, onDelete }: PhotoCardProps) {
  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-2xl bg-slate-200 border border-slate-300"
      id={`photo-${photo.id}`}
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
        id={`img-${photo.id}`}
      />
      
      {/* Dynamic Overlay based on hovering */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Bottom Info Section (Visible on Hover) */}
      <div className="absolute bottom-0 left-0 p-5 z-20 w-full flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex-1 pr-4">
          <h3 className="text-white font-bold text-lg line-clamp-1">{photo.title}</h3>
          <p className="text-white/80 text-xs line-clamp-1">{photo.description}</p>
        </div>
        
        <div className="flex gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onOpen(photo); }}
            className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors"
            id={`btn-open-${photo.id}`}
          >
            <Maximize2 size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(photo.id);
            }}
            className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-red-500 transition-colors"
            id={`btn-delete-${photo.id}`}
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
