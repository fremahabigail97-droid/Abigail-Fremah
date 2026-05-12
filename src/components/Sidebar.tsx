import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Album } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  albums: Album[];
  activeAlbumId: string;
  onAlbumSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ albums, activeAlbumId, onAlbumSelect, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-60 bg-white border-r border-slate-200 flex flex-col shrink-0",
          "lg:translate-x-0 lg:static lg:z-0"
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0">
              <Icons.Camera size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Lumina</h1>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">
                Library
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onAlbumSelect('all');
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                    activeAlbumId === 'all'
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                   <Icons.LayoutGrid size={18} />
                   <span>All Photos</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">
                  <Icons.Clock size={18} />
                  <span>Recent</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">
                  <Icons.Heart size={18} />
                  <span>Favorites</span>
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">
                Albums
              </p>
              <div className="space-y-1">
                {albums.filter(a => a.id !== 'all').map((album) => {
                  return (
                    <button
                      key={album.id}
                      onClick={() => {
                        onAlbumSelect(album.id);
                        onClose();
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                        activeAlbumId === album.id
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="opacity-70">
                          {album.id === 'travel' && '🏔'}
                          {album.id === 'family' && '👨‍👩‍👧'}
                          {album.id === 'work' && '💼'}
                          {album.id === 'events' && '🎨'}
                        </span>
                        {album.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-auto p-4">
           <div className="p-4 bg-slate-900 rounded-xl text-white">
            <p className="text-[10px] font-semibold mb-2 opacity-70 uppercase tracking-wider">Storage Status</p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mb-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                className="bg-indigo-400 h-full rounded-full" 
              />
            </div>
            <p className="text-[10px] text-slate-400 flex justify-between">
              <span>7.5 GB used</span>
              <span>10 GB</span>
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
