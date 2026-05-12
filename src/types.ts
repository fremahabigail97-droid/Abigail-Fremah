export interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
  albumId: string;
  createdAt: number;
}

export interface Album {
  id: string;
  name: string;
  icon: string;
}
