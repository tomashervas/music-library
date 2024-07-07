import { Artist } from "./artist";
import { Company } from "./company";

export interface Song {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  year: number;
  duration: number;
  rating: number;
  artist: Artist;
  company?: Company;
}
