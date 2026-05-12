import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Album } from '../types';

interface AddPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (photoData: { title: string; description: string; url: string; albumId: string }) => void;
  albums: Album[];
}

export default function AddPhotoModal({ isOpen, onClose, onAdd, albums }: AddPhotoModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    albumId: albums[1]?.id || 'all',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    onAdd(formData);
    setFormData({ title: '', description: '', url: '', albumId: albums[1]?.id || 'all' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                  <Upload size={18} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Add New Photo</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
                id="btn-close-modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Photo Title</label>
                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="The Perfect Sunset"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  id="input-title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Album</label>
                   <select
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    value={formData.albumId}
                    onChange={(e) => setFormData({ ...formData, albumId: e.target.value })}
                    id="input-album"
                  >
                    {albums.filter(a => a.id !== 'all').map(album => (
                      <option key={album.id} value={album.id}>{album.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Image URL</label>
                  <input
                    required
                    type="url"
                    placeholder="https://images.unsplash..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    id="input-url"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Capture the feeling..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  id="input-desc"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm"
                  id="btn-cancel-add"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 text-sm"
                  id="btn-submit-photo"
                >
                  <ImageIcon size={16} />
                  <span>Save Photo</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
