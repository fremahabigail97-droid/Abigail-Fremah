import { Photo, Album } from './types';

export const INITIAL_ALBUMS: Album[] = [
  { id: 'all', name: 'All Photos', icon: 'LayoutGrid' },
  { id: 'travel', name: 'Travel', icon: 'Plane' },
  { id: 'family', name: 'Family', icon: 'Users' },
  { id: 'work', name: 'Work', icon: 'Briefcase' },
  { id: 'events', name: 'Events', icon: 'Calendar' },
];

export const INITIAL_PHOTOS: Photo[] = [];
