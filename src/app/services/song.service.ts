import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song, SongDTO } from '../models/song';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private baseUrl = 'http://localhost:3000/songs';

  constructor(private http: HttpClient) {}

  // Obtener todas las canciones
  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.baseUrl}?_expand=artist&_expand=company`);
  }

  // Obtener una canción por ID
  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.baseUrl}/${id}?_expand=artist&_expand=company`);
  }

  // Crear una nueva canción
  createSong(song: SongDTO): Observable<Song> {
    return this.http.post<Song>(this.baseUrl, song);
  }

  // Actualizar una canción existente
  updateSong(song: SongDTO): Observable<Song> {
    return this.http.put<Song>(`${this.baseUrl}/${song.id}`, song);
  }

  // Eliminar una canción
  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
