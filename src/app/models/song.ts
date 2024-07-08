import { Artist } from "./artist";

export interface Song {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  year: number; 
  duration: number;
  rating: number;
  artistId: number;
  artist: Artist;
}

export type SongDTO = Omit<Song, "artist" | "id" > & {
  id?: number;
}