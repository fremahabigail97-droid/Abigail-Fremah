import { useState, useMemo } from 'react';
import { Menu, Plus, LayoutGrid, Search, SlidersHorizontal } from 'lucide-react';
import Sidebar from './components/Sidebar';
import PhotoGrid from './components/PhotoGrid';
import Lightbox from './components/Lightbox';
import AddPhotoModal from './components/AddPhotoModal';
import ConfirmDialog from './components/ConfirmDialog';
import { INITIAL_ALBUMS, INITIAL_PHOTOS } from './data';
import { Photo } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>(INITIAL_PHOTOS);
  const [activeAlbumId, setActiveAlbumId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletePhotoId, setDeletePhotoId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Filtered Photos
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesAlbum = activeAlbumId === 'all' || photo.albumId === activeAlbumId;
      const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           photo.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesAlbum && matchesSearch;
    }).sort((a, b) => b.createdAt - a.createdAt);
  }, [photos, activeAlbumId, searchQuery]);

  // Handlers
  const handleAddPhoto = (data: Omit<Photo, 'id' | 'createdAt'>) => {
    const newPhoto: Photo = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setPhotos([newPhoto, ...photos]);
  };

  const handleDeletePhoto = () => {
    if (deletePhotoId) {
      setPhotos(photos.filter(p => p.id !== deletePhotoId));
      setDeletePhotoId(null);
    }
  };

  const handlePrevPhoto = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto?.id);
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    }
  };

  const handleNextPhoto = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto?.id);
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  const activeAlbum = INITIAL_ALBUMS.find(a => a.id === activeAlbumId);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar
        albums={INITIAL_ALBUMS}
        activeAlbumId={activeAlbumId}
        onAlbumSelect={setActiveAlbumId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Navigation */}
        <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
              id="btn-mobile-menu"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-lg tracking-tight uppercase">Lumina</span>
          </div>

          <div className="flex-1 max-w-md mx-6 lg:mx-12">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search your memories..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
              id="btn-open-add-photo"
            >
              <span className="hidden sm:inline">+ Upload Photo</span>
              <Plus size={18} className="sm:hidden" />
            </motion.button>
            <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-600">
              AF
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto flex flex-col">
          <header className="mb-8 flex items-end justify-between shrink-0">
            <div>
              <motion.h1 
                key={activeAlbum?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-slate-900"
              >
                {activeAlbum?.name}
              </motion.h1>
              <p className="text-slate-500 text-sm mt-1">
                {activeAlbumId === 'all' ? 'All your stored memories' : `Collection from ${activeAlbum?.name}`} &bull; {filteredPhotos.length} Photos
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </header>

          <PhotoGrid
            photos={filteredPhotos}
            onPhotoOpen={setSelectedPhoto}
            onPhotoDelete={setDeletePhotoId}
          />
        </main>
      </div>

      {/* Modals & Dialogs */}
      <Lightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        hasPrev={filteredPhotos.findIndex(p => p.id === selectedPhoto?.id) > 0}
        hasNext={filteredPhotos.findIndex(p => p.id === selectedPhoto?.id) < filteredPhotos.length - 1}
      />

      <AddPhotoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPhoto}
        albums={INITIAL_ALBUMS}
      />

      <ConfirmDialog
        isOpen={deletePhotoId !== null}
        onClose={() => setDeletePhotoId(null)}
        onConfirm={handleDeletePhoto}
        title="Delete Photo?"
        message="Are you sure you want to remove this memory? This action cannot be undone."
      />
    </div>
  );
}
